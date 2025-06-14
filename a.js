(function() {
    const ribbonContainer = document.querySelector('.ribbon-container');
    const ribbon = document.getElementById('ribbon');
    const ribbonText = document.getElementById('ribbonText');
    const paper = document.getElementById('paper');
    const confettiContainer = document.getElementById('confetti-container');

    let greetingVisible = false;
    let confettiTimeout;

    function clearConfetti() {
        confettiContainer.innerHTML = '';
        if(confettiTimeout) clearTimeout(confettiTimeout);
    }

    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.setProperty('--x', (Math.random() * 200 - 100) + 'vw');
        confetti.style.setProperty('--r', (Math.random() * 360) + 'deg');
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        confettiContainer.appendChild(confetti);

        // Automatically remove confetti when animation ends
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }

    function burstConfetti() {
        if(window.matchMedia('(prefers-reduced-motion)').matches) return;

        for(let i = 0; i < 40; i++) {
            createConfettiPiece();
        }
        confettiTimeout = confettiTimeout(() => {
            clearConfetti();
        }, 5000);
    }

    function toggleGreeting() {
        greetingVisible = !greetingVisible;
        ribbon.classList.toggle('pressed', greetingVisible);
        if (greetingVisible) {
            paper.classList.add('show');
            ribbonContainer.setAttribute('aria-pressed', 'true');
            paper.setAttribute('aria-hidden', 'false');
            burstConfetti();
        } else {
            paper.classList.remove('show');
            ribbonContainer.setAttribute('aria-pressed', 'false');
            paper.setAttribute('aria-hidden', 'true');
            clearConfetti();
        }
    }

    ribbonContainer.addEventListener('click', toggleGreeting);
    // Keyboard accessibility: toggle on Enter or Space
    ribbonContainer.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === '') {
            e.preventDefault();
            toggleGreeting();
        }
    });
})();