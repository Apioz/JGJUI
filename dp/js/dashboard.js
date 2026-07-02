const { createApp, ref, computed, watch, nextTick, onMounted, onUnmounted } = Vue;

const CHART_THEME = {
  textColor: '#ffffff',
  axisLine: 'rgba(0, 191, 255, 0.15)',
  splitLine: 'rgba(0, 191, 255, 0.06)',
  cyan: '#00e5ff',
  brand: '#075682',
  orange: '#ff9500',
  cyanGradient: [
    { offset: 0, color: 'rgba(0, 229, 255, 0.35)' },
    { offset: 1, color: 'rgba(0, 229, 255, 0.02)' },
  ],
  orangeGradient: [
    { offset: 0, color: 'rgba(255, 149, 0, 0.35)' },
    { offset: 1, color: 'rgba(255, 149, 0, 0.02)' },
  ],
};

function formatNumber(n) {
  return Number(n).toLocaleString('en-US');
}

const TIME_UNITS = [
  { value: 'day', label: '日' },
  { value: 'month', label: '月' },
  { value: 'year', label: '年' },
];

const YEAR_INPUT_MIN = 2000;
const YEAR_INPUT_MAX = 2100;

function defaultDateForUnit(unit) {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  if (unit === 'day') return `${y}-${m}-${d}`;
  if (unit === 'month') return `${y}-${m}`;
  return String(y);
}

function dateInputTypeForUnit(unit) {
  if (unit === 'day') return 'date';
  if (unit === 'month') return 'month';
  return 'number';
}

function buildRankList(data, unit) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return data.map((item) => ({
    name: item.name,
    value: item.value,
    unit,
    percent: (item.value / max) * 100,
  }));
}

function buildAreaRankList(data) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return data.map((item) => ({
    name: item.name,
    value: item.value,
    displayValue: formatNumber(item.value),
    percent: (item.value / max) * 100,
  }));
}

function buildTrendOption() {
  const { months, space, equipment } = DASHBOARD_DATA.trendChart;
  return {
    grid: { top: 30, right: 20, bottom: 24, left: 50 },
    legend: {
      top: 4, right: 20,
      textStyle: { color: CHART_THEME.textColor, fontSize: 11 },
      itemWidth: 12, itemHeight: 8,
      data: ['空间数', '设备数'],
    },
    xAxis: {
      type: 'category', data: months,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 10 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      {
        name: '空间数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
        data: space, lineStyle: { color: CHART_THEME.cyan, width: 2 },
        itemStyle: { color: CHART_THEME.cyan },
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: CHART_THEME.cyanGradient },
        },
      },
      {
        name: '设备数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
        data: equipment, lineStyle: { color: CHART_THEME.orange, width: 2 },
        itemStyle: { color: CHART_THEME.orange },
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: CHART_THEME.orangeGradient },
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
  };
}

function buildWorkOrderOption() {
  const { days, completed, pending } = DASHBOARD_DATA.workOrder;
  return {
    grid: { top: 30, right: 16, bottom: 24, left: 36 },
    legend: {
      top: 4, right: 10,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['已完成工单', '待处理工单'],
    },
    xAxis: {
      type: 'category', data: days,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9, interval: 4 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 10 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      {
        name: '已完成工单', type: 'line', smooth: true, symbol: 'circle', symbolSize: 4,
        data: completed, lineStyle: { color: CHART_THEME.cyan, width: 2 },
        itemStyle: { color: CHART_THEME.cyan },
      },
      {
        name: '待处理工单', type: 'line', smooth: true, symbol: 'circle', symbolSize: 4,
        data: pending, lineStyle: { color: '#7b68ee', width: 2 },
        itemStyle: { color: '#7b68ee' },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
  };
}

function buildAssetTypeOption(typeData) {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
    legend: {
      orient: 'vertical',
      right: 8,
      top: 'center',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
    },
    series: [{
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['36%', '50%'],
      avoidLabelOverlap: true,
      label: { show: false },
      labelLine: { show: false },
      data: typeData.items.map((item) => ({
        name: item.name,
        value: item.value,
        itemStyle: { color: item.color },
      })),
    }],
  };
}

function buildSimpleDonutOption(items) {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
    legend: {
      orient: 'vertical',
      right: 4,
      top: 'center',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 6,
      textStyle: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    series: [{
      type: 'pie',
      radius: ['40%', '62%'],
      center: ['34%', '50%'],
      label: { show: false },
      labelLine: { show: false },
      data: items.map((item) => ({
        name: item.name,
        value: item.value,
        itemStyle: { color: item.color },
      })),
    }],
  };
}

function buildOfficeAreaPieOption(chartData) {
  const centerX = '36%';
  const totalText = `${formatNumber(chartData.totalArea)}㎡`;
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c}% ({d}%)',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
    legend: {
      orient: 'vertical',
      right: 8,
      top: 'center',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 6,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
    },
    graphic: [{
      type: 'group',
      left: centerX,
      top: '50%',
      bounding: 'raw',
      children: [
        {
          type: 'text',
          style: {
            text: '总面积',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fill: 'rgba(255,255,255,0.75)',
            fontSize: 10,
          },
          top: -10,
        },
        {
          type: 'text',
          style: {
            text: totalText,
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fill: CHART_THEME.textColor,
            fontSize: 16,
            fontWeight: 'bold',
          },
          top: 10,
        },
      ],
    }],
    series: [{
      type: 'pie',
      radius: ['42%', '68%'],
      center: [centerX, '50%'],
      avoidLabelOverlap: true,
      label: { show: false },
      labelLine: { show: false },
      data: chartData.items.map((item) => ({
        name: item.name,
        value: item.proportion,
        itemStyle: { color: item.color },
      })),
    }],
  };
}

function buildGwStockPieOption(stock, warehouses) {
  const centerX = '36%';
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} 件 ({d}%)',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
    legend: {
      orient: 'vertical',
      right: 8,
      top: 'center',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 6,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
    },
    graphic: [{
      type: 'group',
      left: centerX,
      top: '50%',
      bounding: 'raw',
      children: [
        {
          type: 'text',
          style: {
            text: '本季总数',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fill: 'rgba(255,255,255,0.75)',
            fontSize: 10,
          },
          top: -10,
        },
        {
          type: 'text',
          style: {
            text: String(stock.total),
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fill: CHART_THEME.textColor,
            fontSize: 18,
            fontWeight: 'bold',
          },
          top: 10,
        },
      ],
    }],
    series: [{
      type: 'pie',
      radius: ['42%', '68%'],
      center: [centerX, '50%'],
      label: { show: false },
      labelLine: { show: false },
      data: warehouses.map((w, i) => ({
        name: w.shortName,
        value: i === 0 ? stock.w1 : stock.w2,
        itemStyle: { color: w.color },
      })),
    }],
  };
}

function buildGwCumulativeTrendOption(labels, w1Data, w2Data, warehouses) {
  return {
    grid: { top: 36, right: 12, bottom: 22, left: 44 },
    legend: {
      top: 4, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 12, itemHeight: 8,
      data: warehouses.map((w) => w.shortName),
    },
    xAxis: {
      type: 'category', data: labels,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      {
        name: warehouses[0].shortName, type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
        data: w1Data, lineStyle: { color: warehouses[0].color, width: 2 },
        itemStyle: { color: warehouses[0].color },
      },
      {
        name: warehouses[1].shortName, type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
        data: w2Data, lineStyle: { color: warehouses[1].color, width: 2 },
        itemStyle: { color: warehouses[1].color },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
  };
}

function buildAssetTrendOption() {
  const { months, space, equipment } = DASHBOARD_DATA.assetTrendChart;
  return {
    grid: { top: 30, right: 20, bottom: 24, left: 40 },
    legend: {
      top: 4, right: 20,
      textStyle: { color: CHART_THEME.textColor, fontSize: 11 },
      itemWidth: 12, itemHeight: 8,
      data: ['空间数量', '设备数量'],
    },
    xAxis: {
      type: 'category', data: months,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    yAxis: {
      type: 'value', min: 0, max: 100,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 10 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      {
        name: '空间数量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
        data: space, lineStyle: { color: CHART_THEME.cyan, width: 2 },
        itemStyle: { color: CHART_THEME.cyan },
      },
      {
        name: '设备数量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
        data: equipment, lineStyle: { color: CHART_THEME.orange, width: 2 },
        itemStyle: { color: CHART_THEME.orange },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
  };
}

createApp({
  setup() {
    const navTabs = DASHBOARD_DATA.navTabs;
    const activeTab = ref('综合态势');
    const overviewProjects = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.projects)));
    const overviewMapProjects = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.overviewMapProjects)));
    const overviewSpaceCategories = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.overviewSpaceCategories)));
    const overviewEquipmentCategories = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.overviewEquipmentCategories)));
    const assetSpaceCategories = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.assetSpaceCategories)));
    const assetEquipmentCategories = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.assetEquipmentCategories)));
    const parkProjects = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.parkProjects)));
    const assetProjects = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.assetProjects)));
    const propertyProjects = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.propertyProjects)));
    const moduleProjects = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.moduleProjects)));
    const securityProjects = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.securityProjects)));
    const fireProjects = ref(JSON.parse(JSON.stringify(DASHBOARD_DATA.fireProjects)));
    const searchQuery = ref('');
    const selectedProject = ref('p1');
    const rankTab1 = ref('vehicle');
    const rankTab2 = ref('electricity');
    const rankDate1 = ref('2026-06');
    const rankDate2 = ref('2026-06');
    const workOrderMonth = ref('2026-06');
    const assetTypeTab = ref('space');
    const gwCumulativeMode = ref('year');
    const gwData = MIDDLE_PLATFORM_DATA.publicWarehouse;
    const gwWarehouses = gwData.warehouses;
    const propertyOmTab = ref('repair');
    const propertyPeriod = ref('month');
    const propertyDate = ref(defaultDateForUnit('month'));
    const energyTypeTab = ref('electricity');
    const energyPeriodTab = ref('month');
    const envTempTab = ref('max');
    const envAirTab = ref('max');
    const securityMenuOpen = ref(false);
    const platformMenuOpen = ref(false);
    const fireRankTab = ref('alarm');
    const firePeriod = ref('month');
    const fireDate = ref(defaultDateForUnit('month'));
    const fireSubSystem = ref('event');
    const fireFloorMode = ref(false);
    const fireSelectedFloor = ref('1F');
    const fireBuildingPopupId = ref(null);
    const fireSafetySystemIdx = ref(0);
    const fireDeviceSearch = ref('');
    const fireSelectedDevice = ref(null);
    const overviewViewMode = ref('map');
    const mapPopupProjectId = ref(null);
    const mapPopupPos = ref({ x: 0, y: 0 });
    const activeParkProjectId = ref('p1');
    const overviewEnergyTab = ref('electricity');
    const overviewEnergyProject = ref(null);
    const overviewTrafficPeriod = ref('month');
    const overviewTrafficDate = ref(defaultDateForUnit('month'));
    const overviewEnergyPeriod = ref('day');
    const overviewEnergyDate = ref(defaultDateForUnit('day'));
    const overviewWorkOrderPeriod = ref('month');
    const overviewWorkOrderDate = ref(defaultDateForUnit('month'));
    const parkRotateX = ref(-12);
    const parkRotateY = ref(0);
    const parkScale = ref(1.1);
    const parkOrbiting = ref(false);
    const selectedParkBuilding = ref(null);
    const parkBuildings = DASHBOARD_DATA.parkBuildings;
    let parkOrbitStart = null;

    const charts = {};
    const MODULE_TABS = ['资产管理', '物业管理', '能源管理', '环境管理', '食堂管理', '消防管理'];
    const MODULE_PARK_TABS = ['资产管理', '物业管理', '能源管理', '环境管理', '食堂管理', '消防管理'];

    const isOverviewTab = computed(() => activeTab.value === '综合态势');
    const isModuleSandboxTab = computed(() => MODULE_PARK_TABS.includes(activeTab.value));
    const isOverviewMapMode = computed(() => isOverviewTab.value && overviewViewMode.value === 'map');
    const isOverviewParkMode = computed(() => isOverviewTab.value && overviewViewMode.value === 'park');
    const isModuleMapMode = computed(() => isModuleSandboxTab.value && overviewViewMode.value === 'map');
    const isModuleParkMode = computed(() => isModuleSandboxTab.value && overviewViewMode.value === 'park');
    const isSandboxMapMode = computed(() => isOverviewMapMode.value || isModuleMapMode.value);
    const isSandboxParkMode = computed(() => isOverviewParkMode.value || isModuleParkMode.value);
    const isParkSceneVisible = computed(() => isSandboxParkMode.value && !isFireFloorMode.value);
    const isParkInteractiveVisible = computed(() => isSandboxParkMode.value && !isFireFloorMode.value);
    const isAssetTab = computed(() => activeTab.value === '资产管理');
    const isFireTab = computed(() => activeTab.value === '消防管理');
    const isFireFloorMode = computed(() => isFireTab.value && fireFloorMode.value);
    const isFireParkMode = computed(() => isFireTab.value && isModuleParkMode.value && !fireFloorMode.value);
    const isFireMapMode = computed(() => isFireTab.value && isModuleMapMode.value);
    const isFireMapWithPopup = computed(() => isFireMapMode.value && !!mapPopupProjectId.value);
    const isFireEventMode = computed(() => isFireParkMode.value && fireSubSystem.value === 'event');
    const isFireSystemMode = computed(() => isFireParkMode.value && fireSubSystem.value !== 'event');
    const showFireSafetyPanel = computed(() => (
      isFireTab.value && (isFireMapWithPopup.value || isFireParkMode.value || isFireFloorMode.value)
    ));
    const showFireDevicePanel = computed(() => isFireSystemMode.value);

    const isAssetParkScope = computed(() => {
      if (!isAssetTab.value) return false;
      if (isModuleParkMode.value) return true;
      if (isModuleMapMode.value && mapPopupProjectId.value) return true;
      return false;
    });

    const assetSecondPanelTitle = computed(() => (
      isAssetParkScope.value ? '办公用房总使用面积占比' : '本季在仓物资分仓占比'
    ));

    function getActiveOfficeAreaChart() {
      const pid = isModuleParkMode.value
        ? activeModuleProjectId.value
        : mapPopupProjectId.value;
      const charts = DASHBOARD_DATA.parkOfficeAreaChart;
      return charts.byProject?.[pid] || charts.default;
    }

    const isSecurityTab = computed(() => activeTab.value === '安全管理' || activeTab.value === '消防管理');
    const securityNavLabel = computed(() => (
      isSecurityTab.value ? activeTab.value : '综合安防'
    ));
    const isModuleSidebarTab = computed(() => MODULE_TABS.includes(activeTab.value) && !isAssetTab.value);

    const currentProjects = computed(() => {
      if (isOverviewParkMode.value) return parkProjects.value;
      if (isAssetTab.value) return assetProjects.value;
      if (activeTab.value === '物业管理') return propertyProjects.value;
      if (activeTab.value === '安全管理') return securityProjects.value;
      if (activeTab.value === '消防管理') return fireProjects.value;
      if (isModuleSidebarTab.value) return moduleProjects.value;
      return overviewProjects.value;
    });

    const overviewKpiData = computed(() => (
      isOverviewParkMode.value ? DASHBOARD_DATA.parkKpiData : DASHBOARD_DATA.kpiData
    ));

    const overviewTrendTitle = computed(() => (
      isOverviewParkMode.value
        ? '12个月内项目空间设备趋势分析'
        : '12月内项目空间数及设备数趋势分析'
    ));

    const mapPopupProject = computed(() => {
      if (!mapPopupProjectId.value) return null;
      return DASHBOARD_DATA.projectDetails[mapPopupProjectId.value] || null;
    });

    const activeParkDetail = computed(() => (
      DASHBOARD_DATA.projectDetails[activeParkProjectId.value] || DASHBOARD_DATA.projectDetails.p1
    ));

    function pickParkSceneUrl() {
      return DASHBOARD_DATA.parkSceneImage2x || DASHBOARD_DATA.parkSceneImage;
    }

    const parkSceneUrl = computed(() => pickParkSceneUrl());

    const parkSceneTransformStyle = computed(() => ({
      transform: `perspective(2200px) rotateX(${parkRotateX.value}deg) rotateY(${parkRotateY.value}deg) scale3d(${parkScale.value}, ${parkScale.value}, 1)`,
      transition: parkOrbiting.value ? 'none' : 'transform 0.35s ease',
    }));

    function resolveProjectRootId(id) {
      if (!id || id === 'all') return 'p1';
      return id.includes('-') ? id.replace(/-\d+$/, '') : id;
    }

    const activeModuleProjectId = computed(() => resolveProjectRootId(selectedProject.value));

    const activeParkBuildings = computed(() => {
      const tab = activeTab.value;
      if (tab === '消防管理') return FIRE_DATA.parkBuildings;
      if (tab === '食堂管理') {
        return DASHBOARD_DATA.parkBuildings.filter((b) => b.id === 'c3');
      }
      return DASHBOARD_DATA.parkBuildings.filter((b) => b.id !== 'c3');
    });

    function getParkBuildingMarker(buildingId) {
      const tab = activeTab.value;
      if (tab === '消防管理') {
        const markers = FIRE_DATA.sceneMarkers[fireSubSystem.value];
        if (!markers) return null;
        const hit = markers.find((m) => m.buildingId === buildingId);
        return hit ? { line1: hit.line1, line2: hit.line2 } : null;
      }
      const markers = DASHBOARD_DATA.moduleParkMarkers[tab];
      if (!markers) return null;
      if (tab === '能源管理') {
        const key = energyTypeTab.value === 'water' ? 'water' : 'electricity';
        return markers[key]?.[buildingId] || null;
      }
      return markers[buildingId] || null;
    }

    function parkMarkerStyle(b) {
      return {
        left: `${b.x + b.w / 2}%`,
        top: `${b.y + 4}%`,
      };
    }

    const moduleParkKpiData = computed(() => {
      const tab = activeTab.value;
      const data = DASHBOARD_DATA.moduleParkKpi[tab];
      if (!data) return null;
      if (tab === '能源管理') {
        return energyTypeTab.value === 'water' ? data.water : data.electricity;
      }
      return data;
    });

    const energyBuildingRankList = computed(() => (
      energyTypeTab.value === 'water'
        ? DASHBOARD_DATA.waterBuildingRank
        : DASHBOARD_DATA.energyBuildingRank
    ));

    const energyTypeDonutTitle = computed(() => (
      energyTypeTab.value === 'water' ? '用水类型统计' : '用电类型统计'
    ));

    const leftSidebarTitle = computed(() => {
      if (activeTab.value === '物业管理') return '办公用房列表';
      if (activeTab.value === '消防管理' && showFireDevicePanel.value) return '设备列表';
      return '项目筛选';
    });

    function parkBuildingStyle(b) {
      return {
        left: `${b.x}%`,
        top: `${b.y}%`,
        width: `${b.w}%`,
        height: `${b.h}%`,
      };
    }

    function syncMapVisibility() {
      MapManager.setVisible(!isParkSceneVisible.value);
    }

    function resetParkView() {
      parkRotateX.value = -12;
      parkRotateY.value = 0;
      parkScale.value = 1.1;
      selectedParkBuilding.value = null;
    }

    function selectParkBuilding(building, e) {
      selectedParkBuilding.value = building.id;
      parkRotateX.value = building.focusRotateX;
      parkRotateY.value = building.focusRotateY;
      startParkOrbit(e);
    }

    function startParkOrbit(e) {
      if (e.button !== 0) return;
      if (!selectedParkBuilding.value) return;
      parkOrbiting.value = true;
      parkOrbitStart = {
        x: e.clientX,
        y: e.clientY,
        rotateX: parkRotateX.value,
        rotateY: parkRotateY.value,
      };
      document.addEventListener('mousemove', onParkOrbitMove);
      document.addEventListener('mouseup', stopParkOrbit);
    }

    function onParkOrbitMove(e) {
      if (!parkOrbiting.value || !parkOrbitStart) return;
      const dx = e.clientX - parkOrbitStart.x;
      const dy = e.clientY - parkOrbitStart.y;
      parkRotateY.value = Math.max(-40, Math.min(40, parkOrbitStart.rotateY + dx * 0.18));
      parkRotateX.value = Math.max(-32, Math.min(-2, parkOrbitStart.rotateX - dy * 0.14));
    }

    function stopParkOrbit() {
      parkOrbiting.value = false;
      parkOrbitStart = null;
      document.removeEventListener('mousemove', onParkOrbitMove);
      document.removeEventListener('mouseup', stopParkOrbit);
    }

    const mapPopupStyle = computed(() => ({
      left: `${mapPopupPos.value.x}px`,
      top: `${mapPopupPos.value.y}px`,
    }));

    function updateMapPopupPosition() {
      if (!mapPopupProjectId.value) return;
      const pt = MapManager.getProjectScreenPoint(mapPopupProjectId.value);
      if (pt) mapPopupPos.value = pt;
    }

    const filteredMapProjects = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (!q) return overviewMapProjects.value;
      return overviewMapProjects.value.filter((p) => p.name.toLowerCase().includes(q));
    });

    const currentKpiData = computed(() => {
      if (isFireTab.value) {
        if (isFireSystemMode.value) {
          return FIRE_DATA.systemKpis[fireSubSystem.value] || FIRE_DATA.eventKpi;
        }
        return FIRE_DATA.eventKpi;
      }
      if (isModuleParkMode.value && moduleParkKpiData.value) {
        return moduleParkKpiData.value;
      }
      const map = {
        综合态势: DASHBOARD_DATA.kpiData,
        资产管理: DASHBOARD_DATA.assetKpiData,
        物业管理: DASHBOARD_DATA.propertyKpiData,
        食堂管理: DASHBOARD_DATA.canteenKpiData,
        消防管理: DASHBOARD_DATA.fireKpiData,
      };
      return map[activeTab.value] || DASHBOARD_DATA.kpiData;
    });

    const searchPlaceholder = computed(() => {
      if (activeTab.value === '安全管理') return '搜索项目/楼层/空间';
      if (isModuleSidebarTab.value || isAssetTab.value || activeTab.value === '物业管理') return '搜索项目或空间';
      return '搜索项目...';
    });

    const unitSuffix = computed(() => {
      if (activeTab.value === '物业管理') return '个';
      if (isModuleSidebarTab.value || isAssetTab.value) return '个';
      return '个单体';
    });

    const assetTypeSummary = computed(() => {
      const data = assetTypeTab.value === 'space' ? DASHBOARD_DATA.assetTypeSpace : DASHBOARD_DATA.assetTypeEquipment;
      return `${data.totalLabel} | ${data.totalValue}${data.totalUnit}`;
    });

    const filteredProjects = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (!q) return currentProjects.value;
      return currentProjects.value.filter((p) => p.name.toLowerCase().includes(q));
    });

    const rankList1 = computed(() => {
      const data = rankTab1.value === 'vehicle' ? DASHBOARD_DATA.rankVehicle : DASHBOARD_DATA.rankPerson;
      return buildRankList(data, rankTab1.value === 'vehicle' ? '辆' : '人');
    });

    const rankList2 = computed(() => {
      const data = rankTab2.value === 'electricity' ? DASHBOARD_DATA.rankElectricity : DASHBOARD_DATA.rankWater;
      return buildRankList(data, rankTab2.value === 'electricity' ? 'kwh' : 'm³');
    });

    const overviewEnergyRankList = computed(() => {
      const data = overviewEnergyTab.value === 'water' ? DASHBOARD_DATA.rankWater : DASHBOARD_DATA.rankElectricity;
      const unit = overviewEnergyTab.value === 'water' ? 'm³' : 'kwh';
      return buildRankList(data.slice(0, 4), unit);
    });

    const overviewEnergyPanelTitle = computed(() => (
      overviewEnergyProject.value ? '逐时能耗使用趋势' : '逐时能耗使用TOP4'
    ));

    const overviewEnergyTypeLabel = computed(() => (
      overviewEnergyTab.value === 'water' ? '用水' : '用电'
    ));

    const timeUnits = TIME_UNITS;
    const yearInputMin = YEAR_INPUT_MIN;
    const yearInputMax = YEAR_INPUT_MAX;

    function dateInputType(unit) {
      return dateInputTypeForUnit(unit);
    }

    function syncTrafficDate() {
      overviewTrafficDate.value = defaultDateForUnit(overviewTrafficPeriod.value);
    }

    function syncOverviewEnergyDate() {
      overviewEnergyDate.value = defaultDateForUnit(overviewEnergyPeriod.value);
    }

    function syncWorkOrderDate() {
      overviewWorkOrderDate.value = defaultDateForUnit(overviewWorkOrderPeriod.value);
    }

    function syncFireDate() {
      fireDate.value = defaultDateForUnit(firePeriod.value);
    }

    function syncPropertyDate() {
      propertyDate.value = defaultDateForUnit(propertyPeriod.value);
    }

    const propertyOmRankList = computed(() => buildRankList(
      DASHBOARD_DATA.propertyOmRank[propertyOmTab.value], ''
    ));

    const envTempList = computed(() => (
      envTempTab.value === 'max' ? DASHBOARD_DATA.tempTopMax : DASHBOARD_DATA.tempTopMin
    ));

    const energyCurrentKpi = computed(() => {
      if (activeTab.value === '能源管理' && isModuleParkMode.value && moduleParkKpiData.value) {
        return moduleParkKpiData.value;
      }
      return energyTypeTab.value === 'water' ? DASHBOARD_DATA.waterKpiData : DASHBOARD_DATA.energyKpiData;
    });

    const energyTypeLabel = computed(() => (energyTypeTab.value === 'water' ? '用水' : '用电'));
    const energyDailyTitle = computed(() => `${energyTypeLabel.value}日环比分析`);
    const energyDailyStat = computed(() => (
      energyTypeTab.value === 'water' ? DASHBOARD_DATA.waterDailyStat : DASHBOARD_DATA.energyDailyStat
    ));
    const energyPeriodTitle = computed(() => (
      energyTypeTab.value === 'water' ? '用水月环比分析' : '用电月环比分析'
    ));
    const energyPeriodStat = computed(() => (
      energyTypeTab.value === 'water' ? DASHBOARD_DATA.waterMonthlyStat : DASHBOARD_DATA.energyPeriodStat
    ));
    const energyPeriodLabel = computed(() => (
      energyTypeTab.value === 'water' ? '当月截止当前用水' : '当月截止当前用电'
    ));
    const energyPeriodCompareLabel = computed(() => '较上月');
    const energyPeriodChartTitle = computed(() => '逐日' + energyTypeLabel.value + '趋势');

    const canteenStatus = DASHBOARD_DATA.canteenStatus;
    const canteenGuest = DASHBOARD_DATA.canteenGuest;
    const securityKpiData = DASHBOARD_DATA.securityKpiData;
    const fireKpiData = DASHBOARD_DATA.fireKpiData;
    const publicVehicle = DASHBOARD_DATA.publicVehicle;
    const fireCompletionGauges = DASHBOARD_DATA.fireCompletionGauges;

    const fireRankList = computed(() => {
      const key = fireRankTab.value === 'fault' ? 'fault' : fireRankTab.value === 'danger' ? 'danger' : 'alarm';
      return buildRankList(DASHBOARD_DATA.fireLocationRank[key], '次');
    });

    const fireSubSystems = FIRE_DATA.subSystems;
    const fireSafetyLevel = FIRE_DATA.safetyLevel;
    const fireFloors = FIRE_DATA.floors;
    const currentFireSafetySystem = computed(() => (
      fireSafetyLevel.systems[fireSafetySystemIdx.value] || fireSafetyLevel.systems[0]
    ));
    const currentFireDeviceList = computed(() => {
      const list = FIRE_DATA.deviceLists[fireSubSystem.value];
      if (!list) return { online: 0, offline: 0, items: [] };
      const q = fireDeviceSearch.value.trim().toLowerCase();
      if (!q) return list;
      return { ...list, items: list.items.filter((n) => n.toLowerCase().includes(q)) };
    });
    const currentFireSystemPanel = computed(() => (
      FIRE_DATA.systemPanels[fireSubSystem.value] || null
    ));
    const currentFloorDevices = computed(() => (
      FIRE_DATA.floorDevices[fireSelectedFloor.value] || []
    ));
    const fireBuildingPopup = computed(() => {
      if (!fireBuildingPopupId.value) return null;
      const building = FIRE_DATA.parkBuildings.find((b) => b.id === fireBuildingPopupId.value);
      const detail = FIRE_DATA.buildingDetails[fireBuildingPopupId.value];
      if (!building || !detail) return null;
      return { ...building, ...detail };
    });

    function resolveFireBuildingId(id) {
      return FIRE_DATA.buildingIdMap[id] || id;
    }

    function selectFireBuilding(building, e) {
      if (isFireEventMode.value) {
        fireBuildingPopupId.value = building.id;
        return;
      }
      selectParkBuilding(building, e);
    }

    function closeFireBuildingPopup() {
      fireBuildingPopupId.value = null;
    }

    function enterFireBuilding() {
      if (!fireBuildingPopupId.value) return;
      const childId = Object.entries(FIRE_DATA.buildingIdMap).find(([, v]) => v === fireBuildingPopupId.value)?.[0];
      if (childId) selectedProject.value = childId;
      fireFloorMode.value = true;
      fireBuildingPopupId.value = null;
      fireSelectedFloor.value = '1F';
      resetParkView();
      nextTick(() => initChartsForTab());
    }

    function exitFireFloor() {
      fireFloorMode.value = false;
      fireSelectedFloor.value = '1F';
      nextTick(() => initChartsForTab());
    }

    function switchFireSubSystem(id) {
      fireSubSystem.value = id;
      fireBuildingPopupId.value = null;
      fireSelectedDevice.value = null;
      fireFloorMode.value = false;
      nextTick(() => initChartsForTab());
    }

    function selectFireFloor(floor) {
      fireSelectedFloor.value = floor;
    }

    function prevFireSafetySystem() {
      fireSafetySystemIdx.value = (fireSafetySystemIdx.value - 1 + fireSafetyLevel.systems.length) % fireSafetyLevel.systems.length;
    }

    function nextFireSafetySystem() {
      fireSafetySystemIdx.value = (fireSafetySystemIdx.value + 1) % fireSafetyLevel.systems.length;
    }

    function selectFireProjectChild(id) {
      selectedProject.value = id;
      const buildingId = resolveFireBuildingId(id);
      if (isFireEventMode.value && buildingId.startsWith('fb')) {
        fireBuildingPopupId.value = buildingId;
      } else if (isFireFloorMode.value || (id.includes('-') && isFireParkMode.value)) {
        fireFloorMode.value = true;
        fireBuildingPopupId.value = null;
        fireSelectedFloor.value = '1F';
      }
      resetParkView();
    }

    function getChart(id) {
      const el = document.getElementById(id);
      if (!el) return null;
      if (charts[id]) charts[id].dispose();
      charts[id] = echarts.init(el);
      return charts[id];
    }

    function disposeAllCharts() {
      Object.keys(charts).forEach((k) => { charts[k]?.dispose(); delete charts[k]; });
    }

    function resizeAllCharts() {
      Object.values(charts).forEach((c) => c?.resize());
    }

    function initOverviewCharts() {
      const trendOption = isOverviewParkMode.value ? buildParkTrendOption() : buildTrendOption();
      getChart('trendChart')?.setOption(trendOption);
      getChart('overviewTrafficChart')?.setOption(buildOverviewTrafficOption());
      if (overviewEnergyProject.value) {
        getChart('overviewEnergyChart')?.setOption(buildOverviewEnergyOption(overviewEnergyTab.value));
      }
      getChart('overviewWorkOrderChart')?.setOption(buildOverviewWorkOrderOption());
    }

    function selectOverviewEnergyProject(name) {
      overviewEnergyProject.value = name;
      nextTick(() => {
        getChart('overviewEnergyChart')?.setOption(buildOverviewEnergyOption(overviewEnergyTab.value));
        resizeAllCharts();
      });
    }

    function clearOverviewEnergyProject() {
      overviewEnergyProject.value = null;
      if (charts.overviewEnergyChart) {
        charts.overviewEnergyChart.dispose();
        delete charts.overviewEnergyChart;
      }
    }

    function switchOverviewEnergy(type) {
      overviewEnergyTab.value = type;
      if (overviewEnergyProject.value) {
        charts.overviewEnergyChart?.setOption(buildOverviewEnergyOption(type), true);
      }
    }

    function closeMapPopup() {
      mapPopupProjectId.value = null;
    }

    function openMapPopup(projectId) {
      mapPopupProjectId.value = projectId;
      nextTick(() => updateMapPopupPosition());
    }

    function selectMapProject(project) {
      selectedProject.value = project.id;
      MapManager.setActive(project.id);
      openMapPopup(project.id);
    }

    function enterPark() {
      if (mapPopupProjectId.value) {
        activeParkProjectId.value = mapPopupProjectId.value;
        selectedProject.value = mapPopupProjectId.value;
      }
      resetParkView();
      fireFloorMode.value = false;
      fireSubSystem.value = 'event';
      fireBuildingPopupId.value = null;
      overviewViewMode.value = 'park';
      mapPopupProjectId.value = null;
      syncMapVisibility();
      nextTick(() => initChartsForTab());
    }

    function exitPark() {
      stopParkOrbit();
      resetParkView();
      fireFloorMode.value = false;
      fireBuildingPopupId.value = null;
      fireSubSystem.value = 'event';
      overviewViewMode.value = 'map';
      syncMapVisibility();
      nextTick(() => {
        MapManager.invalidateSize();
        initChartsForTab();
      });
    }

    function updateAssetSecondPanelChart() {
      const chart = getChart('gwStockPieChart');
      if (!chart) return;
      if (isAssetParkScope.value) {
        chart.setOption(buildOfficeAreaPieOption(getActiveOfficeAreaChart()), true);
      } else {
        chart.setOption(buildGwStockPieOption(gwData.currentStock, gwWarehouses), true);
      }
    }

    function initAssetCharts() {
      getChart('assetTypeChart')?.setOption(buildAssetTypeOption(
        assetTypeTab.value === 'space' ? DASHBOARD_DATA.assetTypeSpace : DASHBOARD_DATA.assetTypeEquipment
      ));
      updateAssetSecondPanelChart();
      updateGwCumulativeChart();
      getChart('assetTrendChart')?.setOption(buildAssetTrendOption());
    }

    function updateGwCumulativeChart() {
      const mode = gwCumulativeMode.value;
      const src = mode === 'year' ? gwData.cumulative.yearlyTrend : gwData.cumulative.quarterlyTrend;
      let labels;
      let w1;
      let w2;
      if (mode === 'year') {
        const start = Math.max(0, src.labels.length - 3);
        labels = src.labels.slice(start).map((y) => `${y}年`);
        w1 = src.w1.slice(start);
        w2 = src.w2.slice(start);
      } else {
        labels = src.labels;
        w1 = src.w1;
        w2 = src.w2;
      }
      getChart('gwCumulativeTrendChart')?.setOption(
        buildGwCumulativeTrendOption(labels, w1, w2, gwWarehouses),
        true
      );
    }

    function switchGwCumulativeMode(mode) {
      gwCumulativeMode.value = mode;
      updateGwCumulativeChart();
    }

    function initPropertyCharts() {
      getChart('propertyCategoryChart')?.setOption(buildPropertyCategoryOption());
      getChart('workDurationChart')?.setOption(buildWorkDurationOption());
    }

    function initEnergyCharts() {
      const type = energyTypeTab.value;
      getChart('energyHourlyChart')?.setOption(buildEnergyHourlyOption(type));
      getChart('energyPeriodChart')?.setOption(buildEnergyPeriodOption(type, 'month'));
      if (isModuleParkMode.value) {
        const donutData = DASHBOARD_DATA.energyTypeDonut[type];
        getChart('energyTypeDonutChart')?.setOption(buildSimpleDonutOption(donutData.items));
      }
    }

    function initEnvCharts() {
      getChart('airQualityChart')?.setOption(buildAirQualityOption(envAirTab.value));
      getChart('alarmChart')?.setOption(buildAlarmOption());
    }

    function initCanteenCharts() {
      getChart('canteenGuestChart')?.setOption(buildCanteenGuestOption());
      getChart('canteenMarketingChart')?.setOption(buildCanteenMarketingOption());
    }

    function initSecurityCharts() {
      getChart('publicVehicleChart')?.setOption(buildPublicVehicleOption());
      getChart('vehicleTrafficChart')?.setOption(buildVehicleTrafficOption());
      getChart('visitorTrendChart')?.setOption(buildVisitorTrendOption());
    }

    function initFireCharts() {
      if (showFireSafetyPanel.value) {
        getChart('fireRadarChart')?.setOption(buildFireRadarOption(fireSafetyLevel.radar));
      }
      if (isFireMapMode.value || isFireEventMode.value || isFireFloorMode.value) {
        getChart('fireAlarmTrendChart')?.setOption(buildFireAlarmTrendOption());
        DASHBOARD_DATA.fireCompletionGauges.forEach((g) => {
          getChart(`fireGauge${g.id}`)?.setOption(buildFireGaugeOption(g));
        });
      }
      if (isFireSystemMode.value) {
        const panel = currentFireSystemPanel.value;
        if (!panel) return;
        if (fireSubSystem.value === 'alarm') {
          getChart('fireDeviceStatusPie')?.setOption(
            buildFireDeviceStatusPieOption(panel.deviceNormal, panel.deviceAbnormal), true
          );
        } else {
          getChart('fireAbnormalDonut')?.setOption(
            buildFireRateDonutOption(panel.abnormalRate, '异常率', '正常', panel.abnormalNormal, '异常', panel.abnormalCount, '#00e5ff'), true
          );
          getChart('fireOfflineDonut')?.setOption(
            buildFireRateDonutOption(panel.offlineRate, '离线率', '在线', panel.offlineOnline, '离线', panel.offlineCount, '#ffd60a'), true
          );
          getChart('fireMonthlyTrend')?.setOption(buildFireMonthlyTrendOption(FIRE_DATA.monthlyAlarmFault), true);
        }
      }
    }

    function initChartsForTab() {
      disposeAllCharts();
      nextTick(() => {
        const tab = activeTab.value;
        if (tab === '综合态势') initOverviewCharts();
        else if (tab === '资产管理') initAssetCharts();
        else if (tab === '物业管理') initPropertyCharts();
        else if (tab === '安全管理') initSecurityCharts();
        else if (tab === '消防管理') initFireCharts();
        else if (tab === '能源管理') initEnergyCharts();
        else if (tab === '环境管理') initEnvCharts();
        else if (tab === '食堂管理') initCanteenCharts();
        setTimeout(() => { resizeAllCharts(); MapManager.invalidateSize(); }, 80);
      });
    }

    function updateAssetTypeChart() {
      if (!charts.assetTypeChart) return;
      const data = assetTypeTab.value === 'space' ? DASHBOARD_DATA.assetTypeSpace : DASHBOARD_DATA.assetTypeEquipment;
      charts.assetTypeChart.setOption(buildAssetTypeOption(data), true);
    }

    function updateAirQualityChart() {
      charts.airQualityChart?.setOption(buildAirQualityOption(envAirTab.value), true);
    }

    function switchEnergyType(type) {
      energyTypeTab.value = type;
      nextTick(() => initEnergyCharts());
    }

    function switchEnergyPeriod(period) {
      energyPeriodTab.value = period;
      charts.energyPeriodChart?.setOption(
        buildEnergyPeriodOption(energyTypeTab.value, 'month'), true
      );
    }

    function toggleProject(project) {
      project.expanded = !project.expanded;
      selectedProject.value = project.id;
      if (isFireTab.value && isModuleParkMode.value && project.id.includes('-')) {
        selectFireProjectChild(project.id);
        return;
      }
      if (isSandboxMapMode.value) {
        MapManager.setActive(project.id);
        openMapPopup(project.id);
      } else if (isSandboxParkMode.value) {
        resetParkView();
      }
    }

    function selectProject(id) {
      selectedProject.value = id;
      if (isFireTab.value && (isModuleParkMode.value || isFireFloorMode.value) && id.includes('-')) {
        selectFireProjectChild(id);
        return;
      }
      const projectId = resolveProjectRootId(id);
      if (isSandboxMapMode.value) {
        MapManager.setActive(projectId);
        openMapPopup(projectId);
      } else if (isSandboxParkMode.value) {
        resetParkView();
      }
    }

    function onMapSelect(projectId) {
      selectedProject.value = projectId;
      if (isSandboxMapMode.value) {
        openMapPopup(projectId);
        MapManager.setActive(projectId);
      }
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }

    function togglePlatformMenu() {
      platformMenuOpen.value = !platformMenuOpen.value;
      securityMenuOpen.value = false;
    }

    function navigateToPlatform(url) {
      window.location.href = url;
    }

    function onDocumentClick(e) {
      if (!platformMenuOpen.value) return;
      const wrap = document.querySelector('.platform-switch-wrap');
      if (wrap && !wrap.contains(e.target)) {
        platformMenuOpen.value = false;
      }
    }

    function toggleSecurityMenu() {
      securityMenuOpen.value = !securityMenuOpen.value;
    }

    function selectSecuritySub(sub) {
      if (sub !== activeTab.value) {
        fireFloorMode.value = false;
        fireSubSystem.value = 'event';
        fireBuildingPopupId.value = null;
        overviewViewMode.value = 'map';
        mapPopupProjectId.value = null;
      }
      activeTab.value = sub;
      securityMenuOpen.value = false;
      nextTick(() => {
        syncMapVisibility();
        initChartsForTab();
      });
    }

    function switchTab(tab) {
      securityMenuOpen.value = false;
      platformMenuOpen.value = false;
      stopParkOrbit();
      resetParkView();
      fireFloorMode.value = false;
      fireSubSystem.value = 'event';
      fireBuildingPopupId.value = null;
      overviewViewMode.value = 'map';
      mapPopupProjectId.value = null;
      activeTab.value = tab;
      nextTick(() => {
        syncMapVisibility();
        MapManager.invalidateSize();
      });
    }

    function handleResize() {
      resizeAllCharts();
      MapManager.invalidateSize();
      updateMapPopupPosition();
    }

    watch(overviewViewMode, () => {
      syncMapVisibility();
      if (isOverviewTab.value || isModuleSandboxTab.value) {
        nextTick(() => initChartsForTab());
      }
    });

    watch(platformMenuOpen, (open) => {
      if (open) {
        nextTick(() => document.addEventListener('click', onDocumentClick));
      } else {
        document.removeEventListener('click', onDocumentClick);
      }
    });

    watch(activeTab, () => {
      syncMapVisibility();
      initChartsForTab();
    });

    watch([isAssetParkScope, mapPopupProjectId, activeModuleProjectId], () => {
      if (activeTab.value === '资产管理') {
        nextTick(() => updateAssetSecondPanelChart());
      }
    });

    watch([fireSubSystem, fireFloorMode, fireSelectedFloor, mapPopupProjectId], () => {
      if (activeTab.value === '消防管理') {
        nextTick(() => initChartsForTab());
      }
    });

    onMounted(() => {
      MapManager.onViewChange = updateMapPopupPosition;
      MapManager.init(onMapSelect);
      MapManager.setActive(selectedProject.value);
      syncMapVisibility();
      initChartsForTab();
      window.addEventListener('resize', handleResize);
      setTimeout(() => MapManager.invalidateSize(), 100);
    });

    onUnmounted(() => {
      MapManager.onViewChange = null;
      stopParkOrbit();
      document.removeEventListener('click', onDocumentClick);
      window.removeEventListener('resize', handleResize);
      disposeAllCharts();
    });

    return {
      navTabs, activeTab, searchQuery, selectedProject,
      currentKpiData, searchPlaceholder, unitSuffix,
      filteredProjects, rankTab1, rankTab2, rankDate1, rankDate2, workOrderMonth,
      rankList1, rankList2, assetTypeTab, assetTypeSummary,
      gwCumulativeMode, switchGwCumulativeMode,
      isAssetParkScope, assetSecondPanelTitle,
      propertyOmTab, propertyPeriod, propertyDate, propertyOmRankList,
      energyTypeTab, energyPeriodTab, energyCurrentKpi, energyTypeLabel,
      energyDailyTitle, energyDailyStat, energyPeriodTitle, energyPeriodStat,
      energyPeriodLabel, energyPeriodCompareLabel, energyPeriodChartTitle,
      envTempTab, envAirTab, envTempList,
      canteenStatus, canteenGuest,
      isSecurityTab, securityMenuOpen, securityNavLabel,
      platformMenuOpen, togglePlatformMenu, navigateToPlatform,
      isOverviewMapMode, isOverviewParkMode, isModuleSandboxTab, isModuleMapMode, isModuleParkMode,
      isSandboxMapMode, isSandboxParkMode, isParkSceneVisible, isParkInteractiveVisible,
      overviewKpiData, overviewTrendTitle,
      overviewMapProjects, overviewSpaceCategories, overviewEquipmentCategories,
      assetSpaceCategories, assetEquipmentCategories, envDeviceList: DASHBOARD_DATA.envDeviceList,
      filteredMapProjects, mapPopupProjectId, mapPopupProject, mapPopupStyle, activeParkDetail,
      parkSceneUrl, parkSceneTransformStyle, parkBuildings, activeParkBuildings, selectedParkBuilding, parkOrbiting,
      parkBuildingStyle, parkMarkerStyle, getParkBuildingMarker, selectParkBuilding, startParkOrbit,
      leftSidebarTitle, energyBuildingRankList, energyTypeDonutTitle, moduleParkKpiData,
      overviewEnergyTab, overviewEnergyProject, overviewEnergyRankList, overviewEnergyPanelTitle,
      overviewEnergyTypeLabel, overviewTrafficPeriod, overviewTrafficDate,
      overviewEnergyPeriod, overviewEnergyDate, overviewWorkOrderPeriod, overviewWorkOrderDate,
      timeUnits, yearInputMin, yearInputMax, dateInputType,
      syncTrafficDate, syncOverviewEnergyDate, syncWorkOrderDate, syncFireDate, syncPropertyDate,
      selectOverviewEnergyProject, clearOverviewEnergyProject,
      securityKpiData, fireKpiData, publicVehicle,
      fireRankTab, firePeriod, fireDate, fireCompletionGauges, fireRankList,
      isFireTab, isFireFloorMode, isFireParkMode, isFireMapMode, isFireMapWithPopup,
      isFireEventMode, isFireSystemMode, showFireSafetyPanel, showFireDevicePanel,
      fireSubSystem, fireSubSystems, switchFireSubSystem,
      fireSafetyLevel, fireSafetySystemIdx, currentFireSafetySystem,
      prevFireSafetySystem, nextFireSafetySystem,
      fireFloors, fireSelectedFloor, selectFireFloor, currentFloorDevices,
      fireDeviceSearch, fireSelectedDevice, currentFireDeviceList, currentFireSystemPanel,
      fireBuildingPopup, closeFireBuildingPopup, enterFireBuilding, exitFireFloor,
      selectFireBuilding, selectFireProjectChild,
      toggleProject, selectProject, toggleFullscreen, switchTab,
      toggleSecurityMenu, selectSecuritySub,
      closeMapPopup, enterPark, exitPark, switchOverviewEnergy, selectMapProject,
      updateAssetTypeChart, updateAirQualityChart, switchEnergyType, switchEnergyPeriod,
    };
  },
}).mount('#app');
