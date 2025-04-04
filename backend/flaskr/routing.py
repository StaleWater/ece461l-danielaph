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


@app.route('/api/get-user-projects', methods=['GET'])
def get_user_projects():
    username = request.args.get("uname")
    try:
        project_ids = user_man.get_user_projects(username)
        return Response(project_ids, status=201)
    
    except Exception as e:
        error_msg = e.args[0]
        return Response(error_msg, 401)


@app.route('/api/make-new-project', methods=['POST'])
def make_new_project():
    username = request.args.get("uname")
    pid = request.args.get("pid")
    proj_name = request.args.get("pname")
    description = request.args.get("desc")

    try:
        user_man.make_new_project(username, pid, proj_name, description)
        return Response("Success", status=201)
    
    except Exception as e:
        error_msg = e.args[0]
        return Response(error_msg, 401)

@app.route('/api/get-project-info', methods=['GET'])
def get_project_info():
    pid = request.args.get("pid")

    try:
        project = db.get_project(pid)
        return Response(project.serialize(), status=201)
    
    except Exception as e:
        error_msg = e.args[0]
        return Response(error_msg, 401)

@app.route('/api/get-amt-checked_out', methods=['GET'])
def get_amt_checked_out():
    pid = request.args.get("pid")
    hwid = request.args.get("hwid")

    try:
        amt = hw_man.get_amt_checked_out(hwid, pid)
        return Response(amt, status=201)
    
    except Exception as e:
        error_msg = e.args[0]
        return Response(error_msg, 401)


@app.route('/api/get-hwset-info', methods=['GET'])
def get_hwset_info():
    hwid = request.args.get("hwid")

    try:
        hwset = db.get_hw_set(hwid)
        return Response(hwset.serialize(), status=201)
    
    except Exception as e:
        error_msg = e.args[0]
        return Response(error_msg, 401)


@app.route('/api/checkin', methods=['POST'])
def checkin():
    hwid = request.args.get("hwid")
    qty = request.args.get("qty")
    pid = request.args.get("pid")

    try:
        success = hw_man.check_in(hwid, qty, pid)
        if success:
            return Response("Success", status=201)
        else: 
            return Response(f"{qty} units were not previously checked out", status=401)
    
    except Exception as e:
        error_msg = e.args[0]
        return Response(error_msg, 401)

@app.route('/api/checkout', methods=['POST'])
def checkout():
    hwid = request.args.get("hwid")
    qty = request.args.get("qty")
    pid = request.args.get("pid")

    try:
        qty_checked_out = hw_man.check_out(hwid, qty, pid)
        return Response(qty_checked_out, status=201)
    
    except Exception as e:
        error_msg = e.args[0]
        return Response(error_msg, 401)

