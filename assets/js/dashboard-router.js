/**
 * Dashboard Router
 * Handles dynamic content loading for the Serene Retreat Dashboard via hash-based routing.
 */

document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('dashboard-viewport');
    const sidebar = document.getElementById('dashboard-sidebar');
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-page]');

    // Create a hidden template to store initial overview content
    let templateOverview = document.getElementById('template-overview');
    if (!templateOverview) {
        templateOverview = document.createElement('div');
        templateOverview.id = 'template-overview';
        templateOverview.style.display = 'none';
        templateOverview.innerHTML = viewport.innerHTML;
        document.body.appendChild(templateOverview);
    }

    /**
     * Specialized view for Wellness Form
     */
    function renderWellnessForm() {
        return `
            <div class="view-fade-in">
                <div class="greeting-card mb-4">
                    <div style="position:relative;z-index:1;">
                        <h2 style="font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:400;margin-bottom:0.5rem;">
                            Your Wellness <em>Form</em> 📋
                        </h2>
                        <p style="opacity:0.8;font-size:0.95rem;max-width:500px;">
                            Please complete each section below to help our healers prepare for your journey.
                        </p>
                    </div>
                </div>

                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="quick-stat h-100 p-4">
                            <div class="quick-stat-icon" style="background:rgba(46,139,87,0.1);">🏃</div>
                            <h4 class="mt-3">Physical Wellbeing</h4>
                            <p class="dashboard-card-desc">Assessment of fitness, medical conditions, and physical needs.</p>
                            <div class="progress mb-3" style="height:6px; background: rgba(0,0,0,0.05); border-radius: 10px;">
                                <div class="progress-bar" style="width: 70%; background: var(--primary); border-radius: 10px;"></div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="small font-weight-bold">70% Complete</span>
                                <button class="btn btn-sm btn-primary-retreat py-1 px-3" style="font-size: 0.75rem;">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="quick-stat h-100 p-4">
                            <div class="quick-stat-icon" style="background:rgba(119,136,153,0.1);">🧠</div>
                            <h4 class="mt-3">Mental Clarity</h4>
                            <p class="dashboard-card-desc">Insights into your meditation history and current state of mind.</p>
                            <div class="progress mb-3" style="height:6px; background: rgba(0,0,0,0.05); border-radius: 10px;">
                                <div class="progress-bar" style="width: 25%; background: var(--accent); border-radius: 10px;"></div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="small font-weight-bold">25% Complete</span>
                                <button class="btn btn-sm btn-outline-retreat py-1 px-3" style="font-size: 0.75rem;">Continue</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="quick-stat h-100 p-4">
                            <div class="quick-stat-icon" style="background:rgba(212,196,183,0.3);">🥗</div>
                            <h4 class="mt-3">Dietary Ethics</h4>
                            <p class="dashboard-card-desc">Allergies, nutrition preferences, and fasting requirements.</p>
                            <div class="progress mb-3" style="height:6px; background: rgba(0,0,0,0.05); border-radius: 10px;">
                                <div class="progress-bar" style="width: 0%; background: var(--secondary); border-radius: 10px;"></div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="small font-weight-bold">0% Complete</span>
                                <button class="btn btn-sm btn-outline-retreat py-1 px-3" style="font-size: 0.75rem;">Start</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Specialized view for My Itinerary
     */
    function renderItinerary() {
        return `
            <div class="view-fade-in">
                <div class="greeting-card mb-4" style="background: linear-gradient(135deg, var(--accent), var(--primary));">
                    <div style="position:relative;z-index:1;">
                        <h2 style="font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:400;margin-bottom:0.5rem;">
                            Your Retreat <em>Schedule</em> 📅
                        </h2>
                        <p style="opacity:0.8;font-size:0.95rem;max-width:500px;">
                            Detailed timeline for your upcoming 7-day Silent Vipassana Journey.
                        </p>
                    </div>
                </div>

                <div class="quick-stat p-4">
                    <h5 style="font-family:'Cormorant Garamond',serif; font-size: 1.5rem; margin-bottom: 2rem;">Journey Timeline</h5>
                    <div class="timeline-mini">
                        <div class="timeline-mini-item">
                            <div style="font-weight:700; font-size: 0.95rem; color: var(--primary);">Day 1 — The Threshold</div>
                            <div class="dashboard-card-meta mb-1">Jan 15, 2025 · Arrival and Welcome Circle</div>
                            <p class="small">Check-in at the Forest Gate by 10 AM. First meditation session at 3 PM.</p>
                        </div>
                        <div class="timeline-mini-item">
                            <div style="font-weight:700; font-size: 0.95rem;">Day 2-5 — Into the Silence</div>
                            <div class="dashboard-card-meta mb-1">Jan 16-19, 2025 · Noble Silence Begins</div>
                            <p class="small">Deepening the practice through guided sittings and nature walks in silence.</p>
                        </div>
                        <div class="timeline-mini-item">
                            <div style="font-weight:700; font-size: 0.95rem;">Day 6 — Returning Voice</div>
                            <div class="dashboard-card-meta mb-1">Jan 20, 2025 · Breaking the Silence</div>
                            <p class="small">Integration workshop and voice re-awakening exercises.</p>
                        </div>
                        <div class="timeline-mini-item" style="opacity: 0.6; margin-bottom: 0;">
                            <div style="font-weight:700; font-size: 0.95rem;">Day 7 — New Horizons</div>
                            <div class="dashboard-card-meta mb-1">Jan 21, 2025 · Departure</div>
                            <p class="small">Final blessing ceremony and shuttle departure at 11 AM.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Specialized view for Add-ons (Table)
     */
    function renderAddons() {
        return `
            <div class="view-fade-in">
                <div class="greeting-card mb-4" style="background: linear-gradient(135deg, var(--primary), var(--primary-light));">
                    <div style="position:relative;z-index:1;">
                        <h2 style="font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:400;margin-bottom:0.5rem;">
                            Enhanced <em>Experience</em> ✨
                        </h2>
                        <p style="opacity:0.8;font-size:0.95rem;max-width:500px;">
                            Elevate your stay with our premium selection of therapeutic services.
                        </p>
                    </div>
                </div>
                
                <div class="quick-stat p-0 overflow-hidden border-0 shadow-sm">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0" style="background: var(--card-bg); color: var(--text-primary);">
                            <thead style="background: rgba(46,139,87,0.05);">
                                <tr>
                                    <th class="ps-4 border-0 py-3 small text-uppercase letter-spacing-1">Service</th>
                                    <th class="border-0 py-3 small text-uppercase letter-spacing-1">Availability</th>
                                    <th class="border-0 py-3 text-end small text-uppercase letter-spacing-1">Price</th>
                                    <th class="pe-4 border-0 py-3 text-end small text-uppercase letter-spacing-1">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="ps-4 py-4 border-bottom" style="border-color: var(--border) !important;">
                                        <div class="d-flex align-items-center">
                                            <span class="fs-3 me-3">💆‍♀️</span>
                                            <div>
                                                <div class="fw-bold">Deep Tissue Massage</div>
                                                <div class="small opacity-75">60-minute therapeutic session</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="border-bottom" style="border-color: var(--border) !important;">Daily</td>
                                    <td class="text-end fw-bold border-bottom" style="border-color: var(--border) !important;">$120</td>
                                    <td class="pe-4 text-end border-bottom" style="border-color: var(--border) !important;">
                                        <button class="btn btn-sm btn-primary-retreat rounded-pill px-3">Add</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="ps-4 py-4 border-bottom" style="border-color: var(--border) !important;">
                                        <div class="d-flex align-items-center">
                                            <span class="fs-3 me-3">🥣</span>
                                            <div>
                                                <div class="fw-bold">Sound Healing Bowl</div>
                                                <div class="small opacity-75">Private vibrational therapy</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="border-bottom" style="border-color: var(--border) !important;">Mon, Wed, Fri</td>
                                    <td class="text-end fw-bold border-bottom" style="border-color: var(--border) !important;">$85</td>
                                    <td class="pe-4 text-end border-bottom" style="border-color: var(--border) !important;">
                                        <button class="btn btn-sm btn-primary-retreat rounded-pill px-3">Add</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="ps-4 py-4">
                                        <div class="d-flex align-items-center">
                                            <span class="fs-3 me-3">🚶‍♂️</span>
                                            <div>
                                                <div class="fw-bold">Guided Forest Bathing</div>
                                                <div class="small opacity-75">3-hour meditative nature walk</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Every Sunrise</td>
                                    <td class="text-end fw-bold">$45</td>
                                    <td class="pe-4 text-end">
                                        <button class="btn btn-sm btn-primary-retreat rounded-pill px-3">Add</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Specialized view for Book Sessions (Cards)
     */
    function renderBookSessions() {
        return `
            <div class="view-fade-in">
                <div class="greeting-card mb-4" style="background: linear-gradient(135deg, #1e2a22, #111a14); color: #fff;">
                    <div style="position:relative;z-index:1;">
                        <h2 style="font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:400;margin-bottom:0.5rem; color: #fff;">
                            Private <em>Sessions</em> 🧘
                        </h2>
                        <p style="opacity:0.8;font-size:0.95rem;max-width:500px; color: rgba(255,255,255,0.9);">
                            Direct guidance from our master practitioners to deepen your practice.
                        </p>
                    </div>
                </div>

                <div class="row g-4">
                    <div class="col-md-6">
                        <div class="quick-stat p-4 border-0 shadow-sm" style="background: var(--card-bg);">
                            <div class="d-flex justify-content-between mb-3 align-items-start">
                                <span class="fs-1">🪴</span>
                                <span class="badge bg-soft-success text-success rounded-pill px-3 py-1" style="background: rgba(46,139,87,0.1); font-size: 0.7rem;">TOP RATED</span>
                            </div>
                            <h4 style="font-family:'Cormorant Garamond',serif;">One-on-One Yoga</h4>
                            <p class="dashboard-card-desc mb-2" style="font-size: 0.88rem; min-height: auto;">Personalized alignment and flow tailored to your energetic frequency.</p>
                            <hr class="my-3 opacity-10">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="fw-bold text-primary">$95 <span class="small font-weight-normal opacity-75">/ 75min</span></div>
                                <button class="btn btn-primary-retreat rounded-pill px-4 btn-sm">Reserve</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="quick-stat p-4 border-0 shadow-sm" style="background: var(--card-bg);">
                            <div class="d-flex justify-content-between mb-3 align-items-start">
                                <span class="fs-1">🌬️</span>
                            </div>
                            <h4 style="font-family:'Cormorant Garamond',serif;">Advanced Breathwork</h4>
                            <p class="dashboard-card-desc mb-2" style="font-size: 0.88rem; min-height: auto;">Deep pranayama techniques to oxygenate your cells and clear mental fog.</p>
                            <hr class="my-3 opacity-10">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="fw-bold text-primary">$75 <span class="small font-weight-normal opacity-75">/ 45min</span></div>
                                <button class="btn btn-primary-retreat rounded-pill px-4 btn-sm">Reserve</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Specialized view for Retreat Activities (FAQ/List)
     */
    function renderActivities() {
        return `
            <div class="view-fade-in">
                <div class="greeting-card mb-4" style="background: linear-gradient(135deg, var(--secondary), var(--accent));">
                    <div style="position:relative;z-index:1;">
                        <h2 style="font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:400;margin-bottom:0.5rem; color: #1C2520;">
                            Retreat <em>Activities</em> 🌿
                        </h2>
                        <p style="opacity:0.8;font-size:0.95rem;max-width:500px; color: #1C2520;">
                            Complimentary group sessions included in your Serene Retreat package.
                        </p>
                    </div>
                </div>

                <div class="quick-stat p-4 border-0 shadow-sm" style="background: var(--card-bg);">
                    <h5 class="mb-4" style="font-family:'Cormorant Garamond',serif; font-size: 1.5rem;">Daily Community Schedule</h5>
                    
                    <div class="mb-4 pb-4 border-bottom" style="border-color: var(--border) !important;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="mb-0 fw-bold">🌅 Sunrise Meditation</h6>
                            <span class="badge border px-3 py-1" style="background: rgba(112, 151, 187, 0.15); color: var(--primary) !important; font-size: 0.75rem; border-color: rgba(112, 151, 187, 0.3) !important;">6:00 AM</span>
                        </div>
                        <p class="dashboard-card-desc mb-0">A gentle awakening of the senses in our open-air pavilion. No prior experience is required.</p>
                    </div>

                    <div class="mb-4 pb-4 border-bottom" style="border-color: var(--border) !important;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="mb-0 fw-bold">🍵 Zen Tea Ceremony</h6>
                            <span class="badge border px-3 py-1" style="background: rgba(112, 151, 187, 0.15); color: var(--primary) !important; font-size: 0.75rem; border-color: rgba(112, 151, 187, 0.3) !important;">4:00 PM</span>
                        </div>
                        <p class="dashboard-card-desc mb-0">Experience the ancient art of tea service. A ritual of presence and mindful appreciation.</p>
                    </div>

                    <div class="mb-0">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="mb-0 fw-bold">🌕 Moonlight Chant</h6>
                            <span class="badge border px-3 py-1" style="background: rgba(112, 151, 187, 0.15); color: var(--primary) !important; font-size: 0.75rem; border-color: rgba(112, 151, 187, 0.3) !important;">8:30 PM</span>
                        </div>
                        <p class="dashboard-card-desc mb-0">Group chanting under the stars to resonate with collective healing frequencies.</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Load a page into the dashboard viewport
     * @param {string} page - The page identifier (from hash)
     */
    async function loadDashboardPage(page) {
        if (!viewport) return;

        // Update active state in sidebar
        sidebarLinks.forEach(link => {
            const linkPage = link.getAttribute('href').replace('#', '');
            if (linkPage === page || (page === '' && linkPage === 'overview')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Specialized handles
        const renders = {
            'questionnaire.html': renderWellnessForm,
            'itinerary-detail.html': renderItinerary,
            'addons.html': renderAddons,
            'book-sessions': renderBookSessions,
            'activities': renderActivities
        };

        if (renders[page]) {
            viewport.style.opacity = '0';
            setTimeout(() => {
                viewport.innerHTML = renders[page]();
                viewport.style.opacity = '1';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 200);
            return;
        }

        // Handle Overview specially (restore from template)
        if (page === 'overview' || page === '') {
            viewport.style.opacity = '0';
            setTimeout(() => {
                viewport.innerHTML = templateOverview.innerHTML;
                viewport.style.opacity = '1';
                if (window.updateCountdown) window.updateCountdown();
            }, 200);
            return;
        }

        // Default: Show placeholder for other items
        viewport.style.opacity = '0';
        setTimeout(() => {
            viewport.innerHTML = `
                <div class="view-fade-in text-center py-5">
                    <div style="font-size:4rem;margin-bottom:1.5rem;">🌿</div>
                    <h2 style="font-family:'Cormorant Garamond',serif; color:var(--primary);">${page.replace('.html', '').replace(/-/g, ' ')}</h2>
                    <p class="text-muted">This section is currently being curated for your retreat experience.</p>
                    <button class="btn btn-primary-retreat mt-3" onclick="window.location.hash='overview'">Back to Overview</button>
                </div>
            `;
            viewport.style.opacity = '1';
        }, 200);
    }

    // Toggle Mobile Sidebar
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            mobileToggle.innerHTML = sidebar.classList.contains('active') ? '<span>✕</span>' : '<span>☰</span>';
        });
    }

    // Intercept hash changes
    window.addEventListener('hashchange', () => {
        const page = window.location.hash.substring(1);
        loadDashboardPage(page);

        // Close sidebar on mobile after selection
        if (window.innerWidth < 992) {
            sidebar.classList.remove('active');
            if (mobileToggle) mobileToggle.innerHTML = '<span>☰</span>';
        }
    });

    // Handle initial state
    const initialPage = window.location.hash.substring(1);
    loadDashboardPage(initialPage);
});

