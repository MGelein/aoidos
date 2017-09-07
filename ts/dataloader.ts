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
     * Loads a menu with the provided data
     * @param name the name of the menu (e.g. main, or settings)
     * @param callback the function called on success. Only parameter is data loaded
     */
    loadMenu(name:string, callback:Function){
        this.load('menu/' + name + '.json', callback);
    }
}