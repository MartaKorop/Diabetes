$(document).ready(function () {
    componentHandler.registerUpgradedCallback('MaterialTextfield', (textfield) => {
        let input = $(textfield).find('.mdl-textfield__input');
        if (input.data('required') != null) input.attr('required', true);
    });

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
