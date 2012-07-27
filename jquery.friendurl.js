/*
 * jQuery FriendURL plugin 1.5.1
 *
 * http://www.bulgaria-web-developers.com/blog/2009/03/18/jquery-seo-friendly-url-plugin/
 *
 * Copyright (c) 2009 Dimitar Ivanov
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * Bugfixed by: Vitaliy Stepanenko (http://nayjest.ru)    
 */
(function($){
	
	var cyrillic = [
		"а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о",
		"п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ь", "ю", "я",
		"А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", 
		"П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ь", "Ю", "Я",
		"Ї", "ї", "Є", "є", "Ы", "ы", "Ё", "ё"
	];

	var latin = [
		"a", "b", "v", "g", "d", "e", "zh", "z", "i", "y", "k", "l", "m", "n", "o", 
		"p", "r", "s", "t", "u", "f", "h", "ts", "ch", "sh", "sht", "a", "y", "yu", "ya",
		"A", "B", "B", "G", "D", "E", "Zh", "Z", "I", "Y", "K", "L", "M", "N", "O", 
		"P", "R", "S", "T", "U", "F", "H", "Ts", "Ch", "Sh", "Sht", "A", "Y", "Yu", "Ya",
		"I", "i", "Ye", "ye", "I", "i", "Yo", "yo"
	];
	
	var string = '';
	
	$.fn.friendurl = function(options){

		var defaults = {
			divider : '-',
			transliterate: false
		};
		
		var options = $.extend(defaults, options);
		
		return this.each(function(){
						
			$(this).keyup(function(){
				var url = $(this).val()
    				.toLowerCase() // change everything to lowercase
    				.replace(/^\s+|\s+$/g, "") // trim leading and trailing spaces		
    				.replace(/[_|\s]+/g, "-") // change all spaces and underscores to a hyphen
    				.replace(/[^a-z\u0400-\u04FF0-9-]+/g, "") // remove all non-cyrillic, non-numeric characters except the hyphen
    				.replace(/[-]+/g, "-") // replace multiple instances of the hyphen with a single instance
    				.replace(/^-+|-+$/g, "") // trim leading and trailing hyphens
    				.replace(/[-]+/g, options.divider)				
    			;
    			
    			if (options.transliterate) {
    				url = convert(url);
    			}
    			
				$('#' + options.id).val(url);	
			});
						
		});
		
		function convert (text) {
			string = str_replace(cyrillic, latin, text);
			return string;
		}
		
		function str_replace (search, replace, subject, count) {
		    // http://kevin.vanzonneveld.net
		    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		    // +   improved by: Gabriel Paderni
		    // +   improved by: Philip Peterson
		    // +   improved by: Simon Willison (http://simonwillison.net)
		    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
		    // +   bugfixed by: Anton Ongson
		    // +      input by: Onno Marsman
		    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		    // +    tweaked by: Onno Marsman
		    // +      input by: Brett Zamir (http://brett-zamir.me)
		    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		    // +   input by: Oleg Eremeev
		    // +   improved by: Brett Zamir (http://brett-zamir.me)
		    // +   bugfixed by: Oleg Eremeev
		    // %          note 1: The count parameter must be passed as a string in order
		    // %          note 1:  to find a global variable in which the result will be given
		    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
		    // *     returns 1: 'Kevin.van.Zonneveld'
		    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
		    // *     returns 2: 'hemmo, mars'
		
		    var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
		            f = [].concat(search),
		            r = [].concat(replace),
		            s = subject,
		            ra = r instanceof Array, sa = s instanceof Array;
		    s = [].concat(s);
		    if (count) {
		        this.window[count] = 0;
		    }
		
		    for (i=0, sl=s.length; i < sl; i++) {
		        if (s[i] === '') {
		            continue;
		        }
		        for (j=0, fl=f.length; j < fl; j++) {
		            temp = s[i]+'';
		            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
		            s[i] = (temp).split(f[j]).join(repl);
		            if (count && s[i] !== temp) {
		                this.window[count] += (temp.length-s[i].length)/f[j].length;}
		        }
		    }
		    return sa ? s : s[0];
		}
		
	};
	
})(jQuery);