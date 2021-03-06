class Sound{
    constructor(){
        console.log("Aoidos: Sound module loaded");
    }

    /**
     * Plays the sound file designated by the url
     * @param url the url of the sound file
     */
    play(url:string){
        $('#clip').remove();
        $('#audioHolder').append('<audio id="clip" src="data/sound/' + url + '"></audio>');
        ($('#clip').get(0) as any).play();
    }

    /**
     * Static accessor method for the aoidos.sound object
     * @param url the url of the sound file
     */
    public static play(url:string){
        aoidos.sound.play(url);
    }
}