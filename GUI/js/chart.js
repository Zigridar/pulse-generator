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
        // backgroundColor: '#048191',
        borderColor: '#048191',
        borderWidth: 2
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    legend: {
      display: false
    },
		responsive: true,
		title: {
			display: true,
			text: 'Показания вакууметра',
      fontSize: 16
		},
		tooltips: {
      enabled: false
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: false,
					labelString: 'Month',
          fontSize: 14
				},

			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Давление',
          fontSize: 14
				},
				ticks: {
					// stepSize: 100,
          // min:0,
          // max: 1000
				}
			}]
		}
	}
}

function random() {
  return Math.random();
}

function addData(chart, label, data) {
  if (label < 100) {
    chart.data.labels.push(label);
  }
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
        if (label > 100) {
          dataset.data.shift();
        }
    });
    chart.update();
}

const myChart = new Chart(ctx, data);
