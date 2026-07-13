const ENERGY_DATA = {
  floors: ['5F', '4F', '3F', '2F', '1F'],

  buildingIdMap: {
    'p1-1': 'b1', 'p1-2': 'b2', 'p1-3': 'b3',
    'p2-1': 'b1', 'p2-2': 'b2', 'p2-3': 'b3',
    'p3-1': 'b1', 'p3-2': 'b2', 'p3-3': 'b3',
    'p4-1': 'b1', 'p4-2': 'b2',
  },

  buildingDetails: {
    electricity: {
      b1: { meterCount: 20, label: '电表数' },
      b2: { meterCount: 20, label: '电表数' },
      b3: { meterCount: 15, label: '电表数' },
    },
    water: {
      b1: { meterCount: 20, label: '水表数' },
      b2: { meterCount: 18, label: '水表数' },
      b3: { meterCount: 12, label: '水表数' },
    },
  },

  floorRank: {
    electricity: [
      { name: '1F', value: '233,323', unit: 'kWh' },
      { name: '2F', value: '200,323', unit: 'kWh' },
      { name: '3F', value: '165,323', unit: 'kWh' },
      { name: '4F', value: '132,323', unit: 'kWh' },
      { name: '5F', value: '122,323', unit: 'kWh' },
    ],
    water: [
      { name: '1F', value: '23,323', unit: 'm³' },
      { name: '2F', value: '20,323', unit: 'm³' },
      { name: '3F', value: '16,523', unit: 'm³' },
      { name: '4F', value: '13,232', unit: 'm³' },
      { name: '5F', value: '12,232', unit: 'm³' },
    ],
  },

  floorDevices: {
    electricity: {
      '5F': [
        { id: 'e51', code: 'DX031', name: '上电计量柜1', x: 28, y: 32, color: '#3ddc84' },
        { id: 'e52', code: 'DX032', name: '上电计量柜2', x: 48, y: 38, color: '#3ddc84' },
        { id: 'e53', code: 'DX033', name: '上电计量柜3', x: 62, y: 48, color: '#3ddc84' },
      ],
      '4F': [
        { id: 'e41', code: 'DX041', name: '上电计量柜1', x: 32, y: 36, color: '#3ddc84' },
        { id: 'e42', code: 'DX042', name: '上电计量柜2', x: 55, y: 42, color: '#3ddc84' },
      ],
      '3F': [
        { id: 'e31', code: 'DX031', name: '上电计量柜1', x: 30, y: 34, color: '#3ddc84' },
        { id: 'e32', code: 'DX032', name: '上电计量柜2', x: 46, y: 40, color: '#3ddc84' },
        { id: 'e33', code: 'DX033', name: '上电计量柜3', x: 58, y: 52, color: '#3ddc84' },
        { id: 'e34', code: 'DX034', name: '上电计量柜4', x: 70, y: 36, color: '#3ddc84' },
      ],
      '2F': [
        { id: 'e21', code: 'DX031', name: '上电计量柜1', x: 26, y: 30, color: '#3ddc84' },
        { id: 'e22', code: 'DX032', name: '上电计量柜2', x: 42, y: 38, color: '#3ddc84' },
        { id: 'e23', code: 'DX033', name: '上电计量柜3', x: 54, y: 48, color: '#3ddc84' },
        { id: 'e24', code: 'DX034', name: '上电计量柜4', x: 66, y: 34, color: '#3ddc84' },
        { id: 'e25', code: 'DX035', name: '上电计量柜5', x: 48, y: 58, color: '#3ddc84' },
      ],
      '1F': [
        { id: 'e11', code: 'DX011', name: '上电计量柜1', x: 34, y: 40, color: '#3ddc84' },
        { id: 'e12', code: 'DX012', name: '上电计量柜2', x: 52, y: 46, color: '#3ddc84' },
        { id: 'e13', code: 'DX013', name: '上电计量柜3', x: 64, y: 36, color: '#3ddc84' },
      ],
    },
    water: {
      '5F': [
        { id: 'w51', code: 'SB051', name: '水表计量点1', x: 30, y: 34, color: '#00e5ff' },
        { id: 'w52', code: 'SB052', name: '水表计量点2', x: 55, y: 44, color: '#00e5ff' },
      ],
      '4F': [
        { id: 'w41', code: 'SB041', name: '水表计量点1', x: 36, y: 38, color: '#00e5ff' },
        { id: 'w42', code: 'SB042', name: '水表计量点2', x: 58, y: 48, color: '#00e5ff' },
      ],
      '3F': [
        { id: 'w31', code: 'SB031', name: '水表计量点1', x: 28, y: 32, color: '#00e5ff' },
        { id: 'w32', code: 'SB032', name: '水表计量点2', x: 46, y: 42, color: '#00e5ff' },
        { id: 'w33', code: 'SB033', name: '水表计量点3', x: 64, y: 36, color: '#00e5ff' },
      ],
      '2F': [
        { id: 'w21', code: 'SB021', name: '水表计量点1', x: 32, y: 36, color: '#00e5ff' },
        { id: 'w22', code: 'SB022', name: '水表计量点2', x: 48, y: 44, color: '#00e5ff' },
        { id: 'w23', code: 'SB023', name: '水表计量点3', x: 60, y: 52, color: '#00e5ff' },
        { id: 'w24', code: 'SB024', name: '水表计量点4', x: 70, y: 38, color: '#00e5ff' },
      ],
      '1F': [
        { id: 'w11', code: 'SB011', name: '水表计量点1', x: 38, y: 42, color: '#00e5ff' },
        { id: 'w12', code: 'SB012', name: '水表计量点2', x: 56, y: 48, color: '#00e5ff' },
      ],
    },
  },

  /** 设备读数弹窗默认模板（按用电/用水） */
  deviceReadingDefaults: {
    electricity: {
      title: '电箱总表031',
      meters: ['1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#', '10#'],
      stats: [
        { label: '电表名称', value: '1号电柜' },
        { label: '线路类型', value: 'A级' },
        { label: '今日用电', value: '142kWh' },
        { label: '当月用电', value: '12342kWh' },
        { label: '单价', value: '1.8元' },
        { label: '当月电费', value: '1,123元' },
      ],
      trend: {
        days: Array.from({ length: 30 }, (_, i) => String(i + 1)),
        current: [42, 48, 45, 52, 58, 55, 62, 68, 65, 72, 70, 76, 74, 80, 78, 82, 85, 88, 84, 90, 86, 92, 88, 94, 90, 96, 92, 98, 94, 100],
        previous: [38, 42, 40, 46, 50, 48, 54, 58, 56, 62, 60, 65, 63, 68, 66, 70, 72, 75, 71, 78, 74, 80, 76, 82, 78, 84, 80, 86, 82, 88],
      },
    },
    water: {
      title: '水表总表021',
      meters: ['1#', '2#', '3#', '4#', '5#', '6#'],
      stats: [
        { label: '水表名称', value: '1号水表' },
        { label: '管路类型', value: 'A级' },
        { label: '今日用水', value: '42m³' },
        { label: '当月用水', value: '1,234m³' },
        { label: '单价', value: '3.5元' },
        { label: '当月水费', value: '4,319元' },
      ],
      trend: {
        days: Array.from({ length: 30 }, (_, i) => String(i + 1)),
        current: [12, 14, 13, 16, 18, 15, 20, 22, 19, 24, 21, 26, 23, 28, 25, 27, 29, 30, 28, 32, 30, 34, 31, 35, 33, 36, 34, 38, 35, 40],
        previous: [10, 12, 11, 14, 15, 13, 17, 18, 16, 20, 18, 22, 19, 24, 21, 23, 25, 26, 24, 28, 26, 29, 27, 30, 28, 31, 29, 32, 30, 34],
      },
    },
  },

  deviceReadings: {
    electricity: {
      DX031: {
        title: '电箱总表031',
        meters: ['1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#', '10#'],
        stats: [
          { label: '电表名称', value: '1号电柜' },
          { label: '线路类型', value: 'A级' },
          { label: '今日用电', value: '142kWh' },
          { label: '当月用电', value: '12342kWh' },
          { label: '单价', value: '1.8元' },
          { label: '当月电费', value: '1,123元' },
        ],
      },
    },
    water: {
      SB021: {
        title: '水表总表021',
        meters: ['1#', '2#', '3#', '4#', '5#', '6#'],
        stats: [
          { label: '水表名称', value: '1号水表' },
          { label: '管路类型', value: 'A级' },
          { label: '今日用水', value: '42m³' },
          { label: '当月用水', value: '1,234m³' },
          { label: '单价', value: '3.5元' },
          { label: '当月水费', value: '4,319元' },
        ],
      },
    },
  },

  ledgerTemplates: {
    electricity: {
      ia: [
        { label: 'IA_设备分类', value: '用能设备' },
        { label: '能源分项', value: '用电' },
        { label: '表号', value: '121' },
        { label: '表名称', value: '1号电柜' },
      ],
      fm: [
        { label: 'FM_维保电话', value: '13916430407' },
        { label: 'FM_维保单位', value: '上安' },
        { label: 'FM_保修期限', value: '2年' },
        { label: 'FM_启用日期', value: '2019.12' },
        { label: 'FM_安装日期', value: '2019.6' },
        { label: 'FM_产地', value: '浙江' },
        { label: 'FM_使用寿命', value: '2年' },
      ],
      id: [
        { label: 'ID_设备编码', value: 'SDWG-31.27.03-001' },
        { label: '设计编号', value: 'AHU-5F-01' },
      ],
    },
    water: {
      ia: [
        { label: 'IA_设备分类', value: '用能设备' },
        { label: '能源分项', value: '用水' },
        { label: '表号', value: '221' },
        { label: '表名称', value: '1号水表' },
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
      id: [
        { label: 'ID_设备编码', value: 'SB-21.02.01-001' },
        { label: '设计编号', value: 'WM-2F-01' },
      ],
    },
  },
};
