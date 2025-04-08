from backend.mongoObject import MongoObject

class Project(MongoObject):
    def __init__(self, pid=0, name="", owner_username="", description=""):
        self.pid = pid
        self.name = name
        self.description = description
        self.owner_username = owner_username
        self.current_users = []
        self.checked_out = {}

    def add_project_user(self, username):
        if username in self.current_users:
            return None
        else:
            self.current_users.append(username)
            return self.current_users
    
    def remove_project_user(self,username):
        if username in self.current_users:
            return None
        else:
            self.current_users.remove(username)
            return self.username