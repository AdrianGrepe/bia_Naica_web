import enum
from datetime import datetime

from pagina import db


class ContactInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=True)
    phone_number = db.Column(db.String, nullable=True)
    message = db.Column(db.String, nullable=True)
    contact_date = db.Column(
        db.DateTime, nullable=False, server_default=db.func.now()
    )

    def __repr__(self):
        return (
            f'UserInfo(name="{self.name}", email="{self.email}", '
            f'phone_number="{self.phone_number}"), message="{self.message}"'
        )


