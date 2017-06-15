var currentURL = window.location.origin;

function startSwap() {

    var newSwap = {
        poster: $("input[name='poster_id']")[0].value,
        product: $("input[name='product_id']")[0].value
    }
    $.post(currentURL + "/api/swap", newSwap);
}


$(document).on("click", "#swapbtn", function() {
    startSwap();

});

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });