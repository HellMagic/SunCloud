'use strict';

$('#school-btn-edit').live('click', function () {
    $(this).hide();
    $('#school-name').hide();
    $('#school-edit-form').show();
});

function hideSchooledit() {
    $('#school-edit-form').hide();
    $('#school-name').show();
    $('#school-btn-edit').show();
}
$('#school-edit-btn-cancel').live('click', function () {
    hideSchooledit();
});
