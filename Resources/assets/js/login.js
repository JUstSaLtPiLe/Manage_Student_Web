$(".btn-submit").click(function (){
    var formData = $("#loginForm").serializeArray();
    console.log(formData);
    $.ajax({
        type: 'POST',
        url: 'https://localhost:44320/Accounts/Login',
        data: formData,
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
