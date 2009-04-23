(function($){
   
    $.fn.friendurl = function(options){
 
        var defaults = {
            divider : '-'
        };
       
        var options = $.extend(defaults, options);
       
        return this.each(function(){
                       
            $(this).keyup(function(){
 
                var url = that.val()
                        .toLowerCase()
                        .replace(/^\s+|\s+$/g, "")
                        .replace(/[_|\s]+/g, "-")
                        .replace(/[^a-z\u0400-\u04FF0-9-]+/g, "")
                        .replace(/[-]+/g, "-")
                        .replace(/^-+|-+$/g, "")
                        .replace(/[-]+/g, options.divider)
                    ;
                $('#' + options.id).val(url);
 
            });
                       
        });
       
    };
   
})(jQuery);