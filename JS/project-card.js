// project-card.js
class ProjectCard extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		// Get the HTML content with the current date
        const currentDate = new Date();
		const content = `
            <h3>My Recent Project</h3>
            <picture>
                <img src="images/Hackatron_device.jpg" alt="The device that detect the surrounding at night" />
            </picture>            
            <p>This project is the Hackatron project that I and my friend join to create the device that allow people to detect other people at night when there is little light to see
            . This device use Sonar and infralate detector as the detect device and can attact to your arm when people moving.</p>
            <a href="images/Hackatron_device.jpg" target="_blank" rel="noopener noreferrer">
                View Full Image
            </a>
            <br />
            <span>${currentDate}</span>
        `;

		// Attach styles and HTML content to the component
		this.innerHTML = '';
		this.innerHTML += content;
	}
}

// Define the custom element
customElements.define('project-card', ProjectCard);