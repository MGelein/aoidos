var Action = (function () {
    function Action(data) {
        this.id = data.id;
        this.alias = data.alias;
        this.cases = Case.parseList(data.cases);
    }
    Action.parseList = function (data) {
        var actions = [];
        for (var i = 0; i < data.length; i++) {
            actions.push(new Action(data[i]));
        }
        return actions;
    };
    return Action;
}());
