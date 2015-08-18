/**
 * Created by murta on 18/08/15.
 */
$(document).on('keyup', function(event) {
    if(event.keyCode === 118) {
        $('input').first().focus();
    };
});