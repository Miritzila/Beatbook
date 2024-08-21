"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Band, Event, db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager
import bcrypt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# AUTENTICATION ENDPOINTS #

@api.route('/sign_up', methods=['POST'])
def sign_up():
    request_body = request.get_json()
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(request_body["password"].encode('utf-8'), salt)

    if not 'username'in request_body:
        return jsonify("Username is required"), 400
    if not 'email'in request_body:
        return jsonify("Email is required"), 400
    if not 'password'in request_body:
        return jsonify("Password is required"), 400
    if not 'password_confirmation'in request_body:
        return jsonify("Password confirmation is required"), 400
    
    user = User(username=request_body["username"],email=request_body["email"], password=hashed_password, is_active=True)
    db.session.add(user)
    db.session.commit()
    # Genera un token para el nuevo usuario
    access_token = create_access_token(identity=str(user.id))

    return jsonify({ 'message': 'User created', 'token': access_token }), 200

@api.route('/log_in', methods=['POST'])
def log_in():
    request_body = request.get_json()
    if not 'email' in request_body:
        return jsonify("Email is required"), 400
    if not 'password' in request_body:
        return jsonify("Password is required"), 400
    user = User.query.filter_by(email=request_body["email"]).first()
    if user is None or not bcrypt.checkpw(request_body["password"].encode('utf-8'), user.password):
        return jsonify("Invalid email or password"), 400
    # Genera un token para el usuario que inició sesión
    access_token = create_access_token(identity=str(user.id))
    return jsonify({ 'message': 'Logged in successfully', 'token': access_token, 'email': user.email, 'username': user.username , 'user_id': user.id, 'profileimage': user.profile_image_url ,}), 200

# USER ENDPOINTS #

# EVENT ENDPOINTS #

@api.route('/events/<int:event_id>/photos', methods=['POST'])
def upload_event_photo(event_id):
    event = Event.query.get(event_id)
    if event is None:
        return jsonify({'error': 'Evento no encontrado'}), 404

    photo = request.files['photo']
    if photo is None:
        return jsonify({'error': 'No se ha subido ninguna foto'}), 400

    # Guardar la foto en el servidor
    photo_url = save_photo(photo) # type: ignore

    # Asociar la foto con el evento
    event.photos = photo_url
    db.session.commit()

    return jsonify({'message': 'Foto subida con éxito'}), 201

# BAND ENDPOINTS #

@api.route('/bands/<int:band_id>/photos', methods=['GET'])
def get_band_photos(band_id):
    band = Band.query.get(band_id)
    if band is not None:
        events = band.events
        photos = [event.photos for event in events]
        return jsonify({'photos': photos}), 200
    return jsonify({'error': 'Grupo no encontrado'}), 404

# PLACE ENDPOINTS #

# MUSICAL CATEGORY ENDPOINTS #

# TICKETS ENDPOINTS #

# REVIEW ENDPOINTS #

