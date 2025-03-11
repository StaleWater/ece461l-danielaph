import pickle

def load():
    file = open("backend/flaskr/userdata/data.txt", "rb")
    users = pickle.loads(file.read())    
    return users

def store(users):
    file = open("backend/flaskr/userdata/data.txt", "wb")
    pickle.dump(users, file)
