# import necessary libraries
import os

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import psycopg2

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# (https://help.heroku.com/ZKNTJQSK/
# why-is-sqlalchemy-1-4-x-not-connecting-to-heroku-postgres)
database_url = os.environ.get('DATABASE_URL').replace('postgres://', 'postgresql://', 1)
app.config['SQLALCHEMY_DATABASE_URI'] = database_url

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
engine = create_engine(database_url)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Lumber_steel = Base.classes.lumber_steel
Average_home_price = Base.classes.average_home_price
New_2020= Base.classes.new_2020
New_2021= Base.classes.new_2021
Homeownership_rates= Base.classes.homeownership_rate
Monthly_house_supply= Base.classes.monthly_house_supply
Home_units = Base.classes.home_units



#from .models import Pet

#################################################
# API Routes (start with '/api/')
#################################################
@app.route("/api/lumber_steel")
def commodities():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    # Query the database and send the jsonified results
    results = session.query(Lumber_steel.date, Lumber_steel.lumber_prc_change, Lumber_steel.steel_prc_change).all()

    date = [result[0] for result in results]
    lumber_prc_change = [result[1] for result in results]
    steel_prc_change = [result[2] for result in results]

    commodity_data = [{
        
        "Date": date,
        "Lumber_Percent_Change": lumber_prc_change,
        "Steel_Percent_Change": steel_prc_change,
        "marker": {
            "size": 15,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]
    session.close()
    print(commodity_data)
    return jsonify(commodity_data)

@app.route("/api/average_home_price")
def avg_price():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Average_home_price.date, Average_home_price.average_home_price).all()

    date = [result[0] for result in results]
    average_home_price = [result[1] for result in results]
    

    home_price = [{
        
        "Date": date,
        "Average_Home_Price": average_home_price,
        "marker": {
            "size": 15,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]
    session.close()
    return jsonify(home_price)

@app.route("/api/homeownership_rate")
def o_rates():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Homeownership_rates.date, Homeownership_rates.homeownership_rate).all()

    date = [result[0] for result in results]
    home_rate = [result[1] for result in results]
    

    ownership_rate = [{
        
        "Date": date,
        "Home_Ownership_Rate": home_rate,
        "marker": {
            "size": 15,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]
    session.close()
    return jsonify(ownership_rate)

@app.route("/api/home_units")
def h_unit():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Home_units.date, Home_units.new_permits_thousands, Home_units.units_not_started_thousands, Home_units.units_started_thousands, 
                            Home_units.units_under_construction_thousands, Home_units.units_constructed_thousands).all()

    date = [result[0] for result in results]
    new_permits_thousands = [result[1] for result in results]
    units_not_started_thousands = [result[2] for result in results]
    units_started_thousands = [result[3] for result in results]
    units_under_construction_thousands = [result[4] for result in results]
    units_constructed_thousands = [result[5] for result in results]

    unit_homes = [{
        
        "Date": date,
        "new_permits_thousands": new_permits_thousands,
        "units_not_started_thousands": units_not_started_thousands,
        "units_started_thousands": units_started_thousands,
        "units_under_construction_thousands": units_under_construction_thousands,
        "units_constructed_thousands": units_constructed_thousands,
        "marker": {
            "size": 15,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]

    return jsonify(unit_homes)

@app.route("/api/monthly_house_supply")
def supply():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Monthly_house_supply.date, Monthly_house_supply.ratio_for_sale_to_sold).all()

    date = [result[0] for result in results]
    sale_sold_ratio = [result[1] for result in results]
    
    home_supply = [{
        
        "Date": date,
        "Ratio_of_Sale_Sold": sale_sold_ratio,
        "marker": {
            "size": 15,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]
    session.close()
    return jsonify(home_supply)


@app.route("/api/interest_rate_2020")
def rates2020():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(New_2020.date, New_2020.ten_y_2020, New_2020.twenty_y_2020, New_2020.thirty_y_2020).all()

    date = [result[0] for result in results]
    ten_y_2020 = [result[1] for result in results]
    twenty_y_2020 = [result[2] for result in results]
    thirty_y_2020 = [result[3] for result in results]
    

    interest_2020 = [{
        
        "Date": date,
        "Ten_Year": ten_y_2020,
        "Twenty_Year" : twenty_y_2020,
        "Thirty_Year": thirty_y_2020,
        "marker": {
            "size": 15,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]
    session.close()
    return jsonify(interest_2020)



@app.route("/api/interest_rate_2021")
def rates2021():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(New_2021.date, New_2021.ten_y_2021, New_2021.twenty_y_2021, New_2021.thirty_y_2021).all()

    date = [result[0] for result in results]
    ten_y_2021 = [result[1] for result in results]
    twenty_y_2021 = [result[2] for result in results]
    thirty_y_2021 = [result[3] for result in results]
    

    interest_2021 = [{
        
        "Date": date,
        "Ten_Year": ten_y_2021,
        "Twenty_Year" : twenty_y_2021,
        "Thirty_Year": thirty_y_2021,
        "marker": {
            "size": 15,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]
    session.close()
    return jsonify(interest_2021)

#################################################
# Fontend Routes
#################################################
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
