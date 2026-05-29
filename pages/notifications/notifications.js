const mock = require('../../utils/mock')

Page({
  data: {
    notifications: []
  },

  onLoad() {
    this.setData({ notifications: mock.notifications })
  },

  onNotificationTap(e) {
    const { index } = e.currentTarget.dataset
    const notifications = this.data.notifications
    notifications[index].read = true
    this.setData({ notifications })
  }
})
