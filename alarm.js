var clock = {
    // Create the time selector for the alarm
    createSelector : function (max) {
        var selector = document.createElement("select");
        for (var i=0; i<=max; i++) {
          var opt = document.createElement("option");
          i = clock.addZero(i);
          opt.value = i;
          opt.innerHTML = i;
          selector.appendChild(opt);
        }
        return selector
      },
    
      // Helper function to pad zeroes onto the alarm clock
      addZero : function (num) {
        if (num < 10) 
          { 
            num = "0" + num; 
          }
        else 
        { 
          num = num.toString(); 
        }
        return num;
      },
    
      // Function to set the current time using the built in date function
      tick : function () {
        // Get the current time
        var now = new Date();
        var hr = clock.addZero(now.getHours());
        var min = clock.addZero(now.getMinutes());
        var sec = clock.addZero(now.getSeconds());
    
        // Set the HTML clock
        clock.hour.innerHTML = hr;
        clock.minutes.innerHTML = min;
        clock.seconds.innerHTML = sec;
    
        // Check if the alarm has gone off
        if (clock.alarm != null) {
          now = hr + min + sec;
          if (now == clock.alarm) {
            if (clock.sound.paused) { clock.sound.play(); }
          }
        }
      },
    
      // Set alarm function
      set : function () {
        clock.alarm = clock.timeHour.value + clock.timeMinute.value + clock.timeSecond.value;
        clock.timeHour.disabled = true;
        clock.timeMinute.disabled = true;
        clock.timeSecond.disabled = true;
        clock.timeSet.disabled = true;
        clock.timeReset.disabled = false;
      },
    
      // Reset alarm function
      reset : function () {
        if (!clock.sound.paused) { clock.sound.pause(); }
        clock.alarm = null;
        clock.timeHour.disabled = false;
        clock.timeMinute.disabled = false;
        clock.timeSecond.disabled = false;
        clock.timeSet.disabled = false;
        clock.timeReset.disabled = true;
      },


    // Initialize the clock
    init : function () {
      // Get the time
        clock.hour = document.getElementById("hour");
        clock.minutes = document.getElementById("minutes");
        clock.seconds = document.getElementById("seconds");
  
      //Set the timer 
        clock.timeHour = clock.createSelector(23);
        document.getElementById("alarmHour").appendChild(clock.timeHour);
        clock.timeMinute = clock.createSelector(59);
        document.getElementById("alarmMin").appendChild(clock.timeMinute);
        clock.timeSecond = clock.createSelector(59);
        document.getElementById("alarmSeconds").appendChild(clock.timeSecond);
  
      //Initialize the set and reset buttons
        clock.timeSet = document.getElementById("timeSet");
        clock.timeSet.addEventListener("click", clock.set);
        clock.timeReset = document.getElementById("timeReset");
        clock.timeReset.addEventListener("click", clock.reset);
  
      //Set the alarm sounds
        clock.sound = document.getElementById("alarmSound");
  
      //Let the clock start
        clock.alarm = null;
        setInterval(clock.tick, 1000);
    },
  };
  
  //Run the entire script and run everything
  window.addEventListener("load", clock.init);