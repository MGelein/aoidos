/**
 * Main global configuration and access object
 */
var aoidos:Aoidos;

/**
 * ENTRY POINT
 */
$(document).ready(function(){
    //turn off ajax caching.
    $.ajaxSetup({cache: false});
    //Create the main game object
    aoidos = new Aoidos('Mees Gelein', '1.0.0');
    
    //Also load the custom function script
    $.getScript('data/custom.js', function(){
        console.log("Aoidos: Custom Functions loaded");
        //and run the init function
        aoidos.init();
    });

});

/**
 * This object creates all necessary files and is the main application class
 */
class Aoidos{

    /**The author of this piece of software. AKA Me :P */
    public author:string;
    /**The version number. Try to update this for a change! */
    public version:string;
    /**The terminal we use to ouput and input information */
    public terminal:Terminal;
    /**The loader we use to load assets from the server */
    public loader:DataLoader;
    /**Used to access sound playing methods*/
    public sound:Sound;
    /**The variable register*/
    public var:Var;
    /**The quest stage register */
    public quest:Var;

    /**
     * Creates a new instance of the main class. This is the effective entry point of the code.
     * Also set author and version number
     */
    constructor(author:string, version:string){
        this.author = author;
        this.version = version;
        this.terminal = new Terminal();
        this.loader = new DataLoader("data/");
        this.sound = new Sound();
        this.var = new Var();
        this.quest = new Var();
        console.log("Aoidos: Variable & Quest Registers loaded");
    }

    /**
     * Initializes the first screen of the game, the main menu
     */
    init(){
        console.log("=====================================");
        console.log("Initialized Aoidos v." + this.version);
        console.log("All programming by " + this.author);
        console.log("Ready to load first room")
        console.log("=====================================");
        //Load the first room
        Room.load('mainmenu');
    }
}