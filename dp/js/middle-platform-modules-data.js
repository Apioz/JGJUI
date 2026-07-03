const MIDDLE_PLATFORM_MODULES = {
  /** 数据看板 */
  dashboard: {
    deviceStatus: {
      total: 2805,
      items: [
        { name: '离线', count: 4, percent: 0.14, color: '#1890ff' },
        { name: '停用', count: 11, percent: 0.39, color: '#13c2c2' },
        { name: '正常运行', count: 2790, percent: 99.47, color: '#52c41a' },
        { name: '故障', count: 10, percent: 0.36, color: '#faad14' },
        { name: '维修中', count: 6, percent: 0.21, color: '#fa8c16' },
      ],
    },

    commonFunctions: [
      { id: 'canteen', label: '食堂管理', icon: 'canteen', targetPath: 'canteen' },
      { id: 'energy', label: '能耗管理', icon: 'energy', targetPath: 'energy' },
      { id: 'security', label: '安全管理', icon: 'security', targetPath: 'security' },
      { id: 'property', label: '物业管理', icon: 'property', targetPath: 'property' },
    ],

    todoStats: {
      categories: ['维修工单', '维修审核', '维修验证', '维保任务', '维保验证', '巡检任务', '巡检验证'],
      today: { 维修工单: 0, 维修审核: 0, 维修验证: 0, 维保任务: 0, 维保验证: 0, 巡检任务: 0, 巡检验证: 0 },
      week: { 维修工单: 0, 维修审核: 0, 维修验证: 0, 维保任务: 0, 维保验证: 0, 巡检任务: 0, 巡检验证: 0 },
      month: { 维修工单: 0, 维修审核: 0, 维修验证: 0, 维保任务: 0, 维保验证: 0, 巡检任务: 0, 巡检验证: 0 },
    },

    repairClassify: {
      segments: [
        { name: '待接单', count: 5, color: '#597ef7' },
        { name: '待维修', count: 3, color: '#1890ff' },
        { name: '维修中', count: 2, color: '#52c41a' },
        { name: '待验证', count: 1, color: '#faad14' },
        { name: '待审核', count: 0, color: '#ff4d4f' },
        { name: '审核中', count: 2, color: '#69c0ff' },
        { name: '审核驳回', count: 1, color: '#389e0d' },
        { name: '已完成', count: 9, color: '#fa8c16' },
      ],
      cards: [
        { label: '工单总数', value: 23, icon: 'total', color: '#1890ff' },
        { label: '待维修', value: 3, icon: 'pending', color: '#ff4d4f' },
        { label: '维修中', value: 2, icon: 'repairing', color: '#1890ff' },
        { label: '待验证', value: 1, icon: 'verify', color: '#52c41a' },
        { label: '待审核', value: 0, icon: 'audit', color: '#faad14' },
        { label: '已完成', value: 9, icon: 'done', color: '#52c41a' },
      ],
    },

    repairTrend: {
      week7: {
        labels: ['星期二', '星期三', '星期四', '星期五', '星期六', '星期日', '星期一'],
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      week30: {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
        data: Array.from({ length: 30 }, () => 0),
      },
      year: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        data: [2, 1, 3, 2, 4, 3, 2, 1, 3, 2, 1, 2],
      },
    },

    maintenanceTask: {
      total: 93,
      rate: 0,
      segments: [
        { name: '待执行', count: 92, color: '#1890ff' },
        { name: '已完成', count: 0, color: '#52c41a' },
        { name: '已跳过', count: 0, color: '#faad14' },
        { name: '待验证', count: 1, color: '#69c0ff' },
        { name: '已驳回', count: 0, color: '#ff4d4f' },
      ],
      statusCounts: [
        { label: '待执行', value: 92, color: '#1890ff' },
        { label: '已完成', value: 0, color: '#52c41a' },
        { label: '已跳过', value: 0, color: '#69c0ff' },
        { label: '待验证', value: 1, color: '#ff4d4f' },
        { label: '已驳回', value: 0, color: '#faad14' },
      ],
    },

    inspectionTask: {
      total: 934,
      rate: 1.93,
      segments: [
        { name: '待执行', count: 850, color: '#1890ff' },
        { name: '已完成', count: 18, color: '#52c41a' },
        { name: '已跳过', count: 0, color: '#faad14' },
        { name: '待验证', count: 66, color: '#ff4d4f' },
        { name: '已驳回', count: 0, color: '#69c0ff' },
      ],
      statusCounts: [
        { label: '待执行', value: 850 },
        { label: '已完成', value: 18 },
        { label: '已跳过', value: 0 },
        { label: '待验证', value: 66 },
        { label: '已驳回', value: 0 },
      ],
    },

    systemMessages: [
      { content: '您有一条新的巡检任务: 每天2次执行任务2, 请及时处理', type: '巡检消息', time: '2025-09-17 13:25:00' },
      { content: '您有一条新的巡检任务: 每天2次执行任务1, 请及时处理', type: '巡检消息', time: '2025-09-17 13:25:00' },
      { content: '巡检任务: 09111待您验证, 请及时处理', type: '巡检消息', time: '2025-09-11 11:54:34' },
      { content: '您有一条新的巡检任务: 09111, 请及时处理', type: '巡检消息', time: '2025-09-11 09:20:00' },
      { content: '巡检任务: 重新多个5待您验证, 请及时处理', type: '巡检消息', time: '2025-09-11 08:05:56' },
      { content: '您有一条新的巡检任务: 机关30, 请及时处理', type: '巡检消息', time: '2025-08-30 00:00:05' },
      { content: '您有一条新的巡检任务: 机关29, 请及时处理', type: '巡检消息', time: '2025-08-30 00:00:05' },
      { content: '您有一条新的巡检任务: 机关28, 请及时处理', type: '巡检消息', time: '2025-08-30 00:00:05' },
      { content: '您有一条新的巡检任务: 机关27, 请及时处理', type: '巡检消息', time: '2025-08-30 00:00:05' },
      { content: '您有一条新的巡检任务: 机关26, 请及时处理', type: '巡检消息', time: '2025-08-30 00:00:05' },
    ],
  },

  /** 停车总览 */
  parkingOverview: {
    kpiCards: [
      { label: '在场车辆总数', value: 15, unit: '辆', color: '#1890ff', icon: 'forbidden' },
      { label: '总车位数', value: 128, unit: '个', color: '#722ed1', icon: 'trendUp' },
      { label: '剩余车位数', value: 12, unit: '个', color: '#52c41a', icon: 'building' },
      { label: '今日入场', value: 421, unit: '辆', trend: 8.2, trendLabel: '较昨日', color: '#13c2c2', icon: 'inbound' },
      { label: '今日出场', value: 456, unit: '辆', trend: 8.2, trendLabel: '较昨日', color: '#fa8c16', icon: 'outbound' },
      { label: '内部车辆占比', value: 56, unit: '%', color: '#2f54eb', icon: 'building' },
    ],
    trafficTrend: {
      periodOptions: ['today', 'week', 'month'],
      periodLabels: { today: '今日', week: '本周', month: '本月' },
      hours: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      today: {
        entry: [12, 8, 5, 10, 45, 120, 180, 165, 140, 110, 85, 95, 130, 155, 170, 160, 145, 175, 190, 165, 120, 80, 45, 20],
        exit: [10, 6, 4, 8, 40, 115, 175, 160, 135, 105, 80, 90, 125, 150, 165, 155, 140, 170, 185, 160, 115, 75, 40, 18],
      },
      week: {
        entry: [320, 280, 350, 310, 380, 290, 340],
        exit: [300, 265, 330, 295, 360, 275, 320],
      },
      month: {
        entry: [4200, 4100, 4350, 4280, 4400, 4150, 4300, 4250, 4380, 4200, 4100, 4050, 4180, 4220, 4300, 4280, 4150, 4200, 4320, 4250, 4180, 4100, 4050, 4000, 4120, 4200, 4280, 4300, 4250, 4180, 4100],
        exit: [4000, 3950, 4200, 4100, 4250, 4000, 4150, 4100, 4220, 4050, 3950, 3900, 4020, 4080, 4150, 4120, 4000, 4050, 4180, 4100, 4020, 3950, 3880, 3850, 3980, 4050, 4120, 4150, 4100, 4020, 3950],
      },
    },
    vehicleTypes: {
      total: 100,
      items: [
        { name: '内部车辆', count: 40, percent: 40, color: '#1890ff' },
        { name: '临时车辆', count: 30, percent: 30, color: '#69c0ff' },
        { name: '预约车辆', count: 30, percent: 30, color: '#52c41a' },
      ],
    },
    dateFilter: {
      startDate: '',
      endDate: '',
    },
    historyTable: {
      columns: ['序号', '入场车辆', '出场车辆', '内部车辆占比', '时间'],
      rows: [
        { index: 1, entry: 421, exit: 456, internalRatio: '56%', time: '2024-05-19' },
        { index: 2, entry: 398, exit: 412, internalRatio: '54%', time: '2024-05-18' },
        { index: 3, entry: 405, exit: 420, internalRatio: '55%', time: '2024-05-17' },
        { index: 4, entry: 380, exit: 395, internalRatio: '52%', time: '2024-05-16' },
        { index: 5, entry: 410, exit: 430, internalRatio: '57%', time: '2024-05-15' },
        { index: 6, entry: 395, exit: 408, internalRatio: '53%', time: '2024-05-14' },
        { index: 7, entry: 420, exit: 445, internalRatio: '56%', time: '2024-05-13' },
        { index: 8, entry: 388, exit: 402, internalRatio: '51%', time: '2024-05-12' },
      ],
      total: 100,
      pageSize: 8,
    },
  },

  /** 车闸设备管理 */
  parkingGateDevices: {
    summary: [
      { label: '车闸总数', value: 15, unit: '个', color: '#1890ff', icon: 'forbidden' },
      { label: '未绑定空间数', value: 1, unit: '个', color: '#faad14', icon: 'trendUp' },
      { label: '已绑定空间数', value: 12, unit: '个', color: '#52c41a', icon: 'building' },
    ],
    filters: {
      spaceLocation: { label: '空间位置', placeholder: '请选择空间位置', options: ['园区附属设施/1F/东门门岗', '园区附属设施/1F/西门门岗', '地下车库/B1/入口'] },
      deviceAsset: { label: '设备资产', placeholder: '请选择设备资产', options: ['道闸', '摄像头', '识别设备'] },
      parkingLot: { label: '停车场', placeholder: '请选择停车场', options: ['东门停车场', '西门停车场', '地下车库'] },
      gateDeviceName: { label: '车闸设备名称', placeholder: '请输入车闸设备名称' },
      bindStatus: { label: '绑定状态', placeholder: '请选择绑定状态', options: ['已绑定', '未绑定'] },
    },
    table: {
      columns: ['序号', '空间编码', '空间位置', '设备编码', '设备名称', '设备类型', '停车场编号', '停车场名称', '车闸编号', '车闸设备名称', '绑定状态'],
      rows: [
        { index: 1, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00001', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.02-00001', deviceName: '道闸-东门口辅相机-001', deviceType: '道闸', parkingLotId: 'P-001', parkingLotName: '东门停车场', gateId: 'DZ-001', gateDeviceName: '东门口辅相机-001', bindStatus: '未绑定' },
        { index: 2, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00002', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.02-00002', deviceName: '道闸-东门口主相机-001', deviceType: '道闸', parkingLotId: '', parkingLotName: '', gateId: 'DZ-002', gateDeviceName: '东门口主相机-001', bindStatus: '未绑定' },
        { index: 3, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00003', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.02-00003', deviceName: '道闸-东门口辅相机-002', deviceType: '道闸', parkingLotId: '', parkingLotName: '', gateId: 'DZ-003', gateDeviceName: '东门口辅相机-002', bindStatus: '未绑定' },
        { index: 4, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00004', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.02-00004', deviceName: '道闸-东门口主相机-002', deviceType: '道闸', parkingLotId: '', parkingLotName: '', gateId: 'DZ-004', gateDeviceName: '东门口主相机-002', bindStatus: '未绑定' },
        { index: 5, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00005', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.02-00005', deviceName: '道闸-东门口辅相机-003', deviceType: '道闸', parkingLotId: '', parkingLotName: '', gateId: 'DZ-005', gateDeviceName: '东门口辅相机-003', bindStatus: '未绑定' },
        { index: 6, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00006', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.02-00006', deviceName: '道闸-东门口主相机-003', deviceType: '道闸', parkingLotId: '', parkingLotName: '', gateId: 'DZ-006', gateDeviceName: '东门口主相机-003', bindStatus: '未绑定' },
        { index: 7, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00007', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.02-00007', deviceName: '道闸-东门口辅相机-004', deviceType: '道闸', parkingLotId: '', parkingLotName: '', gateId: 'DZ-007', gateDeviceName: '东门口辅相机-004', bindStatus: '未绑定' },
        { index: 8, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00008', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.02-00008', deviceName: '道闸-东门口主相机-004', deviceType: '道闸', parkingLotId: '', parkingLotName: '', gateId: 'DZ-008', gateDeviceName: '东门口主相机-004', bindStatus: '未绑定' },
        { index: 9, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00009', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.02-00009', deviceName: '道闸-东门口辅相机-005', deviceType: '道闸', parkingLotId: '', parkingLotName: '', gateId: 'DZ-009', gateDeviceName: '东门口辅相机-005', bindStatus: '未绑定' },
        { index: 10, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00010', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.02-00010', deviceName: '道闸-东门口主相机-005', deviceType: '道闸', parkingLotId: '', parkingLotName: '', gateId: 'DZ-010', gateDeviceName: '东门口主相机-005', bindStatus: '未绑定' },
      ],
      total: 102,
      pageSize: 20,
    },
  },

  /** 监控设备管理 */
  monitorDevices: {
    summary: [
      { label: '监控集成总数', value: 584, unit: '个', color: '#1890ff', icon: 'forbidden' },
      { label: '待确定设备数', value: 2, unit: '个', color: '#faad14', icon: 'trendUp' },
      { label: '已绑定设备数', value: 582, unit: '个', color: '#52c41a', icon: 'inventory' },
      { label: '监测正常状态', value: 584, unit: '个', color: '#13c2c2', icon: 'inventory' },
      { label: '监测异常状态', value: 0, unit: '个', color: '#ff4d4f', icon: 'inventory' },
    ],
    filters: {
      spaceLocation: { label: '空间位置', placeholder: '请选择空间位置', options: ['研发实验楼4#/1F/4114室', '工程楼3#/1F/空调水泵区域-001'] },
      deviceName: { label: '监控设备名称', placeholder: '请输入监控设备名称' },
      monitorStatus: { label: '监测状态', placeholder: '请选择监测状态', options: ['在线', '离线'] },
      protocolType: { label: '协议类型', placeholder: '请输入协议类型', options: ['GB28181', 'ONVIF'] },
      bindStatus: { label: '绑定状态', placeholder: '请选择绑定状态', options: ['已绑定', '未绑定'] },
    },
    table: {
      columns: ['序号', '空间编码', '空间位置', '设备编码', '设备名称', '监控编号', '监控设备名称', '监测状态', '协议类型', '协议厂商', '对接方式', 'IP地址', '通道号', '操作'],
      rows: [
        { index: 1, spaceCode: '', spaceLocation: '', deviceCode: 'SWXP-SWCD-001F-YC-30.60.30-00022', deviceName: '摄像机-SZ-013', monitorId: 'sxj-001', monitorDeviceName: '摄像机-001', monitorStatus: '在线', protocolType: '', protocolVendor: '', connectionMethod: '', ipAddress: '', channelNo: '1' },
        { index: 2, spaceCode: 'SWXP-0004-001F-YC-40.60.01-00001', spaceLocation: '研发实验楼4#/1F/4114室', deviceCode: '', deviceName: '', monitorId: 'SN0007', monitorDeviceName: '4号楼南通道3室外枪机', monitorStatus: '在线', protocolType: '', protocolVendor: '海康', connectionMethod: '', ipAddress: '192.168.1.7', channelNo: '1' },
        { index: 3, spaceCode: 'SWXP-0004-001F-YC-40.60.01-00001', spaceLocation: '研发实验楼4#/1F/4114室', deviceCode: '', deviceName: '', monitorId: 'SN0007', monitorDeviceName: '摄像机-002', monitorStatus: '在线', protocolType: '', protocolVendor: '海康', connectionMethod: '', ipAddress: '192.168.1.7', channelNo: '1' },
        { index: 4, spaceCode: 'SWXP-0004-001F-YC-40.60.01-00002', spaceLocation: '研发实验楼4#/1F/4115室', deviceCode: 'SWXP-SWCD-001F-YC-30.60.30-00023', deviceName: '摄像机-SZ-014', monitorId: 'sxj-002', monitorDeviceName: '摄像机-003', monitorStatus: '在线', protocolType: 'GB28181', protocolVendor: '海康', connectionMethod: '平台对接', ipAddress: '192.168.1.8', channelNo: '1' },
        { index: 5, spaceCode: 'SWXP-0004-001F-YC-40.60.01-00003', spaceLocation: '研发实验楼4#/1F/4116室', deviceCode: 'SWXP-SWCD-001F-YC-30.60.30-00024', deviceName: '摄像机-SZ-015', monitorId: 'sxj-003', monitorDeviceName: '4号楼北通道室外枪机', monitorStatus: '在线', protocolType: 'GB28181', protocolVendor: '海康', connectionMethod: '平台对接', ipAddress: '192.168.1.9', channelNo: '1' },
        { index: 6, spaceCode: 'SWXP-0003-001F-YC-40.60.01-00001', spaceLocation: '工程楼3#/1F/进厅-001', deviceCode: 'SWXP-SWCD-001F-YC-30.60.30-00025', deviceName: '摄像机-SZ-016', monitorId: 'sxj-004', monitorDeviceName: '3号楼进厅球机', monitorStatus: '在线', protocolType: 'GB28181', protocolVendor: '大华', connectionMethod: '平台对接', ipAddress: '192.168.1.10', channelNo: '1' },
        { index: 7, spaceCode: 'SWXP-0003-001F-YC-40.60.01-00002', spaceLocation: '工程楼3#/1F/高压配电房-001', deviceCode: 'SWXP-SWCD-001F-YC-30.60.30-00026', deviceName: '摄像机-SZ-017', monitorId: 'sxj-005', monitorDeviceName: '高配间东侧', monitorStatus: '在线', protocolType: 'GB28181', protocolVendor: '海康', connectionMethod: '平台对接', ipAddress: '192.168.1.11', channelNo: '1' },
        { index: 8, spaceCode: 'SWXP-0003-001F-YC-40.60.01-00003', spaceLocation: '工程楼3#/1F/高压配电房-001', deviceCode: 'SWXP-SWCD-001F-YC-30.60.30-00027', deviceName: '摄像机-SZ-018', monitorId: 'sxj-006', monitorDeviceName: '高配间北侧', monitorStatus: '在线', protocolType: 'GB28181', protocolVendor: '海康', connectionMethod: '平台对接', ipAddress: '192.168.1.12', channelNo: '1' },
        { index: 9, spaceCode: 'SWXP-0003-001F-YC-40.60.01-00004', spaceLocation: '工程楼3#/1F/高压配电房-001', deviceCode: 'SWXP-SWCD-001F-YC-30.60.30-00028', deviceName: '摄像机-SZ-019', monitorId: 'sxj-007', monitorDeviceName: '高配间东南角', monitorStatus: '在线', protocolType: 'GB28181', protocolVendor: '海康', connectionMethod: '平台对接', ipAddress: '192.168.1.13', channelNo: '1' },
        { index: 10, spaceCode: 'SWXP-0003-001F-YC-40.60.01-00005', spaceLocation: '工程楼3#/1F/空调水泵区域-001', deviceCode: 'SWXP-SWCD-001F-YC-30.60.30-00029', deviceName: '摄像机-SZ-020', monitorId: 'sxj-008', monitorDeviceName: '锅炉房西侧中间', monitorStatus: '在线', protocolType: 'GB28181', protocolVendor: '海康', connectionMethod: '平台对接', ipAddress: '192.168.1.14', channelNo: '1' },
      ],
      total: 584,
      pageSize: 10,
    },
  },

  /** 资源监控视图 */
  monitorResourceView: {
    searchPlaceholder: '全部监控: 106',
    online: 530,
    offline: 0,
    total: 106,
    tree: [
      {
        id: 'b3', name: '工程楼3#', count: 106, expanded: true,
        children: [
          {
            id: 'b3-1f', name: '1F', count: 106, expanded: true,
            children: [
              {
                id: 'b3-1f-pump', name: '空调水泵区域-001', count: 5, expanded: true,
                children: [
                  { id: 'cam-1', name: '锅炉房西侧中间', count: 1, isDevice: true, online: true },
                  { id: 'cam-2', name: '锅炉房西侧中间', count: 1, isDevice: true, online: true },
                  { id: 'cam-3', name: '锅炉房西侧中间', count: 1, isDevice: true, online: true },
                  { id: 'cam-4', name: '锅炉房西侧中间', count: 1, isDevice: true, online: true },
                  { id: 'cam-5', name: '锅炉房西侧中间', count: 1, isDevice: true, online: true },
                ],
              },
              { id: 'b3-1f-hall', name: '进厅-001', count: 21, expanded: false, children: [] },
              {
                id: 'b3-1f-hv', name: '高压配电房-001', count: 24, expanded: true,
                children: [
                  { id: 'cam-6', name: '高配间东侧', count: 1, isDevice: true, online: true },
                  { id: 'cam-7', name: '高配间北侧', count: 1, isDevice: true, online: true },
                  { id: 'cam-8', name: '高配间东南角', count: 1, isDevice: true, online: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  /** 通行总览 */
  accessOverview: {
    kpiCards: [
      { label: '运行闸机设备总数', value: 15, unit: '个', color: '#1890ff', icon: 'forbidden' },
      { label: '待绑定空间数', value: 1, unit: '个', color: '#faad14', icon: 'trendUp' },
      { label: '已绑定空间数', value: 12, unit: '个', color: '#52c41a', icon: 'building' },
      { label: '今日总通行人次', value: 2847, unit: '人次', trend: 8.2, trendLabel: '较昨日', color: '#722ed1', icon: 'building' },
      { label: '内部员工通行', value: 2356, unit: '人次', trend: 8.2, trendLabel: '较昨日', color: '#13c2c2', icon: 'building' },
      { label: '访客通行', value: 491, unit: '人次', trend: 8.2, trendLabel: '较昨日', color: '#fa8c16', icon: 'building' },
    ],
    trafficTrend: {
      title: '今日分时段通行趋势',
      hours: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      total: [45, 30, 20, 15, 25, 80, 180, 320, 360, 280, 120, 200, 280, 220, 420, 380, 200, 180, 250, 320, 280, 200, 120, 60],
      visitor: [10, 5, 3, 2, 5, 15, 30, 50, 60, 45, 20, 35, 50, 40, 80, 70, 35, 30, 45, 60, 50, 35, 20, 10],
    },
    personnelPie: {
      items: [
        { name: '内部员工', count: 1256, color: '#1890ff' },
        { name: '访客', count: 586, color: '#13c2c2' },
      ],
    },
    deptRankTop5: [
      { rank: 1, name: '市场部', value: 156, unit: '人' },
      { rank: 2, name: '销售部', value: 146, unit: '人' },
      { rank: 3, name: '研发部', value: 136, unit: '人' },
      { rank: 4, name: '行政部', value: 106, unit: '人' },
      { rank: 5, name: '人力资源部', value: 98, unit: '人' },
    ],
    dateFilter: {
      startDate: '',
      endDate: '',
    },
    accessTable: {
      columns: ['序号', '通行人次', '通行类型', '出入口', '接待部门', '时间'],
      rows: [
        { index: 1, count: 1, accessType: '访客', entrance: '主入口A闸机', department: '市场部', time: '2026/5/21 12:00' },
        { index: 2, count: 2, accessType: '内部员工', entrance: '西入口B闸机', department: '销售部', time: '2026/5/21 12:00' },
        { index: 3, count: 1, accessType: '访客', entrance: '停车场入口闸机', department: '研发部', time: '2026/5/21 12:00' },
        { index: 4, count: 1, accessType: '访客', entrance: '东入口C闸机', department: '行政部', time: '2026/5/21 12:00' },
        { index: 5, count: 1, accessType: '内部员工', entrance: '地下车库入口', department: '人力资源部', time: '2026/5/21 12:00' },
        { index: 6, count: 1, accessType: '访客', entrance: '东入口D闸机', department: '销售部', time: '2026/5/21 12:00' },
      ],
      total: 50,
      pageSize: 10,
    },
  },

  /** 通行设备管理 */
  accessDevices: {
    summary: [
      { label: '通行闸机设备总数', value: 15, unit: '个', color: '#1890ff', icon: 'forbidden' },
      { label: '待绑定空间数', value: 1, unit: '个', color: '#faad14', icon: 'trendUp' },
      { label: '已绑定空间数', value: 12, unit: '个', color: '#52c41a', icon: 'building' },
    ],
    filters: {
      spaceLocation: { label: '空间位置', placeholder: '请选择空间位置', options: ['园区附属设施/1F/东门门岗'] },
      gateDeviceName: { label: '人行闸机设备名称', placeholder: '请输入人行闸机设备名称' },
      entryExitType: { label: '进出类型', placeholder: '请选择进出类型', options: ['进', '出', '双向'] },
      bindStatus: { label: '绑定状态', placeholder: '请选择绑定状态', options: ['已绑定', '未绑定'] },
    },
    table: {
      columns: ['序号', '空间编码', '空间位置', '设备编码', '设备名称', '人行闸机编号', '人行闸机设备名称', '绑定状态'],
      rows: [
        { index: 1, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00001', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.28-00001', deviceName: '人行闸机-东门3离进人脸-001', gateId: 'RZ-001', gateDeviceName: '东门3离进人脸-001', entryExitType: '进', bindStatus: '已绑定' },
        { index: 2, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00002', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.28-00002', deviceName: '人行闸机-东门3离进人脸-002', gateId: 'RZ-002', gateDeviceName: '东门3离进人脸-002', entryExitType: '进', bindStatus: '已绑定' },
        { index: 3, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00003', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.28-00003', deviceName: '人行闸机-东门3离进人脸-003', gateId: 'RZ-003', gateDeviceName: '东门3离进人脸-003', entryExitType: '进', bindStatus: '已绑定' },
        { index: 4, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00004', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.28-00004', deviceName: '人行闸机-东门3离出人脸-001', gateId: 'RZ-004', gateDeviceName: '东门3离出人脸-001', entryExitType: '出', bindStatus: '已绑定' },
        { index: 5, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00005', spaceLocation: '园区附属设施/1F/东门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.28-00005', deviceName: '人行闸机-东门3离出人脸-002', gateId: 'RZ-005', gateDeviceName: '东门3离出人脸-002', entryExitType: '出', bindStatus: '已绑定' },
        { index: 6, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00006', spaceLocation: '园区附属设施/1F/西门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.28-00006', deviceName: '人行闸机-西门进人脸-001', gateId: 'RZ-006', gateDeviceName: '西门进人脸-001', entryExitType: '进', bindStatus: '已绑定' },
        { index: 7, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00007', spaceLocation: '园区附属设施/1F/西门门岗', deviceCode: 'SWXP-SWCD-001F-YC-30.60.28-00007', deviceName: '人行闸机-西门出人脸-001', gateId: 'RZ-007', gateDeviceName: '西门出人脸-001', entryExitType: '出', bindStatus: '已绑定' },
        { index: 8, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00008', spaceLocation: '地下车库/B1/入口', deviceCode: 'SWXP-SWCD-001F-YC-30.60.28-00008', deviceName: '人行闸机-地下车库入口-001', gateId: 'RZ-008', gateDeviceName: '地下车库入口-001', entryExitType: '双向', bindStatus: '已绑定' },
        { index: 9, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00009', spaceLocation: '地下车库/B1/出口', deviceCode: 'SWXP-SWCD-001F-YC-30.60.28-00009', deviceName: '人行闸机-地下车库出口-001', gateId: 'RZ-009', gateDeviceName: '地下车库出口-001', entryExitType: '双向', bindStatus: '已绑定' },
        { index: 10, spaceCode: 'SWXP-SWCD-001F-YC-40.40.78-00010', spaceLocation: '园区附属设施/1F/主入口', deviceCode: 'SWXP-SWCD-001F-YC-30.60.28-00010', deviceName: '人行闸机-主入口A闸机-001', gateId: 'RZ-010', gateDeviceName: '主入口A闸机-001', entryExitType: '双向', bindStatus: '已绑定' },
      ],
      total: 102,
      pageSize: 20,
    },
  },

  /** 报警统计 */
  fireAlarmStats: {
    pending: 67,
    processed: '999+',
    levelDonut: {
      items: [
        { name: '疑似火警', count: 100, color: '#1890ff' },
        { name: '一级报警', count: 150, color: '#52c41a' },
        { name: '二级报警', count: 121, color: '#faad14' },
        { name: '三级报警', count: 157, color: '#fa8c16' },
      ],
    },
    processDonut: {
      items: [
        { name: '未处理', count: 100, color: '#1890ff' },
        { name: '误报', count: 150, color: '#52c41a' },
        { name: '测试', count: 197, color: '#faad14' },
        { name: '确认火警', count: 110, color: '#fa8c16' },
        { name: '确认故障', count: 110, color: '#ff4d4f' },
        { name: '复位', count: 131, color: '#bfbfbf' },
      ],
    },
    top5Table: {
      columns: ['TOP5', '空间位置', '设备名称', '报警次数'],
      rows: [
        { rank: 1, location: '1号楼', deviceName: '0-0-2184258通用', count: 100, unit: '次' },
        { rank: 2, location: '2号楼', deviceName: '1-9-183感烟火灾探测器', count: 80, unit: '次' },
        { rank: 3, location: '3号楼', deviceName: '0-0-2184258通用', count: 70, unit: '次' },
        { rank: 4, location: '4号楼', deviceName: '1-9-183感烟火灾探测器', count: 50, unit: '次' },
        { rank: 5, location: '5号楼', deviceName: '1-9-183感烟火灾探测器', count: 20, unit: '次' },
      ],
    },
    trend: {
      modeOptions: ['today', 'yesterday', 'week7', 'week30'],
      modeLabels: { today: '今天', yesterday: '昨天', week7: '最近7天', week30: '最近30天' },
      hours: Array.from({ length: 24 }, (_, i) => String(i)),
      today: [120, 230, 180, 100, 150, 200, 225, 180, 120, 225, 200, 180, 225, 190, 160, 130, 100, 225, 200, 225, 190, 160, 140, 110],
      yesterday: [110, 200, 170, 90, 140, 190, 210, 170, 110, 210, 190, 170, 210, 180, 150, 120, 90, 210, 190, 210, 180, 150, 130, 100],
      week7: {
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        data: [1850, 1920, 1780, 1950, 1880, 1200, 980],
      },
      week30: {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
        data: [180, 195, 210, 188, 175, 192, 205, 198, 185, 190, 200, 188, 195, 210, 205, 198, 185, 192, 200, 188, 195, 210, 205, 198, 185, 190, 200, 188, 195, 210],
      },
    },
  },

  /** 报警列表 */
  fireAlarmList: {
    summary: [
      { label: '报警总数', value: 200, unit: '个', color: '#1890ff', icon: 'fault' },
      { label: '待处理报警数', value: 100, unit: '个', color: '#ff4d4f', icon: 'faultWarn' },
      { label: '已处理报警数', value: 20, unit: '个', color: '#52c41a', icon: 'plug' },
    ],
    filters: {
      processStatus: { label: '流程状态', placeholder: '请选择', options: ['未处理', '误报', '测试', '确认火警', '确认故障', '复位'] },
      alarmLevel: { label: '报警等级', placeholder: '请选择', options: ['疑似火警', '一级报警', '二级报警', '三级报警'] },
      startTime: { label: '开始时间', placeholder: '日期区间  开始日期 - 结束日期' },
      endTime: { label: '结束时间', placeholder: '日期区间  开始日期 - 结束日期' },
    },
    table: {
      columns: ['序号', '设备名称', '设备类型', '所属系统', '位置描述', '报警等级', '报警描述', '报警类型', '流程状态', '处理说明', '开始时间', '结束时间'],
      rows: [
        { index: 1, deviceName: 'BJ20250626001', deviceType: '火焰探测器', system: 'FLAME-101W', location: '生物芯片1号楼101室西侧天花板', alarmLevel: '一级报警', alarmDesc: '报警触发', alarmType: '自动上传', processStatus: '复位', processNote: '描述', startTime: '2025-06-26 15:48:39', endTime: '2025-06-26 15:48:39' },
        { index: 2, deviceName: 'BJ20250626002', deviceType: '火焰探测器', system: 'FLAME-101W', location: '生物芯片1号楼102室西侧天花板', alarmLevel: '一级报警', alarmDesc: '报警触发', alarmType: '自动上传', processStatus: '确认火警', processNote: '描述', startTime: '2025-06-26 15:48:39', endTime: '2025-06-26 16:10:00' },
        { index: 3, deviceName: 'BJ20250626003', deviceType: '火焰探测器', system: 'FLAME-101W', location: '生物芯片1号楼103室西侧天花板', alarmLevel: '一级报警', alarmDesc: '报警触发', alarmType: '自动上传', processStatus: '确认火警', processNote: '描述', startTime: '2025-06-26 15:48:39', endTime: '2025-06-26 16:05:00' },
        { index: 4, deviceName: 'BJ20250626004', deviceType: '火焰探测器', system: 'FLAME-101W', location: '生物芯片1号楼104室西侧天花板', alarmLevel: '一级报警', alarmDesc: '报警触发', alarmType: '自动上传', processStatus: '未处理', processNote: '描述', startTime: '2025-06-26 15:48:39', endTime: '—' },
        { index: 5, deviceName: 'BJ20250626005', deviceType: '火焰探测器', system: 'FLAME-101W', location: '生物芯片1号楼105室西侧天花板', alarmLevel: '一级报警', alarmDesc: '报警触发', alarmType: '自动上传', processStatus: '测试', processNote: '描述', startTime: '2025-06-26 15:48:39', endTime: '2025-06-26 15:48:39' },
        { index: 6, deviceName: 'BJ20250626006', deviceType: '火焰探测器', system: 'FLAME-101W', location: '生物芯片1号楼106室西侧天花板', alarmLevel: '一级报警', alarmDesc: '报警触发', alarmType: '自动上传', processStatus: '误报', processNote: '描述', startTime: '2025-06-26 15:48:39', endTime: '2025-06-26 15:48:39' },
        { index: 7, deviceName: 'BJ20250626007', deviceType: '火焰探测器', system: 'FLAME-101W', location: '生物芯片1号楼107室西侧天花板', alarmLevel: '二级报警', alarmDesc: '报警触发', alarmType: '自动上传', processStatus: '未处理', processNote: '描述', startTime: '2025-06-26 14:30:00', endTime: '—' },
        { index: 8, deviceName: 'BJ20250626008', deviceType: '感烟火灾探测器', system: 'SMOKE-201', location: '生物芯片2号楼201室', alarmLevel: '疑似火警', alarmDesc: '报警触发', alarmType: '自动上传', processStatus: '确认火警', processNote: '描述', startTime: '2025-06-26 13:15:00', endTime: '2025-06-26 13:20:00' },
        { index: 9, deviceName: 'BJ20250626009', deviceType: '感烟火灾探测器', system: 'SMOKE-201', location: '生物芯片2号楼202室', alarmLevel: '三级报警', alarmDesc: '报警触发', alarmType: '自动上传', processStatus: '复位', processNote: '描述', startTime: '2025-06-26 12:00:00', endTime: '2025-06-26 12:05:00' },
        { index: 10, deviceName: 'BJ20250626010', deviceType: '手动报警按钮', system: 'MANUAL-301', location: '生物芯片3号楼1层大厅', alarmLevel: '一级报警', alarmDesc: '报警触发', alarmType: '手动上报', processStatus: '未处理', processNote: '描述', startTime: '2025-06-26 11:00:00', endTime: '—' },
        { index: 11, deviceName: 'BJ20250626011', deviceType: '感温探测器', system: 'TEMP-401', location: '生物芯片3号楼2层', alarmLevel: '疑似火警', alarmDesc: '温度超限', alarmType: '自动上传', processStatus: '误报', processNote: '描述', startTime: '2025-06-25 10:00:00', endTime: '2025-06-25 10:30:00' },
        { index: 12, deviceName: 'BJ20250626012', deviceType: '火焰探测器', system: 'FLAME-101W', location: '生物芯片4号楼101室', alarmLevel: '三级报警', alarmDesc: '报警触发', alarmType: '自动上传', processStatus: '确认故障', processNote: '描述', startTime: '2025-06-24 09:00:00', endTime: '2025-06-24 09:15:00' },
      ],
      total: 200,
      pageSize: 10,
    },
  },

  /** 故障统计 */
  fireFaultStats: {
    pending: 67,
    processed: '999+',
    levelDonut: {
      items: [
        { name: '轻微故障', count: 100, color: '#1890ff' },
        { name: '一般故障', count: 150, color: '#52c41a' },
        { name: '紧急故障', count: 157, color: '#13c2c2' },
      ],
    },
    processDonut: {
      items: [
        { name: '未处理', count: 100, color: '#1890ff' },
        { name: '维修中', count: 150, color: '#69c0ff' },
        { name: '误报', count: 197, color: '#faad14' },
        { name: '测试', count: 110, color: '#fa8c16' },
        { name: '完成维修', count: 110, color: '#ff7a45' },
        { name: '复位', count: 131, color: '#bfbfbf' },
      ],
    },
    top5Table: {
      columns: ['TOP5', '空间位置', '设备名称', '报次数'],
      rows: [
        { rank: 1, location: '1号楼', deviceName: '0-0-2184258通用', count: 100, unit: '次' },
        { rank: 2, location: '2号楼', deviceName: '1-9-183感烟火灾探测器', count: 80, unit: '次' },
        { rank: 3, location: '3号楼', deviceName: '0-0-2184258通用', count: 70, unit: '次' },
        { rank: 4, location: '4号楼', deviceName: '1-9-183感烟火灾探测器', count: 50, unit: '次' },
        { rank: 5, location: '5号楼', deviceName: '1-9-183感烟火灾探测器', count: 20, unit: '次' },
      ],
    },
    trend: {
      modeOptions: ['today', 'yesterday', 'week7', 'week30'],
      modeLabels: { today: '今天', yesterday: '昨天', week7: '最近7天', week30: '最近30天' },
      hours: Array.from({ length: 24 }, (_, i) => String(i)),
      today: [120, 230, 100, 110, 150, 200, 225, 225, 120, 225, 225, 180, 225, 190, 160, 130, 100, 225, 200, 225, 190, 160, 140, 110],
      yesterday: [110, 200, 95, 100, 140, 190, 210, 210, 110, 210, 210, 170, 210, 180, 150, 120, 90, 210, 190, 210, 180, 150, 130, 100],
      week7: {
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        data: [1650, 1720, 1580, 1750, 1680, 1100, 880],
      },
      week30: {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
        data: [160, 175, 190, 168, 155, 172, 185, 178, 165, 170, 180, 168, 175, 190, 185, 178, 165, 172, 180, 168, 175, 190, 185, 178, 165, 170, 180, 168, 175, 190],
      },
    },
  },

  /** 故障列表 */
  fireFaultList: {
    summary: [
      { label: '故障总数', value: 200, unit: '个', color: '#1890ff', icon: 'fault' },
      { label: '待处理故障数', value: 100, unit: '个', color: '#ff4d4f', icon: 'faultWarn' },
      { label: '已处理故障数', value: 20, unit: '个', color: '#52c41a', icon: 'plug' },
    ],
    filters: {
      processStatus: { label: '流程状态', placeholder: '请选择流程状态', options: ['未处理', '维修中', '误报', '测试', '完成维修', '复位'] },
      faultLevel: { label: '故障等级', placeholder: '请选择故障等级', options: ['轻微故障', '一般故障', '紧急故障'] },
      startTime: { label: '开始时间', placeholder: '开始日期 - 结束日期' },
      endTime: { label: '结束时间', placeholder: '开始日期 - 结束日期' },
    },
    table: {
      columns: ['序号', '设备名称', '设备类型', '所属系统', '位置描述', '故障等级', '故障描述', '故障类型', '流程状态', '处理说明', '开始时间', '结束时间'],
      rows: [
        { index: 1, deviceName: '生物芯片1号楼101', deviceType: '火警设备探测器', system: '火灾自动报警系统', location: '生物芯片1号楼101室西侧天花板', faultLevel: '紧急故障', faultDesc: '描述', faultType: '未处理', processStatus: '未处理', processNote: '说明', startTime: '2025/5/12 12:00', endTime: '2025/6/15 12:00' },
        { index: 2, deviceName: '生物芯片1号楼102', deviceType: '用户终端', system: '防排烟系统', location: '生物芯片1号楼102室', faultLevel: '一般故障', faultDesc: '描述', faultType: '误报', processStatus: '维修中', processNote: '说明', startTime: '2025/5/13 12:00', endTime: '2025/6/16 12:00' },
        { index: 3, deviceName: '生物芯片1号楼103', deviceType: '水柜', system: '自动喷水灭火系统', location: '生物芯片1号楼103室', faultLevel: '轻微故障', faultDesc: '描述', faultType: '测试', processStatus: '完成维修', processNote: '说明', startTime: '2025/5/14 12:00', endTime: '2025/6/17 12:00' },
        { index: 4, deviceName: '生物芯片1号楼104', deviceType: '风柜', system: '防排烟系统', location: '生物芯片1号楼104室', faultLevel: '紧急故障', faultDesc: '描述', faultType: '确认报警', processStatus: '未处理', processNote: '说明', startTime: '2025/5/15 12:00', endTime: '2025/6/18 12:00' },
        { index: 5, deviceName: '生物芯片1号楼105', deviceType: '无线压力传感器', system: '室内消火栓系统', location: '生物芯片1号楼105室', faultLevel: '一般故障', faultDesc: '描述', faultType: '确认火警', processStatus: '维修中', processNote: '说明', startTime: '2025/5/16 12:00', endTime: '2025/6/19 12:00' },
        { index: 6, deviceName: '生物芯片1号楼106', deviceType: '智慧用电', system: '电气火灾系统', location: '生物芯片1号楼106室', faultLevel: '轻微故障', faultDesc: '描述', faultType: '复位', processStatus: '复位', processNote: '说明', startTime: '2025/5/17 12:00', endTime: '2025/6/20 12:00' },
        { index: 7, deviceName: '生物芯片1号楼107', deviceType: '有线压力表', system: '自动喷水灭火系统', location: '生物芯片1号楼107室', faultLevel: '紧急故障', faultDesc: '描述', faultType: '未处理', processStatus: '未处理', processNote: '说明', startTime: '2025/5/18 12:00', endTime: '2025/6/21 12:00' },
        { index: 8, deviceName: '生物芯片1号楼108', deviceType: '无线液位仪', system: '室内消火栓系统', location: '生物芯片1号楼108室', faultLevel: '一般故障', faultDesc: '描述', faultType: '误报', processStatus: '误报', processNote: '说明', startTime: '2025/5/19 12:00', endTime: '2025/6/22 12:00' },
        { index: 9, deviceName: '生物芯片1号楼109', deviceType: '火警设备探测器', system: '火灾自动报警系统', location: '生物芯片1号楼109室', faultLevel: '轻微故障', faultDesc: '描述', faultType: '测试', processStatus: '测试', processNote: '说明', startTime: '2025/5/20 12:00', endTime: '2025/6/23 12:00' },
        { index: 10, deviceName: '生物芯片1号楼110', deviceType: '用户终端', system: '防排烟系统', location: '生物芯片1号楼110室', faultLevel: '紧急故障', faultDesc: '描述', faultType: '未处理', processStatus: '未处理', processNote: '说明', startTime: '2025/5/21 12:00', endTime: '2025/6/24 12:00' },
        { index: 11, deviceName: '生物芯片2号楼201', deviceType: '感烟探测器', system: '火灾自动报警系统', location: '生物芯片2号楼201室', faultLevel: '轻微故障', faultDesc: '描述', faultType: '未处理', processStatus: '完成维修', processNote: '说明', startTime: '2025/5/22 12:00', endTime: '2025/6/25 12:00' },
      ],
      total: 200,
      pageSize: 10,
    },
  },
};
