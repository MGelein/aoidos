var aoidos;
$(document).ready(function () {
    aoidos = new Aoidos('Mees Gelein', '1.0.0');
});
var Aoidos = (function () {
    function Aoidos(author, version) {
        this.author = author;
        this.version = version;
        this.terminal = new Terminal();
        this.loader = new DataLoader("data/");
        this.init();
    }
    Aoidos.prototype.init = function () {
        this.loader.loadMenu('main', function (data) {
            aoidos.terminal.printlns(data.text.join('\n'));
        });
    };
    return Aoidos;
}());
