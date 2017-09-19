/**
 * DataLoader class will load data files (JSON) from
 * the disk and parse them.
 */
class DataLoader{

    private dataUrl:string;
    /**
     * Creates a new instance of the data loader. Should
     * be only one instance. This receives a reference on 
     * initialize that will tell where the data folder resides
     */
    constructor(dataFolder){
        this.dataUrl = dataFolder;
        console.log("Aoidos: Dataloader ready for requests");
    }

    /**
     * Uses $.getJSON to load a file from the server
     * @param url the location of the file to load
     * @param callback the function called on succes. Only parameter is data loaded
     */
    load(url:string, callback:Function){
        $.getJSON(this.dataUrl + url, function(data){
            callback(data);
        });
    }

    /**
     * Loads a room from the rooms folder using the provided ID and appending a
     * .JSON extension automatically. Once the load is complete calls the 
     * @param id the id of the room we're loading (e.g. main.menu)
     * @param room the empty room instance we want to populate with the loaded data
     */
    loadRoomData(id:string, room:Room){
        this.load('rooms/' + id + '/room.json', function(data){
            Room.current = room;
            room.parseData(data);
        });
    }

    /**
     * Loads an object from the rooms folder that is currently being used. Appends
     * a .JSON extension automtically. 
     * @param id the id of the object we're loading (e.g. door)
     * @param obj the empty object we're going to be populating with data
     */
    loadObjectData(id:string, obj:Obj){
        this.load(Room.current.getObjPath(id), function(data){
            obj.parseData(data);
        });
    }
}