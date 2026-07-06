/** 公物仓统计数据 — 大屏 / 中台 / 小程序共享 */
const PUBLIC_WAREHOUSE_DATA = {
  warehouses: [
    { id: 'w1', name: '黄浦仓（国货路371号）', shortName: '黄浦仓', color: '#1890ff' },
    { id: 'w2', name: '闵行仓（立跃路1758号）', shortName: '闵行仓', color: '#69c0ff' },
  ],
  quarterlyStartYear: 2026,
  currentYear: 2026,
  currentQuarter: 'Q1',

  currentStock: {
    total: 822,
    w1: 484,
    w2: 338,
    freq: '本季度',
  },

  cumulative: {
    currentQuarter: { total: 1320, w1: 758, w2: 562, change: 5.6, trend: 'up' },
    quarterlyTrend: {
      labels: ['2026 Q1'],
      total: [1320],
      w1: [758],
      w2: [562],
    },
    yearlyTrend: {
      labels: ['2022', '2023', '2024', '2025', '2026'],
      total: [3200, 3850, 4520, 4180, 5280],
      w1: [1850, 2200, 2580, 2410, 3020],
      w2: [1350, 1650, 1940, 1770, 2260],
    },
    historyList: [
      { period: '2026 Q1', total: 1320, w1: 758, w2: 562, change: 5.6 },
    ],
  },

  yearlyInventory: {
    labels: ['2022', '2023', '2024', '2025'],
    w1Begin: [412, 445, 462, 471],
    w1End: [445, 462, 471, 484],
    w2Begin: [278, 296, 312, 326],
    w2End: [296, 312, 326, 338],
  },

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
};
