
function __inject()
{
    var ____play = {};
    
    function checkVideos()
    {
        var keys=Object.keys(vjs.players);
        for (i=0; i<keys.length; i++)
        {
            if (____play[keys[i]])
            {
                continue;
            };
            if (vjs.players[keys[i]].pause)
            {
                vjs.players[keys[i]].pause();
            };
        };
        
        $('.videoPlayer').each(function () {
            var elem = $(this).parent();
            var parent = elem.parent();
            
            if (parent.find('.tvn24videos_button').length!=0)
            {
                return;
            };
            
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
                
                ____play[id]=true;
                       
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
    
    checkVideos();
    
    var keys=Object.keys(vjs.players);
    for (i=0; i<keys.length; i++)
    {
        if (vjs.players[keys[i]].pause)
        {
            vjs.players[keys[i]].pause();
        };
    };
    setInterval(checkVideos, 1000);    
};

function tvn24videosInit() {
    var script = document.createElement('script');
    script.textContent = '(' + __inject + ')();';
    (document.head||document.documentElement).appendChild(script);
    // script.parentNode.removeChild(script);
};

tvn24videosInit();
