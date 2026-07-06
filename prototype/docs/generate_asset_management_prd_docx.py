# -*- coding: utf-8 -*-
"""Generate 资产管理 PRD (大屏 + 中台) as .docx."""
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parent / "资产管理PRD.docx"
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

    parts.append(h1("智慧园区数字化管理平台 — 资产管理模块产品需求说明（PRD）"))
    parts.append(p("文档版本：V1.1"))
    parts.append(p("适用范围：大屏端（dp/index.html）、中台端（dp/middle-platform.html）"))
    parts.append(p("编写依据：dp/js/data.js、dashboard.js、middle-platform-data.js、middle-platform.js、public-warehouse-data.js、warehouse-charts.js"))
    parts.append(p("说明：本文档严格依据当前代码实现梳理；未实现能力已标注。"))
    parts.append(p("V1.1 变更：中台办公用房使用面积占比改为饼图（前 5 单位 +「其他」下钻）；公物仓入库/出库模块移除趋势图，仅保留 KPI 与历史表。"))

    # ---- 1 ----
    parts.append(h2("1. 模块概述"))
    parts.append(h3("1.1 模块定位"))
    parts.append(p("资产管理是平台核心模块之一，覆盖机关办公空间、设备资产及公物仓物资的统计展示与运营分析。大屏侧重全局/项目/园区多视角可视化；中台侧重办公用房明细管理与公物仓进销存分析。"))

    parts.append(h3("1.2 子模块构成"))
    parts.append(table(
        ["子模块", "大屏", "中台"],
        [
            ["空间与设备资产统计", "✅ KPI + 类型饼图 + 趋势", "—（中台暂无独立页）"],
            ["办公用房", "✅ 项目级使用面积占比（园区/弹窗模式）", "✅ 完整统计 + 单位列表 + 变更"],
            ["公物仓", "✅ 在仓分仓 + 累计趋势/办公占比", "✅ 库存/入库/出库（入库出库无趋势图）"],
        ]
    ))

    parts.append(h3("1.3 涉及源码文件"))
    parts.append(table(
        ["文件", "职责"],
        [
            ["dp/index.html", "大屏资产管理 Tab 布局（左/中/右栏）"],
            ["dp/js/data.js", "大屏资产 KPI、项目树、类型统计、办公面积、趋势图数据"],
            ["dp/js/dashboard.js", "大屏交互逻辑、图表渲染、视图切换"],
            ["dp/js/public-warehouse-data.js", "公物仓共享数据 PUBLIC_WAREHOUSE_DATA"],
            ["dp/js/middle-platform-data.js", "中台菜单、办公用房、公物仓引用"],
            ["dp/js/middle-platform.js", "中台页面逻辑、图表、筛选、弹窗"],
            ["dp/middle-platform.html", "中台办公用房/公物仓页面模板"],
            ["dp/js/warehouse-charts.js", "公物仓 ECharts option 构建（中台复用）"],
        ]
    ))

    # ---- 2 Data ----
    parts.append(h2("2. 数据架构"))
    parts.append(h3("2.1 大屏数据源（DASHBOARD_DATA）"))
    parts.append(table(
        ["数据键", "用途"],
        [
            ["assetKpiData", "地图模式顶部 4 张 KPI"],
            ["moduleParkKpi.资产管理", "园区模式 KPI（按项目切换）"],
            ["assetProjects", "左栏项目树（4 个项目）"],
            ["assetSpaceCategories / assetEquipmentCategories", "园区模式左栏分类树"],
            ["assetTypeSpace / assetTypeEquipment", "右栏「按资产类型统计」饼图"],
            ["parkOfficeAreaChart", "右栏第三面板办公面积 Donut（按项目）"],
            ["assetTrendChart", "中区底部 12 月空间/设备趋势折线"],
            ["moduleParkMarkers.资产管理", "3D 场景楼栋标注（空间总数）"],
            ["projectDetails", "地图弹窗项目详情"],
        ]
    ))

    parts.append(h3("2.2 中台数据源（MIDDLE_PLATFORM_DATA + PUBLIC_WAREHOUSE_DATA）"))
    parts.append(table(
        ["数据键", "用途"],
        [
            ["summaryCards", "办公用房顶部 4 张 KPI"],
            ["officeAreaChart", "办公面积占比 Donut 饼图（allUnits 排序，前 5 +「其他」下钻）"],
            ["unitList", "单位列表 11 条 + 变更历史"],
            ["PUBLIC_WAREHOUSE_DATA", "公物仓全部统计（currentStock/cumulative/inbound/outbound）"],
        ]
    ))

    parts.append(h3("2.3 公物仓双仓定义"))
    parts.append(table(
        ["ID", "简称", "地址", "颜色"],
        [
            ["w1", "黄浦仓", "国货路371号", "#1890ff"],
            ["w2", "闵行仓", "立跃路1758号", "#69c0ff"],
        ]
    ))
    parts.append(p("大屏 dashboard.js 与中台 middle-platform.js 均引用 MIDDLE_PLATFORM_DATA.publicWarehouse（即 PUBLIC_WAREHOUSE_DATA）。"))

    # ---- 3 Dashboard entry ----
    parts.append(h2("3. 大屏 — 入口与导航"))
    parts.append(p("顶栏 navTabs 含「资产管理」Tab，点击 switchTab('资产管理') 切换。"))
    parts.append(p("切换后：disposeAllCharts → initAssetCharts()；左栏显示项目筛选 + 空间/设备分类；中区显示 KPI + 3D/地图 + 趋势图；右栏显示三块面板。"))

    parts.append(h3("3.1 视图模式"))
    parts.append(table(
        ["模式", "条件", "背景", "KPI 来源"],
        [
            ["地图模式", "overviewViewMode=map", "Leaflet 地图", "assetKpiData（全局）"],
            ["地图+弹窗", "mapPopupProjectId 非空", "地图 + 项目弹窗", "assetKpiData"],
            ["园区模式", "overviewViewMode=park", "3D 园区场景", "moduleParkKpi.资产管理"],
        ]
    ))
    parts.append(p("地图模式点击标注 → 打开 map-project-popup（名称/描述/建筑面积/地址）→「进入园区」enterPark() → 园区模式。"))
    parts.append(p("园区模式点击「返回地图」exitPark() → 回到地图模式。"))

    # ---- 4 Dashboard KPI ----
    parts.append(h2("4. 大屏 — 顶部 KPI"))
    parts.append(h3("4.1 地图模式（assetKpiData）"))
    parts.append(table(
        ["指标", "值", "单位"],
        [
            ["总建筑面积", "741,213", "㎡"],
            ["总使用面积", "1,213", "㎡"],
            ["空间总数", "3,021", "个"],
            ["设备总数", "3,021", "个"],
        ]
    ))

    parts.append(h3("4.2 园区模式（moduleParkKpi.资产管理，默认延安东路300号）"))
    parts.append(table(
        ["指标", "值", "单位"],
        [
            ["总建筑面积", "1,213", "㎡"],
            ["总使用面积", "1,213", "㎡"],
            ["空间总数", "300", "个"],
            ["设备总数", "232", "个"],
        ]
    ))
    parts.append(p("currentKpiData：isModuleParkMode 且 moduleParkKpiData 存在时用园区 KPI，否则用 assetKpiData。"))

    # ---- 5 Dashboard left ----
    parts.append(h2("5. 大屏 — 左栏"))
    parts.append(h3("5.1 项目筛选（通用面板）"))
    parts.append(p("标题「项目筛选」；搜索框 placeholder「搜索项目或空间」；filteredProjects 按名称过滤。"))
    parts.append(p("数据源 assetProjects，4 个项目："))
    parts.append(table(
        ["ID", "名称", "子节点"],
        [
            ["p1", "延安东路300号", "1号楼/2号楼/3号楼"],
            ["p3", "重庆南路139号", "主楼"],
            ["p4", "重庆南路100号", "机关大楼"],
            ["p2", "河南南路288号", "主楼"],
        ]
    ))
    parts.append(p("交互：toggleProject 展开/选中；selectProject 选中子节点；selectedProject 影响 activeModuleProjectId。"))

    parts.append(h3("5.2 空间分类（仅资产管理 Tab + 园区模式）"))
    parts.append(p("assetSpaceCategories：空间分类 52 个 → 办公空间/公共空间/设备空间/接待大厅。"))

    parts.append(h3("5.3 设备分类"))
    parts.append(p("assetEquipmentCategories：设备分类 23 个 → 风机盘管系统/水处理系统/消防系统/照明系统。"))
    parts.append(p("说明：分类树当前为展示型，点击仅展开/折叠，不联动图表刷新。"))

    # ---- 6 Dashboard center ----
    parts.append(h2("6. 大屏 — 中区"))
    parts.append(h3("6.1 3D 园区场景（园区模式）"))
    parts.append(p("activeParkBuildings：1号楼/2号楼/3号楼（排除食堂 c3）。"))
    parts.append(p("moduleParkMarkers.资产管理 标注："))
    parts.append(bullet("1号楼 → 空间总数: 92个"))
    parts.append(bullet("2号楼 → 空间总数: 86个"))
    parts.append(bullet("3号楼 → 空间总数: 65个"))
    parts.append(p("交互：点击楼栋 selectParkBuilding → 聚焦旋转角度；按住拖动 orbit 查看角度；提示「点击楼栋后可拖动查看不同角度」。"))

    parts.append(h3("6.2 底部趋势图"))
    parts.append(p("标题：「12个月内项目空间设备趋势分析」；Chart ID：#assetTrendChart。"))
    parts.append(p("数据源 assetTrendChart：12 个月标签（2024年3月–2025年2月），space 与 equipment 双折线。"))
    parts.append(p("函数 buildAssetTrendOption() 渲染；initAssetCharts 时初始化。"))

    # ---- 7 Dashboard right ----
    parts.append(h2("7. 大屏 — 右栏三块面板"))
    parts.append(h3("7.1 第一面板：按资产类型统计"))
    parts.append(p("Chart ID：#assetTypeChart；Toggle：空间 / 设备（assetTypeTab，默认 space）。"))
    parts.append(p("副标题 assetTypeSummary：空间时「总面积 | 4230㎡」；设备时「总数量 | 3021个」。"))
    parts.append(p("空间 assetTypeSpace 分项：办公空间 1481、公共空间 1058、设备空间 846、研发生产 508、辅助用房 337。"))
    parts.append(p("设备 assetTypeEquipment 分项：暖通 856、电气 742、给排水 628、安防 495、其他 300。"))
    parts.append(p("交互：updateAssetTypeChart() → buildAssetTypeOption 刷新 Donut。"))

    parts.append(h3("7.2 第二面板：本季在仓物资分仓占比（固定）"))
    parts.append(p("标题 assetSecondPanelTitle 固定；Chart ID：#gwStockPieChart；始终显示，不受 isAssetParkScope 影响。"))
    parts.append(p("数据源 PUBLIC_WAREHOUSE_DATA.currentStock：合计 822，黄浦 484，闵行 338。"))
    parts.append(p("buildGwStockPieOption：Donut 中心「本季总数 822」；tooltip 显示件数与百分比。"))
    parts.append(p("updateAssetSecondPanelChart() 在 initAssetCharts 及 Tab 切换时刷新。"))

    parts.append(h3("7.3 第三面板：动态切换"))
    parts.append(p("Chart ID：#gwCumulativeTrendChart；标题 assetThirdPanelTitle 动态："))
    parts.append(bullet("isAssetParkScope=true →「办公用房总使用面积占比」Donut"))
    parts.append(bullet("isAssetParkScope=false →「累计存放历史变化趋势」双仓折线"))

    parts.append(h3("7.3.1 isAssetParkScope 判定"))
    parts.append(p("activeTab=资产管理 且满足之一："))
    parts.append(bullet("isModuleParkMode（园区模式）"))
    parts.append(bullet("isModuleMapMode && mapPopupProjectId（地图模式且已开项目弹窗）"))

    parts.append(h3("7.3.2 办公用房总使用面积占比"))
    parts.append(p("getActiveOfficeAreaChart()：园区模式取 byProject[activeModuleProjectId]；地图弹窗取 byProject[resolveProjectRootId(mapPopupProjectId)]；否则 default。"))
    parts.append(table(
        ["项目", "总面积(㎡)", "区级统筹", "机管局", "区建设管理委", "其他"],
        [
            ["p1 延安东路300号", "1213", "58%", "2%", "2%", "38%"],
            ["p2 河南南路288号", "980", "52%", "3%", "4%", "41%"],
            ["p3 重庆南路139号", "856", "48%", "5%", "3%", "44%"],
            ["p4 重庆南路100号", "742", "45%", "6%", "4%", "45%"],
        ]
    ))
    parts.append(p("buildOfficeAreaPieOption：中心显示「总面积 XXX㎡」；park scope 下隐藏按季度/按年度切换。"))

    parts.append(h3("7.3.3 累计存放历史变化趋势"))
    parts.append(p("数据源 cumulative.quarterlyTrend 或 yearlyTrend；Toggle：按季度 / 按年度（gwCumulativeMode）。"))
    parts.append(p("年度模式：取 yearlyTrend 最近 3 年；季度模式：quarterlyTrend 全量（当前仅 2026 Q1）。"))
    parts.append(p("switchGwCumulativeMode：isAssetParkScope 时直接 return 不可用。"))
    parts.append(p("累计当前季度：合计 1320，黄浦 758，闵行 562，环比 ↑5.6%。"))

    parts.append(h3("7.4 右栏面板联动 watch"))
    parts.append(p("watch([isAssetParkScope, activeModuleProjectId, mapPopupProjectId]) → updateAssetThirdPanelChart()。"))

    # ---- 8 MP entry ----
    parts.append(h2("8. 中台 — 入口与导航"))
    parts.append(p("侧边栏 menuItems → 资产管理（id=asset）→ 子菜单："))
    parts.append(bullet("办公用房（path=office，id=asset-office）"))
    parts.append(bullet("公物仓（path=warehouse，id=asset-warehouse）"))
    parts.append(p("navigateToView(path)：office → initOfficeCharts()；warehouse → initWarehouseCharts()。"))
    parts.append(p("pageTitle：办公用房 / 公物仓；顶栏可选办公点 locations（4 个地址，当前为展示切换）。"))

    # ---- 9 MP office ----
    parts.append(h2("9. 中台 — 办公用房"))
    parts.append(h3("9.1 顶部 KPI（summaryCards）"))
    parts.append(table(
        ["标签", "值", "单位"],
        [
            ["楼栋数量", "51", "个"],
            ["总使用面积", "579.42", "m²"],
            ["总建筑面积", "5279.42", "m²"],
            ["房间数", "746", "个"],
        ]
    ))

    parts.append(h3("9.2 办公用房使用面积占比图"))
    parts.append(p("Chart：#mpAreaStack；环形 Donut 饼图（buildAreaPieOption）。"))
    parts.append(p("中心 graphic 显示「总使用面积」及 officeAreaChart.totalArea（52739.42㎡）。"))
    parts.append(h3("9.2.1 两级下钻"))
    parts.append(p("数据源 officeAreaChart.allUnits（22 个单位，按 proportion 降序）。"))
    parts.append(p("Level 1 summary：占比前 5 单位 +「其他」汇总扇区："))
    parts.append(table(
        ["排名", "单位", "占比%"],
        [
            ["1", "区级统筹", "58"],
            ["2", "区府办", "6"],
            ["3", "区发展改革委", "4"],
            ["4", "区委组织部", "4"],
            ["5", "区人力资源社会保障局", "4"],
            ["—", "其他（17 个单位合计）", "≈22.6"],
        ]
    ))
    parts.append(p("Level 2 detail：点击饼图「其他」扇区 → areaChartLevel=detail → 展示 slice(5) 其余单位明细饼图。"))
    parts.append(p("detail 模式标题变为「其他单位使用面积占比」；显示「返回上一层」→ backAreaChart() → summary。"))
    parts.append(p("summary 模式提示：「点击「其他」查看剩余单位明细」；ECharts click：仅 summary 且 params.name==='其他' 时触发。"))

    parts.append(h3("9.3 单位列表"))
    parts.append(p("表格列：单位名称、位置、面积(m²)、占比(%)、变更明细；共 11 条 unitList。"))
    parts.append(table(
        ["单位", "位置", "面积", "占比%"],
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

    parts.append(h3("9.4 日期筛选"))
    parts.append(p("控件：开始日期、结束日期（type=date）、重置。"))
    parts.append(p("filteredUnitList：对每个 unit.changes 过滤 visibleChanges；有日期范围时仅展示 visibleChanges.length>0 的单位。"))
    parts.append(p("提示：「已筛选 N 个在指定时段内有变更的单位」；空态：「该时段内暂无单位变更记录」。"))

    parts.append(h3("9.5 变更明细弹窗"))
    parts.append(p("触发：单位列表「查看」按钮（visibleChanges 非空）。"))
    parts.append(p("弹窗内容：单位名称；摘要（当前面积/占比/变更次数）；时间线（日期、使用面积、占比、较上次 delta）。"))
    parts.append(p("enrichUnitChanges：按日期降序，计算 areaDelta/proportionDelta；最新标记「最新」，其余「较上次变更」。"))
    parts.append(p("有日期筛选时，弹窗仅展示筛选时段内变更并提示条数。"))

    # ---- 10 MP warehouse ----
    parts.append(h2("10. 中台 — 公物仓"))
    parts.append(p("页面分三大区块：库存物资数、入库、出库。"))

    parts.append(h3("10.1 库存物资数"))
    parts.append(h3("10.1.1 在仓物资 KPI"))
    parts.append(p("本季度：合计 822 件；黄浦 484（gwStockRatio）；闵行 338。"))
    parts.append(h3("10.1.2 截至目前存放"))
    parts.append(p("cumulative.currentQuarter：合计 1320，黄浦 758，闵行 562，环比 ↑5.6%。"))
    parts.append(h3("10.1.3 图表"))
    parts.append(bullet("#gwStockPie — buildGwStockPieOption（本季分仓占比）"))
    parts.append(bullet("#gwCumulativeTrend — 按季度/按年度 Toggle（switchGwCumulativeMode）"))
    parts.append(h3("10.1.4 累计存放历史列表"))
    parts.append(p("列：周期、合计、黄浦仓、闵行仓、环比变化%。"))
    parts.append(p("筛选：按季度/按年度 + 年份 select + 季度 select（季度模式）。"))
    parts.append(p("gwCumulativeHistory computed：年度由 yearlyTrend 构建；季度过滤 period 年份>=2026；可按年/季进一步筛选。"))
    parts.append(p("年度趋势 2022–2026：total 3200→5280。"))

    parts.append(h3("10.2 入库"))
    parts.append(h3("10.2.1 指标 Tab"))
    parts.append(table(
        ["key", "标签", "单位"],
        [
            ["count", "入库次数", "次"],
            ["quantity", "入库物资数量", "件"],
            ["assetValue", "入库固定资产价值", "万元"],
        ]
    ))
    parts.append(h3("10.2.2 本季度 KPI"))
    parts.append(table(
        ["指标", "合计", "黄浦", "闵行", "环比", "趋势"],
        [
            ["入库次数", "86", "52", "34", "8.2%", "up"],
            ["入库物资数量", "423", "256", "167", "6.5%", "up"],
            ["入库固定资产价值", "573", "348", "225", "3.1%", "down"],
        ]
    ))
    parts.append(h3("10.2.3 入库历史"))
    parts.append(p("无趋势图（V1.1 已移除 #gwInboundTrend 及按季度/按年度 Toggle）。"))
    parts.append(p("全宽「入库历史」表格：buildGwYearlyFlowHistory(inbound, metricKey)，列：年份、合计、黄浦、闵行、环比。"))
    parts.append(p("switchGwInboundMetric：切换 metric 后仅刷新 KPI 与历史表数据，不触发图表渲染。"))

    parts.append(h3("10.3 出库"))
    parts.append(h3("10.3.1 指标 Tab"))
    parts.append(table(
        ["key", "标签", "单位"],
        [
            ["count", "出库次数", "次"],
            ["quantity", "出库物资数量", "件"],
            ["savedFunds", "节约资金", "万元"],
        ]
    ))
    parts.append(h3("10.3.2 本季度 KPI"))
    parts.append(table(
        ["指标", "合计", "黄浦", "闵行", "环比", "趋势"],
        [
            ["出库次数", "79", "48", "31", "4.0%", "up"],
            ["出库物资数量", "423", "257", "166", "5.8%", "up"],
            ["节约资金", "128", "78", "50", "12.3%", "up"],
        ]
    ))
    parts.append(h3("10.3.3 出库历史 — 周转率"))
    parts.append(p("无趋势图（V1.1 已移除 #gwOutboundTrend 及 switchGwOutboundTrendMode）。"))
    parts.append(p("全宽「出库历史」表格：列含年份、合计、黄浦、闵行、周转率、环比。"))
    parts.append(p("公式 calcGwTurnoverRate：出库次数 ÷ ((年初在库 + 年末在库) / 2)。"))
    parts.append(p("enrichGwOutboundHistoryWithTurnover 仅 metric=count 时有周转率；其他 metric 显示「—」。"))
    parts.append(p("yearlyInventory 年份 2022–2025，含 w1Begin/w1End/w2Begin/w2End。"))
    parts.append(p("switchGwOutboundMetric：切换 metric 后仅刷新 KPI 与历史表。"))

    parts.append(h3("10.4 公物仓通用交互"))
    parts.append(bullet("gwStockRatio / gwCumulativeRatio：单仓占比"))
    parts.append(bullet("formatGwChange / gwTrendClass：环比 ↑/↓ 样式"))
    parts.append(bullet("switchGwInboundMetric / switchGwOutboundMetric：切换入库/出库指标 Tab"))

    parts.append(h3("10.5 中台公物仓状态变量"))
    parts.append(table(
        ["变量", "默认值", "用途"],
        [
            ["gwInboundMetric", "count", "入库指标 Tab"],
            ["gwOutboundMetric", "count", "出库指标 Tab"],
            ["gwCumulativeMode", "quarter", "累计趋势/列表：quarter 或 year"],
            ["gwCumulativeHistoryYear", "all", "累计历史年份筛选"],
            ["gwCumulativeHistoryQuarter", "all", "累计历史季度筛选（季度模式）"],
            ["areaChartLevel", "summary", "办公面积图：summary 或 detail"],
            ["unitChangeStart / unitChangeEnd", "空", "单位变更日期筛选"],
        ]
    ))

    parts.append(h3("10.6 大屏资产管理状态变量"))
    parts.append(table(
        ["变量", "默认值", "用途"],
        [
            ["assetTypeTab", "space", "右栏 panel1 空间/设备 Toggle"],
            ["gwCumulativeMode", "quarter", "右栏 panel3 累计趋势周期"],
            ["selectedProject", "p1", "左栏项目树选中项"],
            ["overviewViewMode", "map", "map 或 park"],
            ["mapPopupProjectId", "null", "地图弹窗项目 ID"],
        ]
    ))

    # ---- 11 Cross ----
    parts.append(h2("11. 大屏与中台能力对照"))
    parts.append(table(
        ["能力", "大屏", "中台"],
        [
            ["全局 KPI（建筑面积/空间/设备）", "✅", "—"],
            ["按资产类型统计（空间/设备）", "✅ 右栏 panel1", "—"],
            ["12 月空间设备趋势", "✅ 中区底部", "—"],
            ["本季在仓分仓占比", "✅ 右栏 panel2", "✅"],
            ["累计存放趋势", "✅ 右栏 panel3（非 park）", "✅ 趋势+列表+筛选"],
            ["办公面积占比", "✅ 右栏 panel3（park/弹窗）Donut", "✅ 饼图 top5 + 其他下钻"],
            ["办公 KPI（楼栋/房间）", "—", "✅ summaryCards"],
            ["单位列表/变更明细", "—", "✅"],
            ["入库/出库 KPI + 历史表", "—", "✅（无入库/出库趋势图）"],
            ["3D 园区/项目地图", "✅", "—"],
        ]
    ))

    # ---- 12 Flows ----
    parts.append(h2("12. 核心用户流程"))
    parts.append(h3("12.1 大屏 — 查看全局资产概况"))
    parts.append(p("资产管理 Tab → 地图模式 → 查看 KPI + 右栏类型/公物仓 → 底部趋势图。"))

    parts.append(h3("12.2 大屏 — 查看项目办公面积"))
    parts.append(p("地图点击项目 → 弹窗 → 第三面板变办公面积 Donut；或 enterPark → 园区模式 → 切换项目更新占比。"))

    parts.append(h3("12.3 大屏 — 查看公物仓"))
    parts.append(p("资产管理 Tab → 右栏 panel2 分仓 pie；地图模式（无弹窗）panel3 累计趋势 → 切换按季度/按年度。"))

    parts.append(h3("12.4 中台 — 办公用房分析"))
    parts.append(p("侧边栏 办公用房 → KPI → 面积占比饼图（前 5 + 其他）→ 点击「其他」下钻 → 单位列表 → 日期筛选 → 变更弹窗。"))

    parts.append(h3("12.5 中台 — 公物仓运营分析"))
    parts.append(p("侧边栏 公物仓 → 库存在仓/累计（含累计趋势图）→ 入库切换 metric → 入库历史表 → 出库切换 metric → 出库历史表（含周转率）。"))

    # ---- 13 Limitations ----
    parts.append(h2("13. 原型局限"))
    parts.append(table(
        ["项", "说明"],
        [
            ["纯前端 Mock", "无 API，数据静态"],
            ["大屏无入库出库", "完整流转仅中台"],
            ["左栏分类树", "空间/设备分类不联动图表"],
            ["小程序", "引用 PUBLIC_WAREHOUSE_DATA；入库/出库无趋势图，与中台一致"],
            ["入库出库趋势图", "V1.1 已从中台移除；库存区块仍保留累计存放趋势图"],
            ["officeAreaProportion / top3", "middle-platform-data.js 已 @deprecated，改用 allUnits"],
            ["quarterlyStartYear", "2026，2026 年前无季度明细"],
        ]
    ))

    parts.append(h2("14. 附录 — officeAreaChart.otherUnits"))
    parts.append(table(
        ["单位", "占比%"],
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
