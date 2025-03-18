// Retrieve projects from localStorage, or return an empty array if none exist
function getProjects() {
    const data = localStorage.getItem("projects");
    return data ? JSON.parse(data) : [];
}
  
  // Save projects back to localStorage
function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function renderProjects() {
    const projects = getProjects();
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = ""; // Clear existing list
  
    projects.forEach((project, index) => {
      const div = document.createElement("div");
      div.classList.add("crud-project");
      div.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><strong>Date:</strong> ${new Date(project.date).toLocaleDateString()}</p>
        <button data-index="${index}" class="edit-btn">Edit</button>
        <button data-index="${index}" class="delete-btn">Delete</button>
      `;
      projectsList.appendChild(div);
    });
  }

document.getElementById("crud-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const indexField = document.getElementById("project-index");
    const index = Number(indexField.value);

    const title = document.getElementById("project-title").value;
    const imgSrc = document.getElementById("project-imgSrc").value;
    const altText = document.getElementById("project-altText").value;
    const description = document.getElementById("project-description").value;
    const date = document.getElementById("project-date").value;

    let projects = getProjects();

  // Create a new project object
    const newProject = { title, imgSrc, altText, description, date };

    if (index === -1) {
        // Create: Append new project
        projects.push(newProject);
    } else {
    // Update: Replace the project at that index
        projects[index] = newProject;
    }

    saveProjects(projects);
    renderProjects();
    // Reset form after submission
    document.getElementById("crud-form").reset();
    indexField.value = -1;
});

// Use event delegation for edit and delete buttons
document.getElementById("projects-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const index = e.target.getAttribute("data-index");
      const projects = getProjects();
      const project = projects[index];
  
      // Populate the form with the project data for editing
      document.getElementById("project-index").value = index;
      document.getElementById("project-title").value = project.title;
      document.getElementById("project-imgSrc").value = project.imgSrc;
      document.getElementById("project-altText").value = project.altText;
      document.getElementById("project-description").value = project.description;
      document.getElementById("project-date").value = project.date;
    } else if (e.target.classList.contains("delete-btn")) {
      const index = e.target.getAttribute("data-index");
      let projects = getProjects();
      projects.splice(index, 1); // Remove the project at the given index
      saveProjects(projects);
      renderProjects();
    }
});

document.getElementById("reset-form").addEventListener("click", () => {
    document.getElementById("crud-form").reset();
    document.getElementById("project-index").value = -1;
});

window.addEventListener("DOMContentLoaded", () => {
  renderProjects();
});
