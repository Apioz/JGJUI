# -*- coding: utf-8 -*-
"""Generate 底座平台 PRD — 项目中心 & 模型中心."""
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parent / "底座平台PRD.docx"
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

    parts.append(h1("政数数字管理平台 — 底座平台产品需求说明（PRD）"))
    parts.append(p("文档版本：V1.2（项目中心 + 模型中心 + 设备/空间/文档/编码中心）"))
    parts.append(p("编写依据：dp/foundation-platform.html、foundation-platform-data.js、foundation-platform-views.js、foundation-platform.js"))
    parts.append(p("适用范围：底座平台各中心模块；本文档覆盖项目中心、模型中心、设备中心、空间中心、文档中心、编码中心。"))
    parts.append(p("说明：筛选条件严格按产品设计稿列示，不得增减字段；弹窗表单字段以例图为准。"))
    parts.append(p("V1.1：项目中心/模型中心行操作弹窗与全景子页。"))
    parts.append(p("V1.2：补充设备中心、空间中心、文档中心、编码中心模块数据与交互。"))

    # 1
    parts.append(h2("1. 平台概述"))
    parts.append(p("底座平台是智慧园区体系的数据基础层，负责项目、BIM 模型、设备、空间、文档、编码及系统配置等主数据的维护，为大屏、中台、小程序提供统一数据源。"))
    parts.append(h3("1.1 全局框架"))
    parts.append(table(
        ["区域", "说明"],
        [
            ["顶栏", "平台标题、跨系统切换（大屏/中台/小程序/底座）、全屏、时间、侧栏折叠"],
            ["左侧菜单", "多级导航；点击叶子节点 openPageByPath 打开 Tab"],
            ["Tab 栏", "多页签切换；底座首页 pinned 不可关闭"],
            ["主内容区", "按 FP_PAGE_REGISTRY 渲染 list / dual-list / kpi-list 等模板"],
        ]
    ))
    parts.append(h3("1.2 页面类型注册（FP_PAGE_REGISTRY）"))
    parts.append(table(
        ["path", "type", "dataKey"],
        [
            ["project-center", "list", "projectCenter"],
            ["model-center", "dual-list", "modelCenter"],
            ["device-center", "kpi-list", "deviceCenter"],
            ["space-center", "kpi-tree-list", "spaceCenter"],
            ["document-center", "document", "documentCenter"],
            ["coding-center", "coding-list", "codingCenter"],
        ]
    ))
    parts.append(h3("1.3 通用列表交互"))
    parts.append(bullet("筛选区：输入框/下拉 +「查询/搜索」+「重置/清空」"))
    parts.append(bullet("工具栏：+ 新增、导出等；表格工具：刷新、列设置、搜索、全屏"))
    parts.append(bullet("表格：复选框多选、分页（共 N 条、条/页、页码跳转）"))
    parts.append(bullet("行操作：链接式按钮，点击打开弹窗或跳转子页"))

    # 2 Project Center
    parts.append(h2("2. 项目中心"))
    parts.append(h3("2.1 入口与页面结构"))
    parts.append(p("菜单：项目中心（path=project-center）；页面类型 list；数据 FP_PAGE_DATA.projectCenter。"))

    parts.append(h3("2.2 筛选条件"))
    parts.append(table(
        ["字段 key", "标签", "类型", "选项/占位"],
        [
            ["name", "项目名称", "input", "请输入 项目名称"],
            ["type", "项目类型", "select", "公共建筑 / 园区 / 商业综合体 / 租赁房|办公楼|住宅"],
        ]
    ))
    parts.append(p("交互：点击「查询」按条件过滤列表；「重置」清空筛选恢复全量。"))

    parts.append(h3("2.3 工具栏"))
    parts.append(table(
        ["按钮", "样式", "交互"],
        [
            ["+ 新增", "primary", "打开「新增」弹窗，空表单"],
            ["导出", "warn", "导出当前列表为 Excel"],
        ]
    ))

    parts.append(h3("2.4 列表字段"))
    parts.append(table(
        ["列 key", "列名"],
        [
            ["index", "#"], ["name", "项目名称"], ["address", "项目地址"], ["type", "项目类型"],
            ["area", "总建筑面积 (m²)"], ["openDate", "开业时间"], ["code", "项目编码"],
            ["members", "项目成员"], ["panoramaPush", "全景是否推送"], ["panoramaId", "全景 ID"],
        ]
    ))
    parts.append(p("Mock 示例：浦东惠南养护院项目（HNYHY，32140㎡，全景 ID 5195）；黄浦区机关办公大楼（延安东路300号，HBLIC，2108）等，共 17 条。"))

    parts.append(h3("2.5 行操作"))
    parts.append(table(
        ["操作", "交互说明"],
        [
            ["查看", "打开只读弹窗，展示项目全部字段（含 Vsleem Key/Secret、全景 ID）；底部「推送」按钮（全景已配置时）"],
            ["编辑", "打开编辑弹窗，字段可改；底部「修改」「取消」「坐标拾取」"],
            ["全景", "进入项目全景详情子页（Tab：详情/数据/管理/组织；含项目封面与项目信息）"],
            ["全景查看", "在新窗口/内嵌打开全景预览"],
            ["同步", "触发项目数据同步（地图/全景，原型合并为一项）"],
        ]
    ))
    parts.append(p("产品设计稿中行操作另含「地图同步」「全景同步」；原型 data.js 合并为「同步」。"))

    parts.append(h3("2.6 弹窗 — 新增/编辑项目"))
    parts.append(p("两列布局表单，带 * 为必填："))
    parts.append(table(
        ["字段", "必填", "控件", "说明"],
        [
            ["项目名称", "是", "文本", "—"],
            ["项目类型", "是", "下拉/标签", "公共建筑等"],
            ["开业时间", "否", "日期", "—"],
            ["项目图片", "否", "上传", "仅可上传一张"],
            ["纬度", "是", "数字", "—"],
            ["全景是否激活/推送", "否", "单选", "是 / 否"],
            ["项目地址", "否", "文本", "—"],
            ["总建筑面积 m²", "是", "数字", "—"],
            ["项目编码", "是", "文本", "如 HNYHY"],
            ["经度", "是", "数字", "—"],
            ["项目成员", "否", "多选标签", "—"],
            ["项目描述", "否", "多行文本", "—"],
        ]
    ))
    parts.append(p("编辑模式额外字段：Vsleem App Key、Vsleem App Secret、全景 ID。"))
    parts.append(p("「坐标拾取」：打开地图选点，回填经纬度。"))
    parts.append(p("「保存/修改」：校验必填 → 提交 → 关闭弹窗 → 刷新列表。"))

    parts.append(h3("2.7 子页 — 全景详情"))
    parts.append(p("从「全景」进入；顶栏 Tab：详情 / 数据 / 管理 / 组织；「返回」回到列表。"))
    parts.append(p("详情 Tab：左侧项目封面图；右侧项目信息（项目编号、名称、简称、地址、联系人、联系方式、服务公司、创建时间等）。"))

    # 3 Model Center
    parts.append(h2("3. 模型中心"))
    parts.append(h3("3.1 入口与页面结构"))
    parts.append(p("菜单：模型中心（path=model-center）；页面类型 dual-list；左右双栏布局。"))
    parts.append(p("层级关系：项目（项目中心）→ 单体（左栏）→ 模型文件（右栏）。"))

    parts.append(h3("3.2 左栏 — 单体列表"))
    parts.append(h3("3.2.1 筛选与工具栏"))
    parts.append(p("筛选：单体名称 + 搜索/清空。"))
    parts.append(table(
        ["按钮", "交互"],
        [
            ["+ 新增", "打开「新增单体」弹窗"],
            ["导出", "导出单体列表"],
            ["模型组 ▾", "模型分组下拉（筛选/分组）"],
        ]
    ))
    parts.append(h3("3.2.2 列表字段"))
    parts.append(table(
        ["列", "说明"],
        [
            ["#", "序号"],
            ["单体名称", "如 东楼、西楼、地下室、场地"],
            ["园区设施设备", "是/否"],
            ["项目名称", "所属项目，如 浦东惠南养护院项目"],
        ]
    ))
    parts.append(h3("3.2.3 行操作"))
    parts.append(table(
        ["操作", "交互"],
        [
            ["编辑", "编辑单体名称、园区设施设备开关"],
            ["删除", "确认后删除单体（需无关联模型）"],
            ["上传模型", "打开「上传模型」弹窗，关联当前单体"],
            ["绑定", "打开「绑定」弹窗，选择模型类型绑定关系"],
        ]
    ))

    parts.append(h3("3.3 右栏 — 模型文件"))
    parts.append(h3("3.3.1 筛选与工具栏"))
    parts.append(p("筛选：模型名称 + 搜索/清空；工具栏：导出。"))
    parts.append(h3("3.3.2 列表字段"))
    parts.append(table(
        ["列", "说明"],
        [
            ["#", "序号"],
            ["模型名称", ".rvt 文件名，如 惠南养护院东楼-土建-20250701.rvt"],
            ["模型编码", "UUID"],
            ["单体名称", "关联单体"],
            ["项目名称", "所属项目"],
            ["类型", "土建类型 / 机电类型 / 安防类型 / 精装类型 / 总体类型"],
        ]
    ))
    parts.append(h3("3.3.3 行操作与状态"))
    parts.append(table(
        ["操作", "条件", "交互"],
        [
            ["删除", "—", "确认后删除模型记录"],
            ["编辑", "—", "打开编辑弹窗（单体名、模型名、类型、描述、重传 .rvt）"],
            ["转换 / 已转换", "converted=true 显示已转换", "未转换时打开「文件转换配置」弹窗"],
            ["上传台账", "—", "打开台账上传弹窗（Excel）"],
            ["上传db包", "—", "上传 .db 文件；已完成显示「(已完成)」"],
            ["删除db文件", "converted=true", "确认弹窗：同步删除 db 及关联台账，不可恢复"],
        ]
    ))

    parts.append(h3("3.4 弹窗 — 新增单体"))
    parts.append(table(
        ["字段", "必填", "控件"],
        [
            ["单体名称", "是", "文本"],
            ["园区设施设备", "否", "开关 否/是"],
        ]
    ))
    parts.append(p("底部：保存 / 取消。"))

    parts.append(h3("3.5 弹窗 — 上传模型"))
    parts.append(table(
        ["字段", "必填", "说明"],
        [
            ["类型", "是", "下拉：土建/机电/安防/精装/总体类型"],
            ["上传文件", "是", "拖拽或点击；仅 .rvt"],
            ["描述", "否", "多行文本"],
        ]
    ))
    parts.append(p("确认后进入转换流程或排队转换。"))

    parts.append(h3("3.6 弹窗 — 绑定"))
    parts.append(p("字段：类型 *（下拉，五类模型类型）。确认后将单体与对应类型模型建立绑定关系。"))

    parts.append(h3("3.7 弹窗 — 文件转换配置"))
    parts.append(p("已选文件路径展示；配置项："))
    parts.append(bullet("三维视图（下拉）"))
    parts.append(bullet("通用配置：导出房间面积、导出二维图纸、启用视图框"))
    parts.append(bullet("外观：颜色（真实）、LOD（中）"))
    parts.append(bullet("坐标：导出基准坐标（基点）"))
    parts.append(bullet("高级：导出轴网标高、二维视图、明细表、视窗构件"))
    parts.append(bullet("零件可见性：按零件导出"))
    parts.append(p("确认后开始 Revit 模型转换。"))

    parts.append(h3("3.8 弹窗 — 上传台账"))
    parts.append(p("Tab：空间模版 / 设备模版 / 电力模版 / 其他模版。"))
    parts.append(p("模版下载：下拉搜索 + 下载按钮。"))
    parts.append(p("上传文件 *：拖拽区，仅 Excel，最大 10MB。"))
    parts.append(p("确认后将台账数据关联至当前模型。"))

    parts.append(h3("3.9 弹窗 — 上传 db 包"))
    parts.append(p("说明文案：从 Revit 中提取全量数据，只上传 db 文件。"))
    parts.append(p("上传区：拖拽或点击，仅 .db 格式。"))

    parts.append(h3("3.10 弹窗 — 删除 db 文件确认"))
    parts.append(p("文案：确定后同步删除 db 文件及关联台账数据且无法恢复，需重新上传。"))
    parts.append(p("按钮：取消 / 确定。"))

    parts.append(h3("3.11 模型处理流程"))
    parts.append(p("1. 项目中心创建项目 → 2. 模型中心新增单体 → 3. 上传 .rvt → 4. 配置转换 → 5. 转换完成（已转换）→ 6. 上传 db 包 → 7. 上传台账 Excel → 8. 设备/空间中心可引用模型数据。"))

    # 6 Device Center
    parts.append(h2("6. 设备中心"))
    parts.append(h3("6.1 入口与页面结构"))
    parts.append(p("菜单：设备中心（path=device-center）；页面类型 kpi-list；数据 FP_PAGE_DATA.deviceCenter。"))

    parts.append(h3("6.2 顶部 KPI"))
    parts.append(table(
        ["标签", "Mock 值"],
        [
            ["单体总数 (个)", "4"],
            ["设备总数 (个)", "2550"],
            ["设备类型总数 (个)", "15"],
        ]
    ))

    parts.append(h3("6.3 筛选条件（严格按例图，共 3 项）"))
    parts.append(p("操作按钮：搜索（primary）、清空、展开 ▾。不得增减下列字段。"))
    parts.append(table(
        ["序号", "字段 key", "标签", "类型", "占位符"],
        [
            ["1", "unit", "所属单体", "select", "请选择 所属单体"],
            ["2", "category", "设备分类", "select", "请选择 设备分类"],
            ["3", "model", "关联模型", "select", "请选择 关联模型"],
        ]
    ))

    parts.append(h3("6.4 工具栏"))
    parts.append(table(
        ["按钮", "样式", "交互"],
        [
            ["+ 新增", "primary", "打开「新增」弹窗"],
            ["删除", "danger", "批量/行删除（确认弹窗）"],
            ["导出", "warn", "导出设备列表"],
        ]
    ))

    parts.append(h3("6.5 列表字段"))
    parts.append(table(
        ["列 key", "列名"],
        [
            ["unitName", "单体名称"], ["unitCode", "单体编码"], ["location", "安装位置"],
            ["spaceCode", "空间编码"], ["spaceCategory", "空间大类"], ["linkedModel", "关联模型"],
            ["elementId", "ElementID"], ["deviceName", "设备名称"], ["status", "设备状态"],
        ]
    ))
    parts.append(p("分页：共 2550 条；10 条/页。"))

    parts.append(h3("6.6 行操作"))
    parts.append(table(
        ["操作", "交互"],
        [
            ["删除", "确认弹窗「此操作将永久删除, 是否继续?」"],
            ["查看", "打开「设备属性」只读弹窗（ID_/LC_/FM_ 分组）"],
            ["编辑", "打开编辑弹窗（设备资产分类、LC_位置属性、ID_身份属性等）"],
            ["链接关系", "打开「链接文档」双栏弹窗（关联文档 / 文件列表树）"],
        ]
    ))

    parts.append(h3("6.7 弹窗 — 新增"))
    parts.append(table(
        ["字段", "必填", "说明"],
        [
            ["项目名称", "—", "只读，如 浦东学校项目"],
            ["设备资产分类", "是", "下拉，如 绿化带"],
            ["elementId", "否", "文本"],
        ]
    ))

    parts.append(h3("6.8 弹窗 — 设备属性（查看）"))
    parts.append(p("elementId 顶栏；分组：ID_身份属性（设备名称/类型/设计编号/设备编码）、LC_位置属性（单体/楼层/安装位置/房间编码/服务区域）、FM_运维属性（产地/出厂日期/安装日期）；底部「关闭」。"))

    parts.append(h3("6.9 弹窗 — 编辑"))
    parts.append(p("项目名称（只读）；设备资产分类 *；折叠面板 LC_位置属性（空间位置 *、LC_单体/楼层/安装位置/房间编码只读、LC_服务区域可编辑）；ID_身份属性（折叠）；确定/取消。"))

    parts.append(h3("6.10 弹窗 — 链接文档"))
    parts.append(p("左栏「关联文档」；右栏「文件列表」树形多选（帮助中心/操作手册/视频指南/常见问题）；取消关联 / 确认关联。"))

    # 7 Space Center
    parts.append(h2("7. 空间中心"))
    parts.append(h3("7.1 入口与页面结构"))
    parts.append(p("菜单：空间中心（path=space-center）；页面类型 kpi-tree-list；树形列表展示空间层级。"))

    parts.append(h3("7.2 顶部 KPI"))
    parts.append(table(
        ["标签", "Mock 值"],
        [
            ["单体总数 (个)", "4"],
            ["空间总数 (个)", "1286"],
            ["总建筑面积 (m²)", "32140.000"],
            ["总出租面积 (m²)", "18500.000"],
            ["空间总费用 (元)", "0"],
        ]
    ))

    parts.append(h3("7.3 筛选条件（严格按例图，共 5 项）"))
    parts.append(p("操作按钮：搜索、清空、展开 ▾。不得增减下列字段。"))
    parts.append(table(
        ["序号", "字段 key", "标签", "类型", "占位符"],
        [
            ["1", "unit", "所属单体", "select", "请选择 所属单体"],
            ["2", "name", "空间名称", "input", "请输入 空间名称"],
            ["3", "code", "空间编码", "input", "请输入 空间编码"],
            ["4", "category", "空间分类", "select", "请选择 空间分类"],
            ["5", "model", "关联模型", "select", "请选择 关联模型"],
        ]
    ))

    parts.append(h3("7.4 工具栏"))
    parts.append(table(
        ["按钮", "交互"],
        [["+ 新增", "打开「新增」弹窗"], ["导出", "导出空间列表"]]
    ))

    parts.append(h3("7.5 列表字段"))
    parts.append(table(
        ["列 key", "列名"],
        [
            ["name", "空间名称（树形）"], ["code", "空间编码"], ["category", "空间大类"],
            ["elementId", "ElementId"], ["linkedModel", "关联模型"], ["usage", "空间用途"],
            ["status", "空间状态"], ["area", "建筑面积"],
        ]
    ))
    parts.append(p("分页：共 1286 条。"))

    parts.append(h3("7.6 行操作"))
    parts.append(p("编辑：打开「编辑面积」弹窗（建筑面积 *，单位 m²，默认 0.000）；确定/取消。"))

    parts.append(h3("7.7 弹窗 — 新增空间"))
    parts.append(p("两列布局；必填 * 字段："))
    parts.append(table(
        ["字段", "必填", "控件"],
        [
            ["项目名称", "—", "只读 浦东学校项目"],
            ["elementId", "否", "文本"],
            ["楼宇编码", "否", "文本"],
            ["LC_楼层编码", "是", "文本"],
            ["使用单位", "否", "下拉 请选择使用单位"],
            ["空间状态", "否", "下拉 请选择"],
            ["建筑面积", "否", "数字 m²，默认 0"],
            ["空间类型", "是", "下拉，如 办公室"],
            ["楼宇名称", "是", "下拉 请选择"],
            ["LC_楼层", "是", "下拉 请选择"],
            ["空间名称", "是", "文本"],
            ["空间用途", "否", "下拉 请选择"],
            ["空间大类", "是", "只读 办公空间"],
        ]
    ))

    # 8 Document Center
    parts.append(h2("8. 文档中心"))
    parts.append(h3("8.1 入口与页面结构"))
    parts.append(p("菜单：文档中心（path=document-center）；页面类型 document；左右分栏布局。"))

    parts.append(h3("8.2 筛选条件（严格按例图）"))
    parts.append(p("文档中心无传统多字段筛选区；仅下列 2 处筛选控件，不得增减："))
    parts.append(table(
        ["位置", "类型", "占位符", "说明"],
        [
            ["左侧项目栏顶部", "input", "请输入内容", "搜索/过滤项目列表"],
            ["右侧工具栏", "select", "请选择", "文档类型/状态筛选下拉"],
        ]
    ))

    parts.append(h3("8.3 左侧 — 项目列表"))
    parts.append(p("Mock 项目：浦东惠南养护院项目；点击切换右侧文档列表上下文。"))

    parts.append(h3("8.4 右侧 — 工具栏"))
    parts.append(table(
        ["按钮", "交互"],
        [
            ["上传文件 ▾", "下拉：上传文件 / 上传文件夹"],
            ["新建文件夹", "打开「新建文件夹」弹窗"],
            ["新建在线文档", "打开富文本「新建在线文档」弹窗"],
        ]
    ))
    parts.append(p("视图切换：网格 / 列表（列表为默认）。"))

    parts.append(h3("8.5 文档列表"))
    parts.append(table(
        ["列", "说明"],
        [["名称", "文件/文件夹名"], ["类型", "文件类型"], ["上传日期", "上传时间"]]
    ))
    parts.append(p("分页：共 N 条；20 条/页。"))

    parts.append(h3("8.6 弹窗 — 上传文件夹"))
    parts.append(p("附件上传 *（上传文件按钮）；说明：video/bim/image/office/document/压缩/备份，单次最大 500MB；上传到文件夹 *（下拉）；提交/取消。"))

    parts.append(h3("8.7 弹窗 — 新建文件夹"))
    parts.append(p("文件夹名称 *；上传到文件夹 *（下拉 请选择上传到文件夹）；确定/取消。"))

    parts.append(h3("8.8 弹窗 — 新建在线文档"))
    parts.append(p("名称 *；文件夹 *（请选择上传到的文件夹）；富文本编辑器（正文/引用/列表/链接/图片/表格等工具栏）；确定/取消。"))

    # 9 Coding Center
    parts.append(h2("9. 编码中心"))
    parts.append(h3("9.1 入口与页面结构"))
    parts.append(p("菜单：编码中心（path=coding-center）；页面类型 coding-list。"))

    parts.append(h3("9.2 筛选条件（严格按例图，共 7 项）"))
    parts.append(p("操作按钮：搜索、清空。不得增减下列字段。"))
    parts.append(table(
        ["序号", "字段 key", "标签", "类型", "占位符"],
        [
            ["1", "category", "类别", "select", "请选择 类别"],
            ["2", "code", "CODE", "input", "请输入 CODE"],
            ["3", "codeEn", "CODE_EN", "input", "请输入 CODE_EN"],
            ["4", "lv1", "LV1", "input", "请输入 LV1"],
            ["5", "lv2", "LV2", "input", "请输入 LV2"],
            ["6", "lv3", "LV3_CN", "input", "请输入 LV3_CN"],
            ["7", "lv4", "LV4", "input", "请输入 LV4"],
        ]
    ))

    parts.append(h3("9.3 工具栏"))
    parts.append(table(
        ["按钮", "交互"],
        [
            ["+ 新增", "打开「新增」弹窗"],
            ["更新编码", "打开「上传编码」Excel 弹窗"],
            ["+ 定义编码及映射列", "打开字段映射弹窗（左侧勾选/右侧拖拽排序）"],
            ["资产分类设置", "打开资产分类树（设备/空间 Tab）"],
            ["下载编码模板", "预览/下载 编码模板.xlsx"],
            ["导出", "导出编码列表"],
        ]
    ))

    parts.append(h3("9.4 列表字段"))
    parts.append(table(
        ["列 key", "列名"],
        [
            ["id", "ID"], ["code", "CODE"], ["codeEn", "CODE_EN"],
            ["lv1", "LV1"], ["lv2", "LV2"], ["lv3", "LV3_CN"], ["lv4", "LV4"],
            ["desc", "Description"], ["note", "备注"], ["color", "颜色"],
        ]
    ))
    parts.append(p("分页：共 243 条；显示 10 条。"))

    parts.append(h3("9.5 行操作"))
    parts.append(table(
        ["操作", "交互"],
        [
            ["查看", "只读弹窗展示全部编码字段"],
            ["编辑", "编辑弹窗（类别*、ID、父级编码、CODE 等）"],
            ["删除", "确认后删除"],
            ["设置颜色", "颜色选择弹窗"],
        ]
    ))

    parts.append(h3("9.6 弹窗 — 新增/编辑编码"))
    parts.append(table(
        ["字段", "必填"],
        [
            ["类别", "是"], ["ID", "否"], ["父级编码", "否"], ["CODE", "否"],
            ["CODE_EN", "否"], ["LV1", "否"], ["LV2", "否"], ["LV3_CN", "否"],
            ["LV4", "否"], ["Description", "否"], ["备注", "否"],
        ]
    ))
    parts.append(p("编辑模式底部：修改 / 取消。"))

    parts.append(h3("9.7 其他弹窗"))
    parts.append(bullet("定义编码及映射列：左侧编码数据复选框；右侧拖拽排序区"))
    parts.append(bullet("资产分类设置：Tab 设备/空间；分类树多选"))
    parts.append(bullet("上传编码：仅 Excel，拖动或点击上传"))
    parts.append(bullet("设置颜色：颜色选择器；确定/取消"))

    # 10 Appendix
    parts.append(h2("10. 附录 — Mock 数据"))
    parts.append(h3("10.1 项目中心 rows（节选）"))
    parts.append(table(
        ["项目名称", "类型", "面积", "编码", "全景"],
        [
            ["浦东惠南养护院项目", "公共建筑", "32140", "HNYHY", "5195/否"],
            ["黄浦区机关办公大楼", "公共建筑", "28500", "HBLIC", "2108/是"],
            ["上海生物芯片智慧园区", "园区", "85600", "SWXP", "3201/是"],
        ]
    ))
    parts.append(h3("10.2 模型中心 left.rows"))
    parts.append(p("东楼、西楼、地下室、场地 — 均属浦东惠南养护院项目，园区设施设备=否。"))
    parts.append(h3("10.3 模型中心 right.rows"))
    parts.append(table(
        ["模型名称", "类型", "converted"],
        [
            ["惠南养护院东楼-土建-20250701.rvt", "土建类型", "是"],
            ["惠南养护院东楼-机电-20250701.rvt", "机电类型", "否"],
            ["惠南养护院地下室-土建-20250615.rvt", "土建类型", "是"],
        ]
    ))

    parts.append(h3("10.4 设备中心 rows（节选）"))
    parts.append(p("东楼/地下室设备：1080P智能人脸抓拍枪式摄像机、感烟火灾探测器、排烟风机等；关联模型=是。"))

    parts.append(h3("10.5 空间中心 rows"))
    parts.append(p("树形：东楼、地下室、场地；关联模型是/否。"))

    parts.append(h3("10.6 编码中心 rows（节选）"))
    parts.append(table(
        ["ID", "CODE", "LV1", "LV3_CN"],
        [
            ["1001", "YC-10.00.00", "建筑", "道路"],
            ["1002", "YC-10.01.00", "建筑", "湖泊"],
            ["1005", "YC-10.04.00", "建筑", "停车场"],
        ]
    ))

    parts.append(h2("11. 原型实现说明"))
    parts.append(table(
        ["项", "状态"],
        [
            ["列表/筛选/分页 UI", "已实现（foundation-platform-views.js）"],
            ["项目/模型中心行操作弹窗", "已实现交互占位"],
            ["设备/空间/文档/编码中心弹窗", "列表 UI 已实现；弹窗待后续迭代"],
            ["编码中心工具栏", "按钮文案与例图一致（含「+ 定义编码及映射列」）"],
            ["真实 API / 文件上传", "未接入，原型 Mock"],
            ["全景子页", "Tab 切换占位"],
            ["地图坐标拾取", "Toast 占位"],
        ]
    ))

    parts.append(p("— 文档结束（后续版本补充：系统配置子模块）—"))
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
