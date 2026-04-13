// Initialize EmailJS (ONLY ONCE)
(function () {
  emailjs.init("K9Uq8t6it8vPzfzWS");
})();

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phno").value;
  const message = document.getElementById("message").value;

  const radio = document.querySelector('input[name="sub"]:checked')?.value;

  // Validation
  if (!fname) return alert("First name is required");
  if (fname.length > 20) return alert("Max 20 characters allowed");

  if (!lname) return alert("Last name is required");
  if (lname.length > 20) return alert("Max 20 characters allowed");

  if (!email) return alert("Email is required");
  if (!phone) return alert("Phone is required");
  if (!radio) return alert("Please select a subject");

  // LocalStorage
  let users = JSON.parse(localStorage.getItem("User")) || [];

  if (!Array.isArray(users)) {
    users = [];
  }

  const existingUser = users.find(val => val.email === email);

  if (existingUser) {
    existingUser.message = message;
    existingUser.subject = radio;
    alert("Message Updated");
  } else {
    users.push({
      fname,
      lname,
      email,
      phone,
      message,
      subject: radio
    });
    // alert("Your Message Has Been Sent");
  }

  localStorage.setItem("User", JSON.stringify(users));

  // Send Email
  emailjs.sendForm("service_57djyee", "template_gsp1ve5", form)
    .then(() => {
       let popup = document.getElementById("form_popup");
         popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);
      form.reset();
    })
    .catch((error) => {
      console.log(error);
      let popup = document.getElementById("form_popup");
    popup.textContent = "Failed to send email!";
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);
    });
});