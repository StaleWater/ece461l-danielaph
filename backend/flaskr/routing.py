from flask import Flask, redirect, request, url_for, render_template, send_from_directory
import os
from backend.usermanager import UserManager
from backend.database import Database

app = Flask(__name__, static_folder='../../frontend/dist')

db = Database()
user_man = UserManager(db)

# serve frontend files
@app.route("/", defaults={'somePath': ''})
@app.route('/<path:somePath>') # captures all paths not handled by other routes
def serve_frontend(somePath):    

    # any unrecognized path should search the static_folder
    if somePath != '' and os.path.exists(f"{app.static_folder}/{somePath}"):
        return send_from_directory(app.static_folder, somePath)

    # if we don't find a matching file, send index.html
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/login', methods=["POST"])
def login():
    username = request.form.get("nm")
    password = request.form.get("pw")

    try:
        user_man.authenticate(username, password)
        return "success"

    except Exception as e:
        error_msg = e.args[0]
        return error_msg

    
@app.route('/api/signup', methods=["POST"])
def create():
    username = request.form.get("nm")
    password = request.form.get("pw")

    try:
        user_man.signup(username, password)
        return "success"
    
    except Exception as e:
        error_msg = e.args[0]
        return error_msg