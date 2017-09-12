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
    }
}