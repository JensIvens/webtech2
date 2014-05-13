
$(document).ready(function(){
   
	var client = new Faye.Client('http://localhost:3000/faye/',{
				timeout: 2000
	});

    //	Clients subscribe using the #subscribe() method:		
    client.subscribe('/ask', function(message) {
        var currentDateTime = new Date();
        var currentdate = createDateStringOnlyTime(currentDateTime);
        
        var newQuestionMod =   "<li class='listitem'><pre><p class='bg-primary'>" + message.user + " asks: </p>"
                            + "<blockquote><p>" + message.chat  + "</p>"
                            + "<footer class='date'>" + currentdate + "</footer></blockquote>"
                            + "<a href='#' class='rmvItem'>Delete</a></pre></li>";
        
        var likes = 0;
        var newQuestionLike =   "<li class='listitem'><pre><p class='bg-primary'>" + message.user + " asks: </p>"
                            + "<blockquote><p>" + message.chat  + "</p>"
                            + "<footer class='date'>" + currentdate + "</footer></blockquote>"
                            + "<a class='voteUp pull-left' href='#'><span class='glyphicon glyphicon-thumbs-up'>" + likes + "</span></a></pre></li>";


            $("#questionsDelete").prepend(newQuestionMod).hide().slideDown();
            $("#questionsLike").prepend(newQuestionLike).hide().slideDown();

            $('span.glyphicon').on('click', function(){
                $(this).html(likes++);
            });

            $('.rmvItem').on('click', function(e){
                $(this).parent().parent().slideUp(function(){
                    $(this).remove();
                    client.publish('/ask', {chat : chatMessage, user : chatUser});


                });
        });
	
    }); 

	
    $('#submitQuestion').on('click',null, function(e) {
    	var chatMessage = $('#questionField').val();
    	var chatUser = $('#nameField').val();

    	if(chatMessage != "" && chatUser != "")
    	{
    		$(".bg-danger").text("") ;
    		$(".bg-danger").css('display','none');
			client.publish('/ask', {chat : chatMessage, user : chatUser});
            $('#questionField').val("");
            $('#nameField').val("");
    	}
    	else
    	{
    		$(".bg-danger").text("Give us a name and a question!") ;
    		$(".bg-danger").css('display','block');
            e.preventDefault();
    	}

    	
	});
    

});// END VAN DOCUMENT READY


function createDateString(currentdate)
{
    var currentDay = checkDate(currentdate.getDate());
    var currentMonth = checkDate(currentdate.getMonth()+1);
    var currentYear = checkDate(currentdate.getFullYear());
    var currentHour = checkDate(currentdate.getHours());
    var currentMinutes = checkDate(currentdate.getMinutes());    
    var currentSecond = checkDate(currentdate.getSeconds());  

    var currentDateTime = currentDay + "/"
                    + currentMonth + "/" 
                    + currentYear + " ( "  
                    + currentHour + ":"  
                    + currentMinutes + ":" 
                    + currentSecond + " ) " ;
    return currentDateTime;
}

function createDateStringOnlyTime(currentdate)
{
   
    var currentHour = checkDate(currentdate.getHours());
    var currentMinutes = checkDate(currentdate.getMinutes());    
    var currentSecond = checkDate(currentdate.getSeconds());  

    var currentDateTime = currentHour + ":"  
                    + currentMinutes + ":" 
                    + currentSecond;
    return currentDateTime;
}

function checkDate(p_dateElement)
{
    if(p_dateElement < 10)
        p_dateElement = "0" + p_dateElement;
    return p_dateElement;
}