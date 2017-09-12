var Action = (function () {
    function Action(data) {
        this.id = data.id;
        this.alias = data.alias;
        this.cases = Case.parseList(data.cases);
    }
    Action.prototype.matches = function (act) {
        if (this.id == act)
            return true;
        if (this.alias.indexOf(act) != -1)
            return true;
        return false;
    };
    Action.prototype.run = function () {
        for (var i = 0; i < this.cases.length; i++) {
            if (this.cases[i].test()) {
                console.log("Run Action: " + this.id);
                this.cases[i].trigger();
                return;
            }
        }
    };
    Action.parseList = function (data) {
        var actions = [];
        for (var i = 0; i < data.length; i++) {
            actions.push(new Action(data[i]));
        }
        return actions;
    };
    return Action;
}());
;var aoidos;
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
    aoidos = new Aoidos('Mees Gelein', '1.0.0');
    aoidos.init();
});
var Aoidos = (function () {
    function Aoidos(author, version) {
        this.author = author;
        this.version = version;
        this.terminal = new Terminal();
        this.loader = new DataLoader("data/");
    }
    Aoidos.prototype.init = function () {
        Room.load('mainmenu');
    };
    return Aoidos;
}());
;var Case = (function () {
    function Case(data) {
        this.lines = data.lines;
        this.conditions = Condition.parseList(data.conditions);
        this.triggers = Trigger.parseList(data.triggers);
    }
    Case.prototype.test = function () {
        if (this.conditions.length > 0) {
            for (var i = 0; i < this.conditions.length; i++) {
                if (!this.conditions[i].test())
                    return false;
            }
        }
        return true;
    };
    Case.prototype.trigger = function () {
        for (var i = 0; i < this.triggers.length; i++) {
            this.triggers[i].trigger();
        }
        aoidos.terminal.printlns(this.lines[Math.floor(Math.random() * this.lines.length)]);
    };
    Case.parseList = function (data) {
        var cases = [];
        for (var i = 0; i < data.length; i++) {
            cases.push(new Case(data[i]));
        }
        return cases;
    };
    return Case;
}());
;var Condition = (function () {
    function Condition(condition) {
        this.stringDesc = condition;
    }
    Condition.prototype.test = function () {
        return true;
    };
    Condition.parseList = function (data) {
        var conditions = [];
        for (var i = 0; i < data.length; i++) {
            conditions.push(new Condition(data[i]));
        }
        return conditions;
    };
    return Condition;
}());
;var DataLoader = (function () {
    function DataLoader(dataFolder) {
        this.dataUrl = dataFolder;
    }
    DataLoader.prototype.load = function (url, callback) {
        $.getJSON(this.dataUrl + url, function (data) {
            callback(data);
        });
    };
    DataLoader.prototype.loadRoomData = function (id, room) {
        this.load('rooms/' + id + '/room.json', function (data) {
            room.parseData(data);
        });
    };
    DataLoader.prototype.loadObjectData = function (id, obj) {
        this.load(Room.current.getObjPath(id), function (data) {
            obj.parseData(data);
        });
    };
    return DataLoader;
}());
;;var Lines = (function () {
    function Lines(data) {
        this.lines = data;
    }
    Lines.prototype.get = function (id) {
        return this.lines[id].join('\n');
    };
    return Lines;
}());
;var Obj = (function () {
    function Obj(id) {
        this.name = this.description = '';
        this.alias = [];
        this.actions = [];
        this.id = id;
    }
    Obj.prototype.findAction = function (act) {
        var actions = [];
        if (this.id == act)
            return this.actions;
        if (this.alias.indexOf(act) != -1)
            return this.actions;
        for (var i = 0; i < this.actions.length; i++) {
            if (this.actions[i].matches(act))
                actions.push(this.actions[i]);
        }
        return actions;
    };
    Obj.prototype.parseData = function (data) {
        this.name = data.name;
        this.alias = data.alias;
        this.actions = Action.parseList(data.actions);
    };
    Obj.load = function (s) {
        var objects = [];
        var objDefs = s.split(',');
        for (var i = 0; i < objDefs.length; i++) {
            var id = objDefs[i].trim();
            var obj = new Obj(id);
            aoidos.loader.loadObjectData(id, obj);
            objects.push(obj);
        }
        return objects;
    };
    Obj.loaded = [];
    return Obj;
}());
;var Parser = (function () {
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
            actions.push(Room.current.findActions(words[i]));
        }
        var temp;
        for (var i = 1; i < actions.length; i++) {
            if (actions[i - 1].length == 1) {
                actions[i - 1][0].run();
                break;
            }
            temp = [];
            if (actions[i].length == 0) {
                actions[i] = actions[i - 1];
            }
            else {
                for (var j = 0; j < actions[i].length; j++) {
                    if (actions[i - 1].indexOf(actions[i][j]) != -1) {
                        temp.push(actions[i][j]);
                    }
                }
                actions[i] = temp;
            }
        }
        if (actions[actions.length - 1].length == 1) {
            actions[actions.length - 1][0].run();
        }
    };
    Parser.meaningless = ['a', 'the', 'to', 'on'];
    return Parser;
}());
;var Room = (function () {
    function Room(id) {
        if (Room.current == undefined)
            Room.current = this;
        this.name = this.description = this.inspectText = "";
        this.soundUrls = [];
        this.firstVisit = true;
        this.id = id;
    }
    Room.prototype.enter = function () {
        Room.current.unload();
        Room.current = this;
        if (this.firstVisit) {
            this.printInspect();
            this.firstVisit = false;
        }
        else {
            this.printDescription();
        }
    };
    Room.prototype.printInspect = function () {
        if (this.inspectText && this.inspectText.length > 0) {
            aoidos.terminal.printlns(this.inspectText);
        }
        else {
            aoidos.terminal.printlns(this.description);
        }
    };
    Room.prototype.printDescription = function () {
        if (this.description && this.description.length > 0) {
            aoidos.terminal.printlns(this.description);
        }
        else {
            aoidos.terminal.printlns(this.inspectText);
        }
    };
    Room.prototype.parseData = function (data) {
        this.name = data.name;
        this.soundUrls = data.sound;
        this.description = data.description;
        this.inspectText = data.inspect;
        this.objects = Obj.load(data.objects);
        var self = this;
        aoidos.loader.load('rooms/' + this.id + '/lines.json', function (data) {
            self.lines = new Lines(data);
            self.enter();
        });
        Room.loaded.push(this);
    };
    Room.prototype.findActions = function (act) {
        var actions = [];
        for (var i = 0; i < this.objects.length; i++) {
            var matches = this.objects[i].findAction(act);
            if (matches !== undefined) {
                actions = actions.concat(matches);
            }
        }
        return actions;
    };
    Room.prototype.unload = function () {
        aoidos.terminal.cls();
    };
    Room.prototype.getObjPath = function (id) {
        return this.getPath() + 'objects/' + id + '.json';
    };
    Room.prototype.getNPCPath = function (id) {
        return this.getPath() + 'npcs/' + id + '.json';
    };
    Room.prototype.getPath = function () {
        return 'rooms/' + this.id + '/';
    };
    Room.isLoaded = function (id) {
        for (var i = 0; i < Room.loaded.length; i++) {
            if (Room.loaded[i].id == id)
                return i;
        }
        return -1;
    };
    Room.load = function (id) {
        var index = Room.isLoaded(id);
        if (index != -1) {
            Room.loaded[index].enter();
        }
        else {
            aoidos.loader.loadRoomData(id, new Room(id));
        }
    };
    Room.loaded = [];
    return Room;
}());
;var Terminal = (function () {
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
;var Trigger = (function () {
    function Trigger(trigger) {
        this.stringDesc = trigger;
    }
    Trigger.prototype.trigger = function () {
        console.log("- Trigger: " + this.stringDesc);
    };
    Trigger.parseList = function (data) {
        var triggers = [];
        for (var i = 0; i < data.length; i++) {
            triggers.push(new Trigger(data[i]));
        }
        return triggers;
    };
    return Trigger;
}());
