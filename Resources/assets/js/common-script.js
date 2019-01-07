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