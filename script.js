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
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Aqui você pode adicionar a lógica para enviar o formulário
            const formData = new FormData(this);
            console.log('Dados do formulário:', Object.fromEntries(formData));
            alert('Mensagem enviada com sucesso!');
            this.reset();
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

    // Adicione após o código existente dentro do DOMContentLoaded
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
document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que a página recarregue

    const formData = {
        firstName: document.querySelector("input[name='firstName']").value,
        lastName: document.querySelector("input[name='lastName']").value,
        phone: document.querySelector("input[name='phone']").value,
        email: document.querySelector("input[name='email']").value,
        message: document.querySelector("textarea[name='message']").value
    };

    try {
        const response = await fetch("https://formspree.io/f/mbldvavv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Erro ao enviar a mensagem.");
        }

        alert("Mensagem enviada com sucesso!");
    } catch (error) {
        alert("Falha ao enviar a mensagem. Tente novamente.");
        console.error(error);
    }
});
