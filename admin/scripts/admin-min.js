"use strict";var scarlet=new Vue({el:".scarlet",data:{players:""},created:function e(){var a=this,s=new FormData;s.append("authKey","4f64MC76YMLsC8rW89QZaMDVTdYZN4C2"),Vue.http.post("https://scarlet.australianarmedforces.org/api/user/info/*",s).then(function(e){a.players=e.body,console.log(a.players)})}}),armaServer=new Vue({el:".armaServer",data:{status:"orange",server:{name:"",state:"",status:"",numplayers:""},loading:!0},mounted:function e(){var a=this,s=new FormData;s.append("authKey","4f64MC76YMLsC8rW89QZaMDVTdYZN4C2"),Vue.http.post("https://scarlet.australianarmedforces.org/api/armaserver",s).then(function(e){a.details=e.body[Object.keys(e.body)[0]],a.server.name=a.details.gq_hostname,a.server.numplayers=a.details.num_players,a.server.status=a.details.gq_online,a.server.state=a.details.gq_gametype+" – "+a.server.numplayers+" currently playing.",1==a.details.gq_online?a.status="green":(a.status="red",a.server.name="ARMA Offline",a.server.state="No server response"),a.loading=!1})}}),teamspeakServer=new Vue({el:".teamspeakServer",data:{server:{name:"",state:"",status:""},loading:!0},mounted:function e(){var a=this,s=new FormData;s.append("authKey","4f64MC76YMLsC8rW89QZaMDVTdYZN4C2"),Vue.http.post("https://scarlet.australianarmedforces.org/api/teamspeak",s).then(function(e){a.details=e.body[Object.keys(e.body)[0]],a.server.name=a.details.gq_hostname,a.server.status=a.details.gq_online,a.server.state=a.details.numplayers+" teamspeak members.",1==a.server.status?a.status="green":(a.status="red",a.server.name="TS Offline",a.server.state="No server response"),a.loading=!1})}}),discordVue=new Vue({el:".discordVue",methods:{rally:function e(){var a=new FormData;a.append("content","Mission Notification. Rally Up."),a.append("username","Mission Specialist"),Vue.http.post("https://discordapp.com/api/webhooks/237049941862645761/gDARL75xEY80FbherWNqyTueBhi8eTqobWZ_0xJv4cOPv8FPvE0ki9_UVjxMewLHg0Hn",a).then(function(e){$("#discordModel").foundation("close")})}}});