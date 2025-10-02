document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.querySelector('nav');

    function setActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - nav.offsetHeight - 5;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('bg-gray-200');
            link.classList.remove('text-gray-900');
            link.classList.add('bg-transparent');
            link.classList.add('text-black');

            if (link.href.includes(current)) {
                link.classList.add('bg-gray-200');
                link.classList.add('text-gray-900');
                link.classList.remove('bg-transparent');
                link.classList.remove('text-black');
            }
        });
    }

    function toggleNav() {
        const homeSection = document.getElementById('home');
        if (!homeSection) return;

        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        if (window.scrollY < homeBottom - nav.offsetHeight) {
            nav.classList.add('hidden');
            setTimeout(() => {
                nav.classList.remove('translate-y-0', 'opacity-100');
                nav.classList.add('-translate-y-10', 'opacity-0');
            }, 0);
            } else {
            nav.classList.remove('hidden');
            setTimeout(() => {
                nav.classList.remove('-translate-y-10', 'opacity-0');
                nav.classList.add('translate-y-0', 'opacity-100');
            }, 0);
        }
    }

    window.addEventListener('scroll', () => {
        setActiveLink();
        toggleNav();
    });

    setActiveLink();
    toggleNav();

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - nav.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});