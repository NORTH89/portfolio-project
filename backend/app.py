from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)

# We can comment this CORS config for the production because we are running the frontend and backend on the same server
# CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# api routes
import routes

with app.app_context():
  db.create_all()

if __name__ == "__main__":
  app.run(debug=True)