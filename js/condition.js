var Condition = (function () {
    function Condition(condition) {
        this.stringDesc = condition;
    }
    Condition.prototype.test = function () {
        return true;
    };
    Condition.parseList = function (data) {
        var conditions = [];
        for (var i = 0; i < data.length; i++) {
            conditions.push(new Condition(data[i]));
        }
        return conditions;
    };
    return Condition;
}());
