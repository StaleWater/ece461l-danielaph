from backend.database import Database
from backend.user import User

class UserManager:
    def __init__(self, database):
        self.db = database

    def authenticate(self, username, password):
        user = self.db.get_user(username)
        if user is None:
            raise Exception("User does not exist.")

        if not user.has_password(password):
            raise Exception("Password is incorrect.")
        
        return (True, "") 


    def signup(self, username, password):
        user = self.db.get_user(username)
        if user is not None:
            raise Exception("User already exists.")
        
        # Create new user
        user = User(username, password)      

        if not self.db.add_or_update_user(user):
            raise Exception("Failed to update database.")
        

    def get_user_projects(self, username):
        user = self.db.get_user(username)
        if user is None:
            raise Exception("User does not exist.")
        
        return user.project_ids
        
