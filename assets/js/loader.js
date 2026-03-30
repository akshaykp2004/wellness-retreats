/**
 * SERENE RETREAT - DYNAMIC COMPONENT LOADER
 * This script injects the common header and footer into all pages.
 * It also handles path correction for pages in the /pages/ directory.
 */

document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // Detect if current page is in the /pages/ directory
    // More robust check for subdirectory vs project folder names
    const isSubPage = window.location.pathname.toLowerCase().includes('/pages/') || 
                      window.location.pathname.toLowerCase().endsWith('/pages');
    const basePath = isSubPage ? '../' : './';

    // 1. LOAD HEADER
    if (headerPlaceholder) {
        fetch(basePath + 'components/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                // Correct paths for the ENTIRE injected container (nav + offcanvas menu)
                if (isSubPage) {
                    correctPaths(headerPlaceholder, isSubPage);
                }
                
                // Initialize active logic
                const nav = headerPlaceholder.querySelector('nav');
                if (nav) setActiveLink(nav);
                
                // Initialize theme and RTL toggles after injection
                if (window.initAppLogic) window.initAppLogic();
            })
            .catch(err => console.error('Error loading header:', err));
    }

    // 2. LOAD FOOTER
    if (footerPlaceholder) {
        fetch(basePath + 'components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                if (isSubPage) {
                    correctPaths(footerPlaceholder, isSubPage);
                }
            })
            .catch(err => console.error('Error loading footer:', err));
    }

    /**
     * Corrects links in the injected components based on directory depth
     */
    function correctPaths(element, isSubPage) {
        if (!isSubPage) return;

        // Correct links
        const links = element.querySelectorAll('a');
        links.forEach(link => {
            let href = link.getAttribute('href');
            // Skip external, hash, or already corrected links
            if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('../')) return;

            if (href.startsWith('pages/')) {
                // If it's a link to a sibling in the /pages/ folder
                link.setAttribute('href', href.replace('pages/', ''));
            } else {
                // It's a link to the root directory
                link.setAttribute('href', '../' + href);
            }
        });

        // Correct images
        const images = element.querySelectorAll('img');
        images.forEach(img => {
            let src = img.getAttribute('src');
            if (!src || src.startsWith('http') || src.startsWith('data:') || src.startsWith('../')) return;

            // Prefix with parent dir for all relative assets
            img.setAttribute('src', '../' + src);
        });
    }

    /**
     * Set active class on current page link
     */
    function setActiveLink(nav) {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        const allLinks = nav.querySelectorAll('.nav-link-retreat');
        allLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Check if href ends with the current page name
            if (linkHref && linkHref.endsWith(currentPage)) {
                link.classList.add('active');
            }
        });
    }
});
