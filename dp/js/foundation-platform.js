const { createApp, ref, computed, nextTick, onMounted, onUnmounted } = Vue;

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

    return {
      menuItems, sidebarCollapsed, activeSubId, currentView, platformOpen, currentTime,
      openTabs, pageConfig, pageData, pageTitle, quickLinks,
      scheduleMonth, weekDays, scheduleCalCells,
      getMenuIcon, isSubActive, toggleMenu, toggleNavGroup, selectMenuLeaf,
      openPageByPath, switchTab, closeTab,
      togglePlatform, closeDropdowns, navigateToPlatform, toggleSidebar, toggleFullscreen,
    };
  },
}).mount('#fp-app');
