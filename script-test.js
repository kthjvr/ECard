// Guest List Section JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const checkGuestBtn = document.getElementById('checkGuestBtn');
    const guestListContent = document.getElementById('guestListContent');
    const guestCards = document.querySelectorAll('.guest-card');
    const thankYouMessage = document.getElementById('thankYouMessage');

    // Mobile button functionality
    if (checkGuestBtn && guestListContent) {
        checkGuestBtn.addEventListener('click', function () {
            guestListContent.classList.toggle('show');

            if (guestListContent.classList.contains('show')) {
                checkGuestBtn.innerHTML = `
                            Hide Guest List
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
                                <path d="m18 15-6-6-6 6"/>
                            </svg>
                        `;

                // Trigger visibility animations
                setTimeout(() => {
                    guestListContent.classList.add('visible');
                    guestCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 150);
                    });
                    setTimeout(() => {
                        thankYouMessage.classList.add('visible');
                    }, guestCards.length * 150 + 200);
                }, 100);

                // Scroll to content on mobile
                setTimeout(() => {
                    guestListContent.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            } else {
                checkGuestBtn.innerHTML = `
                            Check Guest List
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
                                <path d="m9 18 6-6-6-6"/>
                            </svg>
                        `;

                // Remove visibility classes
                guestListContent.classList.remove('visible');
                guestCards.forEach(card => card.classList.remove('visible'));
                thankYouMessage.classList.remove('visible');
            }
        });
    }

    // Intersection Observer for visibility (desktop)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const header = document.getElementById('guestListHeader');
                if (header) header.classList.add('visible');

                if (window.innerWidth > 768) {
                    setTimeout(() => {
                        guestListContent.classList.add('visible');
                        guestCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, index * 150);
                        });
                        setTimeout(() => {
                            thankYouMessage.classList.add('visible');
                        }, guestCards.length * 150 + 200);
                    }, 300);
                }
            }
        });
    }, {
        threshold: 0.1
    });

    const guestListSection = document.getElementById('guest-list-section');
    if (guestListSection) {
        observer.observe(guestListSection);
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            // Desktop: Show content, hide button
            guestListContent.style.display = 'block';
            if (guestListContent.classList.contains('visible')) {
                guestCards.forEach(card => card.classList.add('visible'));
                thankYouMessage.classList.add('visible');
            }
        } else {
            // Mobile: Reset to button state if not shown
            if (!guestListContent.classList.contains('show')) {
                guestListContent.style.display = 'none';
                guestListContent.classList.remove('visible');
                guestCards.forEach(card => card.classList.remove('visible'));
                thankYouMessage.classList.remove('visible');
            }
        }
    });
});


/* ===================================
   DRESS CODE, RDVP FUNCTIONALITY
   =================================== */
document.addEventListener('DOMContentLoaded', function () {
    const rsvpForm = document.getElementById('rsvpForm');
    const formLoading = document.getElementById('formLoading');

    // Simulate form loading
    setTimeout(() => {
        if (formLoading) {
            formLoading.style.display = 'none';
        }
        if (rsvpForm) {
            rsvpForm.style.display = 'block';
        }
    }, 2000);

    // Handle form load event
    if (rsvpForm) {
        rsvpForm.addEventListener('load', function () {
            if (formLoading) {
                formLoading.style.display = 'none';
            }
            rsvpForm.style.display = 'block';
        });
    }

    // RSVP Section Observer
    const rsvpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rsvpCard = entry.target.querySelector('.rsvp-card');
                if (rsvpCard) rsvpCard.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Dress Code Section Observer
    const dressCodeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const header = entry.target.querySelector('.section-header');
                const colorTheme = entry.target.querySelector('.color-theme');
                const content = entry.target.querySelector('.dress-code-content');

                if (header) header.classList.add('visible');
                if (colorTheme) setTimeout(() => colorTheme.classList.add('visible'), 200);
                if (content) setTimeout(() => content.classList.add('visible'), 400);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe sections
    const dressCodeSection = document.getElementById('dress-code');
    if (dressCodeSection) dressCodeObserver.observe(dressCodeSection);

    const rsvpSection = document.getElementById('rsvp-section');
    if (rsvpSection) rsvpObserver.observe(rsvpSection);
});





/* ===================================
   EVENT DETAILS FUNCTIONALITY
   =================================== */

// Event details
const eventDetails = {
    title: "Damaris Alexa's 7th Birthday Party",
    start: "2025-11-02T10:00:00",
    end: "2025-11-01T14:00:00",
    location: "Captain's Place (Private Pool and Events Place), 24XP+J63, Malvar, Batangas, Philippines",
    description: "Join us for an amazing birthday celebration with games, cake, and fun!"
};

function initializeEventDetails() {
    // Initialize FullCalendar
    const calendarEl = document.getElementById('calendar');
    if (calendarEl && typeof FullCalendar !== 'undefined') {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            initialDate: '2025-11-02',
            height: 'auto',
            dayHeaderFormat: { weekday: 'narrow' },
            headerToolbar: {
                left: 'title',
                center: '',
                right: ''
            },
            events: [
                {
                    title: eventDetails.title,
                    start: eventDetails.start,
                    end: eventDetails.end,
                    backgroundColor: '#FF2D95',
                    borderColor: '#FF2D95',
                    textColor: '#FFFFFF'
                }
            ],
            eventClick: function (info) {
                info.jsEvent.preventDefault();
                alert(`🎉 ${info.event.title}\n📅 ${info.event.start.toLocaleDateString()}\n⏰ ${info.event.start.toLocaleTimeString()} - ${info.event.end.toLocaleTimeString()}`);
            }
        });
        calendar.render();
    }

    // Add to Google Calendar functionality
    const addToCalendarBtn = document.getElementById('addToCalendar');
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', addToGoogleCalendar);
    }
}

function addToGoogleCalendar() {
    const startDate = new Date(eventDetails.start).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const endDate = new Date(eventDetails.end).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;

    window.open(googleCalendarUrl, '_blank');
}

// Initialize visibility observer for event details
const eventDetailsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const container = entry.target;
            container.classList.add('event-details-animated');

            // Add visible class to sections with slight delay
            setTimeout(() => {
                container.querySelector('.calendar-section').classList.add('visible');
            }, 100);

            setTimeout(() => {
                container.querySelector('.map-section').classList.add('visible');
            }, 300);

            // Initialize calendar after animation
            setTimeout(() => {
                initializeEventDetails();
            }, 500);
        }
    });
});

eventDetailsObserver.observe(document.getElementById('event-details'));

/* ===================================
   STORY BOOK FUNCTIONALITY
   =================================== */
const stories = [
    {
        title: "My Birthday Adventure",
        image: "https://ik.imagekit.io/e3wiv79bq/cover.png?updatedAt=1757587967248",
        text: "Come along on a magical journey of my life and see what you might have missed from my birthdays!"
    },
    {
        title: "My First Birthday! 🎂",
        image: "/images/First-Birthday.jpg",
        text: "One year old and ready to explore!"
    },
    {
        title: "Two Years of Wonder! 🎈🎈",
        image: "/images/Second-Birthday.jpg",
        text: "Two candles dancing in the breeze! I'm getting bigger and learning so many new things every day."
    },
    {
        title: "Three and Free! 🌟🌟🌟",
        image: "/images/Third-Birthday.jpg",
        text: "Three years of adventures! I can run, jump, and play."
    },
    {
        title: "Fantastic Four! 🚀🚀🚀🚀",
        image: "/images/Sixth-Birthday.jpg",
        text: "Four candles glowing bright!"
    },
    {
        title: "High Five for Five!  🖐️",
        image: "/images/Fifth-Birthday.jpg",
        text: "Five years of growing and learning! I'm getting ready for big adventures and maybe even school soon!"
    },
    {
        title: "Super Six! 🦋🦋🦋🦋🦋🦋",
        image: "/images/Fourth-Birthday.jpg",
        text: "Six wonderful years of birthdays!"
    },
    {
        title: "Time to Celebrate! 🎉✨",
        image: "https://ik.imagekit.io/e3wiv79bq/final-cover.png?updatedAt=1757587967109",
        text: "Get your party hats on, grab the confetti, and let’s make this next birthday the happiest one yet! 🥳"
    },
];

let currentStory = 0;

function initializeStoryIndicators() {
    const indicator = document.getElementById('storyIndicator');
    indicator.innerHTML = ''; // Clear existing dots

    stories.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'story-dot';
        if (index === 0) dot.classList.add('active');
        indicator.appendChild(dot);
    });
}

function updateStory() {
    const storyCard = document.getElementById('storyCard');
    const storyTitle = document.getElementById('storyTitle');
    const storyImage = document.getElementById('storyImage');
    const storyText = document.getElementById('storyText');
    const nextButton = document.getElementById('nextButton');
    const dots = document.querySelectorAll('.story-dot');

    // Add turning animation
    storyCard.classList.add('turning');

    setTimeout(() => {
        // Update content
        const story = stories[currentStory];
        storyTitle.textContent = story.title;
        storyImage.src = story.image;
        storyImage.alt = `Story illustration ${currentStory + 1}`;
        storyText.textContent = story.text;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentStory);
        });

        // Update button text
        if (currentStory === stories.length - 1) {
            nextButton.innerHTML = `Continue to Party! <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
        } else {
            nextButton.innerHTML = `Next <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
        }

        storyCard.classList.remove('turning');
    }, 300);
}

document.getElementById('nextButton').addEventListener('click', () => {
    if (currentStory < stories.length - 1) {
        currentStory++;
        updateStory();
    } else {
        // Move to next section (calendar/map)
        console.log('Moving to next section...');
    }
});

// Initialize visibility when section becomes visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.story-card').classList.add('visible');
        }
    });
});

initializeStoryIndicators();
observer.observe(document.getElementById('story-section'));

/* ===================================
   LOADING SCREEN FUNCTIONALITY
   =================================== */
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.spinner = this.loadingScreen?.querySelector('.spinner');
        this.loadingText = this.loadingScreen?.querySelector('p');

        this.isLoaded = false;
        this.minimumLoadTime = 2000;
        this.loadStartTime = Date.now();

        // Loading messages
        this.messages = [
            "Preparing a surprise...",
            "Setting up the party...",
            "Adding magical touches...",
            "Almost ready!"
        ];
        this.currentMessageIndex = 0;

        this.init();
    }

    init() {
        // Start the loading process
        this.preloadResources();
        this.startMessageCycle();

        // Listen for page load events
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
            window.addEventListener('load', () => this.onWindowLoad());
        } else {
            // DOM is already ready
            this.onDOMReady();
            if (document.readyState === 'complete') {
                this.onWindowLoad();
            } else {
                window.addEventListener('load', () => this.onWindowLoad());
            }
        }
    }

    preloadResources() {
        const imagesToPreload = [
            'https://ik.imagekit.io/e3wiv79bq/huntrix-cake.png',
            'https://ik.imagekit.io/e3wiv79bq/invitation-preview.png'
        ];

        const promises = imagesToPreload.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = src;
            });
        });

        Promise.all(promises).then(() => {
            console.log('Images preloaded');
        });
    }

    startMessageCycle() {
        if (!this.loadingText) return;

        this.messageInterval = setInterval(() => {
            if (this.isLoaded) return;

            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
            this.updateLoadingMessage(this.messages[this.currentMessageIndex]);
        }, 1500);
    }

    updateLoadingMessage(message) {
        if (!this.loadingText) return;

        // Fade out current message
        this.loadingText.style.opacity = '0';
        this.loadingText.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            this.loadingText.textContent = message;
            this.loadingText.style.opacity = '1';
            this.loadingText.style.transform = 'translateY(0)';
        }, 300);
    }

    onDOMReady() {
        console.log('DOM ready');
    }

    onWindowLoad() {
        console.log('Window loaded');
        const loadTime = Date.now() - this.loadStartTime;

        // Ensure minimum loading time for better UX
        const remainingTime = Math.max(0, this.minimumLoadTime - loadTime);

        setTimeout(() => {
            this.hideLoadingScreen();
        }, remainingTime);
    }

    hideLoadingScreen() {
        if (!this.loadingScreen || this.isLoaded) return;

        this.isLoaded = true;

        // Clear message cycling
        if (this.messageInterval) {
            clearInterval(this.messageInterval);
        }

        // Add completion class for final animation
        this.loadingScreen.classList.add('loading-complete');

        // Update final message
        if (this.loadingText) {
            this.updateLoadingMessage('Welcome to the party! 🎉');
        }

        // Hide after animation completes
        setTimeout(() => {
            this.loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                if (this.loadingScreen.parentNode) {
                    this.loadingScreen.style.display = 'none';
                }
                this.onLoadingComplete();
            }, 800);
        }, 1000);
    }

    onLoadingComplete() {
        // Initialize other components after loading
        console.log('Loading complete - initializing app');

        // Trigger confetti celebration
        if (typeof confetti !== 'undefined') {
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#9B4DFF', '#FF2D95', '#4BC9FF', '#FFD700']
                });
            }, 500);
        }

        // Initialize other components
        this.initializeApp();
    }

    initializeApp() {
        // Initialize particles background
        if (typeof tsParticles !== 'undefined') {
            this.initParticles();
        }

        document.body.classList.add('loaded');
        window.dispatchEvent(new CustomEvent('loadingComplete'));
    }

    initParticles() {
        // particle bg
        tsParticles.load("tsparticles", {
            fpsLimit: 30,
            particles: {
                color: {
                    value: "#ffffff"
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "out"
                    }
                },
                number: {
                    value: 100
                },
                opacity: {
                    value: {
                        min: 0.1,
                        max: 1
                    },
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1
                    }
                },
                shape: {
                    type: "circle"
                },
                size: {
                    value: {
                        min: 0.5,
                        max: 2
                    }
                }
            }
        });
    }

    // Public method to manually hide loading
    forceHide() {
        this.hideLoadingScreen();
    }
}
let loadingScreen;
document.addEventListener('DOMContentLoaded', () => {
    loadingScreen = new LoadingScreen();
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState !== 'loading') {
    loadingScreen = new LoadingScreen();
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */
function showLoading(message = 'Loading...') {
    const loadingEl = document.getElementById('loadingScreen');
    const textEl = loadingEl?.querySelector('p');

    if (loadingEl) {
        if (textEl) textEl.textContent = message;
        loadingEl.classList.remove('fade-out');
        loadingEl.style.display = 'flex';
        loadingEl.style.opacity = '1';
        loadingEl.style.visibility = 'visible';
    }
}

// Function to hide loading screen manually
function hideLoading() {
    if (loadingScreen) {
        loadingScreen.forceHide();
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LoadingScreen, showLoading, hideLoading };
}