$(document).on('turbolinks:load',function() {

  var search_user = $("#user-search-result");
  var member_list = $(".chat-group-users");

  function addUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</a>
                </div>`

    search_user.append(html);
    return html;       
  }

  function addGroupUser(name, user_id) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value=${ user_id }>
                  <p class='chat-group-user__name'>${ name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`

    member_list.append(html);
  }
  
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`

    search_user.append(html);            
  }

  $(function() {
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        dataType: 'json',
        data: { keyword: input },
      })

      .done(function(users) {
        $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user){
            addUser(user);
            });
          }
          else {
            appendErrMsgToHTML('一致するユーザーが見つかりません');
          }
        })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      }) 
    });
  
    $(function() {
      $('#user-search-result').on("click", '.user-search-add', function() {
        var name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        addGroupUser(name, user_id);
        $(this).parent().remove();
      });

      $('.chat-group-users.js-add-user').on("click", '.user-search-remove', function() {
        $(this).parent().remove();
      });
    });
  });
});