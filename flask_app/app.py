from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
import os
app = Flask(__name__)
db_username = os.getenv('DB_USERNAME', 'postgres')  
db_password = os.getenv('DB_PASSWORD', 'halorenacido') 
db_hostname = os.getenv('DB_HOSTNAME', 'bootcamp.cyz5iexfko6q.us-east-1.rds.amazonaws.com')
db_name = 'parrots'
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_username}:{db_password}@{db_hostname}/{db_name}'

def create_db_if_not_exists():
    base_uri = f'postgresql://{db_username}:{db_password}@{db_hostname}/'
    full_db_uri = f'postgresql://{db_username}:{db_password}@{db_hostname}/{db_name}'
    engine = create_engine(base_uri)
    if not database_exists(full_db_uri):
        create_database(full_db_uri)
    engine.dispose()
db = SQLAlchemy(app)
class Parrot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specie = db.Column(db.String(100), nullable=False)
    age = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    def to_dict(self):
        attributes = {
            'id': self.id,
            'name': self.name,
            'specie': self.specie,
            'age': self.age,
            'image': self.image
        }
        return {key: value for key, value in attributes.items() if value}
create_db_if_not_exists()
@app.route("/")
def index():
    return 'Hello'

@app.route("/queryparrots", methods=["GET"])
def queryparrots():
    try:
        parrots = Parrot.query.all()
        if not parrots:
            print("No parrots found")
            return jsonify({"error": "No parrots found"}), 404

        filtered_parrots = []
        for parrot in parrots:
            # Check if any of the fields are blank
            if all([parrot.name, parrot.specie, parrot.age, parrot.image]):
                filtered_parrots.append(parrot.to_dict())

        if not filtered_parrots:
            return jsonify({"error": "No parrots with complete data found"}), 404

        return jsonify(filtered_parrots)

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route("/insertparrot", methods=["POST"])
def insertparrot():
    if request.method == 'POST':
        try:
            # Extracting data from JSON
            data = request.get_json()  # or request.json
            name = data["name"]
            specie = data["specie"]
            age = data["age"]
            image = data["image"]
    
            # Creating a new Parrot instance
            new_parrot = Parrot(name=name, specie=specie, age=age, image=image)
            print(new_parrot)
            # Adding the new instance to the database
            db.session.add(new_parrot)
            db.session.commit()
    
            return jsonify({"message": "Parrot added successfully"}), 201
        except Exception as e:
            print(e)
            return jsonify({"error": "Error adding parrot"}), 500
if __name__ == '__main__':
    app.debug = True
    app.run(port=8080, host='0.0.0.0')