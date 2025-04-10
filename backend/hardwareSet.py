from backend.mongoObject import MongoObject

class HardwareSet(MongoObject):

    def __init__(self, hwname, hwid=0, capacity=0, availability=0):
        self.hwid = hwid
        self.hwname = hwname
        self.capacity = capacity
        self.availability = availability
        self.checked_out = {}
