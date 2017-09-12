var Obj = (function () {
    function Obj(id) {
        this.name = this.description = '';
        this.alias = [];
        this.actions = [];
        this.id = id;
    }
    Obj.prototype.findAction = function (act) {
        var actions = [];
        for (var i = 0; i < this.actions.length; i++) {
            if (this.actions[i].matches(act))
                actions.push(this.actions[i]);
        }
        return actions;
    };
    Obj.prototype.parseData = function (data) {
        this.name = data.name;
        this.alias = data.alias;
        this.actions = Action.parseList(data.actions);
    };
    Obj.load = function (s) {
        var objects = [];
        var objDefs = s.split(',');
        for (var i = 0; i < objDefs.length; i++) {
            var id = objDefs[i].trim();
            var obj = new Obj(id);
            aoidos.loader.loadObjectData(id, obj);
            objects.push(obj);
        }
        return objects;
    };
    Obj.loaded = [];
    return Obj;
}());
