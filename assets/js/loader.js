/**
 * SERENE RETREAT - DYNAMIC COMPONENT LOADER
 * This script injects the common header and footer into all pages.
 * It also handles path correction for pages in the /pages/ directory.
 */

document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // Detect if current page is in the /pages/ directory
    const isSubPage = window.location.pathname.includes('/pages/');
    const basePath = isSubPage ? '../' : './';

    // 1. LOAD HEADER
    if (headerPlaceholder) {
        fetch(basePath + 'components/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                const header = headerPlaceholder.querySelector('nav');
                if (header) {
                    correctPaths(header, isSubPage);
                    setActiveLink(header);
                    // Initialize theme and RTL toggles after injection
                    if (window.initAppLogic) window.initAppLogic();
                }
            })
            .catch(err => console.error('Error loading header:', err));
    }

    // 2. LOAD FOOTER
    if (footerPlaceholder) {
        fetch(basePath + 'components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                const footer = footerPlaceholder.querySelector('footer');
                if (footer) {
                    correctPaths(footer, isSubPage);
                }
            })
            .catch(err => console.error('Error loading footer:', err));
    }

    /**
     * Corrects links in the injected components based on directory depth
     */
    function correctPaths(element, isSubPage) {
        const links = element.querySelectorAll('a');
        links.forEach(link => {
            let href = link.getAttribute('href');
            
            // Skip external links and anchors
            if (!href || href.startsWith('http') || href.startsWith('#') || href === 'javascript:void(0)') {
                return;
            }

            if (isSubPage) {
                // If we're in /pages/:
                // 1. index.html -> ../index.html
                if (href === 'index.html') {
                    link.setAttribute('href', '../index.html');
                }
                // 2. pages/filename.html -> filename.html (strip 'pages/')
                else if (href.startsWith('pages/')) {
                    link.setAttribute('href', href.replace('pages/', ''));
                }
            } else {
                // If we're in root:
                // Links are already correct (index.html and pages/...)
                // Just keep as is
            }
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
