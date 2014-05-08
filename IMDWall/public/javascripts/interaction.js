var previousChatTime = new Date();
var messageId = 0;
var messagesIds = [];

$(document).ready(function(){
   
	var client = new Faye.Client('http://localhost:3000/faye/',{
				timeout: 2000
	});

//	Clients should subscribe to channels using the #subscribe() method:		
	var subscriptionAsk = client.subscribe('/ask', function(message) {
	   //alert('Got a message: ' + message.text);
        var currentDateTime = new Date();
        var currentdate = createDateStringOnlyTime(currentDateTime);

        
    var newQuestion = "<div id='message" + messageId 
                         + "' class='questionStyle animateQuestion'><div class='userClass'><h1>"
                         + message.user + " asks: </h1><p class='chatMessage'>"
                         + message.chat  + "</p></div><div class='chatTime'><p>" 
                         + currentdate + "</p></div></div>"


        messagesIds.push("message"+messageId);
        messageId++;
        previousChatTime = currentDateTime;

        $("#questions").append(newQuestion);
	
    }); 

	
    $('#submitQuestion').on('click',null, function() {
    	var chatMessage = $('#questionField').val();
    	var chatUser = $('#nameField').val();
        var messageIllegalCharsFound = illegalCharsFound(chatMessage);
        var userIllegalCharsFound = illegalCharsFound(chatUser);

    	if(chatMessage != "" && chatUser != ""  && (messageIllegalCharsFound == false && userIllegalCharsFound == false) )
    	{
    		$(".errorMessage").text("") ;
    		$(".errorMessage").css('display','none');
			var publicationAsk = client.publish('/ask', {chat : chatMessage, user : chatUser});
            $('#questionField').val("");
            $('#nameField').val("");
            $('.charactersLeft').html('100 characters remaining');
    	}
    	else
    	{
    		$(".errorMessage").text("You must fill in both your name and a question!") ;
    		$(".errorMessage").css('display','block');
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

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// CHECKEN OF DAT ER GEEN HTML TAGS GEBRUIKT WORDEN
function illegalCharsFound(checkString)
{
    //var specialCharacters = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    var specialCharacters = "<>~`";
    var result = false;
    if (checkString.indexOf('>')!=-1 || checkString.indexOf('<')!=-1 ) // dan is het gevonden
    {
       result = true;  
    }

    return result;
}

