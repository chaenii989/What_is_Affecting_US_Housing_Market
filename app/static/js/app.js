// Home price plot

function buildlinePlot() {

  const url = "/api/average_home_price";
  d3.json(url).then(function(myData) {
   console.log(myData);
    
    var date = myData[0].Date;
    
    var price = myData[0].Average_Home_Price;
   

    var trace1 = {
    x: date,
    y: price,
    type: "scatter"
    
    }
    var data = [trace1];
    

    var layout = {
        title: "Average Home Price", 
    }
    

    Plotly.newPlot("line", data, layout);
})
};

buildlinePlot();

// Home Construction Materials plot

function buildCommoditiesPlot() {

    const url = "/api/lumber_steel";
    d3.json(url).then(function(myData) {
     console.log(myData);
      
      var date = myData[0].Date;
      var steel_pct_change = myData[0].Steel_Percent_Change;
      var lumber_pct_change = myData[0].Lumber_Percent_Change;

      var trace1 = {
        x: date,
        y: steel_pct_change,
        type: "scatter",
        mode: 'lines+markers',
        name: 'Steel'
      };
      
      var trace2 = {
        x: date,
        y: lumber_pct_change,
        type: "scatter",
        mode: 'lines+markers',
        name: 'Lumber'
      };
      
      var data = [trace1, trace2];
  
      var layout = {
          title: "Steel & Lumber Percent Change in Price Index over Time", 
      }
      
  
      Plotly.newPlot("commodities", data, layout);
  })
};
  
buildCommoditiesPlot();

//monthly ratio for sales to sold

function buildareaPlot() {

  const url = "/api/monthly_house_supply";
  d3.json(url).then(function(myData) {
   console.log(myData);
    
    var date = myData[0].Date;
    
    var ratio = myData[0].Ratio_of_Sale_Sold;
   

    var trace1 = {
    x: date,
    y: ratio,
    type: "area"
    
    }
    var data = [trace1];
    

    var layout = {
        title: "Ratio for Sales to Sold", 
    }
    

    Plotly.newPlot("area", data, layout);
})
};

buildareaPlot();

// Homeownership Rate Radial Chart
function RadialChart() {

  const url = "/api/homeownership_rate";
  d3.json(url).then(function (d) {
      console.log("Homeownership Rate API", d);
      var homeownership_rate = d[0].Home_Ownership_Rate;
      console.log("Homeownership Rate Array", homeownership_rate);

      var options = {
          chart: {
              height: 280,
              type: "radialBar"
          },
          series: [homeownership_rate[4]],
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

  const url = "/api/home_units";
  d3.json(url).then(function (d) {
      console.log("Home Units API", d);
      var date = d[0].Date;
      console.log("Date", date);
      var new_permits_thousands = d[0].new_permits_thousands;
      console.log("new_permits_thousands", new_permits_thousands);
      var units_not_started_thousands = d[0].units_not_started_thousands;
      console.log("units_not_started_thousands", units_not_started_thousands);
      var units_started_thousands = d[0].units_started_thousands;
      console.log("units_started_thousands", units_started_thousands);
      var units_under_construction_thousands = d[0].units_under_construction_thousands;
      console.log("units_under_construction_thousands", units_under_construction_thousands);
      var units_constructed_thousands = d[0].units_constructed_thousands;
      console.log("units_constructed_thousands", units_constructed_thousands);

      var options = {
          series: [{
              name: 'New Housing Permits',
              data: new_permits_thousands
          }, {
              name: 'Housing Units Not Started',
              data: units_not_started_thousands
          }, {
              name: 'Housing Units Started',
              data: units_started_thousands
          }, {
              name: 'Housing Units Under Construction',
              data: units_under_construction_thousands
          }, {
              name: 'Housing Units Constructed',
              data: units_constructed_thousands
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
