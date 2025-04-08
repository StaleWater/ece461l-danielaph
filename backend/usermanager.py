from backend.database import Database
from backend.user import User
from backend.project import Project
import jwt

class UserManager:
    def __init__(self, db: Database):
        self.db = db

    def authenticate(self, username, password):
        user = self.db.get_user(username)
        if user is None:
            raise Exception("User does not exist.")

        if not user.has_password(password):
            raise Exception("Password is incorrect.")
        
        user_jwt = jwt.encode({"username": username}, "replaceSecretWithAProperOne", algorithm="HS256")
        return user_jwt

    def signup(self, username, password):
        user = self.db.get_user(username)
        if user is not None:
            raise Exception("User already exists.")
        
        # Create new user
        user = User(username, password)      

        if not self.db.add_or_update_user(user):
            raise Exception("Failed to update User collection.")
        

    def get_user_projects(self, username):
        user = self.db.get_user(username)
        if user is None:
            raise Exception("User does not exist.")
        
        return user.project_ids

    def make_new_project(self, username, pid, proj_name, description):
        project = Project(pid, proj_name, username, description)

        if not self.db.add_or_update_project(project):
            raise Exception("Failed to update Project collection")
        
    def join_project(self, username, pid):
        user = self.db.get_user(username)
        project = self.db.get_project(pid)
        if user is None or  project is None:
            raise Exception("Project or User not found")
        else:
            if user.add_user_project(pid) is None:
                raise Exception("Failed to update user's project list")
            if not self.db.add_or_update_user(user):
                raise Exception("Failed to update User collection.")
            if project.add_project_user(username) is None:
                raise Exception("Failed to update project's user list")
            if not self.db.add_or_update_project(project):
                raise Exception("Failed to update Project collection")
        return True