const DASHBOARD_DATA = {
  navTabs: ['综合态势', '资产管理', '物业管理', '综合安防', '能源管理', '环境管理', '食堂管理'],

  kpiData: [
    {
      label: '空间总数',
      value: '6803',
      unit: '个',
      color: '#00e5ff',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    },
    {
      label: '设备总数',
      value: '12805',
      unit: '个',
      color: '#00e5ff',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
    },
    {
      label: '人员总数',
      value: '1236',
      unit: '人',
      color: '#00e5ff',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    },
    {
      label: '工单总数',
      value: '123',
      unit: '个',
      color: '#ff9500',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    },
  ],

  projects: [
    {
      id: 'p1',
      name: '延安东路300号',
      units: 3,
      expanded: true,
      children: [
        { id: 'p1-1', name: '1号楼', checked: true },
        { id: 'p1-2', name: '2号楼', checked: true },
        { id: 'p1-3', name: '3号楼', checked: false },
      ],
    },
    {
      id: 'p3',
      name: '重庆南路139号',
      units: 1,
      expanded: false,
      children: [{ id: 'p3-1', name: '主楼', checked: true }],
    },
    {
      id: 'p4',
      name: '重庆南路100号',
      units: 1,
      expanded: false,
      children: [{ id: 'p4-1', name: '机关大楼', checked: true }],
    },
    {
      id: 'p2',
      name: '河南南路288号',
      units: 2,
      expanded: false,
      children: [
        { id: 'p2-1', name: '主楼', checked: true },
        { id: 'p2-2', name: '附楼', checked: true },
      ],
    },
  ],

  /** 地图标注 — 高德 GCJ-02 坐标，与底图对齐 */
  mapMarkers: [
    { id: 'm1', name: '延安东路300号', lat: 31.231675, lng: 121.484431, projectId: 'p1' },
    { id: 'm2', name: '重庆南路139号', lat: 31.218512, lng: 121.468725, projectId: 'p3' },
    { id: 'm3', name: '重庆南路100号', lat: 31.217190, lng: 121.469480, projectId: 'p4' },
    { id: 'm4', name: '河南南路288号', lat: 31.221035, lng: 121.483407, projectId: 'p2' },
  ],

  /** 综合态势 — 沙盘项目列表 */
  overviewMapProjects: [
    {
      id: 'p1', name: '延安东路300号', units: 3, expanded: false,
      children: [
        { id: 'p1-1', name: '1号楼', checked: true },
        { id: 'p1-2', name: '2号楼', checked: true },
        { id: 'p1-3', name: '3号楼', checked: false },
      ],
    },
    {
      id: 'p3', name: '重庆南路139号', units: 6, expanded: false,
      children: [
        { id: 'p3-1', name: '1号楼', checked: true },
        { id: 'p3-2', name: '2号楼', checked: false },
      ],
    },
    {
      id: 'p4', name: '重庆南路100号', units: 2, expanded: false,
      children: [{ id: 'p4-1', name: '1号楼', checked: true }],
    },
    {
      id: 'p2', name: '河南南路288号', units: 1, expanded: false,
      children: [{ id: 'p2-1', name: '1号楼', checked: true }],
    },
  ],

  overviewSpaceCategories: [
    {
      id: 'sc-all', name: '空间分类', units: 52, expanded: true,
      children: [
        { id: 'sc1', name: '商铺', checked: false },
        { id: 'sc2', name: '公区', checked: true },
        { id: 'sc3', name: '室外场地', checked: true },
        { id: 'sc4', name: '接待大厅', checked: false },
      ],
    },
  ],

  overviewEquipmentCategories: [
    {
      id: 'ec-all', name: '设备分类', units: 23, expanded: true,
      children: [
        { id: 'ec1', name: '风机盘管系统', checked: true },
        { id: 'ec2', name: '水处理系统', checked: false },
        { id: 'ec3', name: '消防系统', checked: true },
        { id: 'ec4', name: '照明系统', checked: false },
      ],
    },
  ],

  /** 综合态势 — 园区模式项目树 */
  parkProjects: [
    { id: 'all', name: '全部项目', units: 10, expanded: true, children: [] },
    {
      id: 'p1', name: '延安东路300号', units: 3, expanded: true,
      children: [
        { id: 'p1-1', name: '1号楼', checked: true },
        { id: 'p1-2', name: '2号楼', checked: true },
        { id: 'p1-3', name: '3号楼', checked: false },
      ],
    },
    {
      id: 'p3', name: '重庆南路139号', units: 6, expanded: false,
      children: [
        { id: 'p3-1', name: '1号楼', checked: false },
        { id: 'p3-2', name: '2号楼', checked: false },
      ],
    },
    {
      id: 'p4', name: '重庆南路100号', units: 2, expanded: false,
      children: [{ id: 'p4-1', name: '1号楼', checked: false }],
    },
    {
      id: 'p2', name: '河南南路288号', units: 1, expanded: false,
      children: [{ id: 'p2-1', name: '1号楼', checked: false }],
    },
  ],

  parkKpiData: [
    { label: '空间总数', value: '1803', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
    { label: '设备总数', value: '2805', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg>' },
    { label: '人员总数', value: '1236', unit: '人', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>' },
    { label: '工单总数', value: '123', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
  ],

  parkTrendChart: {
    months: ['3月(24年)', '4月(24年)', '5月(24年)', '6月(24年)', '7月(24年)', '8月(24年)', '9月(24年)', '10月(24年)', '11月(24年)', '12月(24年)', '1月(25年)', '2月(25年)'],
    space: [42, 48, 52, 58, 62, 68, 72, 75, 78, 82, 85, 88],
    equipment: [55, 60, 65, 70, 74, 78, 82, 86, 90, 93, 96, 100],
  },

  /** 园区层面 3D 坐标建筑物底图（高清） */
  parkSceneImage: 'assets/images/park-scene-3d-hd.jpg',
  parkSceneImage2x: 'assets/images/park-scene-3d@2x.jpg',

  /** 园区 3D 场景楼栋热区（百分比定位） */
  parkBuildings: [
    { id: 'b1', name: '1号楼', x: 36, y: 34, w: 18, h: 28, focusRotateY: 10, focusRotateX: -11 },
    { id: 'b2', name: '2号楼', x: 56, y: 26, w: 20, h: 34, focusRotateY: -14, focusRotateX: -13 },
    { id: 'b3', name: '3号楼', x: 24, y: 46, w: 14, h: 16, focusRotateY: 22, focusRotateX: -9 },
    { id: 'c3', name: '3号食堂', x: 58, y: 38, w: 12, h: 14, focusRotateY: -8, focusRotateX: -10 },
  ],

  /** 各模块园区 3D 标注（按项目） */
  moduleParkMarkers: {
    资产管理: {
      b1: { line1: '1号楼', line2: '空间总数: 92个' },
      b2: { line1: '2号楼', line2: '空间总数: 86个' },
      b3: { line1: '3号楼', line2: '空间总数: 65个' },
    },
    物业管理: {
      b1: { line1: '1号楼', line2: '工单完成率: 80%' },
      b2: { line1: '2号楼', line2: '工单完成率: 80%' },
      b3: { line1: '3号楼', line2: '工单完成率: 75%' },
    },
    能源管理: {
      electricity: {
        b1: { line1: '1号楼', line2: '电表总数: 20个' },
        b2: { line1: '2号楼', line2: '电表总数: 20个' },
        b3: { line1: '3号楼', line2: '电表总数: 15个' },
      },
      water: {
        b1: { line1: '1号楼', line2: '水表总数: 20个' },
        b2: { line1: '2号楼', line2: '水表总数: 18个' },
        b3: { line1: '3号楼', line2: '水表总数: 12个' },
      },
    },
    环境管理: {
      b1: { line1: '1号楼', line2: '环境设备总数: 80' },
      b2: { line1: '2号楼', line2: '环境设备总数: 80' },
      b3: { line1: '3号楼', line2: '环境设备总数: 56' },
    },
    食堂管理: {
      c3: { line1: '3号食堂', line2: '3层' },
    },
    消防管理: {
      fb1: { line1: '1号楼', line2: '事件处理率 70%' },
      fb2: { line1: '2号楼', line2: '事件处理率 68%' },
      fb3: { line1: '3号楼', line2: '事件处理率 65%' },
      fb4: { line1: '4号楼', line2: '事件处理率 62%' },
      fb5: { line1: '5号楼', line2: '事件处理率 60%' },
    },
  },

  /** 园区模式 KPI（延安东路300号，参考设计图） */
  moduleParkKpi: {
    资产管理: [
      { label: '总建筑面积', value: '1,213', unit: '㎡', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>' },
      { label: '总使用面积', value: '1,213', unit: '㎡', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>' },
      { label: '空间总数', value: '300', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
      { label: '设备总数', value: '232', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg>' },
    ],
    物业管理: [
      { label: '本月报修完成率', value: '86.4', unit: '%', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
      { label: '本月巡检完成率', value: '98.3', unit: '%', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>' },
      { label: '本月维保完成率', value: '72.8', unit: '%', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83"/></svg>' },
      { label: '累计工单总数', value: '3,021,231', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>' },
    ],
    能源管理: {
      electricity: [
        { label: '总电表数', value: '700', unit: '↑', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
        { label: '当年总用电量', value: '11,215', unit: 'kwh', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
        { label: '接入迄今累计用电量', value: '11,215', unit: 'kwh', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
      ],
      water: [
        { label: '总水表数', value: '700', unit: '↑', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>' },
        { label: '当年总用水量', value: '11,215', unit: 'm³', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>' },
        { label: '接入迄今累计用水量', value: '11,215', unit: 'm³', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>' },
      ],
    },
    环境管理: [
      { label: '环境设备总数', value: '248', unit: '个', color: '#ffffff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>' },
      { label: '环境设备在线数', value: '200', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
      { label: '环境设备离线数', value: '48', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' },
      { label: '报警数', value: '5', unit: '条', color: '#ff4757', alert: true, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
    ],
    食堂管理: [
      { label: '采购订单总金额', value: '2,710', unit: '元', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>' },
      { label: '食堂库存总数', value: '1,948', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
      { label: '客饭预定数', value: '72', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>' },
      { label: '线上预定数', value: '386', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' },
    ],
    消防管理: [
      { label: '消防设备总数', value: '248', unit: '个', color: '#ffffff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>' },
      { label: '消防设备在线数', value: '200', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
      { label: '消防设备离线数', value: '48', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' },
      { label: '事件未处理数', value: '5', unit: '条', color: '#ff4757', alert: true, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
    ],
  },

  /** 资产管理 — 园区左侧分类 */
  assetSpaceCategories: [
    {
      id: 'sc-all', name: '空间分类', units: 52, expanded: true,
      children: [
        { id: 'sc1', name: '办公空间', checked: true },
        { id: 'sc2', name: '公共空间', checked: true },
        { id: 'sc3', name: '设备空间', checked: false },
        { id: 'sc4', name: '接待大厅', checked: false },
      ],
    },
  ],

  assetEquipmentCategories: [
    {
      id: 'ec-all', name: '设备分类', units: 23, expanded: true,
      children: [
        { id: 'ec1', name: '风机盘管系统', checked: true },
        { id: 'ec2', name: '水处理系统', checked: false },
        { id: 'ec3', name: '消防系统', checked: true },
        { id: 'ec4', name: '照明系统', checked: false },
      ],
    },
  ],

  /** 环境管理 — 园区左侧设备列表 */
  envDeviceList: {
    online: 6,
    offline: 3,
    items: [
      '环境#001', '环境#002', '环境#003', '环境#004', '环境#005',
      '环境#006', '环境#007', '环境#008', '环境#009', '环境#010',
      '环境#011', '环境#012', '环境#013',
    ],
  },

  /** 能源管理 — 园区左侧统计 */
  energyTypeDonut: {
    electricity: {
      items: [
        { name: '办公用电', value: 1481, color: '#1a6eb5' },
        { name: '照明用电', value: 1058, color: '#3ddc84' },
        { name: '动力用电', value: 846, color: '#00e5ff' },
        { name: '餐厅用电', value: 508, color: '#ff9500' },
        { name: '车间用电', value: 337, color: '#ffd60a' },
        { name: '空调用电', value: 280, color: '#7eb8ff' },
      ],
    },
    water: {
      items: [
        { name: '卫生间用水', value: 820, color: '#1a6eb5' },
        { name: '空调补水', value: 650, color: '#3ddc84' },
        { name: '特殊用水', value: 420, color: '#00e5ff' },
        { name: '饮用水', value: 310, color: '#ff9500' },
      ],
    },
  },

  energyBuildingRank: [
    { name: '1号楼', value: '233,323', unit: 'kWh' },
    { name: '2号楼', value: '200,323', unit: 'kWh' },
    { name: '3号楼', value: '165,323', unit: 'kWh' },
    { name: '4号楼', value: '132,323', unit: 'kWh' },
    { name: '5号楼', value: '122,323', unit: 'kWh' },
  ],

  waterBuildingRank: [
    { name: '1号楼', value: '233,323', unit: 'm³' },
    { name: '2号楼', value: '200,323', unit: 'm³' },
    { name: '3号楼', value: '165,323', unit: 'm³' },
    { name: '4号楼', value: '132,323', unit: 'm³' },
    { name: '5号楼', value: '122,323', unit: 'm³' },
  ],

  /** 地图标注弹窗详情 */
  projectDetails: {
    p1: {
      name: '延安东路300号',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=240&fit=crop',
      description: '黄浦区机关事务办公园区，集行政办公、会议接待与后勤服务于一体的综合性政务楼宇群。',
      area: '85,250',
      areaUnit: 'm²',
      address: '上海市黄浦区延安东路300号',
    },
    p2: {
      name: '河南南路288号',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=240&fit=crop',
      description: '河南南路政务办公点，主要承担日常行政办公与公共服务职能。',
      area: '32,600',
      areaUnit: 'm²',
      address: '上海市黄浦区河南南路288号',
    },
    p3: {
      name: '重庆南路139号',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=240&fit=crop',
      description: '重庆南路机关办公区，包含多栋办公楼宇及配套后勤设施。',
      area: '56,800',
      areaUnit: 'm²',
      address: '上海市黄浦区重庆南路139号',
    },
    p4: {
      name: '重庆南路100号',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=240&fit=crop',
      description: '重庆南路100号机关大楼，承担部分政务办公与档案管理功能。',
      area: '28,400',
      areaUnit: 'm²',
      address: '上海市黄浦区重庆南路100号',
    },
  },

  overviewTraffic: {
    days: ['11/1', '11/2', '11/3', '11/4', '11/5', '11/6', '11/7', '11/8'],
    vehicle: [120, 150, 130, 160, 140, 170, 155, 145],
    person: [80, 95, 88, 102, 90, 110, 98, 92],
  },

  overviewWorkOrder: {
    days: Array.from({ length: 31 }, (_, i) => `${i + 1}日`),
    completed: [4, 6, 3, 5, 7, 4, 2, 5, 6, 4, 3, 7, 5, 4, 6, 3, 5, 4, 6, 5, 3, 4, 7, 5, 4, 6, 3, 5, 4, 6, 5],
    pending: [2, 1, 2, 1, 0, 2, 1, 0, 1, 2, 1, 0, 2, 1, 0, 2, 1, 2, 0, 1, 2, 1, 0, 1, 2, 0, 1, 2, 1, 0, 1],
  },

  trendChart: {
    months: ['2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'],
    space: [6200, 6350, 6480, 6520, 6580, 6620, 6680, 6710, 6750, 6770, 6790, 6803],
    equipment: [11500, 11750, 11980, 12100, 12250, 12380, 12500, 12600, 12700, 12750, 12790, 12805],
  },

  rankVehicle: [
    { name: '中山东一路13号', value: 98 },
    { name: '河南中路', value: 75 },
    { name: '广东路689号', value: 70 },
    { name: '福州路', value: 66 },
  ],

  rankPerson: [
    { name: '延安东路300号', value: 95 },
    { name: '中山东一路13号', value: 88 },
    { name: '人民大道200号', value: 82 },
    { name: '河南南路288号', value: 76 },
  ],

  rankElectricity: [
    { name: '中山东一路13号', value: 98 },
    { name: '延安东路300号', value: 85 },
    { name: '广东路689号', value: 72 },
    { name: '福州路120号', value: 65 },
  ],

  rankWater: [
    { name: '河南南路288号', value: 92 },
    { name: '人民大道200号', value: 78 },
    { name: '中山东一路13号', value: 68 },
    { name: '延安东路300号', value: 55 },
  ],

  workOrder: {
    days: Array.from({ length: 31 }, (_, i) => `${i + 1}日`),
    completed: [3, 5, 2, 4, 6, 3, 1, 4, 5, 3, 2, 6, 4, 3, 5, 2, 4, 3, 5, 4, 2, 3, 6, 4, 3, 5, 2, 4, 3, 5, 4],
    pending: [1, 2, 1, 0, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0],
  },

  /** 资产管理页 */
  assetKpiData: [
    {
      label: '总建筑面积',
      value: '741,213',
      unit: '㎡',
      color: '#00e5ff',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>',
    },
    {
      label: '总使用面积',
      value: '1,213',
      unit: '㎡',
      color: '#00e5ff',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    },
    {
      label: '空间总数',
      value: '3,021',
      unit: '个',
      color: '#00e5ff',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    },
    {
      label: '设备总数',
      value: '3,021',
      unit: '个',
      color: '#ff9500',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg>',
    },
  ],

  assetProjects: [
    {
      id: 'p1',
      name: '延安东路300号',
      units: 10,
      expanded: true,
      children: [
        { id: 'p1-1', name: '1号楼', checked: true },
        { id: 'p1-2', name: '2号楼', checked: true },
        { id: 'p1-3', name: '3号楼', checked: false },
      ],
    },
    {
      id: 'p3',
      name: '重庆南路139号',
      units: 3,
      expanded: false,
      children: [{ id: 'p3-1', name: '主楼', checked: true }],
    },
    {
      id: 'p4',
      name: '重庆南路100号',
      units: 2,
      expanded: false,
      children: [{ id: 'p4-1', name: '机关大楼', checked: true }],
    },
    {
      id: 'p2',
      name: '河南南路288号',
      units: 1,
      expanded: false,
      children: [{ id: 'p2-1', name: '主楼', checked: true }],
    },
  ],

  assetTypeSpace: {
    totalLabel: '总面积',
    totalValue: '4230',
    totalUnit: '㎡',
    items: [
      { name: '办公空间', value: 1481, color: '#1a6eb5' },
      { name: '公共空间', value: 1058, color: '#3ddc84' },
      { name: '设备空间', value: 846, color: '#00e5ff' },
      { name: '研发生产', value: 508, color: '#ff9500' },
      { name: '辅助用房', value: 337, color: '#ffd60a' },
    ],
  },

  assetTypeEquipment: {
    totalLabel: '总数量',
    totalValue: '3021',
    totalUnit: '个',
    items: [
      { name: '暖通设备', value: 856, color: '#1a6eb5' },
      { name: '电气设备', value: 742, color: '#3ddc84' },
      { name: '给排水', value: 628, color: '#00e5ff' },
      { name: '安防设备', value: 495, color: '#ff9500' },
      { name: '其他设备', value: 300, color: '#ffd60a' },
    ],
  },

  /** 园区办公用房总使用面积占比（沙盘选中/进入园区时展示） */
  parkOfficeAreaChart: {
    default: {
      totalArea: 1213,
      items: [
        { name: '区级统筹', proportion: 58, color: '#1d39c4' },
        { name: '机管局', proportion: 2, color: '#597ef7' },
        { name: '区建设管理委', proportion: 2, color: '#85a5ff' },
        { name: '其他', proportion: 38, color: '#d6e4ff' },
      ],
    },
    byProject: {
      p1: {
        totalArea: 1213,
        items: [
          { name: '区级统筹', proportion: 58, color: '#1d39c4' },
          { name: '机管局', proportion: 2, color: '#597ef7' },
          { name: '区建设管理委', proportion: 2, color: '#85a5ff' },
          { name: '其他', proportion: 38, color: '#d6e4ff' },
        ],
      },
      p2: {
        totalArea: 980,
        items: [
          { name: '区级统筹', proportion: 52, color: '#1d39c4' },
          { name: '机管局', proportion: 3, color: '#597ef7' },
          { name: '区建设管理委', proportion: 4, color: '#85a5ff' },
          { name: '其他', proportion: 41, color: '#d6e4ff' },
        ],
      },
      p3: {
        totalArea: 856,
        items: [
          { name: '区级统筹', proportion: 48, color: '#1d39c4' },
          { name: '机管局', proportion: 5, color: '#597ef7' },
          { name: '区建设管理委', proportion: 3, color: '#85a5ff' },
          { name: '其他', proportion: 44, color: '#d6e4ff' },
        ],
      },
      p4: {
        totalArea: 742,
        items: [
          { name: '区级统筹', proportion: 45, color: '#1d39c4' },
          { name: '机管局', proportion: 6, color: '#597ef7' },
          { name: '区建设管理委', proportion: 4, color: '#85a5ff' },
          { name: '其他', proportion: 45, color: '#d6e4ff' },
        ],
      },
    },
  },

  assetAreaRank: [
    { name: '300号', value: 2321412 },
    { name: '288号', value: 2000412 },
    { name: '280号', value: 1806412 },
    { name: '260号', value: 1606412 },
    { name: '290号', value: 1406412 },
  ],

  assetTrendChart: {
    months: ['3月(24年)', '4月(24年)', '5月(24年)', '6月(24年)', '7月(24年)', '8月(24年)', '9月(24年)', '10月(24年)', '11月(24年)', '12月(24年)', '1月(25年)', '2月(25年)'],
    space: [42, 48, 45, 52, 58, 55, 62, 68, 65, 72, 70, 76],
    equipment: [35, 40, 38, 45, 50, 48, 54, 58, 56, 62, 60, 65],
  },

  /** 通用模块项目树（能源/环境/食堂等） */
  moduleProjects: [
    {
      id: 'p1', name: '延安东路300号', units: 3, expanded: true,
      children: [
        { id: 'p1-1', name: '1号楼', checked: true },
        { id: 'p1-2', name: '2号楼', checked: true },
        { id: 'p1-3', name: '3号楼', checked: false },
      ],
    },
    {
      id: 'p3', name: '重庆南路139号', units: 7, expanded: false,
      children: [
        { id: 'p3-1', name: '1号楼', checked: true },
        { id: 'p3-2', name: '2号楼', checked: true },
        { id: 'p3-3', name: '3号楼', checked: false },
        { id: 'p3-4', name: '4号楼', checked: false },
        { id: 'p3-5', name: '5号楼', checked: false },
        { id: 'p3-6', name: '6号楼', checked: false },
        { id: 'p3-7', name: '7号楼', checked: false },
      ],
    },
    {
      id: 'p4', name: '重庆南路100号', units: 2, expanded: false,
      children: [
        { id: 'p4-1', name: '1号楼', checked: true },
        { id: 'p4-2', name: '2号楼', checked: true },
      ],
    },
    {
      id: 'p2', name: '河南南路288号', units: 3, expanded: false,
      children: [
        { id: 'p2-1', name: '1号楼', checked: true },
        { id: 'p2-2', name: '2号楼', checked: true },
        { id: 'p2-3', name: '3号楼', checked: false },
      ],
    },
  ],

  /** 物业管理 */
  propertyKpiData: [
    { label: '本月报修完成率', value: '86.4', unit: '%', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
    { label: '本月巡检完成率', value: '98.3', unit: '%', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>' },
    { label: '本月维保完成率', value: '72.8', unit: '%', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83"/></svg>' },
    { label: '累计工单总数', value: '3,021,231', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>' },
  ],

  propertyProjects: [
    { id: 'p1', name: '延安东路300号', units: 10, expanded: true, children: [
      { id: 'p1-1', name: '1号楼', checked: true }, { id: 'p1-2', name: '2号楼', checked: true }, { id: 'p1-3', name: '3号楼', checked: false },
    ]},
    { id: 'p3', name: '重庆南路139号', units: 3, expanded: false, children: [{ id: 'p3-1', name: '主楼', checked: true }] },
    { id: 'p4', name: '重庆南路100号', units: 2, expanded: false, children: [{ id: 'p4-1', name: '机关大楼', checked: true }] },
    { id: 'p2', name: '河南南路288号', units: 1, expanded: false, children: [{ id: 'p2-1', name: '主楼', checked: true }] },
  ],

  propertyCategory: {
    weeks: ['第一周', '第二周', '第三周', '第四周'],
    repair: [85, 92, 78, 88],
    inspection: [120, 115, 130, 125],
    maintenance: [60, 55, 70, 65],
  },

  workDuration: {
    labels: ['6h内', '12h内', '24h内', '>1天', '>3天', '>7天'],
    values: [320, 280, 190, 120, 65, 30],
  },

  propertyOmRank: {
    repair: [
      { name: '1号楼', value: 132 },
      { name: '2号楼', value: 122 },
      { name: '3号楼', value: 100 },
      { name: '4号楼', value: 90 },
      { name: '5号楼', value: 78 },
    ],
    inspection: [
      { name: '延安东路300号', value: 156 },
      { name: '重庆南路139号', value: 142 },
      { name: '河南南路288号', value: 128 },
      { name: '重庆南路100号', value: 115 },
      { name: '地铁5号线', value: 98 },
    ],
    maintenance: [
      { name: '河南南路288号', value: 88 },
      { name: '延安东路300号', value: 82 },
      { name: '重庆南路100号', value: 76 },
      { name: '重庆南路139号', value: 70 },
      { name: '地铁5号线', value: 62 },
    ],
  },

  /** 能源管理 */
  energyKpiData: [
    { label: '总电表数', value: '700', unit: '↑', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
    { label: '当年总用电量', value: '11,215', unit: 'kwh', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
    { label: '接入迄今累计用电量', value: '11,215', unit: 'kwh', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
  ],

  waterKpiData: [
    { label: '总水表数', value: '700', unit: '↑', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>' },
    { label: '当年总用水量', value: '11,215', unit: 'm³', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>' },
    { label: '接入迄今累计用水量', value: '11,215', unit: 'm³', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>' },
  ],

  energyDailyStat: { value: '1,215', unit: 'kwh', diff: '100', diffUnit: 'kwh', percent: '10' },
  waterDailyStat: { value: '1,215', unit: 'm³', diff: '100', diffUnit: 'm³', percent: '10' },
  energyPeriodStat: { value: '1,215', unit: 'kwh', diff: '100', diffUnit: 'kwh', percent: '10' },
  waterMonthlyStat: { value: '1,215', unit: 'm³', diff: '100', diffUnit: 'kwh', percent: '10' },

  energyHourly: {
    hours: ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'],
    today: [30, 25, 20, 35, 80, 120, 150, 180, 200, 190, 160, 100, 60],
    yesterday: [28, 22, 18, 32, 75, 115, 145, 175, 195, 185, 155, 95, 55],
  },

  waterHourly: {
    hours: ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'],
    today: [25, 20, 15, 30, 70, 110, 140, 170, 190, 180, 150, 90, 50],
    yesterday: [22, 18, 14, 28, 65, 105, 135, 165, 185, 175, 145, 85, 48],
  },

  energyDailyMonthly: {
    legend: ['当月', '上月'],
    labels: Array.from({ length: 31 }, (_, i) => `${i + 1}日`),
    current: [80, 95, 110, 125, 140, 155, 170, 185, 200, 210, 205, 195, 180, 165, 150, 140, 155, 170, 190, 205, 220, 215, 200, 185, 170, 160, 175, 190, 200, 185, 170],
    previous: [75, 88, 102, 118, 132, 145, 160, 175, 188, 198, 192, 182, 168, 155, 142, 132, 145, 160, 178, 192, 205, 200, 185, 172, 158, 148, 162, 175, 185, 172, 160],
  },

  energyMonthly: {
    legend: ['当年', '去年'],
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    current: [800, 950, 1100, 1200, 1350, 1500, 1650, 1800, 1700, 1600, 1400, 1215],
    previous: [750, 900, 1050, 1150, 1280, 1420, 1580, 1720, 1620, 1520, 1320, 1115],
  },

  energyYearlyChart: {
    legend: ['当年', '去年'],
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    current: [12000, 13500, 14800, 16200, 17500, 18800],
    previous: [11000, 12800, 14000, 15500, 16800, 18000],
  },

  waterDailyChart: {
    legend: ['当月', '上月'],
    labels: ['1日', '6日', '11日', '16日', '21日', '26日', '30日'],
    current: [80, 120, 150, 180, 200, 190, 170],
    previous: [75, 115, 145, 175, 195, 185, 165],
  },

  waterMonthly: {
    legend: ['当月', '上月'],
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
    current: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205],
    previous: [55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200],
  },

  /** 环境管理 */
  tempTopMax: [
    { name: '房间01', value: '22' },
    { name: '房间02', value: '21.5' },
    { name: '房间15', value: '20.5' },
    { name: '房间12', value: '20' },
    { name: '房间12', value: '20' },
  ],

  tempTopMin: [
    { name: '房间06', value: '16' },
    { name: '房间07', value: '15' },
    { name: '房间08', value: '14' },
    { name: '房间09', value: '13' },
    { name: '房间10', value: '12' },
  ],

  airQuality: {
    categories: ['PM2.5', 'PM10', 'CO2', 'TVOC', '湿度', '温度', '噪声', '光照'],
    todayMax: [45, 68, 820, 0.35, 62, 24, 55, 320],
    yesterdayMax: [42, 65, 800, 0.32, 60, 23, 52, 310],
    todayMin: [18, 28, 420, 0.12, 45, 18, 35, 120],
    yesterdayMin: [16, 25, 400, 0.10, 42, 17, 32, 110],
  },

  deviceAlarm: {
    days: ['1日', '6日', '11日', '16日', '21日', '26日', '30日'],
    current: [1, 2, 3, 2, 4, 3, 2],
    previous: [2, 1, 2, 3, 2, 3, 1],
  },

  /** 食堂管理 */
  canteenKpiData: [
    { label: '采购订单总金额', value: '27200', unit: '元', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>' },
    { label: '食堂库存总数', value: '4832', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
    { label: '客饭预定数', value: '483', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>' },
    { label: '线上预定数', value: '386', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' },
  ],

  canteenStatus: {
    headers: ['食堂名称', '三清三关', '留样单监测', '晨检结果'],
    rows: [
      ['1食堂', '通过', '通过', '通过'],
      ['2食堂', '通过', '通过', '通过'],
      ['3食堂', '通过', '通过', '通过'],
      ['4食堂', '通过', '通过', '通过'],
    ],
  },

  canteenGuest: {
    total: 1390,
    days: ['周一', '周二', '周三', '周四', '周五'],
    online: [100, 140, 230, 100, 130],
    offline: [150, 100, 200, 140, 100],
  },

  canteenMarketing: {
    days: ['周一', '周二', '周三', '周四', '周五'],
    people: [746, 619, 610, 841, 708],
  },

  /** 安全管理 */
  securityKpiData: [
    { label: '设备总数', value: '248', unit: '个', color: '#ffffff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>' },
    { label: '设备在线数', value: '200', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
    { label: '设备离线数', value: '48', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' },
  ],

  securityProjects: [
    { id: 'all', name: '全部项目', units: 10, expanded: true, children: [] },
    {
      id: 'p1', name: '延安东路300号', units: 3, expanded: true,
      children: [
        { id: 'p1-1', name: '1号楼', checked: true },
        { id: 'p1-2', name: '2号楼', checked: true },
        { id: 'p1-3', name: '3号楼', checked: false },
      ],
    },
    {
      id: 'p3', name: '重庆南路139号', units: 3, expanded: false,
      children: [
        { id: 'p3-1', name: '1号楼', checked: true },
        { id: 'p3-2', name: '2号楼', checked: false },
        { id: 'p3-3', name: '3号楼', checked: false },
        { id: 'p3-4', name: '4号楼', checked: false },
        { id: 'p3-5', name: '5号楼', checked: false },
        { id: 'p3-6', name: '6号楼', checked: false },
      ],
    },
    { id: 'p4', name: '重庆南路100号', units: 2, expanded: false, children: [{ id: 'p4-1', name: '1号楼', checked: true }] },
    { id: 'p2', name: '河南南路288号', units: 1, expanded: false, children: [{ id: 'p2-1', name: '1号楼', checked: true }] },
  ],

  publicVehicle: {
    total: 80,
    items: [
      { name: '公务用车数', value: 48, color: '#00e5ff' },
      { name: '行政执法用车数', value: 32, color: '#1a6eb5' },
    ],
  },

  vehicleTraffic: {
    days: ['1日', '6日', '11日', '16日', '21日', '26日', '30日'],
    current: [120, 180, 220, 190, 210, 200, 180],
    previous: [100, 150, 180, 170, 190, 175, 160],
  },

  visitorTrend: {
    days: ['1日', '6日', '11日', '16日', '21日', '26日', '30日'],
    current: [80, 120, 230, 150, 200, 240, 180],
    previous: [70, 110, 200, 140, 180, 210, 160],
  },

  /** 消防管理 */
  fireKpiData: [
    { label: '消防设备总数', value: '248', unit: '个', color: '#ffffff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>' },
    { label: '消防设备在线数', value: '200', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
    { label: '消防设备离线数', value: '48', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' },
    { label: '事件未处理数', value: '5', unit: '条', color: '#ff4757', alert: true, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
  ],

  fireAlarmTrend: {
    months: ['3月(24年)', '4月(24年)', '5月(24年)', '6月(24年)', '7月(24年)', '8月(24年)', '9月(24年)', '10月(24年)', '11月(24年)', '12月(24年)', '1月(25年)', '2月(25年)'],
    total: [42, 48, 55, 62, 58, 65, 72, 68, 75, 70, 66, 60],
    completed: [38, 44, 50, 58, 54, 60, 68, 64, 70, 65, 62, 55],
  },

  fireCompletionGauges: [
    { id: 'Alarm', label: '报警完成率', value: 100, color: '#00e5ff', pending: 0, done: 1620 },
    { id: 'Fault', label: '故障完成率', value: 100, color: '#ffd60a', pending: 0, done: 1620 },
    { id: 'Danger', label: '隐患完成率', value: 100, color: '#ff4757', pending: 0, done: 1620 },
  ],

  fireLocationRank: {
    alarm: [
      { name: '1号楼1F 储物间', value: 34 },
      { name: '2号楼 机房', value: 20 },
      { name: '3号楼 3F-3001 办公室', value: 15 },
      { name: '4号楼 公共区域', value: 10 },
      { name: '5号楼 公共区域', value: 7 },
    ],
    fault: [
      { name: '2号楼机房', value: 28 },
      { name: '1号楼1F弱电间', value: 22 },
      { name: '3号楼配电室', value: 18 },
      { name: '4号楼公共区域', value: 12 },
      { name: '5号楼消防通道', value: 8 },
    ],
    danger: [
      { name: '3号楼3F3001办公室', value: 25 },
      { name: '1号楼1F弱电间', value: 19 },
      { name: '2号楼机房', value: 14 },
      { name: '5号楼公共区域', value: 11 },
      { name: '4号楼仓库', value: 6 },
    ],
  },

  fireProjects: [
    { id: 'all', name: '全部项目', units: 10, expanded: true, children: [] },
    {
      id: 'p1', name: '延安东路300号', units: 7, expanded: true,
      children: [
        { id: 'p1-1', name: '1号楼', checked: true },
        { id: 'p1-2', name: '2号楼', checked: true },
        { id: 'p1-3', name: '3号楼', checked: false },
        { id: 'p1-4', name: '4号楼', checked: false },
        { id: 'p1-5', name: '5号楼', checked: false },
        { id: 'p1-6', name: '6号楼', checked: false },
        { id: 'p1-7', name: '7号楼', checked: false },
      ],
    },
    {
      id: 'p3', name: '重庆南路139号', units: 3, expanded: false,
      children: [
        { id: 'p3-1', name: '1号楼', checked: true },
        { id: 'p3-2', name: '2号楼', checked: false },
      ],
    },
    {
      id: 'p4', name: '重庆南路100号', units: 2, expanded: false,
      children: [{ id: 'p4-1', name: '1号楼', checked: true }],
    },
    {
      id: 'p2', name: '河南南路288号', units: 1, expanded: false,
      children: [{ id: 'p2-1', name: '1号楼', checked: true }],
    },
  ],
};
