const chart = LightweightCharts.createChart(document.getElementById('chart'), {
  layout: {
    backgroundColor: '#0d0d0d',
    textColor: '#ffffff',
  },
  grid: {
    vertLines: { color: '#2c2c2c' },
    horzLines: { color: '#2c2c2c' },
  },
  width: window.innerWidth,
  height: 600,
});

const lineSeries = chart.addLineSeries({
  color: '#00bcd4',
  lineWidth: 2,
});

lineSeries.setData([
  { time: '2024-04-01', value: 173 },
  { time: '2024-04-02', value: 174.5 },
  { time: '2024-04-03', value: 171 },
  { time: '2024-04-04', value: 175 },
]);
