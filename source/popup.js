var postbody = '';

$(document).ready(function(){
    $("#message").focus();
    chrome.tabs.getSelected(null, function(tab){ 
        if( tab.url.indexOf('chrome://') < 0 )
        {
		
            var url = tab.url;
			var title = tab.title;
        
            $("#message").val([title+" "+url]);
        }
    });
    
    $.get('http://composer.io/posts/add', function(data){
        var inputtag = data.match(/<textarea[^>]*id="PostBody"><\/textarea>/);

        $("#loading").hide();
        if( inputtag != null ) {
            postbody = data.match(/<textarea[^>]*id="PostBody"><\/textarea>/)[1];
            $("#loggedin").fadeIn();
            $("#message").select();
        } else {
            $("#loggedout").fadeIn();
        
        }
    });

    $("#composer").click(function(){     
        $("#composer").attr("disabled","disabled");
    
        $.post('http://composer.io/posts/add',

            {
              'data[Post][body]': $('#message').val(),
              'data[Post][services]': 'default',
              postbody: postbody
            }, function(){ window.close(); 
            });
    });
    
    function countMessage() {
        var msg = $("#message").val();
        if( msg.length == 1 )
            $("#charcount").text(msg.length+" character");
        else
            $("#charcount").text(msg.length+" characters");
            
        if( msg.length > 140 )
            $("#charcount").addClass("warning");
        else
            $("#charcount").removeClass("warning");
    }
    countMessage();
    
    var countTimer = null;
    
    $("#message").keydown(function(){
        countTimer = setTimeout(countMessage,75);
    }).keyup(function(){
        clearTimeout(countTimer);
    });
});
