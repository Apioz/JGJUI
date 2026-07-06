# -*- coding: utf-8 -*-
"""Generate 办公用房 & 公物仓 PRD as .docx (stdlib only)."""
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parent / "办公用房与公物仓PRD.docx"
WNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"


def p(text, style=None):
    text = escape(text)
    if style:
        return f'<w:p><w:pPr><w:pStyle w:val="{style}"/></w:pPr><w:r><w:t xml:space="preserve">{text}</w:t></w:r></w:p>'
    return f'<w:p><w:r><w:t xml:space="preserve">{text}</w:t></w:r></w:p>'


def h1(t): return p(t, "Heading1")
def h2(t): return p(t, "Heading2")
def h3(t): return p(t, "Heading3")


def bullet(text):
    text = escape(text)
    return (
        f'<w:p><w:pPr><w:pStyle w:val="ListParagraph"/><w:numPr>'
        f'<w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr>'
        f'<w:r><w:t xml:space="preserve">{text}</w:t></w:r></w:p>'
    )


def table(headers, rows):
    grid = "".join('<w:gridCol w:w="2400"/>' for _ in headers)

    def cell(txt, bold=False):
        txt = escape(str(txt))
        rpr = "<w:rPr><w:b/></w:rPr>" if bold else ""
        return (
            f'<w:tc><w:tcPr><w:tcW w:w="2400" w:type="dxa"/></w:tcPr>'
            f'<w:p><w:r>{rpr}<w:t xml:space="preserve">{txt}</w:t></w:r></w:p></w:tc>'
        )

    trs = ["<w:tr>" + "".join(cell(h, True) for h in headers) + "</w:tr>"]
    trs += ["<w:tr>" + "".join(cell(c) for c in row) + "</w:tr>" for row in rows]
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

    parts.append(h1("智慧园区数字化管理平台 — 办公用房与公物仓产品需求说明（PRD）"))
    parts.append(p("文档版本：V1.0"))
    parts.append(p("编写依据：dp/ 大屏与中台源码、prototype/ 小程序源码"))
    parts.append(p("涉及系统：大屏（dp/index.html）、中台（dp/middle-platform.html）、小程序（prototype/）"))
    parts.append(p("说明：本文档严格依据当前代码实现梳理；未实现或数据不一致处已标注。"))

    # ---- 1 Overview ----
    parts.append(h2("1. 文档概述"))
    parts.append(h3("1.1 模块范围"))
    parts.append(p("办公用房与公物仓是「资产管理」模块下的两个子域："))
    parts.append(bullet("办公用房：统计园区/机关单位办公空间的使用面积、占比、单位分布及变更历史"))
    parts.append(bullet("公物仓：管理黄浦仓、闵行仓两仓的在库物资、累计存放、入库、出库及周转率"))
    parts.append(h3("1.2 涉及文件"))
    parts.append(table(
        ["系统", "主要文件"],
        [
            ["大屏", "dp/index.html、dp/js/dashboard.js、dp/js/data.js、dp/js/warehouse-charts.js"],
            ["中台", "dp/middle-platform.html、dp/js/middle-platform.js、dp/js/middle-platform-data.js、dp/js/warehouse-charts.js"],
            ["小程序", "prototype/js/app.js、prototype/css/auth.css"],
            ["底座（间接）", "dp/js/foundation-platform-data.js — 办公点/仓库主数据配置，非统计展示"],
        ]
    ))
    parts.append(h3("1.3 仓库定义（公物仓统一口径）"))
    parts.append(table(
        ["ID", "简称", "全称", "颜色"],
        [
            ["w1", "黄浦仓", "黄浦仓（国货路371号）", "#1890ff"],
            ["w2", "闵行仓", "闵行仓（立跃路1758号）", "#69c0ff"],
        ]
    ))
    parts.append(p("大屏与中台、小程序分仓 pie 均使用上述两仓；小程序公物仓详情区块另有三仓 Mock（中仓/外仓/近仓），与大屏/中台不一致。"))

    # ---- 2 Dashboard office ----
    parts.append(h2("2. 大屏 — 办公用房"))
    parts.append(h3("2.1 入口与位置"))
    parts.append(p("顶栏 Tab「资产管理」（activeTab === '资产管理'）。"))
    parts.append(p("办公用房在大屏中不作为独立页面，而是通过右侧面板第三块在特定视图模式下展示。"))
    parts.append(h3("2.2 中心区 KPI（含办公相关）"))
    parts.append(p("assetKpiData（dp/js/data.js）四张 KPI 卡片："))
    parts.append(table(
        ["指标", "示例值", "单位"],
        [
            ["总建筑面积", "741,213", "㎡"],
            ["总使用面积", "1,213", "㎡"],
            ["空间总数", "3,021", "个"],
            ["设备总数", "3,021", "个"],
        ]
    ))
    parts.append(p("进入园区模式（moduleParkKpi.资产管理）时，KPI 切换为当前项目的建筑面积、总使用面积、空间总数、设备总数。"))
    parts.append(h3("2.3 第三面板：办公用房总使用面积占比"))
    parts.append(h3("2.3.1 显示条件（isAssetParkScope）"))
    parts.append(p("computed isAssetParkScope 为 true 时，第三面板标题为「办公用房总使用面积占比」，渲染 Donut 饼图；否则为「累计存放历史变化趋势」折线图。"))
    parts.append(p("isAssetParkScope 为 true 的条件（dashboard.js）："))
    parts.append(bullet("当前 Tab 为「资产管理」"))
    parts.append(bullet("且满足以下之一：模块视图处于园区模式（isModuleParkMode）；或地图模式且已打开项目弹窗（isModuleMapMode && mapPopupProjectId）"))
    parts.append(h3("2.3.2 交互"))
    parts.append(bullet("地图模式点击左侧项目 → 打开地图弹窗 → 第三面板变为办公面积占比"))
    parts.append(bullet("弹窗内「进入园区」→ enterPark() → 园区模式，第三面板保持办公面积占比"))
    parts.append(bullet("园区模式下切换 activeModuleProjectId → 饼图数据随项目变化"))
    parts.append(bullet("park scope 下隐藏「按季度/按年度」切换（v-if=\"!isAssetParkScope\"）"))
    parts.append(h3("2.3.3 图表逻辑"))
    parts.append(p("函数 getActiveOfficeAreaChart()："))
    parts.append(bullet("园区模式：DASHBOARD_DATA.parkOfficeAreaChart.byProject[activeModuleProjectId]"))
    parts.append(bullet("地图弹窗：byProject[resolveProjectRootId(mapPopupProjectId)]"))
    parts.append(bullet("无匹配时：parkOfficeAreaChart.default"))
    parts.append(p("buildOfficeAreaPieOption：Donut 图，中心显示「总面积 XXX㎡」，图例为各单位占比 %。"))
    parts.append(h3("2.4 各项目办公面积数据（parkOfficeAreaChart.byProject）"))
    parts.append(table(
        ["项目 ID", "项目名", "总面积(㎡)", "占比项"],
        [
            ["p1", "延安东路300号", "1213", "区级统筹58%、机管局2%、区建设管理委2%、其他38%"],
            ["p2", "重庆南路100号", "980", "区级统筹52%、机管局3%、区建设管理委4%、其他41%"],
            ["p3", "重庆南路139号", "856", "区级统筹48%、机管局5%、区建设管理委3%、其他44%"],
            ["p4", "河南南路288号", "742", "区级统筹45%、机管局6%、区建设管理委4%、其他45%"],
        ]
    ))
    parts.append(h3("2.5 大屏办公用房缺失能力（相对中台）"))
    parts.append(bullet("无单位列表、变更明细、日期筛选"))
    parts.append(bullet("无 stacked bar 下钻（点击「其他」展开）"))
    parts.append(bullet("无楼栋/房间/楼层明细表格"))

    # ---- 3 Dashboard warehouse ----
    parts.append(h2("3. 大屏 — 公物仓"))
    parts.append(h3("3.1 右侧面板布局（资产管理 Tab 固定）"))
    parts.append(table(
        ["面板", "标题", "Chart ID", "内容"],
        [
            ["第一块", "按资产类型统计", "#assetTypeChart", "空间/设备 Donut（与公物仓无关）"],
            ["第二块", "本季在仓物资分仓占比（固定）", "#gwStockPieChart", "黄浦/闵行 pie，始终显示"],
            ["第三块", "动态", "#gwCumulativeTrendChart", "park scope→办公面积 pie；否则→累计存放趋势"],
        ]
    ))
    parts.append(h3("3.2 第二面板：本季在仓物资分仓占比"))
    parts.append(p("数据源：MIDDLE_PLATFORM_DATA.publicWarehouse.currentStock（dashboard.js 引用 middle-platform-data.js）。"))
    parts.append(table(
        ["字段", "值", "说明"],
        [
            ["total", "822", "本季在仓合计（件）"],
            ["w1", "484", "黄浦仓"],
            ["w2", "338", "闵行仓"],
            ["freq", "本季度", "频率标签"],
        ]
    ))
    parts.append(p("buildGwStockPieOption：Donut 中心「本季总数 822」，tooltip 显示件数与百分比。"))
    parts.append(p("updateAssetSecondPanelChart() 在 initAssetCharts 及 Tab 切换时始终刷新，不受 park scope 影响。"))
    parts.append(h3("3.3 第三面板：累计存放历史变化趋势（非 park scope）"))
    parts.append(p("数据源：publicWarehouse.cumulative.quarterlyTrend 或 yearlyTrend。"))
    parts.append(p("交互：按季度 / 按年度 Toggle（switchGwCumulativeMode）；park scope 时该切换不可用且函数直接 return。"))
    parts.append(p("年度模式：取 yearlyTrend 最近 3 年标签与数据；季度模式：使用 quarterlyTrend 全量（当前仅 2026 Q1）。"))
    parts.append(p("buildGwCumulativeTrendOption / buildGwDualWarehouseTrendOption：双仓折线（黄浦/闵行）。"))
    parts.append(h3("3.4 累计存放当前季度 KPI"))
    parts.append(table(
        ["指标", "合计", "黄浦仓", "闵行仓", "环比"],
        [
            ["截至目前存放物资数量", "1320", "758", "562", "↑ 5.6%"],
        ]
    ))
    parts.append(h3("3.5 大屏公物仓缺失能力（相对中台）"))
    parts.append(bullet("无入库/出库模块"))
    parts.append(bullet("无周转率计算与展示"))
    parts.append(bullet("无累计存放历史列表及年/季筛选"))
    parts.append(bullet("无 metric tabs（入库次数/数量/价值等）"))

    # ---- 4 MP office ----
    parts.append(h2("4. 中台 — 办公用房"))
    parts.append(h3("4.1 入口与导航"))
    parts.append(p("侧边栏：资产管理 → 办公用房（menuItems id=asset-office, path=office）。"))
    parts.append(p("navigateToView('office') → currentView='office' → showOffice=true → initOfficeCharts()。"))
    parts.append(h3("4.2 顶部统计卡片（summaryCards）"))
    parts.append(table(
        ["标签", "值", "单位", "图标"],
        [
            ["楼栋数量", "51", "个", "building"],
            ["总使用面积", "579.42", "m²", "area"],
            ["总建筑面积", "5279.42", "m²", "building"],
            ["房间数", "746", "个", "room"],
        ]
    ))
    parts.append(h3("4.3 办公用房使用面积占比图"))
    parts.append(p("Chart：#mpAreaStack，水平 stacked bar（buildAreaStackOption）。"))
    parts.append(h3("4.3.1 两级下钻"))
    parts.append(p("Level 1（summary）：top3 单位 + 「其他」汇总条（otherTotal=38%）。"))
    parts.append(table(
        ["单位", "占比%"],
        [
            ["区级统筹", "58"],
            ["机管局", "2"],
            ["区建设管理委", "2"],
            ["其他（汇总）", "38"],
        ]
    ))
    parts.append(p("Level 2（detail）：点击 bar 中「其他」段 → areaChartLevel='detail' → 展开 otherUnits 共 19 个单位明细。"))
    parts.append(p("detail 模式显示「返回上一层」按钮 → backAreaChart() → 回到 summary。"))
    parts.append(p("ECharts click 事件：仅 summary 层级且 seriesName==='其他' 时触发下钻。"))
    parts.append(h3("4.4 单位列表"))
    parts.append(p("表格列：单位名称、位置、面积(m²)、占比(%)、变更明细。"))
    parts.append(p("unitList 共 11 条单位记录，示例："))
    parts.append(table(
        ["单位名称", "位置", "面积", "占比%"],
        [
            ["区建设管理委", "1号楼 3层", "1337.11", "2.54"],
            ["区商务委", "1号楼 5层", "967.33", "1.84"],
            ["人武部", "2号楼 2层", "602.95", "1.15"],
            ["区金融办", "2号楼 4层", "626.7", "1.19"],
            ["区人社局", "3号楼 1层", "200.03", "0.38"],
            ["区机关党工委", "3号楼 3层", "181.11", "0.35"],
            ["区退役军人局", "3号楼 5层", "241.56", "0.46"],
            ["保密办", "4号楼 2层", "40.8", "0.08"],
            ["区人武部", "4号楼 4层", "34", "0.07"],
            ["人大领导", "5号楼 1层", "40", "0.08"],
            ["审改办", "5号楼 3层", "9.9", "0.02"],
        ]
    ))
    parts.append(h3("4.5 单位列表 — 日期筛选"))
    parts.append(p("筛选控件：开始日期、结束日期（type=date），重置按钮。"))
    parts.append(p("filteredUnitList 逻辑："))
    parts.append(bullet("对每个 unit.changes 按日期范围过滤得 visibleChanges"))
    parts.append(bullet("若设置了日期范围，仅展示 visibleChanges.length > 0 的单位"))
    parts.append(bullet("提示文案：「已筛选 N 个在指定时段内有变更的单位」"))
    parts.append(bullet("空态：「该时段内暂无单位变更记录」"))
    parts.append(h3("4.6 变更明细弹窗"))
    parts.append(p("触发：单位列表点击「查看」按钮（visibleChanges 非空时）。"))
    parts.append(p("弹窗内容："))
    parts.append(bullet("头部：单位名称"))
    parts.append(bullet("摘要：当前面积、当前占比、变更次数"))
    parts.append(bullet("时间线：每条变更含日期、使用面积、面积占比、较上次 delta（areaDelta/proportionDelta）"))
    parts.append(bullet("最新一条标记「最新」；其余显示「较上次变更」"))
    parts.append(bullet("delta 样式：is-up / is-down / is-flat（持平）"))
    parts.append(p("enrichUnitChanges：按日期降序排序，计算相邻记录的面积/占比差值。"))
    parts.append(p("若列表有日期筛选，弹窗仅展示筛选时段内的变更，并提示「当前展示筛选时段内的 N 条变更记录」。"))

    # ---- 5 MP warehouse ----
    parts.append(h2("5. 中台 — 公物仓"))
    parts.append(h3("5.1 入口与导航"))
    parts.append(p("侧边栏：资产管理 → 公物仓（path=warehouse）。"))
    parts.append(p("navigateToView('warehouse') → initWarehouseCharts()：初始化 gwStockPie、gwCumulativeTrend、gwInboundTrend、gwOutboundTrend。"))
    parts.append(h3("5.2 页面结构（三大区块）"))
    parts.append(bullet("A. 库存物资数"))
    parts.append(bullet("B. 入库"))
    parts.append(bullet("C. 出库"))

    parts.append(h3("5.3 区块 A — 库存物资数"))
    parts.append(h3("5.3.1 在仓物资 KPI"))
    parts.append(p("本季度在仓：合计 822 件；黄浦仓 484（占比 gwStockRatio）；闵行仓 338。"))
    parts.append(h3("5.3.2 截至目前存放（本季度）"))
    parts.append(p("cumulative.currentQuarter：合计 1320，黄浦 758，闵行 562，环比 ↑ 5.6%。"))
    parts.append(h3("5.3.3 图表"))
    parts.append(bullet("本季在仓物资分仓占比（#gwStockPie）— buildGwStockPieOption"))
    parts.append(bullet("累计存放历史变化趋势（#gwCumulativeTrend）— 按季度/按年度 Toggle"))
    parts.append(h3("5.3.4 累计存放历史列表"))
    parts.append(p("表格列：周期、合计、黄浦仓、闵行仓、环比变化%。"))
    parts.append(p("筛选：按季度/按年度模式 + 年份 select + 季度 select（季度模式）。"))
    parts.append(p("gwCumulativeHistory computed 逻辑："))
    parts.append(bullet("年度模式：由 yearlyTrend.labels 构建，环比 = (本期-上期)/上期*100"))
    parts.append(bullet("季度模式：historyList 过滤 period 年份 >= quarterlyStartYear(2026)"))
    parts.append(bullet("可按 gwCumulativeHistoryYear、gwCumulativeHistoryQuarter 进一步筛选"))
    parts.append(p("年度趋势数据（yearlyTrend）：2022–2026 年 total 3200→5280。"))

    parts.append(h3("5.4 区块 B — 入库"))
    parts.append(h3("5.4.1 指标 Tab"))
    parts.append(table(
        ["key", "标签", "单位"],
        [
            ["count", "入库次数", "次"],
            ["quantity", "入库物资数量", "件"],
            ["assetValue", "入库固定资产价值", "万元"],
        ]
    ))
    parts.append(h3("5.4.2 本季度 KPI（currentQuarter）"))
    parts.append(table(
        ["指标", "合计", "黄浦", "闵行", "环比", "趋势"],
        [
            ["入库次数", "86", "52", "34", "8.2%", "up"],
            ["入库物资数量", "423", "256", "167", "6.5%", "up"],
            ["入库固定资产价值", "573", "348", "225", "3.1%", "down"],
        ]
    ))
    parts.append(h3("5.4.3 入库趋势图"))
    parts.append(p("Chart #gwInboundTrend；Toggle 按季度/按年度。"))
    parts.append(p("getGwFlowTrendData：年度模式取 yearlyTotal 最近 3 年；季度模式取 currentYearQuarterly（2026 Q1–Q4）。"))
    parts.append(p("双仓折线：buildGwDualWarehouseTrendOption。"))
    parts.append(h3("5.4.4 入库历史表"))
    parts.append(p("列：年份、合计、黄浦仓、闵行仓、环比。"))
    parts.append(p("数据：buildGwYearlyFlowHistory(inbound, metricKey) — 由 yearlyTotal 按年构建，倒序展示。"))

    parts.append(h3("5.5 区块 C — 出库"))
    parts.append(h3("5.5.1 指标 Tab"))
    parts.append(table(
        ["key", "标签", "单位"],
        [
            ["count", "出库次数", "次"],
            ["quantity", "出库物资数量", "件"],
            ["savedFunds", "节约资金", "万元"],
        ]
    ))
    parts.append(h3("5.5.2 本季度 KPI"))
    parts.append(table(
        ["指标", "合计", "黄浦", "闵行", "环比", "趋势"],
        [
            ["出库次数", "79", "48", "31", "4.0%", "up"],
            ["出库物资数量", "423", "257", "166", "5.8%", "up"],
            ["节约资金", "128", "78", "50", "12.3%", "up"],
        ]
    ))
    parts.append(h3("5.5.3 出库历史表 — 周转率"))
    parts.append(p("出库历史表在入库历史基础上增加「周转率」列。"))
    parts.append(p("公式（middle-platform.js calcGwTurnoverRate）："))
    parts.append(p("周转率 = 出库次数 ÷ ((年初在库数 + 年末在库数) / 2)"))
    parts.append(p("年初/年末在库数 = yearlyInventory 中 w1Begin+w2Begin / w1End+w2End 按年汇总。"))
    parts.append(p("enrichGwOutboundHistoryWithTurnover 仅对出库历史、metric=count 时 enrich；其他 metric 周转率列为 null 显示「—」。"))
    parts.append(p("yearlyInventory 数据年份：2022–2025。"))
    parts.append(h3("5.5.4 出库趋势与历史"))
    parts.append(p("结构与入库对称：#gwOutboundTrend + 出库历史表（含周转率 + 环比）。"))

    parts.append(h3("5.6 公物仓通用交互与格式化"))
    parts.append(bullet("gwStockRatio(wid)：单仓占 currentStock.total 百分比"))
    parts.append(bullet("gwCumulativeRatio(wid)：单仓占 cumulative.currentQuarter.total 百分比"))
    parts.append(bullet("formatGwChange：↑/↓ + change%（trend up/down）"))
    parts.append(bullet("switchGwCumulativeMode / switchGwInboundTrendMode / switchGwOutboundTrendMode：切换后 reset 筛选并 refresh 图表"))
    parts.append(bullet("switchGwInboundMetric / switchGwOutboundMetric：切换 metric 后 refresh 趋势图"))

    # ---- 6 Mini program ----
    parts.append(h2("6. 小程序 — 办公用房与公物仓（简要）"))
    parts.append(h3("6.1 入口"))
    parts.append(table(
        ["入口", "跳转"],
        [
            ["首页 → 资产管理 → 公物仓", "goToAssetSection('asset-warehouse') → assetData 子页滚动至公物仓区"],
            ["首页 → 资产管理 → 空间/设备", "goToAssetSection → asset-data-type-section"],
            ["首页 → 资产管理 → 查看更多", "openAssetData('space')"],
            ["数据 Tab → 办公用房/公物仓 card", "内嵌 renderOfficeSpaceSection / renderPublicWarehouseSection"],
            ["资产数据子页 assetData", "独立 card：分仓 pie、办公用房、公物仓"],
        ]
    ))
    parts.append(h3("6.2 办公用房（MOCK.officeSpace）"))
    parts.append(table(
        ["标签", "值", "单位"],
        [
            ["楼栋总数", "4", "个"],
            ["房间总数", "1373", "间"],
            ["楼层数量", "51", "个"],
            ["建筑面积", "74620.44", "㎡"],
            ["总使用面积", "52739.42", "㎡"],
        ]
    ))
    parts.append(p("renderOfficeSpaceSection：5 项横向卡片，无占比图、无单位列表。"))
    parts.append(h3("6.3 公物仓（MOCK.publicWarehouse + warehouseStock）"))
    parts.append(p("汇总 KPI：物品总数 822、入仓 249、出仓 573、暂存 0。"))
    parts.append(p("三仓堆叠条（与大屏两仓不同）：中仓（莲岸家园）184、外仓（尚海湾）226、近仓（1号楼B2）163。"))
    parts.append(p("分类 donut：会务用品 28%、办公家具 65%、装饰品 8%。"))
    parts.append(p("本季分仓 pie（warehouseStock）：黄浦仓 484、闵行仓 338，与大屏/中台一致。"))
    parts.append(h3("6.4 小程序缺失能力"))
    parts.append(bullet("无入库/出库/周转率/累计存放历史"))
    parts.append(bullet("无办公用房使用面积占比图、单位列表、变更明细"))
    parts.append(bullet("公物仓三仓命名与数量与大屏/中台不一致"))

    # ---- 7 Cross system ----
    parts.append(h2("7. 跨系统能力对照"))
    parts.append(table(
        ["能力", "大屏", "中台", "小程序"],
        [
            ["本季在仓分仓占比", "✅ 右栏 panel2", "✅ 公物仓 section", "✅ pie + 公物仓区块"],
            ["累计存放历史趋势", "✅ 右栏 panel3（非 park）", "✅ 趋势+列表+筛选", "❌"],
            ["办公用房总面积占比", "✅ 右栏 panel3（park/弹窗）", "✅ stacked bar 下钻", "❌（仅 KPI 卡片）"],
            ["单位列表/变更明细", "❌", "✅", "❌"],
            ["入库/出库/周转率", "❌", "✅", "❌"],
            ["楼栋/房间/楼层 KPI", "园区 KPI 简化", "summaryCards 4 项", "officeSpace 5 项"],
            ["双仓（黄浦/闵行）", "✅", "✅", "pie ✅ / 详情三仓 ❌"],
        ]
    ))

    # ---- 8 Data flow ----
    parts.append(h2("8. 数据流与共享关系"))
    parts.append(p("大屏公物仓图表直接引用 MIDDLE_PLATFORM_DATA.publicWarehouse（dashboard.js 导入 middle-platform-data.js）。"))
    parts.append(p("大屏办公面积使用独立 DASHBOARD_DATA.parkOfficeAreaChart（data.js），按项目维度，单位聚合为 top3+其他（非中台 19 单位明细）。"))
    parts.append(p("中台办公用房与中台公物仓数据均定义于 middle-platform-data.js 的 summaryCards、officeAreaChart、unitList、publicWarehouse。"))
    parts.append(p("图表 option 构建：大屏 dashboard.js 内联 + warehouse-charts.js；中台 middle-platform.js + warehouse-charts.js。"))

    # ---- 9 User flows ----
    parts.append(h2("9. 核心用户流程"))
    parts.append(h3("9.1 大屏 — 查看项目办公面积占比"))
    parts.append(p("资产管理 Tab → 地图模式点击项目 / 或进入园区模式 → 右栏第三面板显示「办公用房总使用面积占比」Donut → 切换项目更新数据。"))
    parts.append(h3("9.2 大屏 — 查看公物仓分仓与累计趋势"))
    parts.append(p("资产管理 Tab → 地图模式（无弹窗）→ 右栏 panel2 分仓 pie + panel3 累计趋势 → 切换按季度/按年度。"))
    parts.append(h3("9.3 中台 — 办公用房下钻与变更查询"))
    parts.append(p("侧边栏 办公用房 → 查看 summaryCards → 面积占比 bar → 点击「其他」下钻 → 单位列表 → 日期筛选 → 查看变更弹窗。"))
    parts.append(h3("9.4 中台 — 公物仓入库出库分析"))
    parts.append(p("侧边栏 公物仓 → 库存区块查看在仓/累计 → 入库区块切换 metric → 查看趋势与历史 → 出库区块查看周转率。"))
    parts.append(h3("9.5 小程序 — 资产数据浏览"))
    parts.append(p("首页公物仓入口 → assetData 子页 → 滚动至办公用房/公物仓/分仓 pie 区块。"))

    # ---- 10 Limitations ----
    parts.append(h2("10. 原型局限与待完善项"))
    parts.append(table(
        ["项", "说明"],
        [
            ["纯前端 Mock", "无 API，数据静态定义"],
            ["大屏无入库出库", "完整流转仅中台"],
            ["小程序三仓 vs 两仓", "publicWarehouse 三仓与 warehouseStock 两仓并存"],
            ["officeAreaProportion", "middle-platform-data.js 标记 @deprecated，图表已改用 officeAreaChart"],
            ["备件入库/出库", "middle-platform-property-ext-data.js 为物业管理备件模块，与公物仓无关"],
            ["底座平台", "warehouse-mgmt / office-mgmt 为主数据配置，无统计图表"],
            ["季度数据起始年", "quarterlyStartYear=2026，2026 年前无季度明细"],
        ]
    ))

    parts.append(h2("11. 附录 — officeAreaChart.otherUnits 完整列表"))
    parts.append(table(
        ["单位名称", "占比%"],
        [
            ["区府办", "6"], ["区发展改革委", "4"], ["区委组织部", "4"],
            ["区人力资源社会保障局", "4"], ["区国资委", "3"], ["区级统筹闲置办公室", "3"],
            ["大数据中心", "1"], ["城运中心", "1"], ["区地区办", "1"],
            ["区商务委", "1.84"], ["区金融办", "1.19"], ["人武部", "1.15"],
            ["区人社局", "0.38"], ["区退役军人局", "0.46"], ["区机关党工委", "0.35"],
            ["保密办", "0.08"], ["人大领导", "0.08"], ["审改办", "0.02"], ["区人武部", "0.07"],
        ]
    ))

    parts.append(p("— 文档结束 —"))
    return "".join(parts)


DOCUMENT_XML = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="{WNS}">
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
    <w:pPr><w:keepNext/><w:spacing w:before="480" w:after="120"/></w:pPr>
    <w:rPr><w:b/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:pPr><w:keepNext/><w:spacing w:before="360" w:after="80"/></w:pPr>
    <w:rPr><w:b/><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading3">
    <w:name w:val="heading 3"/>
    <w:basedOn w:val="Normal"/>
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
  <w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
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

DOC_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
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
