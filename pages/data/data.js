const mock = require('../../utils/mock')

Page({
  data: {
    summaryList: [],
    totalStats: {}
  },

  onLoad() {
    const summary = mock.dataSummary
    const summaryList = Object.keys(summary).map(key => ({
      key,
      ...summary[key]
    }))
    this.setData({
      summaryList,
      totalStats: {
        assetTotal: mock.dataOverview.assetTotal,
        workOrders: mock.workOrders.length,
        waterTotal: mock.energyManagement.waterTotal,
        electricTotal: mock.energyManagement.electricTotal,
        canteenRate: mock.dataOverview.canteenPassRate
      }
    })
  }
})
