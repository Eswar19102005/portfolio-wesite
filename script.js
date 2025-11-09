document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Smooth Scrolling Setup
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle internal links (those starting with #)
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                
                // Get the target element
                const targetElement = document.querySelector(hash);
                
                // Calculate the position to scroll to (adjust for sticky header height)
                const headerHeight = document.querySelector('header').offsetHeight;
                const topPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    // 2. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('main > section');
    const header = document.querySelector('header');

    // Create a function to update the active link
    function updateActiveLink() {
        // Remove 'active-link' from all links first
        navLinks.forEach(link => link.classList.remove('active-link'));

        // Iterate through sections from the last one to the first
        // This ensures the current section is correctly identified when scrolling down
        for (let i = sections.length - 1; i >= 0; i--) {
            const currentSection = sections[i];
            
            // Get the section's top position relative to the viewport
            // Subtract the header height (plus a small offset like 20px) 
            // so the link changes before the section is fully under the header.
            const sectionTop = currentSection.offsetTop - header.offsetHeight - 20;

            // Check if the user has scrolled past the top of this section
            if (window.scrollY >= sectionTop) {
                // Get the corresponding navigation link using the section's ID
                const sectionId = currentSection.getAttribute('id');
                const activeLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
                
                // Add the active class
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
                
                // Stop the loop once the highest visible section is found
                return;
            }
        }
        
        // If scrolled back to the very top (above the first section), 
        // there is no active section, but you could optionally highlight the first link:
        // document.querySelector('.navbar a[href="#about"]').classList.add('active-link'); 
        // (We won't do this here, but it's an option.)
    }

    // Attach the function to the scroll event
    window.addEventListener('scroll', updateActiveLink);
    
    // Run once on load to set the initial active link (e.g., if page reloads midway)
    updateActiveLink(); 

});