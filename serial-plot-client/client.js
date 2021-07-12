const webSocketPort = 1200;
const socket = new WebSocket('ws://localhost:' + webSocketPort);
socket.addEventListener('open', function(event) {
	console.log("web socket is open on client");
	socket.send("start"); // send something to start getting values
});

var arr1 = [];
var arr2 = [];
var arr3 = [];

addEmptyValues(arr1, 20);
addEmptyValues(arr2, 20);
addEmptyValues(arr3, 20);

var charts = [];
var scale = 1;
var value = 0;

function initialize() {
	charts.push(new Chart(document.getElementById("chart0"), {
		type: 'line',
		data: {
			labels: 'Sensor A0',
			datasets: [{
				data: arr1,
				backgroundColor: 'rgba(255, 99, 132, 0.1)',
				borderColor: 'rgb(255, 99, 132)',
				borderWidth: 2,
				lineTension: 0.25,
				pointRadius: 0
			}]
		},
		options: {
			responsive: true,
			animation: {
				duration: 250 * 1.5,
				easing: 'linear'
			},
			legend: false,
			scales: {
				xAxes: [{
					type: "time",
					display: true
				}],
				yAxes: [{
					// ticks: {
					// 	max: 1,
					// 	min: -1
					// }
				}]
			}
		}
	}), new Chart(document.getElementById("chart1"), {
		type: 'line',
		data: {
			labels: 'Sensor A1',
			datasets: [{
				data: arr2,
				backgroundColor: 'rgba(255, 99, 132, 0.1)',
				borderColor: 'rgb(55, 199, 132)',
				borderWidth: 2
			}]
		},
		options: {
			responsive: true,
			animation: {
				duration: 250 * 1.5,
				easing: 'linear'
			},
			legend: false,
			scales: {
				xAxes: [{
					type: "time",
					display: true
				}],
				yAxes: [{
					// ticks: {
					// 	max: 1,
					// 	min: -1
					// }
				}]
			}
		}
	}));
}

function addEmptyValues(arr, n) {
	for (var i = 0; i < n; i++) {
		arr.push({
			x: moment().subtract((n - i) * 250, 'milliseconds').toDate(),
			y: null
		});
	}
}

function rescale() {
	var padding = [];

	addEmptyValues(padding, 10);
	values.splice.apply(values, padding);

	scale++;
}

function updateCharts() {
	charts.forEach(function(chart) {
		chart.update();
	});
}

socket.addEventListener('message', function(event) {
	initialize();
	const hexStr = event.data;
	pointsArr = hexStr.split(", ");
	arr1.push({
		x: new Date(),
		y: pointsArr[0]
	});
	arr1.shift();
	console.log(arr1);
	arr2.push({
		x: new Date(),
		y: pointsArr[1]
	})
	// arr3.push({
	// 	x: new Date(),
	// 	y: pointsArr[2]
	// })
	updateCharts();
});

function updatePlots() {
	if (socket.readyState == 1) { // 1: OPEN
		socket.send(''); // send something to get next point
	}
}

setInterval(updatePlots, 10);