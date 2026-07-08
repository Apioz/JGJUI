const { createApp, ref, computed, watch, nextTick, onMounted, onUnmounted } = Vue;

const FP_ICONS = {
  project: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  model: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  device: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>',
  space: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M5 21V7l7-4 7 4v14"/></svg>',
  document: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  coding: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  setting: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
  block: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 5 5-9"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  money: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>',
};

function fpFindLabel(items, targetId) {
  for (const item of items) {
    if (item.id === targetId) return item.label;
    if (item.children) {
      const found = fpFindLabel(item.children, targetId);
      if (found) return found;
    }
  }
  return '';
}

function fpExpandPath(items, targetId, ancestors = []) {
  for (const item of items) {
    if (item.id === targetId) {
      ancestors.forEach((a) => { a.expanded = true; });
      return true;
    }
    if (item.children && fpExpandPath(item.children, targetId, [...ancestors, item])) return true;
  }
  return false;
}

createApp({
  setup() {
    const menuItems = ref(JSON.parse(JSON.stringify(FOUNDATION_PLATFORM_DATA.menuItems)));
    const sidebarCollapsed = ref(false);
    const activeSubId = ref('foundation-home-tab');
    const currentView = ref('foundation-home');
    const platformOpen = ref(false);
    const currentTime = ref('');
    const openTabs = ref([{ id: 'foundation-home-tab', path: 'foundation-home', label: '底座首页', pinned: true }]);
    const scheduleMonth = ref('2025-12');
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

    const pageConfig = computed(() => FP_PAGE_REGISTRY[currentView.value] || null);
    const fpEntityLabel = computed(() => (currentView.value === 'office-mgmt' ? '办公点' : '项目'));
    const pageData = computed(() => {
      if (!pageConfig.value) return null;
      return FP_PAGE_DATA[pageConfig.value.dataKey] || null;
    });

    const pageTitle = computed(() => {
      const tab = openTabs.value.find((t) => t.path === currentView.value);
      return tab?.label || '底座首页';
    });

    const quickLinks = [
      { id: 'project-center', path: 'project-center', label: '项目中心' },
      { id: 'model-center', path: 'model-center', label: '模型中心' },
      { id: 'device-center', path: 'device-center', label: '设备中心' },
      { id: 'coding-center', path: 'coding-center', label: '编码中心' },
    ];

    const scheduleCalCells = computed(() => {
      const highlightDay = pageData.value?.highlightDay || 23;
      const [y, m] = scheduleMonth.value.split('-').map(Number);
      const first = new Date(y, m - 1, 1);
      const startDay = first.getDay();
      const daysInMonth = new Date(y, m, 0).getDate();
      const cells = [];
      const prevMonthDays = new Date(y, m - 1, 0).getDate();
      for (let i = 0; i < startDay; i += 1) {
        const day = prevMonthDays - startDay + i + 1;
        const pm = m === 1 ? 12 : m - 1;
        cells.push({ label: `${String(pm).padStart(2, '0')}/${String(day).padStart(2, '0')}`, otherMonth: true, isToday: false, selected: false });
      }
      for (let day = 1; day <= daysInMonth; day += 1) {
        cells.push({
          label: `${String(m).padStart(2, '0')}/${String(day).padStart(2, '0')}`,
          otherMonth: false,
          isToday: y === 2025 && m === 12 && day === highlightDay,
          selected: y === 2025 && m === 12 && day === highlightDay,
        });
      }
      const remain = 7 - (cells.length % 7);
      if (remain < 7) {
        for (let day = 1; day <= remain; day += 1) {
          const nm = m === 12 ? 1 : m + 1;
          cells.push({ label: `${String(nm).padStart(2, '0')}/${String(day).padStart(2, '0')}`, otherMonth: true, isToday: false, selected: false });
        }
      }
      return cells;
    });

    function getMenuIcon(name) {
      return FP_ICONS[name] || FP_ICONS.project;
    }

    function isSubActive(id) {
      return activeSubId.value === id;
    }

    function toggleMenu(item) {
      if (item.path) {
        openPageByPath(item.path, item.id, item.label);
        return;
      }
      if (item.children) item.expanded = !item.expanded;
    }

    function toggleNavGroup(group) {
      group.expanded = !group.expanded;
    }

    function openPageByPath(path, id, label) {
      const tabId = `${id}-tab`;
      currentView.value = path;
      fpExpandPath(menuItems.value, id);
      const exists = openTabs.value.find((t) => t.path === path);
      if (!exists) {
        openTabs.value.push({ id: tabId, path, label });
      }
      activeSubId.value = exists ? exists.id : tabId;
    }

    function selectMenuLeaf(_parent, leaf) {
      openPageByPath(leaf.path, leaf.id, leaf.label);
    }

    function switchTab(tab) {
      currentView.value = tab.path;
      activeSubId.value = tab.id;
    }

    function closeTab(tab) {
      if (tab.pinned) return;
      const idx = openTabs.value.findIndex((t) => t.id === tab.id);
      if (idx < 0) return;
      openTabs.value.splice(idx, 1);
      if (activeSubId.value === tab.id) {
        const next = openTabs.value[Math.max(0, idx - 1)] || openTabs.value[0];
        if (next) switchTab(next);
      }
    }

    function togglePlatform() {
      platformOpen.value = !platformOpen.value;
    }

    function closeDropdowns() {
      platformOpen.value = false;
    }

    function navigateToPlatform(url) {
      platformOpen.value = false;
      window.location.href = url;
    }

    function toggleSidebar() {
      sidebarCollapsed.value = !sidebarCollapsed.value;
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    }

    function updateClock() {
      const now = new Date();
      currentTime.value = now.toLocaleString('zh-CN', { hour12: false });
    }

    let clockTimer;
    onMounted(() => {
      updateClock();
      clockTimer = setInterval(updateClock, 1000);
    });
    onUnmounted(() => clearInterval(clockTimer));

    const projectTypes = ['公共建筑', '园区', '商业综合体', '租赁房|办公楼|住宅'];
    const modelTypes = ['土建类型', '机电类型', '安防类型', '精装类型', '总体类型'];
    const codingFields = ['ID', 'CODE', 'CODE_EN', 'LV1', 'LV2', 'LV3_CN', 'LV4', 'Description', '备注'];
    const codingCategories = ['设备', '空间', '建筑', '场地'];
    const assetTree = [
      { label: '建筑', children: [
        { label: '场地', children: [
          { label: '道路' }, { label: '湖泊' }, { label: '桥' }, { label: '绿化带' },
          { label: '停车场', children: [{ label: '地桩' }, { label: '减速带' }] },
          { label: '岗亭' },
          { label: '标识牌', children: [{ label: '展示板' }, { label: '企业logo' }] },
          { label: '码头', children: [{ label: '栈道' }] },
        ]},
      ]},
    ];
    const docFolders = ['浦东惠南养护院项目', '浦东学校项目'];
    const spaceTypes = ['办公室', '会议室', '设备用房', '公共空间'];
    const deviceCategories = ['绿化带', '监控设备', '消防设备', '暖通设备'];
    const ledgerTabs = ['空间模版', '设备模版', '电力模版', '其他模版'];
    const panoramaTabs = ['详情', '数据', '管理', '组织'];
    const managerOptions = ['李四', '王五', '赵六', 'admin'];
    const scheduleTypes = ['日', '周', '月'];
    const workgroupTypes = ['维修', '巡检', '保洁', '安保'];
    const warehouseTree = [
      { label: '顶级', children: [
        { label: '一楼仓库', children: [
          { label: '仓库六' }, { label: '仓库五' }, { label: '仓库四' },
          { label: '仓库1-1', children: [{ label: '101仓库' }] },
        ]},
      ]},
    ];
    const fpStaffPool = [
      { id: 1, name: '管理员1', dept: '生物芯片', group: '—', phone: '18613211234' },
      { id: 2, name: '白铖', dept: '生物芯片', group: '—', phone: '13800138001' },
      { id: 3, name: '沈旭光', dept: '生物芯片', group: '—', phone: '13800138002' },
      { id: 4, name: '小贺', dept: '生物芯片', group: '—', phone: '13800138003' },
      { id: 5, name: '周凯', dept: '生物芯片', group: '—', phone: '13800138004' },
      { id: 6, name: '陈明', dept: '生物芯片', group: '—', phone: '13800138005' },
      { id: 7, name: '刘洋', dept: '生物芯片', group: '—', phone: '13800138006' },
      { id: 8, name: '张华', dept: '生物芯片', group: '—', phone: '13800138007' },
      { id: 9, name: 'DQ', dept: '生物芯片', group: '—', phone: '18613211235' },
      { id: 10, name: '林峰', dept: '生物芯片', group: '—', phone: '13800138008' },
      { id: 11, name: '黄伟', dept: '生物芯片', group: '—', phone: '13800138009' },
    ];
    const staffDepts = ['生物芯片'];
    const channelModules = ['门禁', '监控', '消防', '能耗', '停车'];
    const channelNamesByModule = {
      门禁: ['海康威视', '大华', '宇视'],
      监控: ['海康威视', '大华'],
      消防: ['海湾', '北大青鸟'],
      能耗: ['施耐德', 'ABB'],
      停车: ['捷顺', '立方'],
    };
    const supplierFormOptions = FP_PAGE_DATA.supplierFormOptions || { enterpriseTypes: [], industryCategories: [] };
    const supplierImportTemplate = FP_PAGE_DATA.supplierImportTemplate;
    const officePersonnelOptions = FP_PAGE_DATA.officePersonnelOptions || { tenants: [], offices: [], depts: [], positions: [], statuses: [] };
    const deptMgmtOptions = FP_PAGE_DATA.deptMgmtOptions || { tenants: [], deptTypes: [] };
    const positionMgmtOptions = FP_PAGE_DATA.positionMgmtOptions || { tenants: [], positionTypes: [] };
    const userMgmtOptions = FP_PAGE_DATA.userMgmtOptions || { tenants: [], platforms: [], roles: [], depts: [], positions: [], genders: [] };

    function blankCodingForm(row) {
      return {
        category: row?.category || '设备',
        id: row?.id || '',
        parentCode: '',
        code: row?.code || '',
        codeEn: row?.codeEn || '',
        lv1: row?.lv1 || '',
        lv2: row?.lv2 || '',
        lv3: row?.lv3 || '',
        lv4: row?.lv4 || '',
        desc: row?.desc === '—' ? '' : (row?.desc || ''),
        note: row?.note === '—' ? '' : (row?.note || ''),
      };
    }

    function blankSpaceForm() {
      return {
        projectName: '浦东学校项目',
        elementId: '',
        buildingCode: '',
        floorCode: '',
        useUnit: '',
        spaceStatus: '',
        area: '0',
        spaceType: '办公室',
        buildingName: '',
        floor: '',
        spaceName: '',
        spaceUsage: '',
        spaceCategory: '办公空间',
      };
    }

    function blankDeviceAddForm() {
      return { projectName: '浦东学校项目', category: '', elementId: '' };
    }

    function blankDeviceEditForm(row) {
      return {
        projectName: '浦东学校项目',
        category: row?.spaceCategory || '',
        spaceLocation: row?.location || '',
        unitName: row?.unitName || '',
        floor: '1F',
        location: row?.location || '',
        roomCode: row?.spaceCode || '',
        serviceArea: '',
        deviceName: row?.deviceName || '',
        deviceType: '',
        designCode: '',
        deviceCode: '',
      };
    }

    const fpFilterExpanded = ref(false);
    const fpPage = ref(1);
    const fpPageSize = ref(10);
    const fpPageJump = ref(1);
    const fpTreeExpanded = ref({});
    const fpUserAuditMode = ref(false);
    const fpUserTreeFilter = ref('');
    const fpUserSidebarExpanded = ref({});
    const fpUserSelectedOrg = ref('');

    function fpRowHasChildren(row) {
      const pd = pageData.value;
      if (!pd?.rows || !row?.id) return false;
      if (row.hasChildren) return true;
      return pd.rows.some((r) => r.parentId === row.id);
    }

    function isTreeRowVisible(row, rows, expanded) {
      if (!row.parentId) return true;
      let pid = row.parentId;
      while (pid) {
        if (!expanded[pid]) return false;
        const parent = rows.find((r) => r.id === pid);
        pid = parent?.parentId || null;
      }
      return true;
    }

    function fpToggleTreeRow(row) {
      if (!row?.id || !fpRowHasChildren(row)) return;
      fpTreeExpanded.value = {
        ...fpTreeExpanded.value,
        [row.id]: !fpTreeExpanded.value[row.id],
      };
    }

    function fpResetTreeExpanded() {
      fpTreeExpanded.value = {};
    }
    const fpPageSizeOptions = [10, 20, 50, 100];

    function fpParsePageSize(label) {
      if (typeof label === 'number') return label;
      const m = String(label || '').match(/(\d+)/);
      return m ? parseInt(m[1], 10) : 10;
    }

    function fpResetPagination() {
      fpPage.value = 1;
      fpPageJump.value = 1;
      const pd = pageData.value;
      if (pd?.pageSize) fpPageSize.value = fpParsePageSize(pd.pageSize);
      else fpPageSize.value = 10;
    }

    watch(currentView, () => {
      fpFilterExpanded.value = false;
      fpResetTreeExpanded();
      fpUserAuditMode.value = false;
      fpUserTreeFilter.value = '';
      fpUserSidebarExpanded.value = {};
      fpUserSelectedOrg.value = '';
      fpResetPagination();
    });

    const fpPagination = computed(() => {
      const pd = pageData.value;
      if (!pd) return { total: 0, page: 1, pages: 1, size: fpPageSize.value };
      const isTreeList = pageConfig.value?.type === 'tree-list';
      const visibleCount = isTreeList && pd.rows?.length
        ? pd.rows.filter((row) => isTreeRowVisible(row, pd.rows, fpTreeExpanded.value)).length
        : null;
      const total = visibleCount != null ? visibleCount : (pd.total != null ? pd.total : (pd.rows?.length || 0));
      const size = fpPageSize.value;
      const pages = Math.max(1, Math.ceil(total / size));
      const page = Math.min(Math.max(1, fpPage.value), pages);
      return { total, page, pages, size };
    });

    const fpPaginationVisible = computed(() => {
      const pd = pageData.value;
      return pd != null && pd.total != null && pd.total > 0;
    });

    function fpBuildDisplayRow(seed, globalIndex) {
      const row = { ...seed, _fpKey: globalIndex };
      if (row.index != null) row.index = globalIndex + 1;
      return row;
    }

    const fpDisplayRows = computed(() => {
      const pd = pageData.value;
      if (!pd?.rows?.length) return [];
      const isTreeList = pageConfig.value?.type === 'tree-list';
      const sourceRows = isTreeList
        ? pd.rows.filter((row) => isTreeRowVisible(row, pd.rows, fpTreeExpanded.value))
        : pd.rows;
      const { page, size } = fpPagination.value;
      const effectiveTotal = isTreeList ? sourceRows.length : fpPagination.value.total;
      const start = (page - 1) * size;
      const count = Math.min(size, Math.max(0, effectiveTotal - start));
      const result = [];
      for (let i = 0; i < count; i += 1) {
        const seed = sourceRows[start + i];
        if (!seed) break;
        result.push(fpBuildDisplayRow(seed, start + i));
      }
      return result;
    });

    const fpPageNumbers = computed(() => {
      const { page, pages } = fpPagination.value;
      if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
      const nums = [1];
      if (page > 3) nums.push('…');
      const from = Math.max(2, page - 1);
      const to = Math.min(pages - 1, page + 1);
      for (let p = from; p <= to; p += 1) nums.push(p);
      if (page < pages - 2) nums.push('…');
      if (pages > 1) nums.push(pages);
      return nums;
    });

    function fpGoPage(n) {
      if (n === '…' || n == null) return;
      const pages = fpPagination.value.pages;
      const next = Math.min(Math.max(1, Number(n)), pages);
      fpPage.value = next;
      fpPageJump.value = next;
    }

    function fpJumpToPage() {
      fpGoPage(fpPageJump.value);
    }

    function fpOnPageSizeChange() {
      fpPage.value = 1;
      fpPageJump.value = 1;
    }

    watch(fpPagination, (p) => {
      if (fpPage.value !== p.page) {
        fpPage.value = p.page;
        fpPageJump.value = p.page;
      }
    });

    const fpCascaderOpen = ref(false);
    const fpCascaderCols = ref([]);
    const fpStaffPage = ref(1);
    const fpStaffPageSize = ref(10);

    function initWarehouseCascader(path) {
      fpCascaderCols.value = [warehouseTree];
      fpCascaderOpen.value = false;
      if (path) {
        return { parentPath: path, parentLabels: path.split('/') };
      }
      return { parentPath: '', parentLabels: [] };
    }

    function fpPickCascader(colIdx, node) {
      fpForm.value.parentLabels = fpForm.value.parentLabels.slice(0, colIdx);
      fpForm.value.parentLabels.push(node.label);
      fpForm.value.parentPath = fpForm.value.parentLabels.join('/');
      if (node.children) {
        fpCascaderCols.value = fpCascaderCols.value.slice(0, colIdx + 1);
        fpCascaderCols.value.push(node.children);
      } else {
        fpCascaderOpen.value = false;
      }
    }

    function blankWarehouseForm(row) {
      const casc = initWarehouseCascader(row?.parentPath);
      return {
        name: row?.name || '仓库六',
        parentPath: casc.parentPath || '顶级/一楼仓库/仓库1-1/101仓库',
        parentLabels: casc.parentLabels.length ? casc.parentLabels : ['顶级', '一楼仓库', '仓库1-1', '101仓库'],
        manager: row?.manager || '李四',
        note: row?.note === '—' ? '' : (row?.note || ''),
      };
    }

    function parseShiftPeriod(period) {
      if (!period || period === '—') return [{ start: '', end: '' }];
      const [start, end] = period.split('-');
      return [{ start: (start || '').slice(0, 5), end: (end || '').slice(0, 5) }];
    }

    function blankShiftForm(row) {
      return {
        name: row?.name || '',
        periods: row?.period ? parseShiftPeriod(row.period) : [{ start: '', end: '' }],
        note: row?.note === '—' ? '' : (row?.note || ''),
      };
    }

    function fpAddShiftPeriod() {
      fpForm.value.periods.push({ start: '', end: '' });
    }

    function fpRemoveShiftPeriod(i) {
      fpForm.value.periods.splice(i, 1);
    }

    function makeScheduleWeek(restOnly) {
      return Array.from({ length: 7 }, (_, di) => {
        if (restOnly) return { label: '休息', time: '' };
        if (di === 0 || di === 3) return { label: '巡检', time: '09:00:00-11:30:00' };
        return { label: '休息', time: '' };
      });
    }

    function blankScheduleForm(row) {
      const cycle = parseInt(row?.cycle || '2', 10) || 2;
      return {
        name: row?.name || '',
        type: row?.type || '周',
        cycle: String(row?.cycle || '2'),
        cycleUnit: '周',
        effective: row?.effective || '',
        weeks: Array.from({ length: cycle }, (_, i) => makeScheduleWeek(false)),
      };
    }

    function blankWorkgroupForm(row) {
      return {
        name: row?.name || '',
        type: row?.type || '',
        note: row?.note === '—' ? '' : (row?.note || ''),
      };
    }

    function openStaffSettings(row) {
      fpStaffPage.value = 1;
      fpForm.value = {
        deptFilter: '',
        nameFilter: '',
        selectedIds: [],
        chosen: row?.staffList || [{ id: 9, name: 'DQ', phone: '18613211235' }],
      };
      fpModal.value = { type: 'staff-settings', title: '工作人员', row, wide: true, xl: true, saveLabel: '保存' };
    }

    const fpStaffPages = computed(() => Math.max(1, Math.ceil(fpStaffPool.length / fpStaffPageSize.value)));

    const fpStaffLeftRows = computed(() => {
      const start = (fpStaffPage.value - 1) * fpStaffPageSize.value;
      return fpStaffPool
        .filter((s) => (!fpForm.value.deptFilter || s.dept === fpForm.value.deptFilter))
        .filter((s) => !fpForm.value.nameFilter || s.name.includes(fpForm.value.nameFilter))
        .slice(start, start + fpStaffPageSize.value);
    });

    const fpStaffAllChecked = computed(() => {
      const ids = fpStaffLeftRows.value.map((s) => s.id);
      return ids.length > 0 && ids.every((id) => fpForm.value.selectedIds?.includes(id));
    });

    function fpToggleStaffAll(e) {
      const ids = fpStaffLeftRows.value.map((s) => s.id);
      if (e.target.checked) {
        fpForm.value.selectedIds = [...new Set([...(fpForm.value.selectedIds || []), ...ids])];
      } else {
        fpForm.value.selectedIds = (fpForm.value.selectedIds || []).filter((id) => !ids.includes(id));
      }
    }

    function fpToggleStaffSelect(id) {
      const sel = fpForm.value.selectedIds || [];
      if (sel.includes(id)) fpForm.value.selectedIds = sel.filter((x) => x !== id);
      else fpForm.value.selectedIds = [...sel, id];
    }

    function fpAddStaffToChosen() {
      const chosen = fpForm.value.chosen || [];
      const ids = new Set(chosen.map((s) => s.id));
      fpStaffPool.forEach((s) => {
        if ((fpForm.value.selectedIds || []).includes(s.id) && !ids.has(s.id)) {
          chosen.push({ id: s.id, name: s.name, phone: s.phone });
          ids.add(s.id);
        }
      });
      fpForm.value.chosen = [...chosen];
      fpForm.value.selectedIds = [];
    }

    function fpRemoveStaffFromChosen(id) {
      fpForm.value.chosen = (fpForm.value.chosen || []).filter((s) => s.id !== id);
    }

    function openWarehouseForm(mode, row) {
      fpForm.value = blankWarehouseForm(row);
      if (mode === 'add') {
        fpForm.value.name = fpForm.value.name || '仓库六';
        fpForm.value.manager = fpForm.value.manager || '李四';
      }
      fpCascaderCols.value = [warehouseTree];
      fpModal.value = { type: 'warehouse-form', mode, title: mode === 'edit' ? '编辑' : '新增', row, compact: true, saveLabel: '确认' };
    }

    function openShiftForm(mode, row) {
      fpForm.value = blankShiftForm(row);
      fpModal.value = { type: 'shift-form', mode, title: mode === 'edit' ? '编辑' : '新增', row, saveLabel: '保存' };
    }

    function openScheduleForm(mode, row) {
      fpForm.value = blankScheduleForm(row);
      fpModal.value = { type: 'schedule-form', mode, title: mode === 'edit' ? '编辑' : '新增', row, wide: true, saveLabel: '保存' };
    }

    function openWorkgroupForm(mode, row) {
      fpForm.value = blankWorkgroupForm(row);
      fpModal.value = { type: 'workgroup-form', mode, title: mode === 'edit' ? '编辑' : '新增', row, saveLabel: '保存' };
    }

    const fpChannelNameOptions = computed(() => {
      const mod = fpForm.value?.module;
      return mod ? (channelNamesByModule[mod] || []) : [];
    });

    function blankChannelForm(row) {
      return {
        module: row?.module || '',
        channelName: row?.channelName || '',
        name: row?.name === '—' ? '' : (row?.name || ''),
        configFields: row?.configFields?.length
          ? row.configFields.map((f) => ({ ...f }))
          : [],
        sort: row?.sort || '',
      };
    }

    function openChannelForm(mode, row) {
      fpForm.value = blankChannelForm(row);
      fpModal.value = { type: 'channel-form', mode, title: mode === 'edit' ? '编辑' : '新增', row, wide: true, saveLabel: '保存' };
    }

    function blankSupplierForm(row) {
      return {
        company: row?.company || '',
        code: row?.code || '',
        contact: row?.contact || '',
        credit: row?.credit || '',
        email: row?.email || '',
        address: row?.address || '',
        note: row?.note === '—' ? '' : (row?.note || ''),
        enterpriseType: row?.enterpriseType || '',
        industry: row?.industry || '',
      };
    }

    function openSupplierForm(mode, row) {
      fpForm.value = blankSupplierForm(row);
      fpModal.value = {
        type: 'supplier-form',
        mode,
        title: mode === 'edit' ? '编辑' : mode === 'view' ? '查看' : '新增',
        row,
        wide: true,
        saveLabel: '保存',
        viewOnly: mode === 'view',
      };
    }

    function openSupplierTemplateModal() {
      if (!supplierImportTemplate) {
        showFpToast('模板配置缺失');
        return;
      }
      fpModal.value = {
        type: 'supplier-template',
        title: supplierImportTemplate.fileName,
        wide: true,
        xl: true,
        viewOnly: true,
      };
    }

    function blankOfficePersonnelForm(row) {
      return {
        tenant: row?.tenant || officePersonnelOptions.tenants[0] || '',
        name: row?.name || '',
        office: row?.office || '',
        dept: row?.dept || '',
        position: row?.position || '',
        phone: row?.phone || '',
        status: row?.status || '在职',
      };
    }

    function openOfficePersonnelForm(mode, row) {
      fpForm.value = blankOfficePersonnelForm(row);
      if (mode === 'view') {
        fpModal.value = { type: 'office-personnel-view', title: '查看', row, viewOnly: true, noFooter: false };
        return;
      }
      fpModal.value = {
        type: 'office-personnel-form',
        mode,
        title: mode === 'edit' ? '编辑' : '新增',
        row,
        wide: true,
        saveLabel: mode === 'edit' ? '修改' : '保存',
      };
    }

    function openOfficePointForm(mode, row) {
      fpForm.value = blankProjectForm(row);
      if (mode === 'view') {
        fpModal.value = { type: 'office-point-detail', title: '查看', row, wide: true, noFooter: true };
        return;
      }
      fpModal.value = {
        type: 'office-point-form',
        mode,
        title: mode === 'edit' ? '编辑' : '新增',
        row,
        wide: true,
        saveLabel: mode === 'edit' ? '修改' : '保存',
      };
    }

    const fpTreeParentOptions = computed(() => {
      const pd = pageData.value;
      if (!pd?.rows?.length) return [];
      return pd.rows.map((r) => ({
        id: r.id,
        label: `${'　'.repeat(r.level || 0)}${r.name}`,
      }));
    });

    function resolveTreeParentName(parentId) {
      if (!parentId) return '';
      const pd = pageData.value;
      const parent = pd?.rows?.find((r) => r.id === parentId);
      return parent?.name || '';
    }

    function blankDeptForm(row, parentRow) {
      const parentId = parentRow?.id || row?.parentId || '';
      return {
        name: row?.name || '',
        fullName: row?.fullName || '',
        parentId,
        parentName: parentRow?.name || resolveTreeParentName(parentId),
        deptType: row?.deptType || '',
        sort: row?.sort != null ? String(row.sort) : '0',
        tenant: row?.tenant || deptMgmtOptions.tenants[0] || '',
        note: row?.note === '—' ? '' : (row?.note || ''),
      };
    }

    function openDeptForm(mode, row, parentRow) {
      fpForm.value = blankDeptForm(row, parentRow);
      if (mode === 'view') {
        fpModal.value = { type: 'dept-view', title: '查看', row, viewOnly: true };
        return;
      }
      fpModal.value = {
        type: 'dept-form',
        mode,
        title: mode === 'edit' ? '编辑' : '新增',
        row,
        parentRow,
        lockParent: !!parentRow,
        wide: true,
        saveLabel: mode === 'edit' ? '修改' : '保存',
      };
    }

    const fpDeptParentOptions = computed(() => fpTreeParentOptions.value);

    function blankPositionForm(row) {
      return {
        tenant: row?.tenant || positionMgmtOptions.tenants[0] || '',
        positionType: row?.positionType || '',
        code: row?.code || '',
        name: row?.name || '',
        sort: row?.sort != null ? String(row.sort) : '',
        description: row?.description === '—' ? '' : (row?.description || ''),
      };
    }

    function openPositionForm(mode, row) {
      fpForm.value = blankPositionForm(row);
      if (mode === 'view') {
        fpModal.value = { type: 'position-view', title: '查看', row, viewOnly: true };
        return;
      }
      fpModal.value = {
        type: 'position-form',
        mode,
        title: mode === 'edit' ? '编辑' : '新增',
        row,
        wide: true,
        saveLabel: mode === 'edit' ? '修改' : '保存',
      };
    }

    function blankUserForm(row) {
      return {
        tenant: row?.tenant || userMgmtOptions.tenants[0] || '',
        account: row?.account || '',
        platform: row?.platform || 'WEB',
        password: '',
        confirmPassword: '',
        nickname: row?.nickname || row?.realName || '',
        realName: row?.realName || '',
        phone: row?.phone || '',
        email: row?.email || '',
        gender: row?.gender || '',
        birthday: row?.birthday || '',
        userCode: row?.userCode || '',
        role: row?.roles?.[0] || '',
        dept: row?.dept || '',
        position: row?.position || '',
        sectionBasic: true,
        sectionDetail: true,
        sectionDuty: true,
      };
    }

    function openUserForm(mode, row) {
      fpForm.value = blankUserForm(row);
      if (mode === 'view') {
        fpModal.value = { type: 'user-view', title: '查看', row, viewOnly: true, wide: true, xl: true };
        return;
      }
      fpModal.value = {
        type: 'user-form',
        mode,
        title: mode === 'edit' ? '编辑' : '新增',
        row,
        wide: true,
        xl: true,
        saveLabel: mode === 'edit' ? '修改' : '保存',
      };
    }

    function fpToggleUserSection(key) {
      fpForm.value[key] = !fpForm.value[key];
    }

    function fpUserNodeHasChildren(node) {
      const pd = pageData.value;
      if (!pd?.sidebarTree || !node?.id) return false;
      if (node.hasChildren) return true;
      return pd.sidebarTree.some((n) => n.parentId === node.id);
    }

    function fpToggleUserSidebarNode(node) {
      if (!node?.id || !fpUserNodeHasChildren(node)) return;
      fpUserSidebarExpanded.value = {
        ...fpUserSidebarExpanded.value,
        [node.id]: !fpUserSidebarExpanded.value[node.id],
      };
    }

    const fpUserSidebarVisible = computed(() => {
      const pd = pageData.value;
      if (!pd?.sidebarTree?.length) return [];
      const kw = fpUserTreeFilter.value.trim().toLowerCase();
      if (kw) return pd.sidebarTree.filter((n) => n.name.toLowerCase().includes(kw));
      return pd.sidebarTree.filter((n) => isTreeRowVisible(n, pd.sidebarTree, fpUserSidebarExpanded.value));
    });

    const fpUserToolbar = computed(() => {
      const pd = pageData.value;
      if (!pd) return [];
      return fpUserAuditMode.value ? (pd.auditToolbar || []) : (pd.toolbar || []);
    });

    const fpUserActiveRows = computed(() => {
      const pd = pageData.value;
      if (!pd) return [];
      return fpUserAuditMode.value ? (pd.auditRows || []) : (pd.rows || []);
    });

    const fpUserPagination = computed(() => {
      const total = fpUserActiveRows.value.length;
      const size = fpPageSize.value;
      const pages = Math.max(1, Math.ceil(total / size));
      const page = Math.min(Math.max(1, fpPage.value), pages);
      return { total, page, pages, size };
    });

    const fpUserPaginationVisible = computed(() => fpUserActiveRows.value.length > 0);

    const fpUserPageNumbers = computed(() => fpPageNumbers.value);

    const fpUserDisplayRows = computed(() => {
      const rows = fpUserActiveRows.value;
      if (!rows.length) return [];
      const { page, size } = fpUserPagination.value;
      const start = (page - 1) * size;
      return rows.slice(start, start + size).map((row, i) => ({
        ...row,
        _fpKey: start + i,
        index: row.index != null ? row.index : start + i + 1,
      }));
    });

    function fpAddConfigField() {
      if (!fpForm.value.configFields) fpForm.value.configFields = [];
      fpForm.value.configFields.push({ key: '', value: '' });
    }

    function fpRemoveConfigField(i) {
      fpForm.value.configFields.splice(i, 1);
    }

    function toggleFpFilterExpand(e) {
      e?.preventDefault();
      fpFilterExpanded.value = !fpFilterExpanded.value;
    }

    function isFpFilterVisible(idx) {
      if (!pageData.value?.filterExpandable) return true;
      const count = pageData.value.filterPrimaryCount ?? 4;
      return fpFilterExpanded.value || idx < count;
    }

    const fpModal = ref(null);
    const fpForm = ref({});
    const fpToast = ref('');
    const fpMessage = ref(null);
    const fpMapModal = ref(false);
    const fpMapForm = ref({ address: '', lng: '', lat: '', markerX: 50, markerY: 50 });
    const fpPanoramaProject = ref(null);
    const fpPanoramaTab = ref('详情');
    let fpConfirmCallback = null;

    function showFpToast(msg) {
      fpToast.value = msg;
      setTimeout(() => { fpToast.value = ''; }, 2500);
    }

    function showFpMessage(type, text) {
      fpMessage.value = { type, text };
      setTimeout(() => { fpMessage.value = null; }, 3200);
    }

    function lngLatToMarker(lng, lat) {
      const lngNum = parseFloat(lng);
      const latNum = parseFloat(lat);
      if (Number.isNaN(lngNum) || Number.isNaN(latNum)) return { x: 50, y: 50 };
      const x = Math.min(96, Math.max(4, ((lngNum - 121.30) / 0.35) * 100));
      const y = Math.min(96, Math.max(4, ((31.35 - latNum) / 0.18) * 100));
      return { x, y };
    }

    function markerToLngLat(x, y) {
      const lng = (121.30 + (x / 100) * 0.35).toFixed(6);
      const lat = (31.35 - (y / 100) * 0.18).toFixed(6);
      return { lng, lat };
    }

    function closeFpModal() {
      fpModal.value = null;
      fpConfirmCallback = null;
      fpCascaderOpen.value = false;
    }

    function blankProjectForm(row) {
      return {
        name: row?.name || '',
        type: row?.type || '',
        openDate: row?.openDate === '—' ? '' : (row?.openDate || ''),
        address: row?.address === '—' ? '' : (row?.address || ''),
        area: row?.area || '',
        code: row?.code || row?.prefix || '',
        prefix: row?.prefix || row?.code || '',
        manager: row?.manager || '',
        lng: row?.lng || '121.681000',
        lat: row?.lat || '31.212010',
        members: row?.members || '',
        panoramaPush: row?.panoramaPush || '否',
        panoramaId: row?.panoramaId === '—' ? '' : (row?.panoramaId || ''),
        appKey: '',
        appSecret: '',
        description: row?.description || '',
      };
    }

    function openConfirm(title, message, onOk) {
      fpConfirmCallback = onOk;
      fpModal.value = { type: 'confirm', title, message, compact: true };
    }

    function fpConfirmOk() {
      if (fpConfirmCallback) fpConfirmCallback();
      closeFpModal();
    }

    function fpModalSave() {
      const m = fpModal.value;
      if (!m) return;
      const labels = {
        'project-form': m.mode === 'edit' ? '项目已修改' : '项目已保存',
        'unit-form': '单体已保存',
        'upload-model': '模型上传任务已提交',
        bind: '绑定成功',
        'edit-model': '模型已更新',
        'convert-config': '转换任务已提交',
        'upload-ledger': '台账上传成功',
        'upload-db': 'db 包上传成功',
        'device-add': '设备已保存',
        'device-edit': '设备已修改',
        'device-link': '文档关联成功',
        'space-add': '空间已保存',
        'space-area': '面积已更新',
        'doc-folder-upload': '文件夹上传任务已提交',
        'doc-upload-file': '文件上传任务已提交',
        'doc-new-folder': '文件夹已创建',
        'doc-online-doc': '在线文档已创建',
        'coding-form': m.mode === 'edit' ? '编码已修改' : '编码已保存',
        'coding-color': '颜色已设置',
        'coding-mapping': '映射列已保存',
        'coding-asset': '资产分类已保存',
        'coding-upload': '编码已更新',
        'warehouse-form': m.mode === 'edit' ? '仓库已修改' : '仓库已新增',
        'shift-form': m.mode === 'edit' ? '班次已修改' : '班次已保存',
        'schedule-form': m.mode === 'edit' ? '排班已修改' : '排班已保存',
        'workgroup-form': m.mode === 'edit' ? '工作组已修改' : '工作组已保存',
        'staff-settings': '人员设置已保存',
        'channel-form': m.mode === 'edit' ? '渠道配置已修改' : '渠道配置已保存',
        'supplier-form': m.mode === 'edit' ? '供应商已修改' : '供应商已保存',
        'supplier-import': '导入任务已提交',
        'office-personnel-form': m.mode === 'edit' ? '办公点人员已修改' : '办公点人员已保存',
        'office-point-form': m.mode === 'edit' ? '办公点已修改' : '办公点已保存',
        'dept-form': m.mode === 'edit' ? '部门已修改' : '部门已新增',
        'position-form': m.mode === 'edit' ? '岗位已修改' : '岗位已保存',
        'user-form': m.mode === 'edit' ? '用户已修改' : '用户已保存',
        'user-import': '导入任务已提交',
      };
      showFpToast(labels[m.type] || '操作成功');
      closeFpModal();
    }

    function fpPickCoords() {
      const pos = lngLatToMarker(fpForm.value.lng, fpForm.value.lat);
      fpMapForm.value = {
        address: fpForm.value.address || '',
        lng: fpForm.value.lng || '',
        lat: fpForm.value.lat || '',
        markerX: pos.x,
        markerY: pos.y,
      };
      fpMapModal.value = true;
    }

    function closeFpMapModal() {
      fpMapModal.value = false;
    }

    function fpMapClick(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.min(96, Math.max(4, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.min(96, Math.max(4, ((e.clientY - rect.top) / rect.height) * 100));
      const { lng, lat } = markerToLngLat(x, y);
      fpMapForm.value.markerX = x;
      fpMapForm.value.markerY = y;
      fpMapForm.value.lng = lng;
      fpMapForm.value.lat = lat;
    }

    function fpMapSearch() {
      if (!fpMapForm.value.address.trim()) {
        showFpToast('请输入地址');
        return;
      }
      fpMapForm.value.lng = '121.505000';
      fpMapForm.value.lat = '31.245000';
      fpMapForm.value.markerX = 58;
      fpMapForm.value.markerY = 58;
    }

    function fpMapConfirm() {
      if (!fpMapForm.value.lng || !fpMapForm.value.lat) {
        showFpToast('请在地图上选择坐标点');
        return;
      }
      fpForm.value.lng = fpMapForm.value.lng;
      fpForm.value.lat = fpMapForm.value.lat;
      closeFpMapModal();
    }

    function fpPushPanorama() {
      const row = fpModal.value?.row;
      if (row && (!row.panoramaId || row.panoramaId === '—')) {
        showFpMessage('error', '数据推送中，请稍后再试！');
      } else {
        showFpMessage('success', '同步成功');
      }
      closeFpModal();
    }

    function fpSyncProject(row, mode) {
      if (mode === 'panorama' && (!row.panoramaId || row.panoramaId === '—')) {
        showFpMessage('error', '数据推送中，请稍后再试！');
        return;
      }
      if (row.panoramaPush === '是' && mode === 'incremental') {
        showFpMessage('error', '数据推送中，请稍后再试！');
        return;
      }
      showFpMessage('success', '同步成功');
    }

    function fpDocUploadType(type) {
      closeFpModal();
      const folder = pageData.value?.selectedProject || docFolders[0];
      if (type === 'file') {
        fpForm.value = { targetFolder: folder };
        fpModal.value = { type: 'doc-upload-file', title: '上传文件', saveLabel: '提交', compact: true };
      } else {
        fpForm.value = { targetFolder: folder };
        fpModal.value = { type: 'doc-folder-upload', title: '文件夹上传', saveLabel: '提交' };
      }
    }

    function handleToolbarClick(btn, side) {
      if (currentView.value === 'project-center') {
        if (btn.label.includes('新增')) {
          fpForm.value = blankProjectForm();
          fpModal.value = { type: 'project-form', mode: 'add', title: '新增', wide: true, saveLabel: '保存' };
        } else if (btn.label === '导出') {
          showFpToast('项目列表导出任务已提交');
        }
        return;
      }
      if (currentView.value === 'model-center' && side === 'left' && btn.label.includes('新增')) {
        fpForm.value = { unitName: '', facility: '否' };
        fpModal.value = { type: 'unit-form', mode: 'add', title: '新增', saveLabel: '保存', compact: true };
        return;
      }
      if (currentView.value === 'device-center') {
        if (btn.label.includes('新增')) {
          fpForm.value = blankDeviceAddForm();
          fpModal.value = { type: 'device-add', title: '新增', saveLabel: '确定', compact: true };
        } else if (btn.label === '删除') {
          openConfirm('删除', '此操作将永久删除, 是否继续?', () => showFpToast('设备已删除'));
        } else if (btn.label === '导出') {
          showFpToast('设备列表导出任务已提交');
        }
        return;
      }
      if (currentView.value === 'space-center') {
        if (btn.label.includes('新增')) {
          fpForm.value = blankSpaceForm();
          fpModal.value = { type: 'space-add', title: '新增', wide: true, saveLabel: '确定' };
        } else if (btn.label === '导出') {
          showFpToast('空间列表导出任务已提交');
        }
        return;
      }
      if (currentView.value === 'document-center') {
        if (btn.label.includes('上传')) {
          fpModal.value = { type: 'doc-upload-menu', title: '上传', compact: true };
        } else if (btn.label === '新建文件夹') {
          fpForm.value = { folderName: '', targetFolder: '' };
          fpModal.value = { type: 'doc-new-folder', title: '新建文件夹', saveLabel: '确定', compact: true };
        } else if (btn.label === '新建在线文档') {
          fpForm.value = { name: '', folder: '', content: '' };
          fpModal.value = { type: 'doc-online-doc', title: '新建在线文档', wide: true, xl: true, saveLabel: '确定' };
        }
        return;
      }
      if (currentView.value === 'coding-center') {
        if (btn.label.includes('新增')) {
          fpForm.value = blankCodingForm();
          fpModal.value = { type: 'coding-form', mode: 'add', title: '新增', wide: true, saveLabel: '保存' };
        } else if (btn.label === '更新编码') {
          fpModal.value = { type: 'coding-upload', title: '上传编码', saveLabel: '确定' };
        } else if (btn.label.includes('定义编码')) {
          fpForm.value = { selectedFields: [] };
          fpModal.value = { type: 'coding-mapping', title: '定义编码及映射列', wide: true, xl: true, saveLabel: '确定' };
        } else if (btn.label === '资产分类设置') {
          fpForm.value = { assetTab: '设备' };
          fpModal.value = { type: 'coding-asset', title: '资产分类设置', wide: true, xl: true, saveLabel: '确定' };
        } else if (btn.label === '下载编码模板') {
          fpModal.value = { type: 'coding-template', title: '编码模板.xlsx', wide: true, viewOnly: true };
        } else if (btn.label === '导出') {
          showFpToast('编码列表导出任务已提交');
        }
        return;
      }
      if (currentView.value === 'warehouse-mgmt' && btn.label.includes('新增')) {
        openWarehouseForm('add');
        return;
      }
      if (currentView.value === 'channel-config' && btn.label.includes('新增')) {
        openChannelForm('add');
        return;
      }
      if (currentView.value === 'schedule-mgmt' && btn.label.includes('新增')) {
        openScheduleForm('add');
        return;
      }
      if (currentView.value === 'shift-mgmt' && btn.label.includes('新增')) {
        openShiftForm('add');
        return;
      }
      if (currentView.value === 'workgroup') {
        if (btn.label.includes('新增')) {
          openWorkgroupForm('add');
        } else if (btn.label === '导出') {
          showFpToast('工作组列表导出任务已提交');
        }
        return;
      }
      if (currentView.value === 'supplier-mgmt') {
        if (btn.label.includes('新增')) {
          openSupplierForm('add');
        } else if (btn.label === '下载模板') {
          openSupplierTemplateModal();
        } else if (btn.label === '导出') {
          showFpToast('供应商列表导出任务已提交');
        } else if (btn.label === '导入') {
          fpModal.value = { type: 'supplier-import', title: '导入供应商', saveLabel: '确定', compact: true };
        } else if (btn.label === '批量删除' || btn.label.includes('删除')) {
          openConfirm('提示', '确定将选择数据删除?', () => showFpToast('供应商已删除'));
        }
        return;
      }
      if (currentView.value === 'office-personnel') {
        if (btn.label.includes('新增')) {
          openOfficePersonnelForm('add');
        } else if (btn.label === '删除' || btn.label.includes('删除')) {
          openConfirm('确认删除？', '确定将选择数据删除?', () => showFpToast('办公点人员已删除'));
        }
        return;
      }
      if (currentView.value === 'office-mgmt') {
        if (btn.label.includes('新增')) {
          openOfficePointForm('add');
        }
        return;
      }
      if (currentView.value === 'dept-mgmt') {
        if (btn.label.includes('新增')) {
          openDeptForm('add');
        } else if (btn.label === '删除' || btn.label.includes('删除')) {
          openConfirm('确认删除？', '确定将选择数据删除?', () => showFpToast('部门已删除'));
        }
        return;
      }
      if (currentView.value === 'position-mgmt') {
        if (btn.label.includes('新增')) {
          openPositionForm('add');
        } else if (btn.label === '删除' || btn.label.includes('删除')) {
          openConfirm('确认删除？', '确定将选择数据删除?', () => showFpToast('岗位已删除'));
        }
        return;
      }
      if (currentView.value === 'user-mgmt') {
        if (fpUserAuditMode.value) {
          if (btn.label === '通过') {
            showFpToast('审核已通过');
          } else if (btn.label === '拒绝') {
            showFpToast('已拒绝所选用户');
          } else if (btn.label === '返回') {
            fpUserAuditMode.value = false;
            fpPage.value = 1;
          }
          return;
        }
        if (btn.label.includes('新增')) {
          openUserForm('add');
        } else if (btn.label === '删除' || btn.label.includes('删除')) {
          openConfirm('确定将选择数据删除?', '删除后不可恢复，是否继续？', () => showFpToast('用户已删除'));
        } else if (btn.label === '审核') {
          fpUserAuditMode.value = true;
          fpPage.value = 1;
        } else if (btn.label === '角色配置') {
          showFpToast('请先选择用户');
        } else if (btn.label === '密码重置') {
          showFpToast('密码重置任务已提交');
        } else if (btn.label === '平台配置') {
          showFpToast('平台配置功能开发中');
        } else if (btn.label === '解封') {
          showFpToast('用户已解封');
        } else if (btn.label === '导入') {
          fpModal.value = { type: 'user-import', title: '导入用户', saveLabel: '确定', compact: true };
        } else if (btn.label === '导出') {
          showFpToast('用户列表导出任务已提交');
        }
        return;
      }
    }

    function handleRowAction(action, row, side) {
      if (currentView.value === 'project-center') {
        if (action === '查看') {
          fpForm.value = blankProjectForm(row);
          fpModal.value = { type: 'project-detail', title: '查看', row, wide: true, noFooter: true };
        } else if (action === '编辑') {
          fpForm.value = blankProjectForm(row);
          fpModal.value = { type: 'project-form', mode: 'edit', title: '编辑', row, wide: true, saveLabel: '修改' };
        } else if (action === '全景') {
          fpForm.value = blankProjectForm(row);
          fpModal.value = { type: 'project-panorama', title: '查看', row, wide: true };
        } else if (action === '全景查看') {
          fpPanoramaTab.value = '详情';
          fpPanoramaProject.value = row;
        } else if (action === '增量同步') {
          fpSyncProject(row, 'incremental');
        } else if (action === '全景同步') {
          fpSyncProject(row, 'panorama');
        }
        return;
      }
      if (currentView.value === 'model-center' && side === 'left') {
        if (action === '编辑') {
          fpForm.value = { unitName: row.name, facility: row.facility };
          fpModal.value = { type: 'unit-form', mode: 'edit', title: '编辑', row, saveLabel: '保存', compact: true };
        } else if (action === '删除') {
          openConfirm('删除', `确定删除单体「${row.name}」？`, () => showFpToast('单体已删除'));
        } else if (action === '上传模型') {
          fpForm.value = { modelType: '', description: '', unitName: row.name };
          fpModal.value = { type: 'upload-model', title: '上传模型', row, saveLabel: '确定' };
        } else if (action === '绑定') {
          fpForm.value = { modelType: '' };
          fpModal.value = { type: 'bind', title: '绑定', row, saveLabel: '确定', compact: true };
        }
        return;
      }
      if (currentView.value === 'model-center' && side === 'right') {
        const act = action.replace('(已完成)', '').replace('上传db包', '上传db包');
        if (act === '删除') {
          openConfirm('删除', `确定删除模型「${row.name}」？`, () => showFpToast('模型已删除'));
        } else if (act === '编辑') {
          fpForm.value = { unitName: row.unit, modelName: row.name, modelType: row.type, description: '' };
          fpModal.value = { type: 'edit-model', title: '编辑模型', row, wide: true, saveLabel: '确定' };
        } else if (act === '转换') {
          fpForm.value = {};
          fpModal.value = { type: 'convert-config', title: '文件转换配置', row, wide: true, saveLabel: '确定' };
        } else if (act === '已转换') {
          showFpToast('模型已转换完成');
        } else if (act === '上传台账') {
          fpForm.value = { ledgerTab: '空间模版' };
          fpModal.value = { type: 'upload-ledger', title: '上传台账', row, saveLabel: '确定' };
        } else if (act.startsWith('上传db包')) {
          fpForm.value = {};
          fpModal.value = { type: 'upload-db', title: '上传db包', row, saveLabel: '确定' };
        } else if (act === '删除db文件') {
          openConfirm('删除db文件', '确定后同步删除 db 文件及关联台账数据且无法恢复，需重新上传！', () => showFpToast('db 文件及关联台账已删除'));
        }
        return;
      }
      if (currentView.value === 'device-center') {
        if (action === '删除') {
          openConfirm('删除', '此操作将永久删除, 是否继续?', () => showFpToast('设备已删除'));
        } else if (action === '查看') {
          fpModal.value = { type: 'device-view', title: '设备属性', row, wide: true, xl: true, viewOnly: true };
        } else if (action === '编辑') {
          fpForm.value = blankDeviceEditForm(row);
          fpModal.value = { type: 'device-edit', title: '编辑', row, wide: true, saveLabel: '确定' };
        } else if (action === '链接关系') {
          fpModal.value = { type: 'device-link', title: '链接文档', row, wide: true, xl: true, saveLabel: '确认关联' };
        }
        return;
      }
      if (currentView.value === 'space-center') {
        if (action === '编辑') {
          fpForm.value = { area: row.area || '0.000' };
          fpModal.value = { type: 'space-area', title: '编辑面积', row, saveLabel: '确定', compact: true };
        }
        return;
      }
      if (currentView.value === 'coding-center') {
        if (action === '查看') {
          fpModal.value = { type: 'coding-view', title: '查看', row, wide: true, viewOnly: true };
        } else if (action === '编辑') {
          fpForm.value = blankCodingForm(row);
          fpModal.value = { type: 'coding-form', mode: 'edit', title: '编辑', row, wide: true, saveLabel: '修改' };
        } else if (action === '删除') {
          openConfirm('删除', `确定删除编码 ID ${row.id}？`, () => showFpToast('编码已删除'));
        } else if (action === '设置颜色') {
          fpForm.value = { color: row.color === '—' ? '#1890ff' : row.color };
          fpModal.value = { type: 'coding-color', title: '设置颜色', row, saveLabel: '确定', compact: true };
        }
        return;
      }
      if (currentView.value === 'warehouse-mgmt') {
        if (action === '编辑') openWarehouseForm('edit', row);
        else if (action === '删除') openConfirm('删除仓库', '删除后将无法恢复此仓库信息，确定删除吗？', () => showFpToast('仓库已删除'));
        return;
      }
      if (currentView.value === 'channel-config') {
        if (action === '编辑') openChannelForm('edit', row);
        else if (action === '删除') openConfirm('提示', '确定将选择数据删除?', () => showFpToast('渠道配置已删除'));
        return;
      }
      if (currentView.value === 'schedule-mgmt') {
        if (action === '编辑') openScheduleForm('edit', row);
        else if (action === '人员设置') openStaffSettings(row);
        else if (action === '禁用') openConfirm('提示', '运行后将禁用一个排班，是否继续？', () => showFpToast('排班已禁用'));
        else if (action === '删除') openConfirm('提示', '确定将选择数据删除?', () => showFpToast('排班已删除'));
        return;
      }
      if (currentView.value === 'shift-mgmt') {
        if (action === '编辑') openShiftForm('edit', row);
        else if (action === '删除') openConfirm('提示', '确定将选择数据删除?', () => showFpToast('班次已删除'));
        else if (action === '禁用') openConfirm('提示', '运行后将禁用一个班次，是否继续？', () => showFpToast('班次已禁用'));
        return;
      }
      if (currentView.value === 'workgroup') {
        if (action === '编辑') openWorkgroupForm('edit', row);
        else if (action === '删除') openConfirm('提示', '确定将选择数据删除?', () => showFpToast('工作组已删除'));
        else if (action === '人员设置') openStaffSettings(row);
        else if (action === '禁用') openConfirm('提示', '运行后将禁用一个工作组，是否继续？', () => showFpToast('工作组已禁用'));
        return;
      }
      if (currentView.value === 'supplier-mgmt') {
        if (action === '编辑') openSupplierForm('edit', row);
        else if (action === '查看') openSupplierForm('view', row);
        else if (action === '删除') openConfirm('提示', '确定将选择数据删除?', () => showFpToast('供应商已删除'));
        return;
      }
      if (currentView.value === 'office-personnel') {
        if (action === '编辑') openOfficePersonnelForm('edit', row);
        else if (action === '查看') openOfficePersonnelForm('view', row);
        else if (action === '删除') openConfirm('确认删除？', '确定将选择数据删除?', () => showFpToast('办公点人员已删除'));
        return;
      }
      if (currentView.value === 'office-mgmt') {
        if (action === '查看') openOfficePointForm('view', row);
        else if (action === '编辑') openOfficePointForm('edit', row);
        return;
      }
      if (currentView.value === 'dept-mgmt') {
        if (action === '编辑') openDeptForm('edit', row);
        else if (action === '查看') openDeptForm('view', row);
        else if (action === '删除') openConfirm('确认删除？', '确定将选择数据删除?', () => showFpToast('部门已删除'));
        else if (action === '新增子项') openDeptForm('add', null, row);
        return;
      }
      if (currentView.value === 'position-mgmt') {
        if (action === '编辑') openPositionForm('edit', row);
        else if (action === '查看') openPositionForm('view', row);
        else if (action === '删除') openConfirm('确认删除？', '确定将选择数据删除?', () => showFpToast('岗位已删除'));
        return;
      }
      if (currentView.value === 'user-mgmt') {
        if (fpUserAuditMode.value) return;
        if (action === '编辑') openUserForm('edit', row);
        else if (action === '查看') openUserForm('view', row);
        else if (action === '删除') openConfirm('确定将选择数据删除?', '删除后不可恢复，是否继续？', () => showFpToast('用户已删除'));
        return;
      }
    }

    return {
      menuItems, sidebarCollapsed, activeSubId, currentView, platformOpen, currentTime,
      openTabs, pageConfig, pageData, pageTitle, quickLinks,
      scheduleMonth, weekDays, scheduleCalCells,
      projectTypes, modelTypes, ledgerTabs, panoramaTabs,
      managerOptions, scheduleTypes, workgroupTypes, staffDepts, fpStaffPool,
      channelModules, fpChannelNameOptions,
      supplierFormOptions, supplierImportTemplate,
      officePersonnelOptions,
      fpEntityLabel,
      deptMgmtOptions, positionMgmtOptions, fpDeptParentOptions,
      userMgmtOptions,
      fpUserAuditMode, fpUserTreeFilter, fpUserSidebarExpanded, fpUserSelectedOrg,
      fpUserSidebarVisible, fpUserToolbar, fpUserDisplayRows,
      fpUserPagination, fpUserPaginationVisible, fpUserPageNumbers,
      fpUserNodeHasChildren, fpToggleUserSidebarNode, fpToggleUserSection,
      codingFields, codingCategories, assetTree, docFolders, spaceTypes, deviceCategories,
      fpModal, fpForm, fpToast, fpMessage, fpMapModal, fpMapForm,
      fpPanoramaProject, fpPanoramaTab,
      fpCascaderOpen, fpCascaderCols, fpPickCascader,
      fpStaffPage, fpStaffPageSize, fpStaffPages, fpStaffLeftRows, fpStaffAllChecked,
      fpToggleStaffAll, fpToggleStaffSelect, fpAddStaffToChosen, fpRemoveStaffFromChosen,
      fpAddShiftPeriod, fpRemoveShiftPeriod,
      fpAddConfigField, fpRemoveConfigField,
      fpFilterExpanded, toggleFpFilterExpand, isFpFilterVisible,
      fpPage, fpPageSize, fpPageJump, fpPageSizeOptions,
      fpPagination, fpPaginationVisible, fpDisplayRows, fpPageNumbers,
      fpGoPage, fpJumpToPage, fpOnPageSizeChange,
      fpTreeExpanded, fpRowHasChildren, fpToggleTreeRow,
      closeFpModal, fpModalSave, fpConfirmOk, fpPickCoords, fpPushPanorama, fpDocUploadType,
      closeFpMapModal, fpMapClick, fpMapSearch, fpMapConfirm, fpSyncProject,
      handleToolbarClick, handleRowAction,
      getMenuIcon, isSubActive, toggleMenu, toggleNavGroup, selectMenuLeaf,
      openPageByPath, switchTab, closeTab,
      togglePlatform, closeDropdowns, navigateToPlatform, toggleSidebar, toggleFullscreen,
    };
  },
}).mount('#fp-app');
