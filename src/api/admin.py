import os
from flask_admin import Admin
from .models import db, User, Event, Place, Band, MusicalCategory, Ticket, Review
from flask_admin.contrib.sqla import ModelView
from wtforms.validators import DataRequired

# Clase personalizada para el modelo User
class UserModelView(ModelView):
    form_columns = ['username', 'email', 'birthdate', 'description', 'followed_bands', 'friends', 'user_categories']
    
    form_args = {
        'username': {'validators': [DataRequired()]},
        'email': {'validators': [DataRequired()]},
    }

    column_labels = {
        'username': 'Nombre de usuario',
        'email': 'Correo electrónico',
        'birthdate': 'Fecha de nacimiento',
        'description': 'Descripción',
        'followed_bands': 'Bandas Seguidas',
        'friends': 'Amigos',
        'user_categories': 'Categorías Musicales Favoritas',
    }

# Clase personalizada para el modelo Band
class BandModelView(ModelView):
    form_columns = ['name', 'description', 'followers', 'members', 'musical_categories']
    
    column_labels = {
        'name': 'Nombre de la Banda',
        'description': 'Descripción',
        'followers': 'Seguidores',
        'members': 'Miembros',
        'musical_categories': 'Categorías Musicales',
    }

# Clase personalizada para el modelo Event
class EventModelView(ModelView):
    form_columns = ['name', 'date', 'description', 'band', 'place', 'tickets']
    
    column_labels = {
        'name': 'Nombre del Evento',
        'date': 'Fecha',
        'description': 'Descripción',
        'band': 'Banda',
        'place': 'Lugar',
        'tickets': 'Tickets',
    }

# Clase personalizada para el modelo MusicalCategory
class MusicalCategoryModelView(ModelView):
    form_columns = ['name', 'users', 'bands']
    
    column_labels = {
        'name': 'Nombre de la Categoría',
        'users': 'Usuarios',
        'bands': 'Bandas',
    }

# Función para configurar el panel de administración
def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Agregar vistas personalizadas de los modelos
    admin.add_view(UserModelView(User, db.session))
    admin.add_view(BandModelView(Band, db.session))
    admin.add_view(EventModelView(Event, db.session))
    admin.add_view(ModelView(Place, db.session))
    admin.add_view(MusicalCategoryModelView(MusicalCategory, db.session))
    admin.add_view(ModelView(Ticket, db.session))
    admin.add_view(ModelView(Review, db.session))
