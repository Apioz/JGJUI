/* 扩展模块页面模板 */
(function injectMpPageViews() {
  const mount = document.getElementById('mp-views-mount');
  if (!mount) return;

  mount.innerHTML += `

        <!-- 通用 KPI 图标卡片 -->
        <!-- 隐患统计 -->
        <template v-else-if="pageConfig && pageConfig.type === 'hazard-stats'">
          <div class="mp-module-page">
            <div class="mp-fire-stats-row">
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">{{ pageData.statsLabel }}情况</span></div>
                <div class="mp-fire-circles"><div class="mp-fire-circle pending clickable" @click="drillDownHazardList('situation', 'pending')"><strong>{{ pageData.pending }}</strong><span>待处理</span></div><div class="mp-fire-circle done clickable" @click="drillDownHazardList('situation', 'processed')"><strong>{{ pageData.processed }}</strong><span>已处理</span></div></div>
              </div>
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">{{ pageData.statsLabel }}等级占比</span></div><div id="hazardLevelChart" class="mp-dash-chart-md"></div></div>
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">处理类型统计</span></div><div id="hazardProcessChart" class="mp-dash-chart-md"></div></div>
            </div>
            <div class="mp-dash-row mp-dash-row-2">
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">{{ pageData.top5Title }}</span></div>
                <table class="mp-table"><thead><tr><th>TOP5</th><th>空间位置</th><th>设备名称</th><th>频报次数</th></tr></thead>
                <tbody><tr v-for="(row,i) in pageData.top5Table.rows" :key="i"><td><span class="mp-rank-dot" :class="'r'+(i+1)">{{ i+1 }}</span></td><td>{{ row.location }}</td><td>{{ row.deviceName }}</td><td>{{ row.count }}{{ row.unit }}</td></tr></tbody></table>
              </div>
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">{{ pageData.trendTitle }}</span>
                <div class="mp-toggle-group sm"><button v-for="p in fireTrendPeriods" :key="p.key" :class="{ active: extTrendPeriod === p.key }" @click="setExtTrend(p.key)">{{ p.label }}</button></div>
              </div><div id="hazardTrendChart" class="mp-dash-chart-lg"></div></div>
            </div>
          </div>
        </template>

        <!-- 隐患列表 -->
        <template v-else-if="pageConfig && pageConfig.type === 'hazard-list'">
          <div class="mp-module-page">
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">集成数据概览</span></div>
              <div class="mp-kpi-grid cols-3"><div v-for="k in pageData.summary" :key="k.label" class="mp-kpi-card with-icon">
                <div class="mp-kpi-card-main"><div class="mp-kpi-card-label">{{ k.label }}</div><div class="mp-kpi-card-value">{{ k.value }}</div></div>
                <div class="mp-kpi-card-icon" :style="{ background: k.color + '18', color: k.color }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div></div>
            </div>
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">筛选条件</span></div>
              <div class="mp-filter-bar wrap">
                <select class="mp-input" v-model="hazardListFilter.status"><option value="">流程状态</option><option v-for="s in pageData.statusOptions" :key="s" :value="s">{{ s }}</option></select>
                <select class="mp-input" v-model="hazardListFilter.level"><option value="">隐患等级</option><option v-for="l in pageData.levelOptions" :key="l" :value="l">{{ l }}</option></select>
                <input type="datetime-local" class="mp-input" v-model="hazardListFilter.start" /><input type="datetime-local" class="mp-input" v-model="hazardListFilter.end" />
                <button class="mp-btn primary" @click="applyHazardListFilter">查询</button><button class="mp-btn" @click="resetHazardListFilter">清空</button>
              </div>
              <div class="mp-table-wrap mp-table-scroll"><table class="mp-table mp-table-compact"><thead><tr><th v-for="h in pageData.table.columns" :key="h">{{ h }}</th></tr></thead>
              <tbody><tr v-for="(row,i) in filteredHazardListRows" :key="i"><td>{{ row.index }}</td><td>{{ row.deviceName }}</td><td>{{ row.deviceType }}</td><td>{{ row.system }}</td><td>{{ row.location }}</td><td>{{ row.level }}</td><td>{{ row.description }}</td><td>{{ row.type }}</td><td>{{ row.status }}</td><td>{{ row.note }}</td><td>{{ row.startTime }}</td><td>{{ row.endTime }}</td></tr></tbody></table></div>
              <div class="mp-pagination"><span>共 {{ filteredHazardListRows.length }} 条</span></div>
            </div>
          </div>
        </template>

        <!-- 消防设备绑定页 -->
        <template v-else-if="pageConfig && pageConfig.type === 'device-bind'">
          <div class="mp-module-page">
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">{{ pageData.overviewTitle || '集成数据概览' }}</span></div>
              <div class="mp-kpi-grid cols-3"><div v-for="k in pageData.summary" :key="k.label" class="mp-kpi-card with-icon">
                <div class="mp-kpi-card-main"><div class="mp-kpi-card-label">{{ k.label }}</div><div class="mp-kpi-card-value">{{ k.value }}</div></div>
                <div class="mp-kpi-card-icon" :style="{ background: k.color + '18', color: k.color }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div></div>
            </div>
            <div class="mp-card">
              <div class="mp-filter-bar wrap">
                <select class="mp-input" v-model="bindFilter.status"><option value="">绑定状态</option><option value="已绑定">已绑定</option><option value="未绑定">未绑定</option></select>
                <button class="mp-btn primary" @click="applyBindFilter">查询</button><button class="mp-btn" @click="resetBindFilter">清空</button>
                <button class="mp-btn primary">关联渠道</button>
                <button class="mp-btn mp-btn-right">导出</button>
              </div>
              <div class="mp-table-wrap mp-table-scroll"><table class="mp-table mp-table-compact"><thead><tr><th><input type="checkbox" /></th><th>序号</th><th>空间编码</th><th>空间位置</th><th>设备编码</th><th>设备名称</th><th>{{ pageData.equipNameCol }}</th><th>{{ pageData.equipIdCol }}</th><th>绑定状态</th><th>操作</th></tr></thead>
              <tbody><tr v-for="(row,i) in filteredBindRows" :key="i"><td><input type="checkbox" /></td><td>{{ row.index }}</td><td>{{ row.spaceCode }}</td><td>{{ row.spaceLocation }}</td><td>{{ row.deviceCode }}</td><td>{{ row.deviceName }}</td><td>{{ row.equipName }}</td><td>{{ row.equipId }}</td><td>{{ row.bindStatus }}</td><td class="mp-actions"><a href="#">查看</a><a href="#">编辑</a></td></tr></tbody></table></div>
              <div class="mp-pagination"><span>共 {{ pageData.total }} 条数据</span><select class="mp-input sm"><option>10条/页</option></select><div class="mp-page-btns"><button class="mp-btn sm">‹</button><button class="mp-btn sm active">2</button><button class="mp-btn sm">›</button></div></div>
            </div>
          </div>
        </template>

        <!-- 消防设备运行状态页 -->
        <template v-else-if="pageConfig && pageConfig.type === 'device-status'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid" :class="pageData.summary.length === 4 ? 'cols-4' : 'cols-3'">
              <div v-for="k in pageData.summary" :key="k.label" class="mp-kpi-card with-icon">
                <div class="mp-kpi-card-main"><div class="mp-kpi-card-label">{{ k.label }}</div><div class="mp-kpi-card-value">{{ k.value }}</div></div>
                <div class="mp-kpi-card-icon" :style="{ background: (k.color || '#1890ff') + '18', color: k.color || '#1890ff' }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-filter-bar wrap">
                <select class="mp-input"><option>{{ pageData.statusMode === 'conn' ? '连接状态' : '设备状态' }}</option></select>
                <select class="mp-input"><option>在线状态</option></select>
                <button class="mp-btn primary">查询</button><button class="mp-btn">清空</button>
                <button class="mp-btn mp-btn-right">导出</button>
              </div>
              <div class="mp-table-wrap mp-table-scroll"><table class="mp-table mp-table-compact"><thead><tr>
                <th>序号</th><th>空间位置</th><th>{{ pageData.equipNameCol }}</th><th>{{ pageData.equipIdCol }}</th><th>设备类型</th><th>位置描述</th>
                <th>{{ pageData.statusMode === 'conn' ? '连接状态' : '设备状态' }}</th><th>在线状态</th><th>{{ pageData.timeCol || '上传时间' }}</th>
              </tr></thead>
              <tbody><tr v-for="(row,i) in pageData.rows" :key="i"><td>{{ row.index }}</td><td>{{ row.location }}</td><td>{{ row.equipName }}</td><td>{{ row.equipId }}</td><td>{{ row.deviceType || '—' }}</td><td>{{ row.locationDesc || '—' }}</td>
              <td>{{ pageData.statusMode === 'conn' ? row.connStatus : row.deviceStatus }}</td><td>{{ row.onlineStatus }}</td><td>{{ row.uploadTime }}</td></tr></tbody></table></div>
              <div class="mp-pagination"><span>共 {{ pageData.total }} 条</span><div class="mp-page-btns"><button class="mp-btn sm">‹</button><button class="mp-btn sm active">2</button><button class="mp-btn sm">›</button></div></div>
            </div>
          </div>
        </template>

        <!-- 人员管理 -->
        <template v-else-if="pageConfig && pageConfig.type === 'personnel'">
          <div class="mp-module-page">
            <div class="mp-dash-row mp-dash-row-2">
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title"><span class="mp-title-icon" v-html="getMetricIcon('personnel')"></span>人员总数统计</span>
                  <div class="mp-toggle-group sm"><button type="button" :class="{ active: personnelPieTab === 'dept' }" @click="setPersonnelPieTab('dept')">单位人员</button><button type="button" :class="{ active: personnelPieTab === 'nature' }" @click="setPersonnelPieTab('nature')">人员性质</button><button type="button" :class="{ active: personnelPieTab === 'cert' }" @click="setPersonnelPieTab('cert')">证件类型</button></div>
                  <select class="mp-input sm" v-model="personnelPieQuarter" @change="setPersonnelPieQuarter(personnelPieQuarter)"><option v-for="q in personnelQuarterOptions" :key="q.value" :value="q.value">{{ q.label }}</option></select>
                </div>
                <div id="personnelDeptPie" class="mp-dash-chart-md"></div>
              </div>
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title"><span class="mp-title-icon" v-html="getMetricIcon('personnel')"></span>人员变化趋势统计</span>
                  <div class="mp-toggle-group sm"><button type="button" :class="{ active: personnelTrendTab === 'dept' }" @click="setPersonnelTrendTab('dept')">单位人员</button><button type="button" :class="{ active: personnelTrendTab === 'nature' }" @click="setPersonnelTrendTab('nature')">人员性质</button><button type="button" :class="{ active: personnelTrendTab === 'cert' }" @click="setPersonnelTrendTab('cert')">证件类型</button></div>
                  <select class="mp-input sm" v-model="personnelTrendQuarter" @change="setPersonnelTrendQuarter(personnelTrendQuarter)"><option v-for="q in personnelQuarterOptions" :key="q.value" :value="q.value">{{ q.label }}</option></select>
                </div>
                <div id="personnelTrendChart" class="mp-dash-chart-lg"></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-card-header"><span class="mp-card-title"><span class="mp-title-icon" v-html="getMetricIcon('personnel')"></span>办证列表统计</span>
                <span class="mp-inline-stat"><span class="mp-title-icon sm" v-html="getMetricIcon('personnel')"></span>办证人员总数 <strong>{{ certDisplayTotal }}</strong></span>
                <div class="mp-toggle-group sm"><button type="button" :class="{ active: certPeriod === 'month' }" @click="setCertPeriod('month')">本月</button><button type="button" :class="{ active: certPeriod === 'quarter' }" @click="setCertPeriod('quarter')">本季</button><button type="button" :class="{ active: certPeriod === 'year' }" @click="setCertPeriod('year')">本年</button></div>
              </div>
              <div class="mp-dash-row mp-dash-row-2">
                <div><div class="mp-subchart-title">办证人员单位统计</div><div id="certDeptPie" class="mp-dash-chart-md"></div></div>
                <div><div class="mp-subchart-title">办证类别统计</div><div id="certTypePie" class="mp-dash-chart-md"></div></div>
              </div>
            </div>
          </div>
        </template>

        <!-- 能耗报表 -->
        <template v-else-if="pageConfig && pageConfig.type === 'energy-report'">
          <div class="mp-module-page mp-energy-report">
            <div class="mp-card mp-energy-split">
              <div class="mp-energy-left">
                <div class="mp-toggle-group sm"><button :class="{ active: energyReportType === 'water' }" @click="energyReportType = 'water'">水</button><button :class="{ active: energyReportType === 'electric' }" @click="energyReportType = 'electric'">电</button></div>
                <div class="mp-toggle-group sm wrap"><button class="active">按物理空间</button><button>按空间分类</button><button>按上下游分类</button><button>按用电类型</button></div>
                <input class="mp-input" placeholder="输入电表名称" />
                <div class="mp-filter-bar wrap"><select class="mp-input"><option>空间分类</option></select><select class="mp-input"><option>上下游</option></select><select class="mp-input"><option>用电类型</option></select></div>
                <label class="mp-check"><input type="checkbox" checked /> 是否级联</label>
                <div class="mp-filter-bar"><button class="mp-btn primary">查询</button><button class="mp-btn">清空</button></div>
                <div class="mp-energy-tree">
                  <mp-tree-node v-for="node in energyReportTree" :key="node.name" :node="node" :depth="0" :selected="''" @select="() => {}"></mp-tree-node>
                </div>
              </div>
              <div class="mp-energy-right">
                <div class="mp-toggle-group sm"><button class="active">实时读数</button><button>历史读数</button><button>手工抄表</button></div>
                <div class="mp-filter-bar wrap"><select class="mp-input"><option>表单类型</option></select><input class="mp-input" placeholder="电表名称" /><button class="mp-btn primary">查询</button><button class="mp-btn">清空</button></div>
                <label class="mp-check"><input type="checkbox" /> 显示抄表详情</label>
                <div class="mp-table-wrap mp-table-scroll"><table class="mp-table mp-table-compact"><thead><tr><th v-for="h in pageData.table.columns" :key="h">{{ h }}</th></tr></thead>
                <tbody><tr v-for="(row,i) in pageData.table.rows" :key="i"><td>{{ row.index }}</td><td>{{ row.location }}</td><td>{{ row.meterName }}</td><td>{{ row.base }}</td><td>{{ row.peak }}</td><td>{{ row.high }}</td><td>{{ row.flat }}</td><td>{{ row.valley }}</td></tr></tbody></table></div>
                <div class="mp-pagination"><span>共 {{ pageData.table.total }} 条</span></div>
              </div>
            </div>
          </div>
        </template>

        <!-- 能耗总览 -->
        <template v-else-if="pageConfig && pageConfig.type === 'energy-overview'">
          <div class="mp-module-page mp-energy-overview-grid">
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">能耗总览</span></div>
              <div class="mp-energy-summary-grid">
                <div class="mp-energy-type-row"><span class="mp-energy-icon electric" v-html="getMetricIcon('energy')"></span><span>电能</span></div>
                <div class="mp-energy-cell today"><div class="mp-energy-cell-label">今日</div><div class="mp-energy-cell-val">{{ pageData.electricity.today }}<small>{{ pageData.electricity.unit }}</small></div></div>
                <div class="mp-energy-cell month"><div class="mp-energy-cell-label">本月</div><div class="mp-energy-cell-val">{{ pageData.electricity.month }}<small>{{ pageData.electricity.unit }}</small></div></div>
                <div class="mp-energy-type-row"><span class="mp-energy-icon water" v-html="getMetricIcon('water')"></span><span>水能</span></div>
                <div class="mp-energy-cell today"><div class="mp-energy-cell-label">今日</div><div class="mp-energy-cell-val">{{ pageData.water.today }}<small>{{ pageData.water.unit }}</small></div></div>
                <div class="mp-energy-cell month"><div class="mp-energy-cell-label">本月</div><div class="mp-energy-cell-val">{{ pageData.water.month }}<small>{{ pageData.water.unit }}</small></div></div>
              </div>
            </div>
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">今日用量趋势</span></div><div id="energyTodayTrend" class="mp-dash-chart-md"></div></div>
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">今日能耗占比</span><span class="mp-card-sub">1级总表数: {{ pageData.level1Meters }}个</span></div><div id="energyRatioPie" class="mp-dash-chart-md"></div></div>
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">能耗日历</span><span>{{ pageData.calendarMonth }}</span></div>
              <div class="mp-energy-calendar"><div class="mp-cal-grid"><div v-for="d in 31" :key="d" class="mp-cal-day" :class="{ active: d === pageData.calendarDay }">{{ d }}</div></div>
              <p class="mp-cal-foot">日合计: {{ pageData.dailyTotal }} kWh · 月合计: {{ pageData.monthlyTotal }} kWh</p></div>
            </div>
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">今日环比分析</span></div>
              <table class="mp-table"><thead><tr><th>名称</th><th>数值</th><th>较昨天</th><th>较去年今天</th></tr></thead>
              <tbody><tr v-for="(row,i) in pageData.compareRows" :key="i"><td>{{ row.name }}</td><td>{{ row.value }}</td><td>{{ row.vsYesterday }}</td><td>{{ row.vsLastYear }}</td></tr></tbody></table>
            </div>
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">今日能耗排名 Top10</span></div>
              <ol class="mp-rank-list"><li v-for="(item,i) in pageData.rankTop10" :key="i"><span>{{ i+1 }}. {{ item.name }}</span><span>{{ item.value }}</span></li></ol>
            </div>
          </div>
        </template>

        <!-- 能源流向 -->
        <template v-else-if="pageConfig && pageConfig.type === 'energy-flow'">
          <div class="mp-module-page">
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">筛选查询</span></div>
              <div class="mp-filter-bar wrap">
                <div class="mp-toggle-group sm"><button>水</button><button class="active">电</button><button>气</button></div>
                <label>时间范围</label><select class="mp-input sm"><option>日</option><option>月</option><option>年</option></select>
                <input type="date" class="mp-input" /><span>—</span><input type="date" class="mp-input" />
                <button class="mp-btn primary">查询</button><button class="mp-btn">重置</button>
              </div>
              <div class="mp-toggle-group sm" style="margin-bottom:12px"><button>按物理空间</button><button class="active">按线路分类</button><button>按用电类型</button></div>
              <div id="energySankeyChart" class="mp-dash-chart-xl"></div>
            </div>
          </div>
        </template>

        <!-- 能耗通用表格页 -->
        <template v-else-if="pageConfig && pageConfig.type === 'energy-table'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid" :class="'cols-' + Math.min(pageData.summary.length, 5)">
              <div v-for="k in pageData.summary" :key="k.label" class="mp-kpi-card with-icon">
                <div class="mp-kpi-card-main"><div class="mp-kpi-card-label">{{ k.label }}</div><div class="mp-kpi-card-value">{{ k.value }}</div></div>
                <div class="mp-kpi-card-icon" :style="{ background: (k.color || '#1890ff') + '18', color: k.color || '#1890ff' }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-filter-bar wrap"><input class="mp-input" placeholder="搜索" /><button class="mp-btn primary">查询</button><button class="mp-btn">清空</button><button class="mp-btn warn">+ 新增</button><button class="mp-btn mp-btn-right">导出</button></div>
              <div class="mp-table-wrap mp-table-scroll"><table class="mp-table mp-table-compact"><thead><tr><th v-for="h in pageData.table.columns" :key="h">{{ h }}</th><th v-if="pageData.table.rows[0] && pageData.table.rows[0].monitorStatus">操作</th></tr></thead>
              <tbody><tr v-for="(row,i) in pageData.table.rows" :key="i">
                <template v-if="pageData.table.columns.includes('建筑名称')">
                  <td>{{ row.index }}</td><td>{{ row.building }}</td><td>{{ row.energyType }}</td><td>{{ row.meterCode }}</td><td>{{ row.meterName }}</td><td>{{ row.meterType }}</td><td>{{ row.meterNo }}</td><td>{{ row.meterFullName }}</td><td>{{ row.serial }}</td><td>{{ row.ratio }}</td><td>{{ row.barcode }}</td><td>{{ row.monitorStatus }}</td><td>{{ row.bindStatus }}</td>
                </template>
                <template v-else-if="pageData.table.columns.includes('电表状态')">
                  <td>{{ row.index }}</td><td>{{ row.name }}</td><td>{{ row.location }}</td><td>{{ row.type }}</td><td>{{ row.status }}</td><td class="mp-actions"><a href="#">查看</a><a href="#">编辑</a><a href="#">删除</a></td>
                </template>
                <template v-else-if="pageData.table.columns.includes('项目类型')">
                  <td>{{ row.index }}</td><td>{{ row.projectType }}</td><td>{{ row.consumeType }}</td><td>{{ row.meterType }}</td><td>{{ row.meterCode }}</td><td>{{ row.meterName }}</td><td>{{ row.serial }}</td><td>{{ row.network || '—' }}</td><td>{{ row.ratio }}</td><td>{{ row.reading }}</td><td>{{ row.status }}</td><td>{{ row.approval }}</td>
                </template>
                <template v-else>
                  <td>{{ row.index }}</td><td>{{ row.location }}</td><td>{{ row.spaceCode }}</td><td>{{ row.spaceType || '—' }}</td><td>{{ row.deviceCode }}</td><td>{{ row.deviceName }}</td><td>{{ row.cabinetId }}</td><td>{{ row.cabinetName }}</td><td><a href="#">{{ row.meterCount }}</a></td><td>{{ row.bindStatus }}</td>
                </template>
              </tr></tbody></table></div>
              <div class="mp-pagination"><span>共 {{ pageData.table.total }} 条</span></div>
            </div>
          </div>
        </template>

        <!-- 上下游关系 -->
        <template v-else-if="pageConfig && pageConfig.type === 'energy-upstream'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid cols-5"><div v-for="k in pageData.summary" :key="k.label" class="mp-kpi-card with-icon lv">
              <div class="mp-kpi-card-main"><div class="mp-kpi-card-label">{{ k.label }}</div><div class="mp-kpi-card-value">{{ k.value }}</div></div>
              <div class="mp-kpi-card-icon round" :style="{ background: k.color + '22', color: k.color }"><span v-html="getMetricIcon(k.icon)"></span></div>
            </div></div>
            <div class="mp-card">
              <div class="mp-filter-bar wrap"><label>能耗设备:</label><select class="mp-input"><option>请选择设备</option></select><button class="mp-btn primary">搜索</button><button class="mp-btn">清空</button></div>
              <div class="mp-filter-bar"><button class="mp-btn primary">单一电源</button><button class="mp-btn">双电源</button><button class="mp-btn primary">+ 新增</button><button class="mp-btn success">下载模板</button><button class="mp-btn warn">导入</button><button class="mp-btn warn mp-btn-right">导出</button></div>
              <div class="mp-table-wrap mp-table-scroll"><table class="mp-table mp-table-compact"><thead><tr><th v-for="h in pageData.table.columns" :key="h">{{ h }}</th></tr></thead>
              <tbody><tr v-for="(row,i) in pageData.table.rows" :key="i"><td>{{ row.index }}</td><td><span class="mp-lv-tag" :class="row.level.toLowerCase()">{{ row.level }}</span></td><td>{{ row.lv1 }}</td><td>{{ row.lv2 }}</td><td>{{ row.lv3 }}</td><td>{{ row.lv4 }}</td><td>{{ row.lv5 }}</td><td>{{ row.note || '—' }}</td><td class="mp-actions"><a href="#">编辑</a><a href="#">删除</a><a href="#">新增子项</a></td></tr></tbody></table></div>
            </div>
          </div>
        </template>

        <!-- 峰谷规则 -->
        <template v-else-if="pageConfig && pageConfig.type === 'energy-simple-table'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="mp-filter-bar wrap"><input class="mp-input" placeholder="请输入方案名称" /><input type="month" class="mp-input" placeholder="开始月份" /><input type="month" class="mp-input" placeholder="结束月份" /><select class="mp-input"><option>请选择状态</option></select><button class="mp-btn primary">查询</button><button class="mp-btn">重置</button></div>
              <div class="mp-filter-bar"><button class="mp-btn primary">+ 新增</button><button class="mp-btn danger">批量删除</button></div>
              <div class="mp-table-wrap"><table class="mp-table"><thead><tr><th><input type="checkbox"/></th><th v-for="h in pageData.table.columns" :key="h">{{ h }}</th></tr></thead>
              <tbody><tr v-for="(row,i) in pageData.table.rows" :key="i"><td><input type="checkbox"/></td><td>{{ row.index }}</td><td>{{ row.name }}</td><td>{{ row.time }}</td><td>{{ row.status }}</td><td>{{ row.createTime }}</td><td class="mp-actions"><a href="#">查看</a><a href="#">编辑</a><a href="#">删除</a></td></tr></tbody></table></div>
              <div class="mp-pagination"><span>共 {{ pageData.table.total }} 条</span></div>
            </div>
          </div>
        </template>

        <!-- 能源类型 -->
        <template v-else-if="pageConfig && pageConfig.type === 'energy-type'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="mp-filter-bar wrap"><input class="mp-input" placeholder="请输入能源类型" /><button class="mp-btn primary">搜索</button><button class="mp-btn">重置</button></div>
              <div class="mp-filter-bar"><div class="mp-toggle-group sm"><button>水</button><button class="active">电</button><button>气</button></div><button class="mp-btn primary">+ 新增</button><button class="mp-btn danger">批量删除</button></div>
              <div class="mp-table-wrap"><table class="mp-table"><thead><tr><th><input type="checkbox"/></th><th>能源类型</th><th>能耗科目</th><th>备注</th><th>更新人</th><th>更新时间</th><th>操作</th></tr></thead>
              <tbody>
                <template v-for="parent in pageData.tree" :key="parent.name">
                  <tr class="mp-tree-row-parent"><td><input type="checkbox"/></td><td><strong>{{ parent.name }}</strong></td><td>{{ parent.subject }}</td><td>—</td><td>—</td><td>{{ parent.updateTime }}</td><td class="mp-actions"><a href="#">查看</a><a href="#">编辑</a><a href="#">删除</a></td></tr>
                  <tr v-for="child in parent.children" :key="child.name" class="mp-tree-row-child"><td><input type="checkbox"/></td><td style="padding-left:28px">{{ child.name }}</td><td>{{ child.subject }}</td><td>—</td><td>—</td><td>{{ child.updateTime }}</td><td class="mp-actions"><a href="#">查看</a><a href="#">编辑</a><a href="#">删除</a></td></tr>
                </template>
              </tbody></table></div>
            </div>
          </div>
        </template>
  `;
})();
