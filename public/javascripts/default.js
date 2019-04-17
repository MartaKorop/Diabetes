// General behavior.
$(document).ready(function () {
    // Fix required validation issue for MDL.
    componentHandler.registerUpgradedCallback('MaterialTextfield', (textfield) => {
        let input = $(textfield).find('.mdl-textfield__input');
        if (input.data('required') != null) input.attr('required', true);
    });

    // MDL update DOM
    // setTimeout(function () {
    //   componentHandler.upgradeDom();
    // }, 500);

    //Show/hide password
    $('.toggle-password').on('click', function() {
        var input = $($(this).attr('toggle'));
        if (input.val() !== '') {
            if (input.attr('type') === 'password') {
                input.attr('type', 'text');
                $(this).text('visibility_off');
            } else {
                input.attr('type', 'password');
                $(this).text('visibility');
            }
        }
    });
});