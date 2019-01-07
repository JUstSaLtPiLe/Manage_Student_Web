$(document).ready(function () {

    //lấy về danh sách subject để add subject vào lớp
    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: 'https://localhost:44320/api/studentResourcesAPI/SubjectsIndex',
        headers: {
            "Authorization": Cookies.get("token"),
        },
        success: function (result) {
            var content = "";
            for (var i in result){
                content += "<option value='" + result[i].subjectId + "'>" + result[i].name + "</option>"
            }
            $("#example-getting-started").html(content);
            $('#example-getting-started').multiselect({
                enableFiltering: true
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    //**********************

    //lấy về danh sách subject, student trong lớp => cho vào bảng subject, student và select subject lớp đang học để thêm điểm

    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        contentType: 'application/json',
        url: 'https://localhost:44320/api/studentResourcesAPI/ClazzDetails',
        headers: {
            "Authorization": Cookies.get("token"),
        },
        data: JSON.stringify(window.location.href.split("=")[1]),
        success: function (result) {
            var content = "";
            var content2 = "";
            var content3 = "";
            for (var i in result.clazzSubject){
                if(result.clazzSubject[i].subject.status != 0 && result.clazzSubject[i].status != 0){
                    content2 += "<tr>";
                    content2 += "<td>" + result.clazzSubject[i].subject.name + "</td>";
                    content2 += "<td><a href='#'> Edit </a>";
                    content2 += "<a href='#'> Details </a>";
                    content2 += "<a class='delete-subject " + result.clazzSubject[i].subject.subjectId + "'>" + "Delete </a>";
                    content2 += "<a class='delete-subject-from-class " + result.clazzSubject[i].subject.subjectId + "'>" + " Delete From Class </a>";
                    content2 += "</td>";
                    content2 += "</tr>";
                }
            }
            for (var i in result.clazzSubject){
                if(result.clazzSubject[i].subject.status != 0){
                    content3 += "<option value='" + result.clazzSubject[i].subject.subjectId + "'>" + result.clazzSubject[i].subject.name + "</option>"
                }
            }
            for (var i in result.studentClazz){
                if(result.studentClazz[i].account.status != 0 && result.studentClazz[i].status != 0){
                    content += "<tr>";
                    content += "<td>" + result.studentClazz[i].account.rollNumber + "</td>";
                    content += "<td>" + result.studentClazz[i].account.generalInformation.name + "</td>";
                    content += "<td>" + result.studentClazz[i].account.generalInformation.phone + "</td>";
                    content += "<td>" + result.studentClazz[i].account.generalInformation.email + "</td>";
                    content += "<td>" + result.studentClazz[i].account.status + "</td>";
                    content += "<td><ul>";
                    for(var j in result.studentClazz[i].account.roleAccounts){
                        content += "<li>" + result.studentClazz[i].account.roleAccounts[j].role.name + "</li>";
                    }
                    content += "</ul></td>";
                    content += "<td><a href='#'> Edit </a>";
                    content += "<a href='#'>Details </a>";
                    content += "<a class='delete-student " + result.studentClazz[i].account.accountId + "'>" + "Delete </a>";
                    content += "<a class='delete-student-from-class " + result.studentClazz[i].account.accountId + "'>" + " Delete From Class </a>";
                    content += "<td class='gradeForms hidden'>";
                    content += "<form class='gradeForm'>";
                    content += "<div class='form-group'>";
                    content += "<input type='hidden' name='AccountId' value='" + result.studentClazz[i].accountId + "'>";
                    content += "<input type='hidden' class='subjectId' name='SubjectId'>";
                    content += "</div>";
                    content += "<div class='form-group'>";
                    content += "<label> Assignment Grade </label>";
                    content += "<input type='number' class='form-control' name='AssignmentGrade'>";
                    content += "</div>";
                    content += "<div class='form-group'>";
                    content += "<label> Practical Grade </label>";
                    content += "<input type='number' class='form-control' name='PraticalGrade'>";
                    content += "</div>";
                    content += "<div class='form-group'>";
                    content += "<label> Theoretical Grade </label>";
                    content += "<input type='number' class='form-control' name='TheoricalGrade'>";
                    content += "</div>";
                    content += "</form>";
                    content += "</td>";
                }
            }
            $("#listSubjects").html(content2);
            $("#studentList").html(content);
            $("#select-subject-grade").html(content3);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    //**********************


    // Lấy về danh sách student để thêm vào lớp
    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: 'https://localhost:44320/api/studentResourcesAPI/AccountsIndex',
        headers: {
            "Authorization": Cookies.get("token"),
        },
        success: function (result) {
            var content = "";
            for (var i in result.studentAccounts){
                if(result.studentAccounts[i].account.status != 0){
                    content += "<option value='" + result.studentAccounts[i].accountId + "'>" + result.studentAccounts[i].account.generalInformation.name + "</option>"
                }
            }
            $("#select-student").html(content);
            $('#select-student').multiselect({
                enableFiltering: true
            });
            console.log(result)
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    //**********************


    //đẩy ajax lên thêm subject vào lớp
    $(".btn-save-subject").click(function () {
        var chosenSubjects = $("#example-getting-started").val();
        chosenSubjects.push(window.location.href.split("=")[1]);
        $.ajax({
            type: 'POST',
            accepts: 'application/json',
            contentType: 'application/json',
            url: 'https://localhost:44320/api/studentResourcesAPI/AddSubjects',
            headers: {
                "Authorization": Cookies.get("token"),
                "Role": Cookies.get("loggedUserRole"),
            },
            data: JSON.stringify(chosenSubjects),
            success: function (result) {
                window.location.reload();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("error");
            }
        });
    });
    //**********************


    //đẩy ajax lên thêm student vào lớp
    $(".btn-save-student").click(function () {
        var chosenStudents = $("#select-student").val();
        chosenStudents.push(window.location.href.split("=")[1]);
        $.ajax({
            type: 'POST',
            accepts: 'application/json',
            contentType: 'application/json',
            url: 'https://localhost:44320/api/studentResourcesAPI/AddStudents',
            headers: {
                "Authorization": Cookies.get("token"),
                "Role": Cookies.get("loggedUserRole"),
            },
            data: JSON.stringify(chosenStudents),
            success: function (result) {
                window.location.reload();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("error");
            }
        });
    });
    //**********************


    //Thêm điểm cho nhiều student
    $(".add-grade-btn").on('click' , function () {
        $(this).addClass("hidden");
        $(".subject-grade").removeClass("hidden");
    });

    var subjectId = "";

    $(".subject-grade").on('change' , function () {
        subjectId = $(this).val();
        $(".gradeForms").removeClass("hidden");
        $(".gradeForms-title").removeClass("hidden");
    });

    $(".btn-submit-grade").on('click', function () {
        $(".subjectId").each(function () {
            $(this).val($("#select-subject-grade").val());
        });
        var grades = [];
        $(".gradeForm").each(function () {
            var formData = {
                'AccountId': $(this).find('input[name="AccountId"]').val(),
                'SubjectId': $(this).find('input[name="SubjectId"]').val(),
                'AssignmentGrade': $(this).find('input[name="AssignmentGrade"]').val(),
                'PraticalGrade': $(this).find('input[name="PraticalGrade"]').val(),
                'TheoricalGrade': $(this).find('input[name="TheoricalGrade"]').val(),
            };
            grades.push(formData);
        });
        grades = JSON.stringify(grades);
        $.ajax({
            accepts: 'application/json',
            contentType: 'application/json',
            type: 'POST',
            headers: {
                "Authorization": Cookies.get("token"),
                "Role": Cookies.get("loggedUserRole"),
            },
            url: 'https://localhost:44320/api/studentResourcesAPI/AddGrades',
            data: grades,
            success: function (result) {
                swal("Successful");
            },
            error: function (xhr, textStatus, errorThrown) {
                if (xhr.status == 409) {
                    alert("Sinh vien da co diem mon hoc nay");
                }
            }
        });
    });
    //**********************

    $(document).on('click', '.delete-student' ,function(){
        if(confirm("Delete this Student?")){
            var accountId = $(this).attr("class").split(' ')[1];
            $.ajax({
                accepts: 'application/json',
                contentType: 'application/json',
                type: 'POST',
                headers: {
                    "Authorization": Cookies.get("token"),
                    "Role": Cookies.get("loggedUserRole"),
                },
                url: 'https://localhost:44320/api/studentResourcesAPI/DeleteAccount',
                data: JSON.stringify(accountId),
                success: function (result) {
                    swal({title: "Deleted!", type: "success"},
                        function(){
                            if(!alert('Deleted!')){window.location.reload();}
                        }
                    );
                },
                error: function (xhr, textStatus, errorThrown) {
                }
            });
        }
    });

    $(document).on('click', '.delete-student-from-class' ,function(){
        if(confirm("Delete this Student From Class?")){
            var studentClazz = {
                "AccountId" : $(this).attr("class").split(' ')[1],
                "ClazzId" : window.location.href.split("=")[1],
            };
            $.ajax({
                accepts: 'application/json',
                contentType: 'application/json',
                type: 'POST',
                headers: {
                    "Authorization": Cookies.get("token"),
                    "Role": Cookies.get("loggedUserRole"),
                },
                url: 'https://localhost:44320/api/studentResourcesAPI/DeleteStudentFromClazz',
                data: JSON.stringify(studentClazz),
                success: function (result) {
                    swal({title: "Deleted!", type: "success"},
                        function(){
                            if(!alert('Deleted!')){window.location.reload();}
                        }
                    );
                },
                error: function (xhr, textStatus, errorThrown) {
                }
            });
        }
    });

    $(document).on('click', '.delete-subject' ,function(){
        if(confirm("Delete this Subject?")){
            var subjectId = $(this).attr("class").split(' ')[1];
            $.ajax({
                accepts: 'application/json',
                contentType: 'application/json',
                type: 'POST',
                headers: {
                    "Authorization": Cookies.get("token"),
                    "Role": Cookies.get("loggedUserRole"),
                },
                url: 'https://localhost:44320/api/studentResourcesAPI/DeleteSubject',
                data: JSON.stringify(subjectId),
                success: function (result) {
                    swal({title: "Deleted!", type: "success"},
                        function(){
                            if(!alert('Deleted!')){window.location.reload();}
                        }
                    );
                },
                error: function (xhr, textStatus, errorThrown) {
                }
            });
        }
    });

    $(document).on('click', '.delete-subject-from-class' ,function(){
        if(confirm("Delete this Subject From Class?")){
            var clazzSubject = {
                "SubjectId" : $(this).attr("class").split(' ')[1],
                "ClazzId" : window.location.href.split("=")[1],
            };
            $.ajax({
                accepts: 'application/json',
                contentType: 'application/json',
                type: 'POST',
                headers: {
                    "Authorization": Cookies.get("token"),
                    "Role": Cookies.get("loggedUserRole"),
                },
                url: 'https://localhost:44320/api/studentResourcesAPI/DeleteSubjectFromClazz',
                data: JSON.stringify(clazzSubject),
                success: function (result) {
                    swal({title: "Deleted!", type: "success"},
                        function(){
                            if(!alert('Deleted!')){window.location.reload();}
                        }
                    );
                },
                error: function (xhr, textStatus, errorThrown) {
                }
            });
        }
    });
});