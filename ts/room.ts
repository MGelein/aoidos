class Room{
    /**All rooms that have been loaded or requested to load*/
    private static loaded:Room[] = [];
    /**The room that is currently loaded */
    public static current:Room;

    /**The name of this room. E.g. The bannered Mare */
    private name:string;
    /**The url of the file used for the background of this room */
    private bgUrl:string;
    /**The id of this room. This would be the filename */
    public id:string;
    /**The urls of the sound files associated with this room */
    private soundUrls:string[];
    /**The description of this room. This is the shorter version of the inspect text*/
    private description:string;
    /**The description of this room that is triggered on first visit and inspect. */
    private inspectText:string;
    /**If this is the first time the room is visited */
    private firstVisit:boolean;
    /**The objects used in this room */
    public objects:Obj[];
    /**The object that holds the lines for this room */
    public lines:Lines;


    /**
     * Constructor instantiates an empty room. You can 
     * then populate its data using the parseData function
     */
    constructor(id:string){
        //Set the first room to load to be the current room. Only necessary on first load
        if(Room.current == undefined) Room.current = this;
        //Initialize all variables to be empty
        this.name = this.description = this.inspectText = "";
        this.soundUrls = [];
        this.firstVisit = true;
        //except for the id that gets set here
        this.id = id;
    }

    /**
     * Enters this room, making it the active room.
     */
    enter():void{
        //unload the old room (get rid of its objects and context)
        Room.current.unload();
        Room.current = this;

        //Now set the background for the room if it was set
        if(this.bgUrl !== undefined && this.bgUrl.length > 1){
            var url:string = 'url(data/img/' + this.bgUrl;
            var old:string = $('#bg').css('background-image');
            if(old == 'none') old = url;
            $('body').css('background-image', old);
            $('#bg').fadeOut(function(){
                $('#bg').css('background-image', url);
                $('#bg').fadeIn();
            });
        }

        //Check if first visit
        if(this.firstVisit){
            this.printInspect();
            this.firstVisit = false;
        }else{
            this.printDescription();
        }
    }

    /**
     * Prints the inspect text to the terminal. If no inspect
     * text has been set. Print the description.
     */
    printInspect(){
        if(this.inspectText && this.inspectText.length > 0){
            aoidos.terminal.printlns(this.inspectText);
        }else{
            aoidos.terminal.printlns(this.description);
        }
    }

    /**
     * Prints the description text to the terminal. If no description
     * text has been set, print the inspect text
     */
    printDescription(){
        if(this.description && this.description.length > 0){
            aoidos.terminal.printlns(this.description);
        }else{
            aoidos.terminal.printlns(this.inspectText);
        }
    }

    /**
     * Sets all the fields of this instance of a room to match the 
     * dataObject you provided.
     * @param data the object loaded from a JSON file that is a room
     */
    parseData(data:any){
        //now set all the other variables
        this.name = data.name;
        this.soundUrls = data.sound;
        this.description = data.description;
        this.inspectText = data.inspect;
        this.objects = Obj.load(data.objects);
        this.bgUrl = data.background;
       
        //Make a self ref and load the lines for this room
        var self:Room = this;
        //now load the lines object
        aoidos.loader.load('rooms/' + this.id + '/lines.json', function(data){
            self.lines = new Lines(data);
            //now that everything is loaded, enter the room
            self.enter();
        });

        //Now that we are loaded, add us to the list of rooms that have been loaded
        Room.loaded.push(this);
    }

    /**
     * Returns a list with objects and npcs that have
     * the topic we want to talk about
     * @param act 
     */
    findActions(act:string):Action[]{
        //Generate a new holder object for matching actions
        var actions:Action[] = [];

        //go through all the objects to find a match
        for(var i = 0; i < this.objects.length; i++){
            var matches:Action[] = this.objects[i].findAction(act);
            if(matches !== undefined){
                actions = actions.concat(matches);
            }
        }
        //Finally return the matches found
        return actions;
    }

    /**
     * Called to clean up before a new room is entered. Makes
     * sure no remains from other rooms are left.
     */
    private unload(){
        //clear screen before continuing into a new room
        aoidos.terminal.cls();
    }

    /**
     * Returns the path where the object with the given id should be stored
     * for this room
     */
    getObjPath(id:string):string{
        return this.getPath() + 'objects/' + id + '.json';
    }

    /**
     * Returns the path where the NPC with the given id should be stored
     * @param id the id of the NPC
     */
    getNPCPath(id:string):string{
        return this.getPath() + 'npcs/' + id + '.json';
    }

    /**
     * Returns the path of this rooms root folder
     */
    getPath():string{
        return 'rooms/' + this.id + '/';
    }

    /**
     * Checks if the room with the provided ID is already loaded.
     * Returns the index of the occurence or -1 if it is not found
     * @param id the id of the room to check
     */
    public static isLoaded(id:string):number{
        for(var i = 0; i < Room.loaded.length; i++){
            if(Room.loaded[i].id == id) return i;
        }
        //If none matched return false
        return -1;
    }

    /**
     * Checks if a room is already loaded, if it is it will
     * load that room, else it will load the room from the 
     * file data and then load it.
     * @param id    the id of the room to load
     */
    public static load(id:string){
        console.log("--------------------");
        console.log("Load Room: " + id);
        console.log("--------------------");
        var index:number = Room.isLoaded(id);
        if(index != -1){
            Room.loaded[index].enter();
        }else{
            //load the data from file
            aoidos.loader.loadRoomData(id, new Room(id));
        }
    }
}