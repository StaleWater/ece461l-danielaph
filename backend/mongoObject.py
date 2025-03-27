
class MongoObject:
    def serialize(self):
        return vars(self)

    def deserialize(self, objDict):
        self.__dict__.update(objDict)
        return self