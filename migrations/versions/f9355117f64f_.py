"""empty message

Revision ID: f9355117f64f
Revises: 7204f3480ce0
Create Date: 2024-05-06 11:46:52.511051

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f9355117f64f'
down_revision = '7204f3480ce0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('band', schema=None) as batch_op:
        batch_op.add_column(sa.Column('instagram', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('tiktok', sa.String(length=120), nullable=True))
        batch_op.drop_column('banner_picture')
        batch_op.drop_column('social_networks')

    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_picture', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('video', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('instagram', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('tiktok', sa.String(length=120), nullable=True))
        batch_op.drop_column('address')
        batch_op.drop_column('pictures')
        batch_op.drop_column('media')
        batch_op.drop_column('social_networks')

    with op.batch_alter_table('place', schema=None) as batch_op:
        batch_op.add_column(sa.Column('instagram', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('tiktok', sa.String(length=120), nullable=True))
        batch_op.drop_column('banner_picture')
        batch_op.drop_column('social_networks')

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('instagram', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('tiktok', sa.String(length=120), nullable=True))
        batch_op.drop_column('gender')
        batch_op.drop_column('banner_picture')
        batch_op.drop_column('social_networks')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('social_networks', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('banner_picture', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('gender', sa.VARCHAR(length=20), autoincrement=False, nullable=True))
        batch_op.drop_column('tiktok')
        batch_op.drop_column('instagram')

    with op.batch_alter_table('place', schema=None) as batch_op:
        batch_op.add_column(sa.Column('social_networks', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('banner_picture', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.drop_column('tiktok')
        batch_op.drop_column('instagram')

    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.add_column(sa.Column('social_networks', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('media', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('pictures', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('address', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
        batch_op.drop_column('tiktok')
        batch_op.drop_column('instagram')
        batch_op.drop_column('video')
        batch_op.drop_column('profile_picture')

    with op.batch_alter_table('band', schema=None) as batch_op:
        batch_op.add_column(sa.Column('social_networks', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('banner_picture', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.drop_column('tiktok')
        batch_op.drop_column('instagram')

    # ### end Alembic commands ###