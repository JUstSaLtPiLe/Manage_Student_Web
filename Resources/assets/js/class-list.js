$(document).ready(function () {
    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: 'https://localhost:44320/api/studentResourcesAPI/ClazzsIndex',
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
                content += "<td><a href='#'> Edit </a>";
                content += "<a href='/Manage_Student_Web/Resources/class-detail.html?classId=" + result[i].clazzId + "'>" + "Details </a>";
                content += "<a href='https://localhost:44320/Clazzs/Delete/" + result[i].clazzId + "'> Delete </a>";
            }
            $("#classList").html(content);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });
});

