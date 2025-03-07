from flask import Flask, redirect, request, url_for, render_template
import dataload

app = Flask(__name__)

users={}

@app.route("/")
def hello_world():    
    #load from database
    users = dataload.load()
    return render_template('form.html')

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

if __name__ == '__main__':
    app.run(debug=True)