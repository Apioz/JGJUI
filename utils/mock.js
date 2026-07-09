const projects = [
  { id: 'p1', name: '生物芯片智慧园区' },
  { id: 'p2', name: '科技创新产业园' },
  { id: 'p3', name: '绿色能源示范园' }
]

const carouselList = [
  {
    id: 1,
    image: 'https://img.yzcdn.cn/vant/cat.jpeg',
    title: '智慧园区数字化管理平台'
  },
  {
    id: 2,
    image: 'https://img.yzcdn.cn/vant/tree.jpg',
    title: '绿色低碳 · 智能运维'
  },
  {
    id: 3,
    image: 'https://img.yzcdn.cn/vant/sand.jpeg',
    title: '一站式园区服务'
  }
]

const dataOverview = {
  assetTotal: 1286,
  workOrderPending: 23,
  energyToday: '1.2t / 856Kwh',
  canteenPassRate: '100%'
}

const assetManagement = {
  total: 1286,
  inUse: 1150,
  maintenance: 86,
  idle: 50,
  items: [
    { name: '固定资产', count: 856, icon: 'building' },
    { name: '设备台账', count: 430, icon: 'device' },
    { name: '资产盘点', count: 12, icon: 'inventory' },
    { name: '资产调拨', count: 5, icon: 'transfer' }
  ]
}

const propertyManagement = [
  { id: 'repair', name: '报修工单', icon: 'repair', color: '#4A90E2', badge: '99+' },
  { id: 'maintain', name: '维保工单', icon: 'maintain', color: '#52C41A', badge: '53' },
  { id: 'inspect', name: '巡检任务', icon: 'inspect', color: '#FDD835', badge: '28' },
  { id: 'myorder', name: '我的工单', icon: 'myorder', color: '#7E57C2', badge: '99+' }
]

const energyManagement = {
  waterTotal: '1523t',
  electricTotal: '246Kwh',
  waterToday: '12.5t',
  electricToday: '856Kwh'
}

const canteenManagement = {
  threeClean: { label: '三清三关', status: '通过', pass: true },
  sampleDish: { label: '留样菜监测', status: '通过', pass: true },
  morningCheck: { label: '晨检结果', status: '通过', pass: true }
}

const notifications = [
  { id: 1, title: '报修工单待处理', content: 'A栋3层空调故障报修，请及时处理', time: '10:30', read: false },
  { id: 2, title: '巡检任务提醒', content: '今日消防设备巡检任务即将到期', time: '09:15', read: false },
  { id: 3, title: '能源异常告警', content: 'B区用电量超出阈值15%', time: '昨天', read: true }
]

const todos = [
  { id: 1, title: '审批资产调拨申请', type: '资产管理', deadline: '今天 18:00', status: 'pending' },
  { id: 2, title: '完成消防巡检', type: '物业管理', deadline: '今天 17:00', status: 'pending' },
  { id: 3, title: '食堂晨检记录确认', type: '食堂管理', deadline: '明天 09:00', status: 'pending' }
]

const workOrders = [
  { id: 1, title: 'A栋3层空调故障', type: '报修', status: '处理中', createTime: '2026-05-26 08:30' },
  { id: 2, title: '电梯月度维保', type: '维保', status: '待接单', createTime: '2026-05-25 14:00' },
  { id: 3, title: '园区路灯维修', type: '报修', status: '已完成', createTime: '2026-05-24 10:20' }
]

const messages = [
  { id: 1, sender: '系统通知', content: '您有新的待办事项需要处理', time: '10:30', read: false },
  { id: 2, sender: '张经理', content: '请确认本周能源报表数据', time: '09:45', read: false },
  { id: 3, sender: '李主管', content: '巡检报告已提交，请查阅', time: '昨天', read: true }
]

const dataSummary = {
  asset: { label: '资产管理', total: 1286, trend: '+2.3%', items: [{ name: '在用', value: 1150 }, { name: '维保', value: 86 }, { name: '闲置', value: 50 }] },
  property: { label: '物业管理', total: 156, trend: '-5.1%', items: [{ name: '报修', value: 45 }, { name: '维保', value: 32 }, { name: '巡检', value: 79 }] },
  energy: { label: '能源管理', total: '246Kwh', trend: '+8.2%', items: [{ name: '累计用水', value: '1523t' }, { name: '累计用电', value: '246Kwh' }, { name: '今日用电', value: '856Kwh' }] },
  canteen: { label: '食堂管理', total: '100%', trend: '0%', items: [{ name: '三清三关', value: '通过' }, { name: '留样监测', value: '通过' }, { name: '晨检', value: '通过' }] }
}

const userProfile = {
  name: '张明',
  avatar: '',
  phone: '138****8888',
  project: '生物芯片智慧园区',
  department: '园区运营部',
  role: '运营管理员',
  employeeId: 'EMP2024001'
}

const { FOUNDATION_USER_CONTACTS } = require('./foundation-user-data')

const contacts = FOUNDATION_USER_CONTACTS.map(c => ({ ...c, avatar: '' }))

module.exports = {
  projects,
  carouselList,
  dataOverview,
  assetManagement,
  propertyManagement,
  energyManagement,
  canteenManagement,
  notifications,
  todos,
  workOrders,
  messages,
  dataSummary,
  userProfile,
  contacts
}
