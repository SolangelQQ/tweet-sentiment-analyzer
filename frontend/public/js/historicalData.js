async function fetchData() {
    const response = await fetch('http://localhost:5000/data'); // Asegúrate de que la URL coincida con tu servidor
    const data = await response.json();
    return data;
}

function createPieChart(data) {
    const targetCounts = data.target.reduce((acc, target) => {
        acc[target] = (acc[target] || 0) + 1;
        return acc;
    }, {});

    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(targetCounts),
            datasets: [{
                label: 'Target',
                data: Object.values(targetCounts),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        }
    });
}

function createLineChart(data) {
    const dateCounts = data.date.reduce((acc, date) => {
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const sortedDates = Object.keys(dateCounts).sort((a, b) => new Date(a) - new Date(b));

    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedDates,
            datasets: [{
                label: 'Number of Tweets',
                data: sortedDates.map(date => dateCounts[date]),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)'
            }]
        }
    });
}

async function init() {
    const data = await fetchData();
    createPieChart(data);
    createLineChart(data);
}

window.onload = init;
