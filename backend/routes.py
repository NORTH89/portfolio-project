from app import app, db
from flask import request, jsonify
from models import Friend


# Get all friends


def get_friends():
    """
    Get all friends from the database.

    Returns:
        json: A JSON object containing a list of friends.

    """

    # Get all friends from the database
    friends = Friend.query.all()

    # Convert each friend to a JSON object
    result = [friend.to_json() for friend in friends]

    # Return the JSON object
    return jsonify(result)


# Create a friend
@app.route("/api/friends", methods=["POST"])
def create_friend():
    """
    Create a new friend in the database.

    Returns:
        json: A JSON object containing the created friend.

    """
    try:
        # Get the JSON data from the request
        data = request.json

        # Validate the required fields
        required_fields = ["name", "role", "description", "gender"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Extract the data from the JSON object
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        # Fetch avatar image based on gender
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        # Create a new friend object
        new_friend = Friend(
            name=name,
            role=role,
            description=description,
            gender=gender,
            img_url=img_url,
        )

        # Add the new friend to the database
        db.session.add(new_friend)
        db.session.commit()

        # Return the created friend as a JSON object
        return jsonify(new_friend.to_json()), 201

    except Exception as e:
        # Rollback the database session in case of an error
        db.session.rollback()
        # Return an error message as a JSON object
        return jsonify({"error": str(e)}), 500


# Delete a friend
@app.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found"}), 404

        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg": "Friend deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Update a friend profile
@app.route("/api/friends/<int:id>", methods=["PATCH"])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found"}), 404

        data = request.json

        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)
        friend.gender = data.get("gender", friend.gender)

        db.session.commit()
        return jsonify(friend.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
