const MP_CHART = {
  text: '#595959',
  axis: '#e8e8e8',
  split: '#f0f0f0',
};

function buildMpDonutOption(items, { centerLabel, centerValue, compact = false } = {}) {
  const hasMany = items.length > 4;
  const legendBottom = !hasMany;
  const pieCenter = hasMany
    ? ['38%', '50%']
    : [compact ? '50%' : '50%', centerLabel && legendBottom ? '44%' : '50%'];
  const outer = compact ? '55%' : hasMany ? '58%' : '64%';
  const inner = compact ? '40%' : hasMany ? '42%' : '46%';

  const pieData = items.map((i) => ({
    name: i.name,
    value: i.count ?? i.value,
    itemStyle: { color: i.color },
  }));

  const series = [{
    type: 'pie',
    radius: [inner, outer],
    center: pieCenter,
    avoidLabelOverlap: true,
    label: { show: false },
    emphasis: { scale: true, label: { show: false } },
    labelLine: { show: false },
    cursor: 'pointer',
    data: pieData,
  }];

  if (centerLabel) {
    series.push({
      type: 'pie',
      radius: [0, 0],
      center: pieCenter,
      silent: true,
      z: 10,
      label: {
        show: true,
        position: 'center',
        formatter: () => `{val|${centerValue ?? ''}}\n{lbl|${centerLabel}}`,
        rich: {
          val: { fontSize: compact ? 18 : 22, fontWeight: 600, color: '#262626', lineHeight: compact ? 24 : 28, align: 'center' },
          lbl: { fontSize: 11, color: MP_CHART.text, lineHeight: 16, align: 'center' },
        },
      },
      labelLine: { show: false },
      data: [{ value: 0, name: '', itemStyle: { color: 'transparent' } }],
    });
  }

  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: hasMany
      ? {
          orient: 'vertical',
          right: 4,
          top: 'middle',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 8,
          textStyle: { fontSize: 11, color: MP_CHART.text },
        }
      : {
          bottom: 0,
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 12,
          textStyle: { fontSize: 11, color: MP_CHART.text },
        },
    series,
  };
}

function buildMpLineOption(labels, data, { name = '数量', color = '#1890ff', area = true } = {}) {
  return {
    grid: { top: 36, right: 16, bottom: 28, left: 40 },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category', data: labels,
      axisLine: { lineStyle: { color: MP_CHART.axis } },
      axisLabel: { color: MP_CHART.text, fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: MP_CHART.split } },
      axisLabel: { color: MP_CHART.text, fontSize: 10 },
    },
    series: [{
      name, type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
      data, lineStyle: { color, width: 2 }, itemStyle: { color },
      areaStyle: area ? { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
        { offset: 0, color: color + '44' }, { offset: 1, color: color + '08' },
      ] } } : undefined,
    }],
  };
}

function buildMpMultiLineOption(labels, series, { yMax, yFormatter } = {}) {
  return {
    grid: { top: 36, right: 16, bottom: 28, left: 44 },
    tooltip: { trigger: 'axis' },
    legend: { top: 4, textStyle: { fontSize: 11 } },
    xAxis: {
      type: 'category', data: labels,
      axisLine: { lineStyle: { color: MP_CHART.axis } },
      axisLabel: { color: MP_CHART.text, fontSize: 9, interval: 'auto' },
    },
    yAxis: {
      type: 'value',
      max: yMax,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: MP_CHART.split } },
      axisLabel: {
        color: MP_CHART.text,
        fontSize: 10,
        formatter: yFormatter || (yMax ? '{value}' : undefined),
      },
    },
    series: series.map((s) => ({
      name: s.name, type: 'line', smooth: true, symbol: 'circle', symbolSize: 4,
      data: s.data, lineStyle: { color: s.color, width: 2 }, itemStyle: { color: s.color },
      areaStyle: s.area ? { color: s.color + '22' } : undefined,
    })),
  };
}

function buildMpGaugeOption(rate) {
  return {
    series: [{
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      radius: '88%',
      pointer: { show: false },
      progress: { show: true, width: 10, itemStyle: { color: '#1890ff' } },
      axisLine: { lineStyle: { width: 10, color: [[1, '#f0f0f0']] } },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      detail: {
        formatter: '{value}%',
        fontSize: 22,
        color: '#262626',
        offsetCenter: [0, 0],
      },
      data: [{ value: rate }],
    }],
  };
}

function buildMpSankeyOption(nodes, links) {
  return {
    tooltip: { trigger: 'item', triggerOn: 'mousemove' },
    series: [{
      type: 'sankey',
      layout: 'none',
      emphasis: { focus: 'adjacency' },
      data: nodes.map((n) => ({ name: n.name })),
      links: links.map((l) => ({ source: l.source, target: l.target, value: l.value })),
      lineStyle: { color: 'gradient', curveness: 0.5 },
      label: { fontSize: 10, color: MP_CHART.text },
    }],
  };
}

function buildMpHBarOption(items, { valueFormatter = '{c}' } = {}) {
  const names = items.map((i) => i.name).reverse();
  const vals = items.map((i) => i.value).reverse();
  const colors = items.map((i) => i.color || '#1890ff').reverse();
  return {
    grid: { top: 8, right: 56, bottom: 8, left: 88 },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: MP_CHART.split } } },
    yAxis: {
      type: 'category', data: names,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: MP_CHART.text, fontSize: 11 },
    },
    series: [{
      type: 'bar', barWidth: 14,
      data: vals.map((v, i) => ({ value: v, itemStyle: { color: colors[i], borderRadius: [0, 4, 4, 0] } })),
      label: { show: true, position: 'right', formatter: valueFormatter, fontSize: 11 },
    }],
  };
}
