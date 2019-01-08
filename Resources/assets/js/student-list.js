$(document).ready(function () {
    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_AccountsIndex,
        headers: {
            "Authorization": Cookies.get("token"),
        },
        success: function (result) {
            var content = "";
            for (var i in result.studentAccounts){
                content += "<tr>";
                content += "<td>" + result.studentAccounts[i].account.rollNumber + "</td>";
                content += "<td>" + result.studentAccounts[i].account.generalInformation.name + "</td>";
                content += "<td>" + result.studentAccounts[i].account.generalInformation.phone + "</td>";
                content += "<td>" + result.studentAccounts[i].account.generalInformation.email + "</td>";
                content += "<td>" + result.studentAccounts[i].account.status + "</td>";
                content += "<td><ul>";
                content += "<li>" + result.studentAccounts[i].role.name + "</li>";
                content += "</ul></td>";
                content += "<td><a href='#'> Edit </a>";
                content += "<a href='#'>Details </a>";
                content += "<a href='#'> Delete </a>";
                content += "</td>";
                content += "</tr>";
            }
            $("#studentList").html(content);
            console.log(result)
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });
});