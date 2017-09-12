var Terminal = (function () {
    function Terminal() {
        this.history = [""];
        this.cmdPointer = 0;
        this.lineHolder = $('#lines');
        this.cls();
    }
    Terminal.prototype.cls = function (currentLine) {
        this.lineHolder.contents().remove();
        this.newLine();
    };
    Terminal.prototype.print = function (s) {
        this.currentLine.append(s.replace(/[\r\n]/g, ''));
        this.currentLine.append(this.userInput);
    };
    Terminal.prototype.println = function (s) {
        this.print(s);
        this.newLine();
    };
    Terminal.prototype.printlns = function (s) {
        s = s.replace(/\[(.+?)\]/g, function ($0, $1) {
            return Room.current.lines.get($1);
        });
        var lines = s.split('\n');
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            this.println(line);
        }
    };
    Terminal.prototype.commandTyped = function () {
        var command = this.userInput.text().trim();
        this.newLine();
        Parser.parse(command);
        if (this.history[0] !== command)
            this.history.splice(1, 0, command);
        if (this.history.length > 50)
            this.history.pop();
    };
    Terminal.prototype.cycleHistory = function (direction) {
        this.cmdPointer += (direction.startsWith('D') ? -1 : 1);
        if (this.cmdPointer < 0 || this.cmdPointer >= this.history.length) {
            this.cmdPointer = 0;
        }
        this.userInput.html(this.history[this.cmdPointer]);
    };
    Terminal.prototype.newLine = function () {
        $('.currentLine').removeClass('currentLine').append('&nbsp;');
        this.lineHolder.append('<div class="currentLine line"></div>');
        this.currentLine = $('.currentLine');
        $('.lineMarker').fadeOut(400, function () { $(this).remove(); });
        this.currentLine.prepend('<div class="lineMarker">&gt;</div>');
        $('.userinput').removeAttr('contenteditable').removeClass('current').unbind('keydown');
        this.currentLine.append('<div spellcheck="false" contenteditable="true" class="userinput current"></div>');
        this.userInput = $('.userinput.current');
        this.userInput.click();
        setTimeout(function () { aoidos.terminal.userInput.focus(); }, 50);
        this.currentLine.click(function () {
            setTimeout(function () { aoidos.terminal.userInput.focus(); }, 50);
        });
        this.currentLine.get(0).scrollIntoView(false);
        this.cmdPointer = 0;
        if ($('.line').length > 50)
            $('.line').first().remove();
        this.userInput.keydown(function (event) {
            switch (event.keyCode) {
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
    };
    return Terminal;
}());
