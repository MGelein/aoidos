class Case{

    /**The lines that are tied to this case. They will be randomly shown */
    public lines:string[];
    /**The conditions that need to be true if you want this case to trigger */
    public conditions:string[];
    /**The triggers that fire in case all of the conditions apply */
    public triggers:string[];
    
    /**
     * Constructs a new Case from the JSON file data
     * @param data the data from the JSON file
     */
    constructor(data:any){
        //Copy the data
        this.lines = data.lines;
        this.conditions = data.conditions;
        this.triggers = data.triggers;
    }

    /**
     * Tests if all the conditions apply
     */
    test(){

    }

    /**
     * Called if all the conditions apply. Prints its lines to the screen and 
     * triggers its triggers
     */
    trigger(){
        
    }

    /**
     * Parse the data from the JSON file that holds the specific cases for the
     * associated action
     * @param data the list of case objects in a JSON file
     */
    public static parseList(data:any[]):Case[]{
        var cases:Case[] = [];
        //Go through all cases one by one
        for(var i = 0; i < data.length; i++){
            cases.push(new Case(data[i]));
        }
        return cases;
    }
}