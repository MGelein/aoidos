var Lines = (function () {
    function Lines(data) {
        this.lines = data;
    }
    Lines.prototype.get = function (id) {
        return this.lines[id].join('\n');
    };
    return Lines;
}());
