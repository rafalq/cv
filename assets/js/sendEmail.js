window.onload = function() {
    var flashMessage = document.getElementById('flash-message');
    function sendMail(contactForm){
        emailjs.send("gmail", "my_cv", {
            "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,
            "project_request": contactForm.projectsummary.value
        })
        .then(
            function(response){
                flashMessage.innerHTML = 'Message sent successfully';
                flashMessage.removeAttribute('id');
                console.log("SUCESS", response);
            },
            function(error){
                flashMessage.removeAttribute('class');
                flashMessage.setAttribute('class', 'alert alert-warning text-center');
                flashMessage.innerHTML = 'Message failed to send';
                flashMessage.removeAttribute('id');
                console.log("FAILED", error);
            });
    }

    document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();
            sendMail(this);
        });
}
