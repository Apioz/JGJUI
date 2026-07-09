/** 底座用户管理 — 大屏 / 中台 / 小程序共享用户数据 */
const FOUNDATION_USER_MGMT = {
  rows: [
    { index: 1, account: 'admin', tenantTag: '管理组', realName: '管理员', roles: ['超级管理员'], dept: '上海生物芯片有限公司', platform: 'WEB', tenant: '上海禹创数维技术有限公司', nickname: '管理员', phone: '155****2859', email: 'admin@bladex.vip', gender: '男', birthday: '2018-08-08 00:00:00', userCode: '', position: '信息部' },
    { index: 2, account: 'swxp', tenantTag: '管理组', realName: '生物芯片', roles: ['生物芯片'], dept: '生物芯片园区', platform: 'WEB', tenant: '上海禹创数维技术有限公司', nickname: '生物芯片', phone: '13800138001', email: '', gender: '男', birthday: '', userCode: '', position: '信息部' },
    { index: 3, account: '白诚', tenantTag: '管理组', realName: '白诚', roles: ['物业经理助理'], dept: '物业科', platform: 'WEB', tenant: '上海禹创数维技术有限公司', nickname: '白诚', phone: '13700137001', email: '', gender: '男', birthday: '', userCode: '', position: '基层员工' },
    { index: 4, account: 'hr001', tenantTag: '管理组', realName: '郝佳丽', roles: ['人事'], dept: 'MERU', platform: 'WEB', tenant: '上海禹创数维技术有限公司', nickname: '郝佳丽', phone: '13600136001', email: '', gender: '女', birthday: '', userCode: 'HR001', position: '信息部' },
    { index: 5, account: 'manager01', tenantTag: '管理组', realName: '经理', roles: ['经理'], dept: '上海鼎创科技有限公司', platform: 'WEB', tenant: '上海禹创数维技术有限公司', nickname: '经理', phone: '13500135001', email: '', gender: '男', birthday: '', userCode: '', position: '中层管理' },
    { index: 6, account: 'lizg', tenantTag: '管理组', realName: '李主管', roles: ['经理'], dept: '黄浦机管局', platform: 'APP', tenant: '上海禹创数维技术有限公司', nickname: '李主管', phone: '13800138006', email: '', gender: '男', birthday: '', userCode: '', position: '中层管理' },
    { index: 7, account: 'wanggcs', tenantTag: '管理组', realName: '王工程师', roles: ['生物芯片'], dept: '机管局子部门', platform: 'APP', tenant: '上海禹创数维技术有限公司', nickname: '王工程师', phone: '13800138007', email: '', gender: '男', birthday: '', userCode: '', position: '基层员工' },
    { index: 8, account: 'zhaoacc', tenantTag: '管理组', realName: '赵会计', roles: ['人事'], dept: 'MERU', platform: 'WEB', tenant: '上海禹创数维技术有限公司', nickname: '赵会计', phone: '13800138008', email: '', gender: '女', birthday: '', userCode: '', position: '信息部' },
    { index: 9, account: 'chenjl', tenantTag: '管理组', realName: '陈经理', roles: ['经理'], dept: '生物芯片园区', platform: 'APP', tenant: '上海禹创数维技术有限公司', nickname: '陈经理', phone: '13800138009', email: '', gender: '男', birthday: '', userCode: '', position: '中层管理' },
    { index: 10, account: 'ext001', tenantTag: '管理组', realName: '外部协作', roles: ['生物芯片'], dept: '外部项目账户', platform: 'APP', tenant: '上海禹创数维技术有限公司', nickname: '外部协作', phone: '13800138010', email: '', gender: '男', birthday: '', userCode: '', position: '基层员工' },
  ],
}

function buildFoundationUserContacts(rows) {
  return rows.map((r, i) => ({
    id: i + 1,
    userId: r.account,
    name: r.realName,
    department: r.dept,
    phone: r.phone,
    position: r.position || '',
    roles: Array.isArray(r.roles) ? r.roles.join('、') : (r.roles || ''),
    platform: r.platform || '',
  }))
}

const FOUNDATION_USER_CONTACTS = buildFoundationUserContacts(FOUNDATION_USER_MGMT.rows)

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FOUNDATION_USER_MGMT,
    FOUNDATION_USER_CONTACTS,
    buildFoundationUserContacts,
  }
}
