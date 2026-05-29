const mock = require('../../utils/mock')

Page({
  data: {
    messages: []
  },

  onLoad() {
    this.setData({ messages: mock.messages })
  },

  onMessageTap(e) {
    const { index } = e.currentTarget.dataset
    const messages = this.data.messages
    messages[index].read = true
    this.setData({ messages })
  }
})
