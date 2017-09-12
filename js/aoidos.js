var aoidos;
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
    aoidos = new Aoidos('Mees Gelein', '1.0.0');
    aoidos.init();
});
var Aoidos = (function () {
    function Aoidos(author, version) {
        this.author = author;
        this.version = version;
        this.terminal = new Terminal();
        this.loader = new DataLoader("data/");
    }
    Aoidos.prototype.init = function () {
        Room.load('mainmenu');
    };
    return Aoidos;
}());
