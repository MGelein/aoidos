var Room = (function () {
    function Room(id) {
        if (Room.current == undefined)
            Room.current = this;
        this.name = this.description = this.inspectText = "";
        this.soundUrls = [];
        this.firstVisit = true;
        this.id = id;
    }
    Room.prototype.enter = function () {
        Room.current.unload();
        Room.current = this;
        if (this.firstVisit) {
            this.printInspect();
            this.firstVisit = false;
        }
        else {
            this.printDescription();
        }
    };
    Room.prototype.printInspect = function () {
        if (this.inspectText && this.inspectText.length > 0) {
            aoidos.terminal.printlns(this.inspectText);
        }
        else {
            aoidos.terminal.printlns(this.description);
        }
    };
    Room.prototype.printDescription = function () {
        if (this.description && this.description.length > 0) {
            aoidos.terminal.printlns(this.description);
        }
        else {
            aoidos.terminal.printlns(this.inspectText);
        }
    };
    Room.prototype.parseData = function (data) {
        this.name = data.name;
        this.soundUrls = data.sound;
        this.description = data.description;
        this.inspectText = data.inspect;
        this.objects = Obj.load(data.objects);
        var self = this;
        aoidos.loader.load('rooms/' + this.id + '/lines.json', function (data) {
            self.lines = new Lines(data);
            self.enter();
        });
        Room.loaded.push(this);
    };
    Room.prototype.findActions = function (act) {
        var actions = [];
        for (var i = 0; i < this.objects.length; i++) {
            var matches = this.objects[i].findAction(act);
            if (matches !== undefined) {
                actions = actions.concat(matches);
            }
        }
        return actions;
    };
    Room.prototype.unload = function () {
        aoidos.terminal.cls();
    };
    Room.prototype.getObjPath = function (id) {
        return this.getPath() + 'objects/' + id + '.json';
    };
    Room.prototype.getNPCPath = function (id) {
        return this.getPath() + 'npcs/' + id + '.json';
    };
    Room.prototype.getPath = function () {
        return 'rooms/' + this.id + '/';
    };
    Room.isLoaded = function (id) {
        for (var i = 0; i < Room.loaded.length; i++) {
            if (Room.loaded[i].id == id)
                return i;
        }
        return -1;
    };
    Room.load = function (id) {
        var index = Room.isLoaded(id);
        if (index != -1) {
            Room.loaded[index].enter();
        }
        else {
            aoidos.loader.loadRoomData(id, new Room(id));
        }
    };
    Room.loaded = [];
    return Room;
}());
