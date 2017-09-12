var Trigger = (function () {
    function Trigger(trigger) {
        this.stringDesc = trigger;
    }
    Trigger.prototype.trigger = function () {
        console.log("- Trigger: " + this.stringDesc);
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
