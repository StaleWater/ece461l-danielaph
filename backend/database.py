from backend.user import User
from backend.hardwareSet import HardwareSet
from backend.project import Project
from pymongo import MongoClient

class Database:
    def __init__(self):
        # MongoDB setup
        client = MongoClient("mongodb+srv://cmstewart:ECE461L@swelab.yskcb.mongodb.net/?authSource=admin")
        db = client["Team_Project"] 
        self._users = db["Users"]
        self._hardwareSet = db["HardwareSets"]
        self._projects = db["Projects"]
        
    def get_user(self, username):
        """ If user not found, returns None. """
        users = self._read_users()
        for user in users:
            if user.has_username(username):
                return user
        return None

    def add_or_update_user(self, user):
        """
        If username already exists, updates the existing user.
        Otherwise, adds a new user.
        If database access failed, returns False.
        """
        users = self._read_users()
        # users = self._users
        if users is None:
            return False
        
        found = False
        for i in range(len(users)):
            if users[i].e_username == user.e_username:
                # user already exists, update
                users[i] = user
                found = True
                break

        if not found:
            users.append(user)

        # Write updated list back to database
        self._write_users(users)
        return True

    def get_hw_set(self, hwid):
        """ If hw set not found, returns None. """
        hw_sets = self._read_hw_sets()
        if hw_sets is None:
            return None

        for hw in hw_sets:
            if hw.hwid == hwid:
                return hw
        
        return None
    
    def get_hw_sets(self):
        return self._read_hw_sets()

    def add_or_update_hw_set(self, hw_set):
        """ If database access failed, returns False.  """
        hw_sets = self._read_hw_sets()
        if hw_sets is None:
            return False
        
        found = False
        for i in range(len(hw_sets)):
            if hw_sets[i].hwid == hw_set.hwid:
                found = True
                hw_sets[i] = hw_set
                break
                
        if not found:
            hw_sets.append(hw_set)

        return self._write_hw_sets(hw_sets)
    
    def get_project(self, pid):
        """ If project not found, returns None. """
        projects = self._read_projects()
        for project in projects:
            if project.pid == pid:
                return project    

        return None
        
    def add_or_update_project(self, project):
        """ If database access failed, returns False.  """
        projects = self._read_projects()
        if projects is None:
            return False
        
        found = False
        for i in range(len(projects)):
            if projects[i].pid == project.pid:
                found = True
                projects[i] = project
                break
                
        if not found:
            projects.append(project)

        return self._write_projects(projects)

    # -- PRIVATE FUNCTIONS --

    def _read_users(self):
        """
        Reads user file from the database.
        Returns a list of User objects.
        if failed to read, returns None.
        """
        try:
            user_docs = self._users.find({}, {'_id': False})
            return [User().deserialize(doc) for doc in user_docs]
        except Exception as e:
            print(f"Error reading users from database: {e}")
            return None

    def _write_users(self, users):
        """
        Overwites user file in the database.
        users is a list of User objects.
        On success, returns True.
        """
        try:
            self._users.delete_many({})
            user_docs = [user.serialize() for user in users]
            self._users.insert_many(user_docs)
            return True
        except Exception as e:
            print(f"Error writing users to database: {e}")
            return False

    def _read_hw_sets(self):
        """
        Reads hardware sets file from the database.
        Returns a list of HardwareSet objects.
        if failed to read, returns None.
        """
        try:
            hw_set_docs = self._hardwareSet.find({}, {'_id': False})
            return [HardwareSet().deserialize(doc) for doc in hw_set_docs]
        except Exception as e:
            print(f"Error reading hardware sets from database: {e}")
            return None

    def _write_hw_sets(self, hw_sets):
        """
        Overwites hardware sets file in the database.
        hw_sets is a list of HardwareSet objects.
        On success, returns True.
        """
        try:
            self._hardwareSet.delete_many({})
            hw_set_docs = [hw_set.serialize() for hw_set in hw_sets]
            self._hardwareSet.insert_many(hw_set_docs)
            return True
        except Exception as e:
            print(f"Error writing hardware sets to database: {e}")
            return False

    def _read_projects(self):
        """
        Reads user file from the database.
        Returns a list of User objects.
        if failed to read, returns None.
        """
        try:
            proj_docs = self._projects.find({}, {'_id': False})
            return [Project().deserialize(doc) for doc in proj_docs]
        except Exception as e:
            print(f"Error reading projects from database: {e}")
            return None

    def _write_projects(self, projects):
        """
        Overwites user file in the database.
        users is a list of User objects.
        On success, returns True.
        """
        try:
            self._projects.delete_many({})
            proj_docs = [proj.serialize() for proj in projects]
            self._projects.insert_many(proj_docs)
            return True
        except Exception as e:
            print(f"Error writing projects to database: {e}")
            return False
