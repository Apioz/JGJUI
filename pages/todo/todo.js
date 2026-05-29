const mock = require('../../utils/mock')

Page({
  data: {
    todos: []
  },

  onLoad() {
    this.setData({ todos: mock.todos })
  },

  onTodoTap(e) {
    const { id } = e.currentTarget.dataset
    wx.showToast({ title: '待办详情开发中', icon: 'none' })
  }
})
