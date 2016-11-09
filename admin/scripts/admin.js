var scarlet = new Vue({
    el: '.scarlet',
    data: {
        details: ""
    },
    created: function() {
        var formData = new FormData();
        formData.append('authKey', '4f64MC76YMLsC8rW89QZaMDVTdYZN4C2');

        Vue.http.post("https://scarlet.australianarmedforces.org/api/user/info/*", formData).then((response) => {
            this.details = response.body;
        });
    }

})

var armaServer = new Vue({
    el: '.armaServer',
    data: {
        status: "orange",
        server: {
            name: "",
            players: "",
            gameType: "",
            status: "",
            numplayers: ""
        }
    },
    created: function() {
        var formData = new FormData();
        formData.append('authKey', '4f64MC76YMLsC8rW89QZaMDVTdYZN4C2');

        Vue.http.post("https://scarlet.australianarmedforces.org/api/armaserver", formData).then((response) => {
            this.details = response.body[Object.keys(response.body)[0]];
            this.server.name = this.details.gq_hostname;
            this.server.numplayers = this.details.num_players;
            this.server.mission = this.details.gq_gametype;
            this.server.status = this.details.gq_online;
            this.server.players = this.details.players;

            if (this.server.status == true) {
                this.status = "green";
            } else {
                this.status = "red";
            }
        });
    }

});

var teamspeakServer = new Vue({
    el: '.teamspeakServer',
    data: {
        server: {
            name: "",
            players: ""
        }
    },
    created: function() {
        var formData = new FormData();
        formData.append('authKey', '4f64MC76YMLsC8rW89QZaMDVTdYZN4C2');

        Vue.http.post("https://scarlet.australianarmedforces.org/api/teamspeak", formData).then((response) => {
            this.details = response.body[Object.keys(response.body)[0]];
            this.server.name = this.details.gq_hostname;
            this.server.players = this.details.numplayers;
            this.server.mission = this.details.gq_gametype;
            this.server.status = this.details.gq_online;

            if (this.server.status === true) {
                this.status = "green";
            } else {
                this.status = "red";
            }
        });
    }

});


var discord = new Vue({
    el: '.discord',
    methods: {
        rally : function() {
            var formData = new FormData();
            formData.append('content', '@everyone Mission Notification. Rally Up.');
            formData.append('username', 'Mission Specialist');

            Vue.http.post("https://discordapp.com/api/webhooks/237049941862645761/gDARL75xEY80FbherWNqyTueBhi8eTqobWZ_0xJv4cOPv8FPvE0ki9_UVjxMewLHg0Hn", formData);
        }
    }

});

var scarlet = new Vue({
    el: '.scarlet',
    data: {
        status: "orange"
    },
    methods: {
        rally : function() {
            var formData = new FormData();
            formData.append('content', '@everyone Mission Notification. Rally Up.');
            formData.append('username', 'Mission Specialist');

            Vue.http.post("https://discordapp.com/api/webhooks/237049941862645761/gDARL75xEY80FbherWNqyTueBhi8eTqobWZ_0xJv4cOPv8FPvE0ki9_UVjxMewLHg0Hn", formData).then((response) => {
                this.posted = true;
            });
        }
    }

});
