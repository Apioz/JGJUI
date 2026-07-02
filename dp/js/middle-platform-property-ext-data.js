/* 物业管理扩展 — 报修/维保/巡检/备件/流程/供应商 */

const MP_PROPERTY_EXT_DATA = {
  propertyRepairOrder: {
    searchLabel: '搜索',
    resetLabel: '重置',
    filters: [
      { label: '工单编号', placeholder: '请输入工单编号', type: 'input' },
      { label: '来源', placeholder: '请选择来源', type: 'select' },
      { label: '问题类型', placeholder: '请选择问题类型', type: 'select' },
      { label: '紧急程度', placeholder: '请选择紧急程度', type: 'select' },
      { label: '报修人', placeholder: '请输入报修人', type: 'input' },
      { label: '状态', placeholder: '请选择状态', type: 'select' },
    ],
    toolbar: [{ label: '导出', class: 'warn' }],
    columns: [
      { key: 'index', label: '#' },
      { key: 'id', label: '工单编号' },
      { key: 'type', label: '类型' },
      { key: 'source', label: '来源' },
      { key: 'problemType', label: '问题类型' },
      { key: 'urgency', label: '紧急程度' },
      { key: 'location', label: '空间位置' },
      { key: 'asset', label: '资产/设备' },
      { key: 'reporter', label: '报修人' },
      { key: 'contact', label: '联系方式' },
      { key: 'appointTime', label: '预约时间' },
      { key: 'reportTime', label: '报修时间' },
      { key: 'status', label: '状态' },
      { key: 'description', label: '问题描述' },
    ],
    rowActions: ['编辑', '详情'],
    rows: [
      { index: 1, id: '9d2f9ec6de8e482-BX-202603270002', type: '报修', source: '电话', problemType: '设备故障', urgency: '一般', location: '延安东路300号/3F/会议室', asset: '空调-001', reporter: '管理员1', contact: '13800138000', appointTime: '—', reportTime: '2026-03-27 09:15', status: '待派单', description: '空调不制冷' },
      { index: 2, id: '9d2f9ec6de8e482-BX-202603270001', type: '报修', source: '微信小程序', problemType: '设备故障', urgency: '紧急', location: '仓库综合楼7#/1F/通信机房', asset: '风机盘管-003', reporter: '管理员1', contact: '13800138001', appointTime: '2026-03-27 14:00', reportTime: '2026-03-27 08:30', status: '待派单', description: '风机异常噪音' },
      { index: 3, id: '9d2f9ec6de8e482-BX-202603260001', type: '报修', source: 'Web', problemType: '设施损坏', urgency: '一般', location: '延安东路300号/2F/走廊', asset: '—', reporter: '小贺', contact: '13900139000', appointTime: '—', reportTime: '2026-03-26 16:20', status: '已取消', description: '灯具损坏' },
      { index: 4, id: '9d2f9ec6de8e482-BX-202603250001', type: '报修', source: '电话', problemType: '其他', urgency: '一般', location: '延安东路300号/1F/大厅', asset: '门禁-002', reporter: '管理员1', contact: '13800138000', appointTime: '—', reportTime: '2026-03-25 11:00', status: '待派单', description: '门禁刷卡失败' },
      { index: 5, id: '9d2f9ec6de8e482-BX-202603240001', type: '报修', source: 'APP', problemType: '设备故障', urgency: '紧急', location: '仓库综合楼7#/2F/配电室', asset: '配电柜-001', reporter: '156', contact: '13700137000', appointTime: '2026-03-24 10:00', reportTime: '2026-03-24 09:00', status: '待派单', description: '配电柜告警' },
      { index: 6, id: '9d2f9ec6de8e482-BX-202603230001', type: '报修', source: '微信小程序', problemType: '设施损坏', urgency: '一般', location: '延安东路300号/4F/办公室', asset: '—', reporter: '管理员1', contact: '13800138000', appointTime: '—', reportTime: '2026-03-23 15:45', status: '待派单', description: '窗户关不严' },
      { index: 7, id: '9d2f9ec6de8e482-BX-202603220001', type: '报修', source: '电话', problemType: '设备故障', urgency: '一般', location: '延安东路300号/B1/停车场', asset: '道闸-001', reporter: '管理员1', contact: '13800138000', appointTime: '—', reportTime: '2026-03-22 08:00', status: '已取消', description: '道闸无法抬杆' },
      { index: 8, id: '9d2f9ec6de8e482-BX-202603210001', type: '报修', source: 'Web', problemType: '设备故障', urgency: '特急', location: '仓库综合楼7#/1F/消防控制室', asset: '消防主机-001', reporter: '管理员1', contact: '13800138000', appointTime: '2026-03-21 09:00', reportTime: '2026-03-21 08:55', status: '待派单', description: '消防主机故障告警' },
    ],
    total: 20,
    pageSize: 20,
  },

  propertyMaintCalendar: {
    month: '2025-12',
    highlightDay: 22,
    legend: [
      { label: '未进行', color: '#fa8c16' },
      { label: '进行中', color: '#1890ff' },
      { label: '已结束', color: '#bfbfbf' },
    ],
  },

  propertyMaintProcedure: {
    searchLabel: '搜索', resetLabel: '清空',
    filters: [
      { label: '程序编号', placeholder: '请输入 程序编号', type: 'input' },
      { label: '程序名称', placeholder: '请输入 程序名称', type: 'input' },
      { label: '程序状态', placeholder: '请选择 程序状态', type: 'select' },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '导出', class: 'warn outline' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'code', label: '程序编号' }, { key: 'name', label: '程序名称' },
      { key: 'status', label: '程序状态' }, { key: 'note', label: '注意事项' }, { key: 'creator', label: '创建人' }, { key: 'createTime', label: '创建时间' },
    ],
    rowActions: ['编辑', '删除'],
    rows: [], total: 0, empty: true,
  },

  propertyMaintPlan: {
    searchLabel: '搜索', resetLabel: '清空',
    filters: [
      { label: '计划编号', placeholder: '请输入计划编号', type: 'input' },
      { label: '计划名称', placeholder: '请输入计划名称', type: 'input' },
      { label: '维保程序', placeholder: '请选择维保程序', type: 'select' },
      { label: '计划开始时间', placeholder: '开始日期 - 结束日期', type: 'daterange' },
      { label: '状态', placeholder: '请选择状态', type: 'select' },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '批量删除', class: 'danger outline' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'code', label: '计划编号' }, { key: 'name', label: '计划名称' },
      { key: 'level', label: '维保程度' }, { key: 'frequency', label: '计划频次' }, { key: 'startTime', label: '计划开始时间' },
      { key: 'endTime', label: '计划截止时间' }, { key: 'triggerCount', label: '截止触发次数' }, { key: 'executed', label: '已执行次数' },
      { key: 'nextTime', label: '下次执行时间' }, { key: 'workgroup', label: '工作组' }, { key: 'status', label: '状态' },
    ],
    rowActions: ['查看', '编辑', '删除'],
    rows: [], total: 0, empty: true,
  },

  propertyMaintOrder: {
    searchLabel: '搜索', resetLabel: '清空',
    filters: [
      { label: '工单编号', placeholder: '请输入工单编号', type: 'input' },
      { label: '维保计划', placeholder: '请选择维保计划', type: 'select' },
      { label: '工单状态', placeholder: '请选择工单状态', type: 'select' },
      { label: '报单时间', placeholder: '日期开始', type: 'daterange' },
      { label: '维保程序', placeholder: '请选择维保程序', type: 'select' },
    ],
    toolbar: [{ label: '导出', class: 'warn' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'id', label: '工单编号' }, { key: 'plan', label: '维保计划' },
      { key: 'procedure', label: '维保程序' }, { key: 'workgroup', label: '工作组' }, { key: 'reporter', label: '报单人' },
      { key: 'reportTime', label: '报单时间' }, { key: 'estimateHours', label: '保养预计时间(小时)' }, { key: 'status', label: '工单状态' },
    ],
    rowActions: ['详情'],
    rows: [], total: 0, empty: true,
  },

  propertyInspectPoint: {
    searchLabel: '搜索', resetLabel: '重置',
    filters: [{ label: '点位名称', placeholder: '请输入名称', type: 'input' }],
    toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '删除', class: 'danger outline' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'code', label: '点位编号' }, { key: 'name', label: '点位名称' },
      { key: 'desc', label: '点位描述' }, { key: 'tagName', label: '标签名称' }, { key: 'tag', label: '点位标签', type: 'qr' },
    ],
    rowActions: ['查看', '编辑', '删除'],
    rows: [
      { index: 1, code: 'PT202604020001', name: 'ZLL', desc: '', tagName: '', tag: '' },
      { index: 2, code: 'PT202602040001', name: '点位1', desc: '', tagName: '', tag: '' },
      { index: 3, code: 'PT202507280002', name: '巡检测试2', desc: '', tagName: '', tag: '' },
      { index: 4, code: 'PT202507280001', name: '巡检测试1', desc: '', tagName: '', tag: 'qr' },
    ],
    total: 4,
  },

  propertyInspectProcedure: {
    searchLabel: '搜索', resetLabel: '清空',
    filters: [
      { label: '程序', placeholder: '请输入 程序', type: 'input' },
      { label: '程序名称', placeholder: '请输入 程序名称', type: 'input' },
      { label: '巡检类型', placeholder: '请选择 巡检类型', type: 'select' },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '批量删除', class: 'danger outline' }, { label: '导出', class: 'warn outline' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'code', label: '程序' }, { key: 'name', label: '程序名称' },
      { key: 'inspectType', label: '巡检类型' }, { key: 'note', label: '注意事项' }, { key: 'creator', label: '创建人' }, { key: 'createTime', label: '创建时间' },
    ],
    rowActions: ['编辑', '删除'],
    rows: [
      { index: 1, code: 'INPR202510280001', name: '111', inspectType: '办公楼', note: '', creator: '管理员1', createTime: '2025-10-28 20:40:34' },
      { index: 2, code: 'INPR202507280001', name: '巡检测试1', inspectType: '办公楼', note: '', creator: '管理员1', createTime: '2025-07-28 10:00:00' },
    ],
    total: 2,
  },

  propertyInspectRoute: {
    searchLabel: '搜索', resetLabel: '重置',
    filters: [
      { label: '路线名称', placeholder: '请输入路线名称', type: 'input' },
      { label: '巡检类型', placeholder: '请选择巡检类型', type: 'select' },
      { label: '状态', placeholder: '请选择状态', type: 'select' },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '批量删除', class: 'danger outline' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'name', label: '路线名称' }, { key: 'inspectType', label: '巡检类型' },
      { key: 'desc', label: '巡检描述' }, { key: 'pointCount', label: '打点数量' }, { key: 'status', label: '状态' },
    ],
    rowActions: ['查看', '编辑'],
    rows: [{ index: 1, name: '巡检测试1', inspectType: '办公楼', desc: '', pointCount: 1, status: '启用' }],
    total: 1,
  },

  propertyInspectPlan: {
    searchLabel: '搜索', resetLabel: '清空',
    filters: [
      { label: '计划名称', placeholder: '请输入计划名称', type: 'input' },
      { label: '巡检类型', placeholder: '请选择巡检类型', type: 'select' },
      { label: '巡检路线', placeholder: '请选择巡检路线', type: 'select' },
      { label: '状态', placeholder: '请选择状态', type: 'select' },
      { label: '计划开始时间', placeholder: '开始日期 - 结束日期', type: 'daterange' },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'code', label: '计划编号' }, { key: 'name', label: '计划名称' },
      { key: 'inspectType', label: '巡检类型' }, { key: 'route', label: '巡检路线' }, { key: 'status', label: '状态' },
      { key: 'startTime', label: '计划开始时间' }, { key: 'endTime', label: '计划截止时间' }, { key: 'frequency', label: '计划频次' },
      { key: 'triggerCount', label: '截止触发次数' }, { key: 'executed', label: '已执行次数' }, { key: 'nextTime', label: '下次执行时间' }, { key: 'workgroup', label: '工作组' },
    ],
    rowActions: ['禁用', '查看', '编辑', '删除'],
    rows: [{
      index: 1, code: 'INPL202512160001', name: '1', inspectType: '办公楼', route: '11', status: '启用',
      startTime: '2025-12-17', endTime: '2025-12-18', frequency: '1次/1天', triggerCount: 0, executed: 0, nextTime: '已结束', workgroup: '',
    }],
    total: 1,
  },

  propertyInspectOrder: {
    searchLabel: '搜索', resetLabel: '清空',
    filters: [
      { label: '任务开始时间', placeholder: '日期开始', type: 'daterange' },
      { label: '任务完成时间', placeholder: '日期开始', type: 'daterange' },
      { label: '工单编号', placeholder: '请输入工单编号', type: 'input' },
      { label: '巡检计划', placeholder: '请选择巡检计划', type: 'select' },
      { label: '巡检类型', placeholder: '请选择巡检类型', type: 'select' },
      { label: '工单状态', placeholder: '请选择工单状态', type: 'select' },
    ],
    toolbar: [{ label: '导出', class: 'warn' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'id', label: '工单编号' }, { key: 'plan', label: '巡检计划' },
      { key: 'inspectType', label: '巡检类型' }, { key: 'route', label: '巡检路线' }, { key: 'pointCount', label: '点位数量' },
      { key: 'startTime', label: '任务开始时间' }, { key: 'endTime', label: '任务完成时间' }, { key: 'status', label: '工单状态' },
    ],
    rowActions: ['详情'],
    rows: [], total: 0, empty: true,
  },

  propertySpareLedger: {
    searchLabel: '搜索', resetLabel: '清空',
    filters: [
      { label: '备件类型', placeholder: '请选择 备件类型', type: 'select' },
      { label: '备件名称', placeholder: '请输入 备件名称', type: 'input' },
      { label: '备件编号', placeholder: '请输入 备件编号', type: 'input' },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '导出', class: 'warn outline' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'code', label: '备件编号' }, { key: 'name', label: '备件名称' },
      { key: 'model', label: '规格型号' }, { key: 'type', label: '备件类型' }, { key: 'stock', label: '总库存' },
      { key: 'price', label: '价格(元)' }, { key: 'manufacturer', label: '生产厂家' }, { key: 'updater', label: '更新人' }, { key: 'updateTime', label: '更新时间' },
    ],
    rowActions: ['编辑', '删除'],
    rows: [], total: 0, empty: true,
  },

  propertySpareInbound: {
    searchLabel: '搜索', resetLabel: '重置',
    filters: [
      { label: '入库时间', placeholder: '开始日期 - 结束日期', type: 'daterange' },
      { label: '入库单号', placeholder: '请输入入库单号', type: 'input' },
      { label: '入库类型', placeholder: '请选择入库类型', type: 'select' },
      { label: '入库仓库', placeholder: '请选择入库仓库', type: 'select' },
      { label: '入库人', placeholder: '请选择入库人', type: 'select' },
      { label: '入库备件', placeholder: '请选择入库备件', type: 'select' },
    ],
    toolbar: [{ label: '+ 新增入库', class: 'primary' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'code', label: '入库单号' }, { key: 'type', label: '入库类型' },
      { key: 'warehouse', label: '入库仓库' }, { key: 'person', label: '入库人' }, { key: 'time', label: '入库时间' },
      { key: 'qty', label: '入库数量' }, { key: 'part', label: '入库备件' }, { key: 'note', label: '备注' },
      { key: 'operator', label: '操作人' }, { key: 'operateTime', label: '操作时间' },
    ],
    rowActions: ['详情'],
    rows: [], total: 0, empty: true,
  },

  propertySpareOutbound: {
    searchLabel: '搜索', resetLabel: '清空',
    filters: [
      { label: '出库单号', placeholder: '请输入出库单号', type: 'input' },
      { label: '出库类型', placeholder: '请选择出库类型', type: 'select' },
      { label: '出库人', placeholder: '请选择出库人', type: 'select' },
      { label: '出库时间', placeholder: '开始日期 - 结束日期', type: 'daterange' },
      { label: '备件清单', placeholder: '请选择备件清单', type: 'select' },
    ],
    toolbar: [{ label: '+ 新增出库', class: 'primary' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'code', label: '出库单号' }, { key: 'type', label: '出库类型' },
      { key: 'warehouse', label: '出库仓库' }, { key: 'person', label: '出库人' }, { key: 'time', label: '出库时间' },
      { key: 'qty', label: '出库数量' }, { key: 'note', label: '备注' }, { key: 'partList', label: '备件清单' },
      { key: 'operator', label: '操作人' }, { key: 'operateTime', label: '操作时间' },
    ],
    rowActions: ['详情'],
    rows: [], total: 0, empty: true,
  },

  propertyProcessNew: {
    searchLabel: '搜索', resetLabel: '清空',
    filters: [
      { label: '流程名称', placeholder: '请输入流程名称', type: 'input' },
      { label: '流程标识', placeholder: '请输入流程标识', type: 'input' },
    ],
    toolbar: [],
    showProcessIcon: true,
    columns: [
      { key: 'name', label: '流程名称' }, { key: 'processId', label: '流程标识' }, { key: 'category', label: '流程分类' },
      { key: 'version', label: '版本' }, { key: 'status', label: '状态' },
    ],
    rowActions: ['发起', '流程图'],
    rows: [
      { index: 1, name: '简易工单处理', processId: 'BX-brief', category: '报修', version: 1, status: '启用' },
      { index: 2, name: '报修流程', processId: 'BX-common', category: '报修', version: 34, status: '启用' },
      { index: 3, name: '报修流程1111', processId: 'BX-common111', category: '报修', version: 5, status: '启用' },
      { index: 4, name: '报修流程', processId: 'BX-common_Approve', category: '报修', version: 14, status: '启用' },
      { index: 5, name: '简易工单处理', processId: 'BX-complete', category: '报修', version: 1, status: '启用' },
      { index: 6, name: '维保工单', processId: 'WB-common', category: '维保', version: 22, status: '启用' },
      { index: 7, name: '巡检流程', processId: 'XJ-common', category: '巡检', version: 20, status: '启用' },
    ],
    total: 7,
  },

  propertySupplier: {
    searchLabel: '搜索', resetLabel: '清空',
    filters: [
      { label: '空间位置', placeholder: '请选择空间位置', type: 'select' },
      { label: '关键词', placeholder: '模糊匹配参与方企业名称、企业编号、联系人、注册地址', type: 'input', wide: true },
      { label: '创建时间', placeholder: '开始日期 - 结束日期', type: 'daterange' },
    ],
    toolbar: [
      { label: '+ 新增', class: 'primary' }, { label: '删除', class: 'danger outline' },
      { label: '下载模板', class: 'success outline' }, { label: '导出', class: 'warn outline' }, { label: '导入', class: 'success outline' },
    ],
    columns: [
      { key: 'index', label: '#' }, { key: 'companyName', label: '参与方企业名称' }, { key: 'companyNo', label: '参与方企业编号' },
      { key: 'contact', label: '联系人' }, { key: 'creditCode', label: '社会信用代码' }, { key: 'note', label: '备注' },
    ],
    rowActions: ['编辑', '删除', '查看'],
    rows: [
      { index: 1, companyName: '上海生物芯片有限公司', companyNo: '121212', contact: '张三', creditCode: '91310000132201234X', note: '' },
      { index: 2, companyName: '上海生物技术研究中心', companyNo: '', contact: '李四', creditCode: '91310000710987654A', note: '' },
      { index: 3, companyName: '上海医疗器械有限公司', companyNo: '', contact: '王五', creditCode: '91310000987654321B', note: '' },
      { index: 4, companyName: '上海医药科技有限公司', companyNo: '', contact: '赵六', creditCode: '91310000123456789C', note: '' },
      { index: 5, companyName: '上海生命科学研究所', companyNo: '', contact: '钱七', creditCode: '91310000567890123D', note: '' },
      { index: 6, companyName: '上海基因检测技术有限公司', companyNo: '', contact: '孙八', creditCode: '91310000345678901E', note: '' },
      { index: 7, companyName: '上海生物医药产业园', companyNo: '', contact: '周九', creditCode: '91310000789012345F', note: '' },
      { index: 8, companyName: '上海精准医疗科技有限公司', companyNo: '', contact: '吴十', creditCode: '91310000234567890G', note: '' },
    ],
    total: 21,
  },
};

Object.assign(MP_PAGE_DATA, MP_PROPERTY_EXT_DATA);

Object.assign(MP_PAGE_REGISTRY, {
  'property-repair-order': { type: 'property-list', dataKey: 'propertyRepairOrder' },
  'property-maint-calendar': { type: 'property-maint-calendar', dataKey: 'propertyMaintCalendar' },
  'property-maint-procedure': { type: 'property-list', dataKey: 'propertyMaintProcedure' },
  'property-maint-plan': { type: 'property-list', dataKey: 'propertyMaintPlan' },
  'property-maint-order': { type: 'property-list', dataKey: 'propertyMaintOrder' },
  'property-inspect-point': { type: 'property-list', dataKey: 'propertyInspectPoint' },
  'property-inspect-procedure': { type: 'property-list', dataKey: 'propertyInspectProcedure' },
  'property-inspect-route': { type: 'property-list', dataKey: 'propertyInspectRoute' },
  'property-inspect-plan': { type: 'property-list', dataKey: 'propertyInspectPlan' },
  'property-inspect-order': { type: 'property-list', dataKey: 'propertyInspectOrder' },
  'property-spare-ledger': { type: 'property-list', dataKey: 'propertySpareLedger' },
  'property-spare-inbound': { type: 'property-list', dataKey: 'propertySpareInbound' },
  'property-spare-outbound': { type: 'property-list', dataKey: 'propertySpareOutbound' },
  'property-process-new': { type: 'property-list', dataKey: 'propertyProcessNew' },
  'property-supplier': { type: 'property-list', dataKey: 'propertySupplier' },
});
