$(document).ready(function(){
    // theSportsDb
  // NFL league ID: 4391
  // NCAA Basketball Mens league ID: 4607
  $.ajax({
    // last 15 events for NCAA basketball
    url: 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4607',
    dataType: 'json',
    success: function(data) {
      // console.log(data)
      $('#live-score-text').text('March Madness')
      for(i=0; i<4; i++){
        let homeTeam = data.events[i].strHomeTeam;
        let homeScore = data.events[i].intHomeScore;
        let awayTeam = data.events[i].strAwayTeam;
        let awayScore = data.events[i].intAwayScore;
        let scoreText = '<p>'+homeTeam+'► '+homeScore+'</p><p>'+awayTeam+'► '+awayScore+'</p>';
        $('#score-'+i).html(scoreText);
      }
    }
  });

    // How to show the modal
    // $('#staticBackdrop').modal('show')

  // if the email address is blank, nothing happens when subscribe button is clicked. otherwise, subscribe box dissappears when you close the modal
  $('#subscribe-button').click(function(){
    let valid = false;
    let typedText = $('#subscribe-email').val();
    // check to see if email is "valid"
    for(let i=0; i<typedText.length; i++){
      if(typedText[i] === '@'){
        valid = true;
      };
    };
    // show the modal if there is a "valid" email
    if(typedText === '' || valid === false){
      $('#modal-title').text("Something went wrong");
      $('#modal-body').text('Please enter a valid email address');
    }
    else{
      $('#modal-title').text("Thank you for subscribing to the DSNN Newsletter");
      $('#modal-body').text('You will recieve email updates at '+typedText);
      $('#modal-close-button').click(function(){
        $('#subscribe-block').hide();
      });
    };
  });

  // Script to increment the scores while game is not running
  let ninjasScore = 0;
  let piratesScore = 0;
  $('#ninja-image, #ninjas-score').click(function(){
    ninjasScore++;
    $('#ninjas-score').text(ninjasScore);
  });
  $('#pirate-image, #pirates-score').click(function(){
    piratesScore++;
    $('#pirates-score').text(piratesScore);
  });

  // script for click game
  let timer = 15;
  let period = 4;
  $('#period-count').text('Period: '+period);
  $('#count-down-timer').text('0:'+timer+' remaining');
  $('#start-game-button').click(function(){
    $('#start-game-button').hide();

    // initialize scores
    let ninjasScore = 0;
    let piratesScore = 0;
    $('#ninjas-score').text(ninjasScore);
    $('#pirates-score').text(piratesScore);
    $('#ninja-image, #ninjas-score').click(function(){
      ninjasScore++;
      $('#ninjas-score').text(ninjasScore);
    });
    $('#pirate-image, #pirates-score').click(function(){
      piratesScore++;
      $('#pirates-score').text(piratesScore);
    });
    
    // get timer going
    let timeRemaining = setInterval(function(){
      if(timer>0){
        timer--;
      } 
      else{
        if(period === 4){
          //end game
          clearInterval(timeRemaining);
          $('#staticBackdrop').modal('show');
          $('#modal-title').text("Game Over");
          $('#modal-body').text('');
          if(ninjasScore === piratesScore){
            $('#modal-body').text('The game is tied at '+ninjasScore+' points');
          } 
          else{
            if(ninjasScore > piratesScore){
              $('#modal-body').append('<img src="./images/ninja.jpg" alt="Ninja logo" style="width: 100px">');
              $('#modal-body').append('The score is '+ninjasScore+' to '+piratesScore+'\n Ninjas Win!!!');
            } 
            else{
              $('#modal-body').append('<img id="pirate-image" src="./images/pirate.png" alt="Pirate logo" style="width: 100px">');
              $('#modal-body').append('The score is '+piratesScore+' to '+ninjasScore+'\n Pirates Win!!!');
            };
          };
        // keep rolling through the periods
        } 
        else{
          if(period === 3){
            alert('The third period is over');
            period++;
            $('#period-count').text('Period: '+period);
            timer = 15;
          } 
          else{
            if(period === 2){
              alert('it\'s Halftime!');
              period++;
              $('#period-count').text('Period: '+period);
              timer = 15;
            } 
            else{
              alert('The 1st period is over');
              period++;
              $('#period-count').text('Period: '+period);
              timer = 15;
            };
          };
        };
      };
      // make sure timer displays properly  
      if(timer>9){
        $('#count-down-timer').text('0:'+timer+' remaining');
      } 
      else{
        $('#count-down-timer').text('0:0'+timer+' remaining');
      };
    }, 1000);
  });
});