/* Flat professional icon set — SVG inline renderer */
;(function (global) {
  const SVG = {
    repair: `<svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="5" width="30" height="47" rx="3" fill="#4A90E2"/><path d="M19 3h10a2 2 0 012 2v4H17V5a2 2 0 012-2z" fill="#4A90E2"/><circle cx="24" cy="4" r="1.2" fill="#fff" opacity=".5"/><path d="M16 28l4 4-5 5M32 28l-4 4 5 5" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M19 26v8M29 26v8" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    maintain: `<svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="5" width="30" height="47" rx="3" stroke="#52C41A" stroke-width="2.5" fill="#fff"/><path d="M19 3h10a2 2 0 012 2v4H17V5a2 2 0 012-2z" stroke="#52C41A" stroke-width="2" fill="#fff"/><circle cx="35" cy="43" r="9" fill="#52C41A"/><path d="M32 43l2 2 4-4M35 40v6" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    inspect: `<svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="5" width="30" height="47" rx="3" fill="#FDD835"/><path d="M19 3h10a2 2 0 012 2v4H17V5a2 2 0 012-2z" fill="#FDD835"/><path d="M30 18l-10 22-4-4 10-22 4 4z" fill="#fff"/><path d="M20 36l4 4" stroke="#FDD835" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    myorder: `<svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="5" width="30" height="47" rx="3" fill="#7E57C2"/><path d="M19 3h10a2 2 0 012 2v4H17V5a2 2 0 012-2z" fill="#7E57C2"/><circle cx="24" cy="24" r="6" fill="#fff"/><path d="M16 40c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    workorder: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="11" y="6" width="26" height="36" rx="2" stroke="CURRENT_COLOR" stroke-width="2.5"/><path d="M29 6h6v6" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round"/><line x1="17" y1="18" x2="31" y2="18" stroke="CURRENT_COLOR" stroke-width="2" stroke-linecap="round"/><line x1="17" y1="24" x2="31" y2="24" stroke="CURRENT_COLOR" stroke-width="2" stroke-linecap="round"/><line x1="17" y1="30" x2="26" y2="30" stroke="CURRENT_COLOR" stroke-width="2" stroke-linecap="round"/></svg>`,
    message: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="22" r="14" stroke="CURRENT_COLOR" stroke-width="2.5"/><circle cx="18" cy="22" r="1.8" fill="CURRENT_COLOR"/><circle cx="24" cy="22" r="1.8" fill="CURRENT_COLOR"/><circle cx="30" cy="22" r="1.8" fill="CURRENT_COLOR"/><path d="M14 32c2-3 6-5 10-5s8 2 10 5" stroke="CURRENT_COLOR" stroke-width="2" stroke-linecap="round"/></svg>`,
    location: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4C16.3 4 10 10.3 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14z" stroke="CURRENT_COLOR" stroke-width="2.5" fill="none"/><circle cx="24" cy="18" r="5" stroke="CURRENT_COLOR" stroke-width="2.5"/></svg>`,
    notify: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 6c-7.7 0-14 5.8-14 13v8l-3 4h34l-3-4v-8c0-7.2-6.3-13-14-13z" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 38a4 4 0 008 0" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    space: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="14" width="32" height="28" rx="2" stroke="CURRENT_COLOR" stroke-width="2.5"/><path d="M16 14V10a8 8 0 0116 0v4" stroke="CURRENT_COLOR" stroke-width="2.5"/><line x1="8" y1="24" x2="40" y2="24" stroke="CURRENT_COLOR" stroke-width="2"/><rect x="20" y="28" width="8" height="14" stroke="CURRENT_COLOR" stroke-width="2"/></svg>`,
    equipment: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="8" stroke="CURRENT_COLOR" stroke-width="2.5"/><path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M9.9 38.1l4.2-4.2M33.9 14.1l4.2-4.2" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    water: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 6c-8 12-14 18.5-14 26a14 14 0 0028 0c0-7.5-6-14-14-26z" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
    electric: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 4L14 26h10l-4 20 18-26H28l4-16z" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linejoin="round" fill="none"/></svg>`,
    smartcard: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="12" width="36" height="24" rx="3" stroke="CURRENT_COLOR" stroke-width="2.5"/><line x1="6" y1="20" x2="42" y2="20" stroke="CURRENT_COLOR" stroke-width="2"/><rect x="10" y="26" width="12" height="4" rx="1" fill="CURRENT_COLOR" opacity=".3"/></svg>`,
    'canteen-ops': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 22h32v18a2 2 0 01-2 2H10a2 2 0 01-2-2V22z" stroke="CURRENT_COLOR" stroke-width="2.5"/><path d="M16 22V14a8 8 0 0116 0v8" stroke="CURRENT_COLOR" stroke-width="2.5"/><line x1="24" y1="8" x2="24" y2="4" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    'canteen-supervision': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4L8 10v12c0 10 7 18 16 22 9-4 16-12 16-22V10L24 4z" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 24l4 4 8-8" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    building: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="8" width="28" height="36" rx="2" stroke="CURRENT_COLOR" stroke-width="2.5"/><rect x="16" y="14" width="6" height="6" stroke="CURRENT_COLOR" stroke-width="1.8"/><rect x="26" y="14" width="6" height="6" stroke="CURRENT_COLOR" stroke-width="1.8"/><rect x="16" y="26" width="6" height="6" stroke="CURRENT_COLOR" stroke-width="1.8"/><rect x="26" y="26" width="6" height="6" stroke="CURRENT_COLOR" stroke-width="1.8"/><rect x="20" y="34" width="8" height="10" stroke="CURRENT_COLOR" stroke-width="1.8"/></svg>`,
    user: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="16" r="8" stroke="CURRENT_COLOR" stroke-width="2.5"/><path d="M10 42c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    contacts: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="6" width="32" height="36" rx="3" stroke="CURRENT_COLOR" stroke-width="2.5"/><circle cx="24" cy="18" r="5" stroke="CURRENT_COLOR" stroke-width="2"/><path d="M14 34c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="CURRENT_COLOR" stroke-width="2"/></svg>`,
    edit: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8l8 8-20 20H12V28L32 8z" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linejoin="round"/><line x1="26" y1="14" x2="34" y2="22" stroke="CURRENT_COLOR" stroke-width="2.5"/></svg>`,
    lock: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="20" width="28" height="22" rx="3" stroke="CURRENT_COLOR" stroke-width="2.5"/><path d="M16 20v-6a8 8 0 0116 0v6" stroke="CURRENT_COLOR" stroke-width="2.5"/><circle cx="24" cy="31" r="3" fill="CURRENT_COLOR"/></svg>`,
    search: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="21" cy="21" r="12" stroke="CURRENT_COLOR" stroke-width="2.5"/><line x1="30" y1="30" x2="40" y2="40" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    inventory: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="8" width="28" height="34" rx="2" stroke="CURRENT_COLOR" stroke-width="2.5"/><line x1="16" y1="16" x2="32" y2="16" stroke="CURRENT_COLOR" stroke-width="2"/><line x1="16" y1="24" x2="32" y2="24" stroke="CURRENT_COLOR" stroke-width="2"/><line x1="16" y1="32" x2="26" y2="32" stroke="CURRENT_COLOR" stroke-width="2"/><path d="M28 32l4 4 8-8" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    transfer: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 24h28M28 16l8 8-8 8" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 24H12M20 16l-8 8 8 8" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/></svg>`,
    device: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="6" width="24" height="36" rx="3" stroke="CURRENT_COLOR" stroke-width="2.5"/><line x1="20" y1="38" x2="28" y2="38" stroke="CURRENT_COLOR" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="16" r="4" stroke="CURRENT_COLOR" stroke-width="2"/></svg>`,
    'tab-home': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 20L24 6l16 14v22a2 2 0 01-2 2H10a2 2 0 01-2-2V20z" fill="CURRENT_COLOR"/><rect x="18" y="28" width="12" height="16" fill="#fff" opacity=".25" rx="1"/></svg>`,
    'tab-collab': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="16" r="7" fill="CURRENT_COLOR"/><circle cx="32" cy="18" r="6" fill="CURRENT_COLOR" opacity=".65"/><path d="M6 40c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="CURRENT_COLOR"/><path d="M26 40c0-5 4-9 9-9 2.5 0 4.8.9 6.5 2.5" fill="CURRENT_COLOR" opacity=".65"/></svg>`,
    'tab-data': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="14" height="14" rx="2" fill="CURRENT_COLOR"/><rect x="26" y="8" width="14" height="14" rx="2" fill="CURRENT_COLOR"/><rect x="8" y="26" width="14" height="14" rx="2" fill="CURRENT_COLOR"/><rect x="26" y="26" width="14" height="14" rx="2" fill="CURRENT_COLOR"/></svg>`,
    'tab-mine': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" fill="CURRENT_COLOR"/><circle cx="24" cy="18" r="6" fill="#fff" opacity=".9"/><path d="M12 38c2.5-6 7-9 12-9s9.5 3 12 9" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>`
  }

  const ASSET_ICONS = ['building', 'device', 'inventory', 'transfer']

  function icon(name, opts = {}) {
    const size = opts.size || 48
    const cls = opts.className || ''
    const color = opts.color || 'currentColor'
    let svg = SVG[name]
    if (!svg) return ''
    svg = svg.replace(/CURRENT_COLOR/g, color)
    return `<span class="ui-icon ${cls}" style="width:${size}px;height:${size}px;color:${color}">${svg}</span>`
  }

  function propertyIcon(item, opts = {}) {
    const size = opts.size || 44
    const badge = item.badge
    return `<div class="ui-icon-wrap property-icon-wrap">${icon(item.icon || item.id, { size })}${badge ? `<span class="ui-icon-badge">${badge}</span>` : ''}</div>`
  }

  function moduleIcon(name, opts = {}) {
    const size = opts.size || 40
    const color = opts.color || '#4A90E2'
    return `<div class="ui-icon-wrap module-icon-wrap">${icon(name, { size, color })}</div>`
  }

  global.Icons = { icon, propertyIcon, moduleIcon, SVG, ASSET_ICONS }
})(typeof window !== 'undefined' ? window : global)
