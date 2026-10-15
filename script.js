/**
 * BÙI NGỌC HÀ - JAVASCRIPT LOGIC
 * Dynamic Typewriter, Dual Theme Toggle, Code Switcher, Interactive Terminal & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypewriter();
    initMobileMenu();
    initCodeTabs();
    initCopyButtons();
    initContactForm();
    initTerminalDemo();
    initScrollSpy();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Theme)
   ========================================================================== */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('ha_profile_theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ha_profile_theme', newTheme);
        showToast(newTheme === 'dark' ? '🌙 Đã chuyển sang giao diện Tối' : '☀️ Đã chuyển sang giao diện Sáng');
    });
}

/* ==========================================================================
   2. Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const words = [
        'HTML5, CSS3 & JavaScript 🚀',
        'Python 3 Backend & Scripts 🐍',
        'Quy trình Git & GitHub Chuẩn 💻',
        'Visual Studio Code Editor ⚡',
        'Định hướng Kỹ sư Web Full-stack 🎓'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const delayBetweenWords = 1800;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            nextSpeed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            nextSpeed = 400;
        }

        setTimeout(type, nextSpeed);
    }

    type();
}

/* ==========================================================================
   3. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    if (!mobileBtn || !navMenu) return;

    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        mobileBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking nav item
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/* ==========================================================================
   4. Code Snippet Tabs Switcher
   ========================================================================== */
function initCodeTabs() {
    const tabs = document.querySelectorAll('.code-tab');
    const blocks = document.querySelectorAll('.code-block');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            blocks.forEach(b => b.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetBlock = document.getElementById(targetId);
            if (targetBlock) {
                targetBlock.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   5. Copy Buttons & Toast Notifications
   ========================================================================== */
function initCopyButtons() {
    // Copy code snippet
    const btnCopyCode = document.getElementById('btnCopyCode');
    if (btnCopyCode) {
        btnCopyCode.addEventListener('click', () => {
            const activeBlock = document.querySelector('.code-block.active');
            if (activeBlock) {
                navigator.clipboard.writeText(activeBlock.innerText).then(() => {
                    showToast('📋 Đã sao chép đoạn code vào bộ nhớ đệm!');
                }).catch(() => {
                    showToast('⚠️ Không thể sao chép code.');
                });
            }
        });
    }

    // Copy CLI command
    const copyCliBtn = document.getElementById('copyCliBtn');
    if (copyCliBtn) {
        copyCliBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('python3 run.py').then(() => {
                showToast('🚀 Đã copy lệnh: python3 run.py');
            }).catch(() => {
                showToast('⚠️ Không thể sao chép.');
            });
        });
    }
}

/* ==========================================================================
   6. Contact Form Simulation
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const senderName = document.getElementById('senderName').value.trim();
        const senderMsg = document.getElementById('senderMsg').value.trim();

        if (!senderName || !senderMsg) {
            showToast('⚠️ Vui lòng điền đủ tên và nội dung!');
            return;
        }

        const btnSubmit = document.getElementById('btnSubmitForm');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';

        setTimeout(() => {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Gửi Lời Nhắn</span>';
            contactForm.reset();
            showToast(`🎉 Cảm ơn ${senderName}! Lời nhắn đã được ghi nhận.`);
        }, 800);
    });
}

/* ==========================================================================
   7. Interactive Terminal Demo
   ========================================================================== */
function initTerminalDemo() {
    const testBtn = document.getElementById('btnTestInteractive');
    const terminalScreen = document.getElementById('terminalScreen');
    if (!testBtn || !terminalScreen) return;

    let clickCount = 0;
    const sampleLogs = [
        { time: '19:25:01', type: 't-green', text: 'GET /index.html 200 OK (1.2ms)' },
        { time: '19:25:02', type: 't-cyan', text: 'GET /styles.css 200 OK (0.8ms)' },
        { time: '19:25:03', type: 't-yellow', text: 'GET /script.js 200 OK (0.5ms)' },
        { time: '19:25:04', type: 't-white', text: 'GET /assets/avatar.jpg 200 OK (2.1ms)' },
        { time: '19:25:05', type: 't-green', text: '✨ Kiểm tra: Toàn bộ tài nguyên đã tải thành công 100%!' }
    ];

    testBtn.addEventListener('click', () => {
        const log = sampleLogs[clickCount % sampleLogs.length];
        clickCount++;

        const logLine = document.createElement('div');
        logLine.className = `t-line ${log.type}`;
        logLine.innerHTML = `[${log.time}] ${log.text}`;
        terminalScreen.appendChild(logLine);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;

        showToast('⚡ Terminal nhận request: ' + log.text.split(' ')[0]);
    });
}

/* ==========================================================================
   8. Scroll Spy (Active Navbar Link)
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ==========================================================================
   9. Toast Utility
   ========================================================================== */
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}
