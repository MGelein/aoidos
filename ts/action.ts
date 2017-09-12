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