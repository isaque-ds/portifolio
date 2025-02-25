document.addEventListener('DOMContentLoaded', function () {
    // Menu mobile
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollTop.style.display = 'flex';
            } else {
                scrollTop.style.display = 'none';
            }
        });
    }

    // Formulário de contato
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Evita que a página recarregue

            const formData = new FormData(contactForm);
            const jsonData = {};

            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            try {
                const response = await fetch("https://formspree.io/f/mbldvavv", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Mensagem enviada com sucesso!");
                    contactForm.reset();
                } else {
                    alert(`Erro ao enviar: ${result.error || "Tente novamente mais tarde."}`);
                }
            } catch (error) {
                alert("Falha ao enviar a mensagem. Verifique sua conexão e tente novamente.");
                console.error(error);
            }
        });
    }



    // Animação de digitação para o título
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.innerHTML = '';
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        type();
    };

    const title = document.querySelector('.hero-content h1');
    if (title) {
        typeWriter(title, title.textContent);
    }

    // Parallax
    const addParallaxEffect = () => {
        document.addEventListener('mousemove', (e) => {
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                const x = (window.innerWidth - e.pageX * 2) / 100;
                const y = (window.innerHeight - e.pageY * 2) / 100;
                heroImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
            }
        });
    };

    addParallaxEffect();
});

