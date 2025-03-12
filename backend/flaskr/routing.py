from flask import Flask, redirect, request, url_for, render_template, send_from_directory
import os
import backend.flaskr.dataload as dataload

app = Flask(__name__, static_folder='../../frontend/dist')

users={}

# serve frontend files
@app.route("/", defaults={'somePath': ''})
@app.route('/<path:somePath>') # captures all paths not handled by other routes
def serve_frontend(somePath):    
    #load from database
    users = dataload.load()

    # any unrecognized path should search the static_folder
    if somePath != '' and os.path.exists(f"{app.static_folder}/{somePath}"):
        return send_from_directory(app.static_folder, somePath)

    # if we don't find a matching file, send index.html
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/api/success<name>")
def success(name):
    return 'hello %s' % name

@app.route('/api/login', methods=["POST"])
def login():
    users = dataload.load()
    username = request.form.get("nm")
    password = request.form.get("pw")

    if username in users:
        if password == users[username]:
            return "you are logged in"
        else:
            return "incorrect password"
    else:
        return redirect('/signup')
    
@app.route('/api/create', methods=["POST"])
def create():
    users = dataload.load()
    username = request.form.get("nm")
    password = request.form.get("pw")
    if username not in users:
        users[username] = password
        dataload.store(users)
        return redirect("/")
    else:
        return "user already exists"