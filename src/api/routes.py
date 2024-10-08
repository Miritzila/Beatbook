"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from api.models import db, User, Event, Band, Place, MusicalCategory, Ticket, Review
from api.utils import generate_sitemap, APIException
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import create_access_token
import bcrypt

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

    if not 'username'in request_body:
        return jsonify("Falta el usuario"), 400
    if not 'email'in request_body:
        return jsonify("Falta el email"), 400
    if not 'password'in request_body:
        return jsonify("Falta la contraseña"), 400
    if not 'password_confirmation'in request_body:
        return jsonify("Falta la confirmación de la contraseña"), 400
    
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(request_body["password"].encode('utf-8'), salt)
    
    user = User(username=request_body["username"],email=request_body["email"], password=hashed_password, is_active=True)
    db.session.add(user)
    db.session.commit()
    
    access_token = create_access_token(identity=str(user.id))

    return jsonify({ 'message': 'Usuario creado', 'token': access_token }), 200


@api.route('/log_in', methods=['POST'])
def log_in():
    request_body = request.get_json()

    if not 'username'in request_body:
        return jsonify("Falta el usuario"), 400
    if not 'password'in request_body:
        return jsonify("Falta la contraseña"), 400
    
    user = User.query.filter_by(username=request_body["username"]).first()

    if user is None:
        return jsonify("Usuario no encontrado"), 404
    
    if not bcrypt.checkpw(request_body["password"].encode('utf-8'), user.password):
        return jsonify("Contraseña incorrecta"), 400

    if bcrypt.checkpw(request_body["password"].encode('utf-8'), user.password):
        access_token = create_access_token(identity=str(user.id))

    return jsonify({ 'message': 'Usuario logeado', 'token': access_token }), 200
    
# SUBIR DATOS #

@api.route('/upload_users', methods=['POST'])
def upload_users():
    request_body = request.get_json()

    if not isinstance(request_body, list):
        return jsonify("El cuerpo de la solicitud debe ser una lista de usuarios"), 400

    for user in request_body:
        if not isinstance(user, dict):
            return jsonify("Cada elemento de la lista debe ser un objeto de usuario"), 400

        if not all(key in user for key in ['username', 'email', 'password']):
            return jsonify("Cada objeto de usuario debe tener las claves 'username', 'email' y 'password'"), 400

        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(user["password"].encode('utf-8'), salt)

        new_user = User(username=user["username"], email=user["email"], password=hashed_password, is_active=True)
        new_user.birthdate = user.get("birthdate")
        new_user.description = user.get("description")
        new_user.city = user.get("city")
        new_user.profile_picture = user.get("profile_picture")
        new_user.instagram = user.get("instagram")
        new_user.tiktok = user.get("tiktok")

        db.session.add(new_user)
        db.session.commit()

    return jsonify("Usuarios subidos"), 200


@api.route('/upload_bands', methods=['POST'])
def upload_bands():
    request_body = request.get_json()

    if not isinstance(request_body, list):
        return jsonify("El cuerpo de la solicitud debe ser una lista de bandas"), 400

    for band in request_body:
        if not isinstance(band, dict):
            return jsonify("Cada elemento de la lista debe ser un objeto de banda"), 400

        if not all(key in band for key in ['name', 'description', 'profile_picture']):
            return jsonify("Cada objeto de banda debe tener las claves 'name', 'description' y 'profile_picture'"), 400

        new_band = Band(name=band["name"], description=band["description"], profile_picture=band["profile_picture"])
        new_band.tiktok = band.get("tiktok")
        new_band.instagram = band.get("instagram")
        db.session.add(new_band)
        db.session.commit()

    return jsonify("Bandas subidas"), 200


@api.route('/upload_places', methods=['POST'])
def upload_places():
    request_body = request.get_json()

    if not isinstance(request_body, list):
        return jsonify("El cuerpo de la solicitud debe ser una lista de lugares"), 400

    for place in request_body:
        if not isinstance(place, dict):
            return jsonify("Cada elemento de la lista debe ser un objeto de lugar"), 400

        if not all(key in place for key in ['name', 'description', 'address']):
            return jsonify("Cada objeto de lugar debe tener las claves 'name', 'description' y 'address'"), 400

        new_place = Place(name=place["name"], description=place["description"], address=place["address"])
        new_place.phone = place.get("phone")
        new_place.profile_picture = place.get("profile_picture")
        new_place.instagram = place.get("instagram")
        new_place.tiktok = place.get("tiktok")
        db.session.add(new_place)
        db.session.commit()

    return jsonify("Lugares subidos"), 200


@api.route('/upload_events', methods=['POST'])
def upload_events():
    request_body = request.get_json()

    if not isinstance(request_body, list):
        return jsonify("El cuerpo de la solicitud debe ser una lista de eventos"), 400

    for event in request_body:
        if not isinstance(event, dict):
            return jsonify("Cada elemento de la lista debe ser un objeto de evento"), 400

        required_fields = ['name', 'description', 'date', 'place_id']
        if not all(key in event for key in required_fields):
            return jsonify(f"Cada objeto de evento debe tener las claves {required_fields}"), 400

        price = event.get("price", 0.0)

        new_event = Event(
            name=event["name"],
            description=event["description"],
            date=event["date"],
            price=price,
            profile_picture=event.get("profile_picture"),
            photos=event.get("photos"),
            video=event.get("video"),
            instagram=event.get("instagram"),
            tiktok=event.get("tiktok"),
            place_id=event["place_id"],
            band_id=event.get("band_id")
        )
        db.session.add(new_event)
        db.session.commit()

    return jsonify("Eventos subidos"), 200


@api.route('/upload_musical_categories', methods=['POST'])
def upload_musical_categories():
    request_body = request.get_json()

    if not isinstance(request_body, list):
        return jsonify("El cuerpo de la solicitud debe ser una lista de categorías musicales"), 400

    for musical_category in request_body:
        if not isinstance(musical_category, dict):
            return jsonify("Cada elemento de la lista debe ser un objeto de categoría musical"), 400

        if 'name' not in musical_category:
            return jsonify("Cada objeto de categoría musical debe tener la clave 'name'"), 400

        new_musical_category = MusicalCategory(
            name=musical_category["name"],
            profile_picture=musical_category.get("profile_picture")
        )

        db.session.add(new_musical_category)
        db.session.commit()

    return jsonify("Categorías musicales subidas"), 200


@api.route('/upload_tickets', methods=['POST'])
def upload_tickets():
    request_body = request.get_json()

    if not isinstance(request_body, list):
        return jsonify("El cuerpo de la solicitud debe ser una lista de tickets"), 400

    for ticket in request_body:
        if not isinstance(ticket, dict):
            return jsonify("Cada elemento de la lista debe ser un objeto de ticket"), 400

        if not all(key in ticket for key in ['user_id', 'event_id']):
            return jsonify("Cada objeto de ticket debe tener las claves 'user_id' y 'event_id'"), 400

        event = Event.query.get(ticket["event_id"])
        if not event:
            return jsonify(f"El evento con id {ticket['event_id']} no existe"), 400

        user = User.query.get(ticket["user_id"])
        if not user:
            return jsonify(f"El usuario con id {ticket['user_id']} no existe"), 400

        new_ticket = Ticket(
            event_id=ticket["event_id"],
            user_id=ticket["user_id"]
        )

        db.session.add(new_ticket)

    db.session.commit()

    return jsonify("Tickets subidos"), 200


@api.route('/upload_reviews', methods=['POST'])
def upload_reviews():
    request_body = request.get_json()

    if not isinstance(request_body, list):
        return jsonify("El cuerpo de la solicitud debe ser una lista de reseñas"), 400

    for review in request_body:
        if not isinstance(review, dict):
            return jsonify("Cada elemento de la lista debe ser un objeto de reseña"), 400

        if not all(key in review for key in ['rating', 'title', 'user_id', 'event_id']):
            return jsonify("Cada objeto de reseña debe tener las claves 'rating', 'title', 'user_id' y 'event_id'"), 400

        user = User.query.get(review['user_id'])
        event = Event.query.get(review['event_id'])

        if not user:
            return jsonify(f"El usuario con id {review['user_id']} no existe"), 400
        if not event:
            return jsonify(f"El evento con id {review['event_id']} no existe"), 400

        new_review = Review(
            rating=review['rating'],
            title=review['title'],
            comment=review.get('comment', ''),
            user_id=review['user_id'],
            event_id=review['event_id']
        )

        db.session.add(new_review)

    db.session.commit()

    return jsonify("Reseñas subidas"), 200


# USER ENDPOINTS #

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify("Usuario no encontrado"), 404
    return jsonify(user.serialize()), 200

# EVENT ENDPOINTS #

@api.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.serialize() for event in events]), 200

@api.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify("Evento no encontrado"), 404
    return jsonify(event.serialize()), 200

# BAND ENDPOINTS #

@api.route('/bands', methods=['GET'])
def get_bands():
    bands = Band.query.all()
    return jsonify([band.serialize() for band in bands]), 200

@api.route('/bands/<int:band_id>', methods=['GET'])
def get_band(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify("Banda no encontrada"), 404
    return jsonify(band.serialize()), 200

@api.route('/bands/<int:band_id>/events', methods=['GET'])
def get_band_events(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify("Banda no encontrada"), 404
    return jsonify([event.serialize() for event in band.events]), 200

@api.route('/bands/<int:band_id>/members', methods=['GET'])
def get_band_members(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify("Banda no encontrada"), 404
    return jsonify([member.serialize() for member in band.members]), 200

# PLACE ENDPOINTS #

@api.route('/places', methods=['GET'])
def get_places():
    places = Place.query.all()
    return jsonify([place.serialize() for place in places]), 200

@api.route('/places/<int:place_id>', methods=['GET'])
def get_place(place_id):
    place = Place.query.get(place_id)
    if not place:
        return jsonify("Lugar no encontrado"), 404
    return jsonify(place.serialize()), 200

@api.route('/places/<int:place_id>/events', methods=['GET'])
def get_place_events(place_id):
    place = Place.query.get(place_id)
    if not place:
        return jsonify("Lugar no encontrado"), 404
    return jsonify([event.serialize() for event in place.events]), 200

# MUSICAL CATEGORY ENDPOINTS #

@api.route('/musical_categories', methods=['GET'])
def get_musical_categories():
    musical_categories = MusicalCategory.query.all()
    return jsonify([musical_category.serialize() for musical_category in musical_categories]), 200

@api.route('/musical_categories/<int:musical_category_id>', methods=['GET'])
def get_musical_category(musical_category_id):
    musical_category = MusicalCategory.query.get(musical_category_id)
    if not musical_category:
        return jsonify("Categoría musical no encontrada"), 404
    return jsonify(musical_category.serialize()), 200

@api.route('/musical_categories/<int:musical_category_id>/events', methods=['GET'])
def get_musical_category_events(musical_category_id):
    musical_category = MusicalCategory.query.get(musical_category_id)
    if not musical_category:
        return jsonify({"error": "Categoría musical no encontrada"}), 404
    
    bands = musical_category.bands
    events = []
    for band in bands:
        events.extend(band.events)

    return jsonify({"events": [event.serialize() for event in events]}), 200


# TICKETS ENDPOINTS #

# REVIEW ENDPOINTS #

