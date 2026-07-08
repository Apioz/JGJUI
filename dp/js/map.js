const MapManager = {
  map: null,
  markerLayer: null,
  onSelect: null,

  /** 上海市行政范围（含崇明），用于限制底图仅展示上海 */
  SHANGHAI_BOUNDS: L.latLngBounds(
    [30.67, 120.86],
    [31.87, 122.12]
  ),

  MARKER_PIN_SVG: `
    <svg viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#3e5b6f"/>
      <circle cx="14" cy="14" r="5" fill="#d8dde2"/>
    </svg>
  `,

  applyShanghaiBounds() {
    if (!this.map) return;
    const minZoomForShanghai = this.map.getBoundsZoom(this.SHANGHAI_BOUNDS, true);
    this.map.setMinZoom(minZoomForShanghai);
    this.map.panInsideBounds(this.SHANGHAI_BOUNDS, { animate: false });
    if (this.map.getZoom() < minZoomForShanghai) {
      this.map.setZoom(minZoomForShanghai);
    }
  },

  fitMarkerBounds() {
    if (!this.map || !DASHBOARD_DATA.mapMarkers.length) return;
    const bounds = L.latLngBounds(
      DASHBOARD_DATA.mapMarkers.map((item) => [item.lat, item.lng])
    );
    this.map.fitBounds(bounds.pad(0.35), { animate: false, maxZoom: 15 });
  },

  init(onSelectCallback) {
    this.onSelect = onSelectCallback;

    this.map = L.map('shMap', {
      center: [31.222, 121.476],
      zoom: 14,
      minZoom: 10,
      maxZoom: 18,
      maxBounds: this.SHANGHAI_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer(
      'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      {
        subdomains: ['1', '2', '3', '4'],
        maxZoom: 18,
        minZoom: 3,
      }
    ).addTo(this.map);

    this.markerLayer = document.createElement('div');
    this.markerLayer.className = 'marker-layer';
    document.querySelector('.dashboard').appendChild(this.markerLayer);

    DASHBOARD_DATA.mapMarkers.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'map-marker-el';
      el.dataset.id = item.projectId;
      el.innerHTML = `
        <div class="marker-callout">
          <span class="marker-label">${item.name}</span>
        </div>
        <div class="marker-pin">${this.MARKER_PIN_SVG}</div>
      `;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setActive(item.projectId);
        if (this.onSelect) this.onSelect(item.projectId);
      });
      this.markerLayer.appendChild(el);
      item._el = el;
    });

    this.map.whenReady(() => {
      this.applyShanghaiBounds();
      this.fitMarkerBounds();
      this.updateMarkerPositions();
    });

    this.map.on('move zoom resize viewreset', () => {
      this.updateMarkerPositions();
      if (this.onViewChange) this.onViewChange();
    });

    window.addEventListener('resize', () => {
      this.map.invalidateSize();
      this.applyShanghaiBounds();
      this.updateMarkerPositions();
    });
  },

  updateMarkerPositions() {
    if (!this.map || !this.markerLayer) return;
    const mapRect = this.map.getContainer().getBoundingClientRect();
    DASHBOARD_DATA.mapMarkers.forEach((item) => {
      if (!item._el) return;
      const point = this.map.latLngToContainerPoint([item.lat, item.lng]);
      item._el.style.left = `${mapRect.left + point.x}px`;
      item._el.style.top = `${mapRect.top + point.y}px`;
    });
  },

  setActive(projectId) {
    DASHBOARD_DATA.mapMarkers.forEach((item) => {
      if (item._el) item._el.classList.toggle('active', item.projectId === projectId);
    });
  },

  setVisible(visible) {
    const mapEl = document.getElementById('shMap');
    if (mapEl) mapEl.style.visibility = visible ? 'visible' : 'hidden';
    if (this.markerLayer) this.markerLayer.style.visibility = visible ? 'visible' : 'hidden';
  },

  flyToProject(projectId, onComplete) {
    const item = DASHBOARD_DATA.mapMarkers.find((m) => m.projectId === projectId);
    if (!item || !this.map) {
      onComplete?.();
      return;
    }
    this.setActive(projectId);
    const onDone = () => {
      this.updateMarkerPositions();
      if (this.onViewChange) this.onViewChange();
      onComplete?.();
    };
    this.map.once('moveend', onDone);
    this.map.flyTo([item.lat, item.lng], 16, { animate: true, duration: 0.75 });
  },

  getProjectScreenPoint(projectId) {
    const item = DASHBOARD_DATA.mapMarkers.find((m) => m.projectId === projectId);
    if (!item || !this.map) return null;
    const mapRect = this.map.getContainer().getBoundingClientRect();
    const point = this.map.latLngToContainerPoint([item.lat, item.lng]);
    return { x: mapRect.left + point.x, y: mapRect.top + point.y };
  },

  invalidateSize() {
    this.map?.invalidateSize();
    this.applyShanghaiBounds();
    this.updateMarkerPositions();
  },
};
