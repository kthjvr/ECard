
class BirthdayInvitationController {
    constructor() {
        this.isEnvelopeOpened = false;
        this.isMusicPlaying = false;
        this.countdownInterval = null;
        this.giftBoxState = null;
        this.currentPage = 0;

        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupEventListeners();
        this.setupCountdown();
        this.startFloatingBalloons();
        this.setupTouchSupport();
    }

    // Loading Screen Management
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');

        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            mainContent.classList.add('visible');

            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 2500);
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Envelope click handler
        const envelope = document.getElementById('envelope');
        envelope.addEventListener('click', () => this.openEnvelope());

        // Keyboard support for envelope
        envelope.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openEnvelope();
            }
        });

        // Music controls
        const musicBtn = document.getElementById('musicBtn');
        musicBtn.addEventListener('click', () => this.toggleMusic());

        // RSVP button
        const rsvpBtn = document.getElementById('rsvpBtn');
        rsvpBtn.addEventListener('click', () => this.openRSVPModal());

        // Share button
        const shareBtn = document.getElementById('shareBtn');
        shareBtn.addEventListener('click', () => this.openShareModal());

        // Modal controls
        this.setupModals();

        // Share options
        this.setupShareHandlers();

        // Window events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('beforeunload', () => this.cleanup());
    }

    // Envelope Opening
    openEnvelope() {
        if (this.isEnvelopeOpened) return;

        this.isEnvelopeOpened = true;
        const envelope = document.getElementById('envelope');
        const lid = document.getElementById('lid');
        const letter = document.getElementById('letter');
        const openSound = document.getElementById('openSound');
        const lidOne = document.getElementById('lid1');
        const storybookSection = document.getElementById('storybook');

        if (lidOne) {
            lidOne.style.display = 'none';
        }

        // Disable envelope interaction
        envelope.style.pointerEvents = 'none';

        // Play opening sound
        if (openSound) {
            openSound.play().catch(() => {
                console.log('Audio play failed - user interaction required');
            });
        }

        // Animate flap opening
        lid.classList.add('opened');

        // Animate letter appearance
        setTimeout(() => {
            letter.classList.add('visible');
        }, 500);

        // Show story book
        setTimeout(() => {
            storybookSection.classList.add('visible');
            this.showStoryBook();

            // Auto-play music after interaction
            this.startMusic();

            // Scroll to invitation card on mobile
            if (window.innerWidth <= 768) {
                storybookSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 1200);
    }

    showInvitationAfterStory() {
        const inviteDetails = document.getElementById('inviteDetails');

        setTimeout(() => {
            inviteDetails.classList.add('visible');

            if (window.innerWidth <= 768) {
                const elementTop = inviteDetails.getBoundingClientRect().top + window.scrollY;
                const offset = 120;
                window.scrollTo({
                    top: elementTop - offset,
                    behavior: 'smooth'
                });
            }
        }, 1000);
    }

    showStoryBook() {
        // Gift Box Animation State
        const initState = {
            move: "move",
            jump: "",
            rotated: "",
            rotating: ""
        };

        // Initialize propertues
        if (!this.giftBoxState) {
            this.giftBoxState = { ...initState };
        }
        if (!this.currentPage) {
            this.currentPage = 0;
        }

        const pages = document.querySelectorAll('.page');
        const totalPages = pages.length;
        const progressBar = document.getElementById('progressBar');
        const giftBoxBtn = document.getElementById('giftBoxBtn');
        const giftBoxLid = document.getElementById('giftBoxLid');
        const jumpCharacter = document.getElementById('jumpCharacter');
        const self = this;

        // Gift Box Animation Functions
        function updateGiftBoxState(newState) {
            self.giftBoxState = { ...self.giftBoxState, ...newState };
            applyGiftBoxClasses();
        }

        function applyGiftBoxClasses() {
            const { move, jump, rotated, rotating } = self.giftBoxState;

            // Apply classes to gift-lid
            if (giftBoxLid) {
                giftBoxLid.className = `gift-lid ${move} ${rotating} ${rotated}`.trim();
            }

            // Apply jump class to character
            if (jumpCharacter) {
                jumpCharacter.className = `jump-character ${jump}`.trim();
            }
        }

        function animateGiftBox() {
            const isDone = self.giftBoxState.rotated === "rotated";

            if (!isDone) {
                updateGiftBoxState({ rotating: "rotating" });

                setTimeout(() => {
                    updateGiftBoxState({ jump: "jump" });
                    self.triggerBirthdayConfetti?.();
                }, 300);

                setTimeout(() => {
                    updateGiftBoxState({ rotated: "rotated" });
                    nextPage();

                    setTimeout(() => {
                        closeGiftBox();
                    }, 1300);
                }, 1000);
            } else {
                updateGiftBoxState(initState);
                nextPage();
            }

            const moving = self.giftBoxState.move === "move" ? "" : "move";
            updateGiftBoxState({ move: moving });
        }

        function closeGiftBox() {
            if (self.giftBoxState.rotated === "rotated") {
                updateGiftBoxState({ jump: "" });

                if (giftBoxLid) {
                    giftBoxLid.style.animation = "rotating-back 0.7s ease-out forwards";

                    setTimeout(() => {
                        updateGiftBoxState(initState);
                        giftBoxLid.style.animation = "";
                    }, 700);
                }
            }
        }

        // Storybook Functions
        function updateProgress() {
            if (progressBar) {
                const progress = (self.currentPage / (totalPages - 1)) * 100;
                progressBar.style.width = progress + '%';
            }
        }

        function showPage(pageIndex) {
            pages.forEach((page, index) => {
                page.classList.remove('active', 'prev');
                if (index === pageIndex) {
                    page.classList.add('active');
                } else if (index < pageIndex) {
                    page.classList.add('prev');
                }
            });
            updateProgress();
        }

        function nextPage() {
            self.currentPage = (self.currentPage + 1) % totalPages;
            showPage(self.currentPage);

            // Check if we've reached the last page
            if (self.currentPage === totalPages - 1) {
                setTimeout(() => {
                    self.showInvitationAfterStory();
                }, 1000);
            }
        }

        if (giftBoxBtn && !giftBoxBtn.hasAttribute('data-listener-added')) {
            giftBoxBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                animateGiftBox();
            });
            giftBoxBtn.setAttribute('data-listener-added', 'true');
        }

        // Initialize display
        if (totalPages > 0) {
            showPage(0);
            updateProgress();
            applyGiftBoxClasses();
        }
    }

    // Birthday Confetti Effect
    triggerBirthdayConfetti() {
        const duration = 4000;
        const animationEnd = Date.now() + duration;
        const colors = ['#ff6b35', '#ffd23f', '#4ecdc4', '#45b7d1', '#fd79a8', '#6c5ce7'];

        // Multiple confetti bursts with birthday colors
        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            const particleCount = 70 * (timeLeft / duration);

            // Left side burst
            confetti({
                particleCount,
                startVelocity: 35,
                spread: 70,
                origin: { x: this.randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: colors,
                shapes: ['circle', 'square'],
                ticks: 80
            });

            // Right side burst
            confetti({
                particleCount,
                startVelocity: 35,
                spread: 70,
                origin: { x: this.randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: colors,
                shapes: ['circle', 'square'],
                ticks: 80
            });
        }, 250);

        // Special birthday cake confetti
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6 },
                shapes: ['circle'],
                colors: ['#ff6b35', '#ffd23f', '#fd79a8'],
                startVelocity: 45,
                gravity: 0.8
            });
        }, 1000);

        // Final balloon burst
        setTimeout(() => {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.4 },
                shapes: ['circle'],
                colors: ['#4ecdc4', '#45b7d1', '#6c5ce7'],
                startVelocity: 25
            });
        }, 2000);
    }

    // Floating Confetti Animation
    startFloatingBalloons() {
        const MAX_CONFETTI = 100;
        let currentConfetti = 0;

        const createConfetti = () => {
            if (currentConfetti >= MAX_CONFETTI) return;
            currentConfetti++;

            const piece = document.createElement('div');
            piece.className = 'floating-confetti';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.setProperty('--hue', Math.floor(Math.random() * 360));
            document.getElementById('balloonsContainer').appendChild(piece);

            setTimeout(() => {
                piece.remove();
                currentConfetti--;
            }, 6000);
        };

        setInterval(createConfetti, 300);

        // Initial Confetti
        for (let i = 0; i < 3; i++) {
            setTimeout(createConfetti, i * 800);
        }
    }

    // Countdown Timer
    setupCountdown() {
        const eventDate = new Date("Nov 02, 2025 18:00:00").getTime();
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                this.handlePartyStarted();
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            // Animate number changes
            this.animateNumberChange(daysEl, days.toString().padStart(2, '0'));
            this.animateNumberChange(hoursEl, hours.toString().padStart(2, '0'));
        };

        this.countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    animateNumberChange(element, newValue) {
        if (element.textContent !== newValue) {
            element.style.transform = 'scale(1.3)';
            element.style.textShadow = '0 0 10px rgba(255, 107, 53, 0.8)';

            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'scale(1)';
                element.style.textShadow = '';
            }, 200);
        }
    }

    handlePartyStarted() {
        const countdownSection = document.querySelector('.countdown-section');
        countdownSection.innerHTML = `
          <h3>🎊 The Party Has Begun! 🎊</h3>
          <div class="event-started">
            <p style="font-size: 1.2rem; color: #ff6b35; margin: 15px 0;">Hope you're having a blast!</p>
            <div style="font-size: 2rem; animation: partyTime 1s ease-in-out infinite;">🎉 🎂 🎈 🍰 🎁</div>
          </div>
        `;

        clearInterval(this.countdownInterval);
        this.triggerBirthdayConfetti();
    }

    // Music Controls
    toggleMusic() {
        const musicBtn = document.getElementById('musicBtn');
        const musicText = musicBtn.querySelector('.music-text');
        const bgMusic = document.getElementById('bgMusic');

        if (this.isMusicPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            this.isMusicPlaying = false;
        } else {
            this.startMusic();
        }
    }

    startMusic() {
        const musicBtn = document.getElementById('musicBtn');
        const musicText = musicBtn.querySelector('.music-text');
        const bgMusic = document.getElementById('bgMusic');

        bgMusic.play().then(() => {
            musicBtn.classList.add('playing');
            this.isMusicPlaying = true;
        }).catch(() => {
            console.log('Auto-play prevented. User interaction required.');
        });
    }

    // Modal Management
    setupModals() {
        const rsvpModal = document.getElementById('rsvpModal');
        const closeModal = document.getElementById('closeModal');
        const shareModal = document.getElementById('shareModal');
        const closeShareModal = document.getElementById('closeShareModal');

        closeModal.addEventListener('click', () => this.closeModal(rsvpModal));
        closeShareModal.addEventListener('click', () => this.closeModal(shareModal));

        [rsvpModal, shareModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal(rsvpModal);
                this.closeModal(shareModal);
            }
        });
    }

    openRSVPModal() {
        const modal = document.getElementById('rsvpModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
    }

    openShareModal() {
        const modal = document.getElementById('shareModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Share Handlers
    setupShareHandlers() {
        const shareOptions = document.querySelectorAll('.share-option');
        shareOptions.forEach(option => {
            option.addEventListener('click', () => {
                const platform = option.dataset.platform;
                this.handleShare(platform);
            });
        });
    }

    handleShare(platform) {
        const shareText = "💌 Hey! I’ve got a surprise invitation for you. Open the link 🎉";
        const shareUrl = window.location.href;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
                break;
            case 'copy':
                const fullText = `${shareText}\n${shareUrl}`;
                this.copyToClipboard(fullText);
                break;
        }

        this.closeModal(document.getElementById('shareModal'));
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Link copied to clipboard! 📋', 'success');
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Link copied to clipboard! 📋', 'success');
        }
    }

    // Touch Support
    setupTouchSupport() {
        const interactiveElements = document.querySelectorAll('.envelope, button, .share-option');

        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = element.style.transform + ' scale(0.95)';
            });

            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = element.style.transform.replace(' scale(0.95)', '');
                }, 100);
            });
        });
    }

    // Responsive Handling
    handleResize() {
        const countdown = document.querySelector('.countdown');
        if (window.innerWidth < 350) {
            countdown.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            countdown.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `<div class="notification-content">${message}</div>`;

        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #ff6b35, #ff8566)'};
          color: white;
          padding: 15px 20px;
          border-radius: 15px;
          z-index: 1001;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
          max-width: 300px;
          font-family: inherit;
          font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Utility Functions
    randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Cleanup
    cleanup() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic && !bgMusic.paused) {
            bgMusic.pause();
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayInvitationController();

    // for final page of book
    const storybookContainer = document.querySelector('.storybook-container');
    if (storybookContainer) {
        storybookContainer.addEventListener('storyComplete', () => {
            this.showInvitationAfterStory();
        });
    }

    // for gallery
    const galleryImages = document.querySelectorAll('.dress-code-gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');

    // Open on image click
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
document.head.appendChild(notificationStyles);
