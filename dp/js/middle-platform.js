const { createApp, ref, computed, watch, nextTick, onMounted, onUnmounted } = Vue;

const MP_ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>',
  asset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>',
  security: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  energy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  canteen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
  property: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>',
  environment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22c-4-3-8-7-8-12a8 8 0 0 1 16 0c0 5-4 9-8 12z"/><circle cx="12" cy="10" r="3"/></svg>',
  knowledge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  risk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  warehouse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>',
  flow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1M9 18h6"/></svg>',
  area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  room: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  inventory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  value: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a2.5 2.5 0 0 1 0 5H9"/></svg>',
  outbound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17L17 7M17 7H9M17 7v8"/></svg>',
  inbound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 7L7 17M7 17h8M7 17V9"/></svg>',
  trendUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>',
  trendDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>',
  trendFlat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/></svg>',
};

function buildAreaStackOption(segments, { clickable = false } = {}) {
  return {
    tooltip: {
      trigger: 'item',
      formatter(params) {
        const pct = params.value;
        const name = params.seriesName;
        return `${name}<br/>占比：${pct}%`;
      },
    },
    grid: { top: 16, right: 24, bottom: 36, left: 24 },
    xAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { formatter: '{value}%', color: '#8c8c8c', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
    },
    yAxis: {
      type: 'category',
      data: ['占比'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    series: segments.map((seg) => ({
      name: seg.name,
      type: 'bar',
      stack: 'total',
      barWidth: 32,
      cursor: seg.isOther && clickable ? 'pointer' : 'default',
      emphasis: {
        focus: 'series',
        itemStyle: seg.isOther && clickable ? { shadowBlur: 8, shadowColor: 'rgba(24,144,255,0.35)' } : {},
      },
      label: {
        show: seg.proportion >= 2,
        formatter: () => `${seg.proportion}%`,
        fontSize: 11,
        color: seg.proportion > 20 ? '#fff' : '#595959',
      },
      data: [seg.proportion],
      itemStyle: { color: seg.color },
    })),
  };
}

function buildAreaLevel1Segments(chartData) {
  const { top3, otherTotal } = chartData;
  return [
    ...top3.map((u) => ({ ...u, proportion: u.proportion })),
    { name: '其他', proportion: otherTotal, color: '#d6e4ff', isOther: true },
  ];
}

function buildAreaLevel2Segments(otherUnits) {
  return otherUnits.map((u) => ({ ...u, proportion: u.proportion, isOther: false }));
}

createApp({
  setup() {
    const menuItems = ref(JSON.parse(JSON.stringify(MIDDLE_PLATFORM_DATA.menuItems)));
    const sidebarCollapsed = ref(false);
    const activeMenuId = ref('asset');
    const activeSubId = ref('asset-office');
    const currentView = ref('office');
    const selectedLocation = ref(MIDDLE_PLATFORM_DATA.locations[0]);
    const locationOpen = ref(false);
    const platformOpen = ref(false);
    const areaChartLevel = ref('summary');
    const unitChangeStart = ref('');
    const unitChangeEnd = ref('');
    const unitChangeModal = ref(null);
    const currentTime = ref('');
    const charts = {};

    // 公物仓状态
    const gwData = MIDDLE_PLATFORM_DATA.publicWarehouse;
    const gwWarehouses = gwData.warehouses;
    const gwCumulativeMode = ref('quarter');
    const gwCumulativeHistoryYear = ref('all');
    const gwCumulativeHistoryQuarter = ref('all');
    const gwInboundTrendMode = ref('quarter');
    const gwOutboundTrendMode = ref('quarter');
    const gwInboundMetric = ref('count');
    const gwOutboundMetric = ref('count');

    let clockTimer = null;

    const summaryCards = MIDDLE_PLATFORM_DATA.summaryCards;
    const officeAreaChart = MIDDLE_PLATFORM_DATA.officeAreaChart;
    const unitList = MIDDLE_PLATFORM_DATA.unitList;
    const locations = MIDDLE_PLATFORM_DATA.locations;

    const pageTitle = computed(() => {
      if (currentView.value === 'office') return '办公用房';
      if (currentView.value === 'warehouse') return '公物仓';
      const menu = menuItems.value.find((m) => m.id === activeMenuId.value);
      if (menu?.children) {
        const sub = menu.children.find((c) => c.id === activeSubId.value);
        return sub?.label || menu.label;
      }
      return menu?.label || '';
    });

    const showOffice = computed(() => currentView.value === 'office');
    const showWarehouse = computed(() => currentView.value === 'warehouse');

    function isChangeInRange(change) {
      const d = change.date;
      if (unitChangeStart.value && d < unitChangeStart.value) return false;
      if (unitChangeEnd.value && d > unitChangeEnd.value) return false;
      return true;
    }

    const filteredUnitList = computed(() => {
      const hasFilter = unitChangeStart.value || unitChangeEnd.value;
      return unitList
        .map((unit) => {
          const visibleChanges = (unit.changes || [])
            .filter(isChangeInRange)
            .sort((a, b) => b.date.localeCompare(a.date));
          return { ...unit, visibleChanges };
        })
        .filter((unit) => !hasFilter || unit.visibleChanges.length > 0);
    });

    function resetUnitChangeFilter() {
      unitChangeStart.value = '';
      unitChangeEnd.value = '';
    }

    function formatChangeDate(dateStr) {
      const [y, m, d] = dateStr.split('-');
      return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
    }

    function enrichUnitChanges(changes) {
      const sorted = [...changes].sort((a, b) => b.date.localeCompare(a.date));
      return sorted.map((ch, i) => {
        const prev = sorted[i + 1];
        return {
          ...ch,
          areaDelta: prev ? +(ch.area - prev.area).toFixed(2) : null,
          proportionDelta: prev ? +(ch.proportion - prev.proportion).toFixed(2) : null,
        };
      });
    }

    function formatChangeDelta(val, suffix) {
      if (val == null || val === 0) return '持平';
      const sign = val > 0 ? '+' : '';
      const unit = suffix === '%' ? '%' : ` ${suffix}`;
      return `${sign}${val}${unit}`;
    }

    function changeDeltaClass(val) {
      if (val == null || val === 0) return 'is-flat';
      return val > 0 ? 'is-up' : 'is-down';
    }

    function openUnitChangeModal(unit) {
      unitChangeModal.value = {
        name: unit.name,
        area: unit.area,
        proportion: unit.proportion,
        changes: enrichUnitChanges(unit.visibleChanges || []),
      };
    }

    function closeUnitChangeModal() {
      unitChangeModal.value = null;
    }

    const gwInboundDisplay = computed(() => {
      const metric = gwData.inbound.metrics.find((m) => m.key === gwInboundMetric.value);
      const raw = gwData.inbound.currentQuarter[gwInboundMetric.value];
      return {
        value: raw.total,
        w1: raw.w1,
        w2: raw.w2,
        unit: metric?.unit || '',
        raw,
      };
    });

    const gwOutboundDisplay = computed(() => {
      const metric = gwData.outbound.metrics.find((m) => m.key === gwOutboundMetric.value);
      const raw = gwData.outbound.currentQuarter[gwOutboundMetric.value];
      return {
        value: raw.total,
        w1: raw.w1,
        w2: raw.w2,
        unit: metric?.unit || '',
        raw,
      };
    });

    const gwCumulativeHistoryYears = computed(() => {
      if (gwCumulativeMode.value === 'year') {
        return [...gwData.cumulative.yearlyTrend.labels].sort((a, b) => b - a);
      }
      const start = gwData.quarterlyStartYear || 2026;
      const set = new Set();
      gwData.cumulative.historyList.forEach((r) => {
        const y = parseInt(r.period.split(' ')[0], 10);
        if (y >= start) set.add(String(y));
      });
      return [...set].sort((a, b) => b - a);
    });

    const gwCumulativeHistoryQuarters = ['Q1', 'Q2', 'Q3', 'Q4'];

    const gwCumulativeHistory = computed(() => {
      let list;
      if (gwCumulativeMode.value === 'year') {
        const yt = gwData.cumulative.yearlyTrend;
        list = yt.labels.map((label, i) => ({
          period: `${label}年`,
          total: yt.total[i],
          w1: yt.w1[i],
          w2: yt.w2[i],
          change: i > 0
            ? +(((yt.total[i] - yt.total[i - 1]) / yt.total[i - 1]) * 100).toFixed(1)
            : 0,
        })).reverse();
      } else {
        list = gwData.cumulative.historyList.filter((r) => {
          const y = parseInt(r.period.split(' ')[0], 10);
          return y >= (gwData.quarterlyStartYear || 2026);
        });
      }
      if (gwCumulativeHistoryYear.value !== 'all') {
        const y = String(gwCumulativeHistoryYear.value);
        list = list.filter((r) => r.period.startsWith(y));
      }
      if (gwCumulativeMode.value === 'quarter' && gwCumulativeHistoryQuarter.value !== 'all') {
        list = list.filter((r) => r.period.includes(gwCumulativeHistoryQuarter.value));
      }
      return list;
    });

    const gwInboundMetricLabel = computed(() =>
      gwData.inbound.metrics.find((m) => m.key === gwInboundMetric.value)?.label || ''
    );

    const gwOutboundMetricLabel = computed(() =>
      gwData.outbound.metrics.find((m) => m.key === gwOutboundMetric.value)?.label || ''
    );

    function buildGwYearlyFlowHistory(section, metricKey) {
      const yt = section.yearlyTotal[metricKey];
      return yt.labels.map((label, i) => ({
        period: `${label}年`,
        total: yt.total[i],
        w1: yt.w1[i],
        w2: yt.w2[i],
        change: i > 0
          ? +(((yt.total[i] - yt.total[i - 1]) / yt.total[i - 1]) * 100).toFixed(1)
          : 0,
      })).reverse();
    }

    const gwInboundHistory = computed(() =>
      buildGwYearlyFlowHistory(gwData.inbound, gwInboundMetric.value)
    );

    const gwOutboundHistory = computed(() =>
      buildGwYearlyFlowHistory(gwData.outbound, gwOutboundMetric.value)
    );

    function getGwFlowTrendData(section, metricKey, mode) {
      if (mode === 'year') {
        const yt = section.yearlyTotal[metricKey];
        const start = Math.max(0, yt.labels.length - 3);
        return {
          labels: yt.labels.slice(start).map((y) => `${y}年`),
          w1: yt.w1.slice(start),
          w2: yt.w2.slice(start),
        };
      }
      const cq = section.currentYearQuarterly[metricKey];
      const year = gwData.currentYear;
      return {
        labels: cq.labels.map((q) => `${year} ${q}`),
        w1: cq.w1,
        w2: cq.w2,
      };
    }

    function gwStockRatio(wid) {
      const total = gwData.currentStock.total || 1;
      const key = wid === 'w1' ? 'w1' : 'w2';
      return ((gwData.currentStock[key] / total) * 100).toFixed(1);
    }

    function gwCumulativeRatio(wid) {
      const total = gwData.cumulative.currentQuarter.total || 1;
      const key = wid === 'w1' ? 'w1' : 'w2';
      return ((gwData.cumulative.currentQuarter[key] / total) * 100).toFixed(1);
    }

    function formatGwChange(item) {
      if (!item || item.change == null) return '-';
      const arrow = item.trend === 'down' ? '↓' : '↑';
      return `${arrow} ${item.change}%`;
    }

    function gwTrendClass(item) {
      if (!item || item.trend === 'none') return 'trend-none';
      return item.trend === 'down' ? 'trend-down' : 'trend-up';
    }

    function switchGwCumulativeMode(mode) {
      gwCumulativeMode.value = mode;
      gwCumulativeHistoryYear.value = 'all';
      gwCumulativeHistoryQuarter.value = 'all';
      updateGwCumulativeChart();
    }

    function switchGwInboundTrendMode(mode) {
      gwInboundTrendMode.value = mode;
      updateGwInboundTrendChart();
    }

    function switchGwOutboundTrendMode(mode) {
      gwOutboundTrendMode.value = mode;
      updateGwOutboundTrendChart();
    }

    function switchGwInboundMetric(key) {
      gwInboundMetric.value = key;
      updateGwInboundTrendChart();
    }

    function switchGwOutboundMetric(key) {
      gwOutboundMetric.value = key;
      updateGwOutboundTrendChart();
    }

    function updateGwInboundTrendChart() {
      const data = getGwFlowTrendData(gwData.inbound, gwInboundMetric.value, gwInboundTrendMode.value);
      getOrInitChart('gwInboundTrend')?.setOption(
        buildGwDualWarehouseTrendOption(data.labels, data.w1, data.w2, gwWarehouses), true
      );
    }

    function updateGwOutboundTrendChart() {
      const data = getGwFlowTrendData(gwData.outbound, gwOutboundMetric.value, gwOutboundTrendMode.value);
      getOrInitChart('gwOutboundTrend')?.setOption(
        buildGwDualWarehouseTrendOption(data.labels, data.w1, data.w2, gwWarehouses), true
      );
    }

    function updateGwFlowCharts() {
      updateGwInboundTrendChart();
      updateGwOutboundTrendChart();
    }

    function updateGwCumulativeChart() {
      const mode = gwCumulativeMode.value;
      const src = mode === 'year' ? gwData.cumulative.yearlyTrend : gwData.cumulative.quarterlyTrend;
      const chart = getOrInitChart('gwCumulativeTrend');
      if (!chart) return;
      if (mode === 'year') {
        const start = Math.max(0, src.labels.length - 3);
        chart.setOption(
          buildGwDualWarehouseTrendOption(
            src.labels.slice(start).map((y) => `${y}年`),
            src.w1.slice(start),
            src.w2.slice(start),
            gwWarehouses
          ),
          true
        );
      } else {
        chart.setOption(
          buildGwDualWarehouseTrendOption(src.labels, src.w1, src.w2, gwWarehouses),
          true
        );
      }
    }

    function updateWarehouseCharts() {
      getOrInitChart('gwStockPie')?.setOption(buildGwStockPieOption(gwData.currentStock, gwWarehouses), true);
      updateGwCumulativeChart();
      updateGwFlowCharts();
    }

    function initWarehouseCharts() {
      disposeAllCharts();
      nextTick(() => {
        getChart('gwStockPie')?.setOption(buildGwStockPieOption(gwData.currentStock, gwWarehouses));
        updateGwCumulativeChart();
        updateGwFlowCharts();
        setTimeout(resizeAllCharts, 80);
      });
    }

    function getMenuIcon(name) {
      return MP_ICONS[name] || MP_ICONS.home;
    }

    function getSummaryIcon(name) {
      return MP_ICONS[name] || MP_ICONS.warehouse;
    }

    function updateClock() {
      const now = new Date();
      const y = now.getFullYear();
      const m = now.getMonth() + 1;
      const d = now.getDate();
      const h = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      currentTime.value = `${y}年${m}月${d}日 ${h}:${min}:${s}`;
    }

    function toggleSidebar() {
      sidebarCollapsed.value = !sidebarCollapsed.value;
      nextTick(() => resizeAllCharts());
    }

    function toggleMenu(item) {
      if (item.children) {
        item.expanded = !item.expanded;
        activeMenuId.value = item.id;
      } else {
        activeMenuId.value = item.id;
        activeSubId.value = '';
        currentView.value = 'coming';
      }
    }

    function selectSubMenu(parent, child) {
      activeMenuId.value = parent.id;
      activeSubId.value = child.id;
      if (child.path === 'office') {
        currentView.value = 'office';
        nextTick(() => initOfficeCharts());
      } else if (child.path === 'warehouse') {
        currentView.value = 'warehouse';
        nextTick(() => initWarehouseCharts());
      } else {
        currentView.value = 'coming';
        disposeAllCharts();
      }
    }

    function isMenuActive(item) {
      return activeMenuId.value === item.id;
    }

    function isSubActive(childId) {
      return activeSubId.value === childId;
    }

    function toggleLocation() {
      locationOpen.value = !locationOpen.value;
      platformOpen.value = false;
    }

    function selectLocation(loc) {
      selectedLocation.value = loc;
      locationOpen.value = false;
    }

    function togglePlatform() {
      platformOpen.value = !platformOpen.value;
      locationOpen.value = false;
    }

    function navigateToPlatform(url) {
      window.location.href = url;
    }

    function closeDropdowns() {
      locationOpen.value = false;
      platformOpen.value = false;
    }

    function getMetricIcon(icon) {
      return MP_ICONS[icon] || MP_ICONS.inventory;
    }

    function renderAreaChart() {
      const chart = charts.mpAreaStack;
      if (!chart) return;

      if (areaChartLevel.value === 'summary') {
        const segments = buildAreaLevel1Segments(officeAreaChart);
        chart.setOption(buildAreaStackOption(segments, { clickable: true }), true);
      } else {
        const segments = buildAreaLevel2Segments(officeAreaChart.otherUnits);
        chart.setOption(buildAreaStackOption(segments, { clickable: false }), true);
      }
    }

    function initAreaChart() {
      const chart = getChart('mpAreaStack');
      if (!chart) return;
      areaChartLevel.value = 'summary';
      renderAreaChart();
      chart.off('click');
      chart.on('click', (params) => {
        if (areaChartLevel.value !== 'summary') return;
        if (params.seriesName === '其他') {
          areaChartLevel.value = 'detail';
          renderAreaChart();
        }
      });
    }

    function backAreaChart() {
      areaChartLevel.value = 'summary';
      renderAreaChart();
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }

    function getChart(id) {
      const el = document.getElementById(id);
      if (!el) return null;
      if (charts[id]) charts[id].dispose();
      charts[id] = echarts.init(el);
      return charts[id];
    }

    function getOrInitChart(id) {
      const el = document.getElementById(id);
      if (!el) return null;
      if (!charts[id]) charts[id] = echarts.init(el);
      return charts[id];
    }

    function disposeAllCharts() {
      Object.keys(charts).forEach((k) => { charts[k]?.dispose(); delete charts[k]; });
    }

    function resizeAllCharts() {
      Object.values(charts).forEach((c) => c?.resize());
    }

    function initOfficeCharts() {
      disposeAllCharts();
      nextTick(() => {
        initAreaChart();
        setTimeout(resizeAllCharts, 80);
      });
    }

    onMounted(() => {
      updateClock();
      clockTimer = setInterval(updateClock, 1000);
      initOfficeCharts();
      window.addEventListener('resize', resizeAllCharts);
    });

    onUnmounted(() => {
      if (clockTimer) clearInterval(clockTimer);
      window.removeEventListener('resize', resizeAllCharts);
      disposeAllCharts();
    });

    watch(sidebarCollapsed, () => {
      setTimeout(resizeAllCharts, 280);
    });

    return {
      menuItems, sidebarCollapsed, activeMenuId, activeSubId,
      currentView, pageTitle, showOffice, showWarehouse,
      selectedLocation, locationOpen, platformOpen,
      areaChartLevel, unitChangeStart, unitChangeEnd, unitChangeModal, filteredUnitList, currentTime,
      summaryCards, unitList, locations,
      gwData, gwWarehouses, gwCumulativeMode,
      gwCumulativeHistoryYear, gwCumulativeHistoryQuarter,
      gwCumulativeHistoryYears, gwCumulativeHistoryQuarters,
      gwInboundTrendMode, gwOutboundTrendMode,
      gwInboundMetric, gwOutboundMetric,
      gwCumulativeHistory, gwInboundDisplay, gwOutboundDisplay,
      gwInboundMetricLabel, gwOutboundMetricLabel,
      gwInboundHistory, gwOutboundHistory,
      getMenuIcon, getSummaryIcon,
      toggleSidebar, toggleMenu, selectSubMenu,
      isMenuActive, isSubActive,
      toggleLocation, selectLocation, togglePlatform, closeDropdowns,
      toggleFullscreen, navigateToPlatform,
      backAreaChart,
      resetUnitChangeFilter, formatChangeDate, formatChangeDelta, changeDeltaClass,
      openUnitChangeModal, closeUnitChangeModal,
      getMetricIcon,
      switchGwCumulativeMode,
      switchGwInboundTrendMode, switchGwOutboundTrendMode,
      switchGwInboundMetric, switchGwOutboundMetric,
      gwStockRatio, gwCumulativeRatio, formatGwChange, gwTrendClass,
    };
  },
}).mount('#mp-app');
