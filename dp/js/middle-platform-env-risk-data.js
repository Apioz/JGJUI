/* 环境管理 / 管理知识库 / 风险预警 — 页面数据 */

const MP_ENV_RISK_DATA = {
  envDevice: {
    overviewTitle: '集成数据概览',
    spaceCodeCol: '空间源码',
    summary: [
      { label: '环境设备总数', value: 200, icon: 'database', color: '#1890ff' },
      { label: '待绑定空间数', value: 124, icon: 'layers', color: '#faad14' },
      { label: '已绑定空间数', value: 30, icon: 'link', color: '#52c41a' },
    ],
    equipNameCol: '环境设备名称',
    equipIdCol: '环境设备编号',
    rows: [
      { index: 1, spaceCode: 'SP001', spaceLocation: 'A栋1层大厅', deviceCode: 'DEV1001', deviceName: '温湿度传感1', equipName: '环境设备1', equipId: 'ENV001', bindStatus: '已绑定' },
      { index: 2, spaceCode: 'SP002', spaceLocation: 'A栋1层大厅', deviceCode: 'DEV1002', deviceName: 'PM2.5传感1', equipName: '环境设备2', equipId: 'ENV002', bindStatus: '已绑定' },
      { index: 3, spaceCode: 'SP003', spaceLocation: 'A栋1层大厅', deviceCode: 'DEV1003', deviceName: 'CO2传感1', equipName: '环境设备3', equipId: 'ENV003', bindStatus: '已绑定' },
      { index: 4, spaceCode: 'SP004', spaceLocation: 'B栋2楼大厅', deviceCode: 'DEV1004', deviceName: '温湿度传感2', equipName: '环境设备4', equipId: 'ENV004', bindStatus: '已绑定' },
      { index: 5, spaceCode: 'SP005', spaceLocation: 'B栋2楼大厅', deviceCode: 'DEV1005', deviceName: 'TVOC传感1', equipName: '环境设备5', equipId: 'ENV005', bindStatus: '已绑定' },
      { index: 6, spaceCode: 'SP006', spaceLocation: 'A栋1层大厅', deviceCode: 'DEV1006', deviceName: '温湿度传感3', equipName: '', equipId: '', bindStatus: '未绑定' },
      { index: 7, spaceCode: 'SP007', spaceLocation: 'B栋2楼大厅', deviceCode: 'DEV1007', deviceName: 'PM2.5传感2', equipName: '', equipId: '', bindStatus: '未绑定' },
      { index: 8, spaceCode: 'SP008', spaceLocation: 'A栋1层大厅', deviceCode: 'DEV1008', deviceName: 'CO2传感2', equipName: '', equipId: '', bindStatus: '未绑定' },
      { index: 9, spaceCode: 'SP009', spaceLocation: 'B栋2楼大厅', deviceCode: 'DEV1009', deviceName: 'TVOC传感2', equipName: '', equipId: '', bindStatus: '未绑定' },
    ],
    total: 102,
  },

  envOperation: {
    metrics: [
      { label: '温度', subLabel: 'PV板背面温度2', value: '28.8°C', icon: 'thermometer', color: '#1890ff' },
      { label: '湿度', subLabel: 'PV板背面温度2', value: '65%', icon: 'water', color: '#52c41a' },
      { label: 'PM2.5', subLabel: 'PV板背面温度2', value: '32', icon: 'pm25', color: '#722ed1' },
      { label: 'CO₂', subLabel: 'PV板背面温度2', value: '450', icon: 'co2', color: '#fa8c16' },
      { label: 'TVOC', subLabel: 'PV板背面温度2', value: '0.8', icon: 'wave', color: '#ff4d4f' },
    ],
    buildings: ['1号楼', '2号楼', '3号楼'],
    chartLabels: ['01-00', '01-04', '01-08', '01-12', '02-00', '02-04', '02-08', '02-12', '03-00', '03-04', '03-08', '03-12'],
    chartSeries: [
      { name: '1楼环境', color: '#1890ff', data: [12, 15, 18, 20, 16, 14, 17, 22, 19, 21, 18, 16] },
      { name: '2楼环境', color: '#52c41a', data: [10, 13, 16, 18, 14, 12, 15, 20, 17, 19, 16, 14] },
      { name: '3楼环境', color: '#fa8c16', data: [8, 11, 14, 16, 12, 10, 13, 18, 15, 17, 14, 12] },
      { name: '4楼环境', color: '#722ed1', data: [6, 9, 12, 14, 10, 8, 11, 16, 13, 15, 12, 10] },
      { name: '5楼环境', color: '#13c2c2', data: [5, 8, 11, 13, 9, 7, 10, 15, 12, 14, 11, 9] },
    ],
  },

  envAlarm: {
    filters: [
      { label: '报警对象名称', placeholder: '请输入', type: 'input' },
      { label: '报警名称', placeholder: 'co2超标', type: 'select', defaultVal: 'co2超标' },
      { label: '告警时间', placeholder: '开始时间 - 结束时间', type: 'daterange' },
    ],
    columns: [
      { key: 'index', label: '序号' }, { key: 'alarmName', label: '报警名称' },
      { key: 'objectName', label: '报警对象名称' }, { key: 'startTime', label: '报警开始时间' },
    ],
    rows: Array.from({ length: 9 }, (_, i) => ({
      index: i + 1, alarmName: '数值报警', objectName: '名称1', startTime: '2024年11月29日 17:17',
    })),
    total: 90,
  },

  knowledgeAgent: {
    agents: [
      { id: 'engineering', name: '工程咨询顾问', icon: 'building', color: '#1890ff' },
      { id: 'ops', name: '小禹运维助手', icon: 'property', color: '#52c41a' },
      { id: 'bio', name: '芯超生物', icon: 'inventory', color: '#722ed1' },
      { id: 'butler', name: '无"幽"管家', icon: 'home', color: '#fa8c16' },
    ],
    myAgents: ['engineering', 'ops', 'bio'],
    history: [
      { title: '你好', time: '14:31' },
      { title: '你好', time: '04-22' },
      { title: '你好', time: '04-21' },
    ],
    historyTotal: 66,
    taskTotal: 0,
  },

  riskDashboard: {
    refreshTime: '10:30:55',
    kpis: [
      { label: '未处置风险', value: 12, sub: '超时未处置：2', color: '#ff4d4f', icon: 'warning' },
      { label: '今日新增', value: 5, sub: '较昨日 +12%', color: '#fa8c16', icon: 'trendUp' },
      { label: '处理中', value: 8, sub: '待派单：3', color: '#1890ff', icon: 'refresh' },
      { label: '已闭环', value: 21, sub: '平均时长：4.2h', color: '#52c41a', icon: 'smile' },
      { label: '闭环率', value: '82%', sub: '较上周 +5%', color: '#722ed1', icon: 'chartPie', progress: 82 },
    ],
    trend7: {
      labels: ['4/18', '4/19', '4/20', '4/21', '4/22', '4/23', '4/24'],
      data: [10, 12, 11, 13, 15, 13, 12],
      peak: 15,
    },
    levelDonut: [
      { name: '高', count: 3, color: '#ff4d4f' },
      { name: '中', count: 12, color: '#fa8c16' },
      { name: '低', count: 8, color: '#52c41a' },
    ],
    sectorBars: [
      { name: '能耗', value: 35, color: '#1890ff' },
      { name: '安全', value: 28, color: '#722ed1' },
      { name: '食堂', value: 18, color: '#fa8c16' },
      { name: '物业', value: 12, color: '#13c2c2' },
      { name: '资产', value: 7, color: '#52c41a' },
    ],
    efficiency: {
      stats: [
        { label: '平均响应时长', value: '12分钟', trend: '较昨日 -2分钟' },
        { label: '平均处置时长', value: '4.2小时', trend: '较昨日 +0.3小时' },
        { label: '超时率', value: '8.5%', trend: '较昨日 +1.2%' },
      ],
      deptBars: [
        { name: '资产部', value: 5.1 }, { name: '物业部', value: 4.5 }, { name: '安全部', value: 3.2 },
        { name: '能耗部', value: 2.8 }, { name: '食堂部', value: 2.5 },
      ],
    },
    top5: [
      { rank: 1, name: '1号楼配电房', count: 8, tags: ['用电突增', '设备离线'] },
      { rank: 2, name: '食堂后厨', count: 5, tags: ['晨检不合格', '三清三关不全'] },
      { rank: 3, name: 'B1消防泵房', count: 4, tags: ['水压异常', '设备离线'] },
      { rank: 4, name: '综合办公楼3F', count: 3, tags: ['报警频发', '通道堆放'] },
      { rank: 5, name: '工程楼机房', count: 2, tags: ['温湿度异常'] },
    ],
    latestEvents: [
      { id: 'R240424001', time: '10:23', title: '规则告警：1#楼用电异常32%', detail: '当前1320kWh，较基线上升38%，超阈值', level: '高', source: '规则告警' },
      { id: 'R240424002', time: '09:45', title: '三方推送：B1层烟感报警', detail: '', level: '中高', source: '三方推送' },
      { id: 'R240424003', time: '08:15', title: '人工上报：食堂晨检不合格', detail: '', level: '中', source: '人工上报' },
      { id: 'R240424004', time: '07:50', title: '三方推送：电表离线(3#楼主表)', detail: '', level: '中', source: '三方推送' },
      { id: 'R240424005', time: '06:30', title: '规则告警：夜间用水异常', detail: '', level: '低', source: '规则告警' },
    ],
  },

  riskIndicators: {
    filters: [
      { label: '业务板块', type: 'select', placeholder: '全部' },
      { label: '指标名称', type: 'input', placeholder: '名称或编码' },
      { label: '状态', type: 'select', placeholder: '全部' },
    ],
    toolbar: [{ label: '+ 新增指标', class: 'primary' }, { label: '导出', class: 'outline' }],
    columns: [
      { key: 'code', label: '指标编码' }, { key: 'name', label: '指标名称' }, { key: 'sector', label: '板块' },
      { key: 'source', label: '数据源' }, { key: 'unit', label: '单位' }, { key: 'enabled', label: '状态', type: 'switch' },
    ],
    rowActions: ['查看', '编辑', '测试', '试运行日志', '删除'],
    rows: [
      { code: 'ENERGY-POWER-001', name: '用电实时值', sector: '能耗管理', source: 'API_电能', unit: 'kWh', enabled: true },
      { code: 'ENERGY-WATER-001', name: '用水实时值', sector: '能耗管理', source: 'API_水表', unit: 'm³', enabled: true },
      { code: 'SECURITY-FIRE-001', name: '消防设备离线率', sector: '安全管理', source: 'DB_消防', unit: '%', enabled: true },
      { code: 'CANTEEN-CHECK-001', name: '晨检合格率', sector: '食堂管理', source: 'DB_食堂', unit: '%', enabled: true },
      { code: 'PROPERTY-WO-001', name: '待处理工单数', sector: '物业管理', source: 'DB_物业', unit: '条', enabled: false },
      { code: 'DEMO-001', name: '演示指标1', sector: '能耗管理', source: 'DB_演示', unit: '次', enabled: true },
      { code: 'DEMO-002', name: '演示指标2', sector: '安全管理', source: 'DB_演示', unit: '%', enabled: true },
    ],
    total: 7,
  },

  riskRules: {
    ruleTab: 'list',
    filters: [
      { label: '规则名称', placeholder: '名称关键字', type: 'input' },
      { label: '关联指标', type: 'select', placeholder: '全部' },
      { label: '等级', type: 'select', placeholder: '全部' },
      { label: '事件分类', type: 'select', placeholder: '全部' },
      { label: '状态', type: 'select', placeholder: '全部' },
    ],
    toolbar: [{ label: '+ 新增规则', class: 'primary' }, { label: '导出', class: 'outline' }],
    columns: [
      { key: 'name', label: '规则名称' }, { key: 'sector', label: '所属板块' }, { key: 'indicator', label: '关联指标' },
      { key: 'expression', label: '表达式' }, { key: 'level', label: '等级', type: 'level' }, { key: 'enabled', label: '状态', type: 'switch' },
      { key: 'category', label: '事件分类' }, { key: 'trial', label: '试运行' },
    ],
    rowActions: ['编辑', '测试', '版本历史', '复制', '另存为模板', '删除'],
    rows: [
      { name: '用电量过高', sector: '能耗管理', indicator: '用电实时值', expression: '{value} > 1500', level: '低', enabled: true, category: '用电异常', trial: '' },
      { name: '用电突增', sector: '能耗管理', indicator: '用电实时值', expression: '{value} > baseline * 1.3', level: '中', enabled: true, category: '用电异常', trial: '' },
      { name: '电表离线', sector: '能耗管理', indicator: '设备在线状态', expression: "{value} == 0", level: '中', enabled: true, category: '设备离线', trial: '' },
      { name: '消防报警', sector: '安全管理', indicator: '消防报警次数', expression: '{value} > 0', level: '高', enabled: true, category: '消防专项', trial: '' },
      { name: '通道堆放', sector: '安全管理', indicator: '通道检测', expression: "{value} == '异常'", level: '中', enabled: true, category: '安全告警', trial: '' },
      { name: '晨检不合格', sector: '食堂管理', indicator: '晨检合格率', expression: "{value} == '不合格'", level: '中', enabled: true, category: '晨检异常', trial: '' },
      { name: '工单积压', sector: '物业管理', indicator: '待处理工单数', expression: '{value} > 10', level: '低', enabled: true, category: '物业运营', trial: '' },
      { name: 'CO2超标', sector: '环境管理', indicator: 'CO2浓度', expression: '{value} > 1000', level: '低', enabled: true, category: '环境异常', trial: '' },
      { name: '演示规则', sector: '能耗管理', indicator: '演示指标1', expression: '{value} > 100', level: '低', enabled: true, category: '用电异常', trial: '试运行', extraActions: ['日志'] },
    ],
    total: 9,
    templates: [
      { name: '用电异常模板', sector: '能耗管理', indicator: '用电实时值', expression: '{value} > baseline * 1.2', level: '中' },
      { name: '设备离线模板', sector: '能耗管理', indicator: '设备在线状态', expression: "{value} == 0", level: '中' },
    ],
  },

  riskEventCategory: {
    filters: [
      { label: '所属板块', type: 'select', placeholder: '全部' },
      { label: '状态', type: 'select', placeholder: '全部' },
      { label: '分类名称', type: 'input', placeholder: '关键字' },
    ],
    toolbar: [{ label: '+ 新增分类', class: 'purple' }],
    columns: [
      { key: 'index', label: '序号' }, { key: 'name', label: '分类名称' }, { key: 'sector', label: '所属板块' },
      { key: 'ruleCount', label: '关联规则数' }, { key: 'eventCount', label: '关联事件数' },
      { key: 'levels', label: '可用等级' }, { key: 'desc', label: '描述' }, { key: 'status', label: '状态', type: 'tag' },
    ],
    rowActions: ['编辑', '删除', '停用'],
    rows: [
      { index: 1, name: '设备离线', sector: '能耗管理', ruleCount: 1, eventCount: 0, levels: '低、中、高', desc: '电表、水表等设备离线', status: '启用' },
      { index: 2, name: '用电异常', sector: '能耗管理', ruleCount: 3, eventCount: 1, levels: '低、中、高', desc: '超限用电、突增等异常', status: '启用' },
      { index: 3, name: '安全告警', sector: '安全管理', ruleCount: 3, eventCount: 2, levels: '低、中、高', desc: '安防、周界等告警', status: '启用' },
      { index: 4, name: '消防告警', sector: '安全管理', ruleCount: 0, eventCount: 1, levels: '低、中、高', desc: '烟感、温感等消防告警', status: '启用' },
      { index: 5, name: '消防专项', sector: '安全管理', ruleCount: 1, eventCount: 0, levels: '低、中、高', desc: '消防专项检查与规则', status: '启用' },
      { index: 6, name: '晨检异常', sector: '食堂管理', ruleCount: 0, eventCount: 1, levels: '低、中、高', desc: '食堂晨检不合格等', status: '启用' },
      { index: 7, name: '食堂安全', sector: '食堂管理', ruleCount: 0, eventCount: 0, levels: '低、中、高', desc: '留样、清洁、安全等事项', status: '启用' },
      { index: 8, name: '物业运营', sector: '物业管理', ruleCount: 0, eventCount: 1, levels: '低、中、高', desc: '工单积压、报修等', status: '启用' },
    ],
    total: 8,
  },

  riskReportCenter: {
    projectNote: '当前项目：黄浦机管局，报告模板、定时任务与历史均按项目隔离',
    quickGen: { cycles: ['周报', '月报', '日报'], weeks: ['第16周 (04/14-04/20)'], templates: ['标准周报模板'] },
    myReports: [
      { title: '2026-04-20 周报', time: '2026-04-20 09:00' },
      { title: '2026-04-13 周报', time: '2026-04-13 09:00' },
      { title: '2026-03 月报', time: '2026-03-01 08:00' },
    ],
    scheduledPreview: [
      { name: '每日风险日报推送', status: '启用' },
      { name: '每周风险周报', status: '启用' },
      { name: '每月风险月报', status: '停用' },
    ],
    preview: {
      title: '【周报预览】2026年第16周风险报告',
      meta: '生成人：系统管理员 · 生成时间：2026-05-19 10:36 · 模板：标准周报模板',
      overview: [
        { label: '新增风险', value: '23起' },
        { label: '已闭环', value: '19起' },
        { label: '闭环率', value: '82%' },
      ],
      levelDonut: [
        { name: '高', count: 5, color: '#ff4d4f' },
        { name: '中', count: 12, color: '#fa8c16' },
        { name: '低', count: 6, color: '#52c41a' },
      ],
      trend8: {
        labels: ['W9', 'W10', 'W11', 'W12', 'W13', 'W14', 'W15', 'W16'],
        data: [18, 21, 19, 24, 22, 25, 23, 23],
      },
      top5Areas: [
        { name: '1号楼配电房', count: 8, pct: 36.4, color: '#ff4d4f' },
        { name: '食堂后厨', count: 5, pct: 22.7, color: '#fa8c16' },
        { name: '地下车库B区', count: 4, pct: 18.2, color: '#faad14' },
        { name: '主楼消防通道', count: 3, pct: 13.6, color: '#52c41a' },
        { name: '中央空调机房', count: 2, pct: 9.1, color: '#13c2c2' },
      ],
      pendingRows: [
        { event: '配电房温升异常', level: '高', time: '2024-04-24 07:20', area: '1号楼', owner: '张三', status: '处置中' },
        { event: '消防通道堆放', level: '中', time: '2024-04-23 16:10', area: '主楼', owner: '李四', status: '待派单' },
      ],
    },
  },

  riskReportTemplate: {
    projectNote: '当前项目：黄浦机管局，报告模板、定时任务与历史均按项目隔离',
    hint: '系统预置模板 (tenant_id=0) 全项目可见；可复制为「本项目模板」后修改。项目模板仅当前项目可用。',
    toolbar: [{ label: '+ 新增模板', class: 'purple' }],
    columns: [
      { key: 'name', label: '模板名称' }, { key: 'type', label: '类型' },
      { key: 'source', label: '来源', type: 'tag' }, { key: 'status', label: '状态', type: 'tag' },
    ],
    rowActions: ['复制为项目'],
    rows: [
      { name: '标准日报模板', type: '日报', source: '系统', status: '启用' },
      { name: '标准周报模板', type: '周报', source: '系统', status: '启用' },
      { name: '标准月报模板', type: '月报', source: '系统', status: '启用' },
    ],
    total: 3,
  },

  riskReportSchedule: {
    projectNote: '当前项目：黄浦机管局 · 报告模板 · 定时任务与历史均按项目隔离',
    filters: [
      { label: '任务名称', placeholder: '关键字', type: 'input' },
      { label: '状态', type: 'select', placeholder: '全部' },
      { label: '周期', type: 'select', placeholder: '全部' },
      { label: '最近执行', type: 'select', placeholder: '全部' },
    ],
    toolbar: [{ label: '+ 新增任务', class: 'primary' }],
    columns: [
      { key: 'name', label: '任务名称' }, { key: 'push', label: '推送' }, { key: 'cycle', label: '周期' },
      { key: 'execTime', label: '执行时间' }, { key: 'lastExec', label: '上次执行' },
      { key: 'enabled', label: '状态', type: 'switch' }, { key: 'result', label: '最近执行结果', type: 'result' },
    ],
    rowActions: ['编辑', '执行', '历史', '删除'],
    rows: [
      { name: '每日风险日报推送', push: 'Email(SMTP-报告专用)、钉钉机器人', cycle: '每日', execTime: '09:00', lastExec: '2024-04-24 09:00:15', enabled: true, result: '成功 (已推送 3 个目标)', resultType: 'success' },
      { name: '每周风险周报', push: 'Email(SMTP-报告专用)、钉钉机器人', cycle: '每周一', execTime: '08:00', lastExec: '2024-04-21 08:02:00', enabled: true, result: '部分成功 (邮件失败)', resultType: 'warn' },
      { name: '每月风险月报', push: 'Email(SMTP-报告专用)', cycle: '每月1日', execTime: '08:00', lastExec: '2024-04-01 08:00:00', enabled: false, result: '—', resultType: '' },
    ],
    total: 3,
  },
};

Object.assign(MP_PAGE_DATA, MP_ENV_RISK_DATA);

Object.assign(MP_PAGE_REGISTRY, {
  'env-device': { type: 'env-device-bind', dataKey: 'envDevice' },
  'env-operation': { type: 'env-operation', dataKey: 'envOperation' },
  'env-alarm': { type: 'env-alarm', dataKey: 'envAlarm' },
  'knowledge-agent': { type: 'knowledge-agent', dataKey: 'knowledgeAgent' },
  'risk-dashboard': { type: 'risk-dashboard', dataKey: 'riskDashboard' },
  'risk-indicators': { type: 'risk-data-table', dataKey: 'riskIndicators', tableStyle: 'standard' },
  'risk-rules': { type: 'risk-data-table', dataKey: 'riskRules', tableStyle: 'rules' },
  'risk-event-category': { type: 'risk-data-table', dataKey: 'riskEventCategory', tableStyle: 'purple' },
  'risk-report-center': { type: 'risk-report-center', dataKey: 'riskReportCenter' },
  'risk-report-template': { type: 'risk-report-template', dataKey: 'riskReportTemplate' },
  'risk-report-schedule': { type: 'risk-data-table', dataKey: 'riskReportSchedule', tableStyle: 'schedule' },
});
