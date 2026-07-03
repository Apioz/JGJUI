/* 底座平台 — 页面模板 */
(function injectFpViews() {
  const mount = document.getElementById('fp-views-mount');
  if (!mount) return;

  mount.innerHTML = `
        <!-- 首页 -->
        <template v-if="currentView === 'foundation-home'">
          <div class="fp-home-grid">
            <div v-for="c in pageData.cards" :key="c.label" class="fp-home-card">
              <div class="fp-home-card-icon" :style="{ background: c.color + '18', color: c.color }">
                <span v-html="getMenuIcon(c.icon)"></span>
              </div>
              <div class="fp-home-card-body">
                <div class="fp-home-card-value">{{ c.value }}</div>
                <div class="fp-home-card-label">{{ c.label }}</div>
              </div>
            </div>
          </div>
          <div class="mp-card" style="margin-top:16px">
            <div class="mp-card-header"><span class="mp-card-title">快捷入口</span></div>
            <div class="fp-quick-links">
              <button v-for="item in quickLinks" :key="item.path" class="fp-quick-link" @click="openPageByPath(item.path, item.id, item.label)">{{ item.label }}</button>
            </div>
          </div>
        </template>

        <!-- 通用列表页 -->
        <template v-else-if="pageConfig && (pageConfig.type === 'list' || pageConfig.type === 'simple-list')">
          <div class="mp-module-page">
            <div class="mp-card" v-if="pageData.filters && pageData.filters.length">
              <div class="fp-filter-grid">
                <template v-for="f in pageData.filters" :key="f.key">
                  <label class="mp-filter-label">{{ f.label }}</label>
                  <input v-if="f.type === 'input'" class="mp-input" :class="{ wide: f.wide }" :placeholder="f.placeholder" />
                  <select v-else-if="f.type === 'select'" class="mp-input"><option value="">{{ f.placeholder }}</option><option v-for="o in f.options" :key="o">{{ o }}</option></select>
                  <input v-else-if="f.type === 'daterange'" class="mp-input wide" :placeholder="f.placeholder" />
                </template>
                <div class="fp-filter-actions">
                  <button class="mp-btn primary">查询</button>
                  <button class="mp-btn">{{ pageConfig.type === 'simple-list' ? '清空' : '重置' }}</button>
                </div>
              </div>
            </div>
            <div class="mp-card">
              <div class="fp-toolbar" v-if="pageData.toolbar">
                <div class="fp-toolbar-left">
                  <button v-for="btn in pageData.toolbar" :key="btn.label" class="mp-btn" :class="btn.class">{{ btn.label }}</button>
                </div>
                <div class="fp-table-tools">
                  <button class="fp-tool-btn" title="刷新">↻</button>
                  <button class="fp-tool-btn" title="列设置">☰</button>
                  <button class="fp-tool-btn" title="搜索">⌕</button>
                  <button class="fp-tool-btn" title="全屏">⛶</button>
                </div>
              </div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead><tr>
                    <th v-if="pageConfig.type === 'list'"><input type="checkbox"/></th>
                    <th v-for="col in pageData.columns" :key="col.key">{{ col.label }}</th>
                    <th v-if="pageData.rowActions">操作</th>
                  </tr></thead>
                  <tbody v-if="!pageData.empty && pageData.rows.length">
                    <tr v-for="(row,i) in pageData.rows" :key="i">
                      <td v-if="pageConfig.type === 'list'"><input type="checkbox"/></td>
                      <td v-for="col in pageData.columns" :key="col.key">{{ row[col.key] }}</td>
                      <td v-if="pageData.rowActions" class="mp-actions">
                        <a v-for="act in pageData.rowActions" :key="act" href="#" :class="{ danger: act.includes('删除') || act === '禁用' }">{{ act }}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="pageData.empty || !pageData.rows.length" class="mp-table-empty"><div class="mp-empty-text">暂无数据</div></div>
              </div>
              <div class="mp-pagination" v-if="pageData.total != null">
                <span>共 {{ pageData.total }} 条</span>
                <select class="mp-input sm"><option>10条/页</option><option>20条/页</option></select>
                <span class="fp-page-nav">‹ 1 ›</span>
                <span>前往 <input class="mp-input sm fp-page-jump" value="1"/> 页</span>
              </div>
            </div>
          </div>
        </template>

        <!-- KPI + 列表 -->
        <template v-else-if="pageConfig && pageConfig.type === 'kpi-list'">
          <div class="mp-module-page">
            <div class="fp-kpi-row">
              <div v-for="k in pageData.summary" :key="k.label" class="fp-kpi-card">
                <div class="fp-kpi-label">{{ k.label }}</div>
                <div class="fp-kpi-icon" :style="{ color: k.color }"><span v-html="getMenuIcon(k.icon)"></span></div>
                <div class="fp-kpi-value">{{ k.value }}</div>
              </div>
            </div>
            <div class="mp-card">
              <div class="fp-filter-grid compact">
                <template v-for="f in pageData.filters" :key="f.key">
                  <label class="mp-filter-label">{{ f.label }}</label>
                  <select class="mp-input"><option value="">{{ f.placeholder }}</option><option v-for="o in f.options" :key="o">{{ o }}</option></select>
                </template>
                <div class="fp-filter-actions"><button class="mp-btn primary">搜索</button><button class="mp-btn">重置</button><a href="#" class="fp-expand-link">展开 ▾</a></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="fp-toolbar">
                <div class="fp-toolbar-left"><button v-for="btn in pageData.toolbar" :key="btn.label" class="mp-btn" :class="btn.class">{{ btn.label }}</button></div>
                <div class="fp-table-tools"><button class="fp-tool-btn">↻</button><button class="fp-tool-btn">☰</button><button class="fp-tool-btn">⌕</button><button class="fp-tool-btn">⛶</button></div>
              </div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead><tr><th><input type="checkbox"/></th><th v-for="col in pageData.columns" :key="col.key">{{ col.label }}</th><th>操作</th></tr></thead>
                  <tbody><tr v-for="(row,i) in pageData.rows" :key="i">
                    <td><input type="checkbox"/></td>
                    <td v-for="col in pageData.columns" :key="col.key">{{ row[col.key] }}</td>
                    <td class="mp-actions"><a v-for="act in pageData.rowActions" :key="act" href="#" :class="{ danger: act === '删除' }">{{ act }}</a></td>
                  </tr></tbody>
                </table>
              </div>
              <div class="mp-pagination"><span>共 {{ pageData.total }} 条</span><select class="mp-input sm"><option>10条/页</option></select><span class="fp-page-nav">‹ 1 2 3 4 5 6 … 255 ›</span><span>前往 <input class="mp-input sm fp-page-jump" value="1"/> 页</span></div>
            </div>
          </div>
        </template>

        <!-- KPI + 树形列表 -->
        <template v-else-if="pageConfig && pageConfig.type === 'kpi-tree-list'">
          <div class="mp-module-page">
            <div class="fp-kpi-row cols-5">
              <div v-for="k in pageData.summary" :key="k.label" class="fp-kpi-card sm">
                <div class="fp-kpi-label">{{ k.label }}</div>
                <div class="fp-kpi-icon" :style="{ color: k.color }"><span v-html="getMenuIcon(k.icon)"></span></div>
                <div class="fp-kpi-value">{{ k.value }}</div>
              </div>
            </div>
            <div class="mp-card">
              <div class="fp-filter-grid">
                <template v-for="f in pageData.filters" :key="f.key">
                  <label class="mp-filter-label">{{ f.label }}</label>
                  <input v-if="f.type === 'input'" class="mp-input" :placeholder="f.placeholder" />
                  <select v-else class="mp-input"><option value="">{{ f.placeholder }}</option><option v-for="o in f.options" :key="o">{{ o }}</option></select>
                </template>
                <div class="fp-filter-actions"><button class="mp-btn primary">搜索</button><button class="mp-btn">清空</button><a href="#" class="fp-expand-link">展开 ▾</a></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="fp-toolbar">
                <div class="fp-toolbar-left"><button v-for="btn in pageData.toolbar" :key="btn.label" class="mp-btn" :class="btn.class">{{ btn.label }}</button></div>
                <div class="fp-table-tools"><button class="fp-tool-btn">↻</button><button class="fp-tool-btn">☰</button><button class="fp-tool-btn">⌕</button><button class="fp-tool-btn">⛶</button></div>
              </div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead><tr><th><input type="checkbox"/></th><th v-for="col in pageData.columns" :key="col.key">{{ col.label }}</th><th>操作</th></tr></thead>
                  <tbody><tr v-for="(row,i) in pageData.rows" :key="i">
                    <td><input type="checkbox"/></td>
                    <td v-for="col in pageData.columns" :key="col.key">
                      <span v-if="col.tree" class="fp-tree-name">{{ row.level ? '　' : '' }}{{ row.level ? '└ ' : '▸ ' }}{{ row[col.key] }}</span>
                      <span v-else>{{ row[col.key] }}</span>
                    </td>
                    <td class="mp-actions"><a v-for="act in pageData.rowActions" :key="act" href="#">{{ act }}</a></td>
                  </tr></tbody>
                </table>
              </div>
              <div class="mp-pagination"><span>共 {{ pageData.total }} 条</span></div>
            </div>
          </div>
        </template>

        <!-- 双栏列表（模型中心） -->
        <template v-else-if="pageConfig && pageConfig.type === 'dual-list'">
          <div class="fp-dual-grid">
            <div class="mp-card" v-for="side in ['left','right']" :key="side">
              <div class="fp-panel-filter">
                <label class="mp-filter-label">{{ pageData[side].filterLabel }}</label>
                <input class="mp-input" :placeholder="pageData[side].filterPlaceholder" />
                <button class="mp-btn primary sm">搜索</button>
                <button class="mp-btn sm">清空</button>
              </div>
              <div class="fp-toolbar compact">
                <div class="fp-toolbar-left"><button v-for="btn in pageData[side].toolbar" :key="btn.label" class="mp-btn" :class="btn.class">{{ btn.label }}</button></div>
                <div class="fp-table-tools"><button class="fp-tool-btn">▦</button></div>
              </div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead><tr>
                    <th v-if="side==='left'"><input type="checkbox"/></th>
                    <th v-for="col in pageData[side].columns" :key="col.key">{{ col.label }}</th>
                    <th>操作</th>
                  </tr></thead>
                  <tbody><tr v-for="(row,i) in pageData[side].rows" :key="i">
                    <td v-if="side==='left'"><input type="checkbox"/></td>
                    <td v-for="col in pageData[side].columns" :key="col.key">{{ row[col.key] }}</td>
                    <td class="mp-actions fp-actions-wrap">
                      <template v-if="side==='right'">
                        <a href="#">删除</a><a href="#">编辑</a>
                        <a href="#">{{ row.converted ? '已转换' : '转换' }}</a>
                        <a href="#">上传台账</a>
                        <a href="#">{{ row.converted ? '上传db包(已完成)' : '上传db包' }}</a>
                        <a v-if="row.converted" href="#" class="danger">删除db文件</a>
                      </template>
                      <template v-else>
                        <a v-for="act in pageData[side].rowActions" :key="act" href="#" :class="{ danger: act === '删除' }">{{ act }}</a>
                      </template>
                    </td>
                  </tr></tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <!-- 文档中心 -->
        <template v-else-if="pageConfig && pageConfig.type === 'document'">
          <div class="fp-doc-layout">
            <div class="mp-card fp-doc-sidebar">
              <input class="mp-input" placeholder="请输入内容" style="margin-bottom:12px" />
              <button v-for="p in pageData.projects" :key="p" class="fp-doc-project" :class="{ active: p === pageData.selectedProject }">{{ p }}</button>
            </div>
            <div class="mp-card fp-doc-main">
              <div class="fp-toolbar">
                <div class="fp-toolbar-left"><button v-for="btn in pageData.toolbar" :key="btn.label" class="mp-btn" :class="btn.class">{{ btn.label }}</button>
                  <select class="mp-input sm"><option>请选择</option></select>
                </div>
                <div class="fp-table-tools"><button class="fp-tool-btn">▦</button><button class="fp-tool-btn">☰</button></div>
              </div>
              <div class="mp-table-wrap">
                <table class="mp-table">
                  <thead><tr><th v-for="col in pageData.columns" :key="col.key">{{ col.label }}</th></tr></thead>
                  <tbody v-if="pageData.rows.length"><tr v-for="(row,i) in pageData.rows" :key="i"><td v-for="col in pageData.columns" :key="col.key">{{ row[col.key] }}</td></tr></tbody>
                </table>
                <div v-if="!pageData.rows.length" class="mp-table-empty"><div class="mp-empty-text">暂无数据</div></div>
              </div>
              <div class="mp-pagination"><span>共 {{ pageData.total }} 条</span><select class="mp-input sm"><option>20条/页</option></select><span class="fp-page-nav">‹ 1 ›</span></div>
            </div>
          </div>
        </template>

        <!-- 编码中心 -->
        <template v-else-if="pageConfig && pageConfig.type === 'coding-list'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="fp-filter-grid multi-row">
                <template v-for="f in pageData.filters" :key="f.key">
                  <label class="mp-filter-label">{{ f.label }}</label>
                  <input v-if="f.type === 'input'" class="mp-input" :placeholder="f.placeholder" />
                  <select v-else class="mp-input"><option value="">{{ f.placeholder }}</option><option v-for="o in f.options" :key="o">{{ o }}</option></select>
                </template>
                <div class="fp-filter-actions"><button class="mp-btn primary">搜索</button><button class="mp-btn">清空</button></div>
              </div>
            </div>
            <div class="mp-card">
              <div class="fp-toolbar wrap">
                <div class="fp-toolbar-left"><button v-for="btn in pageData.toolbar" :key="btn.label" class="mp-btn" :class="btn.class">{{ btn.label }}</button></div>
                <div class="fp-table-tools"><button class="fp-tool-btn">↻</button><button class="fp-tool-btn">☰</button><button class="fp-tool-btn">⌕</button><button class="fp-tool-btn">▦</button></div>
              </div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact fp-coding-table">
                  <thead><tr><th v-for="col in pageData.columns" :key="col.key">{{ col.label }}</th><th>操作</th></tr></thead>
                  <tbody><tr v-for="(row,i) in pageData.rows" :key="i">
                    <td v-for="col in pageData.columns" :key="col.key">{{ row[col.key] }}</td>
                    <td class="mp-actions"><a v-for="act in pageData.rowActions" :key="act" href="#" :class="{ danger: act === '删除' }">{{ act }}</a></td>
                  </tr></tbody>
                </table>
              </div>
              <div class="mp-pagination center"><span>共 {{ pageData.total }} 条</span><select class="mp-input sm"><option>显示 10 条</option></select><span class="fp-page-nav">‹ 1 … 10 11 12 … 50 ›</span></div>
            </div>
          </div>
        </template>

        <!-- 树形列表（仓库管理） -->
        <template v-else-if="pageConfig && pageConfig.type === 'tree-list'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="fp-toolbar"><div class="fp-toolbar-left"><button v-for="btn in pageData.toolbar" :key="btn.label" class="mp-btn" :class="btn.class">{{ btn.label }}</button></div></div>
              <div class="mp-table-wrap mp-table-scroll">
                <table class="mp-table mp-table-compact">
                  <thead><tr><th v-for="col in pageData.columns" :key="col.key">{{ col.label }}</th><th>操作</th></tr></thead>
                  <tbody><tr v-for="(row,i) in pageData.rows" :key="i">
                    <td v-for="col in pageData.columns" :key="col.key">
                      <span v-if="col.tree" :style="{ paddingLeft: (row.level || 0) * 20 + 'px' }">{{ row.level ? '└ ' : '▸ ' }}{{ row[col.key] }}</span>
                      <span v-else>{{ row[col.key] }}</span>
                    </td>
                    <td class="mp-actions"><a href="#">编辑</a><a href="#" class="danger">删除</a></td>
                  </tr></tbody>
                </table>
              </div>
              <div class="mp-pagination center"><span>共 {{ pageData.total }} 条</span><select class="mp-input sm"><option>显示 10 条</option></select><span class="fp-page-nav">‹ 1 … 10 11 12 … 50 ›</span></div>
            </div>
          </div>
        </template>

        <!-- 排班表日历 -->
        <template v-else-if="pageConfig && pageConfig.type === 'calendar'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="fp-toolbar">
                <input type="month" class="mp-input" v-model="scheduleMonth" />
                <div class="fp-toolbar-right"><button class="mp-btn">导出</button></div>
              </div>
              <div class="fp-calendar">
                <div class="fp-cal-head"><span v-for="d in weekDays" :key="d">{{ d }}</span></div>
                <div class="fp-cal-grid">
                  <div v-for="(cell,i) in scheduleCalCells" :key="i" class="fp-cal-cell" :class="{ other: cell.otherMonth, today: cell.isToday, selected: cell.selected }">
                    <span class="fp-cal-date">{{ cell.label }}</span>
                    <div class="fp-cal-slot"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
  `;
})();
