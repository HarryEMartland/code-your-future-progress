$(function () {

    var progressTemplate = Handlebars.compile($("#progressTemplate").html());

    var tasks = {
        motivationLetter: {
            displayName: "Motivation Letter",
            persentage: 10,
            description: "Write a 300 word letter answering the following questions. " +
            "why you want to start on the CodeYourFuture cource? Where do you think you will be in 5 years time? " +
            "Email your completed letter to contact@codeyourfuture.co."
        },
        introductoryTutorials: {
            displayName: "Introductory Tutorials",
            persentage: 20,
            description: "Complete the introductory tutorials on " +
            "<a href='https://www.khanacademy.org/computing/computer-programming/html-css'>Khan Academy</a> or Sololearn if you only have acces to a phone." +
            "Solo learn has two tutorials <a href='https://www.sololearn.com/Course/HTML/'>HTML</a> and <a href='https://www.sololearn.com/Course/CSS/'>CSS</a>"
        },
        freeCodeCamp: {
            displayName: "Free Code Camp Html and CSS",
            persentage: 20,
            description: "Complete the <a href='https://www.freecodecamp.org/challenges/learn-how-freecodecamp-works'>first cource</a> on Free Code Camp."
        },
        tributePage: {
            displayName: "Tribute Page",
            persentage: 40,
            description: "Folow the code camp <a href'https://www.freecodecamp.org/challenges/build-a-tribute-page'>here</a> and create your own tribute page for someone." +
            "Once complete email a link to your site to contact@codeyourfuture.co"
        },
        tributePageFeedback: {
            displayName: "Tribute Page Feedback",
            persentage: 10,
            description: "Once you have completed your tribute page a mentor will give you some feedback and some adjustments. " +
            "Once you have made these ajustments you will be accepted onto the cource"
        }
    };

    var others = {
        githubAccount: {
            displayName: "Signed up to <a href='http://github.com' target='_blank'>Github.com</a>",
            image: "https://assets-cdn.github.com/images/modules/logos_page/Octocat.png",
            link: "http://github.com"
        },
        gitterAccount: {
            displayName: "Signed up to <a href='https://gitter.im/' target='_blank'>gitter.im</a>",
            image: "http://insights.ubuntu.com/wp-content/uploads/fadf/gitter.png",
            link: "https://gitter.im/"
        }
    };

    var usersPromise = $.get("users.json")
        .fail(function (e) {
            console.log("error", e);
        });

    $('#applicantName').change(function () {
        var name = $('#applicantName').val().toUpperCase();
        usersPromise.done(function (users) {
            $.each(users, function (id, user) {
                if (user.name.toUpperCase() === name) {
                    $('#content').html(progressTemplate(createProgressContext(user, name)))
                }
            })
        })
    });

    function createProgressContext(userData, name) {
        var totalPercentage = 0;
        $.each(tasks, function (type, info) {
            if (userData[type]) {
                totalPercentage = totalPercentage + info.persentage;
                info.complete = true;
            } else {
                info.complete = false;
            }
        });

        $.each(others, function (type, info) {
            info.complete = userData[type];
        });

        return {
            name:name,
            userData: userData,
            totalPercentage: totalPercentage,
            tasks: tasks,
            others: others
        };
    }

});