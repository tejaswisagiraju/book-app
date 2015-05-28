// on page load


$(function(){

  
  Book.all();
 
  View.init();
});

// // // // // // //

// VIEW OBJECT
function View() {};

View.init = function() {
  // phrase form submit event listener
  $("#add-form").on("submit", function(e){
    // stop page reload
    e.preventDefault();
    // format form data into a query string
    var bookParams = $(this).serialize();
    // send a post request to put this book in db
    //Book.create(bookParams);

    $.post("/books", bookParams, function(req, res) {
       Book.create();   
     
    })


    // reset the form
    $("#search-form")[0].reset();
    // give focus back to the phrase word input element
    // (instead of whichever was focused when submit event happened)
    //$("#new-phrase").focus();
  });
}
View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};

// PHRASES OBJECT
function Book() {};

Book.all = function() {
   console.log("abcd");
  $.get("/books", function(res){ 
    console.log("boks.all")
    // parse the response
    var books = res;

    console.log("here sre the" , books);


    // render the results
    View.render(books, "booklist-ul", "books-template");
  });
}

   Book.create = function(phraseParams) {
  $.post("/books", phraseParams).done(function(res){
    // once done, re-render all phrases
    Book.all();
  });
}



/*Book.delete = function(book) {
  var bookId = $(book).data().id;
  $.ajax({
    url: '/books/' + bookId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all phrases
      Book.all();
    }
  });
};*/
/*
Phrases.update = function(e, form){
  e.preventDefault();
  // pull the values we want out of form
  var $form = $(form);
  var phraseId = $form.data().phraseid;
  var newWord = $form.find("input[name='word']").val();
  var newdefinition = $form.find("input[name='definition']").val();
  // send a POST request with the form values
  $.post("/update", {id: phraseId, word: newWord, definition: newdefinition})
  .done(function(res){
    // once done, re-render everything
    Phrases.all();
  });*/






