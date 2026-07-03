/** 底座平台 — 菜单与页面数据 */
const FOUNDATION_PLATFORM_DATA = {
  menuItems: [
    { id: 'project-center', label: '项目中心', icon: 'project', path: 'project-center' },
    { id: 'model-center', label: '模型中心', icon: 'model', path: 'model-center' },
    { id: 'device-center', label: '设备中心', icon: 'device', path: 'device-center' },
    { id: 'space-center', label: '空间中心', icon: 'space', path: 'space-center' },
    { id: 'document-center', label: '文档中心', icon: 'document', path: 'document-center' },
    { id: 'coding-center', label: '编码中心', icon: 'coding', path: 'coding-center' },
    {
      id: 'system-config',
      label: '系统配置',
      icon: 'setting',
      expanded: true,
      children: [
        {
          id: 'config-mgmt',
          label: '配置管理',
          expanded: true,
          children: [
            { id: 'channel-config', label: '渠道配置', path: 'channel-config' },
            { id: 'supplier-mgmt', label: '供应商管理', path: 'supplier-mgmt' },
            { id: 'warehouse-mgmt', label: '仓库管理', path: 'warehouse-mgmt' },
            {
              id: 'team-mgmt',
              label: '班组管理',
              expanded: true,
              children: [
                { id: 'schedule-table', label: '排班表', path: 'schedule-table' },
                { id: 'schedule-mgmt', label: '排班管理', path: 'schedule-mgmt' },
                { id: 'shift-mgmt', label: '班次管理', path: 'shift-mgmt' },
                { id: 'workgroup', label: '工作组', path: 'workgroup' },
              ],
            },
          ],
        },
        {
          id: 'sys-mgmt',
          label: '系统管理',
          expanded: false,
          children: [
            { id: 'dept-mgmt', label: '部门管理', path: 'dept-mgmt' },
            { id: 'position-mgmt', label: '岗位管理', path: 'position-mgmt' },
            { id: 'office-personnel', label: '办公点人员', path: 'office-personnel' },
            { id: 'role-mgmt', label: '角色管理', path: 'role-mgmt' },
            { id: 'user-mgmt', label: '用户管理', path: 'user-mgmt' },
            { id: 'log-mgmt', label: '日志管理', path: 'log-mgmt' },
            { id: 'office-mgmt', label: '办公点管理', path: 'office-mgmt' },
          ],
        },
      ],
    },
  ],
};

const FP_PAGE_REGISTRY = {
  'foundation-home': { type: 'home', dataKey: 'foundationHome' },
  'project-center': { type: 'list', dataKey: 'projectCenter' },
  'model-center': { type: 'dual-list', dataKey: 'modelCenter' },
  'device-center': { type: 'kpi-list', dataKey: 'deviceCenter' },
  'space-center': { type: 'kpi-tree-list', dataKey: 'spaceCenter' },
  'document-center': { type: 'document', dataKey: 'documentCenter' },
  'coding-center': { type: 'coding-list', dataKey: 'codingCenter' },
  'channel-config': { type: 'simple-list', dataKey: 'channelConfig' },
  'supplier-mgmt': { type: 'list', dataKey: 'supplierMgmt' },
  'warehouse-mgmt': { type: 'tree-list', dataKey: 'warehouseMgmt' },
  'schedule-table': { type: 'calendar', dataKey: 'scheduleTable' },
  'schedule-mgmt': { type: 'list', dataKey: 'scheduleMgmt' },
  'shift-mgmt': { type: 'list', dataKey: 'shiftMgmt' },
  'workgroup': { type: 'list', dataKey: 'workgroup' },
  'dept-mgmt': { type: 'list', dataKey: 'deptMgmt' },
  'position-mgmt': { type: 'list', dataKey: 'positionMgmt' },
  'office-personnel': { type: 'list', dataKey: 'officePersonnel' },
  'role-mgmt': { type: 'list', dataKey: 'roleMgmt' },
  'user-mgmt': { type: 'list', dataKey: 'userMgmt' },
  'log-mgmt': { type: 'list', dataKey: 'logMgmt' },
  'office-mgmt': { type: 'list', dataKey: 'officeMgmt' },
};

const FP_PAGE_DATA = {
  foundationHome: {
    title: '底座首页',
    cards: [
      { label: '项目总数', value: 17, icon: 'project', color: '#1890ff' },
      { label: '设备总数', value: 2550, icon: 'device', color: '#52c41a' },
      { label: '空间总数', value: 1286, icon: 'space', color: '#722ed1' },
      { label: '模型文件', value: 86, icon: 'model', color: '#fa8c16' },
    ],
  },

  projectCenter: {
    filters: [
      { key: 'name', label: '项目名称', type: 'input', placeholder: '请输入 项目名称' },
      { key: 'type', label: '项目类型', type: 'select', placeholder: '请选择 项目类型', options: ['公共建筑', '园区', '商业综合体', '租赁房|办公楼|住宅'] },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '导出', class: 'warn' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'name', label: '项目名称' }, { key: 'address', label: '项目地址' },
      { key: 'type', label: '项目类型' }, { key: 'area', label: '总建筑面积 (m²)' }, { key: 'openDate', label: '开业时间' },
      { key: 'code', label: '项目编码' }, { key: 'members', label: '项目成员' },
      { key: 'panoramaPush', label: '全景是否推送' }, { key: 'panoramaId', label: '全景 ID' },
    ],
    rowActions: ['查看', '编辑', '全景', '全景查看', '同步'],
    rows: [
      { index: 1, name: '浦东惠南养护院项目', address: '—', type: '公共建筑', area: '32140.000', openDate: '—', code: 'HNYHY', members: 'BYJ1 | 红磊 | 溥瑞杰 | 金总', panoramaPush: '否', panoramaId: '5195' },
      { index: 2, name: '浦东海滨垃圾焚烧厂', address: '—', type: '公共建筑', area: '34200.000', openDate: '—', code: 'PHFS', members: '管理员1', panoramaPush: '否', panoramaId: '—' },
      { index: 3, name: '新增测试的', address: '新金桥大厦', type: '租赁房|办公楼|住宅', area: '1111000.000', openDate: '2025-06-24', code: '—', members: '小贺 | 管理员 | 曾漫雨', panoramaPush: '否', panoramaId: '—' },
      { index: 4, name: '上海生物芯片智慧园区', address: '—', type: '园区', area: '85600.000', openDate: '—', code: 'SWXP', members: '管理员1', panoramaPush: '是', panoramaId: '3201' },
      { index: 5, name: '黄浦区机关办公大楼', address: '延安东路300号', type: '公共建筑', area: '28500.000', openDate: '2018-03-15', code: 'HBLIC', members: '管理员1 | 陈三', panoramaPush: '是', panoramaId: '2108' },
      { index: 6, name: '紫金科创中心项目', address: '—', type: '商业综合体', area: '61842.530', openDate: '—', code: 'ZJKCZX', members: '蒋奇杰 | 金总', panoramaPush: '是', panoramaId: '4175' },
    ],
    total: 17,
  },

  modelCenter: {
    left: {
      title: '单体列表',
      filterLabel: '单体名称',
      filterPlaceholder: '请输入 单体名称',
      toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '导出', class: 'warn' }, { label: '模型组 ▾', class: 'default' }],
      columns: [{ key: 'index', label: '#' }, { key: 'name', label: '单体名称' }, { key: 'facility', label: '园区设施设备' }, { key: 'project', label: '项目名称' }],
      rowActions: ['编辑', '删除', '上传模型', '绑定'],
      rows: [
        { index: 1, name: '东楼', facility: '否', project: '浦东惠南养护院项目' },
        { index: 2, name: '西楼', facility: '否', project: '浦东惠南养护院项目' },
        { index: 3, name: '地下室', facility: '否', project: '浦东惠南养护院项目' },
        { index: 4, name: '场地', facility: '否', project: '浦东惠南养护院项目' },
      ],
    },
    right: {
      title: '模型文件',
      filterLabel: '模型名称',
      filterPlaceholder: '请输入 模型名称',
      toolbar: [{ label: '导出', class: 'warn' }],
      columns: [{ key: 'index', label: '#' }, { key: 'name', label: '模型名称' }, { key: 'code', label: '模型编码' }, { key: 'unit', label: '单体名称' }, { key: 'project', label: '项目名称' }, { key: 'type', label: '类型' }],
      rowActions: ['删除', '编辑', '转换', '上传台账', '上传db包'],
      rows: [
        { index: 1, name: '惠南养护院东楼-土建-20250701.rvt', code: 'a3f2e8c1-4b5d-6e7f-8a9b-0c1d2e3f4a5b', unit: '东楼', project: '浦东惠南养护院项目', type: '土建类型', converted: true },
        { index: 2, name: '惠南养护院东楼-机电-20250701.rvt', code: 'b4g3f9d2-5c6e-7f8a-9b0c-1d2e3f4a5b6c', unit: '东楼', project: '浦东惠南养护院项目', type: '机电类型', converted: false },
        { index: 3, name: '惠南养护院地下室-土建-20250615.rvt', code: 'c5h4g0e3-6d7f-8a9b-0c1d-2e3f4a5b6c7d', unit: '地下室', project: '浦东惠南养护院项目', type: '土建类型', converted: true },
      ],
    },
  },

  deviceCenter: {
    summary: [
      { label: '单体总数 (个)', value: 4, icon: 'block', color: '#ff4d4f' },
      { label: '设备总数 (个)', value: 2550, icon: 'chart', color: '#1890ff' },
      { label: '设备类型总数 (个)', value: 15, icon: 'list', color: '#1890ff' },
    ],
    filters: [
      { key: 'unit', label: '所属单体', type: 'select', placeholder: '请选择 所属单体', options: ['东楼', '西楼', '地下室', '场地'] },
      { key: 'category', label: '设备分类', type: 'select', placeholder: '请选择 设备分类', options: ['监控设备', '消防设备', '暖通设备'] },
      { key: 'model', label: '关联模型', type: 'select', placeholder: '请选择 关联模型', options: ['是', '否'] },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '删除', class: 'danger' }, { label: '导出', class: 'warn' }],
    columns: [
      { key: 'unitName', label: '单体名称' }, { key: 'unitCode', label: '单体编码' }, { key: 'location', label: '安装位置' },
      { key: 'spaceCode', label: '空间编码' }, { key: 'spaceCategory', label: '空间大类' }, { key: 'linkedModel', label: '关联模型' },
      { key: 'elementId', label: 'ElementID' }, { key: 'deviceName', label: '设备名称' }, { key: 'status', label: '设备状态' },
    ],
    rowActions: ['删除', '查看', '编辑', '链接关系'],
    rows: [
      { unitName: '东楼', unitCode: 'E001', location: '东楼室外南', spaceCode: 'HNYHY-E001-01F-YC-40.40.06-00009', spaceCategory: '公共空间', linkedModel: '是', elementId: '8586810', deviceName: '1080P智能人脸抓拍枪式摄像机-1F-00113', status: '正常' },
      { unitName: '东楼', unitCode: 'E001', location: '东楼1F大厅', spaceCode: 'HNYHY-E001-01F-YC-40.40.06-00010', spaceCategory: '公共空间', linkedModel: '是', elementId: '8586811', deviceName: '感烟火灾探测器-1F-00201', status: '正常' },
      { unitName: '地下室', unitCode: 'DX01', location: '地下室B1', spaceCode: 'HNYHY-DX01-B1F-YC-40.40.06-00001', spaceCategory: '设备用房', linkedModel: '是', elementId: '8586900', deviceName: '排烟风机-B1-001', status: '离线' },
    ],
    total: 2550,
  },

  spaceCenter: {
    summary: [
      { label: '单体总数 (个)', value: 4, icon: 'block', color: '#ff4d4f' },
      { label: '空间总数 (个)', value: 1286, icon: 'block', color: '#ff4d4f' },
      { label: '总建筑面积 (m²)', value: '32140.000', icon: 'chart', color: '#1890ff' },
      { label: '总出租面积 (m²)', value: '18500.000', icon: 'chart', color: '#1890ff' },
      { label: '空间总费用 (元)', value: '0', icon: 'money', color: '#1890ff' },
    ],
    filters: [
      { key: 'unit', label: '所属单体', type: 'select', placeholder: '请选择 所属单体', options: ['东楼', '西楼', '地下室'] },
      { key: 'name', label: '空间名称', type: 'input', placeholder: '请输入 空间名称' },
      { key: 'code', label: '空间编码', type: 'input', placeholder: '请输入 空间编码' },
      { key: 'category', label: '空间分类', type: 'select', placeholder: '请选择 空间分类', options: ['公共空间', '办公空间'] },
      { key: 'model', label: '关联模型', type: 'select', placeholder: '请选择 关联模型', options: ['是', '否'] },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '导出', class: 'warn' }],
    columns: [
      { key: 'name', label: '空间名称', tree: true }, { key: 'code', label: '空间编码' }, { key: 'category', label: '空间大类' },
      { key: 'elementId', label: 'ElementId' }, { key: 'linkedModel', label: '关联模型' }, { key: 'usage', label: '空间用途' },
      { key: 'status', label: '空间状态' }, { key: 'area', label: '建筑面积' },
    ],
    rowActions: ['编辑'],
    rows: [
      { name: '东楼', code: 'E001', category: '—', elementId: '—', linkedModel: '是', usage: '—', status: '—', area: '0.000', level: 0 },
      { name: '地下室', code: 'DX01', category: '—', elementId: '—', linkedModel: '是', usage: '—', status: '—', area: '0.000', level: 0 },
      { name: '场地', code: 'W001', category: '—', elementId: '—', linkedModel: '否', usage: '—', status: '—', area: '0.000', level: 0 },
    ],
    total: 1286,
  },

  documentCenter: {
    projects: ['浦东惠南养护院项目'],
    selectedProject: '浦东惠南养护院项目',
    toolbar: [{ label: '上传文件 ▾', class: 'primary' }, { label: '新建文件夹', class: 'primary' }, { label: '新建在线文档', class: 'primary' }],
    columns: [{ key: 'name', label: '名称' }, { key: 'type', label: '类型' }, { key: 'date', label: '上传日期' }],
    rows: [],
    total: 0,
  },

  codingCenter: {
    filters: [
      { key: 'category', label: '类别', type: 'select', placeholder: '请选择 类别', options: ['建筑', '场地', '设备'] },
      { key: 'code', label: 'CODE', type: 'input', placeholder: '请输入 CODE' },
      { key: 'codeEn', label: 'CODE_EN', type: 'input', placeholder: '请输入 CODE_EN' },
      { key: 'lv1', label: 'LV1', type: 'input', placeholder: '请输入 LV1' },
      { key: 'lv2', label: 'LV2', type: 'input', placeholder: '请输入 LV2' },
      { key: 'lv3', label: 'LV3_CN', type: 'input', placeholder: '请输入 LV3_CN' },
      { key: 'lv4', label: 'LV4', type: 'input', placeholder: '请输入 LV4' },
    ],
    toolbar: [
      { label: '+ 新增', class: 'primary' }, { label: '更新编码', class: 'default' },
      { label: '+ 自定义编码及映射', class: 'default' }, { label: '资产分类设置', class: 'default' },
      { label: '下载编码模板', class: 'default' }, { label: '导出', class: 'warn' },
    ],
    columns: [
      { key: 'id', label: 'ID' }, { key: 'code', label: 'CODE' }, { key: 'codeEn', label: 'CODE_EN' },
      { key: 'lv1', label: 'LV1' }, { key: 'lv2', label: 'LV2' }, { key: 'lv3', label: 'LV3_CN' },
      { key: 'lv4', label: 'LV4' }, { key: 'desc', label: 'Description' }, { key: 'note', label: '备注' }, { key: 'color', label: '颜色' },
    ],
    rowActions: ['查看', '编辑', '删除', '设置颜色'],
    rows: [
      { id: 1001, code: 'YC-10.00.00', codeEn: 'NNRD', lv1: '建筑', lv2: '场地', lv3: '道路', lv4: '地柱', desc: '—', note: '—', color: '—' },
      { id: 1002, code: 'YC-10.01.00', codeEn: 'NLHD', lv1: '建筑', lv2: '场地', lv3: '湖泊', lv4: '—', desc: '—', note: '—', color: '—' },
      { id: 1003, code: 'YC-10.02.00', codeEn: 'NBRG', lv1: '建筑', lv2: '场地', lv3: '桥', lv4: '—', desc: '—', note: '—', color: '—' },
      { id: 1004, code: 'YC-10.03.00', codeEn: 'NGVT', lv1: '建筑', lv2: '场地', lv3: '绿化带', lv4: '—', desc: '—', note: '—', color: '—' },
      { id: 1005, code: 'YC-10.04.00', codeEn: 'NPARK', lv1: '建筑', lv2: '场地', lv3: '停车场', lv4: '—', desc: '—', note: '—', color: '—' },
    ],
    total: 243,
  },

  channelConfig: {
    toolbar: [{ label: '+ 新增', class: 'primary' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'module', label: '渠道模块' }, { key: 'name', label: '配置名称' },
      { key: 'sort', label: '排序' }, { key: 'status', label: '状态' }, { key: 'creator', label: '创建人' },
      { key: 'createTime', label: '创建时间' }, { key: 'modifier', label: '修改人' }, { key: 'updateTime', label: '更新时间' },
    ],
    rowActions: ['编辑', '删除'],
    rows: [
      { index: 1, module: '门禁', name: '—', sort: '999', status: '启用', creator: '1906975458160734209', createTime: '2025-06-26 15:48:39', modifier: '1906975458160734209', updateTime: '2025-06-26 15:48:39' },
    ],
    total: 1,
  },

  supplierMgmt: {
    filters: [
      { key: 'location', label: '空间位置', type: 'select', placeholder: '请选择 空间位置', options: ['东楼', '西楼'] },
      { key: 'keyword', label: '关键词', type: 'input', placeholder: '模糊匹配参与企业名称、企业编号、联系人、注册地址', wide: true },
      { key: 'date', label: '创建时间', type: 'daterange', placeholder: '请选择开始时间 - 请选择结束时间' },
    ],
    toolbar: [
      { label: '+ 新增', class: 'primary' }, { label: '批量删除', class: 'danger' },
      { label: '下载模板', class: 'success' }, { label: '导出', class: 'warn' }, { label: '导入', class: 'success' },
    ],
    columns: [
      { key: 'index', label: '#' }, { key: 'company', label: '参与方企业名称' }, { key: 'code', label: '参与方企业编号' },
      { key: 'contact', label: '联系人' }, { key: 'credit', label: '社会信用代码' }, { key: 'note', label: '备注' },
    ],
    rowActions: ['编辑', '删除', '查看'],
    rows: [
      { index: 1, company: '上海啪啪教育有限公司', code: '121212', contact: '董', credit: '412414142221412365', note: '—' },
      { index: 2, company: '上海测试供应商A', code: 'SUP001', contact: '郝佳丽', credit: '91310000MA1FL2XXXX', note: '—' },
      { index: 3, company: '上海维保服务有限公司', code: 'SUP002', contact: '张工', credit: '91310000MA1FL3YYYY', note: '长期合作' },
    ],
    total: 10,
  },

  warehouseMgmt: {
    toolbar: [{ label: '新增', class: 'primary' }],
    columns: [
      { key: 'index', label: '序号' }, { key: 'name', label: '仓库名称', tree: true }, { key: 'code', label: '仓库编码' },
      { key: 'manager', label: '负责人' }, { key: 'phone', label: '联系方式' }, { key: 'note', label: '备注' },
      { key: 'updater', label: '更新人' }, { key: 'updateTime', label: '更新时间' },
    ],
    rowActions: ['编辑', '删除'],
    rows: [
      { index: 1, name: '总仓库', code: 'WH202401001', manager: 'admin', phone: '15625625632', note: '—', updater: '陈三', updateTime: '2025-06-26 15:48:39', level: 0 },
      { index: 7, name: '仓库一', code: 'WH202401007', manager: 'admin', phone: '15625625632', note: '—', updater: '王五', updateTime: '2025-06-25 10:20:00', level: 0, expanded: true },
      { index: 8, name: '仓库1-1', code: 'WH202401008', manager: 'admin', phone: '15625625632', note: '—', updater: '赵六', updateTime: '2025-06-24 09:15:00', level: 1 },
      { index: 9, name: '101仓库', code: 'WH202401009', manager: 'admin', phone: '15625625632', note: '—', updater: '赵六', updateTime: '2025-06-23 11:30:00', level: 1 },
    ],
    total: 243,
  },

  scheduleTable: {
    month: '2025-12',
    highlightDay: 23,
  },

  scheduleMgmt: {
    filters: [
      { key: 'name', label: '排班名称', type: 'input', placeholder: '请输入 排班名称' },
      { key: 'type', label: '排班类型', type: 'select', placeholder: '请选择 排班类型', options: ['月', '周', '日'] },
      { key: 'status', label: '状态', type: 'select', placeholder: '请选择 状态', options: ['启用', '禁用'] },
    ],
    toolbar: [{ label: '新增', class: 'primary' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'name', label: '排班名称' }, { key: 'type', label: '排班类型' },
      { key: 'cycle', label: '排班周期' }, { key: 'staff', label: '排班人员' }, { key: 'effective', label: '生效时间' }, { key: 'status', label: '状态' },
    ],
    rowActions: ['编辑', '人员设置', '禁用', '删除'],
    rows: [
      { index: 1, name: '白班', type: '月', cycle: '1', staff: '—', effective: '2025-12-12', status: '启用' },
    ],
    total: 1,
  },

  shiftMgmt: {
    filters: [
      { key: 'name', label: '班次名称', type: 'input', placeholder: '请输入 班次名称' },
      { key: 'status', label: '状态', type: 'select', placeholder: '请选择 状态', options: ['启用', '禁用'] },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'name', label: '班次名称' }, { key: 'code', label: '编号' },
      { key: 'period', label: '时段' }, { key: 'note', label: '备注' }, { key: 'status', label: '状态' },
    ],
    rowActions: ['编辑', '删除', '禁用'],
    rows: [
      { index: 1, name: '2', code: 'BC202512120001', period: '15:23:57-15:23:57', note: '—', status: '启用' },
    ],
    total: 1,
  },

  workgroup: {
    filters: [
      { key: 'code', label: '编码', type: 'input', placeholder: '请输入 编码' },
      { key: 'name', label: '工作组', type: 'input', placeholder: '请输入 工作组' },
      { key: 'status', label: '状态', type: 'select', placeholder: '请选择 状态', options: ['启用', '禁用'] },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }, { label: '导出', class: 'warn' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'code', label: '编码' }, { key: 'name', label: '工作组' },
      { key: 'type', label: '类型' }, { key: 'staff', label: '工作人员' }, { key: 'status', label: '状态' },
    ],
    rowActions: ['编辑', '删除'],
    rows: [],
    total: 0,
    empty: true,
  },

  deptMgmt: {
    filters: [
      { key: 'name', label: '项目名称', type: 'input', placeholder: '请输入项目名称' },
      { key: 'type', label: '项目类型', type: 'select', placeholder: '请选择项目类型', options: ['公共建筑', '园区'] },
    ],
    toolbar: [{ label: '+ 新增', class: 'primary' }],
    columns: [
      { key: 'index', label: '#' }, { key: 'name', label: '项目名称' }, { key: 'address', label: '项目地址' },
      { key: 'type', label: '项目类型' }, { key: 'area', label: '总建筑面积 (m²)' }, { key: 'openDate', label: '开业时间' },
      { key: 'prefix', label: '项目前缀' }, { key: 'members', label: '项目成员' },
    ],
    rowActions: ['查看', '编辑'],
    rows: [
      { index: 1, name: '浦东海滨垃圾焚烧厂', address: '—', type: '公共建筑', area: '34200.00', openDate: '—', prefix: 'PHFS2024', members: '管理员1' },
      { index: 2, name: '新增测试的', address: '新金桥大厦', type: '租赁房|办公楼|住宅', area: '1111000.00', openDate: '2025-06-24', prefix: '—', members: '管理员1' },
      { index: 3, name: '上海生物芯片智慧园区', address: '—', type: '园区', area: '85600.00', openDate: '—', prefix: 'SWXP2024', members: '管理员1' },
    ],
    total: 17,
  },

  positionMgmt: { filters: [{ key: 'name', label: '岗位名称', type: 'input', placeholder: '请输入 岗位名称' }], toolbar: [{ label: '+ 新增', class: 'primary' }], columns: [{ key: 'index', label: '#' }, { key: 'name', label: '岗位名称' }, { key: 'dept', label: '所属部门' }, { key: 'status', label: '状态' }], rowActions: ['编辑', '删除'], rows: [{ index: 1, name: '系统管理员', dept: '信息科', status: '启用' }], total: 1 },
  officePersonnel: { filters: [{ key: 'name', label: '姓名', type: 'input', placeholder: '请输入 姓名' }], toolbar: [{ label: '+ 新增', class: 'primary' }], columns: [{ key: 'index', label: '#' }, { key: 'name', label: '姓名' }, { key: 'office', label: '办公点' }, { key: 'dept', label: '部门' }], rowActions: ['编辑', '删除'], rows: [{ index: 1, name: '管理员1', office: '延安东路300号', dept: '机关事务管理局' }], total: 1 },
  roleMgmt: { filters: [{ key: 'name', label: '角色名称', type: 'input', placeholder: '请输入 角色名称' }], toolbar: [{ label: '+ 新增', class: 'primary' }], columns: [{ key: 'index', label: '#' }, { key: 'name', label: '角色名称' }, { key: 'code', label: '角色编码' }, { key: 'status', label: '状态' }], rowActions: ['编辑', '删除'], rows: [{ index: 1, name: '超级管理员', code: 'admin', status: '启用' }], total: 1 },
  userMgmt: { filters: [{ key: 'name', label: '用户名', type: 'input', placeholder: '请输入 用户名' }], toolbar: [{ label: '+ 新增', class: 'primary' }], columns: [{ key: 'index', label: '#' }, { key: 'name', label: '用户名' }, { key: 'realName', label: '姓名' }, { key: 'dept', label: '部门' }, { key: 'status', label: '状态' }], rowActions: ['编辑', '删除', '重置密码'], rows: [{ index: 1, name: 'admin', realName: '管理员', dept: '信息科', status: '启用' }], total: 1 },
  logMgmt: { filters: [{ key: 'user', label: '操作人', type: 'input', placeholder: '请输入 操作人' }], toolbar: [{ label: '导出', class: 'warn' }], columns: [{ key: 'index', label: '#' }, { key: 'user', label: '操作人' }, { key: 'action', label: '操作内容' }, { key: 'time', label: '操作时间' }, { key: 'ip', label: 'IP地址' }], rows: [{ index: 1, user: 'admin', action: '登录系统', time: '2025-12-23 09:00:00', ip: '192.168.1.100' }], total: 1 },
  officeMgmt: { filters: [{ key: 'name', label: '办公点名称', type: 'input', placeholder: '请输入 办公点名称' }], toolbar: [{ label: '+ 新增', class: 'primary' }], columns: [{ key: 'index', label: '#' }, { key: 'name', label: '办公点名称' }, { key: 'address', label: '地址' }, { key: 'status', label: '状态' }], rowActions: ['编辑', '删除'], rows: [{ index: 1, name: '延安东路300号', address: '上海市黄浦区延安东路300号', status: '启用' }], total: 1 },
};
