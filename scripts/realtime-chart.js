let randomFactor = 25 + Math.random() * 25;
const samplePoint = i =>
    i * (0.5 + Math.sin(i / 1) * 0.2 + Math.sin(i / 2) * 0.4 + Math.sin(i / randomFactor) * 0.8 + Math.sin(i / 50) * 0.5) + 200 + i * 2;

function generateData(numberOfCandles = 500, updatesPerCandle = 5, startAt = 100) {
    const createCandle = (val, time) => ({ time, open: val, high: val, low: val, close: val });
    const updateCandle = (candle, val) => ({
        time: candle.time,
        close: val,
        open: candle.open,
        low: Math.min(candle.low, val),
        high: Math.max(candle.high, val),
    });

    randomFactor = 25 + Math.random() * 25;
    const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
    const numberOfPoints = numberOfCandles * updatesPerCandle;
    const initialData = [];
    const realtimeUpdates = [];
    let lastCandle;
    let previousValue = samplePoint(-1);
    for (let i = 0; i < numberOfPoints; ++i) {
        if (i % updatesPerCandle === 0) {
            date.setUTCDate(date.getUTCDate() + 1);
        }
        const time = date.getTime() / 1000;
        let value = samplePoint(i);
        const diff = (value - previousValue) * Math.random();
        value = previousValue + diff;
        previousValue = value;
        if (i % updatesPerCandle === 0) {
            const candle = createCandle(value, time);
            lastCandle = candle;
            if (i >= startAt) {
                realtimeUpdates.push(candle);
            }
        } else {
            const newCandle = updateCandle(lastCandle, value);
            lastCandle = newCandle;
            if (i >= startAt) {
                realtimeUpdates.push(newCandle);
            } else if ((i + 1) % updatesPerCandle === 0) {
                initialData.push(newCandle);
            }
        }
    }
    return { initialData, realtimeUpdates };
}

const container = document.getElementById('container');
const chart = LightweightCharts.createChart(container, {
    layout: { textColor: '#ffffff', background: { type: 'solid', color: '#0d0d0d' } },
    height: 600,
    width: container.clientWidth
});

const series = chart.addCandlestickSeries({
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
});

const data = generateData(250, 5, 50);
series.setData(data.initialData);
chart.timeScale().fitContent();

function* getNextRealtimeUpdate(realtimeData) {
    for (const dataPoint of realtimeData) {
        yield dataPoint;
    }
    return null;
}

const streamingDataProvider = getNextRealtimeUpdate(data.realtimeUpdates);

const intervalID = setInterval(() => {
    const update = streamingDataProvider.next();
    if (update.done) {
        clearInterval(intervalID);
        return;
    }
    series.update(update.value);
}, 100);
