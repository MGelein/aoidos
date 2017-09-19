var Trigger = (function () {
    function Trigger(trigger) {
        this.stringDesc = trigger;
    }
    Trigger.prototype.trigger = function () {
        console.log("- Trigger: " + this.stringDesc);
        var register = this.stringDesc.substr(0, 1).toUpperCase();
        var variables = this.stringDesc.substr(1).replace(/[()]/g, '');
        switch (register) {
            case 'S':
                this.playSound(variables);
                break;
            case 'V':
                this.changeVar(variables.split(',')[0].trim(), variables.split(',')[1].trim());
                break;
            case 'Q':
                this.changeQuest(variables.split(',')[0].trim(), variables.split(',')[1].trim());
                break;
            case 'F':
                this.executeFunction(variables);
                break;
            case 'R':
                this.changeRoom(variables);
                break;
            default:
                console.log("! - Unrecognized Trigger!");
                break;
        }
    };
    Trigger.prototype.changeRoom = function (name) {
        Room.load(name);
    };
    Trigger.prototype.executeFunction = function (name) {
        console.log("- - Execute Function: " + name);
        aoidos_custom[name]();
    };
    Trigger.prototype.changeQuest = function (name, stage) {
        console.log("- - Change quest: " + name + " set to stage: " + stage);
        aoidos.quest.set(name, Number(stage));
    };
    Trigger.prototype.changeVar = function (name, operation) {
        console.log("- - Change var: " + name + " with op: " + operation);
        var firstOpChar = operation.substr(0, 1);
        switch (firstOpChar) {
            case '+':
                aoidos["var"].add(name, Number(operation.substring(1)));
                break;
            case '-':
                aoidos["var"].subtract(name, Number(operation.substring(1)));
                break;
            default:
                aoidos["var"].set(name, Number(operation));
                break;
        }
    };
    Trigger.prototype.playSound = function (variables) {
        console.log("- - Playing sound: " + variables);
        aoidos.sound.play(variables);
    };
    Trigger.parseList = function (data) {
        var triggers = [];
        for (var i = 0; i < data.length; i++) {
            triggers.push(new Trigger(data[i]));
        }
        return triggers;
    };
    return Trigger;
}());
