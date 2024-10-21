from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, DecimalField, IntegerField, SelectField, DateField
from wtforms.fields.core import FloatField
from wtforms.fields.simple import TextField
from wtforms.validators import Email, DataRequired, NumberRange


class ContactInfoForm(FlaskForm):
    name = StringField('Nombre')
    email = StringField('Correo electrónico')
    phone_number = StringField('Número de teléfono')
    message = StringField('Mensaje')
