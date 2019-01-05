$(document).ready(function () {
    var token = Cookies.get("token");
    var role = Cookies.get("loggedUserRole");
    if(token == null || role == null || role.split("#").includes("Employee") == false){
        Cookies.remove('token');
        Cookies.remove("loggedUserRole");
        Cookies.remove("loggedUserName");
        window.location.href = "/Manage_Student_Web/Resources/login.html";
    }
});

$(".btn-submit").click(function (){
    var formData = {
        "Name" : $("#createClassForm").find('input[name="Name"]').val(),
        "Teacher" : $("#createClassForm").find('input[name="Teacher"]').val(),
        "Status" : $("#createClassForm").find('input[name="Status"]').val(),
    };
    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        contentType: 'application/json',
        url: 'https://localhost:44320/Clazzs/Create',
        headers: {
            "Authorization": Cookies.get("token"),
            "Role": Cookies.get("loggedUserRole"),
        },
        data: JSON.stringify(formData),
        success: function (result) {
            swal("Create New Class Successful");
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });
});
