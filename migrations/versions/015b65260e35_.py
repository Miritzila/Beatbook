"""empty message

Revision ID: 015b65260e35
Revises: 3ee3c5a6479b
Create Date: 2024-08-20 17:34:34.255556

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '015b65260e35'
down_revision = '3ee3c5a6479b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.LargeBinary(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.LargeBinary(),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)

    # ### end Alembic commands ###