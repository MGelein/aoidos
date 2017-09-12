var Parser = (function () {
    function Parser() {
    }
    Parser.parse = function (cmd) {
        var words = cmd.split(' ');
        for (var i = 0; i < words.length; i++) {
            words[i] = words[i].trim().toLowerCase();
        }
        var tWords = [];
        for (var i = 0; i < words.length; i++) {
            if (Parser.meaningless.indexOf(words[i]) == -1)
                tWords.push(words[i]);
        }
        words = tWords;
        var actions = Room.current.findActions(words[0]);
        if (actions.length == 1) {
            actions[0].run();
        }
    };
    Parser.meaningless = ['a', 'the', 'to', 'on'];
    return Parser;
}());
