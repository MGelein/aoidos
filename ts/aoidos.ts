/**
 * Main global configuration and access object
 */
var aoidos:Aoidos;

/**
 * ENTRY POINT
 */
$(document).ready(function(){
    aoidos = new Aoidos('Mees Gelein', '1.0.0');
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

    /**
     * Creates a new instance of the main class. This is the effective entry point of the code.
     * Also set author and version number
     */
    constructor(author:string, version:string){
        this.author = author;
        this.version = version;
        this.terminal = new Terminal();
        this.loader = new DataLoader("data/");
        this.init();
    }

    /**
     * Initializes the first screen of the game, the main menu
     */
    init(){
        this.loader.loadMenu('main', function(data){
            aoidos.terminal.printlns(data.text.join('\n'));
        });
    }
}