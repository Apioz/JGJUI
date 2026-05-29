const mock = require('./utils/mock')

App({
  globalData: {
    currentProject: mock.projects[0],
    projects: mock.projects,
    userProfile: mock.userProfile
  },

  onLaunch() {
    const savedProject = wx.getStorageSync('currentProject')
    if (savedProject) {
      this.globalData.currentProject = savedProject
    }
  },

  switchProject(project) {
    this.globalData.currentProject = project
    wx.setStorageSync('currentProject', project)
  }
})
