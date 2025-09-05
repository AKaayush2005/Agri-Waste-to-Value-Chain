// Navigation functionality
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter function
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters
            const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
                stat.removeAttribute('data-target'); // Prevent re-animation
            });
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.intro-card, .chain-step, .solution-card, .knowledge-card, .service-card, .about-stats, .community-stats').forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
});

// Case Studies Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.case-study-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Slider controls
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play slider
setInterval(nextSlide, 5000);

// Marketplace tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(`${btn.getAttribute('data-tab')}-tab`).classList.add('active');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form submissions
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('.newsletter-input');
    if (input.value) {
        // Simulate success
        input.value = '';
        showNotification('Thank you for subscribing!');
    }
});

document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Simulate form submission
    e.target.reset();
    showNotification('Message sent successfully! We\'ll get back to you soon.');
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Value chain step interactions
document.querySelectorAll('.chain-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
        step.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    step.addEventListener('mouseleave', () => {
        step.style.transform = 'translateY(0) scale(1)';
    });
});

// Marketplace card hover effects
document.querySelectorAll('.marketplace-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.1) rotate(1deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Scroll-triggered animations with stagger effect
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up:not(.visible)');
    
    elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight - 100) {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100); // Stagger animation
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Loading screen (optional enhancement)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Enhanced scroll behavior for better performance
// let ticking = false;

function updateScrollEffects() {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Update navbar
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Update parallax
            const heroImg = document.querySelector('.hero-img');
            if (heroImg && scrolled < window.innerHeight) {
                heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateScrollEffects, { passive: true });

// Add click effects for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background: rgba(255, 255, 255, 0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize AOS-like animations
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation states
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    // Animate on scroll
    const animateElements = () => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                const delay = el.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
                el.removeAttribute('data-aos');
            }
        });
    };
    
    window.addEventListener('scroll', animateElements);
    animateElements(); // Initial check
});

// Enhanced marketplace filtering (future enhancement placeholder)
function initializeMarketplaceFilters() {
    // This could be expanded with actual filtering functionality
    console.log('Marketplace filters initialized');
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeMarketplaceFilters();
    initializeTechModals();
    initializeGallery();
    
    // Add loading state removal
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Lazy load images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        }
    });
});

// Observe all images for lazy loading
document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Add smooth scroll polyfill for older browsers
if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Technology Modal System
const techData = {
biogas: {
        title: "Biogas Plants",
        images: [
            "https://bioenergytimes.com/wp-content/uploads/2024/06/Biogas-7.jpg",
            "https://challengelab.chalmers.se/wp-content/uploads/2018/05/whetstone-vagistrom-1068x500.jpeg",
            "https://i.pinimg.com/1200x/ce/9e/77/ce9e7730cf488b2956b1d261b5c6880c.jpg"
        ],
        how: "Anaerobic digestion of organic wastes → produces methane-rich biogas + slurry (bio-fertiliser). Types: Fixed-dome, floating drum, plug-flow digesters.",
        feedstocks: "Animal dung, crop residues (after chopping/soaking), vegetable waste, sugar press mud.",
        products: "Biogas (cooking, electricity, CNG upgrading), digestate slurry as fertiliser.",
        advantages: [
            "Clean cooking fuel & electricity",
            "Reduces methane emissions from dung/waste",
            "Improves nutrient cycling on farms",
            "Scalable from household → village → industrial level"
        ],
        challenges: [
            "Efficiency drops if untreated lignocellulosic waste lowers efficiency",
            "Requires daily feedstock & water",
            "Poor management leads to plant failures"
        ],
        bestuse: "Dairy clusters, villages with high manure/wet waste availability.",
        tip: "Co-digest manure with high-moisture residues or food waste to stabilise C:N and increase gas yield. Scale modular digesters for villages or clusters."
    },
biochar: {
        title: "Biochar Kilns",
        images: [
            "https://i.pinimg.com/736x/65/2d/46/652d466cff1dfeabcb6d3e91b24aa91a.jpg",
            "https://www.cell.com/cms/10.1016/j.heliyon.2023.e14873/asset/5f4fef6c-bc85-4ca7-8fad-04fc779e3123/main.assets/ga1_lrg.jpg",
            "https://xeero.io/wp-content/uploads/2022/06/Biocharprocess-1024x819-1.jpeg"
        ],
        how: "Pyrolysis of agri-residues in low oxygen conditions → produces biochar (carbon-rich solid), syngas, and bio-oil. Designs: Traditional earthen kilns, retort kilns, modern pyrolysers.",
        feedstocks: "Rice husk, maize stalks, cotton stalks, coconut shells, bamboo, woody residues.",
        products: "Biochar (soil amendment, carbon sequestration), heat/syngas for cooking/drying.",
        advantages: [
            "Improves soil fertility, water retention",
            "Locks carbon in soil → climate benefit",
            "Reduces fertiliser need",
            "Potential for carbon credit revenue"
        ],
        challenges: [
            "Initial cost of improved kilns/pyrolysers",
            "Need for training in safe operation",
            "Market awareness for biochar still limited"
        ],
        bestuse: "Villages with high residue burning, regions with degraded soils, carbon projects.",
        tip: "Start with low-cost mobile drum pyrolysers for on-farm biochar trials; test biochar+frass blends for yield improvements."
    },

    bioplastic: {
        title: "Bioplastic Technology",
        images: [
            "https://i.pinimg.com/1200x/7e/8f/a6/7e8fa62748c5f0c6652f59ec6f861eac.jpg",
            "https://th.bing.com/th/id/R.40611bcb946f6eb8a29f92cc783f550f?rik=kWTmSIpgaeGovg&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f627cee8183b29363ef578ed2%2f6366af2be6157c7afbf04290%2f6407e95e7fe8402959703c67%2f1678241269593%2fbio.jpeg%3fformat%3d1500w&ehk=Q6rAx%2fPk0mxpl9HQX6yDXE47Q1lyJI2OV2HPizg5CRs%3d&risl=&pid=ImgRaw&r=0",
            "https://blog.papermart.com/wp-content/uploads/2023/06/Eco-01-1024x1024.jpg"
        ],
        how: "Agricultural residues (starch-rich crops, sugarcane bagasse, corn stover, rice husk, potato peel, etc.) are converted into biopolymers through fermentation or chemical processes (e.g., Polylactic Acid – PLA, Polyhydroxyalkanoates – PHA). Can also use lignocellulosic biomass after pre-treatment.",
        feedstocks: "Corn stover, cassava starch, sugarcane bagasse, rice husk, potato/tapioca waste.",
        products: "Biodegradable plastics for packaging, films, cutlery, bottles, and agricultural mulch films.",
        advantages: [
            "Replaces petroleum  based plastics → eco-friendly",
            "Adds high value to low-cost residues",
            "Meets rising demand for sustainable packaging"
        ],
        challenges: [
            "High production cost vs petroleum  based plastics",
            "Requires advanced fermentation + purification setups",
            "Scale-up challenges in rural clusters"
        ],
        bestuse: "Industrial hubs near starch/sugar mills (bagasse, molasses, starch-rich residues).",
        tip: "Start with simple PLA production from starch-rich waste; partner with packaging companies for market access; focus on high-value applications first."
    },
    briquetting: {
        title: "Briquetting Machines",
        images: [
            "https://5.imimg.com/data5/PB/RJ/MY-1706532/biofuel-briquetting-machine-1000x1000.jpg",
            "https://th.bing.com/th/id/R.34c5fdabe5b8f7543ccc0a1f6ffdb419?rik=cMQkZW1KqIR%2b1A&riu=http%3a%2f%2fwoodbriquetteplant.com%2fimages%2f140722%2fbriquettes-machine-line.jpg&ehk=1mhyPNivisymNXljAk5fVbZImMY2QjPLMIVJ%2b1CkJWs%3d&risl=&pid=ImgRaw&r=0",
            "https://weima.com/wp-content/uploads/2021/02/Biomasse_Briketts_web3-1024x556.png"
        ],
        how: "Compresses dry biomass (sawdust, rice husk, groundnut shell, maize stalks, cotton stalks, wheat straw) into dense briquettes without binders. Hydraulic or screw-press technology.",
        feedstocks: "Dry agri-residues, husks, stalks, shells, prunings.",
        products: "Solid briquettes for cooking, industrial boilers, and small-scale power plants.",
        advantages: [
            "Reduces open burning of residues",
            "Provides rural energy security",
            "Easy to operate, low maintenance",
            "Compact fuel – cheaper transport/storage"
        ],
        challenges: [
            "Requires consistent dry feedstock supply",
            "Not viable if moisture >15%",
            "Market development needed for briquette acceptance"
        ],
        bestuse: "Rural energy clusters, brick kilns, small industries, community kitchens.",
        tip: "Start with simple briquetting units; ensure consistent dry feedstock supply; develop local markets for acceptance."
    },
    
    
    mushroom: {
        title: "Mushroom Cultivation on Agri-Residues",
        images: [
            "https://www.sidechef.com/article/f0d135ed-912e-4a2b-85f2-7860035ee311.jpg?d=1408x1120",
            "https://www.foodformzansi.co.za/wp-content/uploads/2018/09/Mushroom-farming-is-done-indoors-1200x583.jpg",
            "https://i0.wp.com/gardensnursery.com/wp-content/uploads/2019/08/All-in-One-Indoor-Mushroom-Growing-Kit-Exotic-Mushroom-e1564695797398.jpg?fit=746%2C500&ssl=1"
        ],
        how: "Crop residues (paddy straw, wheat straw, maize cobs, cotton stalks, sugarcane bagasse) are pasteurised/treated and used as substrate for cultivating edible mushrooms (oyster, button, shiitake). After harvest, the spent substrate becomes nutrient-rich compost.",
        feedstocks: "Paddy straw, wheat straw, maize stalks, cotton stalks, bagasse.",
        products: "Edible mushrooms (high-value food), spent mushroom substrate (organic fertiliser/soil conditioner).",
        advantages: [
            "Converts low-value straw into high-value food",
            "Short cultivation cycle (30–45 days)",
            "Provides rural employment, esp. for women and youth",
            "Circular: by-product is fertiliser"
        ],
        challenges: [
            "Requires controlled humidity & temperature for good yields",
            "Training needed in spawn handling and contamination control",
            "Seasonal sensitivity for some mushroom types"
        ],
        bestuse: "Villages with abundant straw (esp. paddy/wheat belts), peri-urban areas for fresh market access.",
        tip: "Start with oyster mushrooms (most resilient); use simple polytunnel structures; establish cold chain for market access."
    },
    vermicompost: {
        title: "Vermicomposting Units",
        images: [
            "https://th.bing.com/th/id/R.08a84418b31d3455c4bde10f1239c4e2?rik=baCxA2A8siZERQ&riu=http%3a%2f%2fvermicompostmaroc.com%2fwp-content%2fuploads%2f2023%2f10%2fPROC.png&ehk=POaThgtWndwaWOWHNDRlQxJjQhUXKj%2f40j7oQkvSvlE%3d&risl=&pid=ImgRaw&r=0",
            "https://st2.depositphotos.com/17449018/44907/v/950/depositphotos_449070000-stock-illustration-infographic-vermicomposting-components-vermicomposter-vermicomposter.jpg",
            "https://www.growingagreenerworld.com/wp-content/uploads/2015/08/WormBin-2-ps-sm.jpg"
        ],
        how: "Earthworms (Eisenia fetida, Eudrilus eugeniae) decompose organic residues (farm waste, vegetable waste, dung) into nutrient-rich vermicompost. Small, low-cost pits or tanks are used for the process.",
        feedstocks: "Crop residues, vegetable waste, animal dung, agro-industrial by-products.",
        products: "Vermicompost (organic fertiliser), vermiwash (liquid biofertiliser), earthworm biomass (fish/poultry feed supplement).",
        advantages: [
            "Improves soil fertility naturally",
            "Low investment, easy to adopt at small scale",
            "Creates rural micro-enterprise opportunities",
            "Can be integrated with organic farming systems"
        ],
        challenges: [
            "Slower process compared to biogas/BSF",
            "Sensitive to extreme heat, waterlogging, chemicals",
            "Limited scalability beyond community level"
        ],
        bestuse: "Smallholder farms, organic farming clusters, farmer cooperatives.",
        tip: "Build small modular units near farms; maintain 60-70% moisture; harvest every 45-60 days for best quality."
    },
   };

function initializeTechModals() {
    const modal = document.getElementById('tech-modal');
    const closeBtn = document.getElementById('modal-close');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const techType = btn.getAttribute('data-tech');
            showTechModal(techType);
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function showTechModal(techType) {
    const modal = document.getElementById('tech-modal');
    const data = techData[techType];
    
    if (!data) return;
    
    // Update modal content
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('tech-how').textContent = data.how;
    document.getElementById('tech-feedstocks').textContent = data.feedstocks;
    document.getElementById('tech-products').textContent = data.products;
    document.getElementById('tech-bestuse').textContent = data.bestuse;
    document.getElementById('tech-tip').textContent = data.tip;
    
    // Update gallery images
    document.getElementById('gallery-img-1').src = data.images[0];
    document.getElementById('gallery-img-2').src = data.images[1];
    document.getElementById('gallery-img-3').src = data.images[2];
    
    // Update advantages
    const advantagesList = document.getElementById('tech-advantages');
    advantagesList.innerHTML = '';
    data.advantages.forEach(advantage => {
        const li = document.createElement('li');
        li.textContent = advantage;
        advantagesList.appendChild(li);
    });
    
    // Update challenges
    const challengesList = document.getElementById('tech-challenges');
    challengesList.innerHTML = '';
    data.challenges.forEach(challenge => {
        const li = document.createElement('li');
        li.textContent = challenge;
        challengesList.appendChild(li);
    });
    
    // Reset gallery to first slide
    currentGallerySlide = 0;
    showGallerySlide(0);
    
    // Show modal
    modal.classList.add('active');
}

// Gallery functionality for tech modal
let currentGallerySlide = 0;

function initializeGallery() {
    const prevBtn = document.querySelector('.prev-gallery');
    const nextBtn = document.querySelector('.next-gallery');
    const dots = document.querySelectorAll('.gallery-dot');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentGallerySlide = (currentGallerySlide - 1 + 3) % 3;
            showGallerySlide(currentGallerySlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentGallerySlide = (currentGallerySlide + 1) % 3;
            showGallerySlide(currentGallerySlide);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentGallerySlide = index;
            showGallerySlide(currentGallerySlide);
        });
    });
    
    // Auto-advance gallery
    setInterval(() => {
        if (document.getElementById('tech-modal').classList.contains('active')) {
            currentGallerySlide = (currentGallerySlide + 1) % 3;
            showGallerySlide(currentGallerySlide);
        }
    }, 4000);
}

function showGallerySlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Enhanced scroll behavior for better performance
let ticking = false;

function updateScrollEffects() {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Update navbar
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Update parallax
            const heroImg = document.querySelector('.hero-img');
            if (heroImg && scrolled < window.innerHeight) {
                heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateScrollEffects, { passive: true });
