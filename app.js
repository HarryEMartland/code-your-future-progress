$(function () {

    var progressTemplate = Handlebars.compile($("#progressTemplate").html());

    var dataPromise = $.when(
        $.getJSON("users.json"),
        $.getJSON("tasks.json"),
        $.getJSON("optionalTasks.json")
    ) .fail(function (e) {
        console.log("error", e);
    });

    $('#applicantName').change(function () {
        var name = $('#applicantName').val().toUpperCase();
        dataPromise.done(function (users, tasks, optionalTasks) {
            $.each(users[0], function (id, user) {
                if (user.name.toUpperCase() === name) {
                    $('#content').html(progressTemplate(createProgressContext(user, name, tasks[0], optionalTasks[0])))
                }
            })
        })
    });

    function createProgressContext(userData, name, tasks, optionalTasks) {
        var totalPercentage = 0;
        $.each(tasks, function (type, info) {
            if (userData[type]) {
                totalPercentage = totalPercentage + info.persentage;
                info.complete = true;
            } else {
                info.complete = false;
            }
        });

        $.each(optionalTasks, function (type, info) {
            info.complete = userData[type];
        });

        return {
            name:name,
            userData: userData,
            totalPercentage: totalPercentage,
            tasks: tasks,
            others: optionalTasks
        };
    }

});