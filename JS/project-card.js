// project-card.js
class ProjectCard extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		// Get the HTML content with the current date


		// Attach styles and HTML content to the component
		this.innerHTML = '';
		this.innerHTML += content;
	}
}

// Define the custom element
customElements.define('project-card', ProjectCard);