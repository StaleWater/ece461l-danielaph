from backend.mongoObject import MongoObject

class HardwareSet(MongoObject):

    def __init__(self, hwid=0, hwname="", capacity=0, availability=0):
        self.hwid = hwid
        self.hwname = hwname
        self.capacity: int = capacity
        self.availability: int = availability
        self.checked_out: dict[str, int] = {}
