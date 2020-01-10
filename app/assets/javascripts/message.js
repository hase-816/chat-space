$(document).on('turbolinks:load', function(){ 
  function buildmessage(message){
    var content = message.content ? `${message.content}`: "";
    var img = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${content}
                    </p>   
                    <img>
                      ${img}
                    </img> 
                  </div> 
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "post",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildmessage(data);
      $('.messages').append(html);
      $('#message_content').val('');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight },1000);
      $('form')[0].reset();
    })
    .fail(function(){
      alert('Error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  })

  var reloadMessages = function(){
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  
    last_message_id = $('.message:last').data("message-id");
    $.ajax ({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message){
        insertHTML += buildmessage(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  }
  setInterval(reloadMessages, 7000);
});