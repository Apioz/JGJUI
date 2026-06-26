const MIDDLE_PLATFORM_DATA = {
  locations: ['延安东路300号', '河南南路288号', '重庆南路139号', '重庆南路100号'],

  menuItems: [
    { id: 'home', label: '首页', icon: 'home', children: null },
    {
      id: 'asset',
      label: '资产管理',
      icon: 'asset',
      expanded: true,
      children: [
        { id: 'asset-office', label: '办公用房', path: 'office' },
        { id: 'asset-warehouse', label: '公务仓', path: 'warehouse' },
      ],
    },
    {
      id: 'security',
      label: '安全管理',
      icon: 'security',
      expanded: false,
      children: [
        { id: 'sec-overview', label: '安全概览', path: 'coming' },
        { id: 'sec-access', label: '门禁管理', path: 'coming' },
      ],
    },
    {
      id: 'energy',
      label: '能耗管理',
      icon: 'energy',
      expanded: false,
      children: [
        { id: 'energy-overview', label: '能耗概览', path: 'coming' },
        { id: 'energy-monitor', label: '能耗监测', path: 'coming' },
      ],
    },
    {
      id: 'canteen',
      label: '食堂管理',
      icon: 'canteen',
      expanded: false,
      children: [
        { id: 'canteen-overview', label: '食堂概览', path: 'coming' },
      ],
    },
    {
      id: 'property',
      label: '物业管理',
      icon: 'property',
      expanded: false,
      children: [
        { id: 'property-workorder', label: '工单管理', path: 'coming' },
      ],
    },
    {
      id: 'environment',
      label: '环境管理',
      icon: 'environment',
      expanded: false,
      children: [
        { id: 'env-monitor', label: '环境监测', path: 'coming' },
      ],
    },
    {
      id: 'knowledge',
      label: '管理知识库',
      icon: 'knowledge',
      expanded: false,
      children: [
        { id: 'kb-docs', label: '文档中心', path: 'coming' },
      ],
    },
    {
      id: 'risk',
      label: '风险预警',
      icon: 'risk',
      expanded: false,
      children: [
        { id: 'risk-alert', label: '预警列表', path: 'coming' },
      ],
    },
  ],

  summaryCards: [
    {
      label: '楼栋数量',
      value: '51',
      unit: '个',
      color: '#fa8c16',
      icon: 'building',
    },
    {
      label: '总使用面积',
      value: '579.42',
      unit: 'm²',
      color: '#722ed1',
      icon: 'area',
    },
    {
      label: '总建筑面积',
      value: '5279.42',
      unit: 'm²',
      color: '#9254de',
      icon: 'building',
    },
    {
      label: '房间数',
      value: '746',
      unit: '个',
      color: '#13c2c2',
      icon: 'room',
    },
  ],

  yearlyComparison: {
    years: [2025, 2026],
    availableYears: [2022, 2023, 2024, 2025, 2026, 2027],
    rows: [
      { name: '总使用面积', icon: 'area', y2025: 568.5, y2026: 579.42, change: 1.92, trend: 'up' },
      { name: '总建筑面积', icon: 'building', y2025: 5180, y2026: 5279.42, change: 1.92, trend: 'up' },
      { name: '楼栋数量', icon: 'building', y2025: 49, y2026: 51, change: 4.08, trend: 'up' },
      { name: '房间数', icon: 'room', y2025: 720, y2026: 746, change: 3.61, trend: 'up' },
    ],
  },

  officeAreaChart: {
    /** 默认层级：前三名单位（按占比） */
    top3: [
      { name: '区级统筹', proportion: 58, color: '#1d39c4' },
      { name: '机管局', proportion: 2, color: '#597ef7' },
      { name: '区建设管理委', proportion: 2, color: '#85a5ff' },
    ],
    /** 点击「其他」后展示的单位（除前三名外） */
    otherUnits: [
      { name: '区府办', proportion: 6, color: '#2f54eb' },
      { name: '区发展改革委', proportion: 4, color: '#1890ff' },
      { name: '区委组织部', proportion: 4, color: '#096dd9' },
      { name: '区人力资源社会保障局', proportion: 4, color: '#0050b3' },
      { name: '区国资委', proportion: 3, color: '#69c0ff' },
      { name: '区级统筹闲置办公室', proportion: 3, color: '#91d5ff' },
      { name: '大数据中心', proportion: 1, color: '#bae7ff' },
      { name: '城运中心', proportion: 1, color: '#adc6ff' },
      { name: '区地区办', proportion: 1, color: '#597ef7' },
      { name: '区商务委', proportion: 1.84, color: '#85a5ff' },
      { name: '区金融办', proportion: 1.19, color: '#597ef7' },
      { name: '人武部', proportion: 1.15, color: '#2f54eb' },
      { name: '区人社局', proportion: 0.38, color: '#1890ff' },
      { name: '区退役军人局', proportion: 0.46, color: '#096dd9' },
      { name: '区机关党工委', proportion: 0.35, color: '#0050b3' },
      { name: '保密办', proportion: 0.08, color: '#69c0ff' },
      { name: '人大领导', proportion: 0.08, color: '#91d5ff' },
      { name: '审改办', proportion: 0.02, color: '#bae7ff' },
      { name: '区人武部', proportion: 0.07, color: '#adc6ff' },
    ],
    /** 「其他」汇总占比 */
    otherTotal: 38,
  },

  /** @deprecated 保留兼容，图表已改用 officeAreaChart */
  officeAreaProportion: [
    { name: '已使用', value: 58, color: '#1d39c4' },
    { name: '预留', value: 2, color: '#597ef7' },
    { name: '闲置', value: 2, color: '#85a5ff' },
    { name: '其他', value: 38, color: '#d6e4ff' },
  ],

  unitList: [
    {
      name: '区建设管理委',
      area: 1337.11,
      proportion: 2.54,
      changes: [
        { date: '2025-11-08', area: 1337.11, proportion: 2.54 },
        { date: '2024-06-12', area: 1280.0, proportion: 2.48 },
      ],
    },
    {
      name: '区商务委',
      area: 967.33,
      proportion: 1.84,
      changes: [
        { date: '2025-09-20', area: 967.33, proportion: 1.84 },
        { date: '2024-02-15', area: 910.5, proportion: 1.72 },
      ],
    },
    {
      name: '人武部',
      area: 602.95,
      proportion: 1.15,
      changes: [
        { date: '2026-01-10', area: 602.95, proportion: 1.15 },
        { date: '2025-03-05', area: 580.0, proportion: 1.11 },
      ],
    },
    {
      name: '区金融办',
      area: 626.7,
      proportion: 1.19,
      changes: [
        { date: '2025-07-18', area: 626.7, proportion: 1.19 },
      ],
    },
    {
      name: '区人社局',
      area: 200.03,
      proportion: 0.38,
      changes: [
        { date: '2024-11-22', area: 200.03, proportion: 0.38 },
        { date: '2024-04-08', area: 185.6, proportion: 0.35 },
      ],
    },
    {
      name: '区机关党工委',
      area: 181.11,
      proportion: 0.35,
      changes: [
        { date: '2025-02-28', area: 181.11, proportion: 0.35 },
      ],
    },
    {
      name: '区退役军人局',
      area: 241.56,
      proportion: 0.46,
      changes: [
        { date: '2024-09-14', area: 241.56, proportion: 0.46 },
      ],
    },
    {
      name: '保密办',
      area: 40.8,
      proportion: 0.08,
      changes: [
        { date: '2024-12-01', area: 40.8, proportion: 0.08 },
        { date: '2024-05-20', area: 38.2, proportion: 0.07 },
      ],
    },
    {
      name: '区人武部',
      area: 34,
      proportion: 0.07,
      changes: [
        { date: '2025-06-30', area: 34, proportion: 0.07 },
      ],
    },
    {
      name: '人大领导',
      area: 40,
      proportion: 0.08,
      changes: [
        { date: '2024-08-05', area: 40, proportion: 0.08 },
      ],
    },
    {
      name: '审改办',
      area: 9.9,
      proportion: 0.02,
      changes: [
        { date: '2024-01-18', area: 9.9, proportion: 0.02 },
      ],
    },
  ],

  /** 公务仓 — 双仓库数据 */
  publicWarehouse: {
    warehouses: [
      { id: 'w1', name: '黄埔仓（通岸家园）', shortName: '黄埔仓', color: '#1890ff' },
      { id: 'w2', name: '闵行仓（崇海阁）', shortName: '闵行仓', color: '#69c0ff' },
    ],
    /** 自该年度起提供季度明细 */
    quarterlyStartYear: 2026,
    currentYear: 2026,
    currentQuarter: 'Q1',

    /** 在仓物资数量 — 本季度 */
    currentStock: {
      total: 822,
      w1: 484,
      w2: 338,
      freq: '本季度',
    },

    /** 累计存放物资数量 — 季度与年度为独立统计口径 */
    cumulative: {
      currentQuarter: { total: 1320, w1: 758, w2: 562, change: 5.6, trend: 'up' },
      /** 季度趋势（仅 2026 年起） */
      quarterlyTrend: {
        labels: ['2026 Q1'],
        total: [1320],
        w1: [758],
        w2: [562],
      },
      /** 年度总数（独立数据，不与季度加总对应） */
      yearlyTrend: {
        labels: ['2022', '2023', '2024', '2025', '2026'],
        total: [3200, 3850, 4520, 4180, 5280],
        w1: [1850, 2200, 2580, 2410, 3020],
        w2: [1350, 1650, 1940, 1770, 2260],
      },
      /** 季度历史（仅 2026 年起） */
      historyList: [
        { period: '2026 Q1', total: 1320, w1: 758, w2: 562, change: 5.6 },
      ],
    },

    /** 入库 — 按季度 */
    inbound: {
      metrics: [
        { key: 'count', label: '入库次数', unit: '次', icon: 'inbound' },
        { key: 'quantity', label: '入库物资数量', unit: '件', icon: 'inventory' },
        { key: 'assetValue', label: '入库固定资产价值', unit: '万元', icon: 'value' },
      ],
      currentQuarter: {
        count: { total: 86, w1: 52, w2: 34, change: 8.2, trend: 'up' },
        quantity: { total: 423, w1: 256, w2: 167, change: 6.5, trend: 'up' },
        assetValue: { total: 573, w1: 348, w2: 225, change: 3.1, trend: 'down' },
      },
      quarterlyTrend: {
        count: {
          labels: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1'],
          total: [72, 78, 81, 79, 86],
          w1: [44, 47, 49, 48, 52],
          w2: [28, 31, 32, 31, 34],
        },
        quantity: {
          labels: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1'],
          total: [360, 385, 398, 397, 423],
          w1: [218, 233, 241, 240, 256],
          w2: [142, 152, 157, 157, 167],
        },
        assetValue: {
          labels: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1'],
          total: [520, 545, 560, 568, 573],
          w1: [315, 330, 340, 345, 348],
          w2: [205, 215, 220, 223, 225],
        },
      },
      yearlyTotal: {
        count: { labels: ['2022', '2023', '2024', '2025'], total: [280, 310, 310, 86], w1: [170, 188, 188, 52], w2: [110, 122, 122, 34] },
        quantity: { labels: ['2022', '2023', '2024', '2025'], total: [1420, 1580, 1540, 423], w1: [860, 958, 933, 256], w2: [560, 622, 607, 167] },
        assetValue: { labels: ['2022', '2023', '2024', '2025'], total: [2100, 2280, 2193, 573], w1: [1270, 1380, 1330, 348], w2: [830, 900, 863, 225] },
      },
      /** 当年各季度 — 趋势图季度视图 */
      currentYearQuarterly: {
        count: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], total: [86, 89, 83, 91], w1: [52, 54, 50, 55], w2: [34, 35, 33, 36] },
        quantity: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], total: [423, 438, 415, 452], w1: [256, 265, 251, 273], w2: [167, 173, 164, 179] },
        assetValue: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], total: [573, 580, 565, 592], w1: [348, 352, 343, 358], w2: [225, 228, 222, 234] },
      },
      historyList: {
        count: [
          { period: '2025 Q1', total: 86, w1: 52, w2: 34, change: 8.9 },
          { period: '2024 Q4', total: 79, w1: 48, w2: 31, change: -2.5 },
          { period: '2024 Q3', total: 81, w1: 49, w2: 32, change: 3.8 },
          { period: '2024 Q2', total: 78, w1: 47, w2: 31, change: 8.3 },
          { period: '2024 Q1', total: 72, w1: 44, w2: 28, change: 5.9 },
        ],
        quantity: [
          { period: '2025 Q1', total: 423, w1: 256, w2: 167, change: 6.5 },
          { period: '2024 Q4', total: 397, w1: 240, w2: 157, change: -0.3 },
          { period: '2024 Q3', total: 398, w1: 241, w2: 157, change: 3.4 },
          { period: '2024 Q2', total: 385, w1: 233, w2: 152, change: 6.9 },
          { period: '2024 Q1', total: 360, w1: 218, w2: 142, change: 4.2 },
        ],
        assetValue: [
          { period: '2025 Q1', total: 573, w1: 348, w2: 225, change: 0.9 },
          { period: '2024 Q4', total: 568, w1: 345, w2: 223, change: 1.4 },
          { period: '2024 Q3', total: 560, w1: 340, w2: 220, change: 2.8 },
          { period: '2024 Q2', total: 545, w1: 330, w2: 215, change: 4.8 },
          { period: '2024 Q1', total: 520, w1: 315, w2: 205, change: 3.5 },
        ],
      },
    },

    /** 出库 — 按季度 */
    outbound: {
      metrics: [
        { key: 'count', label: '出库次数', unit: '次', icon: 'outbound' },
        { key: 'quantity', label: '出库物资数量', unit: '件', icon: 'inventory' },
        { key: 'savedFunds', label: '节约资金', unit: '万元', icon: 'value' },
      ],
      currentQuarter: {
        count: { total: 79, w1: 48, w2: 31, change: 4.0, trend: 'up' },
        quantity: { total: 423, w1: 257, w2: 166, change: 5.8, trend: 'up' },
        savedFunds: { total: 128, w1: 78, w2: 50, change: 12.3, trend: 'up' },
      },
      quarterlyTrend: {
        count: {
          labels: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1'],
          total: [68, 73, 76, 76, 79],
          w1: [41, 44, 46, 46, 48],
          w2: [27, 29, 30, 30, 31],
        },
        quantity: {
          labels: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1'],
          total: [355, 378, 392, 400, 423],
          w1: [215, 229, 238, 243, 257],
          w2: [140, 149, 154, 157, 166],
        },
        savedFunds: {
          labels: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1'],
          total: [95, 105, 112, 114, 128],
          w1: [58, 64, 68, 69, 78],
          w2: [37, 41, 44, 45, 50],
        },
      },
      yearlyTotal: {
        count: { labels: ['2022', '2023', '2024', '2025'], total: [265, 290, 293, 79], w1: [161, 176, 177, 48], w2: [104, 114, 116, 31] },
        quantity: { labels: ['2022', '2023', '2024', '2025'], total: [1380, 1520, 1525, 423], w1: [838, 924, 925, 257], w2: [542, 596, 600, 166] },
        savedFunds: { labels: ['2022', '2023', '2024', '2025'], total: [380, 420, 426, 128], w1: [232, 256, 260, 78], w2: [148, 164, 166, 50] },
      },
      currentYearQuarterly: {
        count: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], total: [79, 82, 78, 85], w1: [48, 50, 47, 52], w2: [31, 32, 31, 33] },
        quantity: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], total: [423, 435, 418, 445], w1: [257, 264, 253, 270], w2: [166, 171, 165, 175] },
        savedFunds: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], total: [128, 132, 125, 138], w1: [78, 80, 76, 84], w2: [50, 52, 49, 54] },
      },
      historyList: {
        count: [
          { period: '2025 Q1', total: 79, w1: 48, w2: 31, change: 3.9 },
          { period: '2024 Q4', total: 76, w1: 46, w2: 30, change: 0 },
          { period: '2024 Q3', total: 76, w1: 46, w2: 30, change: 4.1 },
          { period: '2024 Q2', total: 73, w1: 44, w2: 29, change: 7.4 },
          { period: '2024 Q1', total: 68, w1: 41, w2: 27, change: 5.2 },
        ],
        quantity: [
          { period: '2025 Q1', total: 423, w1: 257, w2: 166, change: 5.8 },
          { period: '2024 Q4', total: 400, w1: 243, w2: 157, change: 2.0 },
          { period: '2024 Q3', total: 392, w1: 238, w2: 154, change: 3.7 },
          { period: '2024 Q2', total: 378, w1: 229, w2: 149, change: 6.5 },
          { period: '2024 Q1', total: 355, w1: 215, w2: 140, change: 4.8 },
        ],
        savedFunds: [
          { period: '2025 Q1', total: 128, w1: 78, w2: 50, change: 12.3 },
          { period: '2024 Q4', total: 114, w1: 69, w2: 45, change: 1.8 },
          { period: '2024 Q3', total: 112, w1: 68, w2: 44, change: 6.7 },
          { period: '2024 Q2', total: 105, w1: 64, w2: 41, change: 10.5 },
          { period: '2024 Q1', total: 95, w1: 58, w2: 37, change: 8.6 },
        ],
      },
    },
  },
};
