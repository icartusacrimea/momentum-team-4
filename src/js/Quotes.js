var Quotes = (function () {

	'use strict';

	var DOM = {};

	function cacheDom() {
  	DOM.$quote = $('.quote');
  	DOM.$userPrefFeatures = $('#userpref-features');
  	DOM.$userPrefTheme = $('#userpref-theme');
  	DOM.$userPrefQuotes = $('#userpref-quotes');
	}

	function getQuote() {
		//default
		compscience();

		$('#inspiring').click(function(){
			DOM.$userPrefQuotes.show();
			DOM.$userPrefTheme.hide();
			DOM.$userPrefFeatures.hide();
			if ($('#inspiring').prop('checked')) {
				localStorage.setItem("quotes", "inspiring");
				inspirational();
			}
		});

		$('#compscience').click(function(){
			DOM.$userPrefQuotes.show();
			DOM.$userPrefTheme.hide();
			DOM.$userPrefFeatures.hide();
			if ($('#compscience').prop('checked')) {
				localStorage.setItem("quotes", "compsci");
				compscience();
			}
		});

		function inspirational() {
			$.ajax({
      url: "http://api.forismatic.com/api/1.0/?",
      dataType: "jsonp",
      data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
      success: function( response ) {
      	if (response.quoteText.length < 181) {
	        DOM.$quote.html("<h3 class='quote-content'>" + response.quoteText + "</h3>" + "<p class='quote-author'>" + response.quoteAuthor + "</p>");
      	} else { inspirational(); }
      }
  		});
		}

		function compscience() {
  		$.ajax({
      url: "http://quotes.stormconsultancy.co.uk/random.json?",
      dataType: "json",
      success: function( data ) {
      	if (data.quote.length < 181) {
	        DOM.$quote.html("<h3 class='quote-content'>" + data.quote + "</h3>" + "<p class='quote-author'>" + data.author + "</p>");
      	} else { compscience(); }
	    }
  		});
	  }

		  function localstorage() {
			var quotechoice = localStorage.getItem("quotes");

				if (quotechoice === "inspiring") {
					inspirational();
				} else if (quotechoice === "compsci") {
					compscience();
				}

		}

	}


	function init() {
		cacheDom();
		getQuote();
		//localstorage();
	}

	return {
		init: init
	};

}());