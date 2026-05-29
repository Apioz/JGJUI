const mock = require('../../utils/mock')

Page({
  data: {
    contacts: [],
    searchKey: ''
  },

  onLoad() {
    this.setData({ contacts: mock.contacts })
  },

  onSearchInput(e) {
    const searchKey = e.detail.value.trim()
    const filtered = searchKey
      ? mock.contacts.filter(c =>
          c.name.includes(searchKey) || c.department.includes(searchKey)
        )
      : mock.contacts
    this.setData({ searchKey, contacts: filtered })
  },

  callContact(e) {
    const { phone } = e.currentTarget.dataset
    wx.makePhoneCall({ phoneNumber: phone, fail: () => {} })
  }
})
