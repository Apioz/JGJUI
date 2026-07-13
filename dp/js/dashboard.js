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
    const energyFloorMode = ref(false);
    const energySelectedFloor = ref('2F');
    const energyBuildingPopupId = ref(null);
    const energyDevicePopupCode = ref(null);
    const energySelectedMeter = ref('1#');
    const energyLedgerOpen = ref(false);
    const energyIaExpanded = ref(true);
    const energyFmExpanded = ref(true);
    const energyIdExpanded = ref(true);
    const canteenFloorMode = ref(false);
    const canteenSelectedFloor = ref('3F');
    const canteenBuildingPopupId = ref(null);
    const canteenMarketingMode = ref('people');
    const canteenProjects = ref(JSON.parse(JSON.stringify(CANTEEN_DATA.projects)));
    const envTempTab = ref('max');
    const envAirTab = ref('max');
    const securityMenuOpen = ref(false);
    const platformMenuOpen = ref(false);
    const platformBizMenuOpen = ref(false);
    const otherBusinessSystems = [
      '综合安防系统',
      '智慧机关云系统',
      '公车系统',
      '内控系统',
      '区采购平台',
      '资产管理系统',
      '环境监测系统',
    ];
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
    const securitySubModule = ref('monitor');
    const securityFloorMode = ref(false);
    const securityGateMode = ref(false);
    const securitySelectedFloor = ref('2F');
    const securityBuildingPopupId = ref(null);
    const securityDeviceSearch = ref('');
    const securitySelectedDevice = ref(null);
    const securityGateDeviceId = ref(null);
    const securityDevicePopupCode = ref(null);
    const securityLedgerOpen = ref(false);
    const securityIaExpanded = ref(true);
    const securityFmExpanded = ref(true);
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
    const MODULE_TABS = ['资产管理', '物业管理', '能源管理', '环境管理', '食堂管理', '安全管理', '消防管理'];
    const MODULE_PARK_TABS = ['资产管理', '物业管理', '能源管理', '环境管理', '食堂管理', '安全管理', '消防管理'];

    const isOverviewTab = computed(() => activeTab.value === '综合态势');
    const isModuleSandboxTab = computed(() => MODULE_PARK_TABS.includes(activeTab.value));
    const isOverviewMapMode = computed(() => isOverviewTab.value && overviewViewMode.value === 'map');
    const isOverviewParkMode = computed(() => isOverviewTab.value && overviewViewMode.value === 'park');
    const isModuleMapMode = computed(() => isModuleSandboxTab.value && overviewViewMode.value === 'map');
    const isModuleParkMode = computed(() => isModuleSandboxTab.value && overviewViewMode.value === 'park');
    const isSandboxMapMode = computed(() => isOverviewMapMode.value || isModuleMapMode.value);
    const isSandboxParkMode = computed(() => isOverviewParkMode.value || isModuleParkMode.value);
    const isSecurityMgmtTab = computed(() => activeTab.value === '安全管理');
    const isSecurityFloorMode = computed(() => isSecurityMgmtTab.value && securityFloorMode.value);
    const isSecurityGateMode = computed(() => isSecurityMgmtTab.value && securityGateMode.value);
    const isSecurityParkMode = computed(() => (
      isSecurityMgmtTab.value && isModuleParkMode.value && !securityFloorMode.value && !securityGateMode.value
    ));
    const isSecurityMapMode = computed(() => isSecurityMgmtTab.value && isModuleMapMode.value);
    const showSecurityDevicePanel = computed(() => (
      isSecurityMgmtTab.value && (isModuleParkMode.value || isSecurityFloorMode.value || isSecurityGateMode.value)
    ));
    const isEnergyTab = computed(() => activeTab.value === '能源管理');
    const isEnergyFloorMode = computed(() => isEnergyTab.value && energyFloorMode.value);
    const isEnergyParkMode = computed(() => isEnergyTab.value && isModuleParkMode.value && !energyFloorMode.value);
    const isEnergyMapMode = computed(() => isEnergyTab.value && isModuleMapMode.value);
    const isEnergyMapWithPopup = computed(() => isEnergyMapMode.value && !!mapPopupProjectId.value);
    const showEnergyLeftStats = computed(() => (
      isEnergyTab.value && (isEnergyMapWithPopup.value || isModuleParkMode.value || isEnergyFloorMode.value)
    ));
    const isCanteenTab = computed(() => activeTab.value === '食堂管理');
    const isCanteenFloorMode = computed(() => isCanteenTab.value && canteenFloorMode.value);
    const isCanteenParkMode = computed(() => isCanteenTab.value && isModuleParkMode.value && !canteenFloorMode.value);
    const isCanteenMapMode = computed(() => isCanteenTab.value && isModuleMapMode.value);
    const isCanteenMapWithPopup = computed(() => isCanteenMapMode.value && !!mapPopupProjectId.value);
    const isCanteenParkScoped = computed(() => (
      isCanteenTab.value && (
        isCanteenMapWithPopup.value
        || isModuleParkMode.value
        || isCanteenFloorMode.value
      )
    ));
    const isParkSceneVisible = computed(() => (
      isSandboxParkMode.value
      && !isFireFloorMode.value
      && !isSecurityFloorMode.value
      && !isSecurityGateMode.value
      && !isEnergyFloorMode.value
      && !isCanteenFloorMode.value
    ));
    const isParkInteractiveVisible = computed(() => (
      isSandboxParkMode.value
      && !isFireFloorMode.value
      && !isSecurityFloorMode.value
      && !isSecurityGateMode.value
      && !isEnergyFloorMode.value
      && !isCanteenFloorMode.value
    ));
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

    const assetSecondPanelTitle = '本季在仓物资分仓占比';

    const assetThirdPanelTitle = computed(() => (
      isAssetParkScope.value ? '办公用房总使用面积占比' : '累计存放历史变化趋势'
    ));

    function getActiveOfficeAreaChart() {
      const pid = isModuleParkMode.value
        ? activeModuleProjectId.value
        : resolveProjectRootId(mapPopupProjectId.value);
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
      if (activeTab.value === '食堂管理') return canteenProjects.value;
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
      const m = String(id).match(/^(p\d+)/i);
      if (m) return m[1].toLowerCase();
      return id.includes('-') ? id.replace(/-\d+$/, '') : id;
    }

    const activeModuleProjectId = computed(() => resolveProjectRootId(selectedProject.value));

    const activeParkBuildings = computed(() => {
      const tab = activeTab.value;
      if (tab === '消防管理') return FIRE_DATA.parkBuildings;
      if (tab === '安全管理') return SECURITY_DATA.parkBuildings;
      if (tab === '食堂管理') {
        return DASHBOARD_DATA.parkBuildings;
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
      if (tab === '安全管理') {
        const markers = SECURITY_DATA.sceneMarkers[securitySubModule.value];
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

    const energyBuildingRankList = computed(() => {
      const type = energyTypeTab.value === 'water' ? 'water' : 'electricity';
      if (isEnergyFloorMode.value) {
        return ENERGY_DATA.floorRank[type] || [];
      }
      return type === 'water'
        ? DASHBOARD_DATA.waterBuildingRank
        : DASHBOARD_DATA.energyBuildingRank;
    });

    const energyRankTitle = computed(() => (
      isEnergyFloorMode.value ? '当月能耗排名Top5' : '当月能耗排名Top5'
    ));

    const energyTypeDonutTitle = computed(() => (
      energyTypeTab.value === 'water' ? '用水类型统计' : '用电类型统计'
    ));

    const energyBuildingPopup = computed(() => {
      if (!energyBuildingPopupId.value) return null;
      const building = DASHBOARD_DATA.parkBuildings.find((b) => b.id === energyBuildingPopupId.value);
      const type = energyTypeTab.value === 'water' ? 'water' : 'electricity';
      const detail = ENERGY_DATA.buildingDetails[type]?.[energyBuildingPopupId.value];
      if (!building || !detail) return null;
      return { ...building, ...detail };
    });

    const currentEnergyFloorDevices = computed(() => {
      const type = energyTypeTab.value === 'water' ? 'water' : 'electricity';
      return ENERGY_DATA.floorDevices[type]?.[energySelectedFloor.value] || [];
    });

    const energyDevicePopup = computed(() => {
      if (!energyDevicePopupCode.value || !isEnergyFloorMode.value) return null;
      const type = energyTypeTab.value === 'water' ? 'water' : 'electricity';
      const specific = ENERGY_DATA.deviceReadings[type]?.[energyDevicePopupCode.value];
      const defaults = ENERGY_DATA.deviceReadingDefaults[type];
      const device = currentEnergyFloorDevices.value.find((d) => d.code === energyDevicePopupCode.value);
      const base = specific || defaults;
      return {
        ...base,
        title: specific?.title || (device ? device.name : defaults.title),
        code: energyDevicePopupCode.value,
        trend: specific?.trend || defaults.trend,
      };
    });

    const energyLedgerData = computed(() => {
      const type = energyTypeTab.value === 'water' ? 'water' : 'electricity';
      return ENERGY_DATA.ledgerTemplates[type] || ENERGY_DATA.ledgerTemplates.electricity;
    });

    const leftSidebarTitle = computed(() => {
      if (activeTab.value === '物业管理') return '办公用房列表';
      if (activeTab.value === '消防管理' && showFireDevicePanel.value) return '设备列表';
      if (isSecurityFloorMode.value) return '项目筛选';
      return '项目筛选';
    });

    const securityDeviceListTitle = computed(() => {
      const map = { monitor: '监控列表', access: '门禁列表', parking: '车闸列表' };
      return map[securitySubModule.value] || '设备列表';
    });

    const securityDeviceSearchPlaceholder = computed(() => {
      const map = { monitor: '搜索监控名称', access: '搜索门禁名称', parking: '搜索车闸名称' };
      return map[securitySubModule.value] || '搜索设备名称';
    });

    const currentSecurityKpi = computed(() => {
      if (isSecurityMapMode.value) return SECURITY_DATA.mapKpi;
      if (isModuleParkMode.value && isSecurityMgmtTab.value) {
        return SECURITY_DATA.moduleKpis[securitySubModule.value] || SECURITY_DATA.mapKpi;
      }
      return SECURITY_DATA.mapKpi;
    });

    const currentSecurityDeviceList = computed(() => {
      const list = SECURITY_DATA.deviceLists[securitySubModule.value];
      if (!list) return { online: 0, offline: 0, items: [] };
      const q = securityDeviceSearch.value.trim().toLowerCase();
      if (!q) return list;
      return { ...list, items: list.items.filter((n) => n.toLowerCase().includes(q)) };
    });

    const currentSecurityFloorDevices = computed(() => {
      const moduleDevices = SECURITY_DATA.floorDevices[securitySubModule.value];
      if (!moduleDevices) return [];
      return moduleDevices[securitySelectedFloor.value] || [];
    });

    const securityBuildingPopup = computed(() => {
      if (!securityBuildingPopupId.value) return null;
      const building = SECURITY_DATA.parkBuildings.find((b) => b.id === securityBuildingPopupId.value);
      const detail = SECURITY_DATA.buildingDetails[securitySubModule.value]?.[securityBuildingPopupId.value];
      if (!building || !detail) return null;
      return { ...building, ...detail };
    });

    const securityActiveGateDevice = computed(() => {
      if (!securityGateDeviceId.value) return null;
      return SECURITY_DATA.gateDevices[securityGateDeviceId.value] || null;
    });

    const securityDevicePopup = computed(() => {
      if (!securityDevicePopupCode.value && !securityActiveGateDevice.value) return null;
      if (isSecurityGateMode.value && securityActiveGateDevice.value) {
        return { code: securityActiveGateDevice.value.code, gate: true };
      }
      if (!securityDevicePopupCode.value) return null;
      const popups = SECURITY_DATA.devicePopups[securitySubModule.value];
      if (popups?.[securityDevicePopupCode.value]) return popups[securityDevicePopupCode.value];
      if (securitySubModule.value === 'access') {
        return {
          code: securityDevicePopupCode.value,
          online: true,
          stats: SECURITY_DATA.devicePopups.access.MJ002.stats,
        };
      }
      if (securitySubModule.value === 'monitor') {
        return {
          code: securityDevicePopupCode.value,
          location: '延安东路300号1号楼',
          online: true,
          preview: true,
        };
      }
      return null;
    });

    const securityLedgerData = computed(() => (
      SECURITY_DATA.ledgerTemplates[securitySubModule.value] || SECURITY_DATA.ledgerTemplates.monitor
    ));

    const parkingVehicleTotal = computed(() => SECURITY_DATA.parkingVehicleType.total);

    const showSecurityBuildingTree = computed(() => securitySubModule.value !== 'parking');

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
      if (isSecurityMgmtTab.value) {
        return currentSecurityKpi.value;
      }
      if (isCanteenTab.value && currentCanteenBundle.value?.kpi) {
        return currentCanteenBundle.value.kpi;
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
      if (activeTab.value === '能源管理' && (isModuleParkMode.value || isEnergyMapWithPopup.value) && moduleParkKpiData.value) {
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

    const canteenScopeParkId = computed(() => {
      if (!isCanteenTab.value) return null;
      if (isCanteenMapWithPopup.value) return resolveProjectRootId(mapPopupProjectId.value);
      if (isModuleParkMode.value || isCanteenFloorMode.value) {
        return resolveProjectRootId(activeParkProjectId.value || selectedProject.value);
      }
      return null;
    });

    const currentCanteenBundle = computed(() => {
      const pid = canteenScopeParkId.value;
      if (pid && CANTEEN_DATA.byPark[pid]) return CANTEEN_DATA.byPark[pid];
      return CANTEEN_DATA.global;
    });

    const canteenStatusMode = computed(() => currentCanteenBundle.value.statusMode || 'table');
    const canteenStatusTitle = computed(() => (
      currentCanteenBundle.value.statusTitle || '食堂监管状态'
    ));
    const canteenStatus = computed(() => currentCanteenBundle.value.status || CANTEEN_DATA.global.status);
    const canteenStatusCards = computed(() => currentCanteenBundle.value.statusCards || []);
    const canteenGuest = computed(() => currentCanteenBundle.value.guest || CANTEEN_DATA.global.guest);
    const canteenMarketing = computed(() => currentCanteenBundle.value.marketing || CANTEEN_DATA.global.marketing);

    const canteenBuildingPopup = computed(() => {
      if (!canteenBuildingPopupId.value) return null;
      const building = DASHBOARD_DATA.parkBuildings.find((b) => b.id === canteenBuildingPopupId.value);
      const detail = CANTEEN_DATA.buildingDetails[canteenBuildingPopupId.value];
      if (!building || !detail) return null;
      return { ...building, ...detail };
    });

    const currentCanteenFloorPoints = computed(() => (
      CANTEEN_DATA.floorPoints[canteenSelectedFloor.value] || []
    ));

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

    function resetSecurityView() {
      securitySubModule.value = 'monitor';
      securityFloorMode.value = false;
      securityGateMode.value = false;
      securitySelectedFloor.value = '2F';
      securityBuildingPopupId.value = null;
      securityDeviceSearch.value = '';
      securitySelectedDevice.value = null;
      securityGateDeviceId.value = null;
      securityDevicePopupCode.value = null;
      securityLedgerOpen.value = false;
    }

    function resetEnergyView() {
      energyFloorMode.value = false;
      energySelectedFloor.value = '2F';
      energyBuildingPopupId.value = null;
      energyDevicePopupCode.value = null;
      energySelectedMeter.value = '1#';
      energyLedgerOpen.value = false;
    }

    function resetCanteenView() {
      canteenFloorMode.value = false;
      canteenSelectedFloor.value = '3F';
      canteenBuildingPopupId.value = null;
      canteenMarketingMode.value = 'people';
    }

    function resolveCanteenBuildingId(id) {
      if (!id) return null;
      if (CANTEEN_DATA.buildingIdMap[id]) return CANTEEN_DATA.buildingIdMap[id];
      const floorMatch = String(id).match(/^(p\d+(?:-c?\d+)?)-(\d+F)$/i);
      if (floorMatch && CANTEEN_DATA.buildingIdMap[floorMatch[1]]) {
        return CANTEEN_DATA.buildingIdMap[floorMatch[1]];
      }
      return id;
    }

    function parseCanteenFloorId(id) {
      const m = String(id || '').match(/-(\d+F)$/i);
      return m ? m[1].toUpperCase() : null;
    }

    function selectCanteenBuilding(building, e) {
      canteenBuildingPopupId.value = building.id;
      selectParkBuilding(building, e);
    }

    function closeCanteenBuildingPopup() {
      canteenBuildingPopupId.value = null;
    }

    function enterCanteenBuilding() {
      if (!canteenBuildingPopupId.value) return;
      const buildingId = canteenBuildingPopupId.value;
      const project = findProjectInList(activeParkProjectId.value || selectedProject.value);
      const matchedChild = project?.children?.find((c) => CANTEEN_DATA.buildingIdMap[c.id] === buildingId);
      if (matchedChild) selectedProject.value = matchedChild.id;
      canteenFloorMode.value = true;
      canteenBuildingPopupId.value = null;
      canteenSelectedFloor.value = buildingId === 'c3' ? '3F' : '1F';
      resetParkView();
      nextTick(() => initChartsForTab());
    }

    function exitCanteenFloor() {
      canteenFloorMode.value = false;
      nextTick(() => initChartsForTab());
    }

    function selectCanteenFloor(floor) {
      canteenSelectedFloor.value = floor;
    }

    function selectCanteenProjectNode(node, project) {
      if (!node || !project) return;
      const floor = parseCanteenFloorId(node.id);
      if (floor) {
        const buildingKey = node.id.replace(/-\d+F$/i, '');
        selectedProject.value = buildingKey;
        const buildingId = resolveCanteenBuildingId(buildingKey);
        canteenFloorMode.value = true;
        canteenBuildingPopupId.value = null;
        canteenSelectedFloor.value = floor;
        if (buildingId) {
          const building = DASHBOARD_DATA.parkBuildings.find((b) => b.id === buildingId);
          if (building) selectedParkBuilding.value = building.id;
        }
        resetParkView();
        nextTick(() => initChartsForTab());
        return;
      }

      selectedProject.value = node.id;
      const buildingId = resolveCanteenBuildingId(node.id);
      if (buildingId && (isCanteenParkMode.value || isCanteenFloorMode.value)) {
        canteenBuildingPopupId.value = buildingId;
        const building = DASHBOARD_DATA.parkBuildings.find((b) => b.id === buildingId);
        if (building && isCanteenParkMode.value) {
          selectedParkBuilding.value = building.id;
          parkRotateX.value = building.focusRotateX;
          parkRotateY.value = building.focusRotateY;
        }
      }
    }

    function switchCanteenMarketingMode(mode) {
      canteenMarketingMode.value = mode;
      nextTick(() => initCanteenCharts());
    }

    function resolveEnergyBuildingId(id) {
      return ENERGY_DATA.buildingIdMap[id] || id;
    }

    function selectEnergyBuilding(building, e) {
      energyBuildingPopupId.value = building.id;
      selectParkBuilding(building, e);
    }

    function closeEnergyBuildingPopup() {
      energyBuildingPopupId.value = null;
    }

    function enterEnergyBuilding() {
      if (!energyBuildingPopupId.value) return;
      const buildingId = energyBuildingPopupId.value;
      const project = findProjectInList(activeParkProjectId.value || selectedProject.value);
      const matchedChild = project?.children?.find((c) => ENERGY_DATA.buildingIdMap[c.id] === buildingId);
      if (matchedChild) {
        selectedProject.value = matchedChild.id;
      } else {
        const childId = Object.entries(ENERGY_DATA.buildingIdMap).find(([, v]) => v === buildingId)?.[0];
        if (childId) selectedProject.value = childId;
      }
      energyFloorMode.value = true;
      energyBuildingPopupId.value = null;
      energyDevicePopupCode.value = null;
      energySelectedMeter.value = '1#';
      energyLedgerOpen.value = false;
      energySelectedFloor.value = '2F';
      resetParkView();
      nextTick(() => initChartsForTab());
    }

    function exitEnergyFloor() {
      energyFloorMode.value = false;
      energyDevicePopupCode.value = null;
      energyLedgerOpen.value = false;
      energySelectedMeter.value = '1#';
      nextTick(() => initChartsForTab());
    }

    function selectEnergyFloor(floor) {
      energySelectedFloor.value = floor;
      energyDevicePopupCode.value = null;
      energyLedgerOpen.value = false;
      energySelectedMeter.value = '1#';
    }

    function selectEnergyFloorDevice(device) {
      energyDevicePopupCode.value = device.code;
      energySelectedMeter.value = '1#';
      energyLedgerOpen.value = false;
      nextTick(() => initEnergyDeviceTrendChart());
    }

    function openEnergyLedger() {
      energyLedgerOpen.value = true;
    }

    function closeEnergyLedger() {
      energyLedgerOpen.value = false;
    }

    function selectEnergyMeter(meter) {
      energySelectedMeter.value = meter;
      nextTick(() => initEnergyDeviceTrendChart());
    }

    function selectEnergyProjectChild(id) {
      selectedProject.value = id;
      const buildingId = resolveEnergyBuildingId(id);
      if (buildingId.startsWith('b') && (isEnergyParkMode.value || isEnergyFloorMode.value)) {
        if (id.includes('-')) {
          if (isEnergyFloorMode.value) {
            energyBuildingPopupId.value = null;
          } else {
            energyBuildingPopupId.value = buildingId;
            const building = DASHBOARD_DATA.parkBuildings.find((b) => b.id === buildingId);
            if (building) {
              selectedParkBuilding.value = building.id;
              parkRotateX.value = building.focusRotateX;
              parkRotateY.value = building.focusRotateY;
            }
          }
        }
      }
    }

    function initEnergyDeviceTrendChart() {
      if (!energyDevicePopup.value) return;
      getChart('energyDeviceTrendChart')?.setOption(
        buildEnergyDeviceTrendOption(energyDevicePopup.value.trend),
        true
      );
    }

    function resolveSecurityBuildingId(id) {
      return SECURITY_DATA.buildingIdMap[id] || id;
    }

    function selectSecurityBuilding(building, e) {
      if (securitySubModule.value === 'parking') {
        selectParkBuilding(building, e);
        return;
      }
      securityBuildingPopupId.value = building.id;
    }

    function closeSecurityBuildingPopup() {
      securityBuildingPopupId.value = null;
    }

    function enterSecurityBuilding() {
      if (!securityBuildingPopupId.value || securitySubModule.value === 'parking') return;
      const childId = Object.entries(SECURITY_DATA.buildingIdMap).find(([, v]) => v === securityBuildingPopupId.value)?.[0];
      if (childId) selectedProject.value = childId;
      securityFloorMode.value = true;
      securityBuildingPopupId.value = null;
      securityDevicePopupCode.value = null;
      securityLedgerOpen.value = false;
      securitySelectedFloor.value = securitySubModule.value === 'monitor' ? '2F' : '1F';
      resetParkView();
      nextTick(() => initChartsForTab());
    }

    function exitSecurityFloor() {
      securityFloorMode.value = false;
      securityDevicePopupCode.value = null;
      securityLedgerOpen.value = false;
      nextTick(() => initChartsForTab());
    }

    function exitSecurityGateMode() {
      securityGateMode.value = false;
      securityGateDeviceId.value = null;
      securityDevicePopupCode.value = null;
      securityLedgerOpen.value = false;
      nextTick(() => initChartsForTab());
    }

    function switchSecuritySubModule(id) {
      securitySubModule.value = id;
      securityFloorMode.value = false;
      securityGateMode.value = false;
      securityBuildingPopupId.value = null;
      securitySelectedDevice.value = null;
      securityGateDeviceId.value = null;
      securityDevicePopupCode.value = null;
      securityLedgerOpen.value = false;
      resetParkView();
      nextTick(() => initChartsForTab());
    }

    function selectSecurityFloor(floor) {
      securitySelectedFloor.value = floor;
      securityDevicePopupCode.value = null;
      securityLedgerOpen.value = false;
    }

    function selectSecurityFloorDevice(device) {
      securitySelectedDevice.value = device.name;
      securityDevicePopupCode.value = device.code;
      securityLedgerOpen.value = false;
    }

    function selectSecurityGateMarker(gateId) {
      securityGateDeviceId.value = gateId;
      securityGateMode.value = true;
      securityDevicePopupCode.value = null;
      securityLedgerOpen.value = false;
      const gate = SECURITY_DATA.gateDevices[gateId];
      if (gate) securitySelectedDevice.value = gate.name;
      nextTick(() => initChartsForTab());
    }

    function selectSecurityGateFromScene(marker) {
      selectSecurityGateMarker(marker.id);
    }

    function openSecurityLedger() {
      securityLedgerOpen.value = true;
    }

    function closeSecurityLedger() {
      securityLedgerOpen.value = false;
    }

    function selectSecurityProjectChild(id) {
      selectedProject.value = id;
      if (securitySubModule.value === 'parking') {
        resetParkView();
        return;
      }
      const buildingId = resolveSecurityBuildingId(id);
      if (buildingId.startsWith('sb') && isSecurityParkMode.value) {
        if (id.includes('-')) {
          securityFloorMode.value = true;
          securityBuildingPopupId.value = null;
          securitySelectedFloor.value = securitySubModule.value === 'monitor' ? '2F' : '1F';
        } else {
          securityBuildingPopupId.value = buildingId;
        }
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

    function flyToProjectOnMap(projectId, then) {
      MapManager.flyToProject(projectId, () => {
        updateMapPopupPosition();
        then?.();
      });
    }

    function openProjectIntroOnMap(projectId) {
      selectedProject.value = projectId;
      MapManager.setActive(projectId);
      openMapPopup(projectId);
      flyToProjectOnMap(projectId);
    }

    function toggleProjectExpand(project) {
      project.expanded = !project.expanded;
    }

    function findProjectInList(projectId) {
      const pid = resolveProjectRootId(projectId);
      return currentProjects.value.find((p) => p.id === pid || resolveProjectRootId(p.id) === pid) || null;
    }

    function focusGeneralParkBuilding(childId, projectId) {
      const project = findProjectInList(projectId);
      if (!project?.children?.length) return;
      const child = project.children.find((c) => c.id === childId);
      if (!child) return;
      const buildings = activeParkBuildings.value;
      let building = buildings.find((b) => b.name === child.name);
      if (!building) {
        const idx = project.children.findIndex((c) => c.id === childId);
        if (idx >= 0 && buildings[idx]) building = buildings[idx];
      }
      if (!building) return;
      selectedParkBuilding.value = building.id;
      parkRotateX.value = building.focusRotateX;
      parkRotateY.value = building.focusRotateY;
    }

    function applyProjectChildFocus(childId, projectId) {
      if (isFireTab.value) {
        selectFireProjectChild(childId);
        return;
      }
      if (isSecurityMgmtTab.value) {
        selectSecurityProjectChild(childId);
        return;
      }
      if (isEnergyTab.value) {
        selectEnergyProjectChild(childId);
        return;
      }
      if (isCanteenTab.value) {
        const project = findProjectInList(projectId);
        const child = project?.children?.find((c) => c.id === childId)
          || project?.children?.flatMap((c) => c.children || []).find((c) => c.id === childId);
        selectCanteenProjectNode(child || { id: childId }, project || { id: projectId });
        return;
      }
      focusGeneralParkBuilding(childId, projectId);
    }

    function enterProjectPark(projectId, childId = null) {
      activeParkProjectId.value = projectId;
      selectedProject.value = childId || projectId;
      resetParkView();
      fireFloorMode.value = false;
      fireSubSystem.value = 'event';
      fireBuildingPopupId.value = null;
      if (isSecurityMgmtTab.value) {
        resetSecurityView();
      }
      if (isEnergyTab.value) {
        resetEnergyView();
      }
      if (isCanteenTab.value) {
        resetCanteenView();
      }
      overviewViewMode.value = 'park';
      mapPopupProjectId.value = null;
      syncMapVisibility();
      nextTick(() => {
        if (childId) applyProjectChildFocus(childId, projectId);
        initChartsForTab();
      });
    }

    function handleProjectSelect(project) {
      if (!project || project.id === 'all') return;
      const projectId = resolveProjectRootId(project.id);
      project.expanded = true;
      selectedProject.value = projectId;

      if (isSandboxMapMode.value) {
        openProjectIntroOnMap(projectId);
        return;
      }

      if (isSandboxParkMode.value || isFireFloorMode.value || isSecurityFloorMode.value || isSecurityGateMode.value || isEnergyFloorMode.value || isCanteenFloorMode.value) {
        enterProjectPark(projectId);
      }
    }

    function handleProjectChildSelect(child, project) {
      if (!child || !project || project.id === 'all') return;
      const projectId = resolveProjectRootId(project.id);
      project.expanded = true;

      if (isCanteenTab.value && parseCanteenFloorId(child.id)) {
        if (isSandboxMapMode.value || activeParkProjectId.value !== projectId) {
          enterProjectPark(projectId, child.id);
          return;
        }
        selectCanteenProjectNode(child, project);
        return;
      }

      if (isSandboxMapMode.value) {
        enterProjectPark(projectId, child.id);
        return;
      }

      if (activeParkProjectId.value !== projectId) {
        enterProjectPark(projectId, child.id);
        return;
      }

      selectedProject.value = child.id;
      applyProjectChildFocus(child.id, projectId);
    }

    function closeMapPopup() {
      mapPopupProjectId.value = null;
    }

    function openMapPopup(projectId) {
      mapPopupProjectId.value = projectId;
      nextTick(() => updateMapPopupPosition());
    }

    function selectMapProject(project) {
      handleProjectSelect(project);
    }

    function enterPark() {
      if (mapPopupProjectId.value) {
        enterProjectPark(mapPopupProjectId.value);
      }
    }

    function exitPark() {
      stopParkOrbit();
      resetParkView();
      fireFloorMode.value = false;
      fireBuildingPopupId.value = null;
      fireSubSystem.value = 'event';
      if (isSecurityMgmtTab.value) {
        resetSecurityView();
      }
      if (isEnergyTab.value) {
        resetEnergyView();
      }
      if (isCanteenTab.value) {
        resetCanteenView();
      }
      overviewViewMode.value = 'map';
      syncMapVisibility();
      nextTick(() => {
        MapManager.invalidateSize();
        initChartsForTab();
      });
    }

    function updateAssetSecondPanelChart() {
      getChart('gwStockPieChart')?.setOption(
        buildGwStockPieOption(gwData.currentStock, gwWarehouses),
        true
      );
    }

    function updateAssetThirdPanelChart() {
      const chart = getChart('gwCumulativeTrendChart');
      if (!chart) return;
      if (isAssetParkScope.value) {
        chart.setOption(buildOfficeAreaPieOption(getActiveOfficeAreaChart()), true);
      } else {
        updateGwCumulativeChart();
      }
    }

    function initAssetCharts() {
      getChart('assetTypeChart')?.setOption(buildAssetTypeOption(
        assetTypeTab.value === 'space' ? DASHBOARD_DATA.assetTypeSpace : DASHBOARD_DATA.assetTypeEquipment
      ));
      updateAssetSecondPanelChart();
      updateAssetThirdPanelChart();
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
      if (isAssetParkScope.value) return;
      gwCumulativeMode.value = mode;
      updateGwCumulativeChart();
    }

    function initPropertyCharts() {
      getChart('propertyCategoryChart')?.setOption(buildPropertyCategoryOption());
      getChart('workDurationChart')?.setOption(buildWorkDurationOption());
    }

    function initEnergyCharts() {
      const type = energyTypeTab.value;
      if (!energyLedgerOpen.value) {
        getChart('energyHourlyChart')?.setOption(buildEnergyHourlyOption(type));
        getChart('energyPeriodChart')?.setOption(buildEnergyPeriodOption(type, 'month'));
      }
      if (showEnergyLeftStats.value) {
        const donutData = DASHBOARD_DATA.energyTypeDonut[type];
        getChart('energyTypeDonutChart')?.setOption(buildSimpleDonutOption(donutData.items));
      }
      if (energyDevicePopup.value) {
        initEnergyDeviceTrendChart();
      }
    }

    function initEnvCharts() {
      getChart('airQualityChart')?.setOption(buildAirQualityOption(envAirTab.value));
      getChart('alarmChart')?.setOption(buildAlarmOption());
    }

    function initCanteenCharts() {
      getChart('canteenGuestChart')?.setOption(buildCanteenGuestOption(canteenGuest.value), true);
      getChart('canteenMarketingChart')?.setOption(
        buildCanteenMarketingOption(canteenMarketing.value, canteenMarketingMode.value),
        true
      );
    }

    function initSecurityCharts() {
      if (securityLedgerOpen.value) return;
      if (isSecurityMapMode.value || !isModuleParkMode.value) {
        getChart('publicVehicleChart')?.setOption(buildPublicVehicleOption());
        getChart('vehicleTrafficChart')?.setOption(buildVehicleTrafficOption());
        getChart('visitorTrendChart')?.setOption(buildVisitorTrendOption());
        return;
      }
      if (securitySubModule.value === 'monitor') {
        getChart('publicVehicleChart')?.setOption(buildPublicVehicleOption());
        getChart('secMonitorSpaceChart')?.setOption(buildSecMonitorSpaceOption());
        getChart('secMonitorFaultChart')?.setOption(buildSecMonitorFaultOption());
      } else if (securitySubModule.value === 'access') {
        getChart('secAccessPersonChart')?.setOption(buildSecAccessPersonOption());
        getChart('secAccessPassChart')?.setOption(buildSecAccessPassOption());
        getChart('visitorTrendChart')?.setOption(buildVisitorTrendOption());
      } else if (securitySubModule.value === 'parking') {
        getChart('secParkingVehicleChart')?.setOption(buildSecParkingVehicleOption());
        getChart('vehicleTrafficChart')?.setOption(buildVehicleTrafficOption());
        getChart('visitorTrendChart')?.setOption(buildVisitorTrendOption());
      }
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
      energyDevicePopupCode.value = null;
      energyLedgerOpen.value = false;
      energySelectedMeter.value = '1#';
      energyBuildingPopupId.value = null;
      nextTick(() => initEnergyCharts());
    }

    function switchEnergyPeriod(period) {
      energyPeriodTab.value = period;
      charts.energyPeriodChart?.setOption(
        buildEnergyPeriodOption(energyTypeTab.value, 'month'), true
      );
    }

    function toggleProject(project) {
      handleProjectSelect(project);
    }

    function selectProject(id) {
      const project = findProjectInList(id);
      const child = project?.children?.find((c) => c.id === id);
      if (child) {
        handleProjectChildSelect(child, project);
        return;
      }
      if (project) handleProjectSelect(project);
    }

    function onMapSelect(projectId) {
      selectedProject.value = projectId;
      if (isSandboxMapMode.value) {
        openProjectIntroOnMap(projectId);
      }
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }

    function togglePlatformMenu() {
      platformMenuOpen.value = !platformMenuOpen.value;
      securityMenuOpen.value = false;
      if (!platformMenuOpen.value) platformBizMenuOpen.value = false;
    }

    function navigateToPlatform(url) {
      window.location.href = url;
    }

    function selectBusinessSystem(name) {
      platformBizMenuOpen.value = false;
      platformMenuOpen.value = false;
      window.alert(`${name}（外部业务系统入口，原型演示）`);
    }

    function onDocumentClick(e) {
      if (!platformMenuOpen.value) return;
      const wrap = document.querySelector('.platform-switch-wrap');
      if (wrap && !wrap.contains(e.target)) {
        platformMenuOpen.value = false;
        platformBizMenuOpen.value = false;
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
        resetSecurityView();
        resetEnergyView();
        resetCanteenView();
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
      resetSecurityView();
      resetEnergyView();
      resetCanteenView();
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

    watch([isAssetParkScope, activeModuleProjectId, mapPopupProjectId], () => {
      if (activeTab.value === '资产管理') {
        nextTick(() => updateAssetThirdPanelChart());
      }
    });

    watch([fireSubSystem, fireFloorMode, fireSelectedFloor, mapPopupProjectId], () => {
      if (activeTab.value === '消防管理') {
        nextTick(() => initChartsForTab());
      }
    });

    watch([
      securitySubModule, securityFloorMode, securityGateMode,
      securitySelectedFloor, securityLedgerOpen, mapPopupProjectId,
    ], () => {
      if (activeTab.value === '安全管理') {
        nextTick(() => initChartsForTab());
      }
    });

    watch([
      energyFloorMode, energySelectedFloor, energyLedgerOpen,
      energyDevicePopupCode, mapPopupProjectId, energyTypeTab,
    ], () => {
      if (activeTab.value === '能源管理') {
        nextTick(() => initChartsForTab());
      }
    });

    watch([mapPopupProjectId, canteenFloorMode, canteenSelectedFloor, canteenMarketingMode, canteenScopeParkId], () => {
      if (activeTab.value === '食堂管理') {
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
      isAssetParkScope, assetSecondPanelTitle, assetThirdPanelTitle,
      propertyOmTab, propertyPeriod, propertyDate, propertyOmRankList,
      energyTypeTab, energyPeriodTab, energyCurrentKpi, energyTypeLabel,
      energyDailyTitle, energyDailyStat, energyPeriodTitle, energyPeriodStat,
      energyPeriodLabel, energyPeriodCompareLabel, energyPeriodChartTitle,
      isEnergyTab, isEnergyFloorMode, isEnergyParkMode, isEnergyMapMode, isEnergyMapWithPopup,
      showEnergyLeftStats, energyRankTitle,
      energyFloors: ENERGY_DATA.floors, energySelectedFloor, selectEnergyFloor,
      currentEnergyFloorDevices, energyBuildingPopup, closeEnergyBuildingPopup, enterEnergyBuilding,
      selectEnergyBuilding, exitEnergyFloor, selectEnergyFloorDevice,
      energyDevicePopup, energySelectedMeter, selectEnergyMeter,
      energyLedgerOpen, energyLedgerData, energyIaExpanded, energyFmExpanded, energyIdExpanded,
      openEnergyLedger, closeEnergyLedger,
      envTempTab, envAirTab, envTempList,
      canteenStatus, canteenGuest, canteenMarketing, canteenStatusMode, canteenStatusTitle, canteenStatusCards,
      isCanteenTab, isCanteenFloorMode, isCanteenParkMode, isCanteenMapMode, isCanteenMapWithPopup, isCanteenParkScoped,
      canteenFloors: CANTEEN_DATA.floors, canteenSelectedFloor, selectCanteenFloor,
      currentCanteenFloorPoints, canteenBuildingPopup, closeCanteenBuildingPopup, enterCanteenBuilding,
      selectCanteenBuilding, exitCanteenFloor, selectCanteenProjectNode,
      canteenMarketingMode, switchCanteenMarketingMode,
      isSecurityTab, securityMenuOpen, securityNavLabel,
      platformMenuOpen, togglePlatformMenu, navigateToPlatform,
      platformBizMenuOpen, otherBusinessSystems, selectBusinessSystem,
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
      isSecurityMgmtTab, isSecurityParkMode, isSecurityMapMode, isSecurityFloorMode, isSecurityGateMode,
      securitySubModule, securitySubModules: SECURITY_DATA.subModules, switchSecuritySubModule,
      securityFloors: SECURITY_DATA.floors, securitySelectedFloor, selectSecurityFloor,
      currentSecurityFloorDevices, currentSecurityDeviceList, showSecurityDevicePanel,
      securityDeviceListTitle, securityDeviceSearchPlaceholder, securityDeviceSearch,
      securitySelectedDevice, showSecurityBuildingTree,
      securityBuildingPopup, closeSecurityBuildingPopup, enterSecurityBuilding,
      exitSecurityFloor, exitSecurityGateMode, selectSecurityBuilding, selectSecurityProjectChild,
      securityParkGateMarkers: SECURITY_DATA.parkGateMarkers, selectSecurityGateFromScene,
      securityActiveGateDevice, securityDevicePopup, securityDevicePopupCode,
      securityLedgerOpen, securityLedgerData, securityIaExpanded, securityFmExpanded,
      openSecurityLedger, closeSecurityLedger, selectSecurityFloorDevice,
      currentSecurityKpi, parkingVehicleTotal,
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
      toggleProject, selectProject, toggleProjectExpand,
      handleProjectSelect, handleProjectChildSelect,
      toggleFullscreen, switchTab,
      toggleSecurityMenu, selectSecuritySub,
      closeMapPopup, enterPark, exitPark, switchOverviewEnergy, selectMapProject,
      updateAssetTypeChart, updateAirQualityChart, switchEnergyType, switchEnergyPeriod,
    };
  },
}).mount('#app');
