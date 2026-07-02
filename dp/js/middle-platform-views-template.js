/* 模块页面 HTML 模板 — 在 Vue mount 前注入 */
(function injectMpViews() {
  const mount = document.getElementById('mp-views-mount');
  if (!mount) return;

  mount.innerHTML = `
        <!-- 数据看板 -->
        <template v-if="currentView === 'dashboard'">
          <div class="mp-dashboard">
            <div class="mp-dash-row mp-dash-row-2">
              <div class="mp-card mp-dash-device">
                <div class="mp-card-header"><span class="mp-card-title">设备状态</span><span class="mp-card-sub">设备总数 {{ dash.deviceStatus.total }}</span></div>
                <div class="mp-dash-device-body">
                  <div id="dashDevicePie" class="mp-dash-chart-sm"></div>
                  <table class="mp-table mp-dash-device-table">
                    <thead><tr><th>状态</th><th>数量</th><th>占比</th></tr></thead>
                    <tbody>
                      <tr v-for="row in dash.deviceStatus.items" :key="row.name">
                        <td><span class="mp-dot" :style="{ background: row.color }"></span>{{ row.name }}</td>
                        <td>{{ row.count }}</td>
                        <td>{{ row.percent }}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="mp-card mp-dash-funcs">
                <div class="mp-card-header"><span class="mp-card-title">常用功能</span></div>
                <div class="mp-func-grid">
                  <button v-for="f in dash.commonFunctions" :key="f.id" class="mp-func-item" @click="navigateToFunction(f)">
                    <span class="mp-func-icon" v-html="getMenuIcon(f.icon)"></span>
                    <span>{{ f.label }}</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="mp-card mp-dash-todo">
              <div class="mp-card-header">
                <span class="mp-card-title">待办事项统计</span>
                <div class="mp-toggle-group sm">
                  <button :class="{ active: dashTodoTab === 'today' }" @click="dashTodoTab = 'today'">今天</button>
                  <button :class="{ active: dashTodoTab === 'week' }" @click="dashTodoTab = 'week'">本周</button>
                  <button :class="{ active: dashTodoTab === 'month' }" @click="dashTodoTab = 'month'">本月</button>
                </div>
              </div>
              <div class="mp-todo-grid">
                <div v-for="cat in dash.todoStats.categories" :key="cat" class="mp-todo-cell">
                  <div class="mp-todo-val">{{ dashTodoCounts[cat] }}</div>
                  <div class="mp-todo-label">{{ cat }}</div>
                </div>
              </div>
            </div>

            <div class="mp-card">
              <div class="mp-card-header"><span class="mp-card-title">报修分类</span></div>
              <div class="mp-dash-repair-classify">
                <div id="dashRepairPie" class="mp-dash-chart-md"></div>
                <div class="mp-repair-cards">
                  <div v-for="c in dash.repairClassify.cards" :key="c.label" class="mp-repair-card" :style="{ borderColor: c.color + '44' }">
                    <div class="mp-repair-card-val" :style="{ color: c.color }">{{ c.value }}</div>
                    <div class="mp-repair-card-label">{{ c.label }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mp-card">
              <div class="mp-card-header">
                <span class="mp-card-title">报修统计</span>
                <div class="mp-toggle-group sm">
                  <button :class="{ active: dashRepairTrend === 'week7' }" @click="setDashRepairTrend('week7')">最近7天</button>
                  <button :class="{ active: dashRepairTrend === 'week30' }" @click="setDashRepairTrend('week30')">最近30天</button>
                  <button :class="{ active: dashRepairTrend === 'year' }" @click="setDashRepairTrend('year')">最近一年</button>
                </div>
              </div>
              <div id="dashRepairTrend" class="mp-dash-chart-lg"></div>
            </div>

            <div class="mp-dash-row mp-dash-row-2">
              <div class="mp-card">
                <div class="mp-card-header">
                  <span class="mp-card-title">维保任务</span>
                  <div class="mp-toggle-group sm">
                    <button v-for="p in taskPeriods" :key="'m-'+p.key" :class="{ active: dashMaintPeriod === p.key }" @click="setDashMaintPeriod(p.key)">{{ p.label }}</button>
                  </div>
                </div>
                <div class="mp-task-panel">
                  <div id="dashMaintPie" class="mp-dash-chart-sm"></div>
                  <div class="mp-gauge-wrap">
                    <div id="dashMaintGauge" class="mp-dash-gauge"></div>
                    <p class="mp-gauge-label">任务完成率</p>
                    <p class="mp-gauge-sub">任务总数: {{ dashMaintSnapshot.total }}</p>
                  </div>
                  <div class="mp-task-status-grid">
                    <div v-for="s in dashMaintSnapshot.statusCounts" :key="s.label" class="mp-task-status" :style="{ borderColor: s.color + '55' }">
                      <div class="mp-task-status-val" :style="{ color: s.color }">{{ s.value }}</div>
                      <div class="mp-task-status-label">{{ s.label }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mp-card">
                <div class="mp-card-header">
                  <span class="mp-card-title">巡检任务</span>
                  <div class="mp-toggle-group sm">
                    <button v-for="p in taskPeriods" :key="'i-'+p.key" :class="{ active: dashInspectPeriod === p.key }" @click="setDashInspectPeriod(p.key)">{{ p.label }}</button>
                  </div>
                </div>
                <div class="mp-task-panel">
                  <div id="dashInspectPie" class="mp-dash-chart-sm"></div>
                  <div class="mp-gauge-wrap">
                    <div id="dashInspectGauge" class="mp-dash-gauge"></div>
                    <p class="mp-gauge-label">任务完成率</p>
                    <p class="mp-gauge-sub">任务总数: {{ dashInspectSnapshot.total }}</p>
                  </div>
                  <table class="mp-table mp-task-table">
                    <thead><tr><th>任务状态</th><th>任务数量</th></tr></thead>
                    <tbody>
                      <tr v-for="s in dashInspectSnapshot.statusCounts" :key="s.label">
                        <td>{{ s.label }}</td><td><strong>{{ s.value }}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="mp-card">
              <div class="mp-card-header">
                <span class="mp-card-title">系统消息</span>
                <div class="mp-toggle-group sm">
                  <button :class="{ active: dashMsgTab === 'all' }" @click="dashMsgTab = 'all'">全部</button>
                  <button :class="{ active: dashMsgTab === 'inspect' }" @click="dashMsgTab = 'inspect'">巡检</button>
                  <button :class="{ active: dashMsgTab === 'idle' }" @click="dashMsgTab = 'idle'">空闲</button>
                </div>
                <button type="button" class="mp-link-btn">查看更多</button>
              </div>
              <div class="mp-table-wrap">
                <table class="mp-table">
                  <thead><tr><th>序号</th><th>消息内容</th><th>类型</th><th>时间</th></tr></thead>
                  <tbody>
                    <tr v-for="(msg, idx) in filteredDashMessages" :key="idx">
                      <td>{{ idx + 1 }}</td><td class="mp-msg-content">{{ msg.content }}</td><td>{{ msg.type }}</td><td>{{ msg.time }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <!-- 停车总览 -->
        <template v-else-if="currentView === 'parking-overview'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid cols-3">
              <div v-for="k in mod.parkingOverview.kpiCards" :key="k.label" class="mp-kpi-card with-icon" :class="{ highlight: k.highlight }">
                <div class="mp-kpi-card-main">
                  <div class="mp-kpi-card-label">{{ k.label }}</div>
                  <div class="mp-kpi-card-value">{{ k.value }}<span v-if="k.unit" class="unit">{{ k.unit }}</span></div>
                  <div v-if="k.trend" class="mp-kpi-trend up">↑ {{ k.trend }}% <small>{{ k.trendLabel }}</small></div>
                </div>
                <div class="mp-kpi-card-icon" :style="{ background: (k.color || '#1890ff') + '18', color: k.color || '#1890ff' }"><span v-html="getMetricIcon(k.icon || 'building')"></span></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-card-header">
                <span class="mp-card-title">车流量趋势</span>
                <div class="mp-toggle-group sm">
                  <button v-for="p in parkingTrendPeriods" :key="p.key" :class="{ active: parkingTrendPeriod === p.key }" @click="setParkingTrend(p.key)">{{ p.label }}</button>
                </div>
              </div>
              <div class="mp-dash-row mp-dash-row-2">
                <div id="parkingTrafficChart" class="mp-dash-chart-lg"></div>
                <div id="parkingTypePie" class="mp-dash-chart-md"></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-card-header"><span class="mp-card-title">历史记录</span></div>
              <div class="mp-filter-bar">
                <label>日期区间</label>
                <input type="date" class="mp-input" v-model="parkingDateStart" />
                <span>—</span>
                <input type="date" class="mp-input" v-model="parkingDateEnd" />
                <button class="mp-btn primary" @click="filterParkingHistory">搜索</button>
                <button class="mp-btn" @click="resetParkingFilter">清空</button>
              </div>
              <div class="mp-table-wrap">
                <table class="mp-table">
                  <thead><tr><th>序号</th><th>入场车辆</th><th>出场车辆</th><th>内部车辆占比</th><th>时间</th></tr></thead>
                  <tbody>
                    <tr v-for="(row, i) in mod.parkingOverview.historyTable.rows" :key="i">
                      <td>{{ row.index || i + 1 }}</td><td>{{ row.entry }}</td><td>{{ row.exit }}</td><td>{{ row.internalRatio }}</td><td>{{ row.time }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <!-- 车闸设备管理 -->
        <template v-else-if="currentView === 'parking-gate-device'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid cols-3">
              <div v-for="k in devicePageSummary" :key="k.label" class="mp-kpi-card with-icon">
                <div class="mp-kpi-card-main"><div class="mp-kpi-card-label">{{ k.label }}</div><div class="mp-kpi-card-value">{{ k.value }}</div></div>
                <div class="mp-kpi-card-icon" :style="{ background: (k.color || '#1890ff') + '18', color: k.color || '#1890ff' }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-filter-bar wrap">
                <select class="mp-input" v-model="deviceFilter.location"><option value="">请选择空间位置</option><option v-for="l in deviceFilterOptions.locations" :key="l" :value="l">{{ l }}</option></select>
                <select class="mp-input" v-model="deviceFilter.deviceAsset"><option value="">请选择设备资产</option><option v-for="a in deviceFilterOptions.deviceAssets" :key="a" :value="a">{{ a }}</option></select>
                <select class="mp-input" v-model="deviceFilter.parkingLot"><option value="">请选择停车场</option><option v-for="p in deviceFilterOptions.parkingLots" :key="p" :value="p">{{ p }}</option></select>
                <input class="mp-input" v-model="deviceFilter.gateDeviceName" placeholder="请输入车闸设备名称" />
              </div>
              <div class="mp-filter-bar wrap">
                <select class="mp-input" v-model="deviceFilter.bindStatus"><option value="">请选择绑定状态</option><option v-for="s in deviceFilterOptions.bindStatuses" :key="s" :value="s">{{ s }}</option></select>
                <button class="mp-btn primary" @click="applyDeviceFilter">搜索</button>
                <button class="mp-btn" @click="resetDeviceFilter">重置</button>
              </div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead><tr><th v-for="h in devicePageColumns" :key="h">{{ h }}</th></tr></thead>
                  <tbody>
                    <tr v-for="(row, i) in pagedDeviceRows" :key="i">
                      <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mp-pagination">
                <span>共 {{ deviceTotal }} 条数据</span>
                <select class="mp-input sm" v-model="devicePageSize"><option :value="10">10条/页</option><option :value="20">20条/页</option></select>
                <div class="mp-page-btns">
                  <button class="mp-btn sm" :disabled="devicePage <= 1" @click="devicePage--">‹</button>
                  <button v-for="p in devicePageList" :key="p" class="mp-btn sm" :class="{ active: p === devicePage }" @click="devicePage = p">{{ p }}</button>
                  <button class="mp-btn sm" :disabled="devicePage >= devicePageMax" @click="devicePage++">›</button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- 通行设备管理 -->
        <template v-else-if="currentView === 'access-device'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid cols-3">
              <div v-for="k in devicePageSummary" :key="k.label" class="mp-kpi-card with-icon">
                <div class="mp-kpi-card-main"><div class="mp-kpi-card-label">{{ k.label }}</div><div class="mp-kpi-card-value">{{ k.value }}</div></div>
                <div class="mp-kpi-card-icon" :style="{ background: (k.color || '#1890ff') + '18', color: k.color || '#1890ff' }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-filter-bar wrap">
                <select class="mp-input" v-model="deviceFilter.location"><option value="">请选择空间位置</option><option v-for="l in deviceFilterOptions.locations" :key="l" :value="l">{{ l }}</option></select>
                <input class="mp-input" v-model="deviceFilter.gateDeviceName" placeholder="请输入人行闸机设备名称" />
                <select class="mp-input" v-model="deviceFilter.entryExitType"><option value="">请选择进出类型</option><option v-for="t in deviceFilterOptions.entryExitTypes" :key="t" :value="t">{{ t }}</option></select>
                <select class="mp-input" v-model="deviceFilter.bindStatus"><option value="">请选择绑定状态</option><option v-for="s in deviceFilterOptions.bindStatuses" :key="s" :value="s">{{ s }}</option></select>
                <button class="mp-btn primary" @click="applyDeviceFilter">搜索</button>
                <button class="mp-btn" @click="resetDeviceFilter">清空</button>
              </div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead><tr><th v-for="h in devicePageColumns" :key="h">{{ h }}</th></tr></thead>
                  <tbody>
                    <tr v-for="(row, i) in pagedDeviceRows" :key="i">
                      <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mp-pagination">
                <span>共 {{ deviceTotal }} 条数据</span>
                <select class="mp-input sm" v-model="devicePageSize"><option :value="10">10条/页</option><option :value="20">20条/页</option></select>
                <div class="mp-page-btns">
                  <button class="mp-btn sm" :disabled="devicePage <= 1" @click="devicePage--">‹</button>
                  <button v-for="p in devicePageList" :key="p" class="mp-btn sm" :class="{ active: p === devicePage }" @click="devicePage = p">{{ p }}</button>
                  <button class="mp-btn sm" :disabled="devicePage >= devicePageMax" @click="devicePage++">›</button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- 监控设备管理 -->
        <template v-else-if="currentView === 'monitor-device'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid cols-5">
              <div v-for="k in mod.monitorDevices.summary" :key="k.label" class="mp-kpi-card with-icon mini">
                <div class="mp-kpi-card-main"><div class="mp-kpi-card-label">{{ k.label }}({{ k.unit }})</div><div class="mp-kpi-card-value">{{ k.value }}</div></div>
                <div class="mp-kpi-card-icon" :style="{ background: (k.color || '#1890ff') + '18', color: k.color || '#1890ff' }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-filter-bar wrap">
                <select class="mp-input" v-model="monitorFilter.location"><option value="">请选择空间位置</option><option v-for="l in monitorFilterOptions.locations" :key="l" :value="l">{{ l }}</option></select>
                <input class="mp-input" v-model="monitorFilter.deviceName" placeholder="请输入监控设备名称" />
                <select class="mp-input" v-model="monitorFilter.monitorStatus"><option value="">请选择监测状态</option><option v-for="s in monitorFilterOptions.monitorStatuses" :key="s" :value="s">{{ s }}</option></select>
                <input class="mp-input" v-model="monitorFilter.protocolType" placeholder="请输入协议类型" />
                <select class="mp-input" v-model="monitorFilter.bindStatus"><option value="">请选择绑定状态</option><option v-for="s in monitorFilterOptions.bindStatuses" :key="s" :value="s">{{ s }}</option></select>
                <button class="mp-btn primary" @click="applyMonitorFilter">搜索</button>
                <button class="mp-btn" @click="resetMonitorFilter">重置</button>
                <button class="mp-btn primary">+ 新增</button>
                <button class="mp-btn warn">导出</button>
              </div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead><tr><th v-for="h in mod.monitorDevices.table.columns" :key="h">{{ h }}</th></tr></thead>
                  <tbody>
                    <tr v-for="(row, i) in filteredMonitorRows" :key="i">
                      <td>{{ row.index }}</td><td>{{ row.spaceCode || '—' }}</td><td>{{ row.spaceLocation || '—' }}</td><td>{{ row.deviceCode || '—' }}</td>
                      <td>{{ row.deviceName || '—' }}</td><td>{{ row.monitorId }}</td><td>{{ row.monitorDeviceName }}</td>
                      <td><span class="mp-tag online">{{ row.monitorStatus }}</span></td><td>{{ row.protocolType || '—' }}</td><td>{{ row.protocolVendor || '—' }}</td>
                      <td>{{ row.connectionMethod || '—' }}</td><td>{{ row.ipAddress || '—' }}</td><td>{{ row.channelNo }}</td>
                      <td class="mp-actions"><a href="#">查看</a><a href="#">编辑</a><a href="#">查看视频</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mp-pagination"><span>共 {{ mod.monitorDevices.table.total }} 条</span></div>
            </div>
          </div>
        </template>

        <!-- 资源监控视图 -->
        <template v-else-if="currentView === 'monitor-resource-view'">
          <div class="mp-module-page">
            <div class="mp-card mp-monitor-view">
              <div class="mp-monitor-toolbar">
                <span>全部监控: {{ mod.monitorResourceView.total }}</span>
                <span class="online">在线 {{ mod.monitorResourceView.online }}</span>
                <span class="offline">离线 {{ mod.monitorResourceView.offline }}</span>
                <input class="mp-input" v-model="monitorSearch" placeholder="搜索监控点" />
                <button class="mp-btn primary" @click="monitorSearch = monitorSearch">查询</button>
                <button class="mp-btn" @click="monitorSearch = ''">重置</button>
                <button class="mp-btn primary">实时监控</button>
              </div>
              <div class="mp-monitor-split">
                <div class="mp-monitor-tree">
                  <mp-tree-node v-for="node in monitorTree" :key="node.id" :node="node" :depth="0" @select="selectedCamera = $event" :selected="selectedCamera"></mp-tree-node>
                </div>
                <div class="mp-monitor-player">
                  <div class="mp-monitor-player-inner"><span class="mp-play-icon">▶</span><p>{{ selectedCamera || '请选择监控点' }}</p></div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- 通行总览 -->
        <template v-else-if="currentView === 'access-overview'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid cols-3">
              <div v-for="k in mod.accessOverview.kpiCards" :key="k.label" class="mp-kpi-card with-icon">
                <div class="mp-kpi-card-main">
                  <div class="mp-kpi-card-label">{{ k.label }}</div>
                  <div class="mp-kpi-card-value">{{ k.value }}<span v-if="k.unit" class="unit">{{ k.unit }}</span></div>
                  <div v-if="k.trend" class="mp-kpi-trend up">↑ {{ k.trend }}% <small>较昨日</small></div>
                </div>
                <div class="mp-kpi-card-icon" :style="{ background: (k.color || '#1890ff') + '18', color: k.color || '#1890ff' }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-card-header"><span class="mp-card-title">今日分时段通行趋势</span></div>
              <div id="accessTrafficChart" class="mp-dash-chart-lg"></div>
            </div>
            <div class="mp-dash-row mp-dash-row-2">
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">通行人员占比分析</span></div><div id="accessPersonPie" class="mp-dash-chart-md"></div></div>
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">部门访客接待排行TOP5</span></div><div id="accessDeptBar" class="mp-dash-chart-md"></div></div>
            </div>
            <div class="mp-card">
              <div class="mp-filter-bar"><label>日期区间</label><input type="date" class="mp-input" /><span>—</span><input type="date" class="mp-input" /><button class="mp-btn primary">搜索</button><button class="mp-btn">清空</button></div>
              <div class="mp-table-wrap"><table class="mp-table"><thead><tr><th>序号</th><th>通行人次</th><th>通行类型</th><th>出入口</th><th>接待部门</th><th>时间</th></tr></thead>
              <tbody><tr v-for="(row,i) in mod.accessOverview.accessTable.rows" :key="i"><td>{{ row.index }}</td><td>{{ row.count }}</td><td>{{ row.accessType }}</td><td>{{ row.entrance }}</td><td>{{ row.department }}</td><td>{{ row.time }}</td></tr></tbody></table></div>
            </div>
          </div>
        </template>

        <!-- 消防统计页（报警/故障） -->
        <template v-else-if="currentView === 'fire-alarm-stats' || currentView === 'fire-fault-stats'">
          <div class="mp-module-page">
            <div class="mp-fire-stats-row">
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">{{ fireStatsLabel }}情况</span></div>
                <div class="mp-fire-circles"><div class="mp-fire-circle pending"><strong>{{ fireStatsData.pending }}</strong><span>待处理</span></div><div class="mp-fire-circle done"><strong>{{ fireStatsData.processed }}</strong><span>已处理</span></div></div>
              </div>
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">{{ fireStatsLabel }}等级占比</span></div><div :id="fireLevelChartId" class="mp-dash-chart-md"></div></div>
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">流程状态统计</span></div><div :id="fireProcessChartId" class="mp-dash-chart-md"></div></div>
            </div>
            <div class="mp-dash-row mp-dash-row-2">
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">频报点位Top5</span></div>
                <table class="mp-table"><thead><tr><th>TOP5</th><th>空间位置</th><th>设备名称</th><th>次数</th></tr></thead>
                <tbody><tr v-for="(row,i) in fireStatsData.top5Table.rows" :key="i"><td><span class="mp-rank-dot" :class="'r'+(i+1)">{{ i+1 }}</span></td><td>{{ row.location }}</td><td>{{ row.deviceName }}</td><td>{{ row.count }}{{ row.unit }}</td></tr></tbody></table>
              </div>
              <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">{{ fireStatsLabel }}趋势图</span>
                <div class="mp-toggle-group sm"><button v-for="p in fireTrendPeriods" :key="p.key" :class="{ active: fireTrendPeriod === p.key }" @click="setFireTrend(p.key)">{{ p.label }}</button></div>
              </div><div :id="fireTrendChartId" class="mp-dash-chart-lg"></div></div>
            </div>
          </div>
        </template>

        <!-- 消防列表页（报警/故障） -->
        <template v-else-if="currentView === 'fire-alarm-list' || currentView === 'fire-fault-list'">
          <div class="mp-module-page">
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">集成数据概览</span></div>
              <div class="mp-kpi-grid cols-3"><div v-for="k in fireListData.summary" :key="k.label" class="mp-kpi-card with-icon">
                <div class="mp-kpi-card-main"><div class="mp-kpi-card-label">{{ k.label }}</div><div class="mp-kpi-card-value">{{ k.value }}</div></div>
                <div class="mp-kpi-card-icon" :style="{ background: (k.color || '#1890ff') + '18', color: k.color || '#1890ff' }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div></div>
            </div>
            <div class="mp-card"><div class="mp-card-header"><span class="mp-card-title">筛选条件</span></div>
              <div class="mp-filter-bar wrap">
                <select class="mp-input" v-model="fireListFilter.status"><option value="">流程状态</option><option v-for="s in fireListStatusOptions" :key="s" :value="s">{{ s }}</option></select>
                <select class="mp-input" v-model="fireListFilter.level"><option value="">报警等级</option><option v-for="l in fireListLevelOptions" :key="l" :value="l">{{ l }}</option></select>
                <input type="datetime-local" class="mp-input" v-model="fireListFilter.start" /><input type="datetime-local" class="mp-input" v-model="fireListFilter.end" />
                <button class="mp-btn primary" @click="applyFireListFilter">查询</button><button class="mp-btn" @click="resetFireListFilter">清空</button>
              </div>
              <div class="mp-table-wrap mp-table-scroll"><table class="mp-table mp-table-compact"><thead><tr><th v-for="h in fireListData.table.columns" :key="h">{{ h }}</th></tr></thead>
              <tbody><tr v-for="(row,i) in fireListData.table.rows" :key="i"><td>{{ row.index }}</td><td>{{ row.deviceName }}</td><td>{{ row.deviceType }}</td><td>{{ row.system }}</td><td>{{ row.location }}</td><td>{{ row.alarmLevel || row.faultLevel }}</td><td>{{ row.alarmDesc || row.faultDesc }}</td><td>{{ row.alarmType || row.faultType }}</td><td>{{ row.processStatus }}</td><td>{{ row.processNote }}</td><td>{{ row.startTime }}</td><td>{{ row.endTime }}</td></tr></tbody></table></div>
            </div>
          </div>
        </template>
  `;
})();
