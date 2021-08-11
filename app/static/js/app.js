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

//New Housing Permits & Housing Units Constructed Spline
function PermitsSpline() {

  const url = "/api/home_units";
  d3.json(url).then(function (d) {
      console.log("Home Units API", d);
      var date = d[0].Date;
      console.log("Date", date);
      var units_constructed = d[0].Home_Unites_Contructed;
      console.log("Home Units Array", units_constructed);

      const apiurl = "/api/house_permits";
      d3.json(apiurl).then(function (d) {
          console.log("House Permits API", d);
          var new_permits = d[0].New_Home_Permits;
          console.log("House Permits Array", new_permits);

          var options = {
              series: [{
                  name: 'New Housing Permits',
                  data: new_permits
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
                  text: 'New Housing Permits & Housing Units Constructed'
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
  });
}
PermitsSpline();
