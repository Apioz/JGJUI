/* 环境 / 知识库 / 风险预警 — 页面模板 */
(function injectMpEnvRiskViews() {
  const mount = document.getElementById('mp-views-mount');
  if (!mount) return;

  mount.innerHTML += `

        <!-- 环境设备管理 -->
        <template v-else-if="pageConfig && pageConfig.type === 'env-device-bind'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="mp-card-header"><span class="mp-card-title">{{ pageData.overviewTitle }}</span></div>
              <div class="mp-kpi-grid cols-3">
                <div v-for="k in pageData.summary" :key="k.label" class="mp-kpi-card with-icon">
                  <div class="mp-kpi-card-main"><div class="mp-kpi-card-label">{{ k.label }}</div><div class="mp-kpi-card-value">{{ k.value }}</div></div>
                  <div class="mp-kpi-card-icon round" :style="{ background: k.color + '18', color: k.color }"><span v-html="getMetricIcon(k.icon)"></span></div>
                </div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-filter-bar wrap">
                <select class="mp-input"><option>空间位置</option></select>
                <input class="mp-input" placeholder="设备名称" />
                <input class="mp-input" placeholder="环境设备编号" />
                <input class="mp-input" placeholder="环境设备名称" />
                <select class="mp-input" v-model="bindFilter.status"><option value="">绑定状态</option><option value="已绑定">已绑定</option><option value="未绑定">未绑定</option></select>
                <button class="mp-btn primary" @click="applyBindFilter">查询</button>
                <button class="mp-btn" @click="resetBindFilter">清空</button>
                <button class="mp-btn primary">关联渠道</button>
                <button class="mp-btn mp-btn-right warn outline">导出</button>
              </div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead><tr><th><input type="checkbox"/></th><th>序号</th><th>{{ pageData.spaceCodeCol || '空间编码' }}</th><th>空间位置</th><th>设备编码</th><th>设备名称</th><th>{{ pageData.equipNameCol }}</th><th>{{ pageData.equipIdCol }}</th><th>绑定状态</th><th>操作</th></tr></thead>
                  <tbody><tr v-for="(row,i) in filteredBindRows" :key="i"><td><input type="checkbox" :checked="i===0"/></td><td>{{ row.index }}</td><td>{{ row.spaceCode }}</td><td>{{ row.spaceLocation }}</td><td>{{ row.deviceCode }}</td><td>{{ row.deviceName }}</td><td>{{ row.equipName || '—' }}</td><td>{{ row.equipId || '—' }}</td><td>{{ row.bindStatus }}</td><td class="mp-actions"><a href="#">查看</a><a href="#">编辑</a></td></tr></tbody>
                </table>
              </div>
              <div class="mp-pagination"><span>共 {{ pageData.total }} 条数据</span><select class="mp-input sm"><option>10条/页</option></select><div class="mp-page-btns"><button class="mp-btn sm">‹</button><button class="mp-btn sm">1</button><button class="mp-btn sm active">2</button><button class="mp-btn sm">›</button></div></div>
            </div>
          </div>
        </template>

        <!-- 运行记录 -->
        <template v-else-if="pageConfig && pageConfig.type === 'env-operation'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="mp-card-header"><span class="mp-card-title">运行环境监测</span></div>
              <div class="mp-env-metrics">
                <div v-for="(m,i) in pageData.metrics" :key="i" class="mp-env-metric-card" :style="{ borderTopColor: m.color }">
                  <div class="mp-env-metric-icon" :style="{ color: m.color }"><span v-html="getMetricIcon(m.icon)"></span></div>
                  <div class="mp-env-metric-sub">{{ m.subLabel || m.label }}</div>
                  <div class="mp-env-metric-name" v-if="m.subLabel">{{ m.label }}</div>
                  <div class="mp-env-metric-val">{{ m.value }}</div>
                </div>
              </div>
              <div class="mp-env-chart-toolbar">
                <div class="mp-toggle-group sm">
                  <button v-for="b in pageData.buildings" :key="b" :class="{ active: envBuilding === b }" @click="envBuilding = b">{{ b }}</button>
                </div>
                <input type="text" class="mp-input" value="2023-03-31 ~ 2023-04-01" readonly />
              </div>
              <div class="mp-dash-row mp-dash-row-2">
                <div class="mp-card flat"><div class="mp-subchart-title">温度 (°C)</div><div id="envChartTemp" class="mp-dash-chart-md"></div></div>
                <div class="mp-card flat"><div class="mp-subchart-title">湿度 (%)</div><div id="envChartHumidity" class="mp-dash-chart-md"></div></div>
                <div class="mp-card flat"><div class="mp-subchart-title">PM2.5 (μg/m³)</div><div id="envChartPm25" class="mp-dash-chart-md"></div></div>
                <div class="mp-card flat"><div class="mp-subchart-title">二氧化硫 (PPM)</div><div id="envChartSo2" class="mp-dash-chart-md"></div></div>
              </div>
              <div class="mp-pagination center"><button class="mp-btn sm">‹</button><button v-for="p in [1,2,3,4,5,6]" :key="p" class="mp-btn sm" :class="{ active: p===1 }">{{ p }}</button><span class="mp-page-ellipsis">…</span><button class="mp-btn sm">100</button><button class="mp-btn sm">›</button></div>
            </div>
          </div>
        </template>

        <!-- 告警记录 -->
        <template v-else-if="pageConfig && pageConfig.type === 'env-alarm'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="mp-filter-bar wrap">
                <template v-for="f in pageData.filters" :key="f.label">
                  <label class="mp-filter-label">{{ f.label }}</label>
                  <input v-if="f.type === 'input'" class="mp-input" :placeholder="f.placeholder" />
                  <select v-else-if="f.type === 'select'" class="mp-input"><option>{{ f.defaultVal || f.placeholder }}</option><option>co2超标</option></select>
                  <input v-else type="text" class="mp-input" :placeholder="f.placeholder" />
                </template>
                <button class="mp-btn primary">查询</button><button class="mp-btn">清空</button><button class="mp-btn">导出</button>
              </div>
              <div class="mp-table-wrap">
                <table class="mp-table mp-table-nested">
                  <thead><tr><th v-for="c in pageData.columns" :key="c.key">{{ c.label }}</th></tr></thead>
                  <tbody><tr v-for="row in pageData.rows" :key="row.index"><td v-for="c in pageData.columns" :key="c.key">{{ row[c.key] }}</td></tr></tbody>
                </table>
              </div>
              <div class="mp-pagination center"><button class="mp-btn sm">‹</button><button v-for="p in [1,2,3,4,5,6,7,8,9]" :key="p" class="mp-btn sm" :class="{ active: p===2 }">{{ p }}</button><select class="mp-input sm"><option>10条/页</option></select><span>跳至</span><input class="mp-input sm page-jump" value="5" /><span>页</span></div>
            </div>
          </div>
        </template>

        <!-- 智能体工作台 -->
        <template v-else-if="pageConfig && pageConfig.type === 'knowledge-agent'">
          <div class="mp-module-page mp-knowledge-agent">
            <div class="mp-agent-layout">
              <aside class="mp-agent-sidebar">
                <div class="mp-agent-panel">
                  <div class="mp-agent-panel-title">我的智能体 ({{ pageData.myAgents.length }})</div>
                  <button v-for="id in pageData.myAgents" :key="id" class="mp-agent-nav-item" :class="{ active: selectedAgent === id }" @click="selectedAgent = id">{{ pageData.agents.find(a => a.id === id)?.name }}</button>
                  <button class="mp-agent-nav-item muted">更多</button>
                </div>
                <div class="mp-agent-panel">
                  <div class="mp-agent-panel-title">历史对话 ({{ pageData.historyTotal }})</div>
                  <button v-for="(h,i) in pageData.history" :key="i" class="mp-agent-nav-item">{{ h.title }} <span class="mp-agent-time">{{ h.time }}</span></button>
                </div>
                <div class="mp-agent-panel">
                  <div class="mp-agent-panel-title">我的任务 ({{ pageData.taskTotal }}/{{ pageData.taskTotal }})</div>
                  <div class="mp-agent-empty-task">暂无任务</div>
                </div>
              </aside>
              <main class="mp-agent-main">
                <div class="mp-agent-brand">
                  <div class="mp-agent-logo"><span v-html="getMetricIcon('building')"></span></div>
                  <div class="mp-agent-brand-text">BLM Digital</div>
                </div>
                <div class="mp-agent-cards">
                  <div v-for="a in pageData.agents" :key="a.id" class="mp-agent-card" :class="{ active: selectedAgent === a.id }" @click="selectedAgent = a.id">
                    <div class="mp-agent-card-icon" :style="{ color: a.color }"><span v-html="getMetricIcon(a.icon)"></span></div>
                    <div class="mp-agent-card-name">{{ a.name }}</div>
                  </div>
                </div>
                <p class="mp-agent-hint">请选择对应智能体开启对话</p>
              </main>
            </div>
          </div>
        </template>

        <!-- 风险看板 -->
        <template v-else-if="pageConfig && pageConfig.type === 'risk-dashboard'">
          <div class="mp-module-page mp-risk-dashboard">
            <div class="mp-risk-dash-header">
              <div><h3 class="mp-risk-title">风险看板</h3><p class="mp-risk-sub">实时监测风险态势与热点 · 最近刷新 {{ pageData.refreshTime }}</p></div>
              <div class="mp-risk-filters">
                <div class="mp-toggle-group sm"><button :class="{ active: riskPeriod === 'today' }" @click="riskPeriod = 'today'">今日</button><button :class="{ active: riskPeriod === 'week' }" @click="riskPeriod = 'week'">本周</button><button :class="{ active: riskPeriod === 'month' }" @click="riskPeriod = 'month'">本月</button><button :class="{ active: riskPeriod === 'custom' }" @click="riskPeriod = 'custom'">自定义</button></div>
                <select class="mp-input sm"><option>全部板块</option></select>
                <select class="mp-input sm"><option>全部等级</option></select>
              </div>
            </div>
            <div class="mp-risk-kpi-row">
              <div v-for="k in pageData.kpis" :key="k.label" class="mp-risk-kpi" :style="{ '--accent': k.color }">
                <div class="mp-risk-kpi-icon" :style="{ color: k.color }"><span v-html="getMetricIcon(k.icon)"></span></div>
                <div class="mp-risk-kpi-val" :style="{ color: k.color }">{{ k.value }}</div>
                <div class="mp-risk-kpi-label">{{ k.label }}</div>
                <div class="mp-risk-kpi-sub">{{ k.sub }}</div>
                <div v-if="k.progress" class="mp-risk-progress"><div class="mp-risk-progress-bar" :style="{ width: k.progress + '%', background: k.color }"></div></div>
              </div>
            </div>
            <div class="mp-dash-row mp-dash-row-2">
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title">近7天风险趋势</span><span class="mp-card-note">本周峰值 {{ pageData.trend7.peak }} 起 · 较上周略降</span></div>
                <div id="riskTrendChart" class="mp-dash-chart-lg"></div>
              </div>
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title">风险等级分布</span></div>
                <div id="riskLevelPie" class="mp-dash-chart-lg"></div>
                <div class="mp-risk-level-legend">
                  <span><i class="dot red"></i>高 13.04% · 5分钟</span>
                  <span><i class="dot orange"></i>中 52.18% · 15分钟</span>
                  <span><i class="dot green"></i>低 34.78% · 1小时</span>
                </div>
              </div>
            </div>
            <div class="mp-dash-row mp-dash-row-2">
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title">风险板块分布</span><span class="mp-card-note">总风险较上周 112%</span></div>
                <div id="riskSectorBar" class="mp-dash-chart-md"></div>
              </div>
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title">处置时效分析</span></div>
                <div class="mp-risk-eff-stats">
                  <div v-for="s in pageData.efficiency.stats" :key="s.label" class="mp-risk-eff-stat"><div class="mp-risk-eff-val">{{ s.value }}</div><div class="mp-risk-eff-label">{{ s.label }}</div><div class="mp-risk-eff-trend">{{ s.trend }}</div></div>
                </div>
                <div id="riskEfficiencyBar" class="mp-dash-chart-sm"></div>
              </div>
            </div>
            <div class="mp-dash-row mp-dash-row-2">
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title">高频风险设备/区域 TOP5</span></div>
                <ul class="mp-risk-top5">
                  <li v-for="item in pageData.top5" :key="item.rank"><span class="mp-rank-dot" :class="'r'+item.rank">{{ item.rank }}</span><div class="mp-risk-top5-body"><strong>{{ item.name }}</strong><span class="mp-risk-top5-count">{{ item.count }}次</span><div class="mp-risk-tags"><span v-for="t in item.tags" :key="t" class="mp-risk-tag">{{ t }}</span></div></div></li>
                </ul>
              </div>
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title">最新风险事件</span></div>
                <ul class="mp-risk-events">
                  <li v-for="ev in pageData.latestEvents" :key="ev.id">
                    <div class="mp-risk-ev-head"><span class="mp-risk-ev-time">{{ ev.time }}</span><span class="mp-risk-ev-id">#{{ ev.id }}</span><span class="mp-lv-tag" :class="riskLevelClass(ev.level)">{{ ev.level }}</span></div>
                    <div class="mp-risk-ev-title">{{ ev.title }}</div>
                    <div v-if="ev.detail" class="mp-risk-ev-detail">{{ ev.detail }}</div>
                    <div class="mp-risk-ev-actions"><a href="#">处置</a><a href="#">详情</a></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>

        <!-- 风险数据表格（指标/规则/分类/定时任务） -->
        <template v-else-if="pageConfig && pageConfig.type === 'risk-data-table'">
          <div class="mp-module-page">
            <div class="mp-card">
              <p v-if="pageData.projectNote" class="mp-project-note">{{ pageData.projectNote }}</p>
              <div v-if="pageConfig.tableStyle === 'rules'" class="mp-report-tabs">
                <button :class="{ active: riskRulesTab === 'list' }" @click="riskRulesTab = 'list'">规则列表</button>
                <button :class="{ active: riskRulesTab === 'template' }" @click="riskRulesTab = 'template'">规则模板库</button>
              </div>
              <div v-if="pageConfig.tableStyle === 'schedule'" class="mp-report-tabs">
                <button @click="navigateToView('risk-report-center', 'risk-report-center', 'risk')">报告中心</button>
                <button @click="navigateToView('risk-report-template', 'risk-report-template', 'risk')">模板管理</button>
                <button class="active">定时任务</button>
              </div>
              <div class="mp-filter-bar wrap" v-if="!(pageConfig.tableStyle === 'rules' && riskRulesTab === 'template')">
                <template v-for="f in pageData.filters" :key="f.label">
                  <label class="mp-filter-label">{{ f.label }}</label>
                  <input v-if="f.type === 'input'" class="mp-input" :placeholder="f.placeholder" />
                  <select v-else class="mp-input"><option>{{ f.placeholder }}</option></select>
                </template>
                <button class="mp-btn" :class="pageConfig.tableStyle === 'purple' ? 'purple' : 'primary'">{{ pageConfig.tableStyle === 'purple' ? '查询' : '搜索' }}</button>
                <button class="mp-btn">重置</button>
              </div>
              <div class="mp-filter-bar" v-if="pageData.toolbar && !(pageConfig.tableStyle === 'rules' && riskRulesTab === 'template')">
                <button v-for="btn in pageData.toolbar" :key="btn.label" class="mp-btn" :class="btn.class">{{ btn.label }}</button>
              </div>
              <div class="mp-table-wrap mp-table-scroll" v-if="pageConfig.tableStyle !== 'rules' || riskRulesTab === 'list'">
                <table class="mp-table mp-table-compact">
                  <thead><tr><th><input type="checkbox"/></th><th v-for="c in pageData.columns" :key="c.key">{{ c.label }}</th><th v-if="pageData.rowActions">操作</th></tr></thead>
                  <tbody>
                    <tr v-for="(row, ri) in pageData.rows" :key="ri">
                      <td><input type="checkbox"/></td>
                      <td v-for="c in pageData.columns" :key="c.key">
                        <span v-if="c.type === 'switch'" class="mp-switch" :class="{ on: row.enabled }"></span>
                        <span v-else-if="c.type === 'level'" class="mp-lv-tag" :class="riskLevelClass(row.level)">{{ row.level }}</span>
                        <span v-else-if="c.type === 'tag' && c.key === 'status'" class="mp-tag green">{{ row.status }}</span>
                        <span v-else-if="c.type === 'tag' && c.key === 'source'" class="mp-tag outline">{{ row.source }}</span>
                        <span v-else-if="c.type === 'result'" :class="'mp-result-' + (row.resultType || 'none')">{{ row.result }}</span>
                        <span v-else-if="c.key === 'trial' && row.trial" class="mp-tag warn">{{ row.trial }}</span>
                        <template v-else>{{ row[c.key] }}</template>
                      </td>
                      <td v-if="pageData.rowActions" class="mp-actions wrap">
                        <a v-for="act in pageData.rowActions" :key="act" href="#" :class="{ danger: act === '删除' || act === '停用' }">{{ act }}</a>
                        <a v-for="act in (row.extraActions || [])" :key="act" href="#">{{ act }}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="pageData.empty || !pageData.rows.length" class="mp-table-empty"><div class="mp-empty-text">暂无数据</div></div>
              </div>
              <div v-else class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead><tr><th>模板名称</th><th>所属板块</th><th>关联指标</th><th>表达式</th><th>等级</th><th>操作</th></tr></thead>
                  <tbody><tr v-for="(row,i) in pageData.templates" :key="i"><td>{{ row.name }}</td><td>{{ row.sector }}</td><td>{{ row.indicator }}</td><td>{{ row.expression }}</td><td><span class="mp-lv-tag" :class="riskLevelClass(row.level)">{{ row.level }}</span></td><td class="mp-actions"><a href="#">使用模板</a><a href="#">预览</a></td></tr></tbody>
                </table>
              </div>
              <div class="mp-pagination" v-if="(pageConfig.tableStyle !== 'rules' || riskRulesTab === 'list') && pageData.rows.length"><span>共 {{ pageData.total }} 条</span><select class="mp-input sm"><option>20条/页</option></select><div class="mp-page-btns"><button class="mp-btn sm">‹</button><button class="mp-btn sm active">1</button><button class="mp-btn sm">›</button></div></div>
            </div>
          </div>
        </template>

        <!-- 风险报告 — 报告中心 -->
        <template v-else-if="pageConfig && pageConfig.type === 'risk-report-center'">
          <div class="mp-module-page mp-risk-report">
            <p class="mp-project-note">{{ pageData.projectNote }}</p>
            <div class="mp-report-tabs">
              <button class="active">报告中心</button><button @click="navigateToView('risk-report-template', 'risk-report-template', 'risk')">模板管理</button><button @click="navigateToView('risk-report-schedule', 'risk-report-schedule', 'risk')">定时任务</button>
            </div>
            <div class="mp-report-top-grid">
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title">快速生成</span></div>
                <div class="mp-form-field"><label>报告周期</label><select class="mp-input"><option>周报</option></select></div>
                <div class="mp-form-field"><label>时间范围</label><select class="mp-input"><option>第16周 (04/14-04/20)</option></select></div>
                <div class="mp-form-field"><label>模板</label><select class="mp-input"><option>标准周报模板</option></select></div>
                <div class="mp-form-actions left"><button class="mp-btn primary">生成报告</button><button class="mp-btn">导出</button></div>
              </div>
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title">我的报告</span></div>
                <ul class="mp-report-list"><li v-for="r in pageData.myReports" :key="r.title"><strong>{{ r.title }}</strong><span>{{ r.time }}</span></li></ul>
                <a href="#" class="mp-link">查看全部 / 定位预览</a>
              </div>
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title">定时任务</span></div>
                <ul class="mp-report-list"><li v-for="t in pageData.scheduledPreview" :key="t.name"><span>{{ t.name }}</span><span class="mp-tag" :class="t.status === '启用' ? 'green' : 'gray'">{{ t.status }}</span></li></ul>
                <button class="mp-btn sm">管理任务</button>
              </div>
            </div>
            <div class="mp-card mp-report-preview">
              <div class="mp-report-preview-head">
                <h3>{{ pageData.preview.title }}</h3>
                <div class="mp-form-actions left"><button class="mp-btn sm">导出 PDF</button><button class="mp-btn sm">导出 Excel</button><button class="mp-btn sm">导出 Word</button><button class="mp-btn sm purple">推送</button></div>
                <p class="mp-report-meta">{{ pageData.preview.meta }}</p>
              </div>
              <h4>一、本周风险总览</h4>
              <div class="mp-risk-kpi-row mini">
                <div v-for="o in pageData.preview.overview" :key="o.label" class="mp-risk-kpi mini"><div class="mp-risk-kpi-val">{{ o.value }}</div><div class="mp-risk-kpi-label">{{ o.label }}</div></div>
              </div>
              <h4>二、风险等级分布</h4>
              <div id="riskReportLevelPie" class="mp-dash-chart-md"></div>
              <h4>三、近8周风险趋势</h4>
              <div id="riskReportTrendChart" class="mp-dash-chart-md"></div>
              <h4>四、高风险区域 TOP5</h4>
              <p class="mp-card-note">按本周期内风险事件次数降序；条长表示相对最高频区域的占比。</p>
              <div class="mp-risk-area-bars">
                <div v-for="a in pageData.preview.top5Areas" :key="a.name" class="mp-risk-area-bar"><span class="mp-risk-area-name">{{ a.name }}</span><div class="mp-risk-area-track"><div class="mp-risk-area-fill" :style="{ width: a.pct + '%', background: a.color }"></div></div><span class="mp-risk-area-val">{{ a.count }}次 ({{ a.pct }}%)</span></div>
              </div>
              <h4>未处置风险明细 (示例)</h4>
              <table class="mp-table mp-table-compact"><thead><tr><th>风险事件</th><th>等级</th><th>发生时间</th><th>所属区域</th><th>责任人</th><th>状态</th></tr></thead>
              <tbody><tr v-for="(r,i) in pageData.preview.pendingRows" :key="i"><td>{{ r.event }}</td><td><span class="mp-lv-tag" :class="riskLevelClass(r.level)">{{ r.level }}</span></td><td>{{ r.time }}</td><td>{{ r.area }}</td><td>{{ r.owner }}</td><td>{{ r.status }}</td></tr></tbody></table>
            </div>
          </div>
        </template>

        <!-- 风险报告 — 模板管理 -->
        <template v-else-if="pageConfig && pageConfig.type === 'risk-report-template'">
          <div class="mp-module-page mp-risk-report">
            <p class="mp-project-note">{{ pageData.projectNote }}</p>
            <div class="mp-report-tabs">
              <button @click="navigateToView('risk-report-center', 'risk-report-center', 'risk')">报告中心</button><button class="active">模板管理</button><button @click="navigateToView('risk-report-schedule', 'risk-report-schedule', 'risk')">定时任务</button>
            </div>
            <p class="mp-hint-text">{{ pageData.hint }}</p>
            <div class="mp-filter-bar"><button class="mp-btn purple">{{ pageData.toolbar[0].label }}</button></div>
            <div class="mp-card">
              <table class="mp-table"><thead><tr><th v-for="c in pageData.columns" :key="c.key">{{ c.label }}</th><th>操作</th></tr></thead>
              <tbody><tr v-for="(row,i) in pageData.rows" :key="i"><td v-for="c in pageData.columns" :key="c.key"><span v-if="c.type==='tag'" class="mp-tag" :class="c.key==='status'?'green':'outline'">{{ row[c.key] }}</span><template v-else>{{ row[c.key] }}</template></td><td class="mp-actions"><a href="#" class="purple-link">复制为项目</a></td></tr></tbody></table>
            </div>
          </div>
        </template>
  `;
})();
