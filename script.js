// Project Data
const projects = [
    {
        title: "Online Book Store",
        description: "A comprehensive platform for browsing and purchasing books online.",
        features: ["User Authentication", "Search & Filter Books", "Cart Management", "Secure Checkout"],
        icon: "fa-book",
        image: "project-bookstore.png" // User provided image
    },
    {
        title: "Real Estate Services",
        description: "Connects buyers and sellers with advanced property listings.",
        features: ["Property Listings", "Map Integration", "Agent Contact Profile", "Virtual Tours"],
        icon: "fa-building",
        image: "project-realestate.jpg"
    },
    {
        title: "Internship Management",
        description: "Virtual system to manage intern tasks and progress.",
        features: ["Task Assignment", "Progress Tracking", "Report Generation", "Certificate Issuance"],
        icon: "fa-users-cog",
        image: "project-internship.webp"
    },
    {
        title: "Drag & Drop List",
        description: "Interactive todo list with drag and drop capabilities.",
        features: ["Drag 'n' Drop UI", "Local Storage Save", "Priority Sorting", "Theming"],
        icon: "fa-list-ul",
        image: "project-dragdrop.png"
    }
];

// Project Carousel Logic
let currentProjectIndex = 0;
const projectContent = document.getElementById('current-project');
const indicatorsContainer = document.querySelector('.project-indicators');

function renderProject(index) {
    const project = projects[index];

    // Check if project has an image, otherwise use icon
    const visualContent = project.image
        ? `<img src="${project.image}" alt="${project.title}" class="project-img-full">`
        : `<i class="fas ${project.icon}"></i>`;

    // Instant update instead of fade timeout to prevent visibility issues
    projectContent.innerHTML = `
        <div class="project-info fade-in-right">
            <div class="project-header">
                <h3>${project.title}</h3>
                <span class="project-counter">${index + 1} / ${projects.length}</span>
            </div>
            <p>${project.description}</p>
            <ul>
                ${project.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
            </ul>
            <a href="#" class="btn primary" onclick="openModal(${index}); return false;">View Details</a>
        </div>
        <div class="project-visual fade-in-up ${project.image ? 'has-image' : ''}">
            ${visualContent}
        </div>
    `;

    updateIndicators();
}

function updateIndicators() {
    indicatorsContainer.innerHTML = projects.map((_, i) =>
        `<div class="indicator ${i === currentProjectIndex ? 'active' : ''}" onclick="goToProject(${i})"></div>`
    ).join('');
}

function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    renderProject(currentProjectIndex);
}

function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    renderProject(currentProjectIndex);
}

function goToProject(index) {
    currentProjectIndex = index;
    renderProject(currentProjectIndex);
}

document.querySelector('.next-btn').addEventListener('click', nextProject);
document.querySelector('.prev-btn').addEventListener('click', prevProject);

// Initialize Project
renderProject(0);

// Message System
const messageForm = document.getElementById('contact-form');
const messageList = document.getElementById('message-list');

function addMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${type}`;
    msgDiv.innerHTML = `
        <p>${text}</p>
        <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;
    messageList.appendChild(msgDiv);
    messageList.scrollTop = messageList.scrollHeight;
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message');
    const msgText = messageInput.value;

    if (!msgText) return;

    // Send Message (Simulated)
    addMessage(msgText, 'sent');
    messageInput.value = '';

    // Simulate Reply
    setTimeout(() => {
        const replies = [
            "Thanks for reaching out! I'll get back to you shortly.",
            "Got your message. Let's connect soon.",
            "Interesting proposal. I'm open to discussing this.",
            "Hi! Thanks for visiting my portfolio.\nYou can contact me at +1 234 567 890"
        ];

        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        addMessage(randomReply, 'received');
    }, 2000);

    setTimeout(() => {
    addMessage(
        'You can also reach me on WhatsApp: <a href="https://wa.me/9071589148" target="_blank">Chat Now</a>',
        'received'
    );
}, 2500);
});





// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Active Navigation Highlight (Scroll Spy)
const sections = document.querySelectorAll('section, header');
const navItems = document.querySelectorAll('.nav-links li a');

const observerOptions = {
    threshold: 0.3 // Trigger when 30% of section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            // Remove active from all
            navItems.forEach(link => link.classList.remove('active'));
            // Add active to current
            const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Modal Logic
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');

function openModal(index) {
    const project = projects[index];
    modalContent.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><strong>Key Features:</strong></p>
        <ul>
            ${project.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div class="tech-stack">
            <span class="tech-tag">HTML5</span>
            <span class="tech-tag">CSS3</span>
            <span class="tech-tag">JavaScript</span>
            <span class="tech-tag">Git</span>
        </div>
        <br>
        <a href="#" class="btn primary" onclick="closeModal(); return false;">Close Details</a>
    `;
    modal.classList.add('open');
}

function openProfileModal() {
    modalContent.innerHTML = `
        <h3>Chaitra GS</h3>
        <p class="role" style="color: var(--primary); margin-bottom: 1rem;">MCA Student & Aspiring Developer</p>
        <p>Passionate about building scalable web applications and intuitive user interfaces. Currently pursuing MCA and specializing in Full Stack Development.</p>
        
        <div style="margin: 1.5rem 0; text-align: left;">
            <p><strong><i class="fas fa-graduation-cap"></i> Education:</strong><br>
            Master of Computer Applications (MCA)<br>
            <span style="font-size: 0.9rem; color: var(--text-dim);">Expected 2024</span></p>
        </div>

        <div class="tech-stack" style="justify-content: center;">
            <span class="tech-tag">Web Development</span>
            <span class="tech-tag">UI/UX Design</span>
            <span class="tech-tag">Python/Django</span>
            <span class="tech-tag">React</span>
        </div>
        <br>
        <a href="#" class="btn primary" onclick="closeModal(); return false;">Close Profile</a>
    `;
    modal.classList.add('open');
}

function closeModal() {
    modal.classList.remove('open');
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
