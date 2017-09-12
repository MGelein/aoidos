var Case = (function () {
    function Case(data) {
        this.lines = data.lines;
        this.conditions = Condition.parseList(data.conditions);
        this.triggers = Trigger.parseList(data.triggers);
    }
    Case.prototype.test = function () {
        if (this.conditions.length > 0) {
            for (var i = 0; i < this.conditions.length; i++) {
                if (!this.conditions[i].test())
                    return false;
            }
        }
        return true;
    };
    Case.prototype.trigger = function () {
        for (var i = 0; i < this.triggers.length; i++) {
            this.triggers[i].trigger();
        }
        aoidos.terminal.printlns(this.lines[Math.floor(Math.random() * this.lines.length)]);
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
