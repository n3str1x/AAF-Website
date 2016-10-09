$.getJSON("https://scarlet.australianarmedforces.org/api/armaserver", function(data) {
    serverInfo = data;
    if(serverInfo["58.162.184.102:2302"].gq_online == true) {
        if(serverInfo["58.162.184.102:2302"].gq_numplayers != 0) {
            for (var i = 0, len = serverInfo["58.162.184.102:2302"].players.length; i < len; i++) {
              $(".arma3list .list").append('<li><img src="/divisions/images/icons/regular.png" alt="">' + serverInfo["58.162.184.102:2302"].players[i].name + "</li>");
            }
            $(".arma3list").css("display", "block");
        }
    }
});
