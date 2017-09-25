var Config = (function () {
    function Config() {
    }
    Config.apiUrl = "https://shopping-rest.herokuapp.com/";
    // Config.apiUrl = "http://192.168.1.109:3001/";
    Config.token = "";
    Config.userEmail = "";
    Config.userId = "";
    return Config;
}());

exports.Config = Config;