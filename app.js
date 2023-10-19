'use strict';
var request = require('request');

var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=Y8LETOLT99NRN9CG';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      
      var timeSeries = data['Time Series (1min)'];

      // Extract data for the chart
      var labels = Object.keys(timeSeries).reverse(); // To make sure it starts from the oldest
      var dataset = labels.map(time => timeSeries[time]['4. close']); // This extracts the closing prices

      var ctx = document.getElementById('ibmChart').getContext('2d');
      var chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [{
                  label: 'IBM Closing Price',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)', // Example color
                  borderColor: 'rgba(75, 192, 192, 1)', // Example color
                  data: dataset
              }]
          },
          options: {
              scales: {
                  x: {
                      type: 'time',
                      time: {
                          unit: 'minute'
                      }
                  }
              }
          }
      });
    }
});
