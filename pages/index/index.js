const mock = require('../../utils/mock')

Page({
  data: {
    currentProject: {},
    projects: [],
    showProjectPicker: false,
    statusBarHeight: 20,
    carouselList: [],
    currentSwiper: 0,
    dataOverview: {},
    assetManagement: {},
    propertyManagement: [],
    energyManagement: {},
    canteenManagement: {},
    unreadCount: 0
  },

  onLoad() {
    const sysInfo = wx.getSystemInfoSync()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight })
    this.loadData()
  },

  onShow() {
    const app = getApp()
    this.setData({
      currentProject: app.globalData.currentProject
    })
  },

  loadData() {
    const app = getApp()
    const unreadCount = mock.notifications.filter(n => !n.read).length
    this.setData({
      currentProject: app.globalData.currentProject,
      projects: mock.projects,
      carouselList: mock.carouselList,
      dataOverview: mock.dataOverview,
      assetManagement: mock.assetManagement,
      propertyManagement: mock.propertyManagement,
      energyManagement: mock.energyManagement,
      canteenManagement: mock.canteenManagement,
      unreadCount
    })
  },

  toggleProjectPicker() {
    this.setData({ showProjectPicker: !this.data.showProjectPicker })
  },

  selectProject(e) {
    const { project } = e.currentTarget.dataset
    const app = getApp()
    app.switchProject(project)
    this.setData({
      currentProject: project,
      showProjectPicker: false
    })
    wx.showToast({ title: '已切换项目', icon: 'success' })
  },

  onSwiperChange(e) {
    this.setData({ currentSwiper: e.detail.current })
  },

  goNotifications() {
    wx.navigateTo({ url: '/pages/notifications/notifications' })
  },

  onPropertyTap(e) {
    const { id } = e.currentTarget.dataset
    if (id === 'myorder') {
      wx.navigateTo({ url: '/pages/workorder/workorder' })
    } else {
      wx.showToast({ title: '功能开发中', icon: 'none' })
    }
  },

  onAssetTap(e) {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  goEnergyDetail() {
    wx.switchTab({ url: '/pages/data/data' })
  },

  goCanteenDetail() {
    wx.switchTab({ url: '/pages/data/data' })
  }
})
