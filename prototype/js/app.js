const PROJECTS = [
  { id: 'p1', name: '延安东路300号', code: 'TK3HWTNJ', members: 24 },
  { id: 'p2', name: '重庆南路100号', code: 'CQNL100H', members: 18 },
  { id: 'p3', name: '重庆南路139号', code: 'CQNL139H', members: 15 },
  { id: 'p4', name: '河南南路288号', code: 'HNNL288H', members: 21 }
]

const PROJECT_DATA = {
  p1: {
    homeOverview: { buildingArea: '12.6万㎡', equipmentTotal: 1286, pendingOrders: 8, processedOrders: 42, todayElectric: '246 Kwh', todayWater: '15.2 t', todayDining: 386, cardPayTotal: '28,456元' },
    dataOverview: { assetTotal: 1286, workOrderPending: 23, energyToday: '1.2t / 856Kwh', canteenPassRate: '100%' },
    energy: { waterTotal: '1523t', electricTotal: '246Kwh', todayElectric: 1215, compareYesterday: '+100kwh 10%' },
    canteen: { purchaseTotal: 27200, inventory: 4832, guestReserve: 483, onlineReserve: 386, personnel: 2805 },
    assetManagement: { spaceTotal: '4230m²', equipmentTotal: 856, spaceArea: 4230, equipmentCount: 856 },
  },
  p2: {
    homeOverview: { buildingArea: '9.8万㎡', equipmentTotal: 956, pendingOrders: 6, processedOrders: 35, todayElectric: '198 Kwh', todayWater: '12.1 t', todayDining: 320, cardPayTotal: '22,180元' },
    dataOverview: { assetTotal: 956, workOrderPending: 15, energyToday: '0.9t / 620Kwh', canteenPassRate: '98%' },
    energy: { waterTotal: '1120t', electricTotal: '198Kwh', todayElectric: 980, compareYesterday: '+60kwh 6%' },
    canteen: { purchaseTotal: 18500, inventory: 3200, guestReserve: 320, onlineReserve: 256, personnel: 1850 },
    assetManagement: { spaceTotal: '3180m²', equipmentTotal: 620, spaceArea: 3180, equipmentCount: 620 },
  },
  p3: {
    homeOverview: { buildingArea: '7.5万㎡', equipmentTotal: 742, pendingOrders: 5, processedOrders: 28, todayElectric: '156 Kwh', todayWater: '9.8 t', todayDining: 256, cardPayTotal: '18,920元' },
    dataOverview: { assetTotal: 742, workOrderPending: 11, energyToday: '0.7t / 480Kwh', canteenPassRate: '99%' },
    energy: { waterTotal: '890t', electricTotal: '156Kwh', todayElectric: 756, compareYesterday: '-20kwh -3%' },
    canteen: { purchaseTotal: 14200, inventory: 2650, guestReserve: 210, onlineReserve: 168, personnel: 1420 },
    assetManagement: { spaceTotal: '2560m²', equipmentTotal: 480, spaceArea: 2560, equipmentCount: 480 },
  },
  p4: {
    homeOverview: { buildingArea: '11.2万㎡', equipmentTotal: 1105, pendingOrders: 7, processedOrders: 38, todayElectric: '220 Kwh', todayWater: '13.6 t', todayDining: 410, cardPayTotal: '25,680元' },
    dataOverview: { assetTotal: 1105, workOrderPending: 19, energyToday: '1.0t / 720Kwh', canteenPassRate: '100%' },
    energy: { waterTotal: '1350t', electricTotal: '220Kwh', todayElectric: 1080, compareYesterday: '+80kwh 8%' },
    canteen: { purchaseTotal: 22800, inventory: 4100, guestReserve: 410, onlineReserve: 328, personnel: 2200 },
    assetManagement: { spaceTotal: '3890m²', equipmentTotal: 720, spaceArea: 3890, equipmentCount: 720 },
  }
}

const MOCK = {
  carouselList: [
    { id: 1, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', title: '智慧园区数字化管理平台' },
    { id: 2, image: 'https://images.unsplash.com/photo-1473341304170-971dccb5bfc1?w=800&q=80', title: '绿色低碳 · 智能运维' },
    { id: 3, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', title: '一站式园区服务' }
  ],
  propertyManagement: [
    { id: 'repair', name: '报修工单', icon: 'repair', color: '#4A90E2', badge: '99+' },
    { id: 'maintain', name: '维保工单', icon: 'maintain', color: '#52C41A', badge: '53' },
    { id: 'inspect', name: '巡检任务', icon: 'inspect', color: '#FDD835', badge: '28' },
    { id: 'myorder', name: '我的工单', icon: 'myorder', color: '#7E57C2', badge: '99+' }
  ],
  notifications: [
    { id: 1, title: '报修工单待处理', content: 'A栋3层空调故障报修，请及时处理', time: '10:30', read: false },
    { id: 2, title: '巡检任务提醒', content: '今日消防设备巡检任务即将到期', time: '09:15', read: false },
    { id: 3, title: '能源异常告警', content: 'B区用电量超出阈值15%', time: '昨天', read: true }
  ],
  todos: [
    { id: 1, tab: 'todo', type: '报修', time: '2024-11-24 10:00:00', status: '待关单', problemType: '问题报修', problemDesc: '空调机组无法制冷' },
    { id: 2, tab: 'todo', type: '维保', time: '2024-11-24 10:00:00', status: '待关单', plan: '电梯月度维保程序（C方式）' },
    { id: 3, tab: 'todo', type: '巡检', time: '2024-11-24 10:00:00', status: '待关单', inspectType: '公共设施', plan: '电梯月度维保程序（C方式）' },
    { id: 4, tab: 'initiated', type: '报修', time: '2024-11-23 14:30:00', status: '待派单', problemType: '问题报修', problemDesc: '电路设备零部件老化，需要换新' },
    { id: 5, tab: 'done', type: '报修', time: '2024-11-20 09:00:00', status: '已关单', problemType: '问题报修', problemDesc: '园区路灯维修' }
  ],
  myWorkOrders: [
    { id: 1, tab: 'initiated', type: '报修', time: '2024-11-24 10:00:00', status: '待派单', problemType: '问题报修', problemDesc: '空调机组无法制冷' },
    { id: 2, tab: 'initiated', type: '维保', time: '2024-11-24 10:00:00', status: '待接单', plan: '电梯月度维保程序（C方式）' },
    { id: 3, tab: 'initiated', type: '巡检', time: '2024-11-24 10:00:00', status: '待关单', inspectType: '公共设施', plan: '电梯月度维保程序（C方式）' },
    { id: 4, tab: 'todo', type: '报修', time: '2024-11-23 11:00:00', status: '待签字', problemType: '日常维护', problemDesc: '电路设备零部件老化，需要换新' },
    { id: 5, tab: 'done', type: '报修', time: '2024-11-18 16:00:00', status: '已完结', problemType: '问题报修', problemDesc: 'A栋门禁故障已修复' }
  ],
  workOrderList: [
    { id: 1, category: 'repair', type: '报修', time: '2024-11-24 10:00:00', status: '待派单', problemType: '问题报修', problemDesc: '空调机组无法制冷' },
    { id: 2, category: 'repair', type: '报修', time: '2024-11-24 10:00:00', status: '待接单', problemType: '日常维护', problemDesc: '电路设备零部件老化，需要换新' },
    { id: 3, category: 'repair', type: '报修', time: '2024-11-24 10:00:00', status: '报修待完成', problemType: '巡检发现', problemDesc: '空调机组无法制冷' },
    { id: 4, category: 'repair', type: '报修', time: '2024-11-24 10:00:00', status: '待签字', problemType: '问题报修', problemDesc: '空调机组无法制冷' },
    { id: 5, category: 'repair', type: '报修', time: '2024-11-24 10:00:00', status: '待关单', problemType: '问题报修', problemDesc: '空调机组无法制冷' },
    { id: 6, category: 'repair', type: '报修', time: '2024-11-24 10:00:00', status: '已完结', problemType: '问题报修', problemDesc: '空调机组无法制冷' },
    { id: 7, category: 'repair', type: '报修', time: '2024-11-24 10:00:00', status: '已取消', problemType: '问题报修', problemDesc: '空调机组无法制冷' },
    { id: 8, category: 'maintain', type: '维保', time: '2024-11-23 09:00:00', status: '待接单', problemType: '维保计划', problemDesc: '电梯月度维保程序（C方式）' },
    { id: 9, category: 'inspect', type: '巡检', time: '2024-11-22 15:00:00', status: '待关单', problemType: '公共设施', problemDesc: '消防设备巡检' }
  ],
  workOrderCategories: [
    { key: 'repair', name: '报修', count: 55 },
    { key: 'maintain', name: '维保', count: 10 },
    { key: 'inspect', name: '巡检', count: 10 },
    { key: 'safety', name: '安全', count: 10 },
    { key: 'construction', name: '施工', count: 10 },
    { key: 'rectify', name: '整改', count: 10 }
  ],
  workOrderStatusFilters: ['全部', '待派单', '待审核', '待接单', '待报修完成', '待签字', '待关单', '已关单', '已取消'],
  collabFilters: ['全部', '报修', '待派单', '待接单', '待关单', '已关单', '已取消'],
  workOrders: [
    { id: 1, title: 'A栋3层空调故障', type: '报修', status: '处理中', createTime: '2026-05-26 08:30' },
    { id: 2, title: '电梯月度维保', type: '维保', status: '待接单', createTime: '2026-05-25 14:00' },
    { id: 3, title: '园区路灯维修', type: '报修', status: '已完成', createTime: '2026-05-24 10:20' }
  ],
  messages: [
    { id: 2, category: '系统通知', content: '您有新的待办事项需要处理，请登录系统查看。', time: '2026-04-27 09:15:30', read: false },
    { id: 3, category: '审批提醒', content: '张经理提交了能源报表，请确认本周数据。', time: '2026-04-26 16:40:12', read: true },
    { id: 4, category: '巡检通知', content: '李主管：巡检报告已提交，请查阅。', time: '2026-04-25 11:20:00', read: true }
  ],
  dataSummary: [
    { label: '资产管理', total: 1286, trend: '+2.3%', items: [{ name: '在用', value: 1150 }, { name: '维保', value: 86 }, { name: '闲置', value: 50 }] },
    { label: '物业管理', total: 156, trend: '-5.1%', items: [{ name: '报修', value: 45 }, { name: '维保', value: 32 }, { name: '巡检', value: 79 }] },
    { label: '能源管理', total: '246Kwh', trend: '+8.2%', items: [{ name: '累计用水', value: '1523t' }, { name: '累计用电', value: '246Kwh' }] },
    { label: '食堂管理', total: '100%', trend: '0%', items: [{ name: '采购总额', value: '27200元' }, { name: '库存总数', value: 4832 }] }
  ],
  userProfile: {
    name: '张明', phone: '138****8888', department: '园区运营部', role: '运营管理员', employeeId: 'EMP2024001'
  },
  canteenPersonnelNature: [
    { name: '内部人员', count: 1250, color: '#4A90E2' },
    { name: '临时访客', count: 680, color: '#13C2C2' },
    { name: '外包人员', count: 420, color: '#52C41A' },
    { name: '兼职人员', count: 280, color: '#FAAD14' },
    { name: '劳务派遣人员', count: 175, color: '#FA8C16' }
  ],
  assetSpaceTypes: [
    { name: '办公空间', count: 1200, color: '#4A90E2' },
    { name: '公共空间', count: 980, color: '#13C2C2' },
    { name: '设备空间', count: 850, color: '#52C41A' },
    { name: '研发生产', count: 720, color: '#FAAD14' },
    { name: '弱电系统', count: 480, color: '#FA8C16' }
  ],
  assetEquipmentTypes: [
    { name: '办公空间风处理系统', count: 186, color: '#4A90E2' },
    { name: '电系统', count: 152, color: '#13C2C2' },
    { name: '弱电系统', count: 128, color: '#52C41A' },
    { name: '消防设施', count: 96, color: '#FAAD14' },
    { name: '水处理系统', count: 84, color: '#FA8C16' },
    { name: '仪表阀门类', count: 72, color: '#9254DE' },
    { name: '建筑构件', count: 68, color: '#EB2F96' },
    { name: '动力系统', count: 70, color: '#2F54EB' }
  ],
  spaceRanking: [
    { name: '300号', area: 2321412 },
    { name: '100号', area: 1856320 },
    { name: '139号', area: 1425680 },
    { name: '288号', area: 986540 },
    { name: '其他', area: 652300 }
  ],
  facilityFailures: [120, 145, 168, 152, 138, 175, 192, 168, 155, 210, 185, 172],
  canteenDepts: [
    { name: '人事部', count: 25, color: '#4A90E2' },
    { name: '行政部', count: 36, color: '#13C2C2' },
    { name: '营销部', count: 15, color: '#52C41A' },
    { name: '运营部', count: 12, color: '#FAAD14' },
    { name: '财务部', count: 26, color: '#FA8C16' }
  ],
  weeklyMarketing: {
    days: ['周一', '周二', '周三', '周四', '周五'],
    recharge: [376, 781, 792, 648, 688],
    swipe: [746, 619, 610, 841, 752],
    amount: [3760, 7810, 7920, 6480, 5074]
  },
  dailyMenus: {
    breakfast: [
      { day: '周一', category: '面点', name: '肉包子', price: 2 },
      { day: '周一', category: '面点', name: '刀切/花卷', price: 1.5 },
      { day: '周一', category: '面点', name: '菜包', price: 1.5 },
      { day: '周一', category: '饮品', name: '豆浆', price: 3 },
      { day: '周一', category: '粥品', name: '小米粥', price: 3 },
      { day: '周一', category: '小吃', name: '鸡蛋灌饼', price: 5 },
      { day: '周一', category: '汤品', name: '胡辣汤', price: 7 }
    ],
    lunch: [
      { day: '周一', category: '热菜', name: '红烧肉', price: 18 },
      { day: '周一', category: '热菜', name: '清炒时蔬', price: 8 },
      { day: '周一', category: '热菜', name: '鱼香肉丝', price: 15 },
      { day: '周一', category: '汤品', name: '番茄蛋汤', price: 5 },
      { day: '周一', category: '主食', name: '米饭', price: 2 },
      { day: '周一', category: '主食', name: '馒头', price: 1 }
    ],
    dinner: [
      { day: '周一', category: '热菜', name: '宫保鸡丁', price: 16 },
      { day: '周一', category: '热菜', name: '蒜蓉西兰花', price: 8 },
      { day: '周一', category: '热菜', name: '麻婆豆腐', price: 10 },
      { day: '周一', category: '汤品', name: '紫菜蛋花汤', price: 5 },
      { day: '周一', category: '主食', name: '米饭', price: 2 },
      { day: '周一', category: '小吃', name: '蒸饺', price: 8 }
    ]
  },
  propertyChart: [
    { name: '报修', value: 45, color: '#4A90E2' },
    { name: '维保', value: 32, color: '#52C41A' },
    { name: '巡检', value: 79, color: '#9254DE' }
  ],
  propertyCompletionRates: [
    { type: '报修', label: '本月报修完成率', rate: 86.4, color: '#4A90E2' },
    { type: '巡检', label: '本月巡检完成率', rate: 98.3, color: '#52C41A' },
    { type: '维保', label: '本月维保完成率', rate: 72.8, color: '#9254DE' }
  ],
  workOrderTrend: [12, 18, 15, 22, 19, 25, 23],
  energyTypes: [
    { name: '办公用电', value: 100, percent: '33.3%' },
    { name: '空调用电', value: 100, percent: '33.3%' },
    { name: '车间用电', value: 50, percent: '16.7%' },
    { name: '泵房用电', value: 20, percent: '6.7%' },
    { name: '冰箱间用电', value: 20, percent: '6.7%' },
    { name: '餐厅用电', value: 10, percent: '3.3%' }
  ],
  waterTypes: [
    { name: '生活用水', value: 8.2, percent: '65.6%' },
    { name: '绿化用水', value: 2.5, percent: '20.0%' },
    { name: '消防用水', value: 1.8, percent: '14.4%' }
  ],
  smartCard: {
    periods: {
      today: {
        swipe: 386, amount: 12456, perCapita: 32.3, trend: '8.2%',
        peopleTrend: {
          labels: ['6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时'],
          line1: [45, 120, 85, 210, 95, 78, 165, 88],
          line2: [38, 105, 72, 195, 88, 65, 148, 76],
          line3: [28, 88, 58, 168, 72, 52, 125, 62]
        },
        amountTrend: {
          labels: ['6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时'],
          line1: [1200, 3200, 2100, 5800, 2400, 1950, 4200, 2100],
          line2: [980, 2800, 1850, 5200, 2200, 1680, 3800, 1920],
          line3: [720, 2350, 1520, 4500, 1850, 1350, 3200, 1580]
        }
      },
      week: {
        swipe: 2847, amount: 28456, perCapita: 32.5, trend: '8.2%',
        peopleTrend: {
          labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          line1: [320, 450, 620, 580, 650, 480, 390],
          line2: [280, 400, 550, 520, 600, 440, 360],
          line3: [200, 320, 480, 450, 520, 380, 300]
        },
        amountTrend: {
          labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          line1: [3200, 4500, 6200, 5800, 6500, 4800, 3900],
          line2: [2800, 4000, 5500, 5200, 6000, 4400, 3600],
          line3: [2000, 3200, 4800, 4500, 5200, 3800, 3000]
        }
      },
      month: {
        swipe: 12580, amount: 125680, perCapita: 31.8, trend: '5.1%',
        peopleTrend: {
          labels: ['第1周', '第2周', '第3周', '第4周'],
          line1: [2800, 3100, 3400, 3280],
          line2: [2500, 2750, 3050, 2920],
          line3: [2100, 2300, 2600, 2480]
        },
        amountTrend: {
          labels: ['第1周', '第2周', '第3周', '第4周'],
          line1: [28000, 31000, 34000, 32680],
          line2: [25000, 27500, 30500, 29200],
          line3: [21000, 23000, 26000, 24800]
        }
      },
      year: {
        swipe: 125800, amount: 1256800, perCapita: 32.0, trend: '12.3%',
        peopleTrend: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          line1: [9800, 9200, 10500, 10800, 11200, 10600, 9800, 10200, 10800, 11000, 11500, 11800],
          line2: [8600, 8100, 9200, 9500, 9800, 9300, 8600, 9000, 9500, 9700, 10100, 10400],
          line3: [7200, 6800, 7800, 8000, 8200, 7800, 7200, 7500, 8000, 8200, 8600, 8800]
        },
        amountTrend: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          line1: [98000, 92000, 105000, 108000, 112000, 106000, 98000, 102000, 108000, 110000, 115000, 118000],
          line2: [86000, 81000, 92000, 95000, 98000, 93000, 86000, 90000, 95000, 97000, 101000, 104000],
          line3: [72000, 68000, 78000, 80000, 82000, 78000, 72000, 75000, 80000, 82000, 86000, 88000]
        }
      }
    }
  },
  canteenOpsKpi: [
    { label: '今日预定总数', value: 1236, trend: '+3.5%' },
    { label: '客饭预定数', value: 100, trend: '+3.5%' },
    { label: '线上预定数', value: 100, trend: '+3.5%' },
    { label: '实际就餐数', value: 100, trend: '+3.5%' }
  ],
  canteenOpsDetail: [
    { date: '2024-03-25', meal: '早餐', location: '延安路300号', diners: 420, reserved: 420, actual: 398 },
    { date: '2024-03-25', meal: '中餐', location: '延安路300号', diners: 1000, reserved: 1000, actual: 920 },
    { date: '2024-03-25', meal: '晚餐', location: '延安路300号', diners: 680, reserved: 680, actual: 652 },
    { date: '2024-03-25', meal: '中餐', location: '延安路300号', diners: 800, reserved: 800, actual: 820 },
    { date: '2024-03-25', meal: '早餐', location: '延安路300号', diners: 380, reserved: 380, actual: 365 },
    { date: '2024-03-25', meal: '晚餐', location: '延安路300号', diners: 600, reserved: 600, actual: 590 }
  ],
  canteenTop5: { actual: [10, 20, 30, 40, 50], reserve: [10, 20, 30, 40, 50], days: ['周一', '周二', '周三', '周四', '周五'] },
  weeklyMenuGrid: {
    week: '2024年第13周 (3/25-3/31)',
    days: ['周一\n3/25', '周二\n3/26', '周三\n3/27', '周四\n3/28', '周五\n3/29', '周六\n3/30', '周日\n3/31'],
    breakfast: ['肉包、菜包、茶叶蛋、小米粥、豆浆', '刀切/花卷、菜包、茶叶蛋、白粥、豆浆', '肉包、花卷、茶叶蛋、小米粥、豆浆', '菜包、馒头、茶叶蛋、白粥、豆浆', '肉包、刀切、茶叶蛋、小米粥、豆浆', '花卷、菜包、茶叶蛋、白粥', '肉包、馒头、茶叶蛋、豆浆'],
    lunch: ['红烧肉、清蒸鱼、炒时蔬、番茄蛋汤', '宫保鸡丁、鱼香肉丝、炒时蔬、紫菜汤', '糖醋排骨、清炒西兰花、炒时蔬、冬瓜汤', '回锅肉、麻婆豆腐、炒时蔬、蛋花汤', '红烧鱼、宫保鸡丁、炒时蔬、番茄汤', '红烧肉、炒时蔬、汤', '面条、炒时蔬、汤'],
    dinner: ['宫保鸡丁、麻婆豆腐、炒时蔬、紫菜汤', '回锅肉、清炒西兰花、炒时蔬、蛋花汤', '鱼香肉丝、麻婆豆腐、炒时蔬、冬瓜汤', '红烧肉、宫保鸡丁、炒时蔬、番茄汤', '糖醋排骨、炒时蔬、汤', '炒时蔬、汤', '面条、汤']
  },
  supervisionRecords: [
    { id: 1, threeClean: '通过', sample1: '通过', sample2: '通过', morning: '通过', time: '2026/5/27' },
    { id: 2, threeClean: '通过', sample1: '通过', sample2: '通过', morning: '通过', time: '2026/5/26' },
    { id: 3, threeClean: '通过', sample1: '通过', sample2: '通过', morning: '通过', time: '2026/5/25' },
    { id: 4, threeClean: '通过', sample1: '通过', sample2: '通过', morning: '通过', time: '2026/5/24' },
    { id: 5, threeClean: '通过', sample1: '通过', sample2: '通过', morning: '通过', time: '2026/5/23' }
  ],
  hourlyElectric: {
    today: [80, 120, 180, 230, 200, 160, 140, 180, 210, 190, 170, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    yesterday: [60, 100, 160, 210, 190, 150, 130, 170, 200, 180, 160, 140, 180, 200, 220, 190, 170, 200, 230, 210, 180, 150, 120, 90]
  }
}

const STATUS_CLASS = { '待接单': 'waiting', '处理中': 'processing', '已完成': 'done' }

const TYPE_TAG_CLASS = { '报修': 'tag-blue', '维保': 'tag-orange', '巡检': 'tag-green' }

const SUB_TITLES = {
  notifications: '消息通知', todo: '协作', workorder: '协作', workOrderList: '工单列表', messages: '消息',
  contacts: '通讯录', profile: '编辑资料', changePassword: '修改密码',
  canteenData: '数据总览', energyData: '数据总览', assetData: '数据总览',
  smartCardData: '智慧卡数据总览', canteenOpsData: '食堂运营数据总览', canteenSupervisionData: '食堂监管数据总览',
  forgotPassword: '忘记密码', register: '注册'
}

const state = {
  authPhase: 'login',
  loginMode: 'account',
  loginForm: { account: '', password: '', phone: '', code: '' },
  registerForm: { account: '', password: '', confirm: '' },
  forgotForm: { account: '', phone: '', code: '', password: '', confirm: '' },
  selectedProjectId: 'p1',
  currentProject: PROJECTS[0],
  currentTab: 'home',
  currentSubPage: null,
  subPageStack: [],
  carouselIndex: 0,
  notifications: JSON.parse(JSON.stringify(MOCK.notifications)),
  messages: JSON.parse(JSON.stringify(MOCK.messages)),
  contacts: [
    { id: 1, name: '李主管', department: '物业管理部', phone: '13800001111' },
    { id: 2, name: '王工程师', department: '设备维护部', phone: '13800002222' },
    { id: 3, name: '赵会计', department: '财务部', phone: '13800003333' },
    { id: 4, name: '陈经理', department: '园区运营部', phone: '13800004444' }
  ],
  contactSearch: '',
  editingContactId: null,
  canteenTab: 'dashboard',
  canteenPersonnelType: 'dept',
  canteenMarketingType: 'people',
  menuMealType: 'breakfast',
  assetTypeTab: 'space',
  energyTab: 'electric',
  dataEnergyTypeTab: 'electric',
  energyTimeFilter: 'today',
  smartCardTrendType: 'people',
  smartCardPeriod: 'week',
  canteenOpsMealFilter: '',
  showPwd: {},
  messageTab: 'all',
  messageSearch: '',
  todoMainTab: 'todo',
  todoFilter: '全部',
  workOrderMainTab: 'initiated',
  workOrderFilter: '全部',
  workOrderListCategory: 'repair',
  workOrderListFilter: '全部'
}

let carouselTimer = null
let nextContactId = 5

function pd() { return PROJECT_DATA[state.currentProject.id] || PROJECT_DATA.p1 }

function pendingTodos() { return MOCK.todos.filter(t => t.tab === 'todo').length }
function activeWorkOrders() { return MOCK.myWorkOrders.filter(w => w.tab !== 'done').length }

function renderHomeOverview(h) {
  return `
    <div class="card"><div class="card-title">数据总览</div>
      <div class="overview-module-grid">
        <div class="overview-module-card">
          <span class="module-tag tag-asset">资产</span>
          <div class="module-metrics">
            <div><div class="mm-label">建筑面积</div><div class="mm-val blue">${h.buildingArea}</div></div>
            <div><div class="mm-label">设备总数</div><div class="mm-val blue">${h.equipmentTotal}</div></div>
          </div>
        </div>
        <div class="overview-module-card">
          <span class="module-tag tag-property">物业</span>
          <div class="module-metrics">
            <div><div class="mm-label">待处理工单</div><div class="mm-val orange">${h.pendingOrders}</div></div>
            <div><div class="mm-label">已处理工单</div><div class="mm-val blue">${h.processedOrders}</div></div>
          </div>
        </div>
        <div class="overview-module-card">
          <span class="module-tag tag-energy">能源</span>
          <div class="module-metrics">
            <div><div class="mm-label">今日用电</div><div class="mm-val blue">${h.todayElectric}</div></div>
            <div><div class="mm-label">今日用水</div><div class="mm-val blue">${h.todayWater}</div></div>
          </div>
        </div>
        <div class="overview-module-card">
          <span class="module-tag tag-canteen">食堂</span>
          <div class="module-metrics">
            <div><div class="mm-label">今日就餐人数</div><div class="mm-val blue">${h.todayDining}人</div></div>
            <div><div class="mm-label">今日刷卡总金额</div><div class="mm-val blue">${h.cardPayTotal}</div></div>
          </div>
        </div>
      </div>
    </div>`
}

function renderWorkOrderCard(item) {
  const tagCls = TYPE_TAG_CLASS[item.type] || 'tag-blue'
  let body = ''
  if (item.type === '报修') {
    body = `<div class="wo-field">问题类型：${item.problemType || '问题报修'}</div><div class="wo-field">问题描述：${item.problemDesc || ''}</div>`
  } else if (item.type === '维保') {
    body = `<div class="wo-field">维保计划：${item.plan || item.problemDesc || ''}</div>`
  } else if (item.type === '巡检') {
    body = `<div class="wo-field">巡检类型：${item.inspectType || '公共设施'}</div><div class="wo-field">巡检计划：${item.plan || ''}</div>`
  } else {
    body = `<div class="wo-field">问题类型：${item.problemType || ''}</div><div class="wo-field">问题描述：${item.problemDesc || ''}</div>`
  }
  return `
    <div class="wo-card" onclick="App.showToast('查看工单详情')">
      <div class="wo-card-top">
        <span class="wo-type-tag ${tagCls}">${item.type}</span>
        <span class="wo-time">${item.time}</span>
        <span class="wo-status">${item.status}</span>
      </div>
      ${body}
      <span class="wo-arrow">›</span>
    </div>`
}

function renderCollabPage(config) {
  const { mainTab, filter, mainTabKey, filterKey, items, tabCounts } = config
  const filtered = items.filter(it => {
    if (it.tab !== mainTab) return false
    if (filter === '全部') return true
    if (filter === '报修') return it.type === '报修'
    return it.status === filter || it.status.includes(filter.replace('待', ''))
  })
  return `
    <div class="collab-page">
      <div class="collab-main-tabs">
        <div class="collab-main-tab ${mainTab==='initiated'?'active':''}" onclick="App.setCollabTab('${mainTabKey}','initiated')">我发起的(${tabCounts.initiated})</div>
        <div class="collab-main-tab ${mainTab==='todo'?'active':''}" onclick="App.setCollabTab('${mainTabKey}','todo')">我的待办(${tabCounts.todo})</div>
        <div class="collab-main-tab ${mainTab==='done'?'active':''}" onclick="App.setCollabTab('${mainTabKey}','done')">我的已办(${tabCounts.done})</div>
      </div>
      <div class="collab-filters">${MOCK.collabFilters.map(f => `
        <button class="collab-filter ${filter===f?'active':''}" onclick="App.setCollabFilter('${filterKey}','${f}')">${f}</button>`).join('')}
      </div>
      <div class="wo-list">${filtered.length ? filtered.map(renderWorkOrderCard).join('') : '<div class="empty">暂无数据</div>'}</div>
    </div>`
}

function unreadNotifications() { return state.notifications.filter(n => !n.read).length }
function unreadMessages() { return state.messages.filter(m => !m.read).length }

function showToast(msg) {
  const el = document.getElementById('toast')
  el.textContent = msg
  el.classList.add('show')
  clearTimeout(showToast._t)
  showToast._t = setTimeout(() => el.classList.remove('show'), 2000)
}

function renderProjectList() {
  const el = document.getElementById('project-list')
  if (!el) return
  el.innerHTML = PROJECTS.map(p => `
    <div class="picker-item ${p.id === state.currentProject.id ? 'active' : ''}" onclick="App.selectProject('${p.id}')">
      <span>${p.name}</span>${p.id === state.currentProject.id ? '<span>✓</span>' : ''}
    </div>
  `).join('')
}

function renderPieChart(depts, total) {
  let offset = 0
  const r = 70, cx = 90, cy = 90
  const slices = depts.map(d => {
    const pct = d.count / total
    const angle = pct * 360
    const large = angle > 180 ? 1 : 0
    const start = offset
    offset += angle
    const x1 = cx + r * Math.cos((start - 90) * Math.PI / 180)
    const y1 = cy + r * Math.sin((start - 90) * Math.PI / 180)
    const x2 = cx + r * Math.cos((start + angle - 90) * Math.PI / 180)
    const y2 = cy + r * Math.sin((start + angle - 90) * Math.PI / 180)
    return `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z" fill="${d.color}" />`
  }).join('')
  return `<svg width="180" height="180" viewBox="0 0 180 180">${slices}</svg>`
}

function renderLineChart(data1, data2, labels) {
  const w = 320, h = 160, pad = 30
  const max = Math.max(...data1, ...data2, 1)
  const pts = (arr) => arr.map((v, i) => {
    const x = pad + (i / (arr.length - 1)) * (w - pad * 2)
    const y = h - pad - (v / max) * (h - pad * 2)
    return `${x},${y}`
  }).join(' ')
  return `
    <svg width="100%" viewBox="0 0 ${w} ${h}" style="max-height:180px">
      <polyline points="${pts(data2)}" fill="none" stroke="#FA8C16" stroke-width="2"/>
      ${data2.map((v,i)=>{const x=pad+(i/(data2.length-1))*(w-pad*2);const y=h-pad-(v/max)*(h-pad*2);return `<circle cx="${x}" cy="${y}" r="3" fill="#FA8C16"/>`}).join('')}
      <polyline points="${pts(data1)}" fill="none" stroke="#4A90E2" stroke-width="2"/>
      ${data1.map((v,i)=>{const x=pad+(i/(data1.length-1))*(w-pad*2);const y=h-pad-(v/max)*(h-pad*2);return `<circle cx="${x}" cy="${y}" r="3" fill="#4A90E2"/><text x="${x}" y="${y-8}" text-anchor="middle" font-size="9" fill="#4A90E2">${v||''}</text>`}).join('')}
      ${labels.map((l,i)=>{const x=pad+(i/(labels.length-1))*(w-pad*2);return `<text x="${x}" y="${h-8}" text-anchor="middle" font-size="10" fill="#999">${l}</text>`}).join('')}
    </svg>`
}

function renderHourlyChart() {
  const { today, yesterday } = MOCK.hourlyElectric
  const labels = ['0时','2时','4时','6时','8时','10时','12时','14时','16时','18时','20时','22时','24时']
  const sample = (arr) => [0,2,4,6,8,10,12,14,16,18,20,22,24].map(h => arr[h] || 0)
  return renderLineChart(sample(today), sample(yesterday), labels)
}

function renderTypeDonutChart(types, colors) {
  const total = types.reduce((s, t) => s + t.value, 0)
  let offset = 0
  const r = 60, ir = 35, cx = 80, cy = 80
  const slices = types.map((t, i) => {
    const pct = t.value / total
    const angle = pct * 360
    const large = angle > 180 ? 1 : 0
    const start = offset; offset += angle
    const x1o = cx + r * Math.cos((start - 90) * Math.PI / 180), y1o = cy + r * Math.sin((start - 90) * Math.PI / 180)
    const x2o = cx + r * Math.cos((start + angle - 90) * Math.PI / 180), y2o = cy + r * Math.sin((start + angle - 90) * Math.PI / 180)
    const x1i = cx + ir * Math.cos((start + angle - 90) * Math.PI / 180), y1i = cy + ir * Math.sin((start + angle - 90) * Math.PI / 180)
    const x2i = cx + ir * Math.cos((start - 90) * Math.PI / 180), y2i = cy + ir * Math.sin((start - 90) * Math.PI / 180)
    return `<path d="M${x1o},${y1o} A${r},${r} 0 ${large},1 ${x2o},${y2o} L${x1i},${y1i} A${ir},${ir} 0 ${large},0 ${x2i},${y2i} Z" fill="${colors[i]}"/>`
  }).join('')
  return `<svg width="160" height="160" viewBox="0 0 160 160">${slices}</svg>`
}

function renderDonutChart() {
  return renderTypeDonutChart(MOCK.energyTypes, ['#4A90E2', '#13C2C2', '#52C41A', '#FAAD14', '#FA8C16', '#9254DE'])
}

function renderWaterDonutChart() {
  return renderTypeDonutChart(MOCK.waterTypes, ['#4A90E2', '#13C2C2', '#52C41A'])
}

function renderDataEnergyTypeSection() {
  const isElectric = state.dataEnergyTypeTab === 'electric'
  const types = isElectric ? MOCK.energyTypes : MOCK.waterTypes
  const colors = isElectric
    ? ['#4A90E2', '#13C2C2', '#52C41A', '#FAAD14', '#FA8C16', '#9254DE']
    : ['#4A90E2', '#13C2C2', '#52C41A']
  const unit = isElectric ? 'kwh' : 't'
  const typeLabel = isElectric ? '用电类型' : '用水类型'
  const amountLabel = isElectric ? '用电量' : '用水量'
  return `
    <div style="display:flex;align-items:center;gap:16px">
      ${renderTypeDonutChart(types, colors)}
      <div style="flex:1;font-size:12px">${types.map(t => `<div style="margin-bottom:4px">${t.name} ${t.value}${unit}</div>`).join('')}</div>
    </div>
    <table class="data-table"><tr><th>${typeLabel}</th><th>${amountLabel}</th><th>占比</th></tr>
      ${types.map(t => `<tr><td>${t.name}</td><td>${t.value}${unit}</td><td>${t.percent}</td></tr>`).join('')}
    </table>`
}

function renderProgressRing(percent, color, size = 72) {
  const r = (size - 10) / 2
  const cx = size / 2
  const cy = size / 2
  const stroke = 7
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - Math.min(percent, 100) / 100)
  return `
    <svg class="progress-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#E8EEF5" stroke-width="${stroke}"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
        stroke-dasharray="${circumference.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
        stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>
      <text x="${cx}" y="${cy + 1}" text-anchor="middle" dominant-baseline="middle"
        font-size="13" font-weight="700" fill="${color}">${percent}%</text>
    </svg>`
}

function renderPropertyCompletionSection() {
  const items = MOCK.propertyCompletionRates
  return `
    <div class="property-completion-banner">
      ${items.map(item => `
        <div class="property-completion-item">
          <div class="property-completion-ring">${renderProgressRing(item.rate, item.color, 68)}</div>
          <div class="property-completion-info">
            <div class="property-completion-type">${item.type}</div>
            <div class="property-completion-label">${item.label}</div>
          </div>
        </div>
      `).join('')}
    </div>`
}

function renderWaterTypeSection() {
  return `
    <div style="display:flex;align-items:center;gap:16px">
      ${renderWaterDonutChart()}
      <div style="flex:1;font-size:12px">${MOCK.waterTypes.map(t => `<div style="margin-bottom:4px">${t.name} ${t.value}t</div>`).join('')}</div>
    </div>
    <table class="data-table"><tr><th>用水类型</th><th>用水量</th><th>占比</th></tr>
      ${MOCK.waterTypes.map(t => `<tr><td>${t.name}</td><td>${t.value}t</td><td>${t.percent}</td></tr>`).join('')}
    </table>`
}

function renderMultiLineChart(lines, labels, colors) {
  const w = 320, h = 170, pad = 36
  const all = lines.flat()
  const max = Math.max(...all, 1)
  const pts = (arr) => arr.map((v, i) => {
    const x = pad + (i / (arr.length - 1)) * (w - pad * 2)
    const y = h - pad - (v / max) * (h - pad * 2)
    return `${x},${y}`
  }).join(' ')
  return `
    <svg width="100%" viewBox="0 0 ${w} ${h}" style="max-height:190px">
      ${lines.map((arr, li) => `
        <polyline points="${pts(arr)}" fill="none" stroke="${colors[li]}" stroke-width="2"/>
        ${arr.map((v, i) => {
          const x = pad + (i / (arr.length - 1)) * (w - pad * 2)
          const y = h - pad - (v / max) * (h - pad * 2)
          return `<circle cx="${x}" cy="${y}" r="3" fill="${colors[li]}"/>`
        }).join('')}
      `).join('')}
      ${labels.map((l, i) => {
        const x = pad + (i / (labels.length - 1)) * (w - pad * 2)
        return `<text x="${x}" y="${h - 10}" text-anchor="middle" font-size="10" fill="#999">${l}</text>`
      }).join('')}
    </svg>`
}

function renderHBarChart(values, labels, title) {
  const max = Math.max(...values, 1)
  return `
    <div class="hbar-chart">
      <div class="hbar-title">${title}</div>
      ${values.map((v, i) => `
        <div class="hbar-row">
          <span class="hbar-label">${labels[i]}</span>
          <div class="hbar-track"><div class="hbar-fill" style="width:${(v / max) * 100}%"></div></div>
          <span class="hbar-val">${v}</span>
        </div>`).join('')}
    </div>`
}

function renderSingleLineChart(data, labels, color, unit) {
  const w = 320, h = 170, pad = 36
  const max = Math.max(...data, 1)
  const minVal = Math.min(...data)
  const range = max - minVal || max
  const min = minVal - range * 0.1
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
    return `${x},${y}`
  }).join(' ')
  return `
    <svg width="100%" viewBox="0 0 ${w} ${h}" style="max-height:190px">
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5"/>
      ${data.map((v, i) => {
        const x = pad + (i / (data.length - 1)) * (w - pad * 2)
        const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
        return `<circle cx="${x}" cy="${y}" r="4" fill="${color}"/><text x="${x}" y="${y - 10}" text-anchor="middle" font-size="10" fill="${color}">${v}${unit || ''}</text>`
      }).join('')}
      ${labels.map((l, i) => {
        const x = pad + (i / (labels.length - 1)) * (w - pad * 2)
        return `<text x="${x}" y="${h - 10}" text-anchor="middle" font-size="10" fill="#999">${l}</text>`
      }).join('')}
    </svg>`
}

function renderBarChart(items, horizontal) {
  const max = Math.max(...items.map(i => i.value || i.count || i.area), 1)
  if (horizontal) {
    return items.map((item, idx) => {
      const val = item.area || item.value || item.count
      const pct = (val / max) * 100
      return `<div class="rank-row">
        <span class="rank-num ${idx === 0 ? 'gold' : ''}">${idx + 1}</span>
        <span class="rank-name">${item.name}</span>
        <div class="rank-bar-wrap"><div class="rank-bar ${idx === 0 ? 'orange' : ''}" style="width:${pct}%"></div></div>
        <span class="rank-val">${val.toLocaleString()}${item.area ? 'm²' : ''}</span>
      </div>`
    }).join('')
  }
  const w = 300, h = 140, pad = 24
  const barW = (w - pad * 2) / items.length - 8
  return `<svg width="100%" viewBox="0 0 ${w} ${h}" style="max-height:150px">
    ${items.map((item, i) => {
      const val = item.value || item.count
      const bh = ((val / max) * (h - pad * 2))
      const x = pad + i * ((w - pad * 2) / items.length) + 4
      const y = h - pad - bh
      return `<rect x="${x}" y="${y}" width="${barW}" height="${bh}" fill="${item.color || '#4A90E2'}" rx="3"/>
        <text x="${x + barW/2}" y="${y - 4}" text-anchor="middle" font-size="10" fill="#666">${val}</text>
        <text x="${x + barW/2}" y="${h - 6}" text-anchor="middle" font-size="9" fill="#999">${item.name}</text>`
    }).join('')}
  </svg>`
}

function renderMonthLineChart(data, color) {
  const labels = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
  return renderSingleLineChart(data, labels, color || '#4A90E2', '')
}

function renderDailyMenu() {
  const meal = state.menuMealType
  const items = MOCK.dailyMenus[meal] || []
  const mealLabel = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐' }[meal]
  return `
    <div class="menu-page">
      <div class="menu-info-box">
        <div>起止日期：（2025-03-10至2025-03-16）</div>
        <div>食堂名称：${state.currentProject.name}</div>
      </div>
      <div class="meal-tabs">
        <button class="meal-tab ${meal==='breakfast'?'active':''}" onclick="App.setMenuMealType('breakfast')">早餐</button>
        <button class="meal-tab ${meal==='lunch'?'active':''}" onclick="App.setMenuMealType('lunch')">午餐</button>
        <button class="meal-tab ${meal==='dinner'?'active':''}" onclick="App.setMenuMealType('dinner')">晚餐</button>
      </div>
      <div class="menu-table-wrap">
        <table class="menu-table">
          <thead><tr><th>日期</th><th>类别</th><th>品名</th><th>售价</th></tr></thead>
          <tbody>${items.map(i => `<tr><td>${i.day}</td><td>${i.category}</td><td>${i.name}</td><td>${i.price}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>`
}

/* ===== Auth Pages ===== */
function renderLogin() {
  const isPhone = state.loginMode === 'phone'
  return `
    <div class="auth-page">
      <div class="auth-logo">
        <div class="auth-logo-icon">${Icons.icon('building', { size: 48, color: '#4A90E2' })}</div>
        <div class="auth-logo-text">BLM Digital</div>
        <div class="auth-logo-sub">小程序</div>
      </div>
      <div class="auth-form">
        ${isPhone ? `
          <div class="auth-input-wrap"><input placeholder="请输入手机号" value="${state.loginForm.phone}" oninput="App.updateLoginField('phone',this.value)" /></div>
          <div class="auth-input-wrap" style="display:flex;gap:10px;align-items:center">
            <input style="flex:1" placeholder="请输入验证码" value="${state.loginForm.code}" oninput="App.updateLoginField('code',this.value)" />
            <button class="btn-code" onclick="App.showToast('验证码已发送')">获取验证码</button>
          </div>
        ` : `
          <div class="auth-input-wrap"><input placeholder="请输入账号" value="${state.loginForm.account}" oninput="App.updateLoginField('account',this.value)" /></div>
          <div class="auth-input-wrap"><input type="password" placeholder="请输入密码" value="${state.loginForm.password}" oninput="App.updateLoginField('password',this.value)" /></div>
        `}
        <div class="auth-links">
          <a onclick="App.openAuthPage('forgotPassword')">忘记密码</a>
          <a class="primary" onclick="App.openAuthPage('register')">注册账号</a>
        </div>
        <button class="btn-block btn-primary" onclick="App.doLogin()">登录</button>
        <button class="btn-block btn-outline" onclick="App.toggleLoginMode()">${isPhone ? '切换为账号密码登录' : '切换为手机号登录'}</button>
      </div>
    </div>`
}

function renderForgotPassword() {
  const f = state.forgotForm
  return `
    <div class="form-page">
      <div class="form-group"><label>登录账号</label><input placeholder="请输入" value="${f.account}" oninput="App.updateForgotField('account',this.value)" /></div>
      <div class="form-group">
        <label>手机号</label>
        <div class="input-with-btn">
          <input placeholder="请输入手机号" value="${f.phone}" oninput="App.updateForgotField('phone',this.value)" />
          <button class="btn-code" onclick="App.showToast('验证码已发送')">获取验证码</button>
        </div>
      </div>
      <div class="form-group"><label>手机验证码</label><input placeholder="请输入" value="${f.code}" oninput="App.updateForgotField('code',this.value)" /></div>
      <div class="form-group">
        <label>输入新密码</label>
        <div class="pwd-toggle"><input type="${state.showPwd.new1?'text':'password'}" placeholder="请输入" value="${f.password}" oninput="App.updateForgotField('password',this.value)" /><span class="pwd-eye" onclick="App.togglePwd('new1')">${state.showPwd.new1?'👁':'👁‍🗨'}</span></div>
        <div class="form-hint warn">密码需由6-20位数字+字母+特殊字符组成，且不可与上次密码一致</div>
      </div>
      <div class="form-group">
        <label>确认新密码</label>
        <div class="pwd-toggle"><input type="${state.showPwd.new2?'text':'password'}" placeholder="请输入" value="${f.confirm}" oninput="App.updateForgotField('confirm',this.value)" /><span class="pwd-eye" onclick="App.togglePwd('new2')">${state.showPwd.new2?'👁':'👁‍🗨'}</span></div>
        <div class="form-hint">请再次输入你设置的登录密码，两次输入请保持一致</div>
      </div>
      <button class="btn-block btn-primary" onclick="App.doForgotPassword()">确认</button>
    </div>`
}

function renderRegister() {
  const f = state.registerForm
  return `
    <div class="form-page">
      <div class="form-group"><label>登录账号</label><input placeholder="请输入" value="${f.account}" oninput="App.updateRegisterField('account',this.value)" /></div>
      <div class="form-group">
        <label>登录密码</label>
        <input type="password" placeholder="请输入" value="${f.password}" oninput="App.updateRegisterField('password',this.value)" />
        <div class="form-hint">密码需由6-20位数字+字母+特殊字符组成</div>
      </div>
      <div class="form-group">
        <label>确认密码</label>
        <input type="password" placeholder="请输入" value="${f.confirm}" oninput="App.updateRegisterField('confirm',this.value)" />
        <div class="form-hint">请再次输入你设置的登录密码，两次输入请保持一致</div>
      </div>
      <button class="btn-block btn-primary" style="margin-top:24px" onclick="App.doRegister()">注册</button>
    </div>`
}

function renderSelectProject() {
  return `
    <div class="select-project-page">
      <div class="select-welcome">欢迎使用<br/>BLM Digital 小程序</div>
      <div class="select-hint">检测到有多个项目，请选择一个项目进入</div>
      ${PROJECTS.map(p => `
        <div class="project-card ${state.selectedProjectId === p.id ? 'selected' : ''}" onclick="App.selectProjectCard('${p.id}')">
          <div class="project-card-icon">${Icons.icon('building', { size: 32, color: '#4A90E2' })}</div>
          <div class="project-card-info">
            <div class="project-card-name">${p.name}</div>
            <div class="project-card-meta">${p.code}　项目成员(${p.members})</div>
          </div>
        </div>
      `).join('')}
      <div class="select-enter">
        <button class="btn-block btn-primary" onclick="App.enterApp()">进入</button>
      </div>
    </div>`
}

/* ===== Main Pages ===== */
function renderHome() {
  const d = pd()
  return `
    <div class="home-header">
      <div class="project-switcher" onclick="App.toggleProjectPicker(true)">
        ${Icons.icon('location', { size: 18, color: '#4A90E2' })}<span class="project-name">${state.currentProject.name}</span><span class="arrow">▼</span>
      </div>
      <div class="header-icon-btn notify-btn" onclick="App.openSubPage('notifications')">
        ${Icons.icon('notify', { size: 22, color: '#333' })}${unreadNotifications() ? `<span class="badge">${unreadNotifications()}</span>` : ''}
      </div>
    </div>
    <div class="carousel-wrap">
      <div class="carousel-track" style="transform:translateX(-${state.carouselIndex * 100}%)">
        ${MOCK.carouselList.map(c => `<div class="carousel-slide"><img src="${c.image}" alt=""/><div class="carousel-caption">${c.title}</div></div>`).join('')}
      </div>
      <div class="carousel-dots">${MOCK.carouselList.map((_,i)=>`<span class="carousel-dot ${i===state.carouselIndex?'active':''}" onclick="App.goCarousel(${i})"></span>`).join('')}</div>
    </div>
    <div class="page-body">
      ${renderHomeOverview(d.homeOverview)}
      <div class="card">
        <div class="card-title"><span>资产管理</span><span class="more" onclick="App.openAssetData('space')">查看更多 ›</span></div>
        <div class="energy-icon-grid">
          <div class="energy-icon-item" onclick="App.openAssetData('space')">
            <div class="energy-icon-graph">${Icons.icon('space', { size: 32, color: '#4A90E2' })}</div>
            <div class="energy-icon-name">空间</div>
          </div>
          <div class="energy-icon-item" onclick="App.openAssetData('equipment')">
            <div class="energy-icon-graph">${Icons.icon('equipment', { size: 32, color: '#52C41A' })}</div>
            <div class="energy-icon-name">设备</div>
          </div>
        </div>
      </div>
      <div class="card"><div class="card-title">物业管理</div>
        <div class="icon-grid cols-4">${MOCK.propertyManagement.map(p=>`
          <div class="icon-item" onclick="${p.id==='myorder'?"App.openSubPage('workorder')":p.id==='repair'||p.id==='maintain'||p.id==='inspect'?"App.openWorkOrderList('"+p.id+"')":"App.showToast('"+p.name+"')"}">${Icons.propertyIcon(p)}<div class="icon-name">${p.name}</div></div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-title"><span>能源管理</span><span class="more" onclick="App.openEnergyData('electric')">查看更多 ›</span></div>
        <div class="energy-icon-grid">
          <div class="energy-icon-item" onclick="App.openEnergyData('water')">
            <div class="energy-icon-graph">${Icons.icon('water', { size: 32, color: '#13C2C2' })}</div>
            <div class="energy-icon-name">用水</div>
          </div>
          <div class="energy-icon-item" onclick="App.openEnergyData('electric')">
            <div class="energy-icon-graph">${Icons.icon('electric', { size: 32, color: '#FA8C16' })}</div>
            <div class="energy-icon-name">用电</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">食堂管理</div>
        <div class="icon-grid cols-3">
          <div class="icon-item" onclick="App.openSubPage('smartCardData')">
            <div class="icon-graph">${Icons.icon('smartcard', { size: 32, color: '#4A90E2' })}</div><div class="icon-name">智慧卡</div>
          </div>
          <div class="icon-item" onclick="App.openSubPage('canteenOpsData')">
            <div class="icon-graph">${Icons.icon('canteen-ops', { size: 32, color: '#FA8C16' })}</div><div class="icon-name">食堂运营</div>
          </div>
          <div class="icon-item" onclick="App.openSubPage('canteenSupervisionData')">
            <div class="icon-graph">${Icons.icon('canteen-supervision', { size: 32, color: '#52C41A' })}</div><div class="icon-name">食堂监管</div>
          </div>
        </div>
      </div>
    </div>`
}

function renderCollab() {
  return `
    <div class="sub-header"><div class="sub-header-title">协作中心</div><div class="sub-header-desc">工单与消息</div></div>
    <div class="page-body"><div class="collab-grid cols-2">
      <div class="collab-icon-item" onclick="App.openSubPage('workorder')">
        ${activeWorkOrders()?`<span class="badge">${activeWorkOrders()}</span>`:''}
        <div class="collab-icon-box">${Icons.icon('workorder', { size: 40, color: '#4A90E2' })}</div><div class="collab-icon-name">我的工单</div>
      </div>
      <div class="collab-icon-item" onclick="App.openSubPage('messages')">
        ${unreadMessages()?`<span class="badge">${unreadMessages()}</span>`:''}
        <div class="collab-icon-box">${Icons.icon('message', { size: 40, color: '#13C2C2' })}</div><div class="collab-icon-name">我的消息</div>
      </div>
    </div></div>`
}

function renderData() {
  const d = pd()
  const assetTypes = state.assetTypeTab === 'space' ? MOCK.assetSpaceTypes : MOCK.assetEquipmentTypes
  const assetTotal = assetTypes.reduce((s, t) => s + t.count, 0)
  return `
    <div class="sub-header"><div class="sub-header-title">数据统计</div><div class="sub-header-desc">${state.currentProject.name}</div></div>
    <div class="page-body">
      <div class="module-section">
        <div class="module-section-title"><span class="module-section-icon asset">●</span>资产管理</div>
        <div class="card">
          <div class="chart-card-header">
            <span class="chart-card-title">资产类型分布</span>
            <div class="toggle-group">
              <button class="toggle-btn ${state.assetTypeTab==='space'?'active':''}" onclick="App.setAssetTypeTab('space')">空间</button>
              <button class="toggle-btn ${state.assetTypeTab==='equipment'?'active':''}" onclick="App.setAssetTypeTab('equipment')">设备</button>
            </div>
          </div>
          <div class="pie-wrap">${renderPieChart(assetTypes, assetTotal)}<div class="pie-center">${state.assetTypeTab==='space'?'总面积':'设备总数'}<strong>${state.assetTypeTab==='space'?d.assetManagement.spaceTotal:d.assetManagement.equipmentTotal}</strong></div></div>
          <div class="chart-legend-wrap">${assetTypes.map(t=>`<span class="legend-tag"><span style="color:${t.color}">●</span>${t.name} ${t.count}</span>`).join('')}</div>
        </div>
      </div>
      <div class="module-section">
        <div class="module-section-title"><span class="module-section-icon property">●</span>物业管理</div>
        <div class="card property-completion-card">
          <div class="chart-card-title" style="margin-bottom:12px">本月工单完成率</div>
          ${renderPropertyCompletionSection()}
        </div>
      </div>
      <div class="module-section">
        <div class="module-section-title"><span class="module-section-icon energy">●</span>能源管理</div>
        <div class="card">
          <div class="chart-card-header">
            <span class="chart-card-title">能源类型统计</span>
            <div class="toggle-group">
              <button class="toggle-btn ${state.dataEnergyTypeTab==='electric'?'active':''}" onclick="App.setDataEnergyTypeTab('electric')">用电</button>
              <button class="toggle-btn ${state.dataEnergyTypeTab==='water'?'active':''}" onclick="App.setDataEnergyTypeTab('water')">用水</button>
            </div>
          </div>
          ${renderDataEnergyTypeSection()}
        </div>
      </div>
      <div class="module-section">
        <div class="module-section-title"><span class="module-section-icon canteen">●</span>食堂管理</div>
        <div class="card">
          <div class="chart-card-header">
            <span class="chart-card-title">当周营销统计</span>
            <div class="toggle-group">
              <button class="toggle-btn ${state.canteenMarketingType==='people'?'active':''}" onclick="App.setCanteenMarketingType('people')">人数</button>
              <button class="toggle-btn ${state.canteenMarketingType==='amount'?'active':''}" onclick="App.setCanteenMarketingType('amount')">金额</button>
            </div>
          </div>
          ${state.canteenMarketingType==='amount'
            ? renderSingleLineChart(MOCK.weeklyMarketing.amount, MOCK.weeklyMarketing.days, '#FAAD14', '元')
            : renderLineChart(MOCK.weeklyMarketing.recharge, MOCK.weeklyMarketing.swipe, MOCK.weeklyMarketing.days)}
        </div>
      </div>
    </div>`
}

function renderMine() {
  const u = MOCK.userProfile
  return `
    <div class="profile-header">
      <div class="avatar">${u.name[0]}</div>
      <div>
        <div class="profile-name">${u.name}</div>
        <div class="profile-sub">${state.currentProject.name} · ${u.department}</div>
        <div class="profile-role">${u.role}</div>
      </div>
    </div>
    <div class="page-body">
      <div class="mine-menu-group">
        <div class="mine-menu-item" onclick="App.openSubPage('profile')"><span class="mine-menu-icon">${Icons.icon('edit', { size: 20, color: '#666' })}</span><span class="mine-menu-name">编辑资料</span><span class="chevron">›</span></div>
        <div class="mine-menu-item" onclick="App.openSubPage('changePassword')"><span class="mine-menu-icon">${Icons.icon('lock', { size: 20, color: '#666' })}</span><span class="mine-menu-name">修改密码</span><span class="chevron">›</span></div>
        <div class="mine-menu-item" onclick="App.openSubPage('contacts')"><span class="mine-menu-icon">${Icons.icon('contacts', { size: 20, color: '#666' })}</span><span class="mine-menu-name">通讯录</span><span class="chevron">›</span></div>
      </div>
      <button class="btn-logout" onclick="App.logout()">退出登录</button>
    </div>`
}

function renderCanteenData() {
  const c = pd().canteen
  const wm = MOCK.weeklyMarketing
  const personnelData = state.canteenPersonnelType === 'dept' ? MOCK.canteenDepts : MOCK.canteenPersonnelNature
  const personnelTotal = personnelData.reduce((s, d) => s + d.count, 0)
  return `
    <div class="data-overview-page">
      <div class="seg-tabs">
        <div class="seg-tab ${state.canteenTab==='dashboard'?'active':''}" onclick="App.setCanteenTab('dashboard')">数据看板</div>
        <div class="seg-tab ${state.canteenTab==='menu'?'active':''}" onclick="App.setCanteenTab('menu')">每日菜谱</div>
      </div>
      ${state.canteenTab==='dashboard' ? `
        <div class="kpi-row">
          <div class="kpi-item"><div class="kpi-val blue">${c.purchaseTotal}</div><div class="kpi-label">采购订单总金额(元)</div></div>
          <div class="kpi-item"><div class="kpi-val orange">${c.inventory}</div><div class="kpi-label">食堂库存总数</div></div>
          <div class="kpi-item"><div class="kpi-val orange">${c.guestReserve}</div><div class="kpi-label">客饭预定数</div></div>
          <div class="kpi-item"><div class="kpi-val orange">${c.onlineReserve}</div><div class="kpi-label">线上预定数</div></div>
        </div>
        <div class="chart-card">
          <div class="chart-card-header">
            <span class="chart-card-title">持卡人员年度统计</span>
            <div class="toggle-group">
              <button class="toggle-btn ${state.canteenPersonnelType==='dept'?'active':''}" onclick="App.setCanteenPersonnelType('dept')">部门</button>
              <button class="toggle-btn ${state.canteenPersonnelType==='nature'?'active':''}" onclick="App.setCanteenPersonnelType('nature')">人员性质</button>
            </div>
          </div>
          <div class="pie-wrap">${renderPieChart(personnelData, personnelTotal)}<div class="pie-center">人员总数<strong>${c.personnel}</strong></div></div>
          <div class="chart-legend-wrap">${personnelData.map(d=>`<span class="legend-tag"><span style="color:${d.color}">●</span>${d.name} ${d.count}人</span>`).join('')}</div>
        </div>
        <div class="chart-card">
          <div class="chart-card-title" style="margin-bottom:12px">当日食堂监测状态</div>
          <div class="monitor-row">
            <div class="monitor-item"><div class="mon-label">三清三关</div><div class="status-pass">通过</div></div>
            <div class="monitor-item"><div class="mon-label">留样菜监测</div><div class="status-pass">通过</div></div>
            <div class="monitor-item"><div class="mon-label">晨检结果</div><div class="status-pass">通过</div></div>
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-card-header">
            <span class="chart-card-title">食堂当周营销统计</span>
            <div class="toggle-group">
              <button class="toggle-btn ${state.canteenMarketingType==='people'?'active':''}" onclick="App.setCanteenMarketingType('people')">人数</button>
              <button class="toggle-btn ${state.canteenMarketingType==='amount'?'active':''}" onclick="App.setCanteenMarketingType('amount')">金额</button>
            </div>
          </div>
          ${state.canteenMarketingType==='amount' ? `
            <div class="chart-legend"><span class="legend-item"><span class="legend-dot" style="background:#FAAD14"></span>消费金额</span></div>
            ${renderSingleLineChart(wm.amount, wm.days, '#FAAD14', '元')}
          ` : `
            <div class="chart-legend">
              <span class="legend-item"><span class="legend-dot blue"></span>充值人数</span>
              <span class="legend-item"><span class="legend-dot orange"></span>刷卡人数</span>
            </div>
            ${renderLineChart(wm.recharge, wm.swipe, wm.days)}
          `}
        </div>
      ` : renderDailyMenu()}
    </div>`
}

function renderAssetData() {
  const d = pd()
  const isSpace = state.assetTypeTab === 'space'
  const types = isSpace ? MOCK.assetSpaceTypes : MOCK.assetEquipmentTypes
  const total = types.reduce((s, t) => s + t.count, 0)
  return `
    <div class="data-overview-page">
      <div class="chart-card" style="margin-top:12px">
        <div class="chart-card-header">
          <span class="chart-card-title">按资产类型统计</span>
          <div class="toggle-group">
            <button class="toggle-btn ${isSpace?'active':''}" onclick="App.setAssetTypeTab('space')">空间</button>
            <button class="toggle-btn ${!isSpace?'active':''}" onclick="App.setAssetTypeTab('equipment')">设备</button>
          </div>
        </div>
        ${isSpace ? `<div class="asset-area-label">总面积 | ${d.assetManagement.spaceTotal}</div>` : `<div class="asset-area-label">设备总数 | ${d.assetManagement.equipmentTotal}</div>`}
        <div class="pie-wrap">${renderPieChart(types, total)}<div class="pie-center">${isSpace?'总面积':'设备数'}<strong>${isSpace?d.assetManagement.spaceArea:d.assetManagement.equipmentTotal}</strong></div></div>
        <div class="chart-legend-wrap">${types.map(t=>`<span class="legend-tag"><span style="color:${t.color}">●</span>${t.name}</span>`).join('')}</div>
      </div>
      <div class="chart-card">
        <div class="chart-card-title" style="margin-bottom:12px">按项目统计空间建筑面积排行榜</div>
        ${renderBarChart(MOCK.spaceRanking, true)}
      </div>
      <div class="chart-card">
        <div class="chart-card-title" style="margin-bottom:8px">设施故障统计</div>
        ${renderMonthLineChart(MOCK.facilityFailures, '#4A90E2')}
      </div>
    </div>`
}

function getSmartCardPeriodData() {
  return MOCK.smartCard.periods[state.smartCardPeriod] || MOCK.smartCard.periods.week
}

const SMART_CARD_KPI_LABELS = {
  today: { swipe: '当日刷卡人次', amount: '当日消费金额', perCapita: '人均消费', compare: '较昨日' },
  week: { swipe: '本周刷卡人次', amount: '本周消费金额', perCapita: '人均消费', compare: '较上周' },
  month: { swipe: '本月刷卡人次', amount: '本月消费金额', perCapita: '人均消费', compare: '较上月' },
  year: { swipe: '本年刷卡人次', amount: '本年消费金额', perCapita: '人均消费', compare: '较去年' }
}

const SMART_CARD_PERIOD_OPTIONS = [
  { id: 'today', label: '当日' },
  { id: 'week', label: '本周' },
  { id: 'month', label: '本月' },
  { id: 'year', label: '本年' }
]

function renderSmartCardData() {
  const pd = getSmartCardPeriodData()
  const labels = SMART_CARD_KPI_LABELS[state.smartCardPeriod] || SMART_CARD_KPI_LABELS.week
  const isPeople = state.smartCardTrendType === 'people'
  const trend = isPeople ? pd.peopleTrend : pd.amountTrend
  const legend = isPeople
    ? [['#52C41A', '充值人数'], ['#13C2C2', '刷卡人数'], ['#4A90E2', '消费人数']]
    : [['#52C41A', '充值金额'], ['#13C2C2', '刷卡金额'], ['#4A90E2', '消费金额']]
  const amountVal = pd.amount.toLocaleString()
  return `
    <div class="data-overview-page" style="padding:12px">
      <div class="kpi-cards-row">
        <div class="kpi-card">
          <div class="kpi-card-top"><span>${labels.swipe}</span><span class="kpi-icon">${Icons.icon('user', { size: 16, color: '#999' })}</span></div>
          <div class="kpi-card-val">${pd.swipe.toLocaleString()}</div>
          <div class="kpi-card-trend up">↑ ${pd.trend} ${labels.compare}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-card-top"><span>${labels.amount}</span><span class="kpi-icon">${Icons.icon('smartcard', { size: 16, color: '#999' })}</span></div>
          <div class="kpi-card-val">${amountVal}</div>
          <div class="kpi-card-trend up">↑ ${pd.trend} ${labels.compare}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-card-top"><span>${labels.perCapita}</span><span class="kpi-icon">${Icons.icon('tab-data', { size: 16, color: '#999' })}</span></div>
          <div class="kpi-card-val">${pd.perCapita}元</div>
          <div class="kpi-card-trend up">↑ ${pd.trend} ${labels.compare}</div>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-card-header">
          <span class="chart-card-title">消费趋势分析</span>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <div class="period-tabs">
              ${SMART_CARD_PERIOD_OPTIONS.map(o => `
                <button class="period-tab ${state.smartCardPeriod === o.id ? 'active' : ''}" onclick="App.setSmartCardPeriod('${o.id}')">${o.label}</button>
              `).join('')}
            </div>
            <div class="toggle-group">
              <button class="toggle-btn ${isPeople?'active':''}" onclick="App.setSmartCardTrendType('people')">按人次</button>
              <button class="toggle-btn ${!isPeople?'active':''}" onclick="App.setSmartCardTrendType('amount')">按金额</button>
            </div>
          </div>
        </div>
        <div class="chart-legend">
          ${legend.map(([color, name]) => `<span class="legend-item"><span class="legend-dot" style="background:${color}"></span>${name}</span>`).join('')}
        </div>
        ${renderMultiLineChart([trend.line1, trend.line2, trend.line3], trend.labels, ['#52C41A', '#13C2C2', '#4A90E2'])}
      </div>
    </div>`
}

function renderCanteenOpsData() {
  const g = MOCK.weeklyMenuGrid
  const top = MOCK.canteenTop5
  const mealOptions = ['', '早餐', '中餐', '晚餐']
  const mealLabels = ['请选择', '早餐', '中餐', '晚餐']
  const filteredDetail = state.canteenOpsMealFilter
    ? MOCK.canteenOpsDetail.filter(r => r.meal === state.canteenOpsMealFilter)
    : MOCK.canteenOpsDetail
  return `
    <div class="data-overview-page" style="padding:12px">
      <div class="kpi-cards-row cols-4">
        ${MOCK.canteenOpsKpi.map(k => `
          <div class="kpi-card small">
            <div class="kpi-card-top"><span>${k.label}</span></div>
            <div class="kpi-card-val">${k.value}</div>
            <div class="kpi-card-trend up">↑ ${k.trend} 较昨日</div>
          </div>`).join('')}
      </div>
      <div class="chart-card">
        <div class="chart-card-header">
          <span class="chart-card-title">运营明细</span>
          <div class="ops-filters">
            <select class="select-sm" onchange="App.setCanteenOpsMealFilter(this.value)">
              ${mealOptions.map((m, i) => `<option value="${m}" ${state.canteenOpsMealFilter === m ? 'selected' : ''}>餐段：${mealLabels[i]}</option>`).join('')}
            </select>
            <input class="date-range-input" placeholder="开始日期 - 结束日期" readonly />
          </div>
        </div>
        <div class="table-scroll">
          <table class="data-table full">
            <tr><th>序号</th><th>预定日期</th><th>餐段</th><th>所属办公点</th><th>就餐人数</th><th>预定数量</th><th>实际就餐数</th></tr>
            ${filteredDetail.map((r, i) => `<tr><td>${i + 1}</td><td>${r.date}</td><td>${r.meal}</td><td>${r.location}</td><td>${r.diners}</td><td>${r.reserved}</td><td>${r.actual}</td></tr>`).join('')}
          </table>
        </div>
        <div class="pagination">‹ 1 2 3 4 5 6 ... 100 ›</div>
      </div>
      <div class="dual-chart-row">
        ${renderHBarChart(top.actual, top.days, '实际就餐数TOP5')}
        ${renderHBarChart(top.reserve, top.days, '预订数TOP5')}
      </div>
      <div class="chart-card">
        <div class="chart-card-header">
          <span class="chart-card-title">本周菜谱管理</span>
          <span class="week-nav">‹ ${g.week} ›</span>
        </div>
        <div class="table-scroll">
          <table class="menu-grid-table">
            <tr><th>餐段</th>${g.days.map(d => `<th>${d.replace('\n', '<br/>')}</th>`).join('')}</tr>
            <tr><td>早餐</td>${g.breakfast.map(c => `<td>${c}</td>`).join('')}</tr>
            <tr><td>午餐</td>${g.lunch.map(c => `<td>${c}</td>`).join('')}</tr>
            <tr><td>晚餐</td>${g.dinner.map(c => `<td>${c}</td>`).join('')}</tr>
          </table>
        </div>
      </div>
    </div>`
}

function renderCanteenSupervisionData() {
  return `
    <div class="data-overview-page" style="padding:12px">
      <div class="supervision-cards">
        <div class="supervision-card pass"><div class="sup-icon green">${Icons.icon('canteen-supervision', { size: 18, color: '#fff' })}</div><div class="sup-label">三清三关状态</div><div class="sup-status">通过</div></div>
        <div class="supervision-card pass"><div class="sup-icon yellow">${Icons.icon('canteen-supervision', { size: 18, color: '#fff' })}</div><div class="sup-label">留样菜监测</div><div class="sup-status">通过</div></div>
        <div class="supervision-card pass"><div class="sup-icon green">${Icons.icon('canteen-supervision', { size: 18, color: '#fff' })}</div><div class="sup-label">晨检结果</div><div class="sup-status">通过</div></div>
      </div>
      <div class="chart-card">
        <div class="supervision-search">
          <label>日期区间</label>
          <input class="date-range-input" placeholder="开始日期 - 结束日期" readonly />
          <button class="btn-search" onclick="App.showToast('搜索完成')">${Icons.icon('search', { size: 14, color: '#fff' })} 搜索</button>
          <button class="btn-clear" onclick="App.showToast('已清空')">清空</button>
        </div>
        <div class="table-scroll">
          <table class="data-table full">
            <tr><th>序号</th><th>三清三关状态</th><th>留样菜监测</th><th>晨检结果</th><th>时间</th></tr>
            ${MOCK.supervisionRecords.map((r, i) => `<tr><td>${i + 1}</td><td class="status-pass">${r.threeClean}</td><td class="status-pass">${r.sample1}</td><td class="status-pass">${r.morning}</td><td>${r.time}</td></tr>`).join('')}
          </table>
        </div>
        <div class="pagination">‹ 1 2 3 4 5 6 ... 100 ›</div>
      </div>
    </div>`
}

function renderEnergyData() {
  const e = pd().energy
  const isElectric = state.energyTab === 'electric'
  return `
    <div class="data-overview-page">
      <div class="seg-tabs">
        <div class="seg-tab ${isElectric?'active':''}" onclick="App.setEnergyTab('electric')">用电</div>
        <div class="seg-tab ${!isElectric?'active':''}" onclick="App.setEnergyTab('water')">用水</div>
      </div>
      <div class="chart-card">
        <div class="chart-card-header">
          <span class="chart-card-title">${isElectric?'今日截止当前用电':'今日截止当前用水'}</span>
          <div class="filter-group">
            <button class="filter-btn ${state.energyTimeFilter==='today'?'active':''}" onclick="App.setEnergyFilter('today')">今天</button>
            <button class="filter-btn ${state.energyTimeFilter==='month'?'active':''}" onclick="App.setEnergyFilter('month')">月度</button>
            <button class="filter-btn ${state.energyTimeFilter==='year'?'active':''}" onclick="App.setEnergyFilter('year')">年度</button>
          </div>
        </div>
        <div class="energy-summary">
          <div><div class="energy-big">${isElectric?e.todayElectric.toLocaleString():'12.5'} <span>${isElectric?'kwh':'t'}</span></div></div>
          <div class="energy-compare">较昨日<br/><span class="up">▲ ${e.compareYesterday||'+10%'}</span></div>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-card-title" style="margin-bottom:8px">逐时${isElectric?'用电':'用水'}趋势对比</div>
        <div class="chart-legend">
          <span class="legend-item"><span class="legend-dot blue"></span>今日</span>
          <span class="legend-item"><span class="legend-dot orange"></span>昨日</span>
        </div>
        ${renderHourlyChart()}
      </div>
      ${isElectric ? `
        <div class="chart-card">
          <div class="chart-card-title" style="margin-bottom:12px">用电类型统计</div>
          <div style="display:flex;align-items:center;gap:16px">
            ${renderDonutChart()}
            <div style="flex:1;font-size:11px">${MOCK.energyTypes.map(t=>`<div style="margin-bottom:4px">${t.name} ${t.value}kwh</div>`).join('')}</div>
          </div>
          <table class="data-table"><tr><th>用电类型</th><th>用电量</th><th>占比</th></tr>
            ${MOCK.energyTypes.map(t=>`<tr><td>${t.name}</td><td>${t.value}</td><td>${t.percent}</td></tr>`).join('')}
          </table>
        </div>` : `<div class="chart-card"><div class="chart-card-title" style="margin-bottom:12px">用水类型统计</div>${renderWaterTypeSection()}</div>`}
    </div>`
}

function renderContacts() {
  const list = state.contacts.filter(c => !state.contactSearch || c.name.includes(state.contactSearch) || c.department.includes(state.contactSearch))
  return `
    <div class="search-box"><input placeholder="搜索姓名或部门" value="${state.contactSearch}" oninput="App.onContactSearch(this.value)" /></div>
    <div class="contacts-header"><span style="font-size:14px;color:#666">共 ${list.length} 人</span><button class="btn-add-contact" onclick="App.openContactModal()">+ 添加</button></div>
    <div class="page-body">${list.length ? list.map(c => `
      <div class="contact-row">
        <div class="contact-avatar">${c.name[0]}</div>
        <div class="contact-info"><div class="contact-name">${c.name}</div><div class="contact-dept">${c.department} · ${c.phone}</div></div>
        <div class="contact-actions">
          <button class="contact-action-btn edit" onclick="event.stopPropagation();App.openContactModal(${c.id})">编辑</button>
          <button class="contact-action-btn delete" onclick="event.stopPropagation();App.deleteContact(${c.id})">删除</button>
        </div>
      </div>`).join('') : '<div class="empty">未找到联系人</div>'}
    </div>`
}

function renderProfile() {
  const u = MOCK.userProfile
  return `<div class="page-body" style="padding-top:12px"><div class="card profile-detail">
    <div class="info-row"><span class="info-label">姓名</span><span class="info-value">${u.name}</span></div>
    <div class="info-row"><span class="info-label">工号</span><span class="info-value">${u.employeeId}</span></div>
    <div class="info-row"><span class="info-label">手机号</span><span class="info-value">${u.phone}</span></div>
    <div class="info-row"><span class="info-label">所属项目园区</span><span class="info-value">${state.currentProject.name}</span></div>
    <div class="info-row"><span class="info-label">所属部门</span><span class="info-value">${u.department}</span></div>
    <div class="info-row"><span class="info-label">岗位角色</span><span class="info-value">${u.role}</span></div>
  </div></div>`
}

function renderChangePassword() {
  return `<div class="form-page" style="background:#F5F6FA;padding-top:20px">
    <div class="form-group"><label>原密码</label><input type="password" placeholder="请输入原密码" /></div>
    <div class="form-group"><label>新密码</label><input type="password" placeholder="请输入新密码" /><div class="form-hint warn">密码需由6-20位数字+字母+特殊字符组成</div></div>
    <div class="form-group"><label>确认新密码</label><input type="password" placeholder="请再次输入新密码" /></div>
    <button class="btn-block btn-primary" onclick="App.showToast('密码修改成功');App.closeSubPage()">确认修改</button>
  </div>`
}

function renderNotifications() {
  return `<div class="page-body" style="padding-top:12px">${state.notifications.map(n=>`
    <div class="list-card ${!n.read?'unread-notify':''}" onclick="App.markNotificationRead(${n.id})">
      <div class="list-card-header"><span class="list-card-title">${Icons.icon('notify', { size: 16, color: '#4A90E2' })} ${n.title}</span><span class="list-card-time">${n.time}</span></div>
      <div class="list-card-desc">${n.content}</div>
    </div>`).join('')}</div>`
}

function renderTodo() {
  const tabCounts = {
    initiated: MOCK.todos.filter(t => t.tab === 'initiated').length,
    todo: MOCK.todos.filter(t => t.tab === 'todo').length,
    done: MOCK.todos.filter(t => t.tab === 'done').length
  }
  return renderCollabPage({
    mainTab: state.todoMainTab,
    filter: state.todoFilter,
    mainTabKey: 'todo',
    filterKey: 'todo',
    items: MOCK.todos,
    tabCounts
  })
}

function renderWorkorder() {
  const tabCounts = {
    initiated: MOCK.myWorkOrders.filter(t => t.tab === 'initiated').length,
    todo: MOCK.myWorkOrders.filter(t => t.tab === 'todo').length,
    done: MOCK.myWorkOrders.filter(t => t.tab === 'done').length
  }
  return renderCollabPage({
    mainTab: state.workOrderMainTab,
    filter: state.workOrderFilter,
    mainTabKey: 'workorder',
    filterKey: 'workorder',
    items: MOCK.myWorkOrders,
    tabCounts
  })
}

function renderWorkOrderList() {
  const cat = state.workOrderListCategory
  const filtered = MOCK.workOrderList.filter(w => {
    if (w.category !== cat) return false
    if (state.workOrderListFilter === '全部') return true
    return w.status === state.workOrderListFilter || w.status.includes(state.workOrderListFilter.replace('待', ''))
  })
  return `
    <div class="collab-page wo-list-page">
      <div class="wo-category-tabs">
        ${MOCK.workOrderCategories.map(c => `
          <div class="wo-cat-tab ${cat===c.key?'active':''}" onclick="App.setWorkOrderListCategory('${c.key}')">${c.name}(${c.count})</div>`).join('')}
      </div>
      <div class="collab-filters scroll">${MOCK.workOrderStatusFilters.map(f => `
        <button class="collab-filter ${state.workOrderListFilter===f?'active':''}" onclick="App.setWorkOrderListFilter('${f}')">${f}</button>`).join('')}
      </div>
      <div class="wo-list">${filtered.length ? filtered.map(renderWorkOrderCard).join('') : '<div class="empty">暂无工单</div>'}</div>
    </div>`
}

function renderMessages() {
  const all = state.messages.filter(m => !/会议|访客申请/.test(m.category + m.content))
  const readCount = all.filter(m => m.read).length
  const unreadCount = all.filter(m => !m.read).length
  let list = all
  if (state.messageTab === 'read') list = all.filter(m => m.read)
  if (state.messageTab === 'unread') list = all.filter(m => !m.read)
  if (state.messageSearch) {
    const q = state.messageSearch.toLowerCase()
    list = list.filter(m => m.category.includes(q) || m.content.includes(q))
  }
  return `
    <div class="message-page">
      <div class="msg-search-bar">
        <div class="msg-search-input">
          <span class="search-icon search-icon-wrap">${Icons.icon('search', { size: 16, color: '#999' })}</span>
          <input placeholder="输入消息标题、内容检索" value="${state.messageSearch}" oninput="App.setMessageSearch(this.value)" />
        </div>
        <button class="msg-search-btn" onclick="App.showToast('搜索完成')">搜索</button>
      </div>
      <div class="msg-tabs">
        <div class="msg-tab ${state.messageTab==='all'?'active':''}" onclick="App.setMessageTab('all')">全部<span class="tab-badge blue">${all.length}</span></div>
        <div class="msg-tab ${state.messageTab==='read'?'active':''}" onclick="App.setMessageTab('read')">已读<span class="tab-badge blue">${readCount}</span></div>
        <div class="msg-tab ${state.messageTab==='unread'?'active':''}" onclick="App.setMessageTab('unread')">未读<span class="tab-badge red">${unreadCount || '-'}</span></div>
        <span class="msg-tab-icon">⏳</span>
      </div>
      <div class="msg-action-row"><button class="btn-mark-all" onclick="App.markAllMessagesRead()">全部已读</button></div>
      <div class="msg-list">
        ${list.length ? list.map(m => `
          <div class="msg-card ${!m.read?'unread':''}" onclick="App.markMessageRead(${m.id})">
            <div class="msg-card-top">
              <span class="msg-cat-tag">${m.category}</span>
              <span class="msg-card-time">${m.time}</span>
              <span class="msg-read-tag ${m.read?'read':'unread'}">${m.read?'已读':'未读'}</span>
            </div>
            <div class="msg-card-content">${m.content}</div>
          </div>`).join('') : '<div class="empty">暂无消息</div>'}
        <div class="msg-footer">没有更多了<br/>${list.length ? '' : '暂无消息'}</div>
      </div>
    </div>`
}

const SUB_RENDERERS = {
  notifications: renderNotifications, todo: renderTodo, workorder: renderWorkorder, workOrderList: renderWorkOrderList, messages: renderMessages,
  contacts: renderContacts, profile: renderProfile, changePassword: renderChangePassword,
  canteenData: renderCanteenData, energyData: renderEnergyData, assetData: renderAssetData,
  smartCardData: renderSmartCardData, canteenOpsData: renderCanteenOpsData, canteenSupervisionData: renderCanteenSupervisionData,
  forgotPassword: renderForgotPassword, register: renderRegister
}

const TAB_RENDERERS = { home: renderHome, collab: renderCollab, data: renderData, mine: renderMine }

function render() {
  const screen = document.getElementById('screen')
  const navBar = document.getElementById('nav-bar')
  const tabBar = document.getElementById('tab-bar')
  const statusBar = document.getElementById('status-bar')
  const navTitle = document.getElementById('nav-title')

  if (state.authPhase === 'login') {
    statusBar.classList.add('hidden')
    tabBar.classList.add('hidden')
    if (state.currentSubPage === 'forgotPassword' || state.currentSubPage === 'register') {
      navBar.classList.remove('hidden')
      navTitle.textContent = SUB_TITLES[state.currentSubPage]
      screen.innerHTML = SUB_RENDERERS[state.currentSubPage]()
    } else {
      navBar.classList.add('hidden')
      screen.innerHTML = renderLogin()
    }
    return
  }

  if (state.authPhase === 'selectProject') {
    statusBar.classList.remove('hidden')
    navBar.classList.add('hidden')
    tabBar.classList.add('hidden')
    screen.innerHTML = renderSelectProject()
    return
  }

  statusBar.classList.remove('hidden')

  if (state.currentSubPage) {
    navBar.classList.remove('hidden')
    tabBar.classList.add('hidden')
    navTitle.textContent = SUB_TITLES[state.currentSubPage] || ''
    screen.innerHTML = SUB_RENDERERS[state.currentSubPage]()
  } else {
    navBar.classList.add('hidden')
    tabBar.classList.remove('hidden')
    screen.innerHTML = TAB_RENDERERS[state.currentTab]()
  }

  document.querySelectorAll('.tab-item').forEach(el => {
    const active = el.dataset.tab === state.currentTab && !state.currentSubPage
    el.classList.toggle('active', active)
    const iconEl = el.querySelector('.tab-icon-slot')
    if (iconEl) {
      const tabName = 'tab-' + el.dataset.tab
      iconEl.innerHTML = Icons.icon(tabName, { size: 24, color: active ? '#4A90E2' : '#999' })
    }
  })
  renderProjectList()
}

function startCarousel() {
  stopCarousel()
  if (state.authPhase !== 'app' || state.currentTab !== 'home' || state.currentSubPage) return
  carouselTimer = setInterval(() => {
    state.carouselIndex = (state.carouselIndex + 1) % MOCK.carouselList.length
    const track = document.querySelector('.carousel-track')
    if (track) track.style.transform = `translateX(-${state.carouselIndex * 100}%)`
    document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === state.carouselIndex))
  }, 4000)
}

function stopCarousel() { if (carouselTimer) clearInterval(carouselTimer) }

const App = {
  goLogin() { state.authPhase = 'login'; state.currentSubPage = null; render(); stopCarousel() },
  toggleLoginMode() { state.loginMode = state.loginMode === 'account' ? 'phone' : 'account'; render() },
  updateLoginField(k, v) { state.loginForm[k] = v },
  updateRegisterField(k, v) { state.registerForm[k] = v },
  updateForgotField(k, v) { state.forgotForm[k] = v },
  togglePwd(k) { state.showPwd[k] = !state.showPwd[k]; render() },

  openAuthPage(page) { state.currentSubPage = page; render() },

  doLogin() {
    showToast('登录成功')
    state.authPhase = 'selectProject'
    state.currentSubPage = null
    render()
  },

  doRegister() {
    const f = state.registerForm
    if (!f.account || !f.password) return showToast('请填写完整信息')
    if (f.password !== f.confirm) return showToast('两次密码不一致')
    showToast('注册成功，请登录')
    state.currentSubPage = null
    render()
  },

  doForgotPassword() {
    showToast('密码重置成功')
    state.currentSubPage = null
    render()
  },

  selectProjectCard(id) { state.selectedProjectId = id; render() },

  enterApp(id) {
    const pid = id || state.selectedProjectId
    state.currentProject = PROJECTS.find(p => p.id === pid) || PROJECTS[0]
    state.authPhase = 'app'
    state.currentTab = 'home'
    state.currentSubPage = null
    render()
    startCarousel()
    showToast('已进入 ' + state.currentProject.name)
  },

  switchTab(tab) { state.currentTab = tab; state.currentSubPage = null; render(); startCarousel() },

  openSubPage(page) {
    if (state.authPhase !== 'app' && page !== 'forgotPassword' && page !== 'register') {
      return showToast('请先登录')
    }
    state.currentSubPage = page
    render()
    stopCarousel()
  },

  openEnergyData(tab) {
    state.energyTab = tab === 'water' ? 'water' : 'electric'
    App.openSubPage('energyData')
  },

  openAssetData(tab) {
    state.assetTypeTab = tab === 'equipment' ? 'equipment' : 'space'
    App.openSubPage('assetData')
  },

  setSmartCardTrendType(t) { state.smartCardTrendType = t; render() },
  setSmartCardPeriod(p) { state.smartCardPeriod = p; render() },
  setCanteenOpsMealFilter(m) { state.canteenOpsMealFilter = m; render() },

  openWorkOrderList(propertyId) {
    const map = { repair: 'repair', maintain: 'maintain', inspect: 'inspect' }
    state.workOrderListCategory = map[propertyId] || 'repair'
    state.workOrderListFilter = '全部'
    App.openSubPage('workOrderList')
  },

  setCollabTab(page, tab) {
    if (page === 'todo') state.todoMainTab = tab
    else state.workOrderMainTab = tab
    render()
  },

  setCollabFilter(page, f) {
    if (page === 'todo') state.todoFilter = f
    else state.workOrderFilter = f
    render()
  },

  setWorkOrderListCategory(c) { state.workOrderListCategory = c; render() },
  setWorkOrderListFilter(f) { state.workOrderListFilter = f; render() },

  setMessageTab(t) { state.messageTab = t; render() },
  setMessageSearch(v) { state.messageSearch = v; render() },

  markAllMessagesRead() {
    state.messages.forEach(m => { m.read = true })
    render()
    showToast('已全部标记为已读')
  },

  closeSubPage() {
    if (state.authPhase === 'login' && (state.currentSubPage === 'forgotPassword' || state.currentSubPage === 'register')) {
      state.currentSubPage = null
      render()
      return
    }
    state.currentSubPage = null
    render()
    startCarousel()
  },

  handleBack() { App.closeSubPage() },

  toggleProjectPicker(show) { document.getElementById('project-mask').classList.toggle('show', show) },

  selectProject(id) {
    state.currentProject = PROJECTS.find(p => p.id === id)
    App.toggleProjectPicker(false)
    showToast('已切换至：' + state.currentProject.name)
    render()
    startCarousel()
  },

  goCarousel(i) { state.carouselIndex = i; render(); startCarousel() },
  markNotificationRead(id) { const n = state.notifications.find(x => x.id === id); if (n) n.read = true; render(); showToast('已标记为已读') },
  markMessageRead(id) { const m = state.messages.find(x => x.id === id); if (m) m.read = true; render(); showToast('已标记为已读') },
  onContactSearch(val) { state.contactSearch = val; render() },

  setCanteenTab(t) { state.canteenTab = t; render() },
  setCanteenPersonnelType(t) { state.canteenPersonnelType = t; render() },
  setCanteenMarketingType(t) { state.canteenMarketingType = t; render() },
  setMenuMealType(t) { state.menuMealType = t; render() },
  setAssetTypeTab(t) { state.assetTypeTab = t; render() },
  setDataEnergyTypeTab(t) { state.dataEnergyTypeTab = t; render() },
  setEnergyTab(t) { state.energyTab = t; render() },
  setEnergyFilter(f) { state.energyTimeFilter = f; render() },

  logout() {
    if (!confirm('确定退出登录？')) return
    state.authPhase = 'login'
    state.currentSubPage = null
    state.currentTab = 'home'
    stopCarousel()
    render()
    showToast('已退出登录')
  },

  openContactModal(id) {
    state.editingContactId = id || null
    const c = id ? state.contacts.find(x => x.id === id) : null
    document.getElementById('contact-modal-title').textContent = c ? '编辑联系人' : '添加联系人'
    document.getElementById('cf-name').value = c ? c.name : ''
    document.getElementById('cf-dept').value = c ? c.department : ''
    document.getElementById('cf-phone').value = c ? c.phone : ''
    document.getElementById('contact-modal').classList.add('show')
  },

  closeContactModal() { document.getElementById('contact-modal').classList.remove('show'); state.editingContactId = null },

  saveContact() {
    const name = document.getElementById('cf-name').value.trim()
    const department = document.getElementById('cf-dept').value.trim()
    const phone = document.getElementById('cf-phone').value.trim()
    if (!name || !phone) return showToast('请填写姓名和手机号')
    if (state.editingContactId) {
      const c = state.contacts.find(x => x.id === state.editingContactId)
      if (c) Object.assign(c, { name, department, phone })
      showToast('联系人已更新')
    } else {
      state.contacts.push({ id: nextContactId++, name, department, phone })
      showToast('联系人已添加')
    }
    App.closeContactModal()
    render()
  },

  deleteContact(id) {
    if (!confirm('确定删除该联系人？')) return
    state.contacts = state.contacts.filter(c => c.id !== id)
    showToast('联系人已删除')
    render()
  },

  showToast
}

window.App = App
document.addEventListener('DOMContentLoaded', () => { render() })
