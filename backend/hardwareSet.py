
class HardwareSet:

    def __init__(self, hw_id):
        self.hw_id = hw_id

        self._capacity = 0
        self._availability = 0
        self._checkedOut = 100 * [0]

    def initialize_capacity(self, qty):
        self._capacity = qty
        self._availability = qty
    
    def get_availability(self):
        return self._availability

    def get_capacity(self):
        return self._capacity

    def check_out(self, qty, projectID):
        """ Returns # of units checked out. May be less than qty.  """
        num_checked_out = 0
        if qty > self._availability:
            num_checked_out = self._availability

            self._checkedOut[projectID] += self._availability
            self._availability = 0
        else:
            num_checked_out = qty

            self._checkedOut[projectID] += qty
            self._availability -= qty
        
        return num_checked_out

    def check_in(self, qty, projectID):
        """ Returns False if failed to check in. """
        if self._checkedOut[projectID] < qty:
            return False
        else:
            self._checkedOut[projectID] -= qty
            self._availability += qty
            return True

