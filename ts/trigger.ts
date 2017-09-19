declare var aoidos_custom:any;
/**
 * A single trigger of a case defined in an action or topic
 */
class Trigger{

    /**The description of the trigger in string form */
    public stringDesc:string;

    /**
     * Creates a new trigger from its string desription in the JSON file
     * @param trigger the trigger described as a string
     */
    constructor(trigger:string){
        this.stringDesc = trigger;
    }

    /**
     * Called to make this trigger 'trigger'
     */
    trigger(){
        console.log("- Trigger: " + this.stringDesc);

        //The first letter represents the registers
        var register:string = this.stringDesc.substr(0, 1).toUpperCase();
        //the variables for this register
        var variables:string = this.stringDesc.substr(1).replace(/[()]/g, '');

        //switch based on the register
        switch(register){
            case 'S':
                this.playSound(variables);
                break;
            case 'V':
                this.changeVar(variables.split(',')[0].trim(), variables.split(',')[1].trim());
                break;
            case 'Q':
            	this.changeQuest(variables.split(',')[0].trim(), variables.split(',')[1].trim());
                break;
            case 'F':
                this.executeFunction(variables);
                break;
            case 'R':
                this.changeRoom(variables);
                break;
            default:
                console.log("! - Unrecognized Trigger!");
                break;
        }
    }

    /**
     * Loads the room you want to go to
     * @param name the name of the room to load
     */
    changeRoom(name:string){
        Room.load(name);
    }

    /**
     * Tries to execute a function in the custom function file. 
     * @param name the name of the function to execute
     */
    executeFunction(name:string){
        console.log("- - Execute Function: " + name);
        aoidos_custom[name]();
    }

    /**
     * Sets the quest-stage of the provided quest to the provided number
     * @param name the name of the quest to set the stage of
     * @param stage the stage to set the quest to
     */
    changeQuest(name:string, stage:string){ 
        console.log("- - Change quest: " + name + " set to stage: " + stage);
        aoidos.quest.set(name, Number(stage));
    }

    /**
     * Changes the value described by the name
     * @param name the name of the variable to change
     * @param operation    the value to change it to/with
     */
    changeVar(name:string, operation:string){
        console.log("- - Change var: " + name +  " with op: " + operation);
        var firstOpChar:string = operation.substr(0, 1);
        switch(firstOpChar){
            case '+':
                aoidos.var.add(name, Number(operation.substring(1)));
                break;
            case '-':
                aoidos.var.subtract(name, Number(operation.substring(1)));
                break;
            default:
                aoidos.var.set(name, Number(operation));
                break;
        }
    }

    /**
     * Plays the sound in between the brackets
     * @param variables the stuff between the brackets
     */
    playSound(variables:string){
        console.log("- - Playing sound: " + variables);
        aoidos.sound.play(variables);
    }

    /**
     * Reads through the string array of triggers for a specific case
     * and creates trigger objects from them
     * @param data the list of triggers
     */
    public static parseList(data:string[]):Trigger[]{
        var triggers:Trigger[] = [];
        //Create a trigger for each of the strings
        for(var i = 0; i < data.length; i++){
            triggers.push(new Trigger(data[i]));
        }
        return triggers;
    }
}