from backend.cipher import encrypt, decrypt

class User:
    """ Stores username and password in encrypted form. """

    def __init__(self, username, password):
        self._e_username = encrypt(username)
        self._e_password = encrypt(password)
        self.project_ids = []  
    
    def has_username(self, username):
        return decrypt(self._e_username) == username

    def has_password(self, password):
        return decrypt(self._e_password) == password
