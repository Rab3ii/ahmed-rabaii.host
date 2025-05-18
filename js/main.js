/**
 * Portfolio Développeur Web - Script Principal
 * Fonctionnalités : Mode sombre, animations, formulaire de contact, protection email
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Effet de particules pour l'arrière-plan
    particlesEffect();

    // Éléments DOM
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = darkModeToggle.querySelector('i');
    const navbarElement = document.getElementById('mainNav');
    const backToTopButton = document.querySelector('.back-to-top');
    const contactForm = document.getElementById('contactForm');
    const protectedEmails = document.querySelectorAll('.protected-email');
    const protectedPhones = document.querySelectorAll('.protected-phone');
    const skillBars = document.querySelectorAll('.progress-bar');
    
    // Vérifier les préférences de mode sombre dans localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Appliquer le mode sombre si activé
    if (isDarkMode) {
        body.setAttribute('data-theme', 'dark');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }
    
    // Fonction pour basculer le mode sombre
    function toggleDarkMode() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'false');
        } else {
            body.setAttribute('data-theme', 'dark');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'true');
        }
    }
    
    // Gestionnaire d'événement pour le bouton de mode sombre
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Fonction pour gérer le bouton "Retour en haut"
    function handleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }
    
    // Gestionnaire d'événement pour le défilement
    window.addEventListener('scroll', function() {
        handleBackToTop();
        animateOnScroll();
        
        // Navbar fixe avec changement de couleur au défilement
        if (window.scrollY > 50) {
            navbarElement.classList.add('navbar-shrink');
        } else {
            navbarElement.classList.remove('navbar-shrink');
        }
    });
    
    // Gestionnaire d'événement pour le bouton "Retour en haut"
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Protection des emails et numéros de téléphone
    protectedEmails.forEach(element => {
        element.addEventListener('click', function() {
            const email = this.getAttribute('data-email');
            this.textContent = email;
            this.classList.remove('protected-email');
            this.removeAttribute('data-email');
        });
    });
    
    protectedPhones.forEach(element => {
        element.addEventListener('click', function() {
            const phone = this.getAttribute('data-phone');
            this.textContent = phone;
            this.classList.remove('protected-phone');
            this.removeAttribute('data-phone');
        });
    });
    
    // Animation des barres de compétences
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('aria-valuenow') + '%';
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
    
    // Animation des éléments au défilement
    function animateOnScroll() {
        const elements = document.querySelectorAll('.project-item, .timeline-item, .skill-item, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }
            
            // Simulation d'envoi de formulaire (à remplacer par un vrai backend)
            alert(`Merci ${name} pour votre message ! Dans un environnement réel, votre message serait envoyé.`);
            contactForm.reset();
        });
    }
    
    // Initialisation des animations
    animateSkillBars();
    animateOnScroll();
    
    // Préchargement des images pour les projets
    function preloadImages() {
        // Création d'images de placeholder pour la démo
        const placeholderImages = [
            { src: 'project1.jpg', alt: 'Baniola - Plateforme d\'annonces automobiles' },
            { src: 'project2.jpg', alt: 'Tunisie-Immo - Site immobilier' },
            { src: 'project3.jpg', alt: 'Bonplans.tn - Avis et recommandations' },
            { src: 'project4.jpg', alt: 'Boutique en ligne' },
            { src: 'project5.jpg', alt: 'Application Mobile' },
            { src: 'project6.jpg', alt: 'Tableau de bord' }
        ];
        
        // Création des images placeholder
        placeholderImages.forEach(img => {
            createPlaceholderImage(img.src, img.alt);
        });
    }
    
    // Fonction pour créer une image placeholder
    function createPlaceholderImage(filename, altText) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 600;
        
        // Définir des couleurs thématiques pour chaque projet
        let gradient;
        let iconText = '</>'; // Texte d'icône par défaut
        
        // Personnalisation en fonction du nom de fichier
        if (filename.includes('project1')) {
            // Baniola - Thème automobile
            gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#1e3a8a');
            gradient.addColorStop(1, '#3b82f6');
            iconText = '🚗';
        } else if (filename.includes('project2')) {
            // Tunisie-Immo - Thème immobilier
            gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#065f46');
            gradient.addColorStop(1, '#10b981');
            iconText = '🏠';
        } else if (filename.includes('project3')) {
            // Bonplans - Thème avis
            gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#7e22ce');
            gradient.addColorStop(1, '#a855f7');
            iconText = '⭐';
        } else if (filename.includes('project4')) {
            // E-commerce
            gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#b91c1c');
            gradient.addColorStop(1, '#ef4444');
            iconText = '🛒';
        } else if (filename.includes('project5')) {
            // Application mobile
            gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#0e7490');
            gradient.addColorStop(1, '#06b6d4');
            iconText = '📱';
        } else {
            // Tableau de bord
            gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#1e40af');
            gradient.addColorStop(1, '#3b82f6');
            iconText = '📊';
        }
        
        // Appliquer le dégradé comme fond
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner des formes géométriques en arrière-plan
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#ffffff';
        
        // Cercles aléatoires
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = 20 + Math.random() * 60;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Réinitialiser l'opacité
        ctx.globalAlpha = 1.0;
        
        // Ajouter l'icône
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 100px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(iconText, canvas.width / 2, canvas.height / 2 - 50);
        
        // Ajouter le texte alternatif
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Diviser le texte en lignes si nécessaire
        const words = altText.split(' ');
        let lines = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; i++) {
            const testLine = currentLine + ' ' + words[i];
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width < canvas.width - 100) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        lines.push(currentLine);
        
        // Dessiner les lignes de texte
        let y = canvas.height / 2 + 50;
        lines.forEach(line => {
            ctx.fillText(line, canvas.width / 2, y);
            y += 50;
        });
        
        // Convertir le canvas en image et l'enregistrer
        const dataUrl = canvas.toDataURL('image/jpeg');
        
        // Fonction pour enregistrer l'image
        function saveImage(dataUrl, filename) {
            // Créer un élément image pour l'afficher
            const img = new Image();
            img.src = dataUrl;
            img.alt = filename;
            img.classList.add('img-fluid');
            
            // Remplacer les images existantes par les placeholders
            const images = document.querySelectorAll(`img[src="images/${filename}"]`);
            images.forEach(image => {
                image.src = dataUrl;
            });
            
            // Également remplacer les images dans les modals
            const modalImages = document.querySelectorAll(`.modal img[alt*="${filename.replace('.jpg', '')}"]`);
            modalImages.forEach(image => {
                image.src = dataUrl;
            });
        }
        
        saveImage(dataUrl, filename);
    }
    
    // Exécuter la création d'images placeholder
    preloadImages();
    
    // Initialiser la bibliothèque d'animation AOS si elle est disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Effet de machine à écrire pour les compétences
    const typewriterTexts = [
        'Full-Stack',
        'Créatif',
        'Innovant',
        'Passionné'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeWriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;
        
        const currentText = typewriterTexts[currentTextIndex];
        
        if (isDeleting) {
            // Effacement du texte
            typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            // Écriture du texte
            typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 150;
        }
        
        // Logique pour passer au texte suivant ou commencer à effacer
        if (!isDeleting && currentCharIndex === currentText.length) {
            // Pause à la fin de l'écriture
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            // Passer au texte suivant après effacement
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Démarrer l'effet de machine à écrire
    typeWriter();
    
    // Effet de particules pour l'arrière-plan
    function particlesEffect() {
        const canvas = document.createElement('canvas');
        const container = document.querySelector('.masthead');
        if (!container) return;
        
        canvas.classList.add('particles-canvas');
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        const particlesArray = [];
        const numberOfParticles = 50;
        
        // Classe pour les particules
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.size > 0.2) this.size -= 0.1;
                
                // Rebond sur les bords
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Initialiser les particules
        function init() {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        // Animer les particules
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            
            // Connecter les particules proches
            connectParticles();
            
            requestAnimationFrame(animate);
        }
        
        // Connecter les particules avec des lignes
        function connectParticles() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${1 - distance/100})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Redimensionner le canvas lors du redimensionnement de la fenêtre
        window.addEventListener('resize', function() {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        });
        
        init();
        animate();
    }
});
