$(".btn-submit").click(function (){
    var formData = {
        "RollNumber" : $("#loginForm").find('input[name="RollNumber"]').val(),
        "Password" : $("#loginForm").find('input[name="Password"]').val()
    };
    console.log(formData);
    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        contentType: 'application/json',
        url: 'https://localhost:44320/api/StudentResourcesAPI/Login',
        data: JSON.stringify(formData),
        success: function (result) {
            Cookies.set("token" , result.credential.accessToken);
            Cookies.set("loggedUserRole" , result.roles);
            Cookies.set("loggedUserName" , result.name);
            window.location.href = "/Manage_Student_Web/Resources/class-list.html";
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });
});