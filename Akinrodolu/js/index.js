const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

// AI Walkthrough with User Name Collection

document.addEventListener('DOMContentLoaded', () => {
    // Create a popup to collect the user's name
    const nameModal = document.createElement('div');
    nameModal.id = 'name-modal';
    nameModal.style.position = 'fixed';
    nameModal.style.top = '0';
    nameModal.style.left = '0';
    nameModal.style.width = '100%';
    nameModal.style.height = '100%';
    nameModal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    nameModal.style.color = '#fff';
    nameModal.style.display = 'flex';
    nameModal.style.flexDirection = 'column';
    nameModal.style.justifyContent = 'center';
    nameModal.style.alignItems = 'center';
    nameModal.style.zIndex = '1000';

    nameModal.innerHTML = `
        <div style="text-align: center; max-width: 600px;">
            <h1>Welcome!</h1>
            <p>Please enter your name to personalize your experience:</p>
            <input id="user-name" type="text" placeholder="Your Name" style="padding: 10px; font-size: 1rem; border-radius: 5px; border: none; width: 80%; margin-bottom: 20px;">
            <button id="submit-name" style="padding: 10px 20px; background: #16e0bd; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
        </div>
    `;

    document.body.appendChild(nameModal);

    document.getElementById('submit-name').addEventListener('click', () => {
        const userName = document.getElementById('user-name').value.trim();
        if (userName) {
            localStorage.setItem('userName', userName);
            nameModal.style.display = 'none';
            startWalkthrough(userName);
        } else {
            alert('Please enter your name.');
        }
    });

    function startWalkthrough(userName) {
        // Generate a welcome message
        const welcomeMessage = `Welcome, ${userName}! Let us guide you through the website.`;

        // Create a walkthrough modal
        const walkthroughModal = document.createElement('div');
        walkthroughModal.id = 'walkthrough-modal';
        walkthroughModal.style.position = 'fixed';
        walkthroughModal.style.top = '0';
        walkthroughModal.style.left = '0';
        walkthroughModal.style.width = '100%';
        walkthroughModal.style.height = '100%';
        walkthroughModal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        walkthroughModal.style.color = '#fff';
        walkthroughModal.style.display = 'flex';
        walkthroughModal.style.flexDirection = 'column';
        walkthroughModal.style.justifyContent = 'center';
        walkthroughModal.style.alignItems = 'center';
        walkthroughModal.style.zIndex = '1000';

        // Add content to the modal
        walkthroughModal.innerHTML = `
            <div style="text-align: center; max-width: 600px;">
                <h1>👋 Hello, ${userName}!</h1>
                <p>${welcomeMessage}</p>
                <p>Let us guide you through the website!</p>
                <button id="start-walkthrough" style="padding: 10px 20px; background: #16e0bd; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Start Walkthrough</button>
                <button id="skip-walkthrough" style="margin-top: 10px; padding: 10px 20px; background: #555; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Skip</button>
            </div>
        `;

        document.body.appendChild(walkthroughModal);

        // Handle walkthrough steps
        const steps = [
            { selector: '#home', message: 'This is the introduction section where you can learn about me.' },
            { selector: '#services', message: 'Here are the services I offer.' },
            { selector: '#work', message: 'Check out my portfolio to see my work.' },
            { selector: '#blog', message: 'Explore my blog for insights and articles.' },
            { selector: '#resources', message: 'Discover resources to help you grow.' }
        ];

        let currentStep = 0;

        function showStep(stepIndex) {
            const step = steps[stepIndex];
            if (!step) {
                walkthroughModal.style.display = 'none';
                return;
            }

            const element = document.querySelector(step.selector);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                walkthroughModal.innerHTML = `
                    <div style="text-align: center; max-width: 600px;">
                        <h1>Step ${stepIndex + 1}</h1>
                        <p>${step.message}</p>
                        <button id="next-step" style="padding: 10px 20px; background: #16e0bd; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Next</button>
                        <button id="end-walkthrough" style="margin-top: 10px; padding: 10px 20px; background: #555; color: #fff; border: none; border-radius: 5px; cursor: pointer;">End Walkthrough</button>
                    </div>
                `;

                document.getElementById('next-step').addEventListener('click', () => {
                    showStep(stepIndex + 1);
                });

                document.getElementById('end-walkthrough').addEventListener('click', () => {
                    walkthroughModal.style.display = 'none';
                });
            }
        }

        // Start walkthrough
        document.getElementById('start-walkthrough').addEventListener('click', () => {
            showStep(currentStep);
        });

        // Skip walkthrough
        document.getElementById('skip-walkthrough').addEventListener('click', () => {
            walkthroughModal.style.display = 'none';
        });
    }
});
