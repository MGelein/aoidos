var Sound = (function () {
    function Sound() {
    }
    Sound.prototype.play = function (url) {
        $('#clip').remove();
        $('#audioHolder').append('<audio id="clip" src="data/sound/' + url + '"></audio>');
        $('#clip').get(0).play();
    };
    return Sound;
}());