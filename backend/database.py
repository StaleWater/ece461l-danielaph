from backend.user import User
from backend.hardwareSet import HardwareSet

# TODO replace _users and _hw_sets with MongoDB files
# TODO all private functions should access MongoDB


class Database:
    def __init__(self):
        self._users = [User("admin", "password"), User("daniela", "123")]
        self._hw_sets = [HardwareSet(0), HardwareSet(1)]

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
                return True

        return False

        

    # -- PRIVATE FUNCTIONS --
    
    def _read_users(self):
        """
        Reads user file from the database.
        Returns a list of User objects.
        if failed to read, returns None.
        """
        return self._users

    def _write_users(self, users):
        """
        Overwites user file in the database.
        users is a list of User objects.
        On success, returns True.
        """
        self._users = users
        return True

    def _read_hw_sets(self):
        """
        Reads hardware sets file from the database.
        Returns a list of HardwareSet objects.
        if failed to read, returns None.
        """
        return self._hw_sets

    def _write_hw_sets(self, hw_sets):
        """
        Overwites hardware sets file in the database.
        hw_sets is a list of HardwareSet objects.
        On success, returns True.
        """
        self._hw_sets = hw_sets
        return True

