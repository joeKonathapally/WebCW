from lib2to3.pgen2.token import EQUAL
from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user
import requests
import json
import jwt
auth = Blueprint('auth', __name__)
print("start")

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        userdb = requests.post('http://localhost:2000/findUserByEmail', data = {'Email':email}).json()
        # print(userdb[0]["Password"])
        # print(len(userdb))
        if not len(userdb)==0:
            if userdb[0]["Password"]==password:
                temp_user = User(userid=userdb[0]["UserID"], user_name=userdb[0]["UserName"], password=userdb[0]["Password"], email=userdb[0]["Email"])
                db.session.add(temp_user)
                db.session.commit()
                flash('Logged in successfully!', category='success')
                login_user(temp_user, remember=True)
                print("logged in")
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email does not exist.', category='error')

    return render_template("login.html", user=current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        user_name = request.form.get('user_name')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        user_type = request.form.get('userType')

        data = {'Email':email, 'UserName':user_name, 'Password': password2,'UserType':user_type}
        print(data)
        userEmCheck = requests.post('http://localhost:2000/findUserByEmail', data = {'Email':email}).json()
        if len(userEmCheck) != 0:
            flash('Email already exists.', category='error')
            print("user does not exist")
        elif len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(user_name) < 2:
            flash('User name must be greater than 1 character.', category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            print("validation done")
            userid = requests.post('http://localhost:2000/signup',data=data).json()
            new_user = User(email=email,userid = userid["UserID"], user_name=user_name, password=password1,user_type = user_type)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            print("yes sir")
            return redirect(url_for('views.home'))
    
    return render_template("sign_up.html", user=current_user)
