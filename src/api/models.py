import datetime
from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()

band_events = db.Table('band_events',
    db.Column('band_id', db.Integer, db.ForeignKey('band.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id'), primary_key=True)
)

band_musical_category = db.Table('band_musical_category',
    db.Column('band_id', db.Integer, db.ForeignKey('band.id'), primary_key=True),
    db.Column('musical_category_id', db.Integer, db.ForeignKey('musical_category.id'), primary_key=True)
)

user_favorite_category = db.Table('user_favorite_category',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('musical_category_id', db.Integer, db.ForeignKey('musical_category.id'), primary_key=True)
)

band_members = db.Table('band_members',
    db.Column('band_id', db.Integer, db.ForeignKey('band.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

user_followed_bands = db.Table('user_followed_bands',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('band_id', db.Integer, db.ForeignKey('band.id'), primary_key=True)
)

user_followed_places = db.Table('user_followed_places',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('place_id', db.Integer, db.ForeignKey('place.id'), primary_key=True)
)

user_friends = db.Table('user_friends',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('friend_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(220), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    birthdate = db.Column(db.Date, nullable=True)
    description = db.Column(db.String(300), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    profile_picture = db.Column(db.String(300), nullable=True)
    instagram = db.Column(db.String(300), nullable=True)
    tiktok = db.Column(db.String(300), nullable=True)

    friends = db.relationship('User', secondary=user_friends, 
                              primaryjoin=id == user_friends.c.user_id, 
                              secondaryjoin=id == user_friends.c.friend_id, 
                              lazy='dynamic')

    tickets = db.relationship('Ticket', backref='owner', lazy=True)
    followed_bands = db.relationship('Band', secondary=user_followed_bands, back_populates='followers')
    followed_places = db.relationship('Place', secondary=user_followed_places, back_populates='followers')
    user_categories = db.relationship('MusicalCategory', secondary=user_favorite_category, back_populates='users')

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            'id': self.id,
            'is_active': self.is_active,
            'email': self.email,
            'username': self.username,
            'birthdate': self.birthdate,
            'description': self.description,
            'city': self.city,
            'profile_picture': self.profile_picture,
            'instagram': self.instagram,
            'tiktok': self.tiktok,
            'friends': [friend.id for friend in self.friends],
            'followed_bands': [band.serialize() for band in self.followed_bands],
            'followed_places': [place.serialize() for place in self.followed_places],
            'user_categories': [category.serialize() for category in self.user_categories],
        }


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Float, nullable=False)
    profile_picture = db.Column(db.String(300), nullable=True)
    photos = db.Column(db.String(300), nullable=True)
    video = db.Column(db.String(300), nullable=True)
    instagram = db.Column(db.String(300), nullable=True)
    tiktok = db.Column(db.String(300), nullable=True)

    place_id = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=False)
    band_id = db.Column(db.Integer, db.ForeignKey('band.id'), nullable=True)
    tickets = db.relationship('Ticket', backref='event_assoc', lazy=True)
    reviews = db.relationship('Review', backref='event', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date,
            'description': self.description,
            'price': self.price,
            'profile_picture': self.profile_picture,
            'photos': self.photos,
            'video': self.video,
            'instagram': self.instagram,
            'tiktok': self.tiktok,
            'place_id': self.place_id,
            'band_id': self.band_id,
            'reviews': [review.serialize() for review in self.reviews],
        }


class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    address = db.Column(db.String(300), nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=True)
    profile_picture = db.Column(db.String(300), nullable=True)
    instagram = db.Column(db.String(300), nullable=True)
    tiktok = db.Column(db.String(300), nullable=True)

    followers = db.relationship('User', secondary=user_followed_places, back_populates='followed_places')
    events = db.relationship('Event', backref='place', lazy=True)
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'address': self.address,
            'phone': self.phone,
            'profile_picture': self.profile_picture,
            'instagram': self.instagram,
            'tiktok': self.tiktok,
            'followers': [user.serialize() for user in self.followers],
            'events': [event.serialize() for event in self.events],
        }


class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    profile_picture = db.Column(db.String(300), nullable=True)
    instagram = db.Column(db.String(300), nullable=True)
    tiktok = db.Column(db.String(300), nullable=True)

    followers = db.relationship('User', secondary=user_followed_bands, back_populates='followed_bands')
    events = db.relationship('Event', backref='band', lazy=True)
    musical_categories = db.relationship('MusicalCategory', secondary=band_musical_category, back_populates='bands')
    members = db.relationship('User', secondary=band_members, backref='member_of_bands')

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'profile_picture': self.profile_picture,
            'instagram': self.instagram,
            'tiktok': self.tiktok,
            'followers': [user.serialize() for user in self.followers],
            'events': [event.serialize() for event in self.events],
            'musical_categories': [category.serialize() for category in self.musical_categories],
            'members': [member.serialize() for member in self.members],
        }


class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    purchase_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)

    event = db.relationship('Event', backref=db.backref('tickets_assoc', lazy=True))
    user = db.relationship('User', backref=db.backref('tickets_owned', lazy=True))

    def serialize(self):
        return {
            'id': self.id,
            'event': self.event.serialize(),
            'user': self.user.serialize(),
            'price': self.event.price,
            'purchase_date': self.purchase_date
        }


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    comment = db.Column(db.String(300), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)
    
    def serialize(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'user_id': self.user_id,
            'event_id': self.event_id,
        }


class MusicalCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    profile_picture = db.Column(db.String(300), nullable=True)

    users = db.relationship('User', secondary=user_favorite_category, back_populates='user_categories')
    bands = db.relationship('Band', secondary=band_musical_category, back_populates='musical_categories')

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'profile_picture': self.profile_picture if self.profile_picture else None,
            'users': [user.serialize() for user in self.users] if self.users else [],
            'bands': [band.serialize() for band in self.bands] if self.bands else [],
        }
