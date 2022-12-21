console.log("Registering");

$(document).ready(function(e)
{
    $('#frmRegister').on('submit', function (e) {
        e.preventDefault();

        const email = $('#txtEmail').val();
        if (email.length === 0) {
            alert('Please input a valid email.');
            return;
        }

        $.getJSON(`/users/is-available?email=duongducanh6101@gmail.com`, function (data) {
            if (data === false) {
                alert('Not available for registration!');
            } else {
                $('#frmRegister').off('submit').submit();

            }
        });
    });

    $('#txtDOB').datetimepicker({
        timepicker: false,
        format: 'd/m/Y',
        mask: true
    });
});

