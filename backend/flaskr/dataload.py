import pickle

def load():
    file = open("userdata/data.txt", "rb")
    users = pickle.loads(file.read())    
    return users

def store(users):
    file = open("userdata/data.txt", "wb")
    pickle.dump(users, file)
