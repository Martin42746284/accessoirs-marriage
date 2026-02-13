// ============================================
// GESTION DE LA PAGE CONTACT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fermer tous les autres items
            document.querySelectorAll('.faq-item-accordion').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle l'item cliqué
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // ============================================
    // FORMULAIRE DE CONTACT
    // ============================================

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Récupérer les données du formulaire
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            try {
                // Envoyer le message via l'API
                const result = await submitContactForm(
                    data.name,
                    data.email,
                    data.phone || '',
                    data.subject || '',
                    data.message
                );

                if (result.success) {
                    // Afficher le message de succès
                    formMessage.className = 'form-message success';
                    formMessage.textContent = '✓ ' + result.message;
                    formMessage.style.display = 'block';

                    // Réinitialiser le formulaire
                    contactForm.reset();

                    // Cacher le message après 5 secondes
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                } else {
                    // Afficher le message d'erreur
                    formMessage.className = 'form-message error';
                    formMessage.textContent = '✗ ' + result.message;
                    formMessage.style.display = 'block';
                }
            } catch (error) {
                console.error('Erreur:', error);
                formMessage.className = 'form-message error';
                formMessage.textContent = '✗ Une erreur s\'est produite. Veuillez réessayer.';
                formMessage.style.display = 'block';
            }
        });
    }
    
    console.log('✅ Contact.js initialisé');
});
