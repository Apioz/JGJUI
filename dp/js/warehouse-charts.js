function buildGwStockPieOption(data, warehouses) {
  return {
    tooltip: { trigger: 'item', formatter: '{b}<br/>{c} 件 ({d}%)' },
    legend: {
      orient: 'vertical', right: 12, top: 'center',
      itemWidth: 10, itemHeight: 10,
      textStyle: { fontSize: 12, color: '#595959' },
    },
    series: [{
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['38%', '50%'],
      label: { show: true, formatter: '{b}\n{d}%', fontSize: 11 },
      data: warehouses.map((w, i) => ({
        name: w.shortName,
        value: i === 0 ? data.w1 : data.w2,
        itemStyle: { color: w.color },
      })),
    }],
  };
}

function buildGwTrendOption(labels, series, warehouses) {
  return {
    tooltip: { trigger: 'axis' },
    legend: {
      top: 4, right: 12,
      textStyle: { fontSize: 11, color: '#595959' },
      data: ['合计', ...warehouses.map((w) => w.shortName)],
    },
    grid: { top: 40, right: 20, bottom: 28, left: 50 },
    xAxis: {
      type: 'category', data: labels,
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisTick: { show: false },
      axisLabel: { color: '#8c8c8c', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: '#8c8c8c', fontSize: 10 },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
    },
    series: [
      {
        name: '合计', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
        data: series.total, lineStyle: { color: '#262626', width: 2 },
        itemStyle: { color: '#262626' },
      },
      {
        name: warehouses[0].shortName, type: 'bar', barWidth: '18%',
        data: series.w1, itemStyle: { color: warehouses[0].color, borderRadius: [3, 3, 0, 0] },
      },
      {
        name: warehouses[1].shortName, type: 'bar', barWidth: '18%',
        data: series.w2, itemStyle: { color: warehouses[1].color, borderRadius: [3, 3, 0, 0] },
      },
    ],
  };
}

function buildGwDualWarehouseTrendOption(labels, w1Data, w2Data, warehouses) {
  return {
    tooltip: { trigger: 'axis' },
    legend: {
      top: 4, right: 12,
      textStyle: { fontSize: 11, color: '#595959' },
      data: warehouses.map((w) => w.shortName),
    },
    grid: { top: 36, right: 20, bottom: 28, left: 50 },
    xAxis: {
      type: 'category', data: labels,
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisTick: { show: false },
      axisLabel: { color: '#8c8c8c', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: '#8c8c8c', fontSize: 10 },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
    },
    series: [
      {
        name: warehouses[0].shortName, type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
        data: w1Data, lineStyle: { color: warehouses[0].color, width: 2 },
        itemStyle: { color: warehouses[0].color },
      },
      {
        name: warehouses[1].shortName, type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
        data: w2Data, lineStyle: { color: warehouses[1].color, width: 2 },
        itemStyle: { color: warehouses[1].color },
      },
    ],
  };
}

function buildGwSingleTrendOption(labels, values, color) {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 20, right: 16, bottom: 28, left: 44 },
    xAxis: {
      type: 'category', data: labels,
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisTick: { show: false },
      axisLabel: { color: '#8c8c8c', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: '#8c8c8c', fontSize: 10 },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
    },
    series: [{
      type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
      data: values,
      lineStyle: { color, width: 2 },
      itemStyle: { color },
      areaStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: color + '33' }, { offset: 1, color: color + '05' }],
        },
      },
    }],
  };
}
