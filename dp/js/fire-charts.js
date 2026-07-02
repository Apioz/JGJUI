function buildFireRadarOption(radar) {
  return {
    radar: {
      center: ['50%', '52%'],
      radius: '62%',
      indicator: radar.indicators,
      axisName: { color: 'rgba(255,255,255,0.85)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(0,191,255,0.12)' } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: 'rgba(0,191,255,0.2)' } },
    },
    series: [{
      type: 'radar',
      symbol: 'circle',
      symbolSize: 4,
      data: [{
        value: radar.values,
        name: '消防安全',
        areaStyle: { color: 'rgba(0,229,255,0.25)' },
        lineStyle: { color: '#00e5ff', width: 2 },
        itemStyle: { color: '#00e5ff' },
      }],
    }],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
  };
}

function buildFireDeviceStatusPieOption(normal, abnormal) {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
    legend: {
      orient: 'vertical',
      right: 4,
      top: 'center',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    series: [{
      type: 'pie',
      radius: ['48%', '72%'],
      center: ['38%', '50%'],
      label: { show: false },
      labelLine: { show: false },
      data: [
        { name: '设备正常数', value: normal, itemStyle: { color: '#00e5ff' } },
        { name: '设备异常数', value: abnormal, itemStyle: { color: '#ff9500' } },
      ],
    }],
  };
}

function buildFireRateDonutOption(rate, label, normalLabel, normalVal, abnormalLabel, abnormalVal, color) {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
    legend: {
      orient: 'vertical',
      right: 4,
      top: 'center',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 9 },
    },
    graphic: [{
      type: 'group',
      left: '38%',
      top: '50%',
      bounding: 'raw',
      children: [
        {
          type: 'text',
          style: {
            text: `${rate}%`,
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fill: CHART_THEME.textColor,
            fontSize: 16,
            fontWeight: 'bold',
          },
          top: -6,
        },
        {
          type: 'text',
          style: {
            text: label,
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fill: 'rgba(255,255,255,0.75)',
            fontSize: 9,
          },
          top: 14,
        },
      ],
    }],
    series: [{
      type: 'pie',
      radius: ['48%', '72%'],
      center: ['38%', '50%'],
      label: { show: false },
      labelLine: { show: false },
      data: [
        { name: normalLabel, value: normalVal || 1, itemStyle: { color: color || '#00e5ff' } },
        { name: abnormalLabel, value: abnormalVal, itemStyle: { color: '#ff9500' } },
      ],
    }],
  };
}

function buildFireMonthlyTrendOption(data) {
  return {
    grid: { top: 32, right: 12, bottom: 22, left: 36 },
    legend: {
      top: 4, right: 8,
      textStyle: { color: CHART_THEME.textColor, fontSize: 10 },
      itemWidth: 12, itemHeight: 8,
      data: ['报警数', '故障数'],
    },
    xAxis: {
      type: 'category',
      data: data.days,
      axisLine: { lineStyle: { color: CHART_THEME.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 8, interval: 4 },
    },
    yAxis: {
      type: 'value',
      max: 5,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: CHART_THEME.textColor, fontSize: 9 },
      splitLine: { lineStyle: { color: CHART_THEME.splitLine } },
    },
    series: [
      {
        name: '报警数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 4,
        data: data.alarms, lineStyle: { color: CHART_THEME.cyan, width: 2 },
        itemStyle: { color: CHART_THEME.cyan },
      },
      {
        name: '故障数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 4,
        data: data.faults, lineStyle: { color: CHART_THEME.orange, width: 2 },
        itemStyle: { color: CHART_THEME.orange },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 30, 60, 0.88)',
      borderColor: 'rgba(0, 191, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
  };
}
