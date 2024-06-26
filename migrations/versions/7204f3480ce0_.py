"""empty message

Revision ID: 7204f3480ce0
Revises: 490cd0f80c9f
Create Date: 2024-05-06 11:32:27.446468

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7204f3480ce0'
down_revision = '490cd0f80c9f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('band',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('profile_picture', sa.String(length=120), nullable=True),
    sa.Column('banner_picture', sa.String(length=120), nullable=True),
    sa.Column('social_networks', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('musical_category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=300), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('place',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('address', sa.String(length=120), nullable=False),
    sa.Column('phone', sa.String(length=120), nullable=True),
    sa.Column('profile_picture', sa.String(length=120), nullable=True),
    sa.Column('banner_picture', sa.String(length=120), nullable=True),
    sa.Column('social_networks', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('phone')
    )
    op.create_table('band_members',
    sa.Column('band_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['band_id'], ['band.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    op.create_table('band_musical_category',
    sa.Column('band_id', sa.Integer(), nullable=False),
    sa.Column('musical_category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['band_id'], ['band.id'], ),
    sa.ForeignKeyConstraint(['musical_category_id'], ['musical_category.id'], ),
    sa.PrimaryKeyConstraint('band_id', 'musical_category_id')
    )
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('address', sa.String(length=120), nullable=False),
    sa.Column('price', sa.String(length=120), nullable=False),
    sa.Column('pictures', sa.String(length=120), nullable=True),
    sa.Column('media', sa.String(length=120), nullable=True),
    sa.Column('social_networks', sa.String(length=120), nullable=True),
    sa.Column('place_id', sa.Integer(), nullable=True),
    sa.Column('band_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['band_id'], ['band.id'], ),
    sa.ForeignKeyConstraint(['place_id'], ['place.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_favorite_category',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('musical_category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['musical_category_id'], ['musical_category.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'musical_category_id')
    )
    op.create_table('assistance',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('band_events',
    sa.Column('band_id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['band_id'], ['band.id'], ),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.PrimaryKeyConstraint('band_id', 'event_id')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=300), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('review')
    op.drop_table('band_events')
    op.drop_table('assistance')
    op.drop_table('user_favorite_category')
    op.drop_table('event')
    op.drop_table('band_musical_category')
    op.drop_table('band_members')
    op.drop_table('place')
    op.drop_table('musical_category')
    op.drop_table('band')
    # ### end Alembic commands ###
