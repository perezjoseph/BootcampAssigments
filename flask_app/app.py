from flask import Flask, jsonify, request, send_file, abort, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from flask_cors import CORS, cross_origin
from sqlalchemy_utils import database_exists, create_database
from werkzeug.utils import secure_filename
import os
from uuid import uuid4
from config import ApplicationConfig
from flask_bcrypt import Bcrypt
from flask_session import Session
app = Flask(__name__)
app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
server_session = Session(app)
CORS(app, supports_credentials=True)
db_username = os.getenv('DB_USERNAME', 'postgres')  
db_password = os.getenv('DB_PASSWORD', 'halorenacido') 
db_hostname = os.getenv('DB_HOSTNAME', 'bootcamp.cyz5iexfko6q.us-east-1.rds.amazonaws.com')
db_name= 'parrots'
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
def get_uuid():
    return uuid4().hex
class User(db.Model):
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
   

create_db_if_not_exists()

with app.app_context(): 
    db.create_all()
app.config['UPLOAD_FOLDER'] = 'static'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']
@app.route("/")
def index():
    return 'Flask is okSS'

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
    try:
        file = request.files['image']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            file_path = '/' + filename
            name = request.form['name']
            specie = request.form['specie']
            age = request.form['age']
            if not age.isdigit():
                return jsonify({"error": "Age must be an integer"}), 400
            age = int(age)
            new_parrot = Parrot(name=name, specie=specie, age=age, image=file_path)
            db.session.add(new_parrot)
            db.session.commit()
            return jsonify({"message": "Parrot added successfully"}), 201

    except Exception as e:
        print(e)
        return jsonify({"error": "Error adding parrot"}), 500
@app.route('/image/<image_name>')
def serve_image(image_name):
    image_path = f'./static/{image_name}'
    try:
        return send_file(image_path)
    except FileNotFoundError:
        abort(404, description="Image not found")
@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

@app.route('/register', methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
        })
@app.route('/login', methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    user = User.query.filter_by(email=email).first()
    user_id = user.id
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    session["user_id"]=user_id
    return jsonify({
        "id": user.id,
        "email": user.email
        })
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

if __name__ == '__main__':
    app.debug = True
    app.run(port=8081, host='0.0.0.0')