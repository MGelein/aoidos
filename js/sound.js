var Sound = (function () {
    function Sound() {
        console.log("Aoidos: Sound module loaded");
    }
    Sound.prototype.play = function (url) {
        $('#clip').remove();
        $('#audioHolder').append('<audio id="clip" src="data/sound/' + url + '"></audio>');
        $('#clip').get(0).play();
    };
    Sound.play = function (url) {
        aoidos.sound.play(url);
    };
    return Sound;
}());
