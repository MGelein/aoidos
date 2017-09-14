/**
 * This class will handle the parsing of commands that have been typed into the terminal
 */
class Parser{
    //Any word in this list is automatically removed because it is meaningless
    private static meaningless:string[] = ['a', 'the', 'to', 'on'];

    /**
     * Parses the command that is provided. Immediately acts on that command
     * @param cmd the command string entered
     */
    public static parse(cmd:string){
        //first break it up into words
        var words:string[] = cmd.split(' ');
        //Then trim all words to remove all spaces and convert to lowercase
        for(var i = 0; i < words.length; i++){words[i] = words[i].trim().toLowerCase();}

        //remove words as 'the', 'a', 'to', 'on'
        var tWords:string[] = [];
        for(var i = 0 ; i < words.length; i++){
            //Only add the word if it is not meaningless
            if(Parser.meaningless.indexOf(words[i]) == -1) tWords.push(words[i]);
        }
        //now set the words list back to the cleaned list
        words = tWords;
        
        var actions: Action[][] = [];
        for(var i = 0; i < words.length; i++){
            var found:Action[] = Room.current.findActions(words[i]);
            //Only add it to the action list if it was not a bad word
            if(found.length > 0){
                actions.push(found);
            }
        }
        //now intersect every array
        var temp: Action[];
        for(var i = 1; i < actions.length; i++){
            //If we managed to narrow it down enough
            if(actions[i - 1].length == 1){
                actions[i - 1][0].run();
                break;
            }
            //else filter it some more
            temp = [];
            for(var j = 0; j < actions[i].length; j++){
                if(actions[i - 1].indexOf(actions[i][j]) != -1){
                    temp.push(actions[i][j]);
                }
            }
            actions[i] = temp;
        }
        //run the final filtered action
        //If after filter only one action is left, run it
        if(actions[actions.length - 1].length == 1){
            actions[actions.length - 1][0].run();
        }
    }
}