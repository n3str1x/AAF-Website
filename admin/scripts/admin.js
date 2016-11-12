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
            state: "",
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
            this.server.status = this.details.gq_online;
            this.server.state = this.details.gq_gametype + " – " + this.details.players + " currently playing.";

            if (this.server.gq_online == true) {
                this.status = "green";

            } else {
                this.status = "red";
                this.server.name = "ARMA Offline";
                this.server.state = "No server response";
            }
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
        }
    },
    created: function() {
        var formData = new FormData();
        formData.append('authKey', '4f64MC76YMLsC8rW89QZaMDVTdYZN4C2');

        Vue.http.post("https://scarlet.australianarmedforces.org/api/teamspeak", formData).then((response) => {
            this.details = response.body[Object.keys(response.body)[0]];
            this.server.name = this.details.gq_hostname;
            this.server.status = this.details.gq_online;
            this.server.state = this.details.numplayers + " teamspeak members.";

            if (this.server.status == true) {
                this.status = "green";
            } else {
                this.status = "red";
                this.server.name = "TS Offline";
                this.server.state = "No server response";
            }
        });
    }

});

var discordVue = new Vue({
    el: '.discordVue',
    methods: {
        rally : function() {
            var formData = new FormData();
            formData.append('content', '@everyone Mission Notification. Rally Up.');
            formData.append('username', 'Mission Specialist');

            Vue.http.post("https://discordapp.com/api/webhooks/237049941862645761/gDARL75xEY80FbherWNqyTueBhi8eTqobWZ_0xJv4cOPv8FPvE0ki9_UVjxMewLHg0Hn", formData).then((response) => {
                $('#discordModel').foundation('close');
            });
        }
    }

});

var scarlet = new Vue({
    el: '.scarlet',
    data: {
        status: "orange"
    },
    methods: {

    }

});
