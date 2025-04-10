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

        projects = []
        for pid in user.project_ids:
            project = self.db.get_project(pid)
            if project is not None:
                projects.append(project)
        
        return projects
    
    def make_new_project(self, username, pid, proj_name, description):
        project = Project(pid, proj_name, username, description)

        if self.db.get_project(pid) is not None:
            raise Exception("Project ID is already in use.")
        if not self.db.add_or_update_project(project):
            raise Exception("Failed to update Project collection")
        
        self.join_project(username, pid)
        
    def join_project(self, username, pid):
        user = self.db.get_user(username)
        project = self.db.get_project(pid)
        if user is None:
            raise Exception("User not found.")
        if project is None:
            raise Exception("Project not found.")
        else:
            if user.add_user_project(pid) is None:
                raise Exception("You are already associated with this project.")
            if not self.db.add_or_update_user(user):
                raise Exception("Failed to update User collection.")
            if project.add_project_user(username) is None:
                raise Exception("Failed to update project's user list")
            if not self.db.add_or_update_project(project):
                raise Exception("Failed to update Project collection")
        return True