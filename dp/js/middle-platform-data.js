const MIDDLE_PLATFORM_DATA = {
  locations: ['延安东路300号', '河南南路288号', '重庆南路139号', '重庆南路100号'],

  menuItems: [
    {
      id: 'home',
      label: '首页',
      icon: 'home',
      expanded: true,
      children: [
        { id: 'home-dashboard', label: '数据看板', path: 'dashboard' },
      ],
    },
    {
      id: 'asset',
      label: '资产管理',
      icon: 'asset',
      expanded: true,
      children: [
        { id: 'asset-office', label: '办公用房', path: 'office' },
        { id: 'asset-warehouse', label: '公物仓', path: 'warehouse' },
      ],
    },
    {
      id: 'security',
      label: '安全管理',
      icon: 'security',
      expanded: false,
      children: [
        {
          id: 'sec-parking',
          label: '停车管理',
          expanded: false,
          children: [
            { id: 'parking-overview', label: '停车总览', path: 'parking-overview' },
            { id: 'parking-gate', label: '车闸设备管理', path: 'parking-gate-device' },
          ],
        },
        {
          id: 'sec-monitor',
          label: '监控管理',
          expanded: false,
          children: [
            { id: 'monitor-device', label: '监控设备管理', path: 'monitor-device' },
            { id: 'monitor-resource', label: '资源监控视图', path: 'monitor-resource-view' },
          ],
        },
        {
          id: 'sec-access',
          label: '通行管理',
          expanded: false,
          children: [
            { id: 'access-overview', label: '通行总览', path: 'access-overview' },
            { id: 'access-device', label: '通行设备管理', path: 'access-device' },
          ],
        },
        {
          id: 'sec-fire',
          label: '消防管理',
          expanded: false,
          children: [
            {
              id: 'fire-alarm',
              label: '报警管理',
              expanded: false,
              children: [
                { id: 'fire-alarm-stats', label: '报警统计', path: 'fire-alarm-stats' },
                { id: 'fire-alarm-list', label: '报警列表', path: 'fire-alarm-list' },
              ],
            },
            {
              id: 'fire-fault',
              label: '故障管理',
              expanded: false,
              children: [
                { id: 'fire-fault-stats', label: '故障统计', path: 'fire-fault-stats' },
                { id: 'fire-fault-list', label: '故障列表', path: 'fire-fault-list' },
              ],
            },
            {
              id: 'fire-hazard',
              label: '隐患管理',
              expanded: false,
              children: [
                { id: 'fire-hazard-stats', label: '隐患统计', path: 'fire-hazard-stats' },
                { id: 'fire-hazard-list', label: '隐患列表', path: 'fire-hazard-list' },
              ],
            },
            {
              id: 'fire-alarm-sys',
              label: '火灾自动报警系统',
              expanded: false,
              children: [
                { id: 'fire-alarm-sys-device', label: '火灾自动报警设备', path: 'fire-alarm-sys-device' },
                { id: 'fire-alarm-sys-status', label: '设备运行状态', path: 'fire-alarm-sys-status' },
              ],
            },
            {
              id: 'fire-smoke',
              label: '防排烟系统',
              expanded: false,
              children: [
                { id: 'fire-smoke-device', label: '防排烟设备管理', path: 'fire-smoke-device' },
                { id: 'fire-smoke-status', label: '设备运行状态', path: 'fire-smoke-status' },
              ],
            },
            {
              id: 'fire-sprinkler',
              label: '自动喷水灭火系统',
              expanded: false,
              children: [
                { id: 'fire-sprinkler-device', label: '自动喷水灭火设备', path: 'fire-sprinkler-device' },
                { id: 'fire-sprinkler-status', label: '设备运行状态', path: 'fire-sprinkler-status' },
              ],
            },
            {
              id: 'fire-hydrant',
              label: '室内消火栓系统',
              expanded: false,
              children: [
                { id: 'fire-hydrant-device', label: '消防栓设备管理', path: 'fire-hydrant-device' },
                { id: 'fire-hydrant-status', label: '设备运行状态', path: 'fire-hydrant-status' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'personnel',
      label: '人员管理',
      icon: 'personnel',
      path: 'personnel-mgmt',
    },
    {
      id: 'energy',
      label: '能耗管理',
      icon: 'energy',
      expanded: false,
      children: [
        { id: 'energy-report', label: '能耗报表', path: 'energy-report' },
        {
          id: 'energy-stats',
          label: '能耗统计',
          expanded: false,
          children: [
            { id: 'energy-overview', label: '能耗总览', path: 'energy-overview' },
            { id: 'energy-flow', label: '能源流向分析', path: 'energy-flow' },
          ],
        },
        {
          id: 'energy-electric',
          label: '电能设备管理',
          expanded: false,
          children: [
            { id: 'energy-cabinet', label: '电柜管理', path: 'energy-cabinet' },
            {
              id: 'energy-meter-group',
              label: '电表管理',
              expanded: false,
              children: [
                { id: 'energy-meter', label: '电表管理', path: 'energy-meter' },
                { id: 'energy-meter-data', label: '仪表数据', path: 'energy-meter-data' },
                { id: 'energy-upstream', label: '上下游关系管理', path: 'energy-upstream' },
                { id: 'energy-peak-valley', label: '电表峰谷规则', path: 'energy-peak-valley' },
              ],
            },
          ],
        },
        {
          id: 'energy-water',
          label: '水能设备管理',
          expanded: false,
          children: [
            { id: 'energy-water-meter', label: '水表管理', path: 'energy-water-meter' },
            { id: 'energy-water-upstream', label: '上下游关系管理', path: 'energy-water-upstream' },
          ],
        },
        { id: 'energy-type', label: '能源类型管理', path: 'energy-type' },
      ],
    },
    {
      id: 'canteen',
      label: '食堂管理',
      icon: 'canteen',
      expanded: false,
      children: [
        { id: 'canteen-card-records', label: '智慧卡记录', path: 'canteen-card-records' },
        { id: 'canteen-operation', label: '食堂运营', path: 'canteen-operation' },
        { id: 'canteen-supervision', label: '食堂监管', path: 'canteen-supervision' },
      ],
    },
    {
      id: 'property',
      label: '物业管理',
      icon: 'property',
      expanded: false,
      children: [
        {
          id: 'property-workbench',
          label: '工作台',
          expanded: false,
          children: [
            { id: 'property-repair-new', label: '新增报修', path: 'property-repair-new' },
            { id: 'property-todo', label: '我的待办', path: 'property-todo' },
            { id: 'property-initiated', label: '我发起的', path: 'property-initiated' },
            { id: 'property-done', label: '我的已办', path: 'property-done' },
            { id: 'property-completed', label: '办结事宜', path: 'property-completed' },
          ],
        },
        {
          id: 'property-scheduling',
          label: '工作排班',
          expanded: false,
          children: [
            { id: 'property-schedule-table', label: '排班表', path: 'property-schedule-table' },
            { id: 'property-schedule-mgmt', label: '排班管理', path: 'property-schedule-mgmt' },
            { id: 'property-shift-mgmt', label: '班次管理', path: 'property-shift-mgmt' },
            { id: 'property-workgroup', label: '工作组', path: 'property-workgroup' },
          ],
        },
        {
          id: 'property-repair-mgmt',
          label: '报修管理',
          expanded: false,
          children: [
            { id: 'property-repair-order', label: '报修工单', path: 'property-repair-order' },
          ],
        },
        {
          id: 'property-maint-mgmt',
          label: '维保管理',
          expanded: false,
          children: [
            { id: 'property-maint-calendar', label: '维保日历', path: 'property-maint-calendar' },
            { id: 'property-maint-procedure', label: '维保程序', path: 'property-maint-procedure' },
            { id: 'property-maint-plan', label: '维保计划', path: 'property-maint-plan' },
            { id: 'property-maint-order', label: '维保工单', path: 'property-maint-order' },
          ],
        },
        {
          id: 'property-inspect-mgmt',
          label: '巡检管理',
          expanded: false,
          children: [
            { id: 'property-inspect-point', label: '巡检点位', path: 'property-inspect-point' },
            { id: 'property-inspect-procedure', label: '巡检程序', path: 'property-inspect-procedure' },
            { id: 'property-inspect-route', label: '巡检路线', path: 'property-inspect-route' },
            { id: 'property-inspect-plan', label: '巡检计划', path: 'property-inspect-plan' },
            { id: 'property-inspect-order', label: '巡检工单', path: 'property-inspect-order' },
          ],
        },
        {
          id: 'property-spare-mgmt',
          label: '备件管理',
          expanded: false,
          children: [
            { id: 'property-spare-ledger', label: '备件台账', path: 'property-spare-ledger' },
            { id: 'property-spare-outbound', label: '出库管理', path: 'property-spare-outbound' },
            { id: 'property-spare-inbound', label: '入库管理', path: 'property-spare-inbound' },
          ],
        },
        {
          id: 'property-process-mgmt',
          label: '流程管理',
          expanded: false,
          children: [
            { id: 'property-process-new', label: '新建流程', path: 'property-process-new' },
          ],
        },
        { id: 'property-supplier', label: '供应商管理', path: 'property-supplier' },
      ],
    },
    {
      id: 'environment',
      label: '环境管理',
      icon: 'environment',
      expanded: false,
      children: [
        { id: 'env-device', label: '环境设备管理', path: 'env-device' },
        { id: 'env-operation', label: '运行记录', path: 'env-operation' },
        { id: 'env-alarm', label: '告警记录', path: 'env-alarm' },
      ],
    },
    {
      id: 'knowledge',
      label: '管理知识库',
      icon: 'knowledge',
      expanded: false,
      children: [
        { id: 'knowledge-agent', label: '智能体工作台', path: 'knowledge-agent' },
      ],
    },
    {
      id: 'risk',
      label: '风险预警',
      icon: 'risk',
      expanded: false,
      children: [
        { id: 'risk-dashboard', label: '风险看板', path: 'risk-dashboard' },
        { id: 'risk-indicators', label: '风险指标', path: 'risk-indicators' },
        { id: 'risk-rules', label: '风险规则', path: 'risk-rules' },
        { id: 'risk-event-category', label: '事件分类', path: 'risk-event-category' },
        {
          id: 'risk-report',
          label: '风险报告',
          expanded: false,
          children: [
            { id: 'risk-report-center', label: '报告中心', path: 'risk-report-center' },
            { id: 'risk-report-template', label: '模板管理', path: 'risk-report-template' },
            { id: 'risk-report-schedule', label: '定时任务', path: 'risk-report-schedule' },
          ],
        },
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
      location: '1号楼 3层',
      area: 1337.11,
      proportion: 2.54,
      changes: [
        { date: '2025-11-08', area: 1337.11, proportion: 2.54 },
        { date: '2024-06-12', area: 1280.0, proportion: 2.48 },
      ],
    },
    {
      name: '区商务委',
      location: '1号楼 5层',
      area: 967.33,
      proportion: 1.84,
      changes: [
        { date: '2025-09-20', area: 967.33, proportion: 1.84 },
        { date: '2024-02-15', area: 910.5, proportion: 1.72 },
      ],
    },
    {
      name: '人武部',
      location: '2号楼 2层',
      area: 602.95,
      proportion: 1.15,
      changes: [
        { date: '2026-01-10', area: 602.95, proportion: 1.15 },
        { date: '2025-03-05', area: 580.0, proportion: 1.11 },
      ],
    },
    {
      name: '区金融办',
      location: '2号楼 4层',
      area: 626.7,
      proportion: 1.19,
      changes: [
        { date: '2025-07-18', area: 626.7, proportion: 1.19 },
      ],
    },
    {
      name: '区人社局',
      location: '3号楼 1层',
      area: 200.03,
      proportion: 0.38,
      changes: [
        { date: '2024-11-22', area: 200.03, proportion: 0.38 },
        { date: '2024-04-08', area: 185.6, proportion: 0.35 },
      ],
    },
    {
      name: '区机关党工委',
      location: '3号楼 3层',
      area: 181.11,
      proportion: 0.35,
      changes: [
        { date: '2025-02-28', area: 181.11, proportion: 0.35 },
      ],
    },
    {
      name: '区退役军人局',
      location: '3号楼 5层',
      area: 241.56,
      proportion: 0.46,
      changes: [
        { date: '2024-09-14', area: 241.56, proportion: 0.46 },
      ],
    },
    {
      name: '保密办',
      location: '4号楼 2层',
      area: 40.8,
      proportion: 0.08,
      changes: [
        { date: '2024-12-01', area: 40.8, proportion: 0.08 },
        { date: '2024-05-20', area: 38.2, proportion: 0.07 },
      ],
    },
    {
      name: '区人武部',
      location: '4号楼 4层',
      area: 34,
      proportion: 0.07,
      changes: [
        { date: '2025-06-30', area: 34, proportion: 0.07 },
      ],
    },
    {
      name: '人大领导',
      location: '5号楼 1层',
      area: 40,
      proportion: 0.08,
      changes: [
        { date: '2024-08-05', area: 40, proportion: 0.08 },
      ],
    },
    {
      name: '审改办',
      location: '5号楼 3层',
      area: 9.9,
      proportion: 0.02,
      changes: [
        { date: '2024-01-18', area: 9.9, proportion: 0.02 },
      ],
    },
  ],

  /** 公物仓 — 双仓库数据 */
  publicWarehouse: {
    warehouses: [
      { id: 'w1', name: '黄浦仓（国货路371号）', shortName: '黄浦仓', color: '#1890ff' },
      { id: 'w2', name: '闵行仓（立跃路1758号）', shortName: '闵行仓', color: '#69c0ff' },
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
