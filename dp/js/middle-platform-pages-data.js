/* 中台扩展页面 — 数据与页面注册 */

function mpFireBindRows(prefix, nameField, count = 9) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const building = n <= 5 ? 'A栋1楼大厅' : 'B栋2楼大厅';
    const id = `C${String(n).padStart(3, '0')}`;
    return {
      index: n,
      spaceCode: `YC-40.50.43-${String(n).padStart(4, '0')}`,
      spaceLocation: building,
      deviceCode: 'GC043-0001-001F-YC-10.20.09...',
      deviceName: `消防${n}`,
      equipName: `${id}-${building}消防${n}`,
      equipId: id,
      bindStatus: n <= 5 ? '已绑定' : '未绑定',
      nameField,
    };
  });
}

function mpFireStatusRows(namePrefix, count = 10) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const building = n <= 5 ? 'A栋1楼大厅' : 'B栋2楼大厅';
    const id = `C${String(n).padStart(3, '0')}`;
    const normal = n % 2 === 1;
    return {
      index: n,
      location: building,
      equipName: `${id}-${building}消防${n}`,
      equipId: id,
      deviceType: '',
      locationDesc: '',
      deviceStatus: normal ? '正常' : '异常',
      connStatus: normal ? '正常' : '断开',
      onlineStatus: normal ? '在线' : '离线',
      uploadTime: '2025-11-09 12:13:45',
      namePrefix,
    };
  });
}

const MP_FIRE_TREND = {
  modeOptions: ['today', 'yesterday', 'week7', 'week30'],
  hours: Array.from({ length: 24 }, (_, i) => String(i)),
  today: [120, 230, 180, 100, 150, 200, 225, 180, 120, 225, 200, 180, 225, 190, 160, 130, 100, 225, 200, 225, 190, 160, 140, 110],
  yesterday: [110, 200, 170, 90, 140, 190, 210, 170, 110, 210, 190, 170, 210, 180, 150, 120, 90, 210, 190, 210, 180, 150, 130, 100],
  week7: { labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], data: [1850, 1920, 1780, 1950, 1880, 1200, 980] },
  week30: { labels: Array.from({ length: 30 }, (_, i) => `${i + 1}日`), data: [180, 195, 210, 188, 175, 192, 205, 198, 185, 190, 200, 188, 195, 210, 205, 198, 185, 192, 200, 188, 195, 210, 205, 198, 185, 190, 200, 188, 195, 210] },
};

const MP_FIRE_TOP5 = {
  rows: [
    { rank: 1, location: '1号楼', deviceName: '0-0-2184258通用', count: 100, unit: '次' },
    { rank: 2, location: '2号楼', deviceName: '1-9-183感烟火灾探测器', count: 80, unit: '次' },
    { rank: 3, location: '3号楼', deviceName: '0-0-2184258通用', count: 70, unit: '次' },
    { rank: 4, location: '4号楼', deviceName: '1-9-183感烟火灾探测器', count: 50, unit: '次' },
    { rank: 5, location: '5号楼', deviceName: '1-9-183感烟火灾探测器', count: 20, unit: '次' },
  ],
};

const MP_PAGE_DATA = {
  fireHazardStats: {
    pending: 67, processed: '999+',
    levelDonut: { items: [
      { name: '一级隐患', count: 100, color: '#1890ff' },
      { name: '二级隐患', count: 150, color: '#52c41a' },
      { name: '三级隐患', count: 157, color: '#13c2c2' },
    ]},
    processDonut: { items: [
      { name: '未处理', count: 100, color: '#1890ff' },
      { name: '整改中', count: 150, color: '#69c0ff' },
      { name: '误报', count: 197, color: '#faad14' },
      { name: '测试', count: 110, color: '#fa8c16' },
      { name: '完成整改', count: 110, color: '#52c41a' },
      { name: '复位', count: 131, color: '#ff4d4f' },
    ]},
    top5Table: MP_FIRE_TOP5,
    trend: MP_FIRE_TREND,
    statsLabel: '一级隐患', trendTitle: '一级隐患趋势图', top5Title: '一级隐患频报点位',
  },

  fireHazardList: {
    summary: [
      { label: '故障总数（个）', value: 200, icon: 'fault', color: '#1890ff' },
      { label: '待处理故障数（个）', value: 100, icon: 'faultWarn', color: '#ff4d4f' },
      { label: '已处理故障数（个）', value: 20, icon: 'plug', color: '#52c41a' },
    ],
    levelFilterDefault: '一级隐患',
    levelOptions: ['一级隐患', '二级隐患', '三级隐患'],
    statusOptions: ['未处理', '整改中', '完成整改', '误报', '测试', '复位'],
    table: {
      columns: ['序号', '设备名称', '设备类型', '所属系统', '位置描述', '隐患等级', '隐患描述', '隐患类型', '流程状态', '处理说明', '开始时间', '结束时间'],
      rows: [
        { index: 1, deviceName: '1号楼101探测器', deviceType: '火灾自动报警系统', system: '0-0-9ec31d', location: '1号楼101西侧', level: '一级隐患', description: '通道堆放杂物', type: '日常巡检', status: '未处理', note: '待整改', startTime: '2025-06-26 14:33:22', endTime: '—' },
        { index: 2, deviceName: '2号楼感烟探测器', deviceType: '火灾自动报警系统', system: '0-0-9ec32a', location: '2号楼201室', level: '二级隐患', description: '指示灯故障', type: '设备巡检', status: '整改中', note: '处理中', startTime: '2025-06-25 10:20:00', endTime: '—' },
        { index: 3, deviceName: '3号楼手动按钮', deviceType: '火灾自动报警系统', system: '0-0-9ec33b', location: '3号楼1层大厅', level: '三级隐患', description: '按钮罩损坏', type: '日常巡检', status: '完成整改', note: '已闭环', startTime: '2025-06-24 09:15:00', endTime: '2025-06-25 16:00:00' },
        { index: 4, deviceName: '4号楼排烟阀', deviceType: '防排烟系统', system: '0-0-9ec34c', location: '4号楼机房', level: '一级隐患', description: '阀体锈蚀', type: '专项排查', status: '误报', note: '复核误报', startTime: '2025-06-23 11:30:00', endTime: '2025-06-23 12:00:00' },
        { index: 5, deviceName: '5号楼喷淋头', deviceType: '自动喷水灭火系统', system: '0-0-9ec35d', location: '5号楼走廊', level: '二级隐患', description: '喷头遮挡', type: '日常巡检', status: '测试', note: '测试记录', startTime: '2025-06-22 08:45:00', endTime: '2025-06-22 09:00:00' },
        { index: 6, deviceName: '6号楼消火栓', deviceType: '室内消火栓系统', system: '0-0-9ec36e', location: '6号楼楼梯间', level: '三级隐患', description: '箱门未关', type: '日常巡检', status: '复位', note: '已复位', startTime: '2025-06-21 15:20:00', endTime: '2025-06-21 15:25:00' },
        { index: 7, deviceName: '1号楼102探测器', deviceType: '火灾自动报警系统', system: '0-0-9ec31d', location: '1号楼102东侧', level: '一级隐患', description: '探测器积尘', type: '日常巡检', status: '未处理', note: '待处理', startTime: '2025-06-20 13:10:00', endTime: '—' },
        { index: 8, deviceName: '2号楼排烟风机', deviceType: '防排烟系统', system: '0-0-9ec32a', location: '2号楼屋面', level: '二级隐患', description: '振动异常', type: '设备巡检', status: '整改中', note: '维修中', startTime: '2025-06-19 10:00:00', endTime: '—' },
        { index: 9, deviceName: '3号楼应急灯', deviceType: '应急照明系统', system: '0-0-9ec33b', location: '3号楼疏散通道', level: '三级隐患', description: '灯具失效', type: '日常巡检', status: '完成整改', note: '已更换', startTime: '2025-06-18 14:00:00', endTime: '2025-06-19 11:00:00' },
        { index: 10, deviceName: '4号楼温感探测器', deviceType: '火灾自动报警系统', system: '0-0-9ec34c', location: '4号楼仓库', level: '一级隐患', description: '温度异常', type: '自动上报', status: '未处理', note: '待核实', startTime: '2025-06-17 16:30:00', endTime: '—' },
      ],
      total: 200,
    },
  },

  fireAlarmSysDevice: {
    overviewTitle: '生成数据概览',
    summary: [
      { label: '火灾自动报警设备总数', value: 300, icon: 'smile', color: '#52c41a' },
      { label: '火灾自动报警设备已绑定数', value: 200, icon: 'database', color: '#1890ff' },
      { label: '火灾自动报警设备未绑定数', value: 100, icon: 'warning', color: '#fa8c16' },
    ],
    equipNameCol: '火灾自动报警设备名称',
    equipIdCol: '火灾自动报警设备编号',
    rows: mpFireBindRows('alarm'),
    total: 102,
  },

  fireAlarmSysStatus: {
    summary: [
      { label: '报警主机总数', value: 200, icon: 'database', color: '#1890ff' },
      { label: '正常报警主机总计', value: 200, icon: 'wifi', color: '#1890ff' },
      { label: '离线报警主机总计', value: 0, icon: 'wifiOff', color: '#69c0ff' },
    ],
    statusMode: 'conn',
    equipNameCol: '火灾自动报警设备名称',
    equipIdCol: '火灾自动报警设备编号',
    timeCol: '最后上传时间',
    rows: mpFireStatusRows('alarm'),
    total: 102,
  },

  fireSmokeDevice: {
    summary: [
      { label: '防排烟设备总数', value: 200, icon: 'database', color: '#1890ff' },
      { label: '防排烟设备已绑定数', value: 200, icon: 'wifi', color: '#1890ff' },
      { label: '防排烟设备未绑定数', value: 200, icon: 'wifiOff', color: '#69c0ff' },
    ],
    equipNameCol: '防排烟设备名称',
    equipIdCol: '防排烟设备编号',
    rows: mpFireBindRows('smoke'),
    total: 102,
  },

  fireSmokeStatus: {
    summary: [
      { label: '防排烟设备总数', value: 200, icon: 'database', color: '#1890ff' },
      { label: '防排烟设备在线数', value: 200, icon: 'wifi', color: '#1890ff' },
      { label: '防排烟设备离线数', value: 0, icon: 'wifiOff', color: '#bfbfbf' },
      { label: '防排烟设备在线率', value: '100%', icon: 'wifi', color: '#1890ff' },
    ],
    statusMode: 'device',
    equipNameCol: '防排烟设备名称',
    equipIdCol: '防排烟设备编号',
    timeCol: '上传时间',
    rows: mpFireStatusRows('smoke'),
    total: 102,
  },

  fireSprinklerDevice: {
    summary: [
      { label: '自动喷水灭火设备总数', value: 200, icon: 'database', color: '#1890ff' },
      { label: '自动喷水灭火设备已绑定数', value: 200, icon: 'wifi', color: '#1890ff' },
      { label: '自动喷水灭火设备未绑定数', value: 200, icon: 'wifiOff', color: '#69c0ff' },
    ],
    equipNameCol: '自动喷水灭火设备名称',
    equipIdCol: '自动喷水灭火设备编号',
    rows: mpFireBindRows('sprinkler'),
    total: 102,
  },

  fireSprinklerStatus: {
    summary: [
      { label: '喷水灭火设备总数', value: 200, icon: 'database', color: '#1890ff' },
      { label: '喷水灭火设备在线数', value: 200, icon: 'wifi', color: '#1890ff' },
      { label: '喷水灭火设备离线数', value: 0, icon: 'wifiOff', color: '#bfbfbf' },
      { label: '喷水灭火设备在线率', value: '100%', icon: 'wifi', color: '#1890ff' },
    ],
    statusMode: 'device',
    equipNameCol: '自动喷水灭火设备名称',
    equipIdCol: '自动喷水灭火设备编号',
    timeCol: '上传时间',
    rows: mpFireStatusRows('sprinkler'),
    total: 102,
  },

  fireHydrantDevice: {
    summary: [
      { label: '室内消火栓设备总数', value: 200, icon: 'database', color: '#1890ff' },
      { label: '室内消火栓设备已绑定数', value: 200, icon: 'wifi', color: '#1890ff' },
      { label: '室内消火栓设备未绑定数', value: 200, icon: 'wifiOff', color: '#69c0ff' },
    ],
    equipNameCol: '室内消火栓设备名称',
    equipIdCol: '室内消火栓设备编号',
    rows: mpFireBindRows('hydrant'),
    total: 102,
  },

  fireHydrantStatus: {
    summary: [
      { label: '消火栓设备总数', value: 200, icon: 'database', color: '#1890ff' },
      { label: '消火栓设备在线数', value: 200, icon: 'wifi', color: '#1890ff' },
      { label: '消火栓设备离线数', value: 0, icon: 'wifiOff', color: '#bfbfbf' },
      { label: '消火栓设备在线率', value: '100%', icon: 'wifi', color: '#1890ff' },
    ],
    statusMode: 'device',
    equipNameCol: '室内消火栓设备名称',
    equipIdCol: '室内消火栓设备编号',
    timeCol: '上传时间',
    rows: mpFireStatusRows('hydrant'),
    total: 102,
  },

  personnelMgmt: {
    totalPersonnel: 18921,
    trendMonths: ['1月', '2月', '3月', '4月', '5月'],
    tabs: {
      dept: {
        donut: [
          { name: '综合处', count: 100, color: '#2b59a2' },
          { name: '秘书处', count: 150, color: '#5eb9d6' },
          { name: '督查处', count: 114, color: '#56b3b4' },
          { name: '宣传处', count: 147, color: '#f1b946' },
          { name: '会计处', count: 114, color: '#8c8c8c' },
        ],
        trendSeries: [
          { name: '综合处', color: '#2b59a2', data: [100, 140, 230, 100, 130] },
          { name: '秘书处', color: '#5eb9d6', data: [134, 212, 144, 185, 126] },
          { name: '督查处', color: '#72b260', data: [210, 129, 196, 198, 136] },
          { name: '宣传处', color: '#e88f45', data: [133, 229, 132, 200, 211] },
          { name: '会计处', color: '#f1b946', data: [163, 199, 226, 199, 187] },
        ],
      },
      nature: {
        donut: [
          { name: '本区公务员(含参公)', count: 100, color: '#1890ff' },
          { name: '本区区属集团', count: 150, color: '#69c0ff' },
          { name: '本区事业单位编制人员', count: 114, color: '#52c41a' },
          { name: '借调人员、储备人才(有组织部、人社局出具的相关文件)', count: 147, color: '#faad14' },
          { name: '其他人员(含退休返聘)', count: 114, color: '#fa8c16' },
          { name: '后勤保障人员', count: 192, color: '#ff4d4f' },
        ],
        trendSeries: [
          { name: '本区公务员(含参公)', color: '#1890ff', data: [180, 220, 310, 280, 260] },
          { name: '本区区属集团', color: '#69c0ff', data: [150, 190, 270, 250, 230] },
          { name: '本区事业单位编制人员', color: '#52c41a', data: [120, 160, 240, 220, 200] },
          { name: '借调人员、储备人才(有组织部、人社局出具的相关文件)', color: '#faad14', data: [140, 180, 260, 240, 210] },
          { name: '其他人员(含退休返聘)', color: '#fa8c16', data: [130, 170, 250, 230, 205] },
          { name: '后勤保障人员', color: '#ff4d4f', data: [225, 151, 137, 219, 193] },
        ],
        trendYMax: 1200,
      },
      cert: {
        donut: [
          { name: '出入证', count: 100, color: '#1890ff' },
          { name: '临时出入证', count: 150, color: '#13c2c2' },
        ],
        trendSeries: [
          { name: '出入证', color: '#1890ff', data: [100, 140, 230, 100, 130] },
          { name: '临时出入证', color: '#13c2c2', data: [134, 212, 144, 185, 126] },
        ],
        trendYMax: 400,
      },
    },
    certTotal: 12358,
    certByPeriod: {
      month: {
        total: 856,
        certDeptPie: [
          { name: '单位1', count: 12, color: '#1890ff' },
          { name: '单位2', count: 10, color: '#13c2c2' },
          { name: '单位3', count: 8, color: '#52c41a' },
          { name: '单位4', count: 6, color: '#faad14' },
          { name: '单位5', count: 4, color: '#fa8c16' },
        ],
        certTypePie: [
          { name: '新办', count: 18, color: '#1890ff' },
          { name: '调动', count: 12, color: '#13c2c2' },
          { name: '注销', count: 8, color: '#52c41a' },
          { name: '其他', count: 5, color: '#faad14' },
        ],
      },
      quarter: {
        total: 12358,
        certDeptPie: [
          { name: '单位1', count: 30, color: '#1890ff' },
          { name: '单位2', count: 25, color: '#13c2c2' },
          { name: '单位3', count: 20, color: '#52c41a' },
          { name: '单位4', count: 15, color: '#faad14' },
          { name: '单位5', count: 10, color: '#fa8c16' },
        ],
        certTypePie: [
          { name: '新办', count: 40, color: '#1890ff' },
          { name: '调动', count: 30, color: '#13c2c2' },
          { name: '注销', count: 20, color: '#52c41a' },
          { name: '其他', count: 10, color: '#faad14' },
        ],
      },
      year: {
        total: 48620,
        certDeptPie: [
          { name: '单位1', count: 120, color: '#1890ff' },
          { name: '单位2', count: 98, color: '#13c2c2' },
          { name: '单位3', count: 85, color: '#52c41a' },
          { name: '单位4', count: 72, color: '#faad14' },
          { name: '单位5', count: 60, color: '#fa8c16' },
        ],
        certTypePie: [
          { name: '新办', count: 156, color: '#1890ff' },
          { name: '调动', count: 118, color: '#13c2c2' },
          { name: '注销', count: 86, color: '#52c41a' },
          { name: '其他', count: 42, color: '#faad14' },
        ],
      },
    },
    certDeptPie: [
      { name: '单位1', count: 30, color: '#1890ff' },
      { name: '单位2', count: 25, color: '#13c2c2' },
      { name: '单位3', count: 20, color: '#52c41a' },
      { name: '单位4', count: 15, color: '#faad14' },
      { name: '单位5', count: 10, color: '#fa8c16' },
    ],
    certTypePie: [
      { name: '新办', count: 40, color: '#1890ff' },
      { name: '调动', count: 30, color: '#13c2c2' },
      { name: '注销', count: 20, color: '#52c41a' },
      { name: '其他', count: 10, color: '#faad14' },
    ],
  },

  energyReport: {
    energyType: 'electric',
    tree: [{
      id: 'b8', name: '分子医学楼8#', count: 30, offline: 0, expanded: true,
      children: [{
        id: 'b8-3f', name: '3F', count: 23, offline: 0, expanded: true,
        children: [
          { id: 'r8316', name: '8316室', count: 1, expanded: true, children: [{ id: 'm8316', name: '乙8316#', count: 1, isDevice: true }] },
          { id: 'r8329', name: '8329室', count: 1, expanded: false, children: [{ id: 'm8329', name: '乙8329#', count: 1, isDevice: true }] },
          { id: 'r8330', name: '8330室', count: 1, expanded: false, children: [{ id: 'm8330', name: '乙8330#', count: 1, isDevice: true }] },
        ],
      }],
    }],
    table: {
      columns: ['序号', '空间位置', '电表名称', '电量-表底值', '尖电量-表底值', '峰电量-表底值', '平电量-表底值', '谷电量-表底值'],
      rows: Array.from({ length: 10 }, (_, i) => ({
        index: i + 1,
        location: '分子医学楼8#/B1F/配...',
        meterName: ['乙70#表', '甲61#', '双8326#', '乙8303#', '甲8301#'][i % 5],
        base: 0, peak: 0, high: 0, flat: 0, valley: 0,
      })),
      total: 30,
    },
  },

  energyOverview: {
    electricity: { today: '0.00', month: '0.00', unit: 'kWh' },
    water: { today: '0.00', month: '0.00', unit: 't' },
    ratioItems: [
      { name: '甲甲路-总表', value: 0, percent: 0, color: '#1890ff' },
      { name: '乙乙路总表', value: 0, percent: 0, color: '#52c41a' },
    ],
    level1Meters: 2,
    rankTop10: [
      { name: '甲甲路-总表', value: '0.00kWh' },
      { name: '乙乙路总表', value: '0.00kWh' },
    ],
    compareRows: [{ name: '上海生物芯片智慧园区', value: '0.00 kWh', vsYesterday: '0.00%', vsLastYear: '0.00%' }],
    calendarMonth: '2026年5月',
    calendarDay: 19,
    dailyTotal: '0.00', monthlyTotal: '0.00',
  },

  energyFlow: {
    sankey: {
      nodes: [
        { name: '15#进线总表' }, { name: '17#进线总表' },
        { name: '15#-15#空调总表' }, { name: '15#-5F-空调1号表' }, { name: '15#-5F-空调2号表' },
        { name: '17#-5F-空调总表' }, { name: '17#-5F-空调1号表' },
        { name: '15号楼一楼食堂' }, { name: '17#-1F-插座' },
      ],
      links: [
        { source: '15#进线总表', target: '15#-15#空调总表', value: 40 },
        { source: '15#-15#空调总表', target: '15#-5F-空调1号表', value: 20 },
        { source: '15#-15#空调总表', target: '15#-5F-空调2号表', value: 20 },
        { source: '17#进线总表', target: '17#-5F-空调总表', value: 35 },
        { source: '17#进线总表', target: '15号楼一楼食堂', value: 25 },
        { source: '17#进线总表', target: '17#-1F-插座', value: 20 },
        { source: '17#-5F-空调总表', target: '17#-5F-空调1号表', value: 35 },
      ],
    },
  },

  energyCabinet: {
    summary: [
      { label: '电柜总数(个)', value: 363, icon: 'forbidden', color: '#ff4d4f' },
      { label: '仪表总数', value: 2, icon: 'trendUp', color: '#1890ff' },
      { label: '待绑定电柜数(个)', value: 0, icon: 'building', color: '#1890ff' },
      { label: '已绑定电柜数(个)', value: 363, icon: 'building', color: '#1890ff' },
    ],
    table: {
      columns: ['序号', '空间位置', '空间编码', '空间类型', '设备编码', '设备名称', '电柜编号', '电柜名称', '电表总数', '绑定状态'],
      rows: [
        { index: 1, location: '研发实验楼5#/3F', spaceCode: '003F', spaceType: '', deviceCode: 'YC-30.50.18-033101', deviceName: '测试外来刷新新增同步033101', cabinetId: '091901', cabinetName: '测试外来刷新新增同步033101', meterCount: 0, bindStatus: '已绑定' },
        { index: 2, location: '研发实验楼5#/3F', spaceCode: '003F', spaceType: '', deviceCode: 'SWXP-0003-003F-YC-30.50.17-00034', deviceName: '控制柜-DCF-C', cabinetId: '091902', cabinetName: '控制柜-DCF-C', meterCount: 0, bindStatus: '已绑定' },
      ],
      total: 363,
    },
  },

  energyMeter: {
    summary: [
      { label: '电表总数(个)', value: 363, icon: 'forbidden', color: '#ff4d4f' },
      { label: '仪表总数', value: 211, icon: 'trendUp', color: '#1890ff' },
      { label: '仪表在线数(个)', value: 211, icon: 'inventory', color: '#1890ff' },
      { label: '仪表离线数(个)', value: 0, icon: 'inventory', color: '#1890ff' },
    ],
    table: {
      columns: ['序号', '建筑名称', '能耗类型', '电表编号', '电表名称', '电表类型', '电表编号', '电表名称', '电表流水号', '倍率', '条码', '监测状态', '绑定状态'],
      rows: [
        { index: 1, building: '乙栋', energyType: '机房用电', meterCode: 'AA42', meterName: '08-PB-7', meterType: '机械抄表', meterNo: '70#表', meterFullName: '乙70#表', serial: '99999999', ratio: '80.0000', barcode: '3P-400A', monitorStatus: '正常', bindStatus: '未绑定' },
        { index: 2, building: '甲栋', energyType: '冰箱间用电', meterCode: 'AA32', meterName: '08-PB-2', meterType: '电子抄表', meterNo: '61#', meterFullName: '甲61#', serial: '99999999', ratio: '50.0000', barcode: '0000', monitorStatus: '正常', bindStatus: '未绑定' },
        { index: 3, building: '乙栋', energyType: '办公用电', meterCode: 'AA43', meterName: '08-PB-8', meterType: '电子抄表', meterNo: '8303#', meterFullName: '乙8303#', serial: '99999999', ratio: '1.0000', barcode: '0000', monitorStatus: '正常', bindStatus: '未绑定' },
      ],
      total: 363,
    },
  },

  energyMeterData: {
    summary: [
      { label: '电表总数', value: 180, icon: 'refresh', color: '#faad14' },
      { label: '电表在线数 (个)', value: 121, icon: 'wifi', color: '#722ed1' },
      { label: '电表离线数 (个)', value: 59, icon: 'wifiOff', color: '#52c41a' },
      { label: '在线率', value: '67.22%', icon: 'trendUp', color: '#1890ff' },
    ],
    table: {
      columns: ['序号', '电表名称', '安装位置', '能耗类型', '电表状态', '操作'],
      rows: [
        { index: 1, name: '1-AL-B1-1-1', location: '1F强电间', type: '生活用电', status: '在线' },
        { index: 2, name: '1-AL-B1-1-2', location: '1F强电间', type: '物业用电', status: '离线' },
        { index: 3, name: '1-AL-B1-1-3', location: '1F强电间', type: '总用电', status: '在线' },
        { index: 4, name: '1-AL-B1-1-2', location: '1F强电间', type: '生活用电', status: '在线' },
        { index: 5, name: '1-AL-B1-1-2', location: '1F强电间', type: '物业用电', status: '离线' },
        { index: 6, name: '1-AL-B1-1-2', location: '1F强电间', type: '总用电', status: '在线' },
        { index: 7, name: '1-AL-B1-1-2', location: '1F强电间', type: '生活用电', status: '在线' },
        { index: 8, name: '1-AL-B1-1-2', location: '1F强电间', type: '物业用电', status: '在线' },
        { index: 9, name: '1-AL-B1-1-2', location: '1F强电间', type: '总用电', status: '离线' },
        { index: 10, name: '1-AL-B1-1-2', location: '1F强电间', type: '总用电', status: '在线' },
      ],
      total: 180,
    },
  },

  energyUpstream: {
    summary: [
      { label: 'LV1总级数(个)', value: 2, icon: 'wave', color: '#1890ff' },
      { label: 'LV2总级数(个)', value: 57, icon: 'wave', color: '#faad14' },
      { label: 'LV3总级数(个)', value: 45, icon: 'wave', color: '#722ed1' },
      { label: 'LV4总级数(个)', value: 36, icon: 'wave', color: '#52c41a' },
      { label: 'LV5总级数(个)', value: 70, icon: 'wave', color: '#b37feb' },
    ],
    table: {
      columns: ['#', '层级', 'LV1', 'LV2', 'LV3', 'LV4', 'LV5', '备注', '操作'],
      rows: [
        { index: 1, level: 'LV1', lv1: '甲1#楼 总表', lv2: '', lv3: '', lv4: '', lv5: '' },
        { index: 2, level: 'LV2', lv1: '', lv2: '甲1#表', lv3: '', lv4: '', lv5: '' },
        { index: 3, level: 'LV3', lv1: '', lv2: '', lv3: '甲131#', lv4: '', lv5: '' },
        { index: 4, level: 'LV4', lv1: '', lv2: '', lv3: '', lv4: '甲29#表', lv5: '' },
        { index: 5, level: 'LV4', lv1: '', lv2: '', lv3: '', lv4: '甲31#表', lv5: '' },
        { index: 6, level: 'LV2', lv1: '', lv2: '甲5#表', lv3: '', lv4: '', lv5: '' },
        { index: 7, level: 'LV3', lv1: '', lv2: '', lv3: '甲30#表', lv4: '', lv5: '' },
        { index: 8, level: 'LV2', lv1: '', lv2: '甲10#表', lv3: '', lv4: '', lv5: '' },
        { index: 9, level: 'LV3', lv1: '', lv2: '', lv3: '双25#表', lv4: '', lv5: '' },
      ],
      total: 50,
    },
  },

  energyPeakValley: {
    table: {
      columns: ['#', '方案名称', '方案时间', '状态', '创建时间', '操作'],
      rows: [
        { index: 1, name: '001', time: '2027-01-01 ~ 2027-12-31', status: '未启用', createTime: '2023-12-16 11:27:34' },
        { index: 2, name: '方案一', time: '2026-01-01 ~ 2026-02-28', status: '未启用', createTime: '2023-10-29 19:36:46' },
        { index: 3, name: '方案二', time: '2023-10-01 ~ 2023-12-31', status: '已启用', createTime: '2023-10-29 19:35:51' },
      ],
      total: 3,
    },
  },

  energyWaterMeter: {
    summary: [
      { label: '仪表总数', value: 2, icon: 'trendUp', color: '#1890ff' },
      { label: '仪表在线数(个)', value: 2, icon: 'inventory', color: '#1890ff' },
      { label: '仪表离线数(个)', value: 0, icon: 'inventory', color: '#1890ff' },
    ],
    table: {
      columns: ['序号', '项目类型', '物耗类型', '水表编号', '水表名称', '水表流水号', '水表网络', '倍率', '本码', '监测状态', '审批状态'],
      rows: [
        { index: 1, projectType: '甲级', consumeType: '生活用水', meterType: '电子水表', meterCode: '111', meterName: '111', serial: '111', network: '', ratio: '1.0000', reading: '111', status: '正常', approval: '未绑定' },
        { index: 2, projectType: '乙级', consumeType: '水箱用水', meterType: '机械水表', meterCode: '222', meterName: '222', serial: '222', network: '', ratio: '2.0000', reading: '222', status: '正常', approval: '未绑定' },
      ],
      total: 2,
    },
  },

  energyWaterUpstream: {
    summary: [
      { label: 'LV1级总数(个)', value: 2, icon: 'wave', color: '#1890ff' },
      { label: 'LV2级总数(个)', value: 0, icon: 'wave', color: '#faad14' },
      { label: 'LV3级总数(个)', value: 0, icon: 'wave', color: '#722ed1' },
      { label: 'LV4级总数(个)', value: 0, icon: 'wave', color: '#52c41a' },
      { label: 'LV5级总数(个)', value: 0, icon: 'wave', color: '#b37feb' },
    ],
    table: {
      columns: ['#', '层级', 'LV1', 'LV2', 'LV3', 'LV4', 'LV5', '备注', '操作'],
      rows: [
        { index: 1, level: 'LV1', lv1: '111', lv2: '', lv3: '', lv4: '', lv5: '' },
        { index: 2, level: 'LV1', lv1: '222', lv2: '', lv3: '', lv4: '', lv5: '' },
      ],
      total: 2,
    },
  },

  energyType: {
    tree: [{
      name: '电', subject: '电', updateTime: '2023-10-22 14:33:48', expanded: true,
      children: [
        { name: '办公用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '照明用电', subject: '电', updateTime: '2023-11-25 11:25:48' },
        { name: '实验室用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '厨房用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '冰箱用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '餐厅用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '柴发房用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '车间用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '风机用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '公区用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '机房用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '监控用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '空调末端用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '空调水泵用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '空调用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
        { name: '冷库用电', subject: '电', updateTime: '2023-10-22 14:33:48' },
      ],
    }],
  },
};

const MP_PAGE_REGISTRY = {
  'fire-hazard-stats': { type: 'hazard-stats', dataKey: 'fireHazardStats' },
  'fire-hazard-list': { type: 'hazard-list', dataKey: 'fireHazardList' },
  'fire-alarm-sys-device': { type: 'device-bind', dataKey: 'fireAlarmSysDevice' },
  'fire-alarm-sys-status': { type: 'device-status', dataKey: 'fireAlarmSysStatus' },
  'fire-smoke-device': { type: 'device-bind', dataKey: 'fireSmokeDevice' },
  'fire-smoke-status': { type: 'device-status', dataKey: 'fireSmokeStatus' },
  'fire-sprinkler-device': { type: 'device-bind', dataKey: 'fireSprinklerDevice' },
  'fire-sprinkler-status': { type: 'device-status', dataKey: 'fireSprinklerStatus' },
  'fire-hydrant-device': { type: 'device-bind', dataKey: 'fireHydrantDevice' },
  'fire-hydrant-status': { type: 'device-status', dataKey: 'fireHydrantStatus' },
  'personnel-mgmt': { type: 'personnel', dataKey: 'personnelMgmt' },
  'energy-report': { type: 'energy-report', dataKey: 'energyReport' },
  'energy-overview': { type: 'energy-overview', dataKey: 'energyOverview' },
  'energy-flow': { type: 'energy-flow', dataKey: 'energyFlow' },
  'energy-cabinet': { type: 'energy-table', dataKey: 'energyCabinet' },
  'energy-meter': { type: 'energy-table', dataKey: 'energyMeter' },
  'energy-meter-data': { type: 'energy-table', dataKey: 'energyMeterData' },
  'energy-upstream': { type: 'energy-upstream', dataKey: 'energyUpstream' },
  'energy-peak-valley': { type: 'energy-simple-table', dataKey: 'energyPeakValley' },
  'energy-water-meter': { type: 'energy-table', dataKey: 'energyWaterMeter' },
  'energy-water-upstream': { type: 'energy-upstream', dataKey: 'energyWaterUpstream' },
  'energy-type': { type: 'energy-type', dataKey: 'energyType' },
};
