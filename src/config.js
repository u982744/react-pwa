import localforage from "localforage";

var Config = (function () {
    function Config() {
    }
    Config.apiUrl = "https://shopping-rest.herokuapp.com/";
    // Config.apiUrl = "http://192.168.1.109:3001/";
    Config.token = "";
    Config.userEmail = "";
    Config.userId = "";
    Config.loggedIn = false;
    Config.getStored = () => {
        let conf = {};
        return localforage.getItem('token')
            .then(value => {
                conf.token = value;
                return localforage.getItem('userEmail');
            })
            .then(value => {
                conf.userEmail = value;
                return localforage.getItem('userId');
            })
            .then(value => {
                conf.userId = value;
                return localforage.getItem('loggedIn');
            })
            .then(value => {
                conf.loggedIn = value;
                return conf;
            })
    };
    Config.update = (newConf) => {
        Config.token = newConf.token;
        Config.userEmail = newConf.userEmail;
        Config.userId = newConf.userId;
        Config.loggedIn = newConf.loggedIn;
    };
    return Config;
}());

export {Config};