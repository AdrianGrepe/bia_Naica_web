from datetime import datetime, timedelta
from flask import render_template, request, make_response, redirect, flash, url_for, send_file
from datetime import datetime, timedelta
from flask_mail import Message
import json
import io

# Local modules
from pagina import app, mail, db

# Forms and models
from .forms import ContactInfoForm
from .models import ContactInfo

@app.route('/setcookie/')
def setcookie():
    response = make_response(redirect(request.referrer))
    today = datetime.utcnow()
    response.set_cookie(
        key='last_visit',
        value=datetime.strftime(today, '%Y-%m-%d'),
        expires=today + timedelta(365)
    )

    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gracias')
def gracias():
    return render_template('gracias.html')

@app.route('/imagenes')
def imagenes():
    return render_template('imagenes.html')

@app.route('/seguros')
def seguros():
    return render_template('seguros.html')

@app.route('/socios')
def socios():
    return render_template('socios.html')

@app.route('/acreedores')
def acreedores():
    return render_template('acreedores.html')

@app.route('/acceso')
def acceso():
    return render_template('acceso.html')

def send_contact_info_email(name, email, phone_number, message):
    msg = Message(
        subject='Información de contacto',
        sender='no-reply@naica.com',
        recipients=['adrian.grepe@naica.mx']
    )
    msg.body = f'''Nueva información de contacto:

Nombre: {name}
Correo electrónico: {email}
Número de teléfono: {phone_number}
Mensaje: {message}
'''
    # msg.html = render_template()
    mail.send(msg)


@app.route('/contacto', methods=['GET', 'POST'])
def contacto():
    form = ContactInfoForm(request.form)
    context = {
        'form': form,
    }

    if request.method == 'POST':
        context['go_to_form'] = True


        if form.validate():
            name = form.name.data
            email = form.email.data
            phone_number = form.phone_number.data
            message = form.message.data
            user_info = ContactInfo(name=name, email=email, phone_number=phone_number, message=message)
            db.session.add(user_info)
            db.session.commit()

            send_contact_info_email(name, email, phone_number, message)
            flash(
                'Muchas gracias por la información, en la brevedad '
                + 'nos pondremos en contacto con usted.','success'
            )
            return redirect(
                url_for('contacto', _anchor='form')
            )
        else:
            flash('No se guardaron los datos','error')
        
        return render_template('contacto.html', **context)
    
    return render_template('contacto.html', **context)




