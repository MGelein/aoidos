/**
 * A condition of a case. 
 */
class Condition{

    /**The condition in its string form used in the JSON format */
    public stringDesc:string;

    /**
     * Parses the string description of the condition and turns
     * it into a testable condition
     * @param condition the condition described as a string
     */
    constructor(condition:string){
        this.stringDesc = condition;
    }

    /**
     * Tests if this condition is met
     */
    test():boolean{
        return true;
    }

    /**
     * Reads through the list of string conditions and parses them
     * into actual testable conditions. Puts them all into an array and
     * returns them.
     * @param data the array of string conditions
     */
    public static parseList(data:string[]):Condition[]{
        var conditions:Condition[] = [];
        for(var i = 0; i < data.length; i++){
            conditions.push(new Condition(data[i]));
        }
        return conditions;
    }
}