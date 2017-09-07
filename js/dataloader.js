var DataLoader = (function () {
    function DataLoader(dataFolder) {
        this.dataUrl = dataFolder;
    }
    DataLoader.prototype.load = function (url, callback) {
        $.getJSON(this.dataUrl + url, function (data) {
            callback(data);
        });
    };
    DataLoader.prototype.loadMenu = function (name, callback) {
        this.load('menu/' + name + '.json', callback);
    };
    return DataLoader;
}());
