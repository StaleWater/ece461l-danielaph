from flask import Flask, redirect, request, url_for, render_template, send_from_directory
import backend.flaskr.dataload as dataload

app = Flask(__name__, static_folder='frontend/dist')

users={}

@app.route("/")
def entry_page():    
    #load from database
    users = dataload.load()
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/success<name>")
def success(name):
    return 'hello %s' % name

@app.route('/login', methods=["POST"])
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
    

@app.route('/signup')
def signup():
    return render_template('signup.html')


@app.route('/create', methods=["POST"])
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