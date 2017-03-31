'use strict';

var scarlet = new Vue({
    el: '.scarlet',
    data: {
        players: ""
    },
    created: function created() {
        var _this = this;

        var formData = new FormData();
        formData.append('authKey', '4f64MC76YMLsC8rW89QZaMDVTdYZN4C2');

        Vue.http.post("https://scarlet.australianarmedforces.org/api/user/info/*", formData).then(function(response) {
            _this.players = response.body;
			console.log(_this.players);

        });
    }

});

var armaServer = new Vue({
    el: '.armaServer',
    data: {
        status: "orange",
        server: {
            name: "",
            state: "",
            status: "",
            numplayers: ""
        },
        loading: true
    },
    mounted: function created() {
        var _this = this;

        var formData = new FormData();
        formData.append('authKey', '4f64MC76YMLsC8rW89QZaMDVTdYZN4C2');

        Vue.http.post("https://scarlet.australianarmedforces.org/api/armaserver", formData).then(function(response) {
            _this.details = response.body[Object.keys(response.body)[0]];
			// console.log(_this.details);
            _this.server.name = _this.details.gq_hostname;
            _this.server.numplayers = _this.details.num_players;
            _this.server.status = _this.details.gq_online;
            _this.server.state = _this.details.gq_gametype + " – " + _this.server.numplayers + " currently playing.";

            if (_this.details.gq_online == true) {
                _this.status = "green";
            } else {
                _this.status = "red";
                _this.server.name = "ARMA Offline";
                _this.server.state = "No server response";
            }
            _this.loading = false;
        });
    }

});

var teamspeakServer = new Vue({
    el: '.teamspeakServer',
    data: {
        server: {
            name: "",
            state: "",
            status: ""
        },
        loading: true
    },
    mounted: function created() {
        var _this = this;

        var formData = new FormData();
        formData.append('authKey', '4f64MC76YMLsC8rW89QZaMDVTdYZN4C2');

        Vue.http.post("https://scarlet.australianarmedforces.org/api/teamspeak", formData).then(function(response) {

            _this.details = response.body[Object.keys(response.body)[0]];
            _this.server.name = _this.details.gq_hostname;
            _this.server.status = _this.details.gq_online;
            _this.server.state = _this.details.numplayers + " teamspeak members.";

            if (_this.server.status == true) {
                _this.status = "green";
            } else {
                _this.status = "red";
                _this.server.name = "TS Offline";
                _this.server.state = "No server response";
            }
            _this.loading = false;
        });
    }

});

var discordVue = new Vue({
    el: '.discordVue',
    methods: {
        rally: function rally() {
            var formData = new FormData();
            formData.append('content', 'Mission Notification. Rally Up.');
            formData.append('username', 'Mission Specialist');

            Vue.http.post("https://discordapp.com/api/webhooks/237049941862645761/gDARL75xEY80FbherWNqyTueBhi8eTqobWZ_0xJv4cOPv8FPvE0ki9_UVjxMewLHg0Hn", formData).then(function(response) {
                $('#discordModel').foundation('close');
            });
        }
    }

});
