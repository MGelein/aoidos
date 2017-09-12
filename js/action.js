var Action = (function () {
    function Action(data) {
        this.id = data.id;
        this.alias = data.alias;
        this.cases = Case.parseList(data.cases);
    }
    Action.prototype.matches = function (act) {
        if (this.id == act)
            return true;
        if (this.alias.indexOf(act) != -1)
            return true;
        return false;
    };
    Action.prototype.run = function () {
        for (var i = 0; i < this.cases.length; i++) {
            if (this.cases[i].test()) {
                console.log("Run Action: " + this.id);
                this.cases[i].trigger();
                return;
            }
        }
    };
    Action.parseList = function (data) {
        var actions = [];
        for (var i = 0; i < data.length; i++) {
            actions.push(new Action(data[i]));
        }
        return actions;
    };
    return Action;
}());
