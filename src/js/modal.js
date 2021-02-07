const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach((field) => {
    field.removeClass("input-error");
    if (field.val().trim() == "") {
      field.addClass("input-error");
    }
  })
  const errorFields = form.find('.input-error');
  return errorFields.length == 0;
}

$('input').click(function (e) {
  e.currentTarget.focus();
})

$('textarea').click(function (e) {
  e.currentTarget.focus();
})

$(".form").submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $(".modal");
  const content = modal.find(".modal__message");

  modal.removeClass("error-modal");

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    $.ajax({
      url:"https://webdev-api.loftschool.com/sendmail",
      method:"post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      },

      success: data => {
        content.text(data.message);

        $('.form__input').val('');

        $.fancybox.open({
          src: "#hidden-content",
          type: "inline"
        })

      },

      error: data => {
        content.text(data.responseJSON.message);
        modal.addClass("error-modal");
        $('.form__input').val('');

        $.fancybox.open({
          src: "#hidden-content",
          type: "inline"
        })
      }
    })
  }

  $(".js--btn-close").click(e => {
    e.preventDefault();

    $.fancybox.close();
  })
})

$(".form").click(e => {
  console.log(e.currentTarget)
  console.log(e.target)
})
