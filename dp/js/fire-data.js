const FIRE_DATA = {
  subSystems: [
    { id: 'event', label: '事件中心', count: 12, icon: 'event' },
    { id: 'alarm', label: '火灾自动报警系统', count: 12, icon: 'alarm' },
    { id: 'smoke', label: '防排烟系统', count: 32, icon: 'smoke' },
    { id: 'sprinkler', label: '自动喷水灭火系统', count: 2, icon: 'sprinkler' },
    { id: 'hydrant', label: '室内消火栓系统', count: 4, icon: 'hydrant' },
  ],

  safetyLevel: {
    grade: '优',
    radar: {
      indicators: [
        { name: '消防设施', max: 100 },
        { name: '安全管理', max: 100 },
        { name: '维护保养', max: 100 },
        { name: '救援力量', max: 100 },
      ],
      values: [88, 92, 85, 80],
    },
    systems: [
      { name: '火灾自动报警系统', grade: '优' },
      { name: '防排烟系统', grade: '优' },
      { name: '自动喷水灭火系统', grade: '良' },
      { name: '室内消火栓系统', grade: '优' },
    ],
  },

  eventKpi: [
    { label: '消防设备总数', value: '248', unit: '个', color: '#ffffff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>' },
    { label: '消防设备在线数', value: '200', unit: '个', color: '#00e5ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
    { label: '消防设备离线数', value: '48', unit: '个', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' },
    { label: '事件未处理数', value: '5', unit: '条', color: '#ff4757', alert: true, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
  ],

  systemKpis: {
    alarm: [
      { label: '主机总数', value: '248', unit: '个', color: '#ffffff' },
      { label: '正常报警主机总计', value: '248', unit: '个', color: '#00e5ff' },
      { label: '离线报警主机总计', value: '248', unit: '个', color: '#ff9500' },
    ],
    smoke: [
      { label: '防排烟设备总数', value: '248', unit: '个', color: '#ffffff' },
      { label: '防排烟设备在线数', value: '200', unit: '个', color: '#00e5ff' },
      { label: '防排烟设备离线数', value: '48', unit: '个', color: '#ff9500' },
      { label: '报警数', value: '5', unit: '条', color: '#ff4757', alert: true },
    ],
    sprinkler: [
      { label: '喷水灭火设备总数', value: '248', unit: '个', color: '#ffffff' },
      { label: '喷水灭火设备在线数', value: '200', unit: '个', color: '#00e5ff' },
      { label: '喷水灭火设备离线数', value: '48', unit: '个', color: '#ff9500' },
      { label: '报警数', value: '5', unit: '条', color: '#ff4757', alert: true },
    ],
    hydrant: [
      { label: '消火栓设备总数', value: '248', unit: '个', color: '#ffffff' },
      { label: '消火栓设备在线数', value: '200', unit: '个', color: '#00e5ff' },
      { label: '消火栓设备离线数', value: '48', unit: '个', color: '#ff9500' },
      { label: '报警数', value: '5', unit: '条', color: '#ff4757', alert: true },
    ],
  },

  parkBuildings: [
    { id: 'fb1', name: '1号楼', x: 38, y: 32, w: 16, h: 26, focusRotateY: 10, focusRotateX: -11, score: 78, eventRate: 70 },
    { id: 'fb2', name: '2号楼', x: 56, y: 28, w: 14, h: 22, focusRotateY: -12, focusRotateX: -12, score: 75, eventRate: 68 },
    { id: 'fb3', name: '3号楼', x: 26, y: 44, w: 12, h: 18, focusRotateY: 18, focusRotateX: -10, score: 72, eventRate: 65 },
    { id: 'fb4', name: '4号楼', x: 48, y: 48, w: 12, h: 16, focusRotateY: -6, focusRotateX: -10, score: 70, eventRate: 62 },
    { id: 'fb5', name: '5号楼', x: 62, y: 42, w: 10, h: 14, focusRotateY: -18, focusRotateX: -9, score: 68, eventRate: 60 },
  ],

  buildingDetails: {
    fb1: { totalEvents: 40, totalDevices: 120, processed: 35, pending: 5, inProgress: 5 },
    fb2: { totalEvents: 32, totalDevices: 98, processed: 28, pending: 4, inProgress: 4 },
    fb3: { totalEvents: 28, totalDevices: 86, processed: 24, pending: 4, inProgress: 3 },
    fb4: { totalEvents: 22, totalDevices: 72, processed: 19, pending: 3, inProgress: 2 },
    fb5: { totalEvents: 18, totalDevices: 65, processed: 15, pending: 3, inProgress: 2 },
  },

  buildingIdMap: {
    'p1-1': 'fb1', 'p1-2': 'fb2', 'p1-3': 'fb3', 'p1-4': 'fb4', 'p1-5': 'fb5',
    'p1-6': 'fb5', 'p1-7': 'fb4',
  },

  floors: ['1F', '2F', '3F', '4F', '5F'],

  floorDevices: {
    '1F': [
      { id: 'd1', name: '烟感', x: 22, y: 30, type: 'alarm', color: '#ff4757' },
      { id: 'd2', name: '手报', x: 45, y: 25, type: 'alarm', color: '#ff4757' },
      { id: 'd3', name: '消火栓', x: 68, y: 40, type: 'hydrant', color: '#3ddc84' },
      { id: 'd4', name: '排烟', x: 35, y: 55, type: 'smoke', color: '#ff9500' },
      { id: 'd5', name: '喷淋', x: 55, y: 60, type: 'sprinkler', color: '#7b68ee' },
      { id: 'd6', name: '监控', x: 78, y: 28, type: 'monitor', color: '#00e5ff' },
    ],
    '2F': [
      { id: 'd7', name: '烟感', x: 30, y: 35, type: 'alarm', color: '#ff4757' },
      { id: 'd8', name: '消火栓', x: 60, y: 45, type: 'hydrant', color: '#3ddc84' },
      { id: 'd9', name: '排烟', x: 42, y: 62, type: 'smoke', color: '#ff9500' },
    ],
    '3F': [
      { id: 'd10', name: '烟感', x: 28, y: 38, type: 'alarm', color: '#ff4757' },
      { id: 'd11', name: '手报', x: 52, y: 32, type: 'alarm', color: '#ff4757' },
      { id: 'd12', name: '喷淋', x: 70, y: 50, type: 'sprinkler', color: '#7b68ee' },
    ],
    '4F': [
      { id: 'd13', name: '烟感', x: 40, y: 42, type: 'alarm', color: '#ff4757' },
      { id: 'd14', name: '消火栓', x: 65, y: 55, type: 'hydrant', color: '#3ddc84' },
    ],
    '5F': [
      { id: 'd15', name: '烟感', x: 35, y: 40, type: 'alarm', color: '#ff4757' },
      { id: 'd16', name: '排烟', x: 58, y: 48, type: 'smoke', color: '#ff9500' },
    ],
  },

  deviceLists: {
    alarm: {
      online: 6, offline: 3,
      items: [
        '火灾报警设备#001', '火灾报警设备#002', '火灾报警设备#003', '火灾报警设备#004',
        '火灾报警设备#005', '火灾报警设备#006', '火灾报警设备#007', '火灾报警设备#008',
        '火灾报警设备#009', '火灾报警设备#010',
      ],
    },
    smoke: {
      online: 6, offline: 3,
      items: [
        '烟感设备#001', '烟感设备#002', '烟感设备#003', '烟感设备#004',
        '烟感设备#005', '烟感设备#006', '烟感设备#007', '烟感设备#008', '烟感设备#009',
      ],
    },
    sprinkler: {
      online: 6, offline: 3,
      items: [
        '消防水泵设备#001', '消防水泵设备#002', '压力传感器#003', '压力传感器#004',
        '压力传感器#005', '压力传感器#006', '压力传感器#007', '压力传感器#008',
      ],
    },
    hydrant: {
      online: 0, offline: 3,
      items: [
        '消防水泵控制柜#001', '压力传感器#003', '压力传感器#004', '压力传感器#005',
        '压力传感器#006', '压力传感器#007', '压力传感器#008', '压力传感器#009',
      ],
    },
  },

  systemPanels: {
    alarm: {
      safetyLabel: '火灾自动报警系统',
      grade: '优',
      deviceTotal: 248,
      deviceNormal: 200,
      deviceAbnormal: 48,
      showConnection: true,
    },
    smoke: {
      safetyLabel: '防排烟系统',
      grade: '优',
      abnormalRate: 100,
      abnormalNormal: 0,
      abnormalCount: 1620,
      offlineRate: 100,
      offlineOnline: 0,
      offlineCount: 1620,
    },
    sprinkler: {
      safetyLabel: '自动喷水灭火系统',
      grade: '优',
      abnormalRate: 100,
      abnormalNormal: 0,
      abnormalCount: 1620,
      offlineRate: 100,
      offlineOnline: 0,
      offlineCount: 1620,
    },
    hydrant: {
      safetyLabel: '室内消火栓系统',
      grade: '优',
      abnormalRate: 100,
      abnormalNormal: 0,
      abnormalCount: 1620,
      offlineRate: 100,
      offlineOnline: 0,
      offlineCount: 1620,
    },
  },

  monthlyAlarmFault: {
    days: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
    alarms: [1, 1, 2, 1, 2, 1, 2, 2, 3, 2, 4, 2, 3, 2, 2, 3, 2, 2, 3, 2, 4, 3, 2, 2, 3, 2, 2, 1, 2, 2],
    faults: [0, 1, 1, 0, 1, 2, 1, 1, 2, 3, 2, 1, 2, 1, 1, 2, 1, 0, 1, 2, 2, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  },

  sceneMarkers: {
    event: [
      { buildingId: 'fb1', line1: '1号楼', line2: '事件处理率 70%' },
    ],
    alarm: [
      { buildingId: 'fb1', line1: '1号楼', line2: '78分' },
    ],
    smoke: [
      { buildingId: 'fb1', line1: '1号楼', line2: '78分' },
    ],
    sprinkler: [
      { buildingId: 'fb1', line1: '1号楼', line2: '78分' },
    ],
    hydrant: [
      { buildingId: 'fb1', line1: '1号楼', line2: '70分' },
    ],
  },
};
