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
  database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>',
  wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>',
  wifiOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 2l20 20"/><path d="M8.5 8.5a5 5 0 0 0-2.57 3.35M12 20h.01"/><path d="M16.5 12.5a5 5 0 0 0-1.24-2.16"/></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  forbidden: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
  fault: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  faultWarn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>',
  plug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M6 12H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2"/></svg>',
  wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>',
  water: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22c-4-3-8-7-8-12a8 8 0 0 1 16 0c0 5-4 9-8 12z"/></svg>',
  personnel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  shieldCheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  thermometer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>',
  pm25: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
  co2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>',
  chartPie: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
  total: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8M12 8v8"/></svg>',
  pending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  repairing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  verify: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  audit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  done: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 17h14l-1-5H6l-1 5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/><path d="M5 12l2-6h10l2 6"/></svg>',
  gate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>',
};

function getAllOfficeUnits(chartData) {
  if (chartData.allUnits?.length) {
    return [...chartData.allUnits].sort((a, b) => b.proportion - a.proportion);
  }
  return [...(chartData.top3 || []), ...(chartData.otherUnits || [])]
    .sort((a, b) => b.proportion - a.proportion);
}

function buildAreaPieOption(segments, { clickable = false, totalArea = null, title = '总使用面积' } = {}) {
  const centerX = '36%';
  const totalText = totalArea != null
    ? `${Number(totalArea).toLocaleString('zh-CN', { maximumFractionDigits: 2 })}㎡`
    : `${segments.reduce((s, seg) => s + seg.proportion, 0).toFixed(1)}%`;

  return {
    tooltip: {
      trigger: 'item',
      formatter(params) {
        const pct = params.value;
        const share = params.percent.toFixed(1);
        return `${params.name}<br/>占比：${pct}%（${share}%）`;
      },
    },
    legend: {
      orient: 'vertical',
      right: 12,
      top: 'middle',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 8,
      textStyle: { color: '#595959', fontSize: 12 },
    },
    graphic: totalArea != null ? [{
      type: 'group',
      left: centerX,
      top: '50%',
      bounding: 'raw',
      children: [
        {
          type: 'text',
          style: {
            text: title,
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fill: '#8c8c8c',
            fontSize: 12,
          },
          top: -12,
        },
        {
          type: 'text',
          style: {
            text: totalText,
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fill: '#262626',
            fontSize: 15,
            fontWeight: 'bold',
          },
          top: 8,
        },
      ],
    }] : [],
    series: [{
      type: 'pie',
      radius: ['44%', '70%'],
      center: [centerX, '50%'],
      avoidLabelOverlap: true,
      minAngle: 2,
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        fontSize: 11,
        color: '#595959',
      },
      labelLine: { length: 10, length2: 6, smooth: true },
      emphasis: {
        scale: true,
        scaleSize: 6,
        itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0,0,0,0.12)' },
      },
      data: segments.map((seg) => ({
        name: seg.name,
        value: seg.proportion,
        itemStyle: {
          color: seg.color,
          cursor: seg.isOther && clickable ? 'pointer' : 'default',
        },
      })),
    }],
  };
}

function buildAreaLevel1Segments(chartData) {
  const all = getAllOfficeUnits(chartData);
  const top5 = all.slice(0, 5);
  const others = all.slice(5);
  const otherTotal = Math.round(others.reduce((s, u) => s + u.proportion, 0) * 100) / 100;
  return [
    ...top5,
    { name: '其他', proportion: otherTotal, color: '#d6e4ff', isOther: true },
  ];
}

function buildAreaLevel2Segments(chartData) {
  return getAllOfficeUnits(chartData).slice(5).map((u) => ({ ...u, isOther: false }));
}

/** @deprecated 堆叠条形图，已改用饼图 */
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

const MpTreeNode = {
  name: 'MpTreeNode',
  props: {
    node: { type: Object, required: true },
    depth: { type: Number, default: 0 },
    selected: { type: String, default: '' },
  },
  emits: ['select'],
  template: `
    <div class="mp-tree-branch" :style="{ paddingLeft: depth * 12 + 'px' }">
      <div
        class="mp-tree-row"
        :class="{ active: selected === node.name, leaf: node.isDevice }"
        @click="onClick"
      >
        <span v-if="node.children && node.children.length" class="mp-tree-toggle">{{ node.expanded ? '▾' : '▸' }}</span>
        <span>{{ node.name }}<template v-if="node.count != null"> ({{ node.count }})</template></span>
      </div>
      <template v-if="node.expanded && node.children && node.children.length">
        <mp-tree-node
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          :depth="depth + 1"
          :selected="selected"
          @select="$emit('select', $event)"
        />
      </template>
    </div>
  `,
  methods: {
    onClick() {
      if (this.node.children && this.node.children.length) {
        this.node.expanded = !this.node.expanded;
      } else {
        this.$emit('select', this.node.name);
      }
    },
  },
};

MpTreeNode.components = { MpTreeNode };

function findMenuLeafLabel(items, targetId) {
  for (const item of items) {
    if (item.id === targetId && item.label) return item.label;
    if (item.children) {
      const found = findMenuLeafLabel(item.children, targetId);
      if (found) return found;
    }
  }
  return '';
}

function expandMenuPath(items, targetId, ancestors = []) {
  for (const item of items) {
    if (item.id === targetId) {
      ancestors.forEach((a) => { a.expanded = true; });
      return true;
    }
    if (item.children) {
      if (expandMenuPath(item.children, targetId, [...ancestors, item])) return true;
    }
  }
  return false;
}

function buildRecentQuarterOptions(yearsBack = 3) {
  const labels = ['第一季度', '第二季度', '第三季度', '第四季度'];
  const options = [];
  const now = new Date();
  let year = now.getFullYear();
  let quarter = Math.floor(now.getMonth() / 3) + 1;
  for (let i = 0; i < yearsBack * 4; i += 1) {
    options.push({
      value: `${year}-Q${quarter}`,
      label: `${year}年/${labels[quarter - 1]}`,
    });
    quarter -= 1;
    if (quarter === 0) {
      quarter = 4;
      year -= 1;
    }
  }
  return options;
}

createApp({
  components: { MpTreeNode },
  setup() {
    const menuItems = ref(JSON.parse(JSON.stringify(MIDDLE_PLATFORM_DATA.menuItems)));
    const sidebarCollapsed = ref(false);
    const activeMenuId = ref('home');
    const activeSubId = ref('home-dashboard');
    const currentView = ref('dashboard');
    const selectedLocation = ref(MIDDLE_PLATFORM_DATA.locations[0]);
    const locationOpen = ref(false);
    const platformOpen = ref(false);
    const areaChartLevel = ref('summary');
    const unitChangeStart = ref('');
    const unitChangeEnd = ref('');
    const unitChangeModal = ref(null);
    const currentTime = ref('');
    const charts = {};

    const mod = MIDDLE_PLATFORM_MODULES;
    const dash = mod.dashboard;

    const dashTodoTab = ref('today');
    const dashRepairTrend = ref('week7');
    const dashMaintPeriod = ref('all');
    const dashInspectPeriod = ref('all');
    const dashMsgTab = ref('all');

    const parkingTrendPeriod = ref('today');
    const parkingDateStart = ref('');
    const parkingDateEnd = ref('');

    const monitorSearch = ref('');
    const selectedCamera = ref('');
    const monitorTree = ref(JSON.parse(JSON.stringify(mod.monitorResourceView.tree)));

    const fireTrendPeriod = ref('today');
    const fireListFilter = ref({
      status: '', level: '',
      reportStart: '', reportEnd: '',
      processStart: '', processEnd: '',
      situation: '',
    });
    const fireListTimeApplied = ref(false);

    const pageConfig = computed(() => MP_PAGE_REGISTRY[currentView.value] || null);
    const pageData = computed(() => {
      if (!pageConfig.value) return null;
      return MP_PAGE_DATA[pageConfig.value.dataKey] || null;
    });

    const menuWeekLabel = computed(() => {
      const base = pageData.value?.menuWeek || '2024年第13周 (3/25-3/31)';
      if (!menuWeekOffset.value) return base;
      const wk = 13 + menuWeekOffset.value;
      return `2024年第${wk}周 (3/25-3/31)`;
    });

    const scheduleCalendarCells = computed(() => {
      const d = pageData.value;
      if (!d?.shifts) return [];
      const [y, m] = scheduleMonth.value.split('-').map(Number);
      const first = new Date(y, m - 1, 1);
      const startDay = first.getDay();
      const daysInMonth = new Date(y, m, 0).getDate();
      const shiftMap = {};
      d.shifts.forEach((s) => { shiftMap[s.date] = s; });
      const cells = [];
      const prevMonthDays = new Date(y, m - 1, 0).getDate();
      for (let i = 0; i < startDay; i++) {
        const day = prevMonthDays - startDay + i + 1;
        const pm = m === 1 ? 12 : m - 1;
        const key = `${String(pm).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
        cells.push({ label: String(day).padStart(2, '0'), otherMonth: true, shifts: shiftMap[key] ? [shiftMap[key]] : [], selected: key === '04/02' });
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const key = `${String(m).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
        cells.push({ label: String(day).padStart(2, '0'), otherMonth: false, isToday: y === 2024 && m === 4 && day === 2, selected: key === '04/02', shifts: shiftMap[key] ? [shiftMap[key]] : [] });
      }
      const remain = 7 - (cells.length % 7);
      if (remain < 7) {
        for (let day = 1; day <= remain; day++) {
          const nm = m === 12 ? 1 : m + 1;
          const key = `${String(nm).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
          cells.push({ label: String(day).padStart(2, '0'), otherMonth: true, shifts: shiftMap[key] ? [shiftMap[key]] : [] });
        }
      }
      return cells;
    });

    const maintCalYear = computed(() => parseInt(maintCalMonth.value.split('-')[0], 10));
    const maintCalMonthNum = computed(() => parseInt(maintCalMonth.value.split('-')[1], 10));

    const maintCalCells = computed(() => {
      const highlightDay = pageData.value?.highlightDay;
      const [y, m] = maintCalMonth.value.split('-').map(Number);
      const first = new Date(y, m - 1, 1);
      const startDay = first.getDay();
      const daysInMonth = new Date(y, m, 0).getDate();
      const cells = [];
      const prevMonthDays = new Date(y, m - 1, 0).getDate();
      for (let i = 0; i < startDay; i++) {
        const day = prevMonthDays - startDay + i + 1;
        const pm = m === 1 ? 12 : m - 1;
        cells.push({ label: `${String(pm).padStart(2, '0')}-${String(day).padStart(2, '0')}`, otherMonth: true, highlight: false });
      }
      for (let day = 1; day <= daysInMonth; day++) {
        cells.push({
          label: `${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          otherMonth: false,
          highlight: highlightDay === day && y === 2025 && m === 12,
        });
      }
      const remain = 7 - (cells.length % 7);
      if (remain < 7) {
        for (let day = 1; day <= remain; day++) {
          const nm = m === 12 ? 1 : m + 1;
          cells.push({ label: `${String(nm).padStart(2, '0')}-${String(day).padStart(2, '0')}`, otherMonth: true, highlight: false });
        }
      }
      return cells;
    });

    const extTrendPeriod = ref('today');
    const hazardListFilter = ref({ status: '', level: '', start: '', end: '', situation: '' });
    const bindFilter = ref({ status: '' });
    const filteredBindRows = ref([]);
    const personnelPieTab = ref('dept');
    const personnelTrendTab = ref('dept');
    const personnelQuarterOptions = buildRecentQuarterOptions(3);
    const personnelPieQuarter = ref(personnelQuarterOptions[0]?.value || '');
    const personnelTrendQuarter = ref(personnelQuarterOptions[0]?.value || '');
    const certPeriod = ref('month');
    const energyReportType = ref('electric');
    const energyReportTree = ref(JSON.parse(JSON.stringify(MP_PAGE_DATA.energyReport.tree)));

    const canteenTrendMode = ref('count');
    const canteenTrendPeriod = ref('week');
    const menuWeekOffset = ref(0);
    const repairStep = ref(1);
    const repairForm = ref({ orderType: '', processType: '', source: '', problemType: '', urgency: '', location: '' });
    const scheduleMonth = ref('2024-04');
    const maintCalMonth = ref('2025-12');
    const envBuilding = ref('1号楼');
    const selectedAgent = ref('engineering');
    const riskPeriod = ref('week');
    const riskRulesTab = ref('list');

    const deviceFilter = ref({
      location: '', deviceAsset: '', parkingLot: '', gateDeviceName: '',
      bindStatus: '', entryExitType: '',
    });
    const monitorFilter = ref({
      location: '', deviceName: '', monitorStatus: '', protocolType: '', bindStatus: '',
    });
    const devicePage = ref(1);
    const devicePageSize = ref(10);
    const filteredDeviceRows = ref([]);
    const filteredMonitorRows = ref([]);

    const taskPeriods = [
      { key: 'all', label: '全部' },
      { key: 'today', label: '今天' },
      { key: 'week', label: '本周' },
      { key: 'month', label: '本月' },
    ];

    const parkingTrendPeriods = [
      { key: 'today', label: '今日' },
      { key: 'week', label: '本周' },
      { key: 'month', label: '本月' },
    ];

    const fireTrendPeriods = [
      { key: 'today', label: '今天' },
      { key: 'yesterday', label: '昨天' },
      { key: 'week7', label: '最近7天' },
      { key: 'week30', label: '最近30天' },
    ];

    // 公物仓状态
    const gwData = MIDDLE_PLATFORM_DATA.publicWarehouse;
    const gwWarehouses = gwData.warehouses;
    const gwCumulativeMode = ref('quarter');
    const gwCumulativeHistoryYear = ref('all');
    const gwCumulativeHistoryQuarter = ref('all');
    const gwInboundMetric = ref('count');
    const gwOutboundMetric = ref('count');
    const gwInboundHistoryExpanded = ref(false);
    const gwOutboundHistoryExpanded = ref(false);
    const GW_HISTORY_DEFAULT_YEARS = 5;

    let clockTimer = null;

    const summaryCards = MIDDLE_PLATFORM_DATA.summaryCards;
    const officeAreaChart = MIDDLE_PLATFORM_DATA.officeAreaChart;
    const unitList = MIDDLE_PLATFORM_DATA.unitList;
    const locations = MIDDLE_PLATFORM_DATA.locations;

    const pageTitle = computed(() => {
      if (currentView.value === 'office') return '办公用房';
      if (currentView.value === 'warehouse') return '公物仓';
      const label = findMenuLeafLabel(menuItems.value, activeSubId.value);
      if (label) return label;
      const menu = menuItems.value.find((m) => m.id === activeMenuId.value);
      return menu?.label || '';
    });

    const showOffice = computed(() => currentView.value === 'office');
    const showWarehouse = computed(() => currentView.value === 'warehouse');

    const dashTodoCounts = computed(() => dash.todoStats[dashTodoTab.value] || dash.todoStats.today);

    const filteredDashMessages = computed(() => {
      const list = dash.systemMessages;
      if (dashMsgTab.value === 'inspect') return list.filter((m) => m.type.includes('巡检'));
      if (dashMsgTab.value === 'idle') return list.filter((m) => m.type.includes('空闲'));
      return list;
    });

    const dashMaintSnapshot = computed(() => getDashTaskSnapshot('maintenanceTask', dashMaintPeriod.value));
    const dashInspectSnapshot = computed(() => getDashTaskSnapshot('inspectionTask', dashInspectPeriod.value));

    const certDisplayTotal = computed(() => {
      const d = pageData.value;
      if (!d?.certByPeriod) return d?.certTotal ?? 0;
      return d.certByPeriod[certPeriod.value]?.total ?? d.certTotal ?? 0;
    });

    function getQuarterScale(quarterValue) {
      const idx = personnelQuarterOptions.findIndex((q) => q.value === quarterValue);
      return idx >= 0 ? 0.78 + idx * 0.04 : 1;
    }

    function scaleDonutItems(items, factor) {
      return items.map((i) => ({ ...i, count: Math.max(1, Math.round(i.count * factor)) }));
    }

    function scaleTrendSeries(series, factor) {
      return series.map((s) => ({ ...s, data: s.data.map((v) => Math.max(1, Math.round(v * factor))) }));
    }

    const devicePageData = computed(() => {
      if (currentView.value === 'parking-gate-device') return mod.parkingGateDevices;
      if (currentView.value === 'access-device') return mod.accessDevices;
      return null;
    });

    const devicePageSummary = computed(() => devicePageData.value?.summary || []);
    const devicePageColumns = computed(() => devicePageData.value?.table.columns || []);

    const deviceFilterOptions = computed(() => {
      const f = devicePageData.value?.filters || {};
      return {
        locations: f.spaceLocation?.options || [],
        deviceAssets: f.deviceAsset?.options || [],
        parkingLots: f.parkingLot?.options || [],
        entryExitTypes: f.entryExitType?.options || [],
        bindStatuses: f.bindStatus?.options || ['已绑定', '未绑定'],
      };
    });

    const monitorFilterOptions = computed(() => {
      const f = mod.monitorDevices.filters;
      return {
        locations: f.spaceLocation.options,
        monitorStatuses: f.monitorStatus.options,
        protocolTypes: f.protocolType.options,
        bindStatuses: f.bindStatus.options,
      };
    });

    const deviceTotal = computed(() => filteredDeviceRows.value.length);

    const devicePageMax = computed(() => Math.max(1, Math.ceil(deviceTotal.value / devicePageSize.value)));

    const devicePageList = computed(() => {
      const max = devicePageMax.value;
      const cur = devicePage.value;
      const pages = [];
      for (let i = 1; i <= Math.min(max, 5); i += 1) pages.push(i);
      if (max > 5) pages.push('…', max);
      return pages.filter((p) => p !== '…' || max > 5);
    });

    const pagedDeviceRows = computed(() => {
      const start = (devicePage.value - 1) * devicePageSize.value;
      const slice = filteredDeviceRows.value.slice(start, start + devicePageSize.value);
      const src = devicePageData.value;
      if (!src) return [];
      if (currentView.value === 'parking-gate-device') {
        return slice.map((r) => [
          r.index, r.spaceCode, r.spaceLocation, r.deviceCode, r.deviceName, r.deviceType,
          r.parkingLotId || '—', r.parkingLotName || '—', r.gateId, r.gateDeviceName, r.bindStatus,
        ]);
      }
      return slice.map((r) => [
        r.index, r.spaceCode, r.spaceLocation, r.deviceCode, r.deviceName,
        r.gateId, r.gateDeviceName, r.bindStatus,
      ]);
    });

    const fireStatsLabel = computed(() => (currentView.value === 'fire-fault-stats' ? '故障' : '报警'));
    const fireStatsData = computed(() => (
      currentView.value === 'fire-fault-stats' ? mod.fireFaultStats : mod.fireAlarmStats
    ));
    const fireLevelChartId = computed(() => (
      currentView.value === 'fire-fault-stats' ? 'fireFaultLevelChart' : 'fireAlarmLevelChart'
    ));
    const fireProcessChartId = computed(() => (
      currentView.value === 'fire-fault-stats' ? 'fireFaultProcessChart' : 'fireAlarmProcessChart'
    ));
    const fireTrendChartId = computed(() => (
      currentView.value === 'fire-fault-stats' ? 'fireFaultTrendChart' : 'fireAlarmTrendChart'
    ));

    const fireListData = computed(() => (
      currentView.value === 'fire-fault-list' ? mod.fireFaultList : mod.fireAlarmList
    ));

    const fireListStatusOptions = computed(() => {
      const f = fireListData.value.filters;
      return f.processStatus?.options || [];
    });

    const fireListLevelOptions = computed(() => {
      const f = fireListData.value.filters;
      return f.alarmLevel?.options || f.faultLevel?.options || [];
    });

    const fireListLevelLabel = computed(() => {
      const f = fireListData.value?.filters;
      return f.alarmLevel?.label || f.faultLevel?.label || '等级';
    });

    function todayYmd() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    function rowDateYmd(dateStr) {
      if (!dateStr || dateStr === '—') return '';
      const normalized = dateStr.trim().replace(/\//g, '-');
      const m = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
      if (!m) return '';
      return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
    }

    function isRowDateToday(dateStr) {
      return rowDateYmd(dateStr) === todayYmd();
    }

    function patchFireAlarmListDemoDates() {
      const today = todayYmd();
      const times = ['15:48:39', '15:48:39', '15:48:39', '14:30:00', '13:15:00', '12:00:00', '11:00:00', '09:30:00'];
      mod.fireAlarmList.table.rows.forEach((row, i) => {
        if (i < 8) {
          row.startTime = `${today} ${times[i]}`;
          if (row.processStatus === '未处理') {
            row.endTime = '—';
          } else if (i === 7) {
            row.endTime = `${today} 09:45:00`;
          } else {
            row.endTime = `${today} ${times[i]}`;
          }
        } else if (row.processStatus === '未处理') {
          row.endTime = '—';
        }
      });
    }
    patchFireAlarmListDemoDates();

    const FIRE_PENDING_STATUS = {
      alarm: ['未处理'],
      fault: ['未处理'],
      hazard: ['未处理', '整改中'],
    };

    function isPendingStatus(kind, status) {
      return (FIRE_PENDING_STATUS[kind] || []).includes(status);
    }

    function matchFireRow(row, filter, kind, timeApplied) {
      const levelKey = kind === 'fault' ? 'faultLevel' : 'alarmLevel';
      const status = row.processStatus;
      const reportTime = row.startTime;
      const processTime = row.endTime;

      if (filter.situation === 'pending' && !isPendingStatus(kind, status)) return false;
      if (filter.situation === 'processed' && isPendingStatus(kind, status)) return false;
      if (filter.status && status !== filter.status) return false;
      if (filter.level && row[levelKey] !== filter.level) return false;

      const useTodayDefault = !timeApplied
        && !filter.situation
        && !filter.status
        && !filter.level;

      if (useTodayDefault) {
        return isRowDateToday(reportTime);
      }

      if (filter.reportStart && rowDateYmd(reportTime) < filter.reportStart) return false;
      if (filter.reportEnd && rowDateYmd(reportTime) > filter.reportEnd) return false;

      if (filter.processStart || filter.processEnd) {
        if (!processTime || processTime === '—') return false;
        const procYmd = rowDateYmd(processTime);
        if (filter.processStart && procYmd < filter.processStart) return false;
        if (filter.processEnd && procYmd > filter.processEnd) return false;
      }

      return true;
    }

    function formatFireEndTime(row, kind) {
      if (isPendingStatus(kind, row.processStatus)) return '—';
      const t = row.endTime;
      return !t || t === '—' ? '—' : t;
    }

    function matchHazardRow(row, filter) {
      if (filter.situation === 'pending' && !isPendingStatus('hazard', row.status)) return false;
      if (filter.situation === 'processed' && isPendingStatus('hazard', row.status)) return false;
      if (filter.status && row.status !== filter.status) return false;
      if (filter.level && row.level !== filter.level) return false;
      if (filter.start && row.startTime < filter.start) return false;
      if (filter.end && row.startTime > filter.end) return false;
      return true;
    }

    const filteredFireListRows = computed(() => {
      const data = fireListData.value?.table?.rows || [];
      const kind = currentView.value === 'fire-fault-list' ? 'fault' : 'alarm';
      return data.filter((row) => matchFireRow(row, fireListFilter.value, kind, fireListTimeApplied.value));
    });

    const filteredHazardListRows = computed(() => {
      const data = pageData.value?.table?.rows || [];
      return data.filter((row) => matchHazardRow(row, hazardListFilter.value));
    });

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

    function calcGwTurnoverRate(outboundCount, beginStock, endStock) {
      const avg = (beginStock + endStock) / 2;
      if (!avg || outboundCount == null) return null;
      return +(outboundCount / avg).toFixed(2);
    }

    function formatGwTurnoverRate(rate) {
      if (rate == null || Number.isNaN(rate)) return '—';
      return rate.toFixed(2);
    }

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

    function parseGwHistoryYear(period) {
      return parseInt(String(period).replace('年', ''), 10);
    }

    function sliceGwHistoryByYearRange(rows, expanded) {
      if (expanded || !rows.length) return rows;
      const years = rows.map((r) => parseGwHistoryYear(r.period)).filter((y) => !Number.isNaN(y));
      if (!years.length) return rows;
      const maxYear = Math.max(...years);
      const minYear = maxYear - GW_HISTORY_DEFAULT_YEARS + 1;
      return rows.filter((r) => {
        const y = parseGwHistoryYear(r.period);
        return !Number.isNaN(y) && y >= minYear;
      });
    }

    function gwHistoryHasMoreRows(rows) {
      return sliceGwHistoryByYearRange(rows, false).length < rows.length;
    }

    function enrichGwOutboundHistoryWithTurnover(rows) {
      const inv = gwData.yearlyInventory;
      const outCount = gwData.outbound.yearlyTotal.count;
      if (!inv || !outCount) return rows;
      return rows.map((row) => {
        const year = row.period.replace('年', '');
        const i = inv.labels.indexOf(year);
        if (i < 0) return { ...row, turnoverRate: null };
        const beginStock = inv.w1Begin[i] + inv.w2Begin[i];
        const endStock = inv.w1End[i] + inv.w2End[i];
        const outbound = outCount.total[i];
        return {
          ...row,
          turnoverRate: calcGwTurnoverRate(outbound, beginStock, endStock),
        };
      });
    }

    const gwInboundHistoryFull = computed(() =>
      buildGwYearlyFlowHistory(gwData.inbound, gwInboundMetric.value)
    );

    const gwOutboundHistoryFull = computed(() =>
      enrichGwOutboundHistoryWithTurnover(
        buildGwYearlyFlowHistory(gwData.outbound, gwOutboundMetric.value)
      )
    );

    const gwInboundHistory = computed(() =>
      sliceGwHistoryByYearRange(gwInboundHistoryFull.value, gwInboundHistoryExpanded.value)
    );

    const gwOutboundHistory = computed(() =>
      sliceGwHistoryByYearRange(gwOutboundHistoryFull.value, gwOutboundHistoryExpanded.value)
    );

    const gwInboundHistoryHasMore = computed(() =>
      gwHistoryHasMoreRows(gwInboundHistoryFull.value)
    );

    const gwOutboundHistoryHasMore = computed(() =>
      gwHistoryHasMoreRows(gwOutboundHistoryFull.value)
    );

    function toggleGwInboundHistoryExpand() {
      gwInboundHistoryExpanded.value = !gwInboundHistoryExpanded.value;
    }

    function toggleGwOutboundHistoryExpand() {
      gwOutboundHistoryExpanded.value = !gwOutboundHistoryExpanded.value;
    }

    function switchGwInboundMetric(key) {
      gwInboundMetric.value = key;
      gwInboundHistoryExpanded.value = false;
    }

    function switchGwOutboundMetric(key) {
      gwOutboundMetric.value = key;
      gwOutboundHistoryExpanded.value = false;
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
    }

    function initWarehouseCharts() {
      disposeAllCharts();
      nextTick(() => {
        getChart('gwStockPie')?.setOption(buildGwStockPieOption(gwData.currentStock, gwWarehouses));
        updateGwCumulativeChart();
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
      } else if (item.path) {
        navigateToView(item.path, item.id, item.id);
      } else {
        activeMenuId.value = item.id;
        activeSubId.value = '';
        currentView.value = 'coming';
        disposeAllCharts();
      }
    }

    function toggleNavGroup(node) {
      node.expanded = !node.expanded;
    }

    function navigateToView(path, leafId, parentId) {
      activeSubId.value = leafId;
      if (parentId) activeMenuId.value = parentId;
      expandMenuPath(menuItems.value, leafId);

      if (path === 'office') {
        currentView.value = 'office';
        nextTick(() => initOfficeCharts());
        return;
      }
      if (path === 'warehouse') {
        currentView.value = 'warehouse';
        nextTick(() => initWarehouseCharts());
        return;
      }
      if (path === 'coming' || !path) {
        currentView.value = 'coming';
        disposeAllCharts();
        return;
      }

      currentView.value = path;
      nextTick(() => initModuleCharts(path));
    }

    function selectMenuLeaf(parent, leaf) {
      navigateToView(leaf.path, leaf.id, parent.id);
    }

    function selectSubMenu(parent, child) {
      selectMenuLeaf(parent, child);
    }

    function navigateToFunction(fn) {
      const target = menuItems.value.find((m) => m.id === fn.targetPath);
      if (target) {
        target.expanded = true;
        activeMenuId.value = target.id;
        if (target.children?.[0]) {
          selectMenuLeaf(target, target.children[0]);
        } else {
          currentView.value = 'coming';
        }
      }
    }

    function resetDeviceFilterList() {
      const src = devicePageData.value?.table.rows || [];
      filteredDeviceRows.value = [...src];
      devicePage.value = 1;
    }

    function resetMonitorFilterList() {
      filteredMonitorRows.value = [...(mod.monitorDevices.table.rows || [])];
    }

    function applyDeviceFilter() {
      const src = devicePageData.value?.table.rows || [];
      filteredDeviceRows.value = src.filter((r) => {
        const f = deviceFilter.value;
        if (f.location && r.spaceLocation !== f.location) return false;
        if (f.bindStatus && r.bindStatus !== f.bindStatus) return false;
        if (f.deviceAsset && r.deviceType !== f.deviceAsset) return false;
        if (f.parkingLot && r.parkingLotName !== f.parkingLot) return false;
        if (f.entryExitType && r.entryExitType !== f.entryExitType) return false;
        if (f.gateDeviceName && !(r.gateDeviceName || '').includes(f.gateDeviceName)) return false;
        return true;
      });
      devicePage.value = 1;
    }

    function resetDeviceFilter() {
      deviceFilter.value = {
        location: '', deviceAsset: '', parkingLot: '', gateDeviceName: '',
        bindStatus: '', entryExitType: '',
      };
      resetDeviceFilterList();
    }

    function applyMonitorFilter() {
      const src = mod.monitorDevices.table.rows || [];
      const f = monitorFilter.value;
      filteredMonitorRows.value = src.filter((r) => {
        if (f.location && r.spaceLocation !== f.location) return false;
        if (f.monitorStatus && r.monitorStatus !== f.monitorStatus) return false;
        if (f.bindStatus) {
          const status = r.bindStatus || '已绑定';
          if (status !== f.bindStatus) return false;
        }
        if (f.deviceName && !(r.monitorDeviceName || r.deviceName || '').includes(f.deviceName)) return false;
        if (f.protocolType && !(r.protocolType || '').includes(f.protocolType)) return false;
        return true;
      });
    }

    function resetMonitorFilter() {
      monitorFilter.value = {
        location: '', deviceName: '', monitorStatus: '', protocolType: '', bindStatus: '',
      };
      resetMonitorFilterList();
    }

    function setDashRepairTrend(key) {
      dashRepairTrend.value = key;
      updateDashRepairTrendChart();
    }

    function setParkingTrend(key) {
      parkingTrendPeriod.value = key;
      updateParkingCharts();
    }

    function setFireTrend(key) {
      fireTrendPeriod.value = key;
      updateFireTrendChart();
    }

    function setExtTrend(key) {
      extTrendPeriod.value = key;
      updateExtTrendChart();
    }

    function updateExtTrendChart() {
      if (!pageData.value?.trend) return;
      const data = pageData.value.trend;
      const mode = extTrendPeriod.value;
      let labels = data.hours;
      let values = data.today;
      if (mode === 'yesterday') values = data.yesterday;
      else if (mode === 'week7') { labels = data.week7.labels; values = data.week7.data; }
      else if (mode === 'week30') { labels = data.week30.labels; values = data.week30.data; }
      getOrInitChart('hazardTrendChart')?.setOption(
        buildMpLineOption(labels, values, { name: pageData.value.statsLabel + '数', color: '#1890ff' }),
        true
      );
    }

    function updateHazardStatsCharts() {
      const data = pageData.value;
      if (!data) return;
      getOrInitChart('hazardLevelChart')?.setOption(buildMpDonutOption(data.levelDonut.items), true);
      getOrInitChart('hazardProcessChart')?.setOption(buildMpDonutOption(data.processDonut.items), true);
      bindChartPieClick('hazardLevelChart', (name) => drillDownHazardList('level', name));
      bindChartPieClick('hazardProcessChart', (name) => drillDownHazardList('process', name));
      updateExtTrendChart();
    }

    function updateCertCharts() {
      const d = pageData.value;
      if (!d) return;
      const cert = d.certByPeriod?.[certPeriod.value] || d;
      getOrInitChart('certDeptPie')?.setOption(buildMpDonutOption(cert.certDeptPie), true);
      getOrInitChart('certTypePie')?.setOption(buildMpDonutOption(cert.certTypePie), true);
    }

    function updatePersonnelCharts() {
      const d = pageData.value;
      if (!d?.tabs) return;
      const pieFactor = getQuarterScale(personnelPieQuarter.value);
      const trendFactor = getQuarterScale(personnelTrendQuarter.value);
      const pieTab = d.tabs[personnelPieTab.value] || d.tabs.dept;
      const trendTab = d.tabs[personnelTrendTab.value] || d.tabs.dept;
      getOrInitChart('personnelDeptPie')?.setOption(
        buildMpDonutOption(scaleDonutItems(pieTab.donut, pieFactor), {
          centerLabel: '人员总数',
          centerValue: Math.round(d.totalPersonnel * pieFactor),
          compact: true,
        }),
        true
      );
      getOrInitChart('personnelTrendChart')?.setOption(
        buildMpMultiLineOption(d.trendMonths, scaleTrendSeries(trendTab.trendSeries, trendFactor), { yMax: trendTab.trendYMax }),
        true
      );
      updateCertCharts();
    }

    function setPersonnelPieTab(tab) {
      personnelPieTab.value = tab;
      nextTick(() => {
        const d = pageData.value;
        if (!d?.tabs) return;
        const pieFactor = getQuarterScale(personnelPieQuarter.value);
        const pieTab = d.tabs[tab] || d.tabs.dept;
        getOrInitChart('personnelDeptPie')?.setOption(
          buildMpDonutOption(scaleDonutItems(pieTab.donut, pieFactor), {
            centerLabel: '人员总数',
            centerValue: Math.round(d.totalPersonnel * pieFactor),
            compact: true,
          }),
          true
        );
      });
    }

    function setPersonnelTrendTab(tab) {
      personnelTrendTab.value = tab;
      nextTick(() => {
        const d = pageData.value;
        if (!d?.tabs) return;
        const trendFactor = getQuarterScale(personnelTrendQuarter.value);
        const trendTab = d.tabs[tab] || d.tabs.dept;
        getOrInitChart('personnelTrendChart')?.setOption(
          buildMpMultiLineOption(d.trendMonths, scaleTrendSeries(trendTab.trendSeries, trendFactor), { yMax: trendTab.trendYMax }),
          true
        );
      });
    }

    function setCertPeriod(period) {
      certPeriod.value = period;
      nextTick(updateCertCharts);
    }

    function setPersonnelPieQuarter(quarter) {
      personnelPieQuarter.value = quarter;
      nextTick(() => setPersonnelPieTab(personnelPieTab.value));
    }

    function setPersonnelTrendQuarter(quarter) {
      personnelTrendQuarter.value = quarter;
      nextTick(() => setPersonnelTrendTab(personnelTrendTab.value));
    }

    function setEnvBuilding(building) {
      envBuilding.value = building;
      nextTick(updateEnvOperationCharts);
    }

    function setRiskPeriod(period) {
      riskPeriod.value = period;
      nextTick(updateRiskDashboardCharts);
    }

    function setCanteenTrendMode(mode) {
      canteenTrendMode.value = mode;
      nextTick(() => updateCanteenCardCharts());
    }

    function updateCanteenCardCharts() {
      const d = pageData.value;
      if (!d?.trendWeek) return;
      const trend = canteenTrendPeriod.value === 'month' && d.trendMonth ? d.trendMonth : d.trendWeek;
      const src = canteenTrendMode.value === 'amount' ? trend.byAmount : trend.byCount;
      const yMax = canteenTrendMode.value === 'amount' ? 7000 : 700;
      const yFormatter = canteenTrendMode.value === 'amount' ? '{value}元' : '{value}次';
      getOrInitChart('canteenTrendChart')?.setOption(
        buildMpMultiLineOption(trend.labels, src, { yMax, yFormatter }),
        true
      );
    }

    function updateCanteenOpCharts() {
      const d = pageData.value?.top5;
      if (!d) return;
      const items = d.labels.map((name, i) => ({ name, value: d.actual[i], color: '#1890ff' }));
      getOrInitChart('canteenActualTop5')?.setOption(buildMpHBarOption(items, { valueFormatter: '{c}人' }), true);
      const booked = d.labels.map((name, i) => ({ name, value: d.booked[i], color: '#1890ff' }));
      getOrInitChart('canteenBookedTop5')?.setOption(buildMpHBarOption(booked, { valueFormatter: '{c}人' }), true);
    }

    function shiftMenuWeek(dir) {
      menuWeekOffset.value += dir;
    }

    function goRepairNextStep() {
      if (!repairForm.value.orderType || !repairForm.value.processType) return;
      repairStep.value = 2;
    }

    function goRepairBack() {
      repairStep.value = 1;
    }

    function shiftMaintCalMonth(dir) {
      const [y, m] = maintCalMonth.value.split('-').map(Number);
      let nm = m + dir;
      let ny = y;
      if (nm < 1) { nm = 12; ny -= 1; }
      else if (nm > 12) { nm = 1; ny += 1; }
      maintCalMonth.value = `${ny}-${String(nm).padStart(2, '0')}`;
    }

    function resetMaintCalToday() {
      maintCalMonth.value = pageData.value?.month || '2025-12';
    }

    function riskLevelClass(level) {
      if (!level) return '';
      if (level.includes('高') && !level.includes('中')) return 'lv-high';
      if (level.includes('中')) return 'lv-mid';
      return 'lv-low';
    }

    function updateEnvOperationCharts() {
      const d = pageData.value;
      if (!d?.chartSeries) return;
      const labels = d.chartLabels;
      const buildingIdx = Math.max(0, (d.buildings || []).indexOf(envBuilding.value));
      const factor = 0.85 + buildingIdx * 0.08;
      const series = d.chartSeries.map((s) => ({
        ...s,
        data: s.data.map((v) => Math.round(v * factor)),
      }));
      const charts = [
        ['envChartTemp', '温度'],
        ['envChartHumidity', '湿度'],
        ['envChartPm25', 'PM2.5'],
        ['envChartSo2', '二氧化硫'],
      ];
      charts.forEach(([id]) => {
        getOrInitChart(id)?.setOption(buildMpMultiLineOption(labels, series, { yMax: 25 }), true);
      });
    }

    function updateRiskDashboardCharts() {
      const d = pageData.value;
      if (!d) return;
      const periodMap = {
        today: { labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'], data: [2, 3, 4, 5, 4, 3], peak: 5 },
        week: d.trend7,
        month: { labels: ['4/1', '4/8', '4/15', '4/22', '4/29'], data: [42, 48, 45, 52, 46], peak: 52 },
        custom: { labels: ['3/1', '3/15', '4/1', '4/15'], data: [38, 44, 50, 47], peak: 50 },
      };
      const trend = periodMap[riskPeriod.value] || d.trend7;
      getOrInitChart('riskTrendChart')?.setOption(
        buildMpLineOption(trend.labels, trend.data, { name: '风险数', color: '#722ed1', area: true }),
        true
      );
      getOrInitChart('riskLevelPie')?.setOption(buildMpDonutOption(d.levelDonut), true);
      getOrInitChart('riskSectorBar')?.setOption(
        buildMpHBarOption(d.sectorBars.map((b) => ({ name: b.name, value: b.value, color: b.color })), { valueFormatter: '{c}%' }),
        true
      );
      getOrInitChart('riskEfficiencyBar')?.setOption(
        buildMpHBarOption(d.efficiency.deptBars.map((b) => ({ name: b.name, value: b.value, color: '#1890ff' })), { valueFormatter: '{c}h' }),
        true
      );
    }

    function updateRiskReportCharts() {
      const p = pageData.value?.preview;
      if (!p) return;
      getOrInitChart('riskReportLevelPie')?.setOption(buildMpDonutOption(p.levelDonut), true);
      getOrInitChart('riskReportTrendChart')?.setOption(
        buildMpLineOption(p.trend8.labels, p.trend8.data, { name: '风险数', color: '#722ed1', area: true }),
        true
      );
    }

    function updateEnergyOverviewCharts() {
      const d = pageData.value;
      if (!d) return;
      getOrInitChart('energyTodayTrend')?.setOption(
        buildMpLineOption(['0', '6', '12', '18', '24'], [0, 0, 0, 0, 0], { name: '今日用量', color: '#1890ff' }),
        true
      );
      getOrInitChart('energyRatioPie')?.setOption(
        buildMpDonutOption(d.ratioItems.map((i) => ({ name: i.name, count: i.value, color: i.color })), {
          centerLabel: '总值', centerValue: '0.00 kWh',
        }),
        true
      );
    }

    function updateEnergyFlowChart() {
      const d = pageData.value?.sankey;
      if (!d) return;
      getOrInitChart('energySankeyChart')?.setOption(buildMpSankeyOption(d.nodes, d.links), true);
    }

    function resetBindFilterList() {
      filteredBindRows.value = [...(pageData.value?.rows || [])];
    }

    function applyBindFilter() {
      const src = pageData.value?.rows || [];
      filteredBindRows.value = bindFilter.value.status
        ? src.filter((r) => r.bindStatus === bindFilter.value.status)
        : [...src];
    }

    function resetBindFilter() {
      bindFilter.value = { status: '' };
      resetBindFilterList();
    }

    function applyHazardListFilter() {
      hazardListFilter.value = { ...hazardListFilter.value, situation: '' };
    }

    function resetHazardListFilter() {
      hazardListFilter.value = { status: '', level: '', start: '', end: '', situation: '' };
    }

    function applyFireListFilter() {
      const f = fireListFilter.value;
      fireListFilter.value = { ...f, situation: '' };
      fireListTimeApplied.value = !!(f.reportStart || f.reportEnd || f.processStart || f.processEnd);
    }

    function resetFireListFilter() {
      fireListFilter.value = {
        status: '', level: '',
        reportStart: '', reportEnd: '',
        processStart: '', processEnd: '',
        situation: '',
      };
      fireListTimeApplied.value = false;
    }

    const FIRE_STATS_NAV = {
      'fire-alarm-stats': { listPath: 'fire-alarm-list', listId: 'fire-alarm-list', kind: 'alarm' },
      'fire-fault-stats': { listPath: 'fire-fault-list', listId: 'fire-fault-list', kind: 'fault' },
      'fire-hazard-stats': { listPath: 'fire-hazard-list', listId: 'fire-hazard-list', kind: 'hazard' },
    };

    function setFireListDrillFilter(kind, filterType, value) {
      const base = {
        status: '', level: '',
        reportStart: '', reportEnd: '',
        processStart: '', processEnd: '',
        situation: '',
      };
      if (filterType === 'situation') {
        base.situation = value;
      } else if (filterType === 'level') {
        base.level = value;
      } else if (filterType === 'process') {
        base.status = value;
      }
      if (kind === 'hazard') {
        hazardListFilter.value = base;
      } else {
        fireListFilter.value = base;
        fireListTimeApplied.value = false;
      }
    }

    function drillDownFireList(filterType, value) {
      const nav = FIRE_STATS_NAV[currentView.value];
      if (!nav || nav.kind === 'hazard') return;
      setFireListDrillFilter(nav.kind, filterType, value);
      navigateToView(nav.listPath, nav.listId, 'security');
    }

    function drillDownHazardList(filterType, value) {
      setFireListDrillFilter('hazard', filterType, value);
      navigateToView('fire-hazard-list', 'fire-hazard-list', 'security');
    }

    function bindChartPieClick(chartId, handler) {
      const chart = getOrInitChart(chartId);
      if (!chart || !handler) return;
      chart.off('click');
      chart.on('click', (params) => {
        if (params.componentType === 'series' && params.seriesType === 'pie' && params.name) {
          handler(params.name);
        }
      });
    }

    function filterParkingHistory() {
      /* 演示数据固定，保留交互入口 */
    }

    function resetParkingFilter() {
      parkingDateStart.value = '';
      parkingDateEnd.value = '';
    }

    function updateDashDevicePie() {
      getOrInitChart('dashDevicePie')?.setOption(
        buildMpDonutOption(dash.deviceStatus.items.map((i) => ({ name: i.name, count: i.count, color: i.color })), { compact: true }),
        true
      );
    }

    function updateDashRepairPie() {
      getOrInitChart('dashRepairPie')?.setOption(
        buildMpDonutOption(dash.repairClassify.segments),
        true
      );
    }

    function updateDashRepairTrendChart() {
      const src = dash.repairTrend[dashRepairTrend.value];
      getOrInitChart('dashRepairTrend')?.setOption(
        buildMpLineOption(src.labels, src.data, { name: '报修数', color: '#1890ff' }),
        true
      );
    }

    function getDashTaskSnapshot(taskKey, period) {
      const base = dash[taskKey];
      if (period === 'all') return base;
      const factor = { today: 0.06, week: 0.28, month: 0.55 }[period] || 1;
      const scale = (n) => Math.max(0, Math.round(n * factor));
      const segments = base.segments.map((s) => ({ ...s, count: scale(s.count) }));
      const total = segments.reduce((sum, s) => sum + s.count, 0);
      const done = segments.find((s) => s.name === '已完成')?.count || 0;
      return {
        ...base,
        total,
        rate: total ? Math.round((done / total) * 10000) / 100 : 0,
        segments,
        statusCounts: base.statusCounts.map((s, i) => ({ ...s, value: segments[i]?.count ?? scale(s.value) })),
      };
    }

    function setDashMaintPeriod(period) {
      dashMaintPeriod.value = period;
      nextTick(() => updateDashMaintCharts());
    }

    function setDashInspectPeriod(period) {
      dashInspectPeriod.value = period;
      nextTick(() => updateDashInspectCharts());
    }

    function updateDashMaintCharts() {
      const task = getDashTaskSnapshot('maintenanceTask', dashMaintPeriod.value);
      getOrInitChart('dashMaintPie')?.setOption(
        buildMpDonutOption(task.segments, {
          centerLabel: '任务总数',
          centerValue: task.total,
          compact: true,
        }),
        true
      );
      getOrInitChart('dashMaintGauge')?.setOption(buildMpGaugeOption(task.rate), true);
    }

    function updateDashInspectCharts() {
      const task = getDashTaskSnapshot('inspectionTask', dashInspectPeriod.value);
      getOrInitChart('dashInspectPie')?.setOption(
        buildMpDonutOption(task.segments, {
          centerLabel: '任务总数',
          centerValue: task.total,
          compact: true,
        }),
        true
      );
      getOrInitChart('dashInspectGauge')?.setOption(buildMpGaugeOption(task.rate), true);
    }

    function updateParkingCharts() {
      const trend = mod.parkingOverview.trafficTrend;
      const period = parkingTrendPeriod.value;
      let labels = trend.hours;
      let series = [];
      if (period === 'today') {
        labels = ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:59'];
        const pick = (arr) => [arr[0], arr[3], arr[6], arr[9], arr[12], arr[15], arr[18], arr[21], arr[23]];
        series = [
          { name: '入场', data: pick(trend.today.entry), color: '#52c41a', area: true },
          { name: '出场', data: pick(trend.today.exit), color: '#1890ff', area: true },
        ];
      } else if (period === 'week') {
        labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        series = [
          { name: '入场', data: trend.week.entry, color: '#52c41a', area: true },
          { name: '出场', data: trend.week.exit, color: '#1890ff', area: true },
        ];
      } else {
        labels = trend.month.entry.map((_, i) => `${i + 1}日`);
        series = [
          { name: '入场', data: trend.month.entry, color: '#52c41a', area: false },
          { name: '出场', data: trend.month.exit, color: '#1890ff', area: false },
        ];
      }
      getOrInitChart('parkingTrafficChart')?.setOption(buildMpMultiLineOption(labels, series), true);
      getOrInitChart('parkingTypePie')?.setOption(
        buildMpDonutOption(mod.parkingOverview.vehicleTypes.items, {
          centerLabel: '车辆总数',
          centerValue: mod.parkingOverview.vehicleTypes.total,
        }),
        true
      );
    }

    function updateAccessCharts() {
      const ao = mod.accessOverview;
      getOrInitChart('accessTrafficChart')?.setOption(
        buildMpMultiLineOption(ao.trafficTrend.hours, [
          { name: '总通行', data: ao.trafficTrend.total, color: '#1890ff', area: false },
          { name: '访客', data: ao.trafficTrend.visitor, color: '#13c2c2', area: false },
        ]),
        true
      );
      getOrInitChart('accessPersonPie')?.setOption(buildMpDonutOption(ao.personnelPie.items), true);
      getOrInitChart('accessDeptBar')?.setOption(
        buildMpHBarOption(ao.deptRankTop5.map((d, i) => ({
          name: d.name,
          value: d.value,
          color: i === 0 ? '#eb2f96' : '#13c2c2',
        })), { valueFormatter: '{c}人' }),
        true
      );
    }

    function updateFireStatsCharts() {
      const data = fireStatsData.value;
      getOrInitChart(fireLevelChartId.value)?.setOption(
        buildMpDonutOption(data.levelDonut.items),
        true
      );
      getOrInitChart(fireProcessChartId.value)?.setOption(
        buildMpDonutOption(data.processDonut.items),
        true
      );
      bindChartPieClick(fireLevelChartId.value, (name) => drillDownFireList('level', name));
      bindChartPieClick(fireProcessChartId.value, (name) => drillDownFireList('process', name));
      updateFireTrendChart();
    }

    function updateFireTrendChart() {
      const data = fireStatsData.value.trend;
      const mode = fireTrendPeriod.value;
      let labels = data.hours;
      let values = data.today;
      if (mode === 'yesterday') values = data.yesterday;
      else if (mode === 'week7') {
        labels = data.week7.labels;
        values = data.week7.data;
      } else if (mode === 'week30') {
        labels = data.week30.labels;
        values = data.week30.data;
      }
      getOrInitChart(fireTrendChartId.value)?.setOption(
        buildMpLineOption(labels, values, { name: fireStatsLabel.value + '数', color: '#1890ff' }),
        true
      );
    }

    function initDashboardCharts() {
      disposeAllCharts();
      nextTick(() => {
        updateDashDevicePie();
        updateDashRepairPie();
        updateDashRepairTrendChart();
        updateDashMaintCharts();
        updateDashInspectCharts();
        setTimeout(resizeAllCharts, 80);
      });
    }

    function initModuleCharts(path) {
      disposeAllCharts();
      nextTick(() => {
        if (path === 'dashboard') initDashboardCharts();
        else if (path === 'parking-overview') {
          updateParkingCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'parking-gate-device' || path === 'access-device') {
          resetDeviceFilter();
        } else if (path === 'monitor-device') {
          resetMonitorFilter();
        } else if (path === 'access-overview') {
          updateAccessCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'fire-alarm-stats' || path === 'fire-fault-stats') {
          updateFireStatsCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'fire-hazard-stats') {
          updateHazardStatsCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'personnel-mgmt') {
          updatePersonnelCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'energy-overview') {
          updateEnergyOverviewCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'energy-flow') {
          updateEnergyFlowChart();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'canteen-card-records') {
          updateCanteenCardCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'canteen-operation') {
          updateCanteenOpCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'property-repair-new') {
          repairStep.value = 1;
        } else if (path === 'property-maint-calendar') {
          maintCalMonth.value = pageData.value?.month || '2025-12';
        } else if (path === 'env-device') {
          resetBindFilter();
        } else if (path === 'env-operation') {
          updateEnvOperationCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'risk-dashboard') {
          updateRiskDashboardCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'risk-report-center') {
          updateRiskReportCharts();
          setTimeout(resizeAllCharts, 80);
        } else if (path === 'fire-alarm-sys-device' || path === 'fire-smoke-device'
          || path === 'fire-sprinkler-device' || path === 'fire-hydrant-device') {
          resetBindFilter();
        }
      });
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

      const totalArea = officeAreaChart.totalArea
        || summaryCards.find((c) => c.label === '总使用面积')?.value?.replace(/,/g, '');

      if (areaChartLevel.value === 'summary') {
        const segments = buildAreaLevel1Segments(officeAreaChart);
        chart.setOption(buildAreaPieOption(segments, {
          clickable: true,
          totalArea,
          title: '总使用面积',
        }), true);
      } else {
        const segments = buildAreaLevel2Segments(officeAreaChart);
        chart.setOption(buildAreaPieOption(segments, {
          clickable: false,
          totalArea: null,
          title: '其他单位',
        }), true);
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
        if (params.name === '其他') {
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
      expandMenuPath(menuItems.value, activeSubId.value);
      initModuleCharts(currentView.value);
      window.addEventListener('resize', resizeAllCharts);
    });

    onUnmounted(() => {
      if (clockTimer) clearInterval(clockTimer);
      window.removeEventListener('resize', resizeAllCharts);
      disposeAllCharts();
    });

    watch(currentView, (v) => {
      if (v !== 'property-repair-new') repairStep.value = 1;
      if (v !== 'risk-rules') riskRulesTab.value = 'list';
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
      mod, dash, dashTodoTab, dashRepairTrend, dashMaintPeriod, dashInspectPeriod, dashMsgTab,
      dashTodoCounts, filteredDashMessages, dashMaintSnapshot, dashInspectSnapshot, taskPeriods,
      parkingTrendPeriod, parkingTrendPeriods, parkingDateStart, parkingDateEnd,
      monitorSearch, selectedCamera, monitorTree,
      fireTrendPeriod, fireTrendPeriods, fireStatsLabel, fireStatsData,
      fireLevelChartId, fireProcessChartId, fireTrendChartId,
      fireListData, fireListFilter, fireListStatusOptions, fireListLevelOptions, fireListLevelLabel,
      filteredFireListRows, filteredHazardListRows, formatFireEndTime,
      pageConfig, pageData, extTrendPeriod, hazardListFilter,
      bindFilter, filteredBindRows,
      personnelPieTab, personnelTrendTab, personnelQuarterOptions, personnelPieQuarter, personnelTrendQuarter,
      certPeriod, certDisplayTotal,
      canteenTrendMode, canteenTrendPeriod, menuWeekLabel, menuWeekOffset,
      repairStep, repairForm, scheduleMonth, scheduleCalendarCells,
      maintCalMonth, maintCalYear, maintCalMonthNum, maintCalCells,
      envBuilding, selectedAgent, riskPeriod, riskRulesTab,
      energyReportType, energyReportTree,
      deviceFilter, devicePage, devicePageSize, devicePageSummary, devicePageColumns,
      deviceFilterOptions, deviceTotal, devicePageMax, devicePageList, pagedDeviceRows,
      monitorFilter, monitorFilterOptions, filteredMonitorRows,
      gwData, gwWarehouses, gwCumulativeMode,
      gwCumulativeHistoryYear, gwCumulativeHistoryQuarter,
      gwCumulativeHistoryYears, gwCumulativeHistoryQuarters,
      gwInboundMetric, gwOutboundMetric,
      gwCumulativeHistory, gwInboundDisplay, gwOutboundDisplay,
      gwInboundMetricLabel, gwOutboundMetricLabel,
      gwInboundHistory, gwOutboundHistory,
      gwInboundHistoryExpanded, gwOutboundHistoryExpanded,
      gwInboundHistoryHasMore, gwOutboundHistoryHasMore,
      toggleGwInboundHistoryExpand, toggleGwOutboundHistoryExpand,
      getMenuIcon, getSummaryIcon,
      toggleSidebar, toggleMenu, toggleNavGroup, selectSubMenu, selectMenuLeaf, navigateToView, navigateToFunction,
      isMenuActive, isSubActive,
      toggleLocation, selectLocation, togglePlatform, closeDropdowns,
      toggleFullscreen, navigateToPlatform,
      backAreaChart,
      resetUnitChangeFilter, formatChangeDate, formatChangeDelta, changeDeltaClass,
      openUnitChangeModal, closeUnitChangeModal,
      getMetricIcon,
      switchGwCumulativeMode,
      switchGwInboundMetric, switchGwOutboundMetric,
      gwStockRatio, gwCumulativeRatio, formatGwChange, formatGwTurnoverRate, gwTrendClass,
      setDashRepairTrend, setParkingTrend, setFireTrend, setExtTrend,
      filterParkingHistory, resetParkingFilter,
      applyDeviceFilter, resetDeviceFilter, applyMonitorFilter, resetMonitorFilter,
      applyFireListFilter, resetFireListFilter, drillDownFireList, drillDownHazardList,
      applyBindFilter, resetBindFilter,
      applyHazardListFilter, resetHazardListFilter,
      setPersonnelPieTab, setPersonnelTrendTab, setCertPeriod,
      setPersonnelPieQuarter, setPersonnelTrendQuarter, setEnvBuilding, setRiskPeriod,
      setCanteenTrendMode, updateCanteenCardCharts,
      setDashMaintPeriod, setDashInspectPeriod, shiftMenuWeek, goRepairNextStep, goRepairBack,
      shiftMaintCalMonth, resetMaintCalToday, riskLevelClass,
    };
  },
}).mount('#mp-app');
