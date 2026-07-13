const CANTEEN_DATA = {
  floors: ['3F', '2F', '1F'],

  buildingIdMap: {
    'p1-1': 'b1', 'p1-2': 'b2', 'p1-3': 'b3', 'p1-c3': 'c3',
    'p2-1': 'b1', 'p2-2': 'b2', 'p2-3': 'b3',
    'p3-1': 'b1', 'p3-2': 'b2', 'p3-3': 'b3',
    'p4-1': 'b1', 'p4-2': 'b2',
  },

  /** 左侧项目树（楼栋下挂楼层） */
  projects: [
    {
      id: 'p1', name: '延安东路300号', units: 4, expanded: true,
      children: [
        {
          id: 'p1-1', name: '1号楼', expanded: true,
          children: [
            { id: 'p1-1-3F', name: '3F' },
            { id: 'p1-1-2F', name: '2F' },
            { id: 'p1-1-1F', name: '1F' },
          ],
        },
        {
          id: 'p1-2', name: '2号楼', expanded: false,
          children: [
            { id: 'p1-2-2F', name: '2F' },
            { id: 'p1-2-1F', name: '1F' },
          ],
        },
        {
          id: 'p1-3', name: '3号楼', expanded: false,
          children: [
            { id: 'p1-3-1F', name: '1F' },
          ],
        },
        {
          id: 'p1-c3', name: '3号食堂', expanded: true,
          children: [
            { id: 'p1-c3-3F', name: '3F' },
            { id: 'p1-c3-2F', name: '2F' },
            { id: 'p1-c3-1F', name: '1F' },
          ],
        },
      ],
    },
    {
      id: 'p3', name: '重庆南路139号', units: 2, expanded: false,
      children: [
        {
          id: 'p3-1', name: '1号楼', expanded: false,
          children: [
            { id: 'p3-1-2F', name: '2F' },
            { id: 'p3-1-1F', name: '1F' },
          ],
        },
        {
          id: 'p3-2', name: '2号楼', expanded: false,
          children: [
            { id: 'p3-2-1F', name: '1F' },
          ],
        },
      ],
    },
    {
      id: 'p4', name: '重庆南路100号', units: 1, expanded: false,
      children: [
        {
          id: 'p4-1', name: '1号楼', expanded: false,
          children: [
            { id: 'p4-1-1F', name: '1F' },
          ],
        },
      ],
    },
    {
      id: 'p2', name: '河南南路288号', units: 1, expanded: false,
      children: [
        {
          id: 'p2-1', name: '1号楼', expanded: false,
          children: [
            { id: 'p2-1-1F', name: '1F' },
          ],
        },
      ],
    },
  ],

  buildingDetails: {
    b1: { name: '1号楼', canteenCount: 1, label: '食堂点数' },
    b2: { name: '2号楼', canteenCount: 1, label: '食堂点数' },
    b3: { name: '3号楼', canteenCount: 0, label: '食堂点数' },
    c3: { name: '3号食堂', canteenCount: 3, label: '食堂层数' },
  },

  floorPoints: {
    '1F': [
      { id: 'c1f1', name: '1食堂', x: 42, y: 48, color: '#3ddc84' },
    ],
    '2F': [
      { id: 'c2f1', name: '2食堂', x: 55, y: 40, color: '#3ddc84' },
    ],
    '3F': [
      { id: 'c3f1', name: '3食堂', x: 48, y: 44, color: '#3ddc84' },
    ],
  },

  /** 全局（未选园区） */
  global: {
    statusMode: 'table',
    status: {
      headers: ['食堂名称', '三清三关', '留样单监测', '晨检结果'],
      rows: [
        ['1食堂', '通过', '通过', '通过'],
        ['2食堂', '通过', '通过', '通过'],
        ['3食堂', '通过', '通过', '通过'],
        ['4食堂', '通过', '通过', '通过'],
      ],
    },
    guest: {
      total: 1390,
      days: ['周一', '周二', '周三', '周四', '周五'],
      online: [100, 140, 230, 100, 130],
      offline: [150, 100, 200, 140, 100],
    },
    marketing: {
      days: ['周一', '周二', '周三', '周四', '周五'],
      people: [746, 619, 610, 841, 708],
      amount: [18650, 15480, 15250, 21025, 17700],
    },
    kpi: null,
  },

  /** 按园区差异化数据 */
  byPark: {
    p1: {
      statusMode: 'cards',
      statusTitle: '当日食堂监管状态',
      statusCards: [
        { label: '三清三关', status: '通过', pass: true },
        { label: '留样菜监测', status: '通过', pass: true },
        { label: '晨检结果', status: '通过', pass: true },
      ],
      guest: {
        total: 1390,
        days: ['周一', '周二', '周三', '周四', '周五'],
        online: [100, 140, 230, 100, 130],
        offline: [150, 100, 200, 140, 100],
      },
      marketing: {
        days: ['周一', '周二', '周三', '周四', '周五'],
        people: [746, 619, 610, 841, 708],
        amount: [18650, 15480, 15250, 21025, 17700],
      },
      kpi: [
        { label: '食堂库存总数', value: '1,948', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
        { label: '客饭预定数', value: '72', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>' },
        { label: '线上预定数', value: '386', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' },
      ],
    },
    p2: {
      statusMode: 'cards',
      statusTitle: '当日食堂监管状态',
      statusCards: [
        { label: '三清三关', status: '通过', pass: true },
        { label: '留样菜监测', status: '异常', pass: false },
        { label: '晨检结果', status: '通过', pass: true },
      ],
      guest: {
        total: 860,
        days: ['周一', '周二', '周三', '周四', '周五'],
        online: [60, 80, 120, 70, 90],
        offline: [90, 70, 110, 85, 85],
      },
      marketing: {
        days: ['周一', '周二', '周三', '周四', '周五'],
        people: [420, 380, 410, 460, 390],
        amount: [10500, 9500, 10250, 11500, 9750],
      },
      kpi: [
        { label: '食堂库存总数', value: '986', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
        { label: '客饭预定数', value: '48', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>' },
        { label: '线上预定数', value: '210', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' },
      ],
    },
    p3: {
      statusMode: 'cards',
      statusTitle: '当日食堂监管状态',
      statusCards: [
        { label: '三清三关', status: '异常', pass: false },
        { label: '留样菜监测', status: '通过', pass: true },
        { label: '晨检结果', status: '通过', pass: true },
      ],
      guest: {
        total: 1120,
        days: ['周一', '周二', '周三', '周四', '周五'],
        online: [80, 110, 160, 90, 100],
        offline: [120, 90, 150, 110, 110],
      },
      marketing: {
        days: ['周一', '周二', '周三', '周四', '周五'],
        people: [580, 520, 540, 620, 560],
        amount: [14500, 13000, 13500, 15500, 14000],
      },
      kpi: [
        { label: '食堂库存总数', value: '1,260', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
        { label: '客饭预定数', value: '56', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>' },
        { label: '线上预定数', value: '268', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' },
      ],
    },
    p4: {
      statusMode: 'cards',
      statusTitle: '当日食堂监管状态',
      statusCards: [
        { label: '三清三关', status: '通过', pass: true },
        { label: '留样菜监测', status: '通过', pass: true },
        { label: '晨检结果', status: '异常', pass: false },
      ],
      guest: {
        total: 640,
        days: ['周一', '周二', '周三', '周四', '周五'],
        online: [40, 55, 70, 45, 50],
        offline: [70, 55, 85, 65, 55],
      },
      marketing: {
        days: ['周一', '周二', '周三', '周四', '周五'],
        people: [310, 280, 295, 340, 300],
        amount: [7750, 7000, 7375, 8500, 7500],
      },
      kpi: [
        { label: '食堂库存总数', value: '720', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
        { label: '客饭预定数', value: '32', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>' },
        { label: '线上预定数', value: '148', unit: '', color: '#ff9500', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' },
      ],
    },
  },
};
