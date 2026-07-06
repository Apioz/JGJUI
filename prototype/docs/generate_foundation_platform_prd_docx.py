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
    parts.append(p("文档版本：V1.0（项目中心 + 模型中心）"))
    parts.append(p("编写依据：dp/foundation-platform.html、foundation-platform-data.js、foundation-platform-views.js、foundation-platform.js"))
    parts.append(p("适用范围：底座平台各中心模块；本文档首期覆盖项目中心、模型中心。"))
    parts.append(p("说明：字段与 Mock 数据以 foundation-platform-data.js 为准；弹窗表单字段以产品设计稿为准。"))

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
            ["device-center", "kpi-list", "deviceCenter（后续文档）"],
            ["space-center", "kpi-tree-list", "spaceCenter（后续文档）"],
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

    # 4 Data appendix
    parts.append(h2("4. 附录 — Mock 数据"))
    parts.append(h3("4.1 项目中心 rows（节选）"))
    parts.append(table(
        ["项目名称", "类型", "面积", "编码", "全景"],
        [
            ["浦东惠南养护院项目", "公共建筑", "32140", "HNYHY", "5195/否"],
            ["黄浦区机关办公大楼", "公共建筑", "28500", "HBLIC", "2108/是"],
            ["上海生物芯片智慧园区", "园区", "85600", "SWXP", "3201/是"],
        ]
    ))
    parts.append(h3("4.2 模型中心 left.rows"))
    parts.append(p("东楼、西楼、地下室、场地 — 均属浦东惠南养护院项目，园区设施设备=否。"))
    parts.append(h3("4.3 模型中心 right.rows"))
    parts.append(table(
        ["模型名称", "类型", "converted"],
        [
            ["惠南养护院东楼-土建-20250701.rvt", "土建类型", "是"],
            ["惠南养护院东楼-机电-20250701.rvt", "机电类型", "否"],
            ["惠南养护院地下室-土建-20250615.rvt", "土建类型", "是"],
        ]
    ))

    parts.append(h2("5. 原型实现说明"))
    parts.append(table(
        ["项", "状态"],
        [
            ["列表/筛选/分页 UI", "已实现（foundation-platform-views.js）"],
            ["行操作弹窗", "已实现交互占位（点击打开对应弹窗/确认框）"],
            ["真实 API / 文件上传", "未接入，原型 Mock"],
            ["全景子页", "Tab 切换占位"],
            ["地图坐标拾取", "Toast 占位"],
        ]
    ))

    parts.append(p("— 文档结束（后续版本补充：设备中心、空间中心、文档中心、编码中心、系统配置）—"))
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
