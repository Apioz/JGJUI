/* 物业管理 / 能源 / 环境 / 食堂 — 图表配置 */

function buildPropertyCategoryOption() {
  const d = DASHBOARD_DATA.propertyCategory;
  return {
    grid: { top: 36, right: 12, bottom: 22, left: 36 },
    legend: {
      top: 4, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['报修', '巡检', '维保'],
    },
    xAxis: {
      type: 'category', data: d.weeks,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      { name: '报修', type: 'bar', barWidth: 8, data: d.repair, itemStyle: { color: CHART_THEME.cyan, borderRadius: [2, 2, 0, 0] } },
      { name: '巡检', type: 'bar', barWidth: 8, data: d.inspection, itemStyle: { color: '#3ddc84', borderRadius: [2, 2, 0, 0] } },
      { name: '维保', type: 'bar', barWidth: 8, data: d.maintenance, itemStyle: { color: CHART_THEME.orange, borderRadius: [2, 2, 0, 0] } },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildWorkDurationOption() {
  const d = DASHBOARD_DATA.workDuration;
  return {
    grid: { top: 8, right: 8, bottom: 22, left: 36 },
    xAxis: {
      type: 'category', data: d.labels,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 8, interval: 0, rotate: 20 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [{
      type: 'bar', barWidth: 14, data: d.values,
      itemStyle: { color: CHART_THEME.cyan, borderRadius: [2, 2, 0, 0] },
    }],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildEnergyHourlyOption(type) {
  const d = type === 'water' ? DASHBOARD_DATA.waterHourly : DASHBOARD_DATA.energyHourly;
  return {
    grid: { top: 28, right: 12, bottom: 22, left: 36 },
    legend: {
      top: 0, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['今日', '昨日'],
    },
    xAxis: {
      type: 'category', data: d.hours,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 8, interval: 1 },
    },
    yAxis: {
      type: 'value', max: 250,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      { name: '今日', type: 'line', smooth: true, symbol: 'circle', symbolSize: 4, data: d.today, lineStyle: { color: CHART_THEME.cyan, width: 2 }, itemStyle: { color: CHART_THEME.cyan } },
      { name: '昨日', type: 'line', smooth: true, symbol: 'circle', symbolSize: 4, data: d.yesterday, lineStyle: { color: '#ffd60a', width: 2 }, itemStyle: { color: '#ffd60a' } },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildEnergyPeriodOption(type, period) {
  let d;
  if (type === 'water') {
    d = DASHBOARD_DATA.waterMonthly;
  } else {
    d = period === 'month' ? DASHBOARD_DATA.energyMonthly : DASHBOARD_DATA.energyYearlyChart;
  }
  return {
    grid: { top: 28, right: 12, bottom: 22, left: 36 },
    legend: {
      top: 0, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: d.legend,
    },
    xAxis: {
      type: 'category', data: d.labels,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 8, interval: period === 'month' ? 4 : 0 },
    },
    yAxis: {
      type: 'value', max: period === 'month' ? 250 : 3000,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      { name: d.legend[0], type: 'line', smooth: true, symbol: 'circle', symbolSize: 4, data: d.current, lineStyle: { color: CHART_THEME.cyan, width: 2 }, itemStyle: { color: CHART_THEME.cyan } },
      { name: d.legend[1], type: 'line', smooth: true, symbol: 'circle', symbolSize: 4, data: d.previous, lineStyle: { color: '#ffd60a', width: 2 }, itemStyle: { color: '#ffd60a' } },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildAirQualityOption(mode) {
  const d = DASHBOARD_DATA.airQuality;
  const data = mode === 'max' ? d.todayMax : d.todayMin;
  const prev = mode === 'max' ? d.yesterdayMax : d.yesterdayMin;
  return {
    grid: { top: 36, right: 8, bottom: 22, left: 36 },
    legend: {
      top: 4, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['今天', '昨天'],
    },
    xAxis: {
      type: 'category', data: d.categories,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 8, interval: 0, rotate: 25 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      { name: '今天', type: 'bar', barWidth: 8, data, itemStyle: { color: CHART_THEME.cyan, borderRadius: [2, 2, 0, 0] } },
      { name: '昨天', type: 'bar', barWidth: 8, data: prev, itemStyle: { color: '#1a6eb5', borderRadius: [2, 2, 0, 0] } },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildAlarmOption() {
  const d = DASHBOARD_DATA.deviceAlarm;
  return {
    grid: { top: 28, right: 12, bottom: 22, left: 36 },
    legend: {
      top: 0, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['当月', '上月'],
    },
    xAxis: {
      type: 'category', data: d.days,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 8 },
    },
    yAxis: {
      type: 'value', min: 0, max: 4,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      { name: '当月', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5, data: d.current, lineStyle: { color: CHART_THEME.cyan, width: 2 }, itemStyle: { color: CHART_THEME.cyan } },
      { name: '上月', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5, data: d.previous, lineStyle: { color: CHART_THEME.orange, width: 2 }, itemStyle: { color: CHART_THEME.orange } },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildCanteenGuestOption() {
  const d = DASHBOARD_DATA.canteenGuest;
  return {
    grid: { top: 28, right: 12, bottom: 22, left: 36 },
    legend: {
      top: 0, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['线上', '线下'],
    },
    xAxis: {
      type: 'category', data: d.days,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      { name: '线上', type: 'bar', barWidth: 10, data: d.online, itemStyle: { color: '#1a6eb5', borderRadius: [2, 2, 0, 0] } },
      { name: '线下', type: 'bar', barWidth: 10, data: d.offline, itemStyle: { color: CHART_THEME.cyan, borderRadius: [2, 2, 0, 0] } },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildCanteenMarketingOption() {
  const d = DASHBOARD_DATA.canteenMarketing;
  return {
    grid: { top: 28, right: 12, bottom: 22, left: 44 },
    legend: {
      top: 0, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['刷卡人数'],
    },
    xAxis: {
      type: 'category', data: d.days,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [{
      name: '刷卡人数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
      data: d.people,
      lineStyle: { color: CHART_THEME.cyan, width: 2 },
      itemStyle: { color: CHART_THEME.cyan },
      label: { show: true, position: 'top', color: '#fff', fontSize: 10, formatter: '{c}人' },
    }],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildPublicVehicleOption() {
  const d = DASHBOARD_DATA.publicVehicle;
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
    legend: {
      orient: 'vertical', right: 8, top: 'center',
      itemWidth: 8, itemHeight: 8, itemGap: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
    },
    series: [{
      type: 'pie', radius: ['42%', '68%'], center: ['36%', '50%'],
      avoidLabelOverlap: true, label: { show: false }, labelLine: { show: false },
      data: d.items.map((item) => ({ name: item.name, value: item.value, itemStyle: { color: item.color } })),
    }],
  };
}

function buildVehicleTrafficOption() {
  const d = DASHBOARD_DATA.vehicleTraffic;
  return {
    grid: { top: 36, right: 12, bottom: 22, left: 36 },
    legend: {
      top: 4, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['当月车辆数', '上月车辆数'],
    },
    xAxis: {
      type: 'category', data: d.days,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    yAxis: {
      type: 'value', max: 250,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      { name: '当月车辆数', type: 'bar', barWidth: 8, data: d.current, itemStyle: { color: CHART_THEME.cyan, borderRadius: [2, 2, 0, 0] } },
      { name: '上月车辆数', type: 'bar', barWidth: 8, data: d.previous, itemStyle: { color: CHART_THEME.orange, borderRadius: [2, 2, 0, 0] } },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildVisitorTrendOption() {
  const d = DASHBOARD_DATA.visitorTrend;
  return {
    grid: { top: 28, right: 12, bottom: 22, left: 36 },
    legend: {
      top: 0, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['当月访客量', '上月访客量'],
    },
    xAxis: {
      type: 'category', data: d.days,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    yAxis: {
      type: 'value', max: 250,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      { name: '当月访客量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5, data: d.current, lineStyle: { color: CHART_THEME.cyan, width: 2 }, itemStyle: { color: CHART_THEME.cyan } },
      { name: '上月访客量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5, data: d.previous, lineStyle: { color: CHART_THEME.orange, width: 2 }, itemStyle: { color: CHART_THEME.orange } },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildFireAlarmTrendOption() {
  const d = DASHBOARD_DATA.fireAlarmTrend;
  return {
    grid: { top: 30, right: 20, bottom: 24, left: 40 },
    legend: {
      top: 4, right: 20,
      textStyle: { color: CHART_THEME.textColor, fontSize: 11 },
      itemWidth: 12, itemHeight: 8,
      data: ['报警总数', '报警已完成数'],
    },
    xAxis: {
      type: 'category', data: d.months,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 8, interval: 0, rotate: 25 },
    },
    yAxis: {
      type: 'value', min: 0, max: 100,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 10 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      { name: '报警总数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5, data: d.total, lineStyle: { color: CHART_THEME.cyan, width: 2 }, itemStyle: { color: CHART_THEME.cyan } },
      { name: '报警已完成数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5, data: d.completed, lineStyle: { color: CHART_THEME.orange, width: 2 }, itemStyle: { color: CHART_THEME.orange } },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildFireGaugeOption(g) {
  return {
    series: [{
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      radius: '88%',
      center: ['50%', '50%'],
      pointer: { show: false },
      progress: { show: true, width: 10, roundCap: true, itemStyle: { color: g.color } },
      axisLine: { lineStyle: { width: 10, color: [[1, 'rgba(0,191,255,0.12)']] } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      title: {
        show: true,
        offsetCenter: [0, '38%'],
        fontSize: 10,
        color: 'rgba(255,255,255,0.9)',
      },
      detail: {
        formatter: '{value}%',
        fontSize: 18,
        fontWeight: 600,
        color: '#fff',
        offsetCenter: [0, '-6%'],
      },
      data: [{ value: g.value, name: g.label }],
    }],
  };
}

function buildOverviewTrafficOption() {
  const d = DASHBOARD_DATA.overviewTraffic;
  return {
    grid: { top: 36, right: 12, bottom: 22, left: 36 },
    legend: {
      top: 4, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['车辆', '人员'],
    },
    xAxis: {
      type: 'category', data: d.days,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    yAxis: {
      type: 'value', max: 200,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      { name: '车辆', type: 'bar', barWidth: 8, data: d.vehicle, itemStyle: { color: CHART_THEME.cyan, borderRadius: [2, 2, 0, 0] } },
      { name: '人员', type: 'bar', barWidth: 8, data: d.person, itemStyle: { color: 'rgba(255,255,255,0.75)', borderRadius: [2, 2, 0, 0] } },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildOverviewEnergyOption(type) {
  const d = type === 'water' ? DASHBOARD_DATA.waterHourly : DASHBOARD_DATA.energyHourly;
  return {
    grid: { top: 36, right: 12, bottom: 22, left: 36 },
    legend: {
      top: 4, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['今日', '昨日'],
    },
    xAxis: {
      type: 'category', data: d.hours,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 8, interval: 1 },
    },
    yAxis: {
      type: 'value', max: 250,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      {
        name: '今日', type: 'line', smooth: true, symbol: 'circle', symbolSize: 4,
        data: d.today, lineStyle: { color: CHART_THEME.cyan, width: 2 },
        itemStyle: { color: CHART_THEME.cyan },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: CHART_THEME.cyanGradient } },
      },
      {
        name: '昨日', type: 'line', smooth: true, symbol: 'circle', symbolSize: 4,
        data: d.yesterday, lineStyle: { color: CHART_THEME.orange, width: 2, type: 'dashed' },
        itemStyle: { color: CHART_THEME.orange },
      },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildOverviewWorkOrderOption() {
  const { days, completed, pending } = DASHBOARD_DATA.overviewWorkOrder;
  return {
    grid: { top: 30, right: 16, bottom: 24, left: 36 },
    legend: {
      top: 4, right: 10,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 10, itemHeight: 6,
      data: ['已处理工单', '待处理工单'],
    },
    xAxis: {
      type: 'category', data: days,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 8, interval: 4 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 10 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      {
        name: '已处理工单', type: 'line', smooth: true, symbol: 'circle', symbolSize: 4,
        data: completed, lineStyle: { color: '#3ddc84', width: 2 },
        itemStyle: { color: '#3ddc84' },
      },
      {
        name: '待处理工单', type: 'line', smooth: true, symbol: 'circle', symbolSize: 4,
        data: pending, lineStyle: { color: CHART_THEME.cyan, width: 2, type: 'dashed' },
        itemStyle: { color: CHART_THEME.cyan },
      },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildParkTrendOption() {
  const { months, space, equipment } = DASHBOARD_DATA.parkTrendChart;
  return {
    grid: { top: 30, right: 20, bottom: 24, left: 40 },
    legend: {
      top: 4, right: 20,
      textStyle: { color: CHART_THEME.textColor, fontSize: 11 },
      itemWidth: 12, itemHeight: 8,
      data: ['空间数量', '设备数量'],
    },
    xAxis: {
      type: 'category', data: months,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 8, interval: 0, rotate: 25 },
    },
    yAxis: {
      type: 'value', min: 0, max: 100,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 10 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      {
        name: '空间数量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
        data: space, lineStyle: { color: CHART_THEME.cyan, width: 2 },
        itemStyle: { color: CHART_THEME.cyan },
      },
      {
        name: '设备数量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
        data: equipment, lineStyle: { color: CHART_THEME.orange, width: 2 },
        itemStyle: { color: CHART_THEME.orange },
      },
    ],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}
