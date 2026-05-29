const mock = require('../../utils/mock')

Page({
  data: {
    userProfile: {}
  },

  onLoad() {
    const app = getApp()
    this.setData({
      userProfile: app.globalData.userProfile || mock.userProfile
    })
  }
})
