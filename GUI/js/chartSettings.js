'use strict'

const ctx = $('#canvas');

const data = {
  type: 'line',
  data: {
  labels: [],
  datasets: [{
    data: [],
    fill: false,
    }]
  },
  options: {
    elements: {
      point: {
        radius: 2,
        pointStyle: 'circle',
        backgroundColor: '#d40078',
        borderColor: '#d40078'
      },
      line: {
        borderColor: '#048191',
        borderWidth: 2
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 10,
        top: 10,
        bottom: 0
      }
    },
    legend: {
      display: false
    },
		responsive: true,
		title: {
			display: false,
		},
		tooltips: {
      enabled: false
		},
		scales: {
			xAxes: [{
        ticks: {
          display: false
        },
				display: true,
				scaleLabel: {
					display: false
				},

			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: lang.chart.pressure,
          fontSize: 14
				},
				ticks: {
					stepSize: 2
				}
			}]
		}
	}
}

//random data
function random() {
  return Math.random();
}

let dotCount = 20;

function addData(chart, data, dotCount) {
  if (chart.data.labels.length < dotCount) {
    chart.data.labels.push('');
  }

  while(chart.data.labels.length > dotCount) {
    chart.data.labels.pop();
  }

  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);

      while (dataset.data.length > dotCount) {
        dataset.data.shift();
      }

  });
  chart.update();
}

function updateChartStep(chart, step) {
  chart.options.scales.yAxes[0].ticks.stepSize = step;
  chart.update();
}

function clearChart(chart) {
  chart.data.labels= [];
  chart.data.datasets[0].data = [];
  chart.update();
}

const myChart = new Chart(ctx, data);
