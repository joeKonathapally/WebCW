from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Note
import requests
from . import db
import json

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        note = request.form.get('note')

        if len(note) < 1:
            flash('Note is too short!', category='error')
        else:
            new_note = Note(data=note, user_id=current_user.id)
            db.session.add(new_note)
            db.session.commit()
            flash('Note added!', category='success')

    return render_template("home.html", user=current_user)

@views.route('/posts', methods = ['GET','POST'])
@login_required
def post():
    if request.method == 'POST':
        print('inside post')
        print(request.get_json())
        data = request.get_json()
        res = requests.post('http://localhost:7000/createPosts', json = data)
        print("response from server : ",res.text)

        return(res.text)


    return render_template("post.html", user=current_user)

@views.route('/events', methods = ['GET','POST'])
@login_required
def events():
    if request.method == 'POST':
        print('inside post')
        print(request.get_json())
        data = request.get_json()
        res = requests.post('http://localhost:6050/createEvents', json = data)
        print("response from server : ",res.text)

        return(res.text)


    return render_template("events.html", user=current_user)



@views.route('/feeds', methods = ['GET','POST'])
@login_required
def feeds():
    # if request.method == 'POST':
    #     print('inside post')
    #     print(request.get_json())
    #     data = request.get_json()
    #     res = requests.post('http://localhost:6050/createEvents', json = data)
    #     print("response from server : ",res.text)
    #
    #     return(res.text)


    return render_template("feed.html", user=current_user)




@views.route('/test')
def test():
    print("trying redirect post")
    print("trying redirect test")
    return render_template("test.html", user=current_user)


@views.route('/delete-note', methods=['POST'])
def delete_note():
    note = json.loads(request.data)
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()

    return jsonify({})
