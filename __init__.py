from flask import Flask
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
import json

with open('/etc/config.json', 'r') as jsonfile:
    config = json.load(jsonfile)

# App initialization
app = Flask(__name__)

# App configuration
app.config['SECRET_KEY'] = config['SECRET_KEY']
app.config['SQLALCHEMY_DATABASE_URI'] = config['SQLALCHEMY_DATABASE_URI']
app.config['MAIL_SERVER'] = config['MAIL_SERVER']
app.config['MAIL_PORT'] = config['MAIL_PORT']
app.config['MAIL_USE_TLS'] = config['MAIL_USE_TLS']
app.config['MAIL_USERNAME'] = config['MAIL_USERNAME']
app.config['MAIL_PASSWORD'] = config['MAIL_PASSWORD']

# App extensions
db = SQLAlchemy(app)
mail = Mail(app)

from .NAICA import routes



