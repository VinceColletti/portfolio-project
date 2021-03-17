$(document).ready(function(){

  // if the email address is blank, nothing happens when subscribe button is clicked. otherwise, subscribe box dissappears when you close the modal
  $('#subscribe-button').click(function(){
    let valid = false
    let typedText = $('#subscribe-email').val()
    for(let i=0; i<typedText.length; i++){
      if(typedText[i] === '@'){
        valid = true
      }
    }

    if(typedText === '' || valid === false){
      $('#modal-title').text("Something went wrong")
      $('#modal-body').text('Please enter a valid email address')
    } else{
      $('#modal-title').text("Thank you for subscribing to the DSNN Newsletter")
      $('#modal-body').text('You will recieve email updates at '+typedText)
      $('#modal-close-button').click(function(){
        $('#subscribe-block').hide()
      })
    }
  })

  // Scripts to increment the scores
  let ninjasScore = 0;
  let piratesScore = 0;
  $('#ninja-image, #ninjas-score').click(function(){
    ninjasScore++
    $('#ninjas-score').text(ninjasScore)
  })
  $('#pirate-image, #pirates-score').click(function(){
    piratesScore++
    $('#pirates-score').text(piratesScore)
  })

  // script to end game
  let timer = 15
  let period = 1
  $('#period-count').text('1st period')
  $('#count-down-timer').text('0:'+timer+' remaining')
  let timeRemaining = setInterval(function(){
    if(timer>0){
      timer--
    } else{
      if(period === 4){
        clearInterval(timeRemaining)
        if(ninjasScore === piratesScore){
          alert('Game Over!\nThe game is tied at '+ninjasScore+' points')
        } else{
          if(ninjasScore > piratesScore){
            alert('Game Over!\nThe score is '+ninjasScore+' to '+piratesScore+'\n Ninjas Win!!!')
          } else{
            alert('Game Over!\nThe score is '+piratesScore+' to '+ninjasScore+'\n Pirates Win!!!')
          }
        }
      } else{
        if(period === 3){
          alert('The third period is over')
          period++
          $('#period-count').text('4th period')
          timer = 15
        } else{
          if(period === 2){
            alert('it\'s Halftime!')
            period++
            $('#period-count').text('3rd period')
            timer = 15
          } else{
            alert('The 1st period is over')
            period++
            $('#period-count').text('2nd period')
            timer = 15
          }
        }
      }
    }






    
    if(timer>9){
      $('#count-down-timer').text('0:'+timer+' remaining')
    } else{
      $('#count-down-timer').text('0:0'+timer+' remaining')
    }
  }, 1000)
})