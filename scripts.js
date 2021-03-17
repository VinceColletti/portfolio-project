$(document).ready(function(){

  // if the email address is blank, nothing happens when subscribe button is clicked. otherwise, subscribe box dissappears when you close the modal
  $('#subscribe-button').click(function(){
    let typedText = $('#subscribe-email').val()
    if(typedText === ''){
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
})