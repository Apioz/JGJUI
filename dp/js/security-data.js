const SECURITY_DATA = {
  subModules: [
    { id: 'monitor', label: '监控设备', count: 32, icon: '📷' },
    { id: 'access', label: '通行管理', count: 32, icon: '🚪' },
    { id: 'parking', label: '停车管理', count: 2, icon: '🚗' },
  ],

  mapKpi: [
    { label: '设备总数', value: '248', unit: '个', color: '#ffffff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>' },
    { label: '设备在线数', value: '200', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
    { label: '设备离线数', value: '48', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' },
  ],

  moduleKpis: {
    monitor: [
      { label: '监控设备总数', value: '248', unit: '个', color: '#ffffff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>' },
      { label: '监控设备在线数', value: '200', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
      { label: '监控设备离线数', value: '48', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' },
    ],
    access: [
      { label: '门禁设备总数', value: '248', unit: '个', color: '#ffffff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' },
      { label: '门禁设备在线数', value: '200', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
      { label: '门禁设备离线数', value: '48', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' },
      { label: '当日截止当前通行总人数', value: '21', unit: '人', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>' },
    ],
    parking: [
      { label: '车辆总数', value: '240', unit: '个', color: '#ffffff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 17h14M5 17a2 2 0 1 1 0-4h14a2 2 0 1 1 0 4M5 17v-5l2-4h10l2 4v5"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>' },
      { label: '车辆在场数', value: '200', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>' },
      { label: '车辆离线数', value: '40', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' },
      { label: '车辆离场率', value: '74', unit: '%', color: '#3ddc84', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>' },
    ],
  },

  parkBuildings: [
    { id: 'sb1', name: '1号楼', x: 38, y: 32, w: 16, h: 26, focusRotateY: 10, focusRotateX: -11 },
    { id: 'sb2', name: '2号楼', x: 56, y: 28, w: 14, h: 22, focusRotateY: -12, focusRotateX: -12 },
    { id: 'sb3', name: '3号楼', x: 26, y: 44, w: 12, h: 18, focusRotateY: 18, focusRotateX: -10 },
    { id: 'sb4', name: '4号楼', x: 48, y: 48, w: 12, h: 16, focusRotateY: -6, focusRotateX: -10 },
    { id: 'sb5', name: '5号楼', x: 62, y: 42, w: 10, h: 14, focusRotateY: -18, focusRotateX: -9 },
  ],

  buildingDetails: {
    monitor: {
      sb1: { totalDevices: 120, label: '监控设备总数' },
      sb2: { totalDevices: 98, label: '监控设备总数' },
      sb3: { totalDevices: 86, label: '监控设备总数' },
      sb4: { totalDevices: 72, label: '监控设备总数' },
      sb5: { totalDevices: 65, label: '监控设备总数' },
    },
    access: {
      sb1: { totalDevices: 80, label: '闸机总数' },
      sb2: { totalDevices: 64, label: '闸机总数' },
      sb3: { totalDevices: 52, label: '闸机总数' },
      sb4: { totalDevices: 48, label: '闸机总数' },
      sb5: { totalDevices: 40, label: '闸机总数' },
    },
    parking: {
      sb1: { totalDevices: 80, label: '车闸总数' },
      sb2: { totalDevices: 60, label: '车闸总数' },
      sb3: { totalDevices: 48, label: '车闸总数' },
      sb4: { totalDevices: 36, label: '车闸总数' },
      sb5: { totalDevices: 24, label: '车闸总数' },
    },
  },

  buildingIdMap: {
    'p1-1': 'sb1', 'p1-2': 'sb2', 'p1-3': 'sb3', 'p1-4': 'sb4', 'p1-5': 'sb5',
  },

  sceneMarkers: {
    monitor: [
      { buildingId: 'sb1', line1: '延安东路', line2: '监控总数: 80' },
    ],
    access: [
      { buildingId: 'sb1', line1: '1号楼', line2: '闸机总数: 80' },
    ],
    parking: [
      { buildingId: 'sb1', line1: '1号楼', line2: '车闸总数: 80' },
    ],
  },

  floors: ['5F', '4F', '3F', '2F', '1F'],

  deviceLists: {
    monitor: {
      online: 6, offline: 3,
      items: [
        '监控#001', '监控#002', '监控#003', '监控#004', '监控#005',
        '监控#006', '监控#007', '监控#008', '监控#009', '监控#010',
        '监控#011', '监控#012', '监控#013',
      ],
    },
    access: {
      online: 6, offline: 3,
      items: [
        '人行闸机#001', '人行闸机#002', '人行闸机#003', '人行闸机#004', '人行闸机#005',
        '人行闸机#006', '人行闸机#007', '人行闸机#008', '人行闸机#009', '人行闸机#010',
        '人行闸机#011', '人行闸机#012', '人行闸机#013',
      ],
    },
    parking: {
      online: 6, offline: 3,
      items: [
        '车闸进口#001', '车闸出口#002', '车闸#003', '车闸#004', '车闸#005',
        '车闸#006', '车闸#007', '车闸#008', '车闸#009', '车闸#010',
      ],
    },
  },

  floorDevices: {
    monitor: {
      '2F': [
        { id: 'm1', code: 'BQ002', name: '监控#002', x: 28, y: 35, color: '#00e5ff' },
        { id: 'm2', code: 'SM001', name: '监控#001', x: 45, y: 42, color: '#00e5ff' },
        { id: 'm3', code: 'SM002', name: '监控#003', x: 62, y: 38, color: '#00e5ff' },
        { id: 'm4', code: 'JK002', name: '监控#004', x: 55, y: 58, color: '#00e5ff' },
      ],
      '1F': [
        { id: 'm5', code: 'JK001', name: '监控#005', x: 35, y: 45, color: '#00e5ff' },
        { id: 'm6', code: 'JK002', name: '监控#006', x: 58, y: 52, color: '#00e5ff' },
      ],
    },
    access: {
      '1F': [
        { id: 'a1', code: 'MJ001', name: '人行闸机#001', x: 42, y: 48, color: '#ff9500' },
        { id: 'a2', code: 'MJ002', name: '人行闸机#002', x: 58, y: 55, color: '#ff9500' },
      ],
      '2F': [
        { id: 'a3', code: 'MJ003', name: '人行闸机#003', x: 48, y: 40, color: '#ff9500' },
      ],
    },
  },

  parkGateMarkers: [
    { id: 'pg1', name: 'TCC001', x: 22, y: 68, color: '#ff9500' },
    { id: 'pg2', name: 'TCC002', x: 72, y: 72, color: '#ff9500' },
  ],

  gateDevices: {
    pg1: {
      id: 'pg1',
      code: 'TCC001进闸',
      name: '车闸进口#001',
      online: true,
      todayCount: 18,
      records: [
        { plate: '沪A123456', gate: '东门进口', time: '2025年9月26日 16:42:10' },
        { plate: '沪B888888', gate: '东门进口', time: '2025年9月26日 16:18:33' },
        { plate: '沪C556677', gate: '东门进口', time: '2025年9月26日 15:55:02' },
        { plate: '沪D990011', gate: '东门进口', time: '2025年9月26日 15:30:18' },
        { plate: '沪E223344', gate: '东门进口', time: '2025年9月26日 14:58:45' },
      ],
    },
    pg2: {
      id: 'pg2',
      code: 'TCC002进闸',
      name: '车闸出口#002',
      online: true,
      todayCount: 20,
      records: [
        { plate: '沪B888888', gate: '东门进口', time: '2025年9月26日 17:05:25' },
        { plate: '沪A667788', gate: '南门出口', time: '2025年9月26日 16:50:12' },
        { plate: '沪C112233', gate: '东门进口', time: '2025年9月26日 16:22:08' },
        { plate: '沪D445566', gate: '南门出口', time: '2025年9月26日 15:48:33' },
        { plate: '沪E778899', gate: '东门进口', time: '2025年9月26日 15:12:19' },
      ],
    },
  },

  devicePopups: {
    monitor: {
      JK002: {
        code: 'JK002',
        location: '延安东路300号1号楼',
        online: true,
        preview: true,
      },
    },
    access: {
      MJ002: {
        code: 'MJ002',
        online: true,
        stats: [
          { label: '当日截止当前通行总人数', value: '22' },
          { label: '当日截止当前通行总人次', value: '54' },
          { label: '当日截止当前通行考勤人员', value: '54' },
          { label: '当日截止当前通行访客人员数', value: '54' },
        ],
      },
    },
  },

  ledgerTemplates: {
    monitor: {
      ia: [
        { label: 'IA_集成分类', value: '监控分类' },
        { label: '协议类型', value: '厂家私有协议' },
        { label: '厂商', value: '海康威视' },
        { label: '对接方式', value: '设备网络SDK' },
        { label: 'IP地址', value: '192.123.12.21' },
        { label: '端口', value: '4001' },
        { label: '资产编号', value: 'A001' },
        { label: '资产名称', value: '监控A001' },
      ],
      fm: [
        { label: 'FM_维保电话', value: '13916430407' },
        { label: 'FM_维保单位', value: '上安' },
        { label: 'FM_保修期限', value: '2年' },
        { label: 'FM_应用日期', value: '2019.12' },
        { label: 'FM_安装日期', value: '2019.6' },
        { label: 'FM_产地', value: '浙江' },
        { label: 'FM_使用寿命', value: '8年' },
      ],
    },
    access: {
      ia: [
        { label: 'IA_集成分类', value: '门禁分类' },
        { label: '协议类型', value: '厂家私有协议' },
        { label: '厂商', value: '海康威视' },
        { label: '对接方式', value: '设备网络SDK' },
        { label: 'IP地址', value: '192.123.12.21' },
        { label: '端口', value: '4001' },
        { label: '门禁编号', value: 'A001' },
        { label: '门禁名称', value: '门禁A001' },
      ],
      fm: [
        { label: 'FM_维保电话', value: '13916430407' },
        { label: 'FM_维保单位', value: '上安' },
        { label: 'FM_保修期限', value: '2年' },
        { label: 'FM_启用日期', value: '2019.12' },
        { label: 'FM_安装日期', value: '2019.6' },
        { label: 'FM_产地', value: '浙江' },
        { label: 'FM_使用寿命', value: '8年' },
      ],
    },
    parking: {
      ia: [
        { label: 'IA_集成分类', value: '车辆设备' },
        { label: '协议类型', value: '厂家私有协议' },
        { label: '厂商', value: '海康威视' },
        { label: '对接方式', value: '设备网络SDK' },
        { label: 'IP地址', value: '192.123.12.21' },
        { label: '端口', value: '4001' },
        { label: '闸机编号', value: 'A001' },
        { label: '闸机名称', value: '闸机A001' },
      ],
      fm: [
        { label: 'FM_维保电话', value: '13816430407' },
        { label: 'FM_维保单位', value: '上安' },
        { label: 'FM_保修期限', value: '2年' },
        { label: 'FM_启用日期', value: '2019.12' },
        { label: 'FM_安装日期', value: '2019.6' },
        { label: 'FM_产地', value: '浙江' },
        { label: 'FM_使用寿命', value: '8年' },
      ],
    },
  },

  monitorSpaceDistribution: {
    categories: ['办公空间', '公共空间', '设备空间', '研发生产'],
    values: [85, 62, 48, 35],
  },

  monitorFaultTop10: {
    items: [
      { name: '监控#010', value: 28 },
      { name: '监控#009', value: 24 },
      { name: '监控#008', value: 21 },
      { name: '监控#007', value: 18 },
      { name: '监控#006', value: 16 },
      { name: '监控#005', value: 14 },
      { name: '监控#004', value: 12 },
      { name: '监控#003', value: 10 },
      { name: '监控#002', value: 8 },
      { name: '监控#001', value: 6 },
    ],
  },

  accessPersonRatio: {
    total: 1842,
    items: [
      { name: '内部员工', value: 1256, color: '#075682' },
      { name: '访客', value: 586, color: '#00e5ff' },
    ],
  },

  accessPassStats: {
    today: 1234,
    rate: 98.4,
    days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    values: [180, 210, 195, 230, 205, 120, 94],
  },

  parkingVehicleType: {
    total: 456,
    items: [
      { name: '内部车辆', value: 320, color: '#075682' },
      { name: '临时车辆', value: 136, color: '#00e5ff' },
    ],
  },
};
