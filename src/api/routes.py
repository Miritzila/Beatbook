"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from api.models import db, User
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

# AUTENTICATION ENDPOINTS #

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
    
# USER ENDPOINTS #

# EVENT ENDPOINTS #

# BAND ENDPOINTS #

# PLACE ENDPOINTS #

# MUSICAL CATEGORY ENDPOINTS #

# TICKETS ENDPOINTS #

# REVIEW ENDPOINTS #

