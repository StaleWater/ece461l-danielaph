from backend.database import Database

class HardwareManager:
    def __init__(self, db: Database):
        self.db = db
    
    def check_out(self, hwid, qty, pid):
        """
        Check out qty units from hardware set hwid for project pid.
        Returns the number of units checked out.
        May be less than qty if hwid does not have enough units available.
        """

        hwset = self.db.get_hw_set(hwid)
        project = self.db.get_project(pid)

        if hwset is None or project is None or qty <= 0:
            return 0

        amt = min(hwset.availability, qty)

        hwset.availability -= amt
        hwset.checked_out[pid] += amt
        project.checked_out[hwid] += amt

        self.db.add_or_update_hw_set(hwset)
        self.db.add_or_update_project(project)

        return amt
        
    def check_in(self, hwid, qty, pid):
        """
        Check in qty units from hardware set hwid for project pid.
        Returns True if successful.
        May fail if pid has not checked out qty units.
        """

        hwset = self.db.get_hw_set(hwid)
        project = self.db.get_project(pid)

        if hwset is None or project is None or qty <= 0:
            return False

        if hwset.checked_out[pid] < qty:
            return False
        
        hwset.availability += qty
        hwset.checked_out[pid] -= qty
        project.checked_out[hwid] -= qty

        self.db.add_or_update_hw_set(hwset)
        self.db.add_or_update_project(project)

        return True

    def get_amt_checked_out(self, hwid, pid):
        hwset = self.db.get_hw_set(hwid)
        return hwset.checked_out[pid]

