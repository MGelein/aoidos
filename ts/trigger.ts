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
        var register:string = this.stringDesc.substr(0, 1);
        //the variables for this register
        var variables:string = this.stringDesc.substr(1).replace(/[()]/g, '')

        //switch based on the register
        switch(register){
            case 'S':
                this.playSound(variables);
                break;
            default:
                console.log("! - Unrecognized Trigger!");
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