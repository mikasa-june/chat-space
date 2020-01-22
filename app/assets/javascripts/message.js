$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =
      `<div class="message">
        <div class="user-info">
          <div class="user-name">
            ${message.user_name}
          </div>
          <div class="date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-text">
          <p class=".lower-message__content">
            ${message.content}
          </p>
          <img src=${message.image} >
        </div>
      </div>`
      return html;
    } else {
      var html =
      `<div class="message">
      <div class="user-info">
        <div class="user-name">
          ${message.user_name}
        </div>
        <div class="date">
          ${message.created_at}
        </div>
      </div>
      <div class="message-text">
        <p class=".lower-message__content">
          ${message.content}
        </p>
      </div>
    </div>`
      return html;
    };
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});