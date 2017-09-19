class Case{

    /**The lines that are tied to this case. They will be randomly shown */
    public lines:string[];
    /**The conditions that need to be true if you want this case to trigger */
    public conditions:Condition[];
    /**The triggers that fire in case all of the conditions apply */
    public triggers:Trigger[];
    
    /**
     * Constructs a new Case from the JSON file data
     * @param data the data from the JSON file
     */
    constructor(data:any){
        //Copy the data
        this.lines = data.lines;
        this.conditions = Condition.parseList(data.conditions);
        this.triggers = Trigger.parseList(data.triggers);
    }

    /**
     * Tests if all the conditions apply
     */
    test(){
        if(this.conditions.length > 0){
            for(var i = 0; i < this.conditions.length; i++){
                //If a condition is not met, immediately abort!
                if(!this.conditions[i].test()) return false;
            }
        }
        //If there are no conditions, or they all returned true
        //It means we have met all conditions, so this case is true
        return true;
    }

    /**
     * Called if all the conditions apply. Prints its lines to the screen and 
     * triggers its triggers
     */
    trigger(){
        //output one of the random lines (or the only one if there is only one)
        aoidos.terminal.printlns(this.lines[Math.floor(Math.random()*this.lines.length)]);
        //trigger all triggers
        for(var i = 0; i < this.triggers.length; i++){
            this.triggers[i].trigger();
        }
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