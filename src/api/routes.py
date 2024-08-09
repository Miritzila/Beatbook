"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Band, Event, db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

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

