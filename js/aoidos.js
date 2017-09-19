var aoidos;
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
    aoidos = new Aoidos('Mees Gelein', '1.0.0');
    $.getScript('data/custom.js', function () {
        console.log("Aoidos: Custom Functions loaded");
        aoidos.init();
    });
});
var Aoidos = (function () {
    function Aoidos(author, version) {
        this.author = author;
        this.version = version;
        this.terminal = new Terminal();
        this.loader = new DataLoader("data/");
        this.sound = new Sound();
        this["var"] = new Var();
        this.quest = new Var();
        console.log("Aoidos: Variable & Quest Registers loaded");
    }
    Aoidos.prototype.init = function () {
        console.log("=====================================");
        console.log("Initialized Aoidos v." + this.version);
        console.log("All programming by " + this.author);
        console.log("Ready to load first room");
        console.log("=====================================");
        Room.load('mainmenu');
    };
    return Aoidos;
}());
