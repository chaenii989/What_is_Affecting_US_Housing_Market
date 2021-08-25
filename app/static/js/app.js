// Home Construction Materials plot

function buildCommoditiesPlot() {

    const url = "/api/housing_data";
    d3.json(url).then(function(myData) {
     console.log(myData);
      
      var date = myData[0].Date;
      var steel_index = myData[0].Steel_Price_Index;
      var lumber_index = myData[0].Lumber_Price_Index;

      var trace1 = {
        x: date,
        y: steel_index,
        type: "scatter",
        mode: 'lines+markers',
        name: 'Steel'
      };
      
      var trace2 = {
        x: date,
        y: lumber_index,
        type: "scatter",
        mode: 'lines+markers',
        name: 'Lumber',
        color: 'red' 
      };
      
      var data = [trace1, trace2];
  
      var layout = {
          title: "Steel & Lumber Price Index Change over Time",
          xaxis: {
            title: 'Year'
            },
          yaxis: {
            title: 'Price Index'
            },
          };
      Plotly.newPlot("commodities", data, layout);
    })
};
  
buildCommoditiesPlot();

//monthly ratio for sales to sold

function buildhousesupplyPlot() {

  const url = "/api/housing_data";
  d3.json(url).then(function(myData) {
   console.log(myData);
    
    var date = myData[0].Date;
    
    var ratio = myData[0].House_Supply;
   

    var trace1 = {
    x: date,
    y: ratio,
    type: "area",
    color: "purple"
    
    }
    var data = [trace1];
    

    var layout = {
        title: "Houses for Sale per One House Sold",
        xaxis: {
            title: 'Year'
            },
          yaxis: {
            title: 'Ratio of Houses for Sale per One House Sold'
        },
    };

    

    Plotly.newPlot("area", data, layout);
    })
};

buildhousesupplyPlot();

// Homeownership Rate Radial Chart
function RadialChart() {

  const url = "/api/housing_data";
  d3.json(url).then(function (d) {
      console.log("Homeownership Rate API", d);
      var homeownership_rate = d[0].Homeownership_Rate;
      console.log("Homeownership Rate Array", homeownership_rate);

      var options = {
          chart: {
              height: 250,
              type: "radialBar"
          },
          series: [homeownership_rate[125]],
          plotOptions: {
              radialBar: {
                  hollow: {
                      margin: 15,
                      size: "70%"
                  },
                  dataLabels: {
                      showOn: "always",
                      name: {
                          offsetY: -10,
                          show: true,
                          color: "#888",
                          fontSize: "13px"
                      },
                      value: {
                          color: "#111",
                          fontSize: "30px",
                          show: true
                      }
                  }
              }
          },
          responsive: [{
              breakpoint: undefined,
              options: {},
          }],
          stroke: {
              lineCap: "round",
          },
          labels: ["Homeownership Rate"],
      };

      var chart = new ApexCharts(document.querySelector("#homeownership"), options);

      chart.render();
  });
}
RadialChart();

//Construction Permits Spline
function PermitsSpline() {

  const url = "/api/housing_data";
  d3.json(url).then(function (d) {
      console.log("Home Units API", d);
      var date = d[0].Date;
      var new_permits = d[0].New_Housing_Permits;
      var units_started = d[0].Units_Authorized_Started;
      var units_under_construction = d[0].Under_Construction;
      var units_constructed = d[0].Units_Completed;

      var options = {
          series: [{
              name: 'New Housing Permits',
              data: new_permits
          }, {
              name: 'Housing Units Started',
              data: units_started
          }, {
              name: 'Housing Units Under Construction',
              data: units_under_construction
          }, {
              name: 'Housing Units Constructed',
              data: units_constructed
          }],
          chart: {
              height: 400,
              type: 'area'
          },
          dataLabels: {
              enabled: false
          },
          stroke: {
              curve: 'smooth'
          },
          title: {
              text: 'New Housing Permits & Housing Unit Construction'
          },
          xaxis: {
              categories: date,
              title: {
                  text: 'Date'
              }
          },
          yaxis: {
              title: {
                  text: 'Units in Thousands'
              }
          }
      };

      var chart = new ApexCharts(document.querySelector("#permitsConstructed"), options);

      chart.render();
  });
};

PermitsSpline();

// Line Column Mixed Chart
function buildmixedPlot() {

    const url = "/api/housing_data";
    d3.json(url).then(function (myData) {

        var date = myData[0].Date;
        var rate = myData[0].Interest_Rate;
        var price = myData[0].Average_Home_Price;

        var options = {
            series: [{
                name: 'Average Home Price',
                type: 'column',
                data: price
            }, {
                name: 'Interest Rate',
                type: 'line',
                data: rate
            }],
            chart: {
                height: 400,
                type: 'line',
            },
            stroke: {
                width: [0, 4]
            },
            title: {
                text: 'History of Home price & Interest Rates'
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1]
            },
            labels: date,
            xaxis: {
                type: 'datetime'
            },
            yaxis: [{
                title: {
                    text: 'Average Home Price',
                },

            }, {
                opposite: true,
                title: {
                    text: 'Interest Rate'
                }
            }]
        };

        var chart = new ApexCharts(document.querySelector("#linecolumn"), options);
        chart.render();
    });
};

buildmixedPlot();

// Bar Chart: Homeownership Rate

function HomeownershipBar() {

    const url = "/api/housing_data";
    d3.json(url).then(function (myData) {

        var date = myData[0].Date;
        var homeownership_rate = myData[0].Homeownership_Rate;

        var options = {
            chart: {
                height: 300,
                type: 'bar'
            },
            series: [{
                name: 'Homeownership Rate',
                data: homeownership_rate
            }],
            title: {
                text: 'Homeownership Rate'
            },
            dataLabels: {
                enabled: false
            },
            labels: date,
            xaxis: {
                categories: date,
                title: {
                    text: 'Date',
                }
            },
            yaxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'Homeownership Rate (%)',
                }
            }
        }

        var chart = new ApexCharts(document.querySelector("#HomeownershipBar"), options);

        chart.render();
    });
}

HomeownershipBar();
