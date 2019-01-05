$(".add-grade-btn").click(function () {
   $(this).addClass("hidden");
   $(".subject-grade").removeClass("hidden");
});

var subjectId = "";

$(".subject-grade").change(function () {
    subjectId = $(this).val();
    $(".gradeForms").removeClass("hidden");
    $(".gradeForms-title").removeClass("hidden");
});

$(".btn-submit-grade").click(function (){
    var formDatas = [];
    $(".gradeForm").each(function () {
       var formData = $(this).serializeArray();
       formDatas.push(formData);
    });
    console.log(formDatas)
    // $.ajax({
    //     type: 'POST',
    //     url: '/Accounts/AddGrades',
    //     data: formData,
    //     success: function () {
    //         alert("success");
    //     },
    //     error: function (xhr, textStatus, errorThrown) {
    //         if (xhr.status == 409) {
    //             alert("Sinh vien da co diem mon hoc nay");
    //         }
    //     }
    // });
});



