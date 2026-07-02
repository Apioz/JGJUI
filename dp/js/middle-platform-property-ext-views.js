/* 物业管理扩展 — 页面模板 */
(function injectMpPropertyExtViews() {
  const mount = document.getElementById('mp-views-mount');
  if (!mount) return;

  mount.innerHTML += `

        <!-- 通用数据列表页 -->
        <template v-else-if="pageConfig && pageConfig.type === 'property-list'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="mp-filter-bar wrap">
                <template v-for="f in pageData.filters" :key="f.label">
                  <label v-if="f.label" class="mp-filter-label">{{ f.label }}</label>
                  <input v-if="f.type === 'input'" class="mp-input" :class="{ wide: f.wide }" :placeholder="f.placeholder" />
                  <select v-else-if="f.type === 'select'" class="mp-input"><option value="">{{ f.placeholder }}</option></select>
                  <input v-else-if="f.type === 'daterange'" type="text" class="mp-input" :placeholder="f.placeholder" />
                </template>
                <button class="mp-btn primary">{{ pageData.searchLabel || '搜索' }}</button>
                <button class="mp-btn">{{ pageData.resetLabel || '重置' }}</button>
              </div>
              <div class="mp-filter-bar" v-if="pageData.toolbar && pageData.toolbar.length">
                <button v-for="btn in pageData.toolbar" :key="btn.label" class="mp-btn" :class="btn.class">{{ btn.label }}</button>
              </div>
              <div class="mp-table-wrap" :class="{ 'mp-table-scroll': pageData.columns.length > 8 }">
                <table class="mp-table" :class="{ 'mp-table-compact': pageData.columns.length > 8 }">
                  <thead>
                    <tr>
                      <th><input type="checkbox" /></th>
                      <th v-if="pageData.showProcessIcon"></th>
                      <th v-for="col in pageData.columns" :key="col.key">{{ col.label }}</th>
                      <th v-if="pageData.rowActions">操作</th>
                    </tr>
                  </thead>
                  <tbody v-if="!pageData.empty && pageData.rows.length">
                    <tr v-for="(row, ri) in pageData.rows" :key="ri">
                      <td><input type="checkbox" /></td>
                      <td v-if="pageData.showProcessIcon"><span class="mp-process-icon" v-html="getMetricIcon('flow')"></span></td>
                      <td v-for="col in pageData.columns" :key="col.key">
                        <template v-if="col.type === 'qr' && row.tag === 'qr'">
                          <span class="mp-qr-placeholder"></span>
                        </template>
                        <template v-else-if="col.key === 'status' && row.status === '启用'">
                          <span class="mp-dot green"></span>{{ row.status }}
                        </template>
                        <template v-else>{{ row[col.key] || '—' }}</template>
                      </td>
                      <td v-if="pageData.rowActions" class="mp-actions">
                        <a v-for="act in pageData.rowActions" :key="act" href="#" :class="{ danger: act === '删除' || act === '禁用' }">{{ act }}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="pageData.empty || !pageData.rows.length" class="mp-table-empty">
                  <div class="mp-empty-icon">
                    <svg viewBox="0 0 64 41" width="64"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"/><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"/><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"/></g></g></svg>
                  </div>
                  <div class="mp-empty-text">暂无数据</div>
                </div>
              </div>
              <div class="mp-pagination" v-if="!pageData.empty && pageData.rows.length">
                <span>共 {{ pageData.total }} 条</span>
                <select class="mp-input sm" v-if="pageData.pageSize"><option>{{ pageData.pageSize }}条/页</option><option>10条/页</option></select>
                <select class="mp-input sm" v-else><option>10条/页</option></select>
                <div class="mp-page-btns">
                  <button class="mp-btn sm">‹</button>
                  <button class="mp-btn sm active">1</button>
                  <button v-if="pageData.total > 10" class="mp-btn sm">2</button>
                  <button v-if="pageData.total > 20" class="mp-btn sm">3</button>
                  <button class="mp-btn sm">›</button>
                </div>
                <template v-if="pageData.total <= 10">
                  <span>前往</span><input class="mp-input sm page-jump" value="1" /><span>页</span>
                </template>
              </div>
            </div>
          </div>
        </template>

        <!-- 维保日历 -->
        <template v-else-if="pageConfig && pageConfig.type === 'property-maint-calendar'">
          <div class="mp-module-page">
            <div class="mp-card">
              <div class="mp-maint-cal-toolbar">
                <div class="mp-maint-legend">
                  <span v-for="l in pageData.legend" :key="l.label" class="mp-legend-item">
                    <i class="mp-legend-dot" :style="{ background: l.color }"></i>{{ l.label }}
                  </span>
                </div>
                <button class="mp-btn sm">更多</button>
              </div>
              <div class="mp-maint-cal-header">
                <strong>{{ maintCalYear }} 年 {{ maintCalMonthNum }} 月</strong>
                <div class="mp-cal-nav">
                  <button class="mp-btn sm" @click="shiftMaintCalMonth(-1)">上个月</button>
                  <button class="mp-btn sm" @click="resetMaintCalToday">今天</button>
                  <button class="mp-btn sm" @click="shiftMaintCalMonth(1)">下个月</button>
                </div>
              </div>
              <div class="mp-maint-calendar">
                <div class="mp-cal-head" v-for="w in ['日','一','二','三','四','五','六']" :key="w">{{ w }}</div>
                <div
                  v-for="(cell, i) in maintCalCells"
                  :key="i"
                  class="mp-cal-cell mp-maint-cell"
                  :class="{ other: cell.otherMonth, highlight: cell.highlight }"
                >
                  <div class="mp-cal-date">{{ cell.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
  `;
})();
