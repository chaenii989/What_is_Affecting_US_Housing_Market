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
Housing_data = Base.classes.housing_data



#################################################
# API Routes (start with '/api/')
#################################################
@app.route("/api/housing_data")
def home_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    # Query the database and send the jsonified results
    results = session.query(Housing_data.date, Housing_data.interest_rate, Housing_data.units_authorized_started, Housing_data.avg_home_price, 
    Housing_data.homeownership_rate, Housing_data.lumber_price_index, Housing_data.house_supply, Housing_data.new_housing_permits, Housing_data.steel_price_index, Housing_data.under_construction, Housing_data.units_completed
    ).all()

    date = [result[0] for result in results]
    interest_rate = [result[1] for result in results]
    units_authorized_started = [result[2] for result in results]
    avg_home_price = [result[3] for result in results]
    homeownership_rate = [result[4] for result in results]
    lumber_price_index = [result[5] for result in results]
    house_supply = [result[6] for result in results]
    new_housing_permits = [result[7] for result in results]
    steel_price_index = [result[8] for result in results]
    under_construction = [result[9] for result in results]
    units_completed = [result[10] for result in results]
    


    housing_market_data = [{
        
        "Date": date,
        "Interest_Rate": interest_rate,
        "Units_Authorized_Started": units_authorized_started,
        "Average_Home_Price": avg_home_price,
        "Homeownership_Rate": homeownership_rate,
        "Lumber_Price_Index": lumber_price_index,
        "House_Supply": house_supply,
        "New_Housing_Permits":new_housing_permits,
        "Steel_Price_Index": steel_price_index,
        "Under_Construction":under_construction,
        "Units_Completed": units_completed,

        "marker": {
            "size": 15,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]
    session.close()
    
    return jsonify(housing_market_data)


#################################################
# Fontend Routes
#################################################
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/forecast")
def forecast():
    return render_template("forecast.html")

@app.route("/materials")
def materials():
    return render_template("materials.html")

@app.route("/permit")
def permit():
    return render_template("permit.html")

@app.route("/rates")
def rates():
    return render_template("rates.html")

@app.route("/supply")
def supply():
    return render_template("supply.html")

@app.route("/tableau")
def tableau():
    return render_template("tableau.html")

if __name__ == "__main__":
    app.run()
