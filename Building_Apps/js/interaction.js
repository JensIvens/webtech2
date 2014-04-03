$(document).ready(function(){ 

        navigator.geolocation.getCurrentPosition(success, error);

        function success(position)
        {

            var apiKey = 'b580f6e8e74d610083d96671f3aaedcd';
            var url = 'https://api.forecast.io/forecast/';
            var lati = position.coords.latitude;
            var longi = position.coords.longitude;
            var data;

            $.getJSON(url + apiKey + "/" + lati + "," + longi + "?callback=?&units=si", function(data) {

            console.log(data);
            
            var cTemp = Math.round(data.currently.temperature);
            var dayArray = ["S","M","T","W","T","F","S"];
            var nday1 = data.daily.data[1];
            var nday2 = data.daily.data[2];
            var nday3 = data.daily.data[3];
            var nday4 = data.daily.data[4];

            var todayicon = data.currently.icon;
            var day1icon = nday1.icon;
            var day2icon = nday2.icon;
            var day3icon = nday3.icon;
            var day4icon = nday4.icon;

            var skycon = new Skycons({"color": "#f2f2f2"});
            skycon.add("icon", todayicon);
            skycon.play();

            var skycon1 = new Skycons({"color": "#f2f2f2"});
            skycon1.add("icon1", day1icon);
            skycon1.play();

            var skycon2 = new Skycons({"color": "#f2f2f2"});
            skycon2.add("icon2", day2icon);
            skycon2.play();

            var skycon3 = new Skycons({"color": "#f2f2f2"});
            skycon3.add("icon3", day3icon);
            skycon3.play();

            var skycon4 = new Skycons({"color": "#f2f2f2"});
            skycon4.add("icon4", day4icon);
            skycon4.play();


            $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lati +"," + longi + "&sensor=false",function(data)
            {
                console.log(data);
                city = data.results[2].address_components[0].long_name;
                $('#today .location').text(city);
            });



            $('#today .day').text(dayArray[new Date(data.currently.time*1000).getDay()]);
            $('#today .temp').text(Math.round(data.currently.temperature) + "°");

            $('.day1').text(dayArray[new Date(nday1.time*1000).getDay()]);
            $('.minTemp1').text(Math.round(nday1.temperatureMin) + "°");
            $('.maxTemp1').text(Math.round(nday1.temperatureMax) + "°");

            $('.day2').text(dayArray[new Date(nday2.time*1000).getDay()]);
            $('.minTemp2').text(Math.round(nday2.temperatureMin) + "°");
            $('.maxTemp2').text(Math.round(nday2.temperatureMax) + "°");

            $('.day3').text(dayArray[new Date(nday3.time*1000).getDay()]);
            $('.minTemp3').text(Math.round(nday3.temperatureMin) + "°");
            $('.maxTemp3').text(Math.round(nday3.temperatureMax) + "°");

            $('.day4').text(dayArray[new Date(nday4.time*1000).getDay()]);
            $('.maxTemp4').text(Math.round(nday4.temperatureMax) + "°");
            $('.minTemp4').text(Math.round(nday4.temperatureMin) + "°");


            if(cTemp < 0)
            {
                $('body').addClass("freezing");                  
            }
            else if(cTemp >= 0 && cTemp < 10)
            {
                $('body').addClass("cold");                  
            }
            else if(cTemp >= 10 && cTemp < 15)
            {
                $('body').addClass("mild");                  
            }
            else
            {
                $('body').addClass("warm");                  
            }

            });
        }

        function error(err) 
        {
          console.warn('ERROR(' + err.code + '): ' + err.message);
          $("#warning").text("Het was ongemogelijk uw geolocatie te bepalen");
        };

});