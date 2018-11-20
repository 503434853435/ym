autosize(document.querySelector('textarea'));

// book now form
let widget = `
  <div class = 'form_action'>
    <div class = 'spinner'></div>
  </div>`;


(function bookForm() {

  let form = $('.form_book');

  function removeWidget() {
    $('body').find('.form_action').remove();
    document.querySelector('.form_book').reset();
  }

  function handleForm(message)  {
    function showMessage() {
      $('.form_action').html(message);
      setTimeout(removeWidget, 2700);
    }
    setTimeout(showMessage, 1500); 
  }

  form.submit(function(e){
    let f_name = document.querySelector('.name').value.toUpperCase();
    let messages = {
      success: `
        <div class = 'feedback'>
          <h2 class = 'golden'>Thank you for contacting us ${f_name} </h2>
          <p class = 'pale'>We'll get back to you asap.</p>
        </div>
      `,
      error: `
        <div class = 'feedback'>
         <h2>Oops!</h2>
         <p class = 'pale'>There was an error. please try again.</p>
        </div>
      `
    };

    e.preventDefault();
    var href = $(this).attr("action");
    
    $.ajax({
        type: "POST",
        dataType: "json",
        url: href,
        data: $(this).serialize(),
        beforeSend: function() {
          $('body').append(widget);
        },
        success: function(data) {
          handleForm(messages.success);
        },
        error: function(err) {
          handleForm(messages.error); 
        }
    });
  });
})();