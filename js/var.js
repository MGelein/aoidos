var Var = (function () {
    function Var() {
        this.vars = [new V()];
    }
    Var.prototype.get = function (name) {
        var v = this.find(name);
        if (v == undefined)
            return 0;
        else
            return v.qty;
    };
    Var.prototype.set = function (name, qty) {
        var v = this.find(name);
        if (v != undefined)
            v.qty = qty;
        else
            this.vars.push(new V(name, qty));
    };
    Var.prototype.add = function (name, qty) {
        this.set(name, this.get(name) + qty);
    };
    Var.prototype.subtract = function (name, qty) {
        this.set(name, this.get(name) - qty);
    };
    Var.prototype.equals = function (name, qty) {
        return this.get(name) == qty;
    };
    Var.prototype.smallerThan = function (name, qty) {
        return this.get(name) < qty;
    };
    Var.prototype.greaterThan = function (name, qty) {
        return this.get(name) > qty;
    };
    Var.prototype.find = function (name) {
        var max = this.vars.length;
        for (var i = 0; i < max; i++) {
            if (this.vars[i].name == name)
                return this.vars[i];
        }
        return undefined;
    };
    return Var;
}());
var V = (function () {
    function V(name, qty) {
        if (name === void 0) { name = 'none'; }
        if (qty === void 0) { qty = 0; }
        this.name = '';
        this.qty = 0;
        this.name = name;
        this.qty = qty;
    }
    return V;
}());
