from backend.mongoObject import MongoObject

class Project(MongoObject):
    def __init__(self, pid=0, name="", owner_username="", description=""):
        self.pid = pid
        self.name = name
        self.description = description
        self.owner_username = owner_username

        self.checked_out = {}
