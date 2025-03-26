from backend.user import User
from backend.hardwareSet import HardwareSet
from pymongo import MongoClient

class Database:
    def __init__(self):
        # MongoDB setup
        client = MongoClient("")
        db = client[""] 
        self._users = db[""]
        self._hardwareSet = db[""]

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
        if users is None:
            return False
        
        found = False
        for i in range(len(users)):
            if users[i].has_username(user.username):
                # user already exists, update
                users[i] = user
                found = True
                break

        if not found:
            users.append(user)

        # Write updated list back to database
        return self._write_users(users)

    def get_hw_set(self, hw_id):
        """ If hw set not found, returns None. """
        hw_sets = self._read_hw_sets()
        if hw_sets is None:
            return None

        for hw in hw_sets:
            if hw.hw_id == hw_id:
                return hw
        
        return None

    def update_hw_set(self, hw_set):
        """ If database access failed, returns False.  """
        hw_sets = self._read_hw_sets()
        if hw_sets is None:
            return False
        
        for i in range(len(hw_sets)):
            if hw_sets[i].hw_id == hw_set.hw_id:
                hw_sets[i] = hw_set
                return self._write_hw_sets(hw_sets)
        
        return False
        

    # -- PRIVATE FUNCTIONS --
    
    def _read_users(self):
        """
        Reads user file from the database.
        Returns a list of User objects.
        if failed to read, returns None.
        """
        try:
            user_docs = self._users.find()
            return [User(doc["username"], doc["password"]) for doc in user_docs]
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
            user_docs = [{"username": user.username, "password": user.password} for user in users]
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
            hw_set_docs = self._hardwareSet.find()
            return [HardwareSet(doc["hw_id"]) for doc in hw_set_docs]
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
            hw_set_docs = [{"hw_id": hw_set.hw_id} for hw_set in hw_sets]
            self._hardwareSet.insert_many(hw_set_docs)
            return True
        except Exception as e:
            print(f"Error writing hardware sets to database: {e}")
            return False

