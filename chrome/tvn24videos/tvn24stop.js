var tvn24stop=1;
var player=null;

function __inject()
{
    function checkVideos()
    {
        $('.videoPlayer').each(function () {
            var elem = $(this).parent();
            var parent = elem.parent();
            if (parent.find('.tvn24videos_button').length!=0)
            {
                return;
            };
            
            // disable annoying autoplay
            elem.find('video').each(function() {
                    var e=$(this);
                    e.attr('autoplay', false);
            });

            // insert buttons
            var div = $("<div/>");
            elem.after(div);

            var html = $("<input class='tvn24videos_button' value='play' type='button'/>");
            div.append(html);
            html.click(function () {
                var _elem = $(this).parent().parent();
                var p = _elem.find('.videoPlayer').find('.video-js');
                if (!p) return;
                var id=p.attr('id');
                if (!id) return;
                    
                var player = vjs.players[id];
                if (!player) return;
                
                player.play();
            });          
            
            var html = $("<input class='tvn24videos_button' value='skip ad' type='button'/>");
            div.append(html);
            html.click(function () {
                var _elem = $(this).parent().parent();
                var p = _elem.find('.videoPlayer').find('.video-js');
                if (!p) return;
                
                var id=p.attr('id');
                if (!id) return;
                
                var player = vjs.players[id];
                if (!player) return;
                
                var temp = player.ads.endLinearAdMode;
                if ((!temp) || (!player.hasStarted())) return;
                    
                console.log("Fireup ad end", id);
                player.ads.endLinearAdMode();
                // don't know why this method is wiped out after use - restore it
                player.ads.endLinearAdMode = temp;            
            });

        });
    };
    
    function tvn24videos () {
        var players=vjs.players;
        var keys=Object.keys(players);    
    
        for(var k=0, l=keys.length; k<l; k++) {
            var player = players[keys[k]]; 
            
            if (player.hasStarted() && player.ads.endLinearAdMode) {
                var temp = player.ads.endLinearAdMode;
                player.ads.endLinearAdMode();
                // don't know why this method is wiped out after use - restore it
                player.ads.endLinearAdMode = temp;
                // player.play();
            };
        };
    };
    
    checkVideos();
    
    setInterval(checkVideos, 1000);    
};

function tvn24videosInit() {
    console.log("tvn24-STOP init");
    
    var script = document.createElement('script');
    script.textContent = '(' + __inject + ')();';
    (document.head||document.documentElement).appendChild(script);
    // script.parentNode.removeChild(script);
};

tvn24videosInit();
