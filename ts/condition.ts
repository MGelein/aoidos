declare var aoidos_custom:any;
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
        //empty condition evaluates to true
        if(this.stringDesc == undefined || this.stringDesc.length < 1) return true;
        //else switch based on condition type
        var firstLetter:string = this.stringDesc.substr(0, 1).toUpperCase();
        var variables:string = this.stringDesc.substring(1).replace(/[()]/g, '');
        switch(firstLetter){
            case 'Q':
                return this.testQuest(variables.split(',')[0].trim(), variables.split(',')[1].trim());
            case 'V':
                return this.testVariable(variables.split(',')[0].trim(), variables.split(',')[1].trim());
            case 'F':
                return this.testFunction(variables);
            case 'R':
                return this.testRoom(variables);
            default:
                //if it is an unknown type, evaluate it false
                console.log("Did not recognize condition register '" + firstLetter + "'");
                return false;
        }
    }

    /**
     * Tests if we are in teh current room
     * @param name the room name to test for
     */
    testRoom(name:string){
        return Room.current.id === name;
    }

    /**
     * Calls a function defined in the custom function file that 
     * will return a boolean upon completion indicating whether this 
     * case failed or succeeded.
     * @param name the function to call
     */
    testFunction(name:string):boolean{
        return (aoidos_custom[name]() === true);
    }

    /**
     * Tests if a quest is at the given stage. Only exact comparison. i.e.: equals
     * @param name the name of the quest
     * @param stage the stage it should be at
     */
    testQuest(name:string, stage:string){
        return aoidos.quest.equals(name, Number(stage));
    }

    /**
     * Parses the command and tests if it is true
     */
    testVariable(name:string, value:string){
        //Grab the first char of the value, if it is > or < we must parse it separately
        var opChar:string = value.substring(0, 1);
        switch(opChar){
            case '>':
                return aoidos.var.greaterThan(name, Number(value.substring(1)));
            case '<':
                return aoidos.var.smallerThan(name, Number(value.substring(1)));
            default:
                return aoidos.var.equals(name, Number(value));
        }
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