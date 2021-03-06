class Obj implements ActionSearchable{
    /**All objects that have been loaded */
    public static loaded:Obj[] = [];

    /**The name of this object. For example 'Door' */
    private name:string;
    /**The id of the object */
    private id:string;
    /**All possible aliases for the object */
    private alias:string[];
    /**The description of this object triggered on inspect */
    private description:string;
    /**List of all actions associated with this object */
    public actions:Action[];

    /**
     * Constructor just instantiates an empty object.
     * You can then populate its data using the parseData
     * function.
     * @param id 
     */
    constructor(id:string){
        //initialize all variables to be empty;
        this.name = this.description = '';
        this.alias = [];
        this.actions = [];
        //set id to match the given ID
        this.id = id;
    }

    /**
     * Test to see if this object has a action or alias that matches
     * the provided parameter
     * @param act the topic or action to test against
     */
    findAction(act:string):Action[]{
        var actions:Action[] = [];
        //If the name or the alias is similar to the command, return all our actions
        if(this.id == act) return this.actions;
        if(this.alias.indexOf(act) != -1) return this.actions;

        //Else, at least check the actions of this object
        for(var i = 0; i < this.actions.length; i++){
            //If we found a matching object
            if(this.actions[i].matches(act)) actions.push(this.actions[i]);
        }
        //Return the matching actions:
        return actions;
    }

    /**
     * Populates this object with the data obtained from the file
     * @param data the data read from file
     */
    parseData(data:any){
        //Copy the data from the JSON object
        this.name = data.name;
        this.alias = data.alias;
        this.actions = Action.parseList(data.actions);
    }

    /**
     * Loads all the objects used for this room. 
     * @param s the list of objects to load for this room
     */
    public static load(s:string):Obj[]{
        if(s == undefined || s.length < 1) return [];
        var objects:Obj[] = [];
        //split the def by comma
        var objDefs:string[] = s.split(',');
        //Now load each of the objects assigned by the object def
        for(var i = 0; i < objDefs.length; i++){
            var id = objDefs[i].trim();
            var obj = new Obj(id);
            aoidos.loader.loadObjectData(id, obj);
            //add the object that will soon hold the parsed data in the objects array
            objects.push(obj);
        }
        //return the list of loaded objects
        return objects;
    }

}