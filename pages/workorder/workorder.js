const mock = require('../../utils/mock')

const statusMap = {
  '待接单': 'waiting',
  '处理中': 'processing',
  '已完成': 'done'
}

Page({
  data: {
    workOrders: []
  },

  onLoad() {
    const workOrders = mock.workOrders.map(item => ({
      ...item,
      statusClass: statusMap[item.status] || 'waiting'
    }))
    this.setData({ workOrders })
  }
})
