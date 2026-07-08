function buildSecMonitorSpaceOption() {
  const d = SECURITY_DATA.monitorSpaceDistribution;
  return {
    grid: { top: 28, right: 16, bottom: 24, left: 40 },
    xAxis: {
      type: 'category', data: d.categories,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    yAxis: {
      type: 'value', max: 100,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [{
      type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
      data: d.values,
      lineStyle: { color: CHART_THEME.cyan, width: 2 },
      itemStyle: { color: CHART_THEME.cyan },
      areaStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: CHART_THEME.cyanGradient },
      },
    }],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildSecMonitorFaultOption() {
  const items = [...SECURITY_DATA.monitorFaultTop10.items].reverse();
  const max = Math.max(...items.map((i) => i.value), 1);
  return {
    grid: { top: 8, right: 24, bottom: 8, left: 72 },
    xAxis: {
      type: 'value', max,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category', data: items.map((i) => i.name),
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    series: [{
      type: 'bar', barWidth: 10,
      data: items.map((i) => i.value),
      itemStyle: { color: CHART_THEME.cyan, borderRadius: [0, 4, 4, 0] },
      label: { show: true, position: 'right', color: '#fff', fontSize: 9 },
    }],
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildSecAccessPersonOption() {
  const d = SECURITY_DATA.accessPersonRatio;
  return {
    tooltip: { trigger: 'item', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
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

function buildSecAccessPassOption() {
  const d = SECURITY_DATA.accessPassStats;
  return {
    grid: { top: 36, right: 12, bottom: 22, left: 36 },
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
    series: [{
      type: 'bar', barWidth: 14,
      data: d.values,
      itemStyle: { color: CHART_THEME.cyan, borderRadius: [3, 3, 0, 0] },
    }],
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
  };
}

function buildSecParkingVehicleOption() {
  const d = SECURITY_DATA.parkingVehicleType;
  return {
    tooltip: { trigger: 'item', backgroundColor: 'rgba(10,30,60,0.88)', borderColor: 'rgba(0,191,255,0.3)', textStyle: { color: '#fff', fontSize: 12 } },
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
