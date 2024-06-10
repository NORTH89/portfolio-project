# TODO: UPDATE THIS FILE FOR DEPLOYMENT
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os


# Flask app initialization
app = Flask(__name__)

# Enable CORS for development, but comment out for production
# CORS(app)

# Configure SQLAlchemy to use a SQLite database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Define the path to the frontend's "dist" folder
frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")


# Serve static files from the frontend's "dist" folder
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    # If the requested file is not found, serve the index.html file
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)


# Import the API routes
import routes

# Create the database tables if they don't exist
with app.app_context():
    db.create_all()

# Run the Flask app in debug mode
if __name__ == "__main__":
    app.run(debug=True)
