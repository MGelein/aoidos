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
        var actions = [];
        for (var i = 0; i < words.length; i++) {
            var found = Room.current.findActions(words[i]);
            if (found.length > 0) {
                actions.push(found);
            }
        }
        var temp;
        for (var i = 1; i < actions.length; i++) {
            if (actions[i - 1].length == 1) {
                actions[i - 1][0].run();
                break;
            }
            temp = [];
            for (var j = 0; j < actions[i].length; j++) {
                if (actions[i - 1].indexOf(actions[i][j]) != -1) {
                    temp.push(actions[i][j]);
                }
            }
            actions[i] = temp;
        }
        if (actions[actions.length - 1].length == 1) {
            actions[actions.length - 1][0].run();
        }
    };
    Parser.meaningless = ['a', 'the', 'to', 'on'];
    return Parser;
}());
