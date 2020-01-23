$(function(){
  last_message_id = $('.message:last').data("message-id");
  console.log(last_message_id);
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
  });


  // ここから自動更新機能
  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="user-info">` +
          `<div class="user-name">` +
            message.user_name +
          `</div>` +
          `<div class="date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message-text">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="user-info">` +
          `<div class="user-name">` +
            message.user_name +
          `</div>` +
          `<div class="date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message-text">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="user-info">` +
          `<div class="user-name">` +
            message.user_name +
          `</div>` +
          `<div class="date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message__content">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        // メッセージが入ったHTMLに、入れ物ごと追加
        $('.messages').append(insertHTML);
        $(".chat-main__message-list").animete({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
    setInterval(reloadMessages, 7000);
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
  };
});