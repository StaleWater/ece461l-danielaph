from backend.cipher import encrypt, decrypt
from backend.mongoObject import MongoObject

class User(MongoObject):
    """ Stores username and password in encrypted form. """

    def __init__(self, username="", password=""):
        self.e_username = encrypt(username)
        self.e_password = encrypt(password)
        self.project_ids = []  
    
    def has_username(self, username):
        return decrypt(self.e_username) == username

    def has_password(self, password):
        return decrypt(self.e_password) == password
    
    def add_user_project(self, pid):
        if pid in self.project_ids:
            return None
        else:
            self.project_ids.append(pid)
            return self.project_ids

    def remove_user_project(self, pid):
        if pid not in self.project_ids:
            return None
        else:
            self.project_ids.remove(pid)
            return self.project_ids