var Condition = (function () {
    function Condition(condition) {
        this.stringDesc = condition;
    }
    Condition.prototype.test = function () {
        if (this.stringDesc == undefined || this.stringDesc.length < 1)
            return true;
        var firstLetter = this.stringDesc.substr(0, 1).toUpperCase();
        var variables = this.stringDesc.substring(1).replace(/[()]/g, '');
        switch (firstLetter) {
            case 'Q':
                return this.testQuest(variables.split(',')[0].trim(), variables.split(',')[1].trim());
            case 'V':
                return this.testVariable(variables.split(',')[0].trim(), variables.split(',')[1].trim());
            case 'F':
                return this.testFunction(variables);
            case 'R':
                return this.testRoom(variables);
            default:
                console.log("Did not recognize condition register '" + firstLetter + "'");
                return false;
        }
    };
    Condition.prototype.testRoom = function (name) {
        return Room.current.id === name;
    };
    Condition.prototype.testFunction = function (name) {
        return (aoidos_custom[name]() === true);
    };
    Condition.prototype.testQuest = function (name, stage) {
        return aoidos.quest.equals(name, Number(stage));
    };
    Condition.prototype.testVariable = function (name, value) {
        var opChar = value.substring(0, 1);
        switch (opChar) {
            case '>':
                return aoidos["var"].greaterThan(name, Number(value.substring(1)));
            case '<':
                return aoidos["var"].smallerThan(name, Number(value.substring(1)));
            default:
                return aoidos["var"].equals(name, Number(value));
        }
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
