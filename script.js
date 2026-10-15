/**
 * BÙI NGỌC HÀ - JAVASCRIPT LOGIC (MOBILE UI/UX OPTIMIZED)
 * Typewriter, Theme Toggle (with mobile theme-color sync), Touch Drawer, Back-To-Top & Toast
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
    initBackToTop();
});

/* 1. Theme Management & Mobile Status Bar Color */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeMeta = document.getElementById('themeColorMeta');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('ha_theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        const target = cur === 'dark' ? 'light' : 'dark';
        applyTheme(target);
        localStorage.setItem('ha_theme', target);
        showToast(target === 'dark' ? 'Giao diện Tối' : 'Giao diện Sáng');
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeMeta) {
            themeMeta.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
        }
    }
}

/* 2. Typewriter Effect */
function initTypewriter() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const words = [
        'Ngành Công nghệ phần mềm',
        'Lập trình Web (HTML • CSS • JS)',
        'Python Backend & Automation',
        'Kỹ sư phần mềm tương lai'
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function tick() {
        const current = words[wordIdx];
        if (isDeleting) {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 35 : 75;

        if (!isDeleting && charIdx === current.length) {
            speed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 400;
        }

        setTimeout(tick, speed);
    }

    tick();
}

/* 3. Mobile Navigation Drawer & Backdrop */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('navMenu');
    const overlay = document.getElementById('navOverlay');
    if (!btn || !menu) return;

    function toggleMenu(open) {
        const shouldOpen = open !== undefined ? open : !menu.classList.contains('open');
        if (shouldOpen) {
            menu.classList.add('open');
            if (overlay) overlay.classList.add('active');
            btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            menu.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            document.body.style.overflow = '';
        }
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    if (overlay) {
        overlay.addEventListener('click', () => toggleMenu(false));
    }

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

/* 4. Code Tabs */
function initCodeTabs() {
    const tabs = document.querySelectorAll('.code-tab');
    const blocks = document.querySelectorAll('.code-block');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            blocks.forEach(b => b.classList.remove('active'));

            tab.classList.add('active');
            const target = document.getElementById(tab.getAttribute('data-target'));
            if (target) target.classList.add('active');
        });
    });
}

/* 5. Copy Buttons */
function initCopyButtons() {
    const btnCopyCode = document.getElementById('btnCopyCode');
    if (btnCopyCode) {
        btnCopyCode.addEventListener('click', () => {
            const activeBlock = document.querySelector('.code-block.active');
            if (activeBlock) {
                navigator.clipboard.writeText(activeBlock.innerText).then(() => {
                    showToast('Đã sao chép đoạn mã');
                });
            }
        });
    }

    const copyCliBtn = document.getElementById('copyCliBtn');
    if (copyCliBtn) {
        copyCliBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('python3 run.py').then(() => {
                showToast('Đã sao chép: python3 run.py');
            });
        });
    }
}

/* 6. Contact Form */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('senderName').value.trim();
        const msg = document.getElementById('senderMsg').value.trim();
        if (!name || !msg) return;

        const btn = document.getElementById('btnSubmitForm');
        btn.disabled = true;
        btn.textContent = 'Đang gửi...';

        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = 'Gửi Tin Nhắn';
            form.reset();
            showToast(`Cảm ơn ${name}, tin nhắn đã được gửi!`);
        }, 600);
    });
}

/* 7. Terminal Interactive Demo */
function initTerminalDemo() {
    const btn = document.getElementById('btnTestInteractive');
    const screen = document.getElementById('terminalScreen');
    if (!btn || !screen) return;

    let count = 0;
    const logs = [
        'GET /index.html 200 OK',
        'GET /styles.css 200 OK',
        'GET /script.js 200 OK',
        'GET /assets/avatar.jpg 200 OK',
        '[READY] Server chạy mượt mà 100%'
    ];

    btn.addEventListener('click', () => {
        const line = document.createElement('div');
        line.className = 't-line';
        line.textContent = `> ${logs[count % logs.length]}`;
        screen.appendChild(line);
        screen.scrollTop = screen.scrollHeight;
        count++;
        showToast('Terminal phản hồi');
    });
}

/* 8. Scroll Spy */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const h = current.offsetHeight;
            const top = current.offsetTop - 100;
            const id = current.getAttribute('id');

            if (scrollY > top && scrollY <= top + h) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });
}

/* 9. Back To Top Floating Button (Mobile) */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 320) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* 10. Toast */
let toastTimer;
function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');
    if (!toast || !msgEl) return;

    msgEl.textContent = msg;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2600);
}
