const mock = require('../../utils/mock')

Page({
  data: {
    todoCount: 0,
    workOrderCount: 0,
    messageCount: 0
  },

  onLoad() {
    this.setData({
      todoCount: mock.todos.filter(t => t.status === 'pending').length,
      workOrderCount: mock.workOrders.filter(w => w.status !== '已完成').length,
      messageCount: mock.messages.filter(m => !m.read).length
    })
  },

  goTodo() {
    wx.navigateTo({ url: '/pages/todo/todo' })
  },

  goWorkOrder() {
    wx.navigateTo({ url: '/pages/workorder/workorder' })
  },

  goMessages() {
    wx.navigateTo({ url: '/pages/messages/messages' })
  }
})
