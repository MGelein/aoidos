var DataLoader = (function () {
    function DataLoader(dataFolder) {
        this.dataUrl = dataFolder;
    }
    DataLoader.prototype.load = function (url, callback) {
        $.getJSON(this.dataUrl + url, function (data) {
            callback(data);
        });
    };
    DataLoader.prototype.loadRoomData = function (id, room) {
        this.load('rooms/' + id + '/room.json', function (data) {
            room.parseData(data);
        });
    };
    DataLoader.prototype.loadObjectData = function (id, obj) {
        this.load(Room.current.getObjPath(id), function (data) {
            obj.parseData(data);
        });
    };
    return DataLoader;
}());
