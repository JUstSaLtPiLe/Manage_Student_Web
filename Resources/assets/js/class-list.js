$(document).ready(function () {
    var token = Cookies.get("token");
    var role = Cookies.get("loggedUserRole");
    if(token == null || role == null || role.split("#").includes("Employee") == false){
        Cookies.remove('token');
        Cookies.remove("loggedUserRole");
        Cookies.remove("loggedUserName");
        window.location.href = "/Manage_Student_Web/Resources/login.html";
    }

    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: 'https://localhost:44320/Clazzs/Index',
        headers: {
            "Authorization": Cookies.get("token"),
        },
        success: function (result) {
            var content = "";
            for (var i in result){
                content += "<tr>";
                content += "<td>" + result[i].name + "</td>";
                content += "<td>" + result[i].teacher + "</td>";
                content += "<td>" + result[i].createdAt + "</td>";
                content += "<td>" + result[i].updateAt + "</td>";
                content += "<td>" + result[i].status + "</td>";
                content += "<td><a href='https://localhost:44320/Clazzs/Edit/" + result[i].clazzId + "'> Edit </a>";
                content += "<a href='https://localhost:44320/Clazzs/Details/" + result[i].clazzId + "'> Details </a>";
                content += "<a href='https://localhost:44320/Clazzs/Delete/" + result[i].clazzId + "'> Delete </a>";
            }
            $("#classList").html(content);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });
});

