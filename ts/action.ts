/**
 * This class takes care of an action and the delegation to the
 * right case of an object
 */
class Action{

    /**The id of this action */
    public id:string;
    /**The aliases of this action */
    public alias:string[];
    /**The cases for this action. */
    public cases:Case[];


    /**
     * Parses the data of a single action in the JSON object and 
     * populates this action with it
     * @param data the data of a single action from the JSON object
     */
    constructor(data:any){
        this.id = data.id;
        this.alias = data.alias;
        this.cases = Case.parseList(data.cases);
    }

    /**
     * Tests to see if this action or its aliases match againts the
     * provided command that was entered
     * @param act the string to test against
     */
    matches(act:string):boolean{
        //If the command equals the id of this action
        if(this.id == act) return true;
        //If the command equals any of the aliases of this action
        if(this.alias.indexOf(act) != -1) return true;
        //No matches, return false
        return false;
    }

    /**
     * Looks through all the cases and finds the first one to fire
     */
    run(){
        for(var i = 0; i < this.cases.length; i++){
            if(this.cases[i].test()){
                //we found a matching case. Trigger it and stop looking`
                console.log("Run Action: " + this.id);
                this.cases[i].trigger();
                return;
            }
        }
    }

    /**
     * Returns a list of actions based on the JSON file
     * @param data the data from the JSON file
     */
    public static parseList(data:any[]):Action[]{
        var actions:Action[] = [];
        //Parses the actions one by one
        for(var i = 0; i < data.length; i++){
            actions.push(new Action(data[i]));
        }
        return actions;
    }
}