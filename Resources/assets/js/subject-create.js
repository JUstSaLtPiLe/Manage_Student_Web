$(document).ready(function () {
    $(".btn-submit").click(function (){
        var formData = {
            "Name" : $("#createSubjectForm").find('input[name="Name"]').val(),
        };
        $.ajax({
            type: 'POST',
            accepts: 'application/json',
            contentType: 'application/json',
            url: 'https://localhost:44320/Subjects/Create',
            headers: {
                "Authorization": Cookies.get("token"),
                "Role": Cookies.get("loggedUserRole"),
            },
            data: JSON.stringify(formData),
            success: function (result) {
                swal("Create New Subject Successful");
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("error");
            }
        });
    });
});