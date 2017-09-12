/**
 * Terminal object is used for text ouput and user input. It 
 * doesn't (shouldn't) parse information, it just captures it
 * and notifies the proper authorities
 */
class Terminal{

    /**Holds all the lines of the terminal */
    private lineHolder:JQuery<HTMLElement>;
    /**Holds a reference to the current line we're working on*/
    private currentLine:JQuery<HTMLElement>;
    /**Holds a reference to the span the user is typing in */
    private userInput:JQuery<HTMLElement>;
    /**Last 50 commands entered */
    public history:string[] = [""];
    /**Where in the history we're scrolling */
    private cmdPointer:number = 0;

    /**
     * Creates a new Terminal instance. Should be the only one.
     */
    constructor(){
        //grab a reference to the lines object.
        this.lineHolder = $('#lines');
        //clear the screen
        this.cls();
    }

    /**
     * Clears the screen of any output. Basically empties the lineHolder element.
     * Creates a new empty line at the top of the terminal.
     * 
     * Optionally provide the currentLine JQuery selection to reappend that back 
     * to the screen to remove everything but the current line
     */
    cls(currentLine?:JQuery<HTMLElement>):void{
        //remove everything in the lines object
        this.lineHolder.contents().remove();
        //Create a new empty line
        this.newLine();
    }

    /**
     * Outputs the provided string to the terminal on the current line.
     * Will ignore any newlines or carriage returns
     * @param s the output to display
     */
    print(s:string):void{   
         //adds the provided string at the end of the currentLine
        this.currentLine.append(s.replace(/[\r\n]/g,''));
        //Now set the cursor at the end of the text
        this.currentLine.append(this.userInput);
    }

    /**
     * Will output the provided string to the current line and 
     * create a new empty line.
     * @param s the output to display
     */
    println(s:string){
        this.print(s);
        this.newLine();
    }

    /**
     * Will output the provided multiline string into separate lines
     * delimited by the \n character.
     * @param s the multiline output to display
     */
    printlns(s:string){
        //check if there is a line reference in the string (for example: [mainmenu])
        s = s.replace(/\[(.+?)\]/g, function($0, $1):string {
            return Room.current.lines.get($1);
        });
        var lines:string[] = s.split('\n');
        for(var line of lines){
            this.println(line);
        }
    }

    /**
     * Called when the enter/return key is pressed. Adds this command to the
     * command history
     */
    private commandTyped(){
        //read in the command
        var command = this.userInput.text().trim();
        //now enter a new line
        this.newLine();
        //Parse the command
        Parser.parse(command);

        //Add it to the history if it is not identical to the last command
        if(this.history[0] !== command) this.history.splice(1, 0, command);
        //Keep at max last 50 commands in memory
        if(this.history.length > 50) this.history.pop();
    }

    /**
     * Enters the command in the history at the position of cmdPointer
     * into the userinput
     */
    private cycleHistory(direction:string){
        //Increase/decrease the pointer based on the direction we're traversing cmdHistory
        this.cmdPointer += (direction.startsWith('D') ? -1: 1);
        //Keep it within a legal range
        if(this.cmdPointer < 0 || this.cmdPointer >= this.history.length){
            this.cmdPointer = 0;
        }
        //Set the input based on the history and its pointer
        this.userInput.html(this.history[this.cmdPointer]);
    }

    /**
     * Returns a new line div JQuery reference and sets the currentline variable 
     */
    private newLine(){ 
        //Remove any previous instance of the currentLine. Append a space to prevent empty lines from collapsing
        $('.currentLine').removeClass('currentLine').append('&nbsp;');
        this.lineHolder.append('<div class="currentLine line"></div>');
        this.currentLine = $('.currentLine');
        //Add the current line marker, remove the old ones
        $('.lineMarker').fadeOut(400, function(){$(this).remove();});
        this.currentLine.prepend('<div class="lineMarker">&gt;</div>');
        //Now append the userinput span, first remove the old one
        $('.userinput').removeAttr('contenteditable').removeClass('current').unbind('keydown');
        this.currentLine.append('<div spellcheck="false" contenteditable="true" class="userinput current"></div>');
        this.userInput = $('.userinput.current');
        //Focus on the user input
        this.userInput.click();
        setTimeout(function(){aoidos.terminal.userInput.focus();}, 50);

        //When you click the current line, you focus on the userinput
        this.currentLine.click(function(){
            setTimeout(function(){aoidos.terminal.userInput.focus();}, 50);
        });

        //Shows the last line entered
        this.currentLine.get(0).scrollIntoView(false);
        this.cmdPointer = 0;

        //If there are more than 50 lines, remove the oldest line
        if($('.line').length > 50) $('.line').first().remove();

        //Registers the keydown for the current user input
        this.userInput.keydown(function(event){
            switch(event.keyCode){
                case 13:
                    aoidos.terminal.commandTyped();
                    break;
                case 27:
                    aoidos.terminal.userInput.html('');
                    break;
                case 38:
                    aoidos.terminal.cycleHistory("UP");
                    break;
                case 40:
                    aoidos.terminal.cycleHistory("DOWN");
                    break;
            }
        });
    }
}