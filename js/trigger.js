var Trigger = (function () {
    function Trigger(trigger) {
        this.stringDesc = trigger;
    }
    Trigger.prototype.trigger = function () {
        console.log("- Trigger: " + this.stringDesc);
        var register = this.stringDesc.substr(0, 1);
        var variables = this.stringDesc.substr(1).replace(/[()]/g, '');
        switch (register) {
            case 'S':
                this.playSound(variables);
                break;
            default:
                console.log("! - Unrecognized Trigger!");
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
