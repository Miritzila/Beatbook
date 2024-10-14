"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from api.models import db, User, Event, Band, Place, MusicalCategory, Ticket, Review
from api.utils import generate_sitemap, APIException
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import func
from flask_jwt_extended import create_access_token
import bcrypt
from urllib.parse import unquote

api = Blueprint('api', __name__)

# CORS #

CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# AUTENTICACIÓN #

@api.route('/sign_up', methods=['POST'])
def sign_up():
    request_body = request.get_json()

    if not 'username' in request_body:
        return jsonify("Falta el usuario"), 400
    if not 'email' in request_body:
        return jsonify("Falta el email"), 400
    if not 'password' in request_body:
        return jsonify("Falta la contraseña"), 400
    if not 'password_confirmation' in request_body:
        return jsonify("Falta la confirmación de la contraseña"), 400
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(request_body["password"].encode('utf-8'), salt)
    user = User(username=request_body["username"], email=request_body["email"], password=hashed_password, is_active=True)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=str(user.username))

    return jsonify({'message': 'Usuario creado', 'token': access_token}), 200

@api.route('/log_in', methods=['POST'])
def log_in():
    request_body = request.get_json()
    if not 'username' in request_body:
        return jsonify("Falta el usuario"), 400
    if not 'password' in request_body:
        return jsonify("Falta la contraseña"), 400
    user = User.query.filter_by(username=request_body["username"]).first()
    if user is None:
        return jsonify("Usuario no encontrado"), 404
    if not bcrypt.checkpw(request_body["password"].encode('utf-8'), user.password):
        return jsonify("Contraseña incorrecta"), 400
    if bcrypt.checkpw(request_body["password"].encode('utf-8'), user.password):
        access_token = create_access_token(identity=str(user.username))
    return jsonify({'message': 'Usuario logeado', 'token': access_token}), 200

# USER ENDPOINTS #

@api.route('/users/<string:username>', methods=['GET'])
def get_user(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify("Usuario no encontrado"), 404
    return jsonify(user.serialize()), 200

# EVENT ENDPOINTS #

@api.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.serialize() for event in events]), 200

@api.route('/events/<string:event_name>', methods=['GET'])
def get_event(event_name):
    formatted_name = unquote(event_name.strip())
    event = Event.query.filter(func.lower(Event.name) == func.lower(formatted_name)).first()
    if not event:
        return jsonify("Evento no encontrado"), 404
    return jsonify(event.serialize()), 200

# BAND ENDPOINTS #

@api.route('/bands', methods=['GET'])
def get_bands():
    bands = Band.query.all()
    return jsonify([band.serialize() for band in bands]), 200

@api.route('/bands/<string:band_name>', methods=['GET'])
def get_band(band_name):
    formatted_name = unquote(band_name.strip())
    band = Band.query.filter(func.lower(Band.name) == func.lower(formatted_name)).first()
    if not band:
        return jsonify("Banda no encontrada"), 404
    return jsonify(band.serialize()), 200

@api.route('/bands/<string:band_name>/events', methods=['GET'])
def get_band_events(band_name):
    formatted_name = unquote(band_name.strip())
    band = Band.query.filter(func.lower(Band.name) == func.lower(formatted_name)).first()
    if not band:
        return jsonify("Banda no encontrada"), 404
    return jsonify([event.serialize() for event in band.events]), 200

@api.route('/bands/<string:band_name>/members', methods=['GET'])
def get_band_members(band_name):
    formatted_name = unquote(band_name.strip())
    band = Band.query.filter(func.lower(Band.name) == func.lower(formatted_name)).first()
    if not band:
        return jsonify("Banda no encontrada"), 404
    return jsonify([member.serialize() for member in band.members]), 200

# PLACE ENDPOINTS #

@api.route('/places', methods=['GET'])
def get_places():
    places = Place.query.all()
    return jsonify([place.serialize() for place in places]), 200

@api.route('/places/<string:place_name>', methods=['GET'])
def get_place(place_name):
    formatted_name = unquote(place_name.strip())
    place = Place.query.filter(func.lower(Place.name) == func.lower(formatted_name)).first()
    if not place:
        return jsonify("Lugar no encontrado"), 404
    return jsonify(place.serialize()), 200

@api.route('/places/<string:place_name>/events', methods=['GET'])
def get_place_events(place_name):
    formatted_name = unquote(place_name.strip())
    place = Place.query.filter(func.lower(Place.name) == func.lower(formatted_name)).first()
    if not place:
        return jsonify("Lugar no encontrado"), 404
    return jsonify([event.serialize() for event in place.events]), 200

# MUSICAL CATEGORY ENDPOINTS #

@api.route('/musical_categories', methods=['GET'])
def get_musical_categories():
    musical_categories = MusicalCategory.query.all()
    return jsonify([musical_category.serialize() for musical_category in musical_categories]), 200

@api.route('/musical_categories/<string:musical_category_name>', methods=['GET'])
def get_musical_category(musical_category_name):
    formatted_name = unquote(musical_category_name.strip())
    musical_category = MusicalCategory.query.filter(func.lower(MusicalCategory.name) == func.lower(formatted_name)).first()
    if not musical_category:
        return jsonify("Categoría musical no encontrada"), 404
    return jsonify(musical_category.serialize()), 200

@api.route('/musical_categories/<string:musical_category_name>/events', methods=['GET'])
def get_musical_category_events(musical_category_name):
    formatted_name = unquote(musical_category_name.strip())
    musical_category = MusicalCategory.query.filter(func.lower(MusicalCategory.name) == func.lower(formatted_name)).first()
    if not musical_category:
        return jsonify("Categoría musical no encontrada"), 404
    
    bands = musical_category.bands
    events = []
    for band in bands:
        events.extend(band.events)

    return jsonify([event.serialize() for event in events]), 200

# TICKETS ENDPOINTS #

# REVIEW ENDPOINTS #

