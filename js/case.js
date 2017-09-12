var Case = (function () {
    function Case(data) {
        this.lines = data.lines;
        this.conditions = data.conditions;
        this.triggers = data.triggers;
    }
    Case.prototype.test = function () {
    };
    Case.prototype.trigger = function () {
    };
    Case.parseList = function (data) {
        var cases = [];
        for (var i = 0; i < data.length; i++) {
            cases.push(new Case(data[i]));
        }
        return cases;
    };
    return Case;
}());
