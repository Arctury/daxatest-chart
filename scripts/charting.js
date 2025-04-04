
const chart = LightweightCharts.createChart(document.getElementById('chart'), {
  width: window.innerWidth,
  height: 600,
  layout: {
    backgroundColor: '#0d0d0d',
    textColor: '#ffffff',
  },
  grid: {
    vertLines: { color: '#2c2c2c' },
    horzLines: { color: '#2c2c2c' },
  },
  timeScale: {
    borderColor: '#71649C',
  },
  priceScale: {
    borderColor: '#71649C',
  },
});

const lineSeries = chart.addSeries({ type: 'line', color: '#00bcd4' });

lineSeries.setData([
  { time: '2024-04-01', value: 173 },
  { time: '2024-04-02', value: 174.5 },
  { time: '2024-04-03', value: 171 },
  { time: '2024-04-04', value: 175 },
  { time: '2024-04-05', value: 178 },
]);

window.addEventListener('resize', () => {
  chart.applyOptions({ width: window.innerWidth });
});
