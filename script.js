var htmlprestyle = "<style>html{font-family:Arial}</style> ";

function saving() {
  localStorage.setItem("titel", document.getElementById("titel").value);
  localStorage.setItem("body", document.getElementById("text").value);
  console.log("Saved");

  $("#text").on('keyup', function() {
    var words = this.value.match(/\S+/g).length;;

    $('#display_count').text(words);
  });
}




$(document).ready(function() {
  $("#text").on('keyup', function() {
    var words = this.value.match(/\S+/g).length;;

    $('#display_count').text(words);
    saving();
  });
});
