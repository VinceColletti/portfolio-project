$(document).ready(function(){
    // theSportsDb
  // NFL league ID: 4391
  // NCAA Basketball Mens league ID: 4607
  $.ajax({
    url: 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4607',
    dataType: 'json',
    success: function(data) {
      // console.log(data);
      $('#live-score-text').text('March Madness');
      // display latest scores
      for(i=0; i<6; i++){
        let homeTeam = data.events[i].strHomeTeam;
        let homeScore = data.events[i].intHomeScore;
        let awayTeam = data.events[i].strAwayTeam;
        let awayScore = data.events[i].intAwayScore;
        let scoreText = '<p>'+awayTeam+': '+awayScore+'</p><p>'+homeTeam+': '+homeScore+'</p>';
        $('#score-'+i).html(scoreText);
      };
    }
  });

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
  let ninjasScoreTemp = 0;
  let piratesScoreTemp = 0;
  $('#ninja-image, #ninjas-score').click(function(){
    ninjasScoreTemp++;
    $('#ninjas-score').text(ninjasScoreTemp);
  });
  $('#pirate-image, #pirates-score').click(function(){
    piratesScoreTemp++;
    $('#pirates-score').text(piratesScoreTemp);
  });

  // script for click game
  let timer = 15;
  $('#count-down-timer').text('0:'+timer+' remaining');
  $('#start-game-button').click(function(){
    $('#start-game-button').hide();

    // initialize scores
    let ninjasScore = 115;
    let piratesScore = 176;
    $('#ninjas-score').text(ninjasScore);
    $('#pirates-score').text(piratesScore);

    alert('\nCan the Ninjas click their way to victory?\n\nOnly 15 seconds left in the game!')
    
    // increment on click
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
        // if timer = 0, end the game
        clearInterval(timeRemaining);
        $('#staticBackdrop').modal('show');
        $('#modal-title').text("Game Over");
        $('#modal-body').text('');
        if(ninjasScore === piratesScore){
          // Game is tied
          $('#modal-body').text('The game is tied at '+ninjasScore+' points');
          $('#modal-body').append('<img src="./images/ninja.jpg" alt="Ninja logo" style="width: 82px; display: inline-block">');
          $('#modal-body').append('<img id="pirate-image" src="./images/pirate.png" alt="Pirate logo" style="width: 82px; display: inline-block">');
          $('#modal-close-button').click(function(){
            $('#start-game-button').show();
            timer = 15;
            $('#count-down-timer').text('0:'+timer+' remaining');
          });
        } 
        else{
          if(ninjasScore > piratesScore){
            // Ninjas win
            $('#modal-body').append('<img src="./images/ninja.jpg" alt="Ninja logo" style="width: 100px">');
            $('#modal-body').append('Ninjas Win '+ninjasScore+' to '+piratesScore+'!!!');
            $('#modal-close-button').click(function(){
              $('#start-game-button').show();
              timer = 15;
              $('#count-down-timer').text('0:'+timer+' remaining');
            });
          } 
          else{
            // Pirates win
            $('#modal-body').append('<img id="pirate-image" src="./images/pirate.png" alt="Pirate logo" style="width: 100px">');
            $('#modal-body').append('Pirates Win '+piratesScore+' to '+ninjasScore+'!!!');
            $('#modal-close-button').click(function(){
              $('#start-game-button').show();
              timer = 15;
              $('#count-down-timer').text('0:'+timer+' remaining');
            });
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