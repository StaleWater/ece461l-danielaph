from flask import Flask, redirect, request, url_for, render_template, send_from_directory, Response
import os
from backend.usermanager import UserManager
from backend.hardwareManager import HardwareManager
from backend.database import Database

app = Flask(__name__, static_folder='../febuild')

db = Database()
user_man = UserManager(db)
hw_man = HardwareManager(db)

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

@app.route('/api/login', methods=['GET'])
def login():
    username = request.args.get("uname")
    password = request.args.get("pw")

    try:
        jwt = user_man.authenticate(username, password)
        return Response(jwt, status=201)

    except Exception as e:
        error_msg = e.args[0]
        return Response(error_msg, status=401)

    
@app.route('/api/signup', methods=['POST'])
def signup():
    username = request.args.get("uname")
    password = request.args.get("pw")

    try:
        user_man.signup(username, password)
        return Response("Success", status=201)
    
    except Exception as e:
        error_msg = e.args[0]
        return Response(error_msg, status=401)


@app.route('/api/get-user-projects')
def get_user_projects():
    username = request.args.get("uname")
    try:
        project_ids = user_man.get_user_projects(username)
        return project_ids
    
    except Exception as e:
        error_msg = e.args[0]
        return error_msg