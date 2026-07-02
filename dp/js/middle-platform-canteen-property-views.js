/* 食堂管理 & 物业管理 — 页面模板 */
(function injectMpCanteenPropertyViews() {
  const mount = document.getElementById('mp-views-mount');
  if (!mount) return;

  mount.innerHTML += `

        <!-- 智慧卡记录 -->
        <template v-else-if="pageConfig && pageConfig.type === 'canteen-card'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid cols-3">
              <div v-for="k in pageData.summary" :key="k.label" class="mp-kpi-card with-icon">
                <div class="mp-kpi-card-main">
                  <div class="mp-kpi-card-label">{{ k.label }}</div>
                  <div class="mp-kpi-card-value">{{ k.value }}</div>
                  <div class="mp-kpi-trend up"><span v-html="getMetricIcon('trendUp')"></span> {{ k.trend }}% 较昨日</div>
                </div>
                <div class="mp-kpi-card-icon round" :style="{ background: k.color + '18', color: k.color }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-card-header">
                <span class="mp-card-title">消费趋势分析</span>
                <select class="mp-input sm" v-model="canteenTrendPeriod" @change="updateCanteenCardCharts"><option value="week">本周</option><option value="month">本月</option></select>
                <div class="mp-toggle-group sm">
                  <button :class="{ active: canteenTrendMode === 'count' }" @click="setCanteenTrendMode('count')">按人次</button>
                  <button :class="{ active: canteenTrendMode === 'amount' }" @click="setCanteenTrendMode('amount')">按金额</button>
                </div>
              </div>
              <div id="canteenTrendChart" class="mp-dash-chart-lg"></div>
            </div>
            <div class="mp-card">
              <div class="mp-card-header"><span class="mp-card-title">消费记录</span></div>
              <div class="mp-filter-bar wrap">
                <label class="mp-filter-label">日期区间</label>
                <input type="text" class="mp-input" placeholder="开始日期 - 结束日期" />
                <button class="mp-btn primary">查询</button>
                <button class="mp-btn">重置</button>
              </div>
              <div class="mp-table-wrap">
                <table class="mp-table mp-table-nested">
                  <thead>
                    <tr>
                      <th rowspan="2">序号</th><th rowspan="2">所属食堂</th>
                      <th colspan="2">早餐</th><th colspan="2">午餐</th><th colspan="2">晚餐</th>
                      <th rowspan="2">消费总金额</th><th rowspan="2">时间</th>
                    </tr>
                    <tr><th>刷卡人次</th><th>消费总金额</th><th>刷卡人次</th><th>消费总金额</th><th>刷卡人次</th><th>消费总金额</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in pageData.consumptionTable.rows" :key="row.index">
                      <td>{{ row.index }}</td><td>{{ row.canteen }}</td>
                      <td>{{ row.bCount }}</td><td>{{ row.bAmount }}</td>
                      <td>{{ row.lCount }}</td><td>{{ row.lAmount }}</td>
                      <td>{{ row.dCount }}</td><td>{{ row.dAmount }}</td>
                      <td>{{ row.total }}</td><td>{{ row.time }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mp-pagination center">
                <button class="mp-btn sm">‹</button>
                <button v-for="p in [1,2,3,4,5,6]" :key="p" class="mp-btn sm" :class="{ active: p === 1 }">{{ p }}</button>
                <span class="mp-page-ellipsis">…</span>
                <button class="mp-btn sm">100</button>
                <button class="mp-btn sm">›</button>
              </div>
            </div>
          </div>
        </template>

        <!-- 食堂运营 -->
        <template v-else-if="pageConfig && pageConfig.type === 'canteen-operation'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid cols-4">
              <div v-for="k in pageData.summary" :key="k.label" class="mp-kpi-card with-icon">
                <div class="mp-kpi-card-main">
                  <div class="mp-kpi-card-label">{{ k.label }}</div>
                  <div class="mp-kpi-card-value">{{ k.value }}</div>
                  <div class="mp-kpi-trend up"><span v-html="getMetricIcon('trendUp')"></span> {{ k.trend }}% 较昨日</div>
                </div>
                <div class="mp-kpi-card-icon round" :style="{ background: k.color + '18', color: k.color }"><span v-html="getMetricIcon(k.icon)"></span></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-card-header"><span class="mp-card-title">运营明细</span></div>
              <div class="mp-filter-bar wrap mp-filter-right">
                <select class="mp-input sm"><option value="">时段</option><option>早餐</option><option>午餐</option><option>晚餐</option></select>
                <input type="text" class="mp-input" placeholder="开始日期 - 结束日期" />
              </div>
              <div class="mp-table-wrap">
                <table class="mp-table">
                  <thead><tr><th>序号</th><th>预定日期</th><th>餐次</th><th>所属办公点</th><th>就餐人数</th><th>预定数量</th><th>实际就餐数</th></tr></thead>
                  <tbody>
                    <tr v-for="row in pageData.operationTable.rows" :key="row.index">
                      <td>{{ row.index }}</td><td>{{ row.date }}</td><td>{{ row.meal }}</td><td>{{ row.location }}</td>
                      <td>{{ row.diners }}</td><td>{{ row.booked }}</td><td>{{ row.actual }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mp-pagination center">
                <button class="mp-btn sm">‹</button>
                <button v-for="p in [1,2,3,4,5,6]" :key="p" class="mp-btn sm" :class="{ active: p === 1 }">{{ p }}</button>
                <span class="mp-page-ellipsis">…</span><button class="mp-btn sm">100</button><button class="mp-btn sm">›</button>
              </div>
            </div>
            <div class="mp-dash-row mp-dash-row-2">
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title"><span class="mp-title-icon" v-html="getMetricIcon('personnel')"></span>实际就餐数TOP5</span></div>
                <div id="canteenActualTop5" class="mp-dash-chart-md"></div>
              </div>
              <div class="mp-card">
                <div class="mp-card-header"><span class="mp-card-title"><span class="mp-title-icon" v-html="getMetricIcon('inventory')"></span>预订数TOP5</span></div>
                <div id="canteenBookedTop5" class="mp-dash-chart-md"></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-card-header">
                <span class="mp-card-title">本周菜谱管理</span>
                <div class="mp-week-switcher">
                  <button class="mp-btn sm icon" @click="shiftMenuWeek(-1)">‹</button>
                  <span>{{ menuWeekLabel }}</span>
                  <button class="mp-btn sm icon" @click="shiftMenuWeek(1)">›</button>
                </div>
              </div>
              <div class="mp-table-wrap">
                <table class="mp-table mp-menu-grid">
                  <thead><tr><th>餐段</th><th v-for="d in pageData.menu.days" :key="d">{{ d }}</th></tr></thead>
                  <tbody>
                    <tr v-for="meal in pageData.menu.meals" :key="meal.name">
                      <td class="meal-label">{{ meal.name }}</td>
                      <td v-for="(items, di) in meal.items" :key="di">
                        <div class="mp-menu-cell"><span v-for="(item, ii) in items" :key="ii">{{ item }}</span></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <!-- 食堂监管 -->
        <template v-else-if="pageConfig && pageConfig.type === 'canteen-supervision'">
          <div class="mp-module-page">
            <div class="mp-kpi-grid cols-3">
              <div v-for="k in pageData.statusCards" :key="k.label" class="mp-status-card">
                <div class="mp-status-card-icon" :style="{ background: k.color }"><span v-html="getMetricIcon(k.icon || 'shieldCheck')"></span></div>
                <div class="mp-status-card-body">
                  <div class="mp-status-card-label">{{ k.label }}</div>
                  <div class="mp-status-card-value pass">{{ k.value }}</div>
                </div>
              </div>
            </div>
            <div class="mp-card">
              <div class="mp-filter-bar wrap">
                <label class="mp-filter-label">日期区间</label>
                <input type="text" class="mp-input" placeholder="开始日期 - 结束日期" />
                <button class="mp-btn primary">搜索</button>
                <button class="mp-btn">清空</button>
              </div>
              <div class="mp-table-wrap">
                <table class="mp-table">
                  <thead><tr><th>序号</th><th>三清三关状态</th><th>留样菜监测</th><th>晨检结果</th><th>时间</th></tr></thead>
                  <tbody>
                    <tr v-for="row in pageData.table.rows" :key="row.index">
                      <td>{{ row.index }}</td>
                      <td class="mp-text-pass">{{ row.cleanStatus }}</td>
                      <td class="mp-text-pass">{{ row.sampleStatus }}</td>
                      <td class="mp-text-pass">{{ row.morningStatus }}</td>
                      <td>{{ row.time }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mp-pagination center">
                <button class="mp-btn sm">‹</button>
                <button v-for="p in [1,2,3,4,5,6]" :key="p" class="mp-btn sm" :class="{ active: p === 1 }">{{ p }}</button>
                <span class="mp-page-ellipsis">…</span><button class="mp-btn sm">100</button><button class="mp-btn sm">›</button>
              </div>
            </div>
          </div>
        </template>

        <!-- 新增报修 -->
        <template v-else-if="pageConfig && pageConfig.type === 'property-repair-new'">
          <div class="mp-module-page">
            <div class="mp-card mp-form-card" v-if="repairStep === 1">
              <div class="mp-card-header"><span class="mp-card-title">新增报修</span><button class="mp-btn sm">更多</button></div>
              <div class="mp-form-row">
                <label class="mp-form-label required">工单类型</label>
                <select class="mp-input" v-model="repairForm.orderType"><option value="">请选择工单类型</option><option v-for="t in pageData.orderTypes" :key="t" :value="t">{{ t }}</option></select>
              </div>
              <div class="mp-form-row">
                <label class="mp-form-label required">流程类型</label>
                <select class="mp-input" v-model="repairForm.processType"><option value="">请选择流程类型</option><option v-for="t in pageData.processTypes" :key="t" :value="t">{{ t }}</option></select>
              </div>
              <button class="mp-btn primary" @click="goRepairNextStep">+ 下一步</button>
            </div>
            <div class="mp-card mp-form-card wide" v-else>
              <div class="mp-card-header"><span class="mp-card-title">简易工单处理</span></div>
              <div class="mp-form-grid cols-3">
                <div class="mp-form-field"><label class="mp-form-label required">工单来源</label><select class="mp-input" v-model="repairForm.source"><option value="">请选择报修渠道</option><option v-for="s in pageData.sources" :key="s" :value="s">{{ s }}</option></select></div>
                <div class="mp-form-field"><label class="mp-form-label required">问题类型</label><select class="mp-input" v-model="repairForm.problemType"><option value="">请选择问题类型</option><option v-for="s in pageData.problemTypes" :key="s" :value="s">{{ s }}</option></select></div>
                <div class="mp-form-field"><label class="mp-form-label required">紧急程度</label><select class="mp-input" v-model="repairForm.urgency"><option value="">请选择紧急程度</option><option v-for="s in pageData.urgencyLevels" :key="s" :value="s">{{ s }}</option></select></div>
                <div class="mp-form-field"><label class="mp-form-label required">空间位置</label><input class="mp-input" v-model="repairForm.location" placeholder="请输入空间位置" /></div>
                <div class="mp-form-field"><label class="mp-form-label">资产/设备</label><select class="mp-input"><option value="">请选择</option></select></div>
                <div class="mp-form-field"><label class="mp-form-label">报修公司</label><select class="mp-input"><option value="">请选择</option></select></div>
                <div class="mp-form-field"><label class="mp-form-label">报修人</label><input class="mp-input" placeholder="请输入报修人" /></div>
                <div class="mp-form-field"><label class="mp-form-label required">联系方式</label><input class="mp-input" placeholder="请输入联系方式" /></div>
                <div class="mp-form-field"><label class="mp-form-label">预约时间</label><input type="datetime-local" class="mp-input" /></div>
                <div class="mp-form-field mp-form-stack">
                  <div><label class="mp-form-label">报修时间</label><input type="datetime-local" class="mp-input" /></div>
                  <div><label class="mp-form-label">处理类型</label><select class="mp-input"><option value="">请选择处理类型</option><option v-for="s in pageData.handleTypes" :key="s" :value="s">{{ s }}</option></select></div>
                </div>
                <div class="mp-form-field span-1"><label class="mp-form-label required">问题描述</label><textarea class="mp-input mp-textarea" rows="5" placeholder="请输入问题描述"></textarea></div>
                <div class="mp-form-field span-1"><label class="mp-form-label">地址描述</label><textarea class="mp-input mp-textarea" rows="5" placeholder="请输入地址描述"></textarea></div>
              </div>
              <div class="mp-form-field"><label class="mp-form-label">上传附件</label><div class="mp-upload-box"><span>+</span></div></div>
              <div class="mp-form-actions">
                <button class="mp-btn" @click="goRepairBack">返回</button>
                <button class="mp-btn primary">发起</button>
              </div>
            </div>
          </div>
        </template>

        <!-- 物业工作流列表 -->
        <template v-else-if="pageConfig && pageConfig.type === 'property-workflow'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="mp-filter-bar wrap mp-workflow-filters">
                <template v-if="pageConfig.workflowMode === 'todo'">
                  <input class="mp-input" placeholder="工单编号" /><select class="mp-input"><option>当前节点</option></select>
                  <input class="mp-input" placeholder="流程名称" /><input class="mp-input" placeholder="流程标识" />
                  <input class="mp-input" placeholder="流水号" /><input class="mp-input" placeholder="申请人" />
                </template>
                <template v-else-if="pageConfig.workflowMode === 'initiated'">
                  <input class="mp-input" placeholder="工单编号" /><select class="mp-input"><option>当前节点</option></select>
                  <input class="mp-input" placeholder="流程名称" /><select class="mp-input"><option>流程状态</option></select>
                </template>
                <template v-else-if="pageConfig.workflowMode === 'done'">
                  <input class="mp-input" placeholder="工单编号" /><select class="mp-input"><option>操作节点</option></select>
                  <input class="mp-input" placeholder="流水号" /><input class="mp-input" placeholder="流程名称" />
                </template>
                <template v-else>
                  <input class="mp-input" placeholder="工单编号" /><input class="mp-input" placeholder="流程名称" />
                  <input class="mp-input" placeholder="流水号" /><select class="mp-input"><option>流程分类</option></select>
                  <input class="mp-input" placeholder="申请人" /><select class="mp-input"><option>流程状态</option></select>
                </template>
                <button class="mp-btn primary">搜索</button><button class="mp-btn">重置</button>
                <button v-if="pageConfig.workflowMode === 'todo'" class="mp-btn">表单</button>
              </div>
              <div class="mp-category-badges" v-if="pageData.categoryBadges || pageData.statusBadges">
                <button v-for="b in (pageData.categoryBadges || pageData.statusBadges)" :key="b.label" class="mp-cat-badge" :style="{ background: b.color }">{{ b.label }} ({{ b.count }})</button>
              </div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead>
                    <tr v-if="pageConfig.workflowMode === 'todo'">
                      <th><input type="checkbox"/></th><th>工单编号</th><th>当前节点</th><th>流程名称</th><th>流程标识</th><th>流水号</th><th>申请人</th><th>申请时间</th><th>操作</th>
                    </tr>
                    <tr v-else-if="pageConfig.workflowMode === 'initiated'">
                      <th><input type="checkbox"/></th><th>工单编号</th><th>当前节点</th><th>流水号</th><th>流程名称</th><th>流程标识</th><th>流程分类</th><th>当前处理人</th><th>流程状态</th><th>操作</th>
                    </tr>
                    <tr v-else-if="pageConfig.workflowMode === 'done'">
                      <th><input type="checkbox"/></th><th>工单编号</th><th>操作</th><th>流水号</th><th>流程名称</th><th>流程标识</th><th>流程分类</th><th>申请人</th><th>操作时间</th><th>操作</th>
                    </tr>
                    <tr v-else>
                      <th><input type="checkbox"/></th><th>工单编号</th><th>流程名称</th><th>流程标识</th><th>流水号</th><th>流程分类</th><th>当前节点</th><th>申请人</th><th>申请时间</th><th>流程状态</th><th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="pageConfig.workflowMode === 'todo'">
                      <tr v-for="(row,i) in pageData.rows" :key="i">
                        <td><input type="checkbox"/></td><td>{{ row.id }}</td><td>{{ row.node }}</td><td>{{ row.processName }}</td><td>{{ row.processId }}</td><td>{{ row.serial }}</td><td>{{ row.applicant }}</td><td>{{ row.time }}</td>
                        <td class="mp-actions"><a href="#">详情</a><a href="#">流程图</a></td>
                      </tr>
                    </template>
                    <template v-else-if="pageConfig.workflowMode === 'initiated'">
                      <tr v-for="(row,i) in pageData.rows" :key="i">
                        <td><input type="checkbox"/></td><td>{{ row.id }}</td><td>{{ row.node }}</td><td>{{ row.serial }}</td><td>{{ row.processName }}</td><td>{{ row.processId }}</td><td>{{ row.category }}</td><td>{{ row.handler }}</td><td>{{ row.status }}</td>
                        <td class="mp-actions"><a href="#">详情</a><a href="#">流程图</a></td>
                      </tr>
                    </template>
                    <template v-else-if="pageConfig.workflowMode === 'done'">
                      <tr v-for="(row,i) in pageData.rows" :key="i">
                        <td><input type="checkbox"/></td><td>{{ row.id }}</td><td>{{ row.action }}</td><td>{{ row.serial }}</td><td>{{ row.processName }}</td><td>{{ row.processId }}</td><td>{{ row.category }}</td><td>{{ row.applicant }}</td><td>{{ row.time }}</td>
                        <td class="mp-actions"><a href="#">详情</a><a href="#">流程图</a></td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr v-for="(row,i) in pageData.rows" :key="i">
                        <td><input type="checkbox"/></td><td>{{ row.id }}</td><td>{{ row.processName }}</td><td>{{ row.processId }}</td><td>{{ row.serial }}</td><td>{{ row.category }}</td><td>{{ row.node }}</td><td>{{ row.applicant }}</td><td>{{ row.applyTime }}</td><td>{{ row.status }}</td>
                        <td class="mp-actions"><a href="#">详情</a><a href="#">流程图</a></td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <!-- 排班表 -->
        <template v-else-if="pageConfig && pageConfig.type === 'property-schedule-cal'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="mp-filter-bar">
                <input type="month" class="mp-input" v-model="scheduleMonth" />
                <button class="mp-btn mp-btn-right">导出</button>
              </div>
              <div class="mp-schedule-calendar">
                <div class="mp-cal-head" v-for="w in ['日','一','二','三','四','五','六']" :key="w">{{ w }}</div>
                <div v-for="(cell, i) in scheduleCalendarCells" :key="i" class="mp-cal-cell" :class="{ other: cell.otherMonth, today: cell.isToday, selected: cell.selected }">
                  <div class="mp-cal-date">{{ cell.label }}</div>
                  <div v-for="(shift, si) in cell.shifts" :key="si" class="mp-cal-shift">
                    <span class="mp-cal-shift-code">{{ shift.code }}</span>
                    <span class="mp-cal-shift-time">{{ shift.time }}</span>
                    <span class="mp-cal-shift-tag">{{ shift.tag }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- 排班/班次/工作组 CRUD -->
        <template v-else-if="pageConfig && pageConfig.type === 'property-crud-table'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="mp-filter-bar wrap" v-if="pageConfig.crudType === 'schedule'">
                <input class="mp-input" placeholder="请输入排班名称" /><select class="mp-input"><option>请选择排班类型</option></select><select class="mp-input"><option>请选择状态</option></select>
                <button class="mp-btn primary">查询</button><button class="mp-btn">重置</button>
              </div>
              <div class="mp-filter-bar wrap" v-else-if="pageConfig.crudType === 'shift'">
                <input class="mp-input" placeholder="请输入班次名称" /><select class="mp-input"><option>请选择状态</option></select>
                <button class="mp-btn primary">搜索</button><button class="mp-btn">重置</button>
              </div>
              <div class="mp-filter-bar wrap" v-else>
                <input class="mp-input" placeholder="请输入编码" /><input class="mp-input" placeholder="请输入工作组" /><select class="mp-input"><option>请选择状态</option></select>
                <button class="mp-btn primary">搜索</button><button class="mp-btn">重置</button>
              </div>
              <div class="mp-filter-bar">
                <button class="mp-btn primary">+ 新增</button>
                <button v-if="pageConfig.crudType === 'workgroup'" class="mp-btn warn">导出</button>
              </div>
              <div class="mp-table-wrap">
                <table class="mp-table" v-if="pageConfig.crudType === 'schedule'">
                  <thead><tr><th><input type="checkbox"/></th><th>#</th><th>排班名称</th><th>排班类型</th><th>排班周期</th><th>排班人员</th><th>生效时间</th><th>状态</th><th>操作</th></tr></thead>
                  <tbody><tr v-for="row in pageData.rows" :key="row.index"><td><input type="checkbox"/></td><td>{{ row.index }}</td><td>{{ row.name }}</td><td>{{ row.type }}</td><td>{{ row.period }}</td><td>{{ row.staff }}</td><td>{{ row.effective }}</td><td><span class="mp-dot green"></span>{{ row.status }}</td><td class="mp-actions"><a href="#">编辑</a><a href="#">人员设置</a><a class="danger" href="#">禁用</a><a class="danger" href="#">删除</a></td></tr></tbody>
                </table>
                <table class="mp-table" v-else-if="pageConfig.crudType === 'shift'">
                  <thead><tr><th><input type="checkbox"/></th><th>#</th><th>班次名称</th><th>编号</th><th>时段</th><th>备注</th><th>状态</th><th>操作</th></tr></thead>
                  <tbody><tr v-for="row in pageData.rows" :key="row.index"><td><input type="checkbox"/></td><td>{{ row.index }}</td><td>{{ row.name }}</td><td>{{ row.code }}</td><td>{{ row.slot }}</td><td>{{ row.note || '—' }}</td><td><span class="mp-dot green"></span>{{ row.status }}</td><td class="mp-actions"><a href="#">编辑</a><a href="#">删除</a><a class="danger" href="#">禁用</a></td></tr></tbody>
                </table>
                <table class="mp-table" v-else>
                  <thead><tr><th><input type="checkbox"/></th><th>#</th><th>编码</th><th>工作组</th><th>类型</th><th>工作人员</th><th>状态</th><th>操作</th></tr></thead>
                  <tbody><tr v-for="row in pageData.rows" :key="row.index"><td><input type="checkbox"/></td><td>{{ row.index }}</td><td>{{ row.code }}</td><td>{{ row.name }}</td><td>{{ row.type }}</td><td>{{ row.staff }}</td><td><span class="mp-dot green"></span>{{ row.status }}</td><td class="mp-actions"><a href="#">编辑</a><a href="#">删除</a><a href="#">人员设置</a><a class="danger" href="#">禁用</a></td></tr></tbody>
                </table>
              </div>
              <div class="mp-pagination"><span>共 {{ pageData.total }} 条</span><select class="mp-input sm"><option>10条/页</option></select><div class="mp-page-btns"><button class="mp-btn sm">‹</button><button class="mp-btn sm active">1</button><button class="mp-btn sm">›</button></div><span>前往</span><input class="mp-input sm page-jump" value="1" /><span>页</span></div>
            </div>
          </div>
        </template>
  `;
})();
