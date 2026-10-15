/**
 * BÙI NGỌC HÀ - JAVASCRIPT LOGIC (MINIMALIST MONOCHROME)
 * Typewriter, Theme Toggle (Black / White), Code Switcher, Copy & Toast
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

/* 1. Theme Management (Dark / Light) */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('ha_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        const target = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', target);
        localStorage.setItem('ha_theme', target);
        showToast(target === 'dark' ? 'Giao diện Tối' : 'Giao diện Sáng');
    });
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

/* 3. Mobile Navigation */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('navMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('open');
        btn.innerHTML = menu.classList.contains('open') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
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
    });
}

/* 9. Toast */
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
    }, 2800);
}
