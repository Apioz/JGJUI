/* 食堂管理 & 物业管理 — 页面数据 */

const MP_CANTEEN_PROPERTY_DATA = {
  canteenCardRecords: {
    summary: [
      { label: '今日刷卡人次', value: '2,847', icon: 'personnel', color: '#1890ff', trend: 8.2 },
      { label: '今日消费金额', value: '2,847,456', icon: 'value', color: '#1890ff', trend: 8.2 },
      { label: '人均消费', value: '2,847,456', icon: 'value', color: '#1890ff', trend: 8.2 },
    ],
    trendWeek: {
      labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      byCount: [
        { name: '早餐', color: '#52c41a', data: [320, 380, 450, 420, 480, 350, 280] },
        { name: '午餐', color: '#13c2c2', data: [480, 520, 580, 560, 620, 490, 410] },
        { name: '晚餐', color: '#1890ff', data: [380, 420, 490, 460, 520, 390, 320] },
      ],
      byAmount: [
        { name: '早餐', color: '#52c41a', data: [3200, 3800, 4500, 4200, 4800, 3500, 2800] },
        { name: '午餐', color: '#13c2c2', data: [4800, 5200, 5800, 5600, 6200, 4900, 4100] },
        { name: '晚餐', color: '#1890ff', data: [3800, 4200, 4900, 4600, 5200, 3900, 3200] },
      ],
    },
    trendMonth: {
      labels: ['1日', '5日', '10日', '15日', '20日', '25日', '30日'],
      byCount: [
        { name: '早餐', color: '#52c41a', data: [280, 310, 340, 360, 390, 410, 430] },
        { name: '午餐', color: '#13c2c2', data: [420, 460, 500, 540, 580, 600, 620] },
        { name: '晚餐', color: '#1890ff', data: [320, 350, 380, 400, 430, 450, 470] },
      ],
      byAmount: [
        { name: '早餐', color: '#52c41a', data: [2800, 3100, 3400, 3600, 3900, 4100, 4300] },
        { name: '午餐', color: '#13c2c2', data: [4200, 4600, 5000, 5400, 5800, 6000, 6200] },
        { name: '晚餐', color: '#1890ff', data: [3200, 3500, 3800, 4000, 4300, 4500, 4700] },
      ],
    },
    consumptionTable: {
      rows: [
        { index: 1, canteen: '食堂1', bCount: 165, bAmount: 1562, lCount: 258, lAmount: 1521, dCount: 379, dAmount: 1905, total: 12304, time: '2025-03-12' },
        { index: 2, canteen: '食堂1', bCount: 165, bAmount: 1264, lCount: 258, lAmount: 1856, dCount: 379, dAmount: 1915.2, total: 12304, time: '2025/3/12' },
        { index: 3, canteen: '食堂1', bCount: 166, bAmount: 2354, lCount: 259, lAmount: 2415, dCount: 380, dAmount: 1925.4, total: 12305, time: '2025/3/13' },
        { index: 4, canteen: '食堂1', bCount: 167, bAmount: 2634, lCount: 260, lAmount: 1752, dCount: 381, dAmount: 1935.6, total: 12306, time: '2025/3/14' },
        { index: 5, canteen: '食堂1', bCount: 168, bAmount: 1563, lCount: 261, lAmount: 1624, dCount: 382, dAmount: 1945.8, total: 12307, time: '2025/3/15' },
        { index: 6, canteen: '食堂1', bCount: 169, bAmount: 3454, lCount: 262, lAmount: 1864.2, dCount: 383, dAmount: 1955, total: 12308, time: '2025/3/16' },
        { index: 7, canteen: '食堂1', bCount: 170, bAmount: 4139, lCount: 263, lAmount: 1874.4, dCount: 384, dAmount: 1966.2, total: 12309, time: '2025/3/17' },
        { index: 8, canteen: '食堂1', bCount: 171, bAmount: 4824, lCount: 264, lAmount: 1884.6, dCount: 385, dAmount: 1976.4, total: 12310, time: '2025/3/18' },
        { index: 9, canteen: '食堂1', bCount: 172, bAmount: 1564, lCount: 265, lAmount: 1894.8, dCount: 386, dAmount: 1986.6, total: 12311, time: '2025/3/19' },
        { index: 10, canteen: '食堂1', bCount: 173, bAmount: 5509, lCount: 266, lAmount: 1905, dCount: 387, dAmount: 1996.8, total: 12312, time: '2025/3/20' },
      ],
      total: 100,
    },
  },

  canteenOperation: {
    summary: [
      { label: '今日预定总数', value: 1236, icon: 'inventory', color: '#1890ff', trend: 3.5 },
      { label: '客饭预定数', value: 100, icon: 'canteen', color: '#722ed1', trend: 3.5 },
      { label: '线上预定数', value: 100, icon: 'wifi', color: '#13c2c2', trend: 3.5 },
      { label: '实际就餐数', value: 100, icon: 'personnel', color: '#52c41a', trend: 3.5 },
    ],
    operationTable: {
      rows: [
        { index: 1, date: '2024-03-25', meal: '午餐', location: '延安东路300号', diners: 1000, booked: 1000, actual: 920 },
        { index: 2, date: '2024-03-25', meal: '午餐', location: '延安东路300号', diners: 800, booked: 800, actual: 820 },
        { index: 3, date: '2024-03-25', meal: '午餐', location: '延安东路300号', diners: 700, booked: 700, actual: 680 },
        { index: 4, date: '2024-03-25', meal: '午餐', location: '延安东路300号', diners: 1000, booked: 1000, actual: 920 },
        { index: 5, date: '2024-03-25', meal: '午餐', location: '延安东路300号', diners: 800, booked: 800, actual: 820 },
        { index: 6, date: '2024-03-25', meal: '午餐', location: '延安东路300号', diners: 700, booked: 700, actual: 680 },
        { index: 7, date: '2024-03-25', meal: '午餐', location: '延安东路300号', diners: 1000, booked: 1000, actual: 920 },
        { index: 8, date: '2024-03-25', meal: '午餐', location: '延安东路300号', diners: 800, booked: 800, actual: 820 },
        { index: 9, date: '2024-03-25', meal: '午餐', location: '延安东路300号', diners: 700, booked: 700, actual: 680 },
        { index: 10, date: '2024-03-25', meal: '午餐', location: '延安东路300号', diners: 1000, booked: 1000, actual: 920 },
      ],
      total: 100,
    },
    top5: {
      labels: ['周一', '周二', '周三', '周四', '周五'],
      actual: [10, 20, 30, 40, 50],
      booked: [10, 20, 30, 40, 50],
    },
    menuWeek: '2024年第13周 (3/25-3/31)',
    menu: {
      days: ['3/25 周一', '3/26 周二', '3/27 周三', '3/28 周四', '3/29 周五', '3/30 周六', '3/31 周日'],
      meals: [
        {
          name: '早餐',
          items: [
            ['肉包', '菜包', '茶叶蛋', '小米粥'],
            ['馒头', '花卷', '煮蛋', '豆浆'],
            ['油条', '蒸饺', '茶叶蛋', '南瓜粥'],
            ['肉包', '菜包', '煮蛋', '黑米粥'],
            ['炒面', '炒饭', '茶叶蛋', '豆浆'],
            ['馒头', '花卷', '煮蛋', '小米粥'],
            ['肉包', '菜包', '茶叶蛋', '豆浆'],
          ],
        },
        {
          name: '午餐',
          items: [
            ['红烧肉', '清蒸鱼', '西红柿炒蛋', '炒青菜', '紫菜蛋汤'],
            ['宫保鸡丁', '回锅肉', '蒜蓉西兰花', '凉拌黄瓜', '冬瓜丸子汤'],
            ['土豆烧牛肉', '麻婆豆腐', '干煸豆角', '炒时蔬', '番茄蛋汤'],
            ['糖醋排骨', '鱼香肉丝', '地三鲜', '炒青菜', '骨头汤'],
            ['奥尔良烤翅', '木须肉', '尖椒土豆丝', '炒油麦菜', '西湖牛肉羹'],
            ['红烧肉', '清蒸鱼', '西红柿炒蛋', '炒青菜', '紫菜蛋汤'],
            ['饺子', '包子', '凉菜', '粥'],
          ],
        },
        {
          name: '晚餐',
          items: [
            ['宫保鸡丁', '回锅肉', '蒜蓉西兰花', '凉拌黄瓜'],
            ['土豆烧牛肉', '麻婆豆腐', '干煸豆角', '炒时蔬'],
            ['糖醋排骨', '鱼香肉丝', '地三鲜', '炒青菜'],
            ['奥尔良烤翅', '木须肉', '尖椒土豆丝', '炒油麦菜'],
            ['红烧肉', '清蒸鱼', '西红柿炒蛋', '炒青菜'],
            ['饺子', '包子', '凉菜', '粥'],
            ['面条', '炒饭', '小菜', '汤'],
          ],
        },
      ],
    },
  },

  canteenSupervision: {
    statusCards: [
      { label: '三清三关状态', value: '通过', icon: 'shield', color: '#52c41a' },
      { label: '留样菜监测', value: '通过', icon: 'shield', color: '#faad14' },
      { label: '晨检结果', value: '通过', icon: 'shield', color: '#52c41a' },
    ],
    table: {
      rows: Array.from({ length: 7 }, (_, i) => ({
        index: i + 1,
        cleanStatus: '通过',
        sampleStatus: '通过',
        morningStatus: '通过',
        time: `2026/5/${21 + i}`,
      })),
      total: 100,
    },
  },

  propertyRepairNew: {
    orderTypes: ['报修', '维保', '巡检'],
    processTypes: ['简要工单处理', '报修流程', '报修流程1111'],
    sources: ['电话', 'APP', 'Web'],
    problemTypes: ['设备故障', '设施损坏', '其他'],
    urgencyLevels: ['一般', '紧急', '特急'],
    handleTypes: ['自修', '外委'],
  },

  propertyTodo: {
    categoryBadges: [
      { label: '报修', count: 3, color: '#ff4d4f' },
      { label: '巡检', count: 3, color: '#1890ff' },
      { label: '维保', count: 0, color: '#fa8c16' },
    ],
    rows: [
      { id: '9d2f9ec6de8e482-BX-202604170001', node: '处理工单', processName: '简要工单处理', processId: 'BX-brief', serial: 'BX-20260417-0009', applicant: '管理员1', time: '2026-04-17 15:40' },
      { id: '9d2f9ec6de8e482-BX-202604090001', node: '处理工单', processName: '简要工单处理', processId: 'BX-brief', serial: 'BX-20260409-0008', applicant: '管理员1', time: '2026-04-09 17:08' },
      { id: '724c7104c6474a1-XJ-202604060001', node: '派单', processName: '巡检流程', processId: 'XJ-common', serial: 'XJ-20260406-1117', applicant: '管理员1', time: '2026-04-06 17:23' },
      { id: '724c7104c6474a1-XJ-202604050001', node: '派单', processName: '巡检流程', processId: 'XJ-common', serial: 'XJ-20260405-1116', applicant: '管理员1', time: '2026-04-05 17:23' },
      { id: '724c7104c6474a1-XJ-202604040001', node: '派单', processName: '巡检流程', processId: 'XJ-common', serial: 'XJ-20260404-1115', applicant: '管理员1', time: '2026-04-04 17:23' },
      { id: '9d2f9ec6de8e482-BX-202604030001', node: '验证关单', processName: '报修流程1111', processId: 'BX-common111', serial: 'BX-20260403-0305', applicant: '管理员1', time: '2026-04-03 17:03' },
      { id: '9d2f9ec6de8e482-BX-202603100002', node: '验证关单', processName: '报修流程', processId: 'BX-common', serial: 'BX-20260310-0976', applicant: '管理员1', time: '2026-03-10 16:15' },
      { id: '9d2f9ec6de8e482-BX-202603100001', node: '验证关单', processName: '报修流程', processId: 'BX-common', serial: 'BX-20260310-0975', applicant: '管理员1', time: '2026-03-10 16:08' },
    ],
  },

  propertyInitiated: {
    statusBadges: [
      { label: '派单', count: 3, color: '#1890ff' },
      { label: '接单', count: 0, color: '#fa8c16' },
      { label: '完成', count: 0, color: '#fa8c16' },
      { label: '签字', count: 0, color: '#fa8c16' },
      { label: '关单', count: 1, color: '#52c41a' },
      { label: '结案', count: 0, color: '#bfbfbf' },
      { label: '取消', count: 1, color: '#bfbfbf' },
    ],
    rows: [
      { id: '9d2f9ec6de8e482-BX-202604170001', node: '处理工单', serial: 'BX-20260417-0009', processName: '简要工单处理', processId: 'BX-brief', category: '报修', handler: '管理员1', status: '进行中' },
      { id: '9d2f9ec6de8e482-BX-202604090001', node: '处理工单', serial: 'BX-20260409-0008', processName: '简要工单处理', processId: 'BX-brief', category: '报修', handler: '管理员1', status: '进行中' },
      { id: '724c7104c6474a1-XJ-202604060001', node: '派单', serial: 'XJ-20260406-1117', processName: '巡检流程', processId: 'XJ-common', category: '巡检', handler: '管理员1/生物芯片...', status: '进行中' },
      { id: '724c7104c6474a1-XJ-202604050001', node: '派单', serial: 'XJ-20260405-1116', processName: '巡检流程', processId: 'XJ-common', category: '巡检', handler: '管理员1/生物芯片...', status: '进行中' },
      { id: '724c7104c6474a1-XJ-202604040001', node: '派单', serial: 'XJ-20260404-1115', processName: '巡检流程', processId: 'XJ-common', category: '巡检', handler: '管理员1/生物芯片...', status: '进行中' },
      { id: '9d2f9ec6de8e482-BX-202604030001', node: '验证关单', serial: 'BX-20260403-0305', processName: '报修流程1111', processId: 'BX-common111', category: '报修', handler: '管理员1/生物芯片...', status: '进行中' },
      { id: '9d2f9ec6de8e482-BX-202603240001', node: '结束', serial: 'BX-20260324-0137', processName: '报修流程(最新需求...)', processId: 'BX-common_Appro...', category: '报修', handler: '无', status: '已终结' },
    ],
  },

  propertyDone: {
    categoryBadges: [
      { label: '报修', count: 55, color: '#ff4d4f' },
      { label: '退仓', count: 13, color: '#1890ff' },
      { label: '维保', count: 19, color: '#fa8c16' },
    ],
    rows: [
      { id: '9d2f9ec6de8e482-BX-202603100002', action: '完成上报', serial: 'BX-20260310-0976', processName: '报修流程', processId: 'BX-common', category: '报修', applicant: '管理员1', time: '2026-03-10 16:09' },
      { id: '9d2f9ec6de8e482-BX-202603100001', action: '接单', serial: 'BX-20260310-0975', processName: '简要工单处理', processId: 'BX-brief', category: '报修', applicant: '管理员1', time: '2026-03-10 16:08' },
      { id: '724c7104c6474a1-XJ-202604060001', action: '派单', serial: 'XJ-20260406-1117', processName: '巡检流程', processId: 'XJ-common', category: '巡检', applicant: '管理员1', time: '2026-04-06 17:23' },
    ],
  },

  propertyCompleted: {
    rows: [
      { id: '9d2f9ec6de8e482-BX-202603240001', processName: '报修流程(最新需...)', processId: 'BX-common', serial: 'BX-20260324-01...', category: '报修', node: '结束', applicant: '管理员1', applyTime: '2026-03-24 10:32', status: '已终结' },
      { id: '9d2f9ec6de8e482-BX-202512300002', processName: '报修流程', processId: 'BX-common', serial: 'BX-20251230-00...', category: '报修', node: '结束', applicant: '小贺', applyTime: '2025-12-30 16:16', status: '已完成' },
      { id: '9d2f9ec6de8e482-BX-202512170001', processName: '简易工单处理', processId: 'BX-brief', serial: 'BX-20251217-00...', category: '报修', node: '结束', applicant: '管理员1', applyTime: '2025-12-17 10:00', status: '已完成' },
      { id: '9d2f9ec6de8e482-WB-202512050006', processName: '维保工单', processId: 'WB-common', serial: 'WB-20251205-00...', category: '维保', node: '结束', applicant: '管理员1', applyTime: '2025-12-05 14:20', status: '已完成' },
    ],
  },

  propertyScheduleTable: {
    month: '2024-04',
    shifts: [
      { date: '03/30', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
      { date: '04/02', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
      { date: '04/06', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
      { date: '04/09', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
      { date: '04/13', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
      { date: '04/16', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
      { date: '04/20', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
      { date: '04/23', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
      { date: '04/27', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
      { date: '04/30', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
      { date: '05/02', code: 'DQ', time: '09:00:00-11:30:00', tag: '运维' },
    ],
  },

  propertyScheduleMgmt: {
    rows: [{ index: 1, name: '巡检', type: '周', period: 2, staff: 1, effective: '2023-11-17', status: '启用' }],
    total: 1,
  },

  propertyShiftMgmt: {
    rows: [
      { index: 1, name: '巡检', code: 'BC202311140001', slot: '09:00:00-11:30:00', note: '', status: '启用' },
      { index: 2, name: '巡检1', code: 'BC202307260001', slot: '08:00:00-17:00:00', note: '', status: '启用' },
    ],
    total: 2,
  },

  propertyWorkgroup: {
    rows: [
      { index: 1, code: '9d2f9ec6de8e482202507260002', name: '维保', type: '维保', staff: 4, status: '启用' },
      { index: 2, code: '9d2f9ec6de8e482202507260001', name: '巡检', type: '巡检', staff: 4, status: '启用' },
      { index: 3, code: '9d2f9ec6de8e482202507260001', name: '厨师', type: '应急', staff: 4, status: '启用' },
    ],
    total: 3,
  },
};

Object.assign(MP_PAGE_DATA, MP_CANTEEN_PROPERTY_DATA);

Object.assign(MP_PAGE_REGISTRY, {
  'canteen-card-records': { type: 'canteen-card', dataKey: 'canteenCardRecords' },
  'canteen-operation': { type: 'canteen-operation', dataKey: 'canteenOperation' },
  'canteen-supervision': { type: 'canteen-supervision', dataKey: 'canteenSupervision' },
  'property-repair-new': { type: 'property-repair-new', dataKey: 'propertyRepairNew' },
  'property-todo': { type: 'property-workflow', dataKey: 'propertyTodo', workflowMode: 'todo' },
  'property-initiated': { type: 'property-workflow', dataKey: 'propertyInitiated', workflowMode: 'initiated' },
  'property-done': { type: 'property-workflow', dataKey: 'propertyDone', workflowMode: 'done' },
  'property-completed': { type: 'property-workflow', dataKey: 'propertyCompleted', workflowMode: 'completed' },
  'property-schedule-table': { type: 'property-schedule-cal', dataKey: 'propertyScheduleTable' },
  'property-schedule-mgmt': { type: 'property-crud-table', dataKey: 'propertyScheduleMgmt', crudType: 'schedule' },
  'property-shift-mgmt': { type: 'property-crud-table', dataKey: 'propertyShiftMgmt', crudType: 'shift' },
  'property-workgroup': { type: 'property-crud-table', dataKey: 'propertyWorkgroup', crudType: 'workgroup' },
});
