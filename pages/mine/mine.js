const mock = require('../../utils/mock')

Page({
  data: {
    userProfile: {},
    statusBarHeight: 20
  },

  onLoad() {
    const sysInfo = wx.getSystemInfoSync()
    const app = getApp()
    this.setData({
      statusBarHeight: sysInfo.statusBarHeight,
      userProfile: app.globalData.userProfile || mock.userProfile
    })
  },

  goProfile() {
    wx.navigateTo({ url: '/pages/profile/profile' })
  },

  goContacts() {
    wx.navigateTo({ url: '/pages/contacts/contacts' })
  },

  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '13800008888',
      fail: () => {}
    })
  }
})
