# What is Affecting the US Housing Market?

[Housing Project Google Slides](https://docs.google.com/presentation/d/1V-759n6RlpJccNcRgu4h8CecujvwI7HVBf6cNoMqmTQ/edit?usp=sharing)

Hello! 

This project analyzes coorelations in the Unite States housing market. The factors we look at include: 

- Avergae home price
- Interest rates
- Permit ammounts
- Steel price index
- Lumber price index

We begin by gathering data from csv's from the given sources below. We then transform the data in the ipynb that returns cleaned csv's. The etl file then push the data to a SQL database. Using the app.py the data is then pushed to flask api's, one for each csv file. Each api returns a JSON formated dataset. Using the api's we created a app.js file that pushes plots, using functions, to our html file. This is all done being hosted by Heroku. 

Webpage: [What is Affecting the U.S. Housing Market?](https://impacts-on-us-housing.herokuapp.com/)

Enjoy!

## Data Sources & Datasets

[Federal Reserve Economic Data (FRED) Housing](https://fred.stlouisfed.org/categories/97)

### Homeownership Rate in the United States (RSAHORUSQ156S)

- homeownership_rate_RSAHORUSQ156S.csv
- Source: U.S. Census Bureau
- Release: Housing Vacancies and Homeownership
- Units: Percent, Seasonally Adjusted
- Frequency: Quarterly

Notes:
The homeownership rate is the proportion of households that is owner-occupied.

Citation:
U.S. Census Bureau, Homeownership Rate in the United States [RSAHORUSQ156S], retrieved from FRED, Federal Reserve Bank of St. Louis; <https://fred.stlouisfed.org/series/RSAHORUSQ156S>, August 12, 2021.

### Monthly Supply of Houses in the United States (MSACSR)

- monthly_supply_houses_us_MSACSR.csv
- Source: U.S. Census Bureau, U.S. Department of Housing and Urban Development
- Release: New Residential Sales  
- Units: Months' Supply, Seasonally Adjusted
- Frequency: Quarterly, End of Period

Notes:
The months' supply is the ratio of houses for sale to houses sold. This statistic provides an indication of the size of the for-sale inventory in relation to the number of houses currently being sold. The months' supply indicates how long the current for-sale inventory would last given the current sales rate if no additional new houses were built.

Citation:
U.S. Census Bureau and U.S. Department of Housing and Urban Development, Monthly Supply of Houses in the United States [MSACSR], retrieved from FRED, Federal Reserve Bank of St. Louis; <https://fred.stlouisfed.org/series/MSACSR>, August 12, 2021.

### New Privately-Owned Housing Units Authorized in Permit-Issuing Places: Total Units (PERMITNSA)

- new_housing_permits_PERMITNSA.csv
- Source: U.S. Census Bureau, U.S. Department of Housing and Urban Development
- Release: New Residential Construction  
- Units: Thousands of Units, Seasonally Adjusted Annual Rate
- Frequency: Quarterly, End of Period

Notes:
Starting with the 2005-02-16 release, the series reflects an increase in the universe of permit-issuing places from 19,000 to 20,000 places.

Citation:
U.S. Census Bureau and U.S. Department of Housing and Urban Development, New Privately-Owned Housing Units Authorized in Permit-Issuing Places: Total Units [PERMIT], retrieved from FRED, Federal Reserve Bank of St. Louis; <https://fred.stlouisfed.org/series/PERMIT>, August 12, 2021.

### New Privately-Owned Housing Units Authorized but Not Started: Total Units (AUTHNOTTSA)

- authorized_not_started_AUTHNOTTSA.csv
- Source: U.S. Census Bureau, U.S. Department of Housing and Urban Development
- Release: New Residential Construction
- Units: Thousands of Units, Seasonally Adjusted
- Frequency: Quarterly, End of Period

Citation:
U.S. Census Bureau and U.S. Department of Housing and Urban Development, New Privately-Owned Housing Units Authorized but Not Started: Total Units [AUTHNOTTSA], retrieved from FRED, Federal Reserve Bank of St. Louis; <https://fred.stlouisfed.org/series/AUTHNOTTSA>, August 13, 2021.

### New Privately-Owned Housing Units Started: Total Units (HOUST)

- authorized_started_HOUST.csv
- Source: U.S. Census Bureau, U.S. Department of Housing and Urban Development
- Units: Thousands of Units, Seasonally Adjusted Annual Rate
- Frequency: Quarterly, End of Period

Notes:
As provided by the Census, start occurs when excavation begins for the footings or foundation of a building. All housing units in a multifamily building are defined as being started when this excavation begins. Beginning with data for September 1992, estimates of housing starts include units in structures being totally rebuilt on an existing foundation.

Citation:
U.S. Census Bureau and U.S. Department of Housing and Urban Development, New Privately-Owned Housing Units Started: Total Units [HOUST], retrieved from FRED, Federal Reserve Bank of St. Louis; <https://fred.stlouisfed.org/series/HOUST>, August 12, 2021.

### New Privately-Owned Housing Units Under Construction: Total Units (UNDCONTSA)

- under_counstruction_UNDCONTSA.csv
- Source: U.S. Census Bureau, U.S. Department of Housing and Urban Development
- Units: Thousands of Units, Seasonally Adjusted
- Frequency: Quarterly, End of Period

Citation:
U.S. Census Bureau and U.S. Department of Housing and Urban Development, New Privately-Owned Housing Units Under Construction: Total Units [UNDCONTSA], retrieved from FRED, Federal Reserve Bank of St. Louis; <https://fred.stlouisfed.org/series/UNDCONTSA>, August 13, 2021.

### New Privately-Owned Housing Units Completed: Total Units (COMPUTSA)

- units_completed_COMPUTNSA.csv
- Source: U.S. Census Bureau, U.S. Department of Housing and Urban Development
- Release: New Residential Construction
- Units: Thousands of Units, Seasonally Adjusted Annual Rate
- Frequency: Monthly

Citation:
U.S. Census Bureau and U.S. Department of Housing and Urban Development, New Privately-Owned Housing Units Completed: Total Units [COMPUTSA], retrieved from FRED, Federal Reserve Bank of St. Louis; <https://fred.stlouisfed.org/series/COMPUTSA>, August 12, 2021.

### Median Sales Price of Houses Sold for the United States (MSPUS)

- median_sales_price_MSPUS.csv
- Source: U.S. Census Bureau, U.S. Department of Housing and Urban Development  
- Release: New Residential Sales
- Units: Dollars, Not Seasonally Adjusted
- Frequency: Quarterly

Citation:
U.S. Census Bureau and U.S. Department of Housing and Urban Development, Median Sales Price of Houses Sold for the United States [MSPUS], retrieved from FRED, Federal Reserve Bank of St. Louis; <https://fred.stlouisfed.org/series/MSPUS>, August 12, 2021.

### Producer Price Index by Commodity: Lumber and Wood Products: Softwood Lumber (WPU0811)

- lumber_price_index_WPU0811.csv
- Source: U.S. Bureau of Labor Statistics  
- Release: Producer Price Index  
- Units: Index 1982=100, Not Seasonally Adjusted
- Frequency: Quarterly, End of Period

Citation:
U.S. Bureau of Labor Statistics, Producer Price Index by Commodity: Lumber and Wood Products: Softwood Lumber [WPU0811], retrieved from FRED, Federal Reserve Bank of St. Louis; <https://fred.stlouisfed.org/series/WPU0811>, August 13, 2021.

### Producer Price Index by Commodity: Metals and Metal Products: Iron and Steel (WPU101)

- metal_price_index_WPU101.csv
- Source: U.S. Bureau of Labor Statistics  
- Release: Producer Price Index  
- Units: Index 1982=100, Not Seasonally Adjusted
- Frequency: Quarterly, End of Period

Citation:
U.S. Bureau of Labor Statistics, Producer Price Index by Commodity: Metals and Metal Products: Iron and Steel [WPU101], retrieved from FRED, Federal Reserve Bank of St. Louis; <https://fred.stlouisfed.org/series/WPU101>, August 13, 2021.

### Daily Treasury Yield Curve Rates

- Source: U.S. Department of the Treasury

Citation:
U.S. Department of the Treasury, Daily Treasury Yield Curve Rates, retrieved from U.S. Department of the Treasury, Resource Center;<https://www.treasury.gov/resource-center/data-chart-center/interest-rates/pages/TextView.aspx?data=yieldYear&year=2020>, July 30, 2021.

## Contributors
Amanda Pesch, Chloe Lee, David W. Mueller, John Burke, Jordan Cizmja, Rna Babikar.
