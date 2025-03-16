// HW4 Part 3 JavaScript Based Validation, Masking, and Length Reporting

// Setups
const form = document.querySelector('#contact form[action="https://httpbin.org/post"]'); 
const nameInput = document.getElementById("intro-name");
const emailInput = document.getElementById("intro-email");
const commentTextarea = document.getElementById("intro-message");


// The dedicated message areas
const infoOutput = document.getElementById("info-message");
const errorOutput = document.getElementById("error-message");

let form_errors = [];
const formErrorsHiddenInput = document.getElementById("form-errors"); // your hidden field


// Part1: Validate the form

// Validate the name
nameInput.addEventListener("input", function(e) {
    // Define your allowed pattern, here only letters and spaces
    const pattern = /^[A-Za-z\s]*$/;
    
    if (!pattern.test(nameInput.value)) {
        // The user typed something outside allowed chars
        errorOutput.textContent = "Only letters and spaces are allowed in the name.";

        // Log the error
        form_errors.push({
            fieldName: "name",
            errorType: "disallowedCharacter",
            userValue: nameInput.value, // the last typed character
        });

        console.log("Errors logged:", form_errors); // see inside Log the error

        nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, "");

        // Flash the field
        nameInput.classList.add("flash-error");
        setTimeout(() => {
            nameInput.classList.remove("flash-error");
            errorOutput.textContent = "";
        }, 3000); // remove message after 3 seconds
    }
});

// Validate the email
emailInput.addEventListener("input", function(e) {
    // Define your allowed pattern, here only letters and spaces
    const pattern = /^[A-Za-z0-9@._-]*$/;
    
    if (!pattern.test(emailInput.value)) {
        errorOutput.textContent = "Please enter a valid email (valid: A-Z, a-z, number, -, _, '@', and '.').";

        // Log the error
        form_errors.push({
            fieldName: "email",
            errorType: "disallowedCharacter",
            userValue: emailInput.value, // the last typed character
        });

        console.log("Errors logged:", form_errors); // see inside Log the error

        emailInput.value = emailInput.value.replace(/[^A-Za-z0-9@._-]/g, "");

        // Flash the field
        emailInput.classList.add("flash-error");
        setTimeout(() => {
            emailInput.classList.remove("flash-error");
            errorOutput.textContent = "";
        }, 3000); // remove message after 3 seconds
    }
});

// Part 2: The Countdown on comment area
commentTextarea.addEventListener("input", function() {
    const max = 250;
    const currentLength = commentTextarea.value.length;
    const remaining = max - currentLength;
    commentTextarea.style.outline = "none";

    // Visual feedback (Green -> Yellow -> Red)
    if (remaining < 10) {
        commentTextarea.style.border = "2px solid red";
    } else if (remaining < max / 2) {
        commentTextarea.style.border = "2px solid yellow";
    } else {
        commentTextarea.style.border = "2px solid green";
    }

    // show a user-facing message
    infoOutput.textContent = `Characters remaining: ${remaining}`;
    
    // If they somehow go beyond (by pasting?), remove the extra
    if (currentLength == max || currentLength > max) {

        // Flash the field
        commentTextarea.classList.add("flash-error");
        errorOutput.textContent = "Your message is too long. Please keep it under 250 characters.";

        setTimeout(() => {
            commentTextarea.classList.remove("flash-error");
            errorOutput.textContent = "";
        }, 5000); // remove message after 5 seconds
        console.log("Errors logged:", form_errors);
        // Log the error
        form_errors.push({
            fieldName: "comments",
            errorType: "tooLong",
        });
        console.log("Errors logged:", form_errors);  // see inside Log the error
    }
});

// Part 3: Submit the form
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Clear any old error messages
    errorOutput.textContent = "";
    infoOutput.textContent = "";

    // If the built-in checkValidity() fails, we can show default messages or setCustomValidity
    if (!form.checkValidity()) {
        // Let the browser show default tooltips or messages
        form.reportValidity();
        return; // Stop so user can fix the invalid fields
    }
    
    // If we get here, everything is valid
    formErrorsHiddenInput.value = JSON.stringify(form_errors);

    // Submit the form for real
    form.submit();
});


// HW4 Part 4: Dark & Light Theme Switcher 
// Select the toggle button
const themeToggle = document.getElementById("theme-toggle");

// Right after selecting the toggle button, make it visible:
themeToggle.style.display = "block";

// Check localStorage for the saved theme, default to 'light'
const currentTheme = localStorage.getItem("theme") || "light";

// Apply the saved theme on page load
if (currentTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Light Mode"; // Button now shows option to switch to light mode
} else {
  // Light mode is default, no extra class needed
  themeToggle.textContent = "🌙 Dark Mode";
}

// Listen for a click on the toggle button
themeToggle.addEventListener("click", () => {
  // Toggle the "dark" class on the body
  const isDark = document.body.classList.toggle("dark");
  
  // Save the current theme in localStorage
  localStorage.setItem("theme", isDark ? "dark" : "light");
  
  // Update the button text to reflect the new state
  themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});