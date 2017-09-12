/**
 * Holds the JSON data of all the lines for a specific room.
 */
class Lines{
    /**JSON object that holds the lines by identifier */
    private lines:any;

    /**
     * Creates a new lines object
     * @param data 
     */
    constructor(data){
        this.lines = data;
    }

    /**
     * Returns the line for the specified id. It finds
     * the JSON string array and joins them on newlines
     * @param id the id of the line you want
     */
    get(id:string):string{
        return this.lines[id].join('\n');
    }
}