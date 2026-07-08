# -*- coding: utf-8 -*-
"""Generate mini-program PRD as .docx using stdlib only."""
import html
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parent / "智慧园区小程序PRD.docx"

WNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
RNS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"


def p(text, style=None):
    text = escape(text)
    if style:
        return f'<w:p><w:pPr><w:pStyle w:val="{style}"/></w:pPr><w:r><w:t xml:space="preserve">{text}</w:t></w:r></w:p>'
    return f'<w:p><w:r><w:t xml:space="preserve">{text}</w:t></w:r></w:p>'


def h1(text):
    return p(text, "Heading1")


def h2(text):
    return p(text, "Heading2")


def h3(text):
    return p(text, "Heading3")


def bullet(text):
    text = escape(text)
    return (
        f'<w:p><w:pPr><w:pStyle w:val="ListParagraph"/><w:numPr>'
        f'<w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr>'
        f'<w:r><w:t xml:space="preserve">{text}</w:t></w:r></w:p>'
    )


def table(headers, rows):
    cols = len(headers)
    grid = "".join(f'<w:gridCol w:w="2400"/>' for _ in headers)
    def cell(txt, bold=False):
        txt = escape(str(txt))
        rpr = "<w:rPr><w:b/></w:rPr>" if bold else ""
        return (
            f'<w:tc><w:tcPr><w:tcW w:w="2400" w:type="dxa"/></w:tcPr>'
            f'<w:p><w:r>{rpr}<w:t xml:space="preserve">{txt}</w:t></w:r></w:p></w:tc>'
        )
    trs = []
    trs.append("<w:tr>" + "".join(cell(h, True) for h in headers) + "</w:tr>")
    for row in rows:
        trs.append("<w:tr>" + "".join(cell(c) for c in row) + "</w:tr>")
    return (
        f'<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders>'
        f'<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>'
        f'<w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>'
        f'<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>'
        f'<w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>'
        f'<w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>'
        f'<w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>'
        f'</w:tblBorders></w:tblPr><w:tblGrid>{grid}</w:tblGrid>' + "".join(trs) + "</w:tbl>"
    )


def build_body():
    parts = []

    parts.append(h1("智慧园区数字化管理平台 — 小程序产品需求说明（PRD）"))
    parts.append(p("文档版本：V1.2"))
    parts.append(p("编写依据：prototype/ 交互原型源码（index.html、js/app.js、css/*）及 dp/js/public-warehouse-data.js"))
    parts.append(p("产品名称：BLM Digital 小程序"))
    parts.append(p("适用范围：智慧园区数字化管理平台移动端小程序"))
    parts.append(p("说明：本文档严格依据当前原型代码梳理，未在代码中实现的能力标注为「原型占位」或「未接入」。"))
    parts.append(p("V1.2 变更：公物仓入库/出库区块明确无趋势图，仅 KPI + 历史表，与中台 V1.1 一致。"))

    parts.append(h2("1. 文档概述"))
    parts.append(h3("1.1 产品定位"))
    parts.append(p("BLM Digital 小程序是智慧园区数字化管理平台的移动端入口，面向园区运营管理人员，提供多项目切换、首页运营总览、物业工单协作、数据统计看板、个人中心及小禹 AI 智能助手等能力。原型为纯前端 Mock 实现，数据按项目维度隔离展示。"))

    parts.append(h3("1.2 技术实现说明（原型阶段）"))
    parts.append(bullet("纯前端 HTML/CSS/JavaScript 单页应用，无后端 API 与持久化存储（页面刷新后除运行时通讯录修改外均重置）。"))
    parts.append(bullet("核心逻辑集中在 prototype/js/app.js；图标库为 prototype/js/icons.js。"))
    parts.append(bullet("公物仓统计数据引用 dp/js/public-warehouse-data.js（PUBLIC_WAREHOUSE_DATA），与中台、大屏共享同一数据源。"))
    parts.append(bullet("样式文件：style.css（主布局）、auth.css（认证及数据子页，含公物仓 gw-* 样式）、xiaoyu.css（小禹模块）、icons.css。"))
    parts.append(bullet("原型外壳 index.html 含侧边栏调试快捷入口及跨系统链接（大屏、中台、小程序、底座）。"))

    parts.append(h3("1.3 信息架构总览"))
    parts.append(p("应用分为四个阶段/层级："))
    parts.append(bullet("认证阶段：登录 → 选项目 → 进入应用"))
    parts.append(bullet("主 Tab 导航：首页、协作、数据、我的"))
    parts.append(bullet("子页面：由首页/协作/我的及 FAB 入口打开的二级页面"))
    parts.append(bullet("小禹模块：独立子页，内含智能体选择、对话、通知、个人中心等子阶段"))

    parts.append(h2("2. 全局框架与导航"))
    parts.append(h3("2.1 手机框 UI 结构"))
    parts.append(table(
        ["区域", "DOM ID", "显示规则", "功能"],
        [
            ["状态栏", "#status-bar", "登录后显示；登录页隐藏", "时间、系统切换按钮、信号图标"],
            ["导航栏", "#nav-bar", "子页显示（小禹除外）；数据 Tab 常驻显示", "返回按钮、页面标题"],
            ["主内容区", "#screen", "始终", "渲染当前页面内容"],
            ["Tab 栏", "#tab-bar", "应用内且无子页时显示", "四 Tab 切换"],
            ["小禹 FAB", "#xiaoyu-fab", "应用内 + 首页 Tab + 无子页", "浮动入口进入小禹"],
        ]
    ))

    parts.append(h3("2.2 路由与渲染机制"))
    parts.append(p("state.authPhase 控制认证流程：login（登录）→ selectProject（选项目）→ app（主应用）。"))
    parts.append(p("state.currentTab 控制主 Tab：home / collab / data / mine。"))
    parts.append(p("state.currentSubPage 非空时进入子页，隐藏 Tab Bar，停止首页轮播。"))
    parts.append(p("返回逻辑：App.handleBack() → closeSubPage()，关闭当前子页回到 Tab；不支持多级子页栈（subPageStack 已声明未使用）。"))
    parts.append(p("Tab 切换时清空子页并 re-render；回到首页时重启轮播。"))

    parts.append(h3("2.3 全局弹层与反馈"))
    parts.append(table(
        ["组件", "触发", "交互逻辑"],
        [
            ["项目切换 Picker", "#project-mask", "首页点击项目名 → toggleProjectPicker；点击遮罩关闭；选中项显示 ✓；selectProject 切换 currentProject 并 Toast"],
            ["通讯录 Modal", "#contact-modal", "添加/编辑联系人；遮罩关闭；保存校验姓名+手机号"],
            ["Toast", "#toast", "全局提示，2 秒自动消失"],
            ["确认框 confirm", "退出登录/删除联系人/清空小禹对话", "浏览器原生 confirm"],
        ]
    ))

    parts.append(h3("2.4 跨系统切换"))
    parts.append(p("状态栏显示器图标（登录后可见）可展开菜单，链接至：大屏（dp/index.html）、中台（dp/middle-platform.html）、小程序（当前）、底座（dp/foundation-platform.html）。"))

    parts.append(h2("3. 认证与用户流程"))
    parts.append(h3("3.1 登录页（authPhase=login）"))
    parts.append(p("品牌展示：BLM Digital 小程序。"))
    parts.append(p("两种登录模式（state.loginMode）："))
    parts.append(bullet("账号密码登录（account）：账号 + 密码输入框"))
    parts.append(bullet("手机号登录（phone）：手机号 + 验证码 +「获取验证码」按钮（Toast：验证码已发送）"))
    parts.append(p("底部链接：忘记密码 → 子页 forgotPassword；注册账号 → 子页 register。"))
    parts.append(p("操作：登录 → doLogin() → Toast「登录成功」→ authPhase=selectProject；切换登录方式 → toggleLoginMode()。"))
    parts.append(p("原型说明：不做真实账号校验。"))

    parts.append(h3("3.2 注册页（子页 register）"))
    parts.append(p("字段：登录账号、登录密码、确认密码。"))
    parts.append(p("校验：必填；两次密码一致。"))
    parts.append(p("成功：Toast「注册成功，请登录」→ 返回登录页。"))

    parts.append(h3("3.3 忘记密码（子页 forgotPassword）"))
    parts.append(p("字段：登录账号、手机号（含获取验证码）、手机验证码、新密码、确认新密码。"))
    parts.append(p("密码可见性切换 togglePwd('new1'/'new2')。"))
    parts.append(p("提示：6–20 位数字+字母+特殊字符；不可与上次密码一致。"))
    parts.append(p("成功：Toast「密码重置成功」→ 返回登录页。"))

    parts.append(h3("3.4 选项目页（authPhase=selectProject）"))
    parts.append(p("文案：「检测到有多个项目，请选择一个项目进入」。"))
    parts.append(p("展示 PROJECTS 列表为卡片，含项目名、编码、成员数；选中高亮 selectProjectCard。"))
    parts.append(p("点击「进入」→ enterApp()：设置 currentProject，authPhase=app，默认 Tab=home，Toast「已进入 {项目名}」，启动轮播。"))

    parts.append(h3("3.5 退出登录"))
    parts.append(p("入口：我的 Tab → 退出登录；小禹个人中心 → 退出登录。"))
    parts.append(p("流程：confirm 确认 → authPhase=login，清空子页，Tab=home，停止轮播，Toast「已退出登录」。"))

    parts.append(h2("4. 多项目管理"))
    parts.append(h3("4.1 项目列表"))
    parts.append(table(
        ["ID", "名称", "编码", "成员数"],
        [
            ["p1", "延安东路300号", "TK3HWTNJ", "24"],
            ["p2", "重庆南路100号", "CQNL100H", "18"],
            ["p3", "重庆南路139号", "CQNL139H", "15"],
            ["p4", "河南南路288号", "HNNL288H", "21"],
        ]
    ))

    parts.append(h3("4.2 项目维度数据（PROJECT_DATA）"))
    parts.append(p("每个项目独立维护以下数据块，切换项目后首页 KPI、数据总览、小禹回复等均通过 pd() 读取当前项目数据："))
    parts.append(bullet("homeOverview：建筑面积、设备总数、待/已处理工单、今日用电/用水、今日就餐人数、刷卡总金额"))
    parts.append(bullet("dataOverview：资产总量、待处理工单、今日能源、食堂合格率"))
    parts.append(bullet("energy：累计/今日用水用电、较昨日对比"))
    parts.append(bullet("canteen：采购总额、库存、客饭/线上预定、人员数"))
    parts.append(bullet("assetManagement：空间/设备面积与数量"))

    parts.append(h3("4.3 项目切换交互"))
    parts.append(bullet("登录后选项目：仅改变 selectedProjectId，点击「进入」后生效"))
    parts.append(bullet("应用内切换：首页 Header 项目切换器 → 底部 Picker Modal → selectProject → 全页 re-render + Toast"))

    parts.append(h2("5. 主 Tab — 首页"))
    parts.append(h3("5.1 Header"))
    parts.append(bullet("项目切换器：位置图标 + 项目名 + ▼"))
    parts.append(bullet("通知铃铛：跳转 notifications 子页；未读数 badge（unreadNotifications）"))

    parts.append(h3("5.2 轮播图"))
    parts.append(p("数据 MOCK.carouselList（3 张）：智慧园区数字化管理平台、绿色低碳·智能运维、一站式园区服务。"))
    parts.append(p("自动轮播间隔 4 秒；点击指示点可手动切换；离开首页停止轮播。"))

    parts.append(h3("5.3 数据总览卡片"))
    parts.append(p("四模块 KPI（数据来自当前项目 homeOverview）："))
    parts.append(table(
        ["模块 Tag", "指标1", "指标2"],
        [
            ["资产", "建筑面积", "设备总数"],
            ["物业", "待处理工单", "已处理工单"],
            ["能源", "今日用电", "今日用水"],
            ["食堂", "今日就餐人数", "今日刷卡总金额"],
        ]
    ))

    parts.append(h3("5.4 资产管理入口"))
    parts.append(table(
        ["入口", "点击行为"],
        [
            ["空间", "goToAssetSection('asset-type','space') → 资产数据总览并滚动至类型区"],
            ["设备", "goToAssetSection('asset-type','equipment') → 资产数据总览并滚动至类型区"],
            ["公物仓", "goToAssetSection('asset-warehouse') → 滚动至公物仓区"],
            ["查看更多", "openAssetData('space')"],
        ]
    ))

    parts.append(h3("5.5 物业管理入口"))
    parts.append(table(
        ["ID", "名称", "Badge", "跳转"],
        [
            ["repair", "报修工单", "99+", "openWorkOrderList('repair')"],
            ["maintain", "维保工单", "53", "openWorkOrderList('maintain')"],
            ["inspect", "巡检任务", "28", "openWorkOrderList('inspect')"],
            ["myorder", "我的工单", "99+", "openSubPage('workorder')"],
        ]
    ))

    parts.append(h3("5.6 能源管理入口"))
    parts.append(bullet("用水 → openEnergyData('water')"))
    parts.append(bullet("用电 → openEnergyData('electric')"))
    parts.append(bullet("查看更多 → openEnergyData('electric')"))

    parts.append(h3("5.7 食堂管理入口"))
    parts.append(table(
        ["入口", "子页 ID"],
        [
            ["智慧卡", "smartCardData"],
            ["食堂运营", "canteenOpsData"],
            ["食堂监管", "canteenSupervisionData"],
        ]
    ))

    parts.append(h3("5.8 小禹 FAB"))
    parts.append(p("显示条件：authPhase=app 且 currentTab=home 且无 currentSubPage。"))
    parts.append(p("点击 → openSubPage('xiaoyu')。"))

    parts.append(h2("6. 主 Tab — 协作"))
    parts.append(p("标题：协作中心 / 工单与消息。"))
    parts.append(table(
        ["入口", "Badge 逻辑", "跳转"],
        [
            ["我的工单", "myWorkOrders 中非 done  tab 的数量", "workorder"],
            ["我的消息", "messages 未读数", "messages"],
        ]
    ))

    parts.append(h2("7. 主 Tab — 数据（数据统计）"))
    parts.append(p("Nav Bar 标题固定为「数据统计」。本 Tab 为纵向 Dashboard，各模块图表内嵌展示，不跳转子页。"))

    parts.append(h3("7.1 资产管理"))
    parts.append(bullet("资产类型分布：空间/设备 Toggle（assetTypeTab）+ 饼图 + 图例；中心显示总面积或设备总数"))
    parts.append(bullet("设施故障统计：12 月折线图（MOCK.facilityFailures）"))
    parts.append(bullet("办公用房：5 项横向卡片（楼栋总数 4、房间总数 1373、楼层数量 51、建筑面积 74620.44㎡、总使用面积 52739.42㎡）"))
    parts.append(bullet("公物仓：renderPublicWarehouseSection()，数据来自 PUBLIC_WAREHOUSE_DATA，与中台公物仓统计口径一致，分三大区块："))
    parts.append(bullet("  ① 库存物资数：在仓 822 件（黄浦 484 / 闵行 338）、累计存放 1320 件（环比 ↑5.6%）、分仓 pie、堆叠条、累计历史表"))
    parts.append(bullet("  ② 入库：指标 Tab（次数/物资数量/固定资产价值，state.gwInboundMetric）+ 本季 KPI + 年度历史表（无趋势图）"))
    parts.append(bullet("  ③ 出库：指标 Tab（次数/物资数量/节约资金，state.gwOutboundMetric）+ 本季 KPI + 年度历史表（无趋势图）；出库次数指标含周转率列"))

    parts.append(h3("7.1.1 公物仓模块交互细节"))
    parts.append(p("函数 renderPublicWarehouseSection() 在数据 Tab 与资产数据总览子页复用。"))
    parts.append(table(
        ["区块", "UI 元素", "交互"],
        [
            ["库存物资数", "4 项 KPI 摘要行", "只读展示在仓/分仓/累计"],
            ["库存物资数", "本季在仓物资分仓占比 pie", "Donut 图，中心「本季总数 822」"],
            ["库存物资数", "各仓库在仓情况堆叠条", "黄浦/闵行占比条 + 图例（件数+百分比）"],
            ["库存物资数", "累计存放历史表", "列：周期/合计/黄浦/闵行/环比"],
            ["入库", "指标 Tab ×3", "setGwInboundMetric → re-render"],
            ["入库", "本季 KPI 卡片", "合计 + 环比 + 分仓明细"],
            ["入库", "入库历史表", "年度数据最近 4 行，含环比；无趋势折线图"],
            ["出库", "指标 Tab ×3", "setGwOutboundMetric → re-render"],
            ["出库", "本季 KPI 卡片", "合计 + 环比 + 分仓明细"],
            ["出库", "出库历史表", "count 指标显示周转率列；quantity/savedFunds 显示「—」；无趋势折线图"],
        ]
    ))

    parts.append(h3("7.2 物业管理"))
    parts.append(p("本月工单完成率：报修/巡检/维保 三个环形进度条（propertyCompletionRates）。"))

    parts.append(h3("7.3 能源管理"))
    parts.append(p("能源类型统计：用电/用水 Toggle（dataEnergyTypeTab）+ donut 图 + 明细表格。"))

    parts.append(h3("7.4 食堂管理"))
    parts.append(p("当周营销统计：人数（充值/刷卡双线对比）或 金额 Toggle（canteenMarketingType）。"))

    parts.append(h2("8. 主 Tab — 我的"))
    parts.append(h3("8.1 Profile Header"))
    parts.append(p("展示 MOCK.userProfile：姓名首字头像、姓名、当前项目·部门、岗位角色。"))

    parts.append(h3("8.2 菜单项"))
    parts.append(table(
        ["菜单", "子页", "说明"],
        [
            ["编辑资料", "profile", "只读展示个人信息"],
            ["修改密码", "changePassword", "表单提交 Toast 成功"],
            ["通讯录", "contacts", "联系人 CRUD"],
        ]
    ))

    parts.append(h3("8.3 编辑资料（profile）"))
    parts.append(p("只读字段：姓名、工号、手机号、所属项目园区、所属部门、岗位角色。"))

    parts.append(h3("8.4 修改密码（changePassword）"))
    parts.append(p("字段：原密码、新密码、确认新密码。"))
    parts.append(p("提示：6–20 位数字+字母+特殊字符。"))
    parts.append(p("确认 → Toast「密码修改成功」+ closeSubPage（原型无真实校验）。"))

    parts.append(h3("8.5 通讯录（contacts）"))
    parts.append(p("搜索：按姓名或部门实时过滤（contactSearch）。"))
    parts.append(p("列表：头像（姓名首字）、姓名、部门·手机号；编辑/删除按钮。"))
    parts.append(p("添加：+ 添加 → Modal（姓名、部门、手机号）→ saveContact；校验姓名+手机号必填。"))
    parts.append(p("编辑：回填 Modal → 更新；删除：confirm 后移除。"))
    parts.append(p("初始 Mock 4 条联系人：李主管、王工程师、赵会计、陈经理。"))

    parts.append(h2("9. 子页面 — 消息通知（notifications）"))
    parts.append(p("入口：首页 Header 铃铛。"))
    parts.append(p("数据：state.notifications（源自 MOCK.notifications）。"))
    parts.append(p("卡片：标题、时间、内容；未读样式 unread-notify。"))
    parts.append(p("点击 → markNotificationRead + Toast「已标记为已读」。"))
    parts.append(p("Mock 示例：报修工单待处理、巡检任务提醒、能源异常告警。"))

    parts.append(h2("10. 子页面 — 工单体系"))
    parts.append(h3("10.1 工单类型"))
    parts.append(p("workOrderCategories：报修(55)、维保(10)、巡检(10)、安全(10)、施工(10)、整改(10)。"))
    parts.append(p("类型 Tag 色：报修=蓝、维保=橙、巡检=绿。"))

    parts.append(h3("10.2 工单状态"))
    parts.append(table(
        ["场景", "状态值"],
        [
            ["协作筛选 collabFilters", "全部、报修、待派单、待接单、待关单、已关单、已取消"],
            ["工单列表筛选 workOrderStatusFilters", "全部、待派单、待审核、待接单、待报修完成、待签字、待关单、已关单、已取消"],
            ["myWorkOrders 实际", "待派单、待接单、待关单、待签字、已完结"],
            ["workOrderList 实际", "待派单、待接单、报修待完成、待签字、待关单、已完结、已取消"],
        ]
    ))

    parts.append(h3("10.3 我的工单（workorder）"))
    parts.append(p("入口：首页物业管理「我的工单」、协作 Tab「我的工单」。"))
    parts.append(p("主 Tab（workOrderMainTab）：我发起的 / 我的待办 / 我的已办（带计数，数据 MOCK.myWorkOrders）。"))
    parts.append(p("筛选 Chips（workOrderFilter）：collabFilters 9 项。"))
    parts.append(p("工单卡片字段："))
    parts.append(bullet("报修：问题类型、问题描述"))
    parts.append(bullet("维保：维保计划"))
    parts.append(bullet("巡检：巡检类型、巡检计划"))
    parts.append(p("卡片顶部：类型 Tag、时间、状态。"))
    parts.append(p("点击卡片 → Toast「查看工单详情」（原型无详情页）。"))

    parts.append(h3("10.4 工单列表（workOrderList）"))
    parts.append(p("入口：首页报修/维保/巡检工单图标。"))
    parts.append(p("分类 Tab（workOrderListCategory）：6 类 + count，横向切换。"))
    parts.append(p("状态筛选（workOrderListFilter）：9 项，横向滚动。"))
    parts.append(p("过滤逻辑：category 匹配 + status 匹配（含 includes 模糊）。"))
    parts.append(p("空态：「暂无工单」。"))

    parts.append(h3("10.5 待办页（todo）— 未接入导航"))
    parts.append(p("renderTodo 已实现，数据结构 MOCK.todos，UI 与 workorder 相同。"))
    parts.append(p("pendingTodos() 已定义但未被 UI 引用；应用内无入口。"))

    parts.append(h3("10.6 筛选逻辑（renderCollabPage）"))
    parts.append(p("1. 先按 mainTab（initiated/todo/done）过滤 items.tab"))
    parts.append(p("2. 再按 filter：「全部」通过；「报修」匹配 type；其他匹配 status 或 status.includes(filter.replace('待',''))"))

    parts.append(h2("11. 子页面 — 我的消息（messages）"))
    parts.append(p("入口：协作 Tab → 我的消息。"))
    parts.append(p("搜索栏：标题/内容实时 filter；搜索按钮 Toast「搜索完成」。"))
    parts.append(p("Tab：全部 / 已读 / 未读（带计数 badge）。"))
    parts.append(p("操作：全部已读 markAllMessagesRead。"))
    parts.append(p("过滤规则：排除 category/content 含「会议|访客申请」的消息。"))
    parts.append(p("点击卡片 → markMessageRead + Toast。"))
    parts.append(p("Mock 分类：系统通知、审批提醒、巡检通知。"))

    parts.append(h2("12. 子页面 — 数据总览模块"))
    parts.append(h3("12.1 食堂数据总览（canteenData）"))
    parts.append(p("入口：原型侧边栏快捷入口（应用内首页无直接入口）。"))
    parts.append(p("Seg Tab：数据看板 / 每日菜谱。"))
    parts.append(p("数据看板 KPI：采购订单总金额、食堂库存总数、客饭预定数、线上预定数。"))
    parts.append(p("持卡人员年度统计：部门/人员性质 Toggle + 饼图。"))
    parts.append(p("当日食堂监测：三清三关、留样菜监测、晨检结果（均「通过」）。"))
    parts.append(p("当周营销统计：人数（充值/刷卡双线）或 金额 Toggle。"))
    parts.append(p("每日菜谱 Tab：日期范围、食堂名称（当前项目）、餐段 Tab（早/午/晚）、表格（日期/类别/品名/售价）。"))

    parts.append(h3("12.2 能源数据总览（energyData）"))
    parts.append(p("入口：首页能源管理用水/用电/查看更多。"))
    parts.append(p("Seg Tab：用电 / 用水。"))
    parts.append(p("时间筛选：今天 / 月度 / 年度（energyTimeFilter，切换仅 UI；用水今日值写死 12.5t）。"))
    parts.append(p("今日用量 + 较昨日对比；逐时趋势对比（今日 vs 昨日，hourlyElectric）。"))
    parts.append(p("用电/用水类型 donut + 明细表（energyTypes / waterTypes）。"))

    parts.append(h3("12.3 资产数据总览（assetData）"))
    parts.append(p("入口：首页资产管理各入口及「查看更多」。"))
    parts.append(p("按资产类型统计：空间/设备 Toggle + 饼图 + 总面积/设备数标签（数据随当前项目 PROJECT_DATA.assetManagement 变化）。"))
    parts.append(p("办公用房卡片（MOCK.officeSpace 5 项 KPI）。"))
    parts.append(p("公物仓卡片：与数据 Tab 内嵌区块相同，调用 renderPublicWarehouseSection()，展示库存/入库/出库完整统计（PUBLIC_WAREHOUSE_DATA）。"))
    parts.append(p("Deep link 滚动锚点：asset-data-type-section、asset-data-office-section、asset-data-warehouse-section。"))
    parts.append(p("说明：资产数据总览页不再单独展示「本季在仓物资分仓占比」卡片，分仓 pie 已并入公物仓区块的「库存物资数」部分。"))

    parts.append(h3("12.4 智慧卡数据总览（smartCardData）"))
    parts.append(p("入口：首页食堂管理 → 智慧卡。"))
    parts.append(p("KPI 卡片（随周期变化标签）：刷卡人次、消费金额、人均消费（均带趋势 ↑）。"))
    parts.append(p("消费趋势分析：周期 当日/本周/本月/本年；维度 按人次/按金额；三线图 充值/刷卡/消费。"))

    parts.append(h3("12.5 食堂运营数据总览（canteenOpsData）"))
    parts.append(p("入口：首页食堂管理 → 食堂运营。"))
    parts.append(p("4 KPI：今日预定总数、客饭预定数、线上预定数、实际就餐数。"))
    parts.append(p("运营明细表：餐段下拉筛选、日期区间（readonly）、分页占位。"))
    parts.append(p("TOP5 横向柱图：实际就餐 / 预订数。"))
    parts.append(p("本周菜谱管理：7 天网格（早/午/晚）。"))

    parts.append(h3("12.6 食堂监管数据总览（canteenSupervisionData）"))
    parts.append(p("入口：首页食堂管理 → 食堂监管。"))
    parts.append(p("3 状态卡：三清三关、留样菜监测、晨检结果（均通过）。"))
    parts.append(p("日期区间搜索 + 清空；监管记录表 + 分页占位。"))

    parts.append(h2("13. 小禹 AI 智能助手"))
    parts.append(h3("13.1 入口与阶段"))
    parts.append(p("入口：首页 FAB。"))
    parts.append(p("xiaoyuPhase：agents（选智能体）/ chat（对话）/ notifications（消息通知）/ profile（个人中心）。"))
    parts.append(p("小禹子页隐藏全局 Nav Bar，使用内部 Header。"))

    parts.append(h3("13.2 三大智能体"))
    parts.append(table(
        ["ID", "名称", "Tag", "职责"],
        [
            ["park", "智慧问答", "问答智能体", "解答园区概况、设施服务、食堂餐饮、公告通知等基础问题"],
            ["repair", "智能工单", "工单智能体", "解答系统内全部工单（报修/维保/巡检/安全/施工/整改）及进度状态"],
            ["workorder", "智能报表", "报表智能体", "解读资产、能源、物业、食堂等模块数据汇总与运营趋势"],
        ]
    ))
    parts.append(p("各智能体：版本 1.0.0、状态「可用」、不支持定时任务。"))

    parts.append(h3("13.3 智能体选择页"))
    parts.append(p("欢迎语 + 用户姓名（MOCK.userProfile.name）。"))
    parts.append(p("全局快捷 Chip（4 个）：园区基本情况→park、待处理工单→repair、数据总览解读→workorder、园区最新公告→park。"))
    parts.append(p("三大功能卡片 → xiaoyuSelectAgent 进入对话。"))

    parts.append(h3("13.4 对话页"))
    parts.append(p("Agent 卡片：Logo、名称、Tag、版本、「详情」「反馈与建议」「新建对话」。"))
    parts.append(p("空态：智能体描述 + 专属快捷 Chip（XIAOYU_AGENT_QUICK_ACTIONS）。"))
    parts.append(p("消息：用户/助手气泡（助手带小禹头像）；Enter 发送；600ms 模拟延迟回复。"))
    parts.append(p("输入框 Placeholder 按智能体不同（XIAOYU_AGENT_PLACEHOLDERS）。"))

    parts.append(h3("13.5 回复逻辑"))
    parts.append(p("getXiaoyuReply(text, agentId) 按 agentId 路由至 getXiaoyuParkReply / getXiaoyuOrderReply / getXiaoyuReportReply，结合关键词匹配 + 当前项目 PROJECT_DATA + MOCK 数据。"))
    parts.append(p("智慧问答：园区介绍、食堂、公告、设施服务；跨域问题提示切换智能工单/智能报表。"))
    parts.append(p("智能工单：待处理列表、我的工单、报修/维保巡检分类、系统工单统计；跨域提示切换。"))
    parts.append(p("智能报表：能耗、资产、食堂运营、物业完成率、趋势、数据总览；跨域提示切换。"))

    parts.append(h3("13.6 Header 操作"))
    parts.append(bullet("工作台（菜单）→ 侧滑面板"))
    parts.append(bullet("消息（铃铛 + 未读 badge）→ 下拉：异常提醒/消息提醒/事件提醒"))
    parts.append(bullet("个人中心（用户头像）"))

    parts.append(h3("13.7 工作台"))
    parts.append(bullet("我的智能体列表：切换 Agent"))
    parts.append(bullet("历史对话：3 条 mock session，点击加载为 2 条消息"))
    parts.append(bullet("我的任务：xiaoyuTasks 空态「暂无任务」"))
    parts.append(bullet("返回首页 → closeSubPage"))

    parts.append(h3("13.8 附件面板"))
    parts.append(p("网格：拍照、照片、本地文件、园区文档、语音输入、常用语。"))
    parts.append(p("列表：联网搜索（自动）、插件、清空对话。"))
    parts.append(p("原型占位：除清空对话外均 Toast「{功能} 功能开发中」。"))

    parts.append(h3("13.9 智能体详情 Modal"))
    parts.append(p("版本、状态、Tag、简介、任务能力、即时对话次数 →「知道了」。"))

    parts.append(h3("13.10 反馈 Modal"))
    parts.append(p("1–10 星评分 + 建议文本（500 字）；提交需先评分 → Toast「感谢您的反馈」。"))

    parts.append(h3("13.11 小禹消息通知"))
    parts.append(p("三类：异常提醒、消息提醒、事件提醒（XIAOYU_NOTIFY_DATA）。"))
    parts.append(p("Tab：全部/未读/已读；事件类型额外：全部已读、全部删除。"))
    parts.append(p("卡片：标题、类型、优先级、发送者、时间、已读/未读；分页 UI 占位。"))

    parts.append(h3("13.12 小禹个人中心"))
    parts.append(p("账号信息 XIAOYU_ACCOUNT：昵称（可复制 Toast）、账号、用户ID、部门、角色、最近登录 IP/时间。"))
    parts.append(p("与主应用 MOCK.userProfile 分离。"))
    parts.append(p("保存资料 Toast；退出登录同全局 logout。"))

    parts.append(h2("14. 核心用户流程"))
    parts.append(h3("14.1 首次使用流程"))
    parts.append(p("打开应用 → 登录（账号/手机）→ 选项目 → 进入首页 → 浏览 KPI/模块入口。"))

    parts.append(h3("14.2 工单查询流程"))
    parts.append(p("首页物业管理 → 报修/维保/巡检 → 工单列表（分类+状态筛选）→ 点击卡片 Toast 详情占位。"))
    parts.append(p("或：协作/首页 → 我的工单 → 我发起/待办/已办 Tab + 筛选 → 卡片列表。"))

    parts.append(h3("14.3 数据查看流程"))
    parts.append(p("首页模块入口 → 对应数据总览子页（能源/资产/智慧卡/食堂运营/食堂监管）。"))
    parts.append(p("或：数据 Tab → 内嵌 Dashboard 纵览各模块图表。"))

    parts.append(h3("14.4 小禹问答流程"))
    parts.append(p("首页 FAB → 选智能体或快捷 Chip → 对话 → 可切换智能体/新建对话/查看历史/反馈。"))

    parts.append(h3("14.5 项目切换流程"))
    parts.append(p("首页 Header 项目名 → Picker 选择 → 全页数据刷新。"))

    parts.append(h2("15. 附录 — 应用状态变量（state）"))
    parts.append(table(
        ["变量", "用途"],
        [
            ["authPhase", "login / selectProject / app"],
            ["loginMode", "account / phone"],
            ["currentTab", "home / collab / data / mine"],
            ["currentSubPage", "当前子页 ID，null 表示 Tab 页"],
            ["currentProject", "当前选中项目对象"],
            ["carouselIndex", "轮播当前索引"],
            ["canteenTab", "dashboard / menu"],
            ["assetTypeTab", "space / equipment"],
            ["gwInboundMetric", "count / quantity / assetValue（公物仓入库指标 Tab）"],
            ["gwOutboundMetric", "count / quantity / savedFunds（公物仓出库指标 Tab）"],
            ["energyTab / dataEnergyTypeTab", "electric / water"],
            ["energyTimeFilter", "today / month / year"],
            ["smartCardPeriod", "today / week / month / year"],
            ["smartCardTrendType", "people / amount"],
            ["workOrderMainTab", "initiated / todo / done"],
            ["workOrderListCategory", "repair / maintain / inspect / safety / construction / rectify"],
            ["xiaoyuPhase", "agents / chat / notifications / profile"],
            ["xiaoyuActiveAgentId", "park / repair / workorder"],
            ["xiaoyuMessages", "当前对话消息数组 {role, content}"],
        ]
    ))

    parts.append(h2("16. 附录 — 各项目 KPI 数据"))
    parts.append(table(
        ["项目", "建筑面积", "设备总数", "待处理工单", "今日用电", "今日就餐"],
        [
            ["延安东路300号", "12.6万㎡", "1286", "8", "246 Kwh", "386人"],
            ["重庆南路100号", "9.8万㎡", "956", "6", "198 Kwh", "320人"],
            ["重庆南路139号", "7.5万㎡", "742", "5", "156 Kwh", "256人"],
            ["河南南路288号", "11.2万㎡", "1105", "7", "220 Kwh", "410人"],
        ]
    ))

    parts.append(h2("17. 附录 — 资产与能源数据结构"))
    parts.append(h3("17.1 空间类型（assetSpaceTypes）"))
    parts.append(p("办公空间(1200)、公共空间(980)、设备空间(850)、研发生产(720)、弱电系统(480)。"))
    parts.append(h3("17.2 设备类型（assetEquipmentTypes）"))
    parts.append(p("办公空间风处理系统、电系统、弱电系统、消防设施、水处理系统、仪表阀门类、建筑构件、动力系统等 8 类。"))
    parts.append(h3("17.3 用电类型（energyTypes）"))
    parts.append(p("办公用电、空调用电、车间用电、泵房用电、冰箱间用电、餐厅用电，含用量与占比。"))
    parts.append(h3("17.4 用水类型（waterTypes）"))
    parts.append(p("生活用水、绿化用水、消防用水，含用量与占比。"))
    parts.append(h3("17.5 公物仓（PUBLIC_WAREHOUSE_DATA）"))
    parts.append(p("数据源：dp/js/public-warehouse-data.js，与中台 MIDDLE_PLATFORM_DATA.publicWarehouse、大屏右栏公物仓图表共用。"))
    parts.append(p("双仓定义："))
    parts.append(table(
        ["ID", "简称", "全称", "颜色"],
        [
            ["w1", "黄浦仓", "黄浦仓（国货路371号）", "#1890ff"],
            ["w2", "闵行仓", "闵行仓（立跃路1758号）", "#69c0ff"],
        ]
    ))
    parts.append(p("库存物资数（本季度）："))
    parts.append(table(
        ["指标", "合计", "黄浦仓", "闵行仓", "备注"],
        [
            ["在仓物资", "822 件", "484", "338", "currentStock"],
            ["累计存放", "1320 件", "758", "562", "环比 ↑5.6%"],
        ]
    ))
    parts.append(p("入库本季度 KPI（currentQuarter）："))
    parts.append(table(
        ["指标", "合计", "黄浦", "闵行", "环比", "趋势"],
        [
            ["入库次数", "86 次", "52", "34", "8.2%", "up"],
            ["入库物资数量", "423 件", "256", "167", "6.5%", "up"],
            ["入库固定资产价值", "573 万元", "348", "225", "3.1%", "down"],
        ]
    ))
    parts.append(p("出库本季度 KPI："))
    parts.append(table(
        ["指标", "合计", "黄浦", "闵行", "环比", "趋势"],
        [
            ["出库次数", "79 次", "48", "31", "4.0%", "up"],
            ["出库物资数量", "423 件", "257", "166", "5.8%", "up"],
            ["节约资金", "128 万元", "78", "50", "12.3%", "up"],
        ]
    ))
    parts.append(p("周转率公式（出库历史，仅 count 指标）：出库次数 ÷ ((年初在库 + 年末在库) / 2)，数据来自 yearlyInventory。"))
    parts.append(p("交互：App.setGwInboundMetric(key) / App.setGwOutboundMetric(key) 切换指标 Tab 后 re-render。"))
    parts.append(p("渲染函数：renderPublicWarehouseSection() → renderWarehouseStockPieSection() + renderWarehouseStackedBar() + renderGwMetricTabs() + renderGwFlowKpi() + renderGwHistoryTable()。"))
    parts.append(h3("17.6 办公用房（officeSpace）"))
    parts.append(p("楼栋总数 4 个、房间总数 1373 间、楼层数量 51 个、建筑面积 74620.44㎡、总使用面积 52739.42㎡。"))

    parts.append(h2("18. 附录 — 小禹回复关键词路由"))
    parts.append(h3("18.1 智慧问答（park）"))
    parts.append(table(
        ["关键词", "回复内容"],
        [
            ["工单/报修/维保/巡检/派单/关单", "引导切换「智能工单」"],
            ["数据/统计/总览/报表/能耗/资产/趋势", "引导切换「智能报表」"],
            ["介绍/概况/基本/地址/位置/园区", "园区基本情况（项目名+建筑面积+设备+成员+服务）"],
            ["食堂/菜单/菜谱/吃饭/餐饮/预定", "今日食堂推荐+预定数据"],
            ["公告/通知/消息", "最新公告内容"],
            ["设施/服务/通行/停车/办公/物业/访客/门禁", "基础服务清单"],
            ["默认", "智慧问答能力说明"],
        ]
    ))
    parts.append(h3("18.2 智能工单（repair）"))
    parts.append(table(
        ["关键词", "回复内容"],
        [
            ["数据/统计/报表/能耗/资产/趋势", "引导切换「智能报表」"],
            ["食堂/菜单/公告/园区介绍/设施", "引导切换「智慧问答」"],
            ["我的/我发起/我提交", "myWorkOrders 进行中工单列表"],
            ["报修", "workOrderList 报修类工单"],
            ["维保/巡检", "维保与巡检工单"],
            ["进度/状态/待处理/列表/系统", "系统工单统计+待处理明细"],
            ["工单", "工单概览+最近更新"],
            ["默认", "智能工单能力说明"],
        ]
    ))
    parts.append(h3("18.3 智能报表（workorder）"))
    parts.append(table(
        ["关键词", "回复内容"],
        [
            ["进度/派单/我的工单（非统计语境）", "引导切换「智能工单」"],
            ["食堂有什么/菜单/公告/设施", "引导切换「智慧问答」"],
            ["能耗/用电/用水/能源", "能源数据汇总"],
            ["资产/设备/空间/面积", "资产数据汇总"],
            ["食堂/就餐/采购", "食堂运营数据"],
            ["物业/工单", "物业运营汇总+完成率"],
            ["趋势/变化/近期", "工单趋势+各模块 dataSummary"],
            ["数据/统计/总览/报表/解读/汇总", "数据总览"],
            ["默认", "智能报表能力说明"],
        ]
    ))

    parts.append(h2("19. 附录 — 小禹快捷提问配置"))
    parts.append(h3("19.1 首页全局快捷 Chip"))
    parts.append(table(
        ["按钮文案", "提问内容", "目标智能体"],
        [
            ["园区基本情况", "介绍一下当前园区的基本情况", "park"],
            ["待处理工单", "系统里有哪些待处理的工单？", "repair"],
            ["数据总览解读", "帮我解读一下园区数据总览", "workorder"],
            ["园区最新公告", "最近有什么园区公告？", "park"],
        ]
    ))
    parts.append(h3("19.2 各智能体对话空态快捷 Chip"))
    parts.append(p("智慧问答：园区介绍、今日食堂、最新公告、园区服务。"))
    parts.append(p("智能工单：待处理工单、我的工单、报修工单、维保巡检。"))
    parts.append(p("智能报表：数据总览、今日能耗、资产统计、运营趋势。"))

    parts.append(h2("20. 附录 — 物业完成率与营销数据"))
    parts.append(p("propertyCompletionRates：报修完成率 86.4%、巡检完成率 98.3%、维保完成率 72.8%。"))
    parts.append(p("weeklyMarketing（周一至周五）：充值人数、刷卡人数、消费金额三组数据，用于数据 Tab 及食堂看板折线图。"))

    parts.append(h2("21. 附录 — 用户 Profile 数据"))
    parts.append(table(
        ["字段", "主应用 userProfile", "小禹 XIAOYU_ACCOUNT"],
        [
            ["姓名/昵称", "张明", "15552872859"],
            ["手机", "138****8888", "15552872859"],
            ["部门", "园区运营部", "未填写"],
            ["角色", "运营管理员", "小程序管理员"],
            ["工号", "EMP2024001", "—"],
            ["用户ID", "—", "1981632619449364481"],
        ]
    ))

    parts.append(h2("22. 原型局限与待完善项"))
    parts.append(table(
        ["项", "说明"],
        [
            ["无后端 API", "全部为 Mock 数据，刷新重置"],
            ["无工单/消息详情页", "点击多为 Toast 占位"],
            ["todo 子页", "已实现无入口"],
            ["canteenData", "仅侧边栏原型入口"],
            ["小禹附件/语音等", "功能开发中占位"],
            ["密码/登录", "无真实校验"],
            ["能源时间筛选", "部分数值未联动项目数据"],
            ["公物仓数据", "与中台共享，不随项目切换变化（原型阶段）"],
            ["公物仓入库/出库趋势图", "小程序与中台均无；仅 KPI + 历史表。库存区块保留累计历史表与分仓 pie"],
            ["MOCK 未展示", "spaceRanking、propertyChart 未渲染"],
        ]
    ))

    parts.append(h2("23. 附录 — 子页面 ID 与标题对照"))
    parts.append(table(
        ["子页 ID", "Nav 标题", "主要入口"],
        [
            ["notifications", "消息通知", "首页铃铛"],
            ["workorder", "协作", "首页/协作-我的工单"],
            ["workOrderList", "工单列表", "首页物业-报修/维保/巡检"],
            ["messages", "消息", "协作-我的消息"],
            ["contacts", "通讯录", "我的-通讯录"],
            ["profile", "编辑资料", "我的-编辑资料"],
            ["changePassword", "修改密码", "我的-修改密码"],
            ["energyData", "数据总览", "首页能源"],
            ["assetData", "数据总览", "首页资产"],
            ["smartCardData", "智慧卡数据总览", "首页-智慧卡"],
            ["canteenOpsData", "食堂运营数据总览", "首页-食堂运营"],
            ["canteenSupervisionData", "食堂监管数据总览", "首页-食堂监管"],
            ["canteenData", "数据总览", "原型侧边栏"],
            ["xiaoyu", "小禹", "首页 FAB"],
            ["forgotPassword", "忘记密码", "登录页"],
            ["register", "注册", "登录页"],
            ["todo", "协作", "无入口"],
        ]
    ))

    parts.append(p("— 文档结束 —"))
    return "".join(parts)


DOCUMENT_XML = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="{WNS}" xmlns:r="{RNS}">
  <w:body>
    {build_body()}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
    </w:sectPr>
  </w:body>
</w:document>"""

STYLES_XML = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="{WNS}">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:uiPriority w:val="9"/>
    <w:qFormat/>
    <w:pPr><w:keepNext/><w:spacing w:before="480" w:after="120"/></w:pPr>
    <w:rPr><w:b/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:uiPriority w:val="9"/>
    <w:qFormat/>
    <w:pPr><w:keepNext/><w:spacing w:before="360" w:after="80"/></w:pPr>
    <w:rPr><w:b/><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading3">
    <w:name w:val="heading 3"/>
    <w:basedOn w:val="Normal"/>
    <w:qFormat/>
    <w:pPr><w:keepNext/><w:spacing w:before="240" w:after="60"/></w:pPr>
    <w:rPr><w:b/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph">
    <w:name w:val="List Paragraph"/>
    <w:basedOn w:val="Normal"/>
    <w:pPr><w:ind w:left="720"/></w:pPr>
  </w:style>
</w:styles>"""

NUMBERING_XML = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="{WNS}">
  <w:abstractNum w:abstractNumId="0">
    <w:multiLevelType w:val="hybridMultilevel"/>
    <w:lvl w:ilvl="0">
      <w:start w:val="1"/>
      <w:numFmt w:val="bullet"/>
      <w:lvlText w:val="•"/>
      <w:lvlJc w:val="left"/>
      <w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr>
    </w:lvl>
  </w:abstractNum>
  <w:num w:numId="1">
    <w:abstractNumId w:val="0"/>
  </w:num>
</w:numbering>"""

CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
</Types>"""

RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""

DOC_RELS = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>"""


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", CONTENT_TYPES)
        z.writestr("_rels/.rels", RELS)
        z.writestr("word/document.xml", DOCUMENT_XML.encode("utf-8"))
        z.writestr("word/_rels/document.xml.rels", DOC_RELS)
        z.writestr("word/styles.xml", STYLES_XML)
        z.writestr("word/numbering.xml", NUMBERING_XML)
    print(f"Generated: {OUT}")


if __name__ == "__main__":
    main()
