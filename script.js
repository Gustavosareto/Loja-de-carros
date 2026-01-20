// ===========================
// AUTOELITE - Premium Car Dealership
// JavaScript Functionality
// ===========================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.style.overflow = 'auto';
        }, 500); 
    }

    // 2. Video Logic
    const video = document.getElementById('heroVideo');
    if (video) {
        video.muted = true;
        video.play().catch(error => console.log("Autoplay blocked"));
    }

    // 3. Initialize App
    try {
        initTheme();
        initCars(); 
        initScrollProgress();
        initRevealAnimations();
        initMobileMenu();
        initFilterSystem();
        initFinancingCalculator();
        initSmoothScroll();
        initWhatsAppFloat();
        initMasks();
        initForms();
        initCustomSelects();
    } catch (e) {
        console.error("Erro na inicializaÃƒÂ§ÃƒÂ£o:", e);
    }
});

// ===========================
// Input Masks
// ===========================
function initMasks() {
    // Currency Mask for Price Inputs
    const currencyMask = {
        alias: 'numeric',
        groupSeparator: '.',
        autoGroup: true,
        digits: 2,
        radixPoint: ',',
        digitsOptional: false,
        prefix: 'R$ ',
        placeholder: '0,00',
        rightAlign: false,
        removeMaskOnSubmit: true
    };

    const carPriceInput = document.getElementById('carPrice');
    const downPaymentInput = document.getElementById('downPayment');
    
    if (carPriceInput) Inputmask(currencyMask).mask(carPriceInput);
    if (downPaymentInput) Inputmask(currencyMask).mask(downPaymentInput);

    // Phone Mask
    const phoneInput = document.getElementById('propPhone');
    if (phoneInput) {
        Inputmask({
            mask: ['(99) 9999-9999', '(99) 99999-9999'],
            keepStatic: true
        }).mask(phoneInput);
    }

    // CPF/CNPJ Mask
    const cpfInput = document.getElementById('propCpf');
    if (cpfInput) {
        Inputmask({
            mask: ['999.999.999-99', '99.999.999/9999-99'],
            keepStatic: true
        }).mask(cpfInput);
    }
}

function initForms() {
    const proposalForm = document.getElementById('proposalForm');
    if (proposalForm) {
        proposalForm.addEventListener('submit', submitProposal);
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', submitNewsletter);
    }
}

// ===========================
// Proposal Modal Functions
// ===========================
function openProposalModal() {
    const modal = document.getElementById('proposalModal');
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeProposalModal() {
    const modal = document.getElementById('proposalModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function submitProposal(event) {
    event.preventDefault();
    
    const fields = [
        { id: 'propName', label: 'Nome', required: true },
        { id: 'propEmail', label: 'E-mail', required: true, type: 'email' },
        { id: 'propPhone', label: 'Celular', required: true, minLength: 10 },
        { id: 'propCpf', label: 'CPF/CNPJ', required: true, minLength: 11 }
    ];

    let isValid = true;
    
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const value = input.value.trim();
        removeError(input);

        if (field.required && !value) {
            showError(input, `${field.label} Ã© obrigatÃ³rio`);
            isValid = false;
        } else if (field.type === 'email' && value && !validateEmail(value)) {
            showError(input, 'E-mail invÃ¡lido');
            isValid = false;
        } else if (field.minLength && value.replace(/\D/g, '').length < field.minLength) {
            showError(input, `${field.label} incompleto`);
            isValid = false;
        }
    });

    if (isValid) {
        showNotification('Proposta enviada com sucesso! Nossa equipe entrarÃ¡ em contato.', 'success');
        closeProposalModal();
        document.getElementById('proposalForm').reset();
    }
}

function showError(input, message) {
    input.classList.add('input-error');
    const errorMsg = document.createElement('p');
    errorMsg.className = 'error-message';
    errorMsg.innerText = message;
    input.parentElement.appendChild(errorMsg);
}

function removeError(input) {
    input.classList.remove('input-error');
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
}

// ===========================
// Car Inventory Data
// ===========================
const carInventory = [
    {
        id: 1,
        title: "BMW M3 Competition",
        category: "esportivos",
        price: "R$ 789.900",
        year: "2024",
        km: "4.000 km",
        fuel: "Gasolina",
        badge: "DisponÃ­vel",
        badgeClass: "",
        images: [
            "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Motor 3.0 Bi-Turbo, 510cv, Interior em couro Merino, Som Harman Kardon, Head-up Display.",
        specs: { "Motor": "3.0L Bi-Turbo I6", "PotÃªncia": "510 cv", "0-100 km/h": "3.9s", "TransmissÃ£o": "M Steptronic 8v" }
    },
    {
        id: 2,
        title: "Porsche 911 Carrera",
        category: "esportivos",
        price: "R$ 945.000",
        year: "2023",
        km: "8.000 km",
        fuel: "Gasolina",
        badge: "Destaque",
        badgeClass: "featured",
        images: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "CÃ¢mbio PDK, Teto solar, Pacote Sport Chrono, Rodas RS Spyder, Escapamento Esportivo.",
        specs: { "Motor": "3.0L Boxer 6", "PotÃªncia": "385 cv", "0-100 km/h": "4.2s", "TransmissÃ£o": "PDK 8v" }
    },
    {
        id: 3,
        title: "BMW X5 M50i",
        category: "suv",
        price: "R$ 650.000",
        year: "2024",
        km: "1.200 km",
        fuel: "Gasolina",
        badge: "Ãšnica Unidade",
        badgeClass: "",
        images: [
            "/assents/x5.webp",
            "/assents/x52.webp"
        ],
        desc: "V8 Twin-Turbo, Interior Ivory White, SuspensÃ£o adaptativa, Sky Lounge panoramic roof.",
        specs: { "Motor": "4.4L V8 Twin-Turbo", "PotÃªncia": "530 cv", "0-100 km/h": "4.3s", "TransmissÃ£o": "Steptronic 8v" }
    },
    {
        id: 4,
        title: "BMW M5 CS",
        category: "sedan",
        price: "R$ 1.250.000",
        year: "2023",
        km: "2.500 km",
        fuel: "Gasolina",
        badge: "Vendido",
        badgeClass: "sold",
        images: [
            "/assents/m5cs.webp",
            "/assents/m5cs-2.webp"
        ],
        desc: "O sedÃ£ mais potente da histÃ³ria da BMW. 635cv, Rodas Gold Bronze, Bancos em carbono.",
        specs: { "Motor": "4.4L V8 Twin-Turbo", "PotÃªncia": "635 cv", "0-100 km/h": "3.0s", "TransmissÃ£o": "M Steptronic 8v" }
    },
    {
        id: 5,
        title: "Audi RS6 Avant",
        category: "esportivos",
        price: "R$ 1.150.000",
        year: "2024",
        km: "1.200 km",
        fuel: "Gasolina",
        badge: "Vendido",
        badgeClass: "sold",
        images: [
            "/assents/audi.webp",
            "/assents/audi2.webp"
        ],
        desc: "V8 4.0 TFSI, 600cv, Ceramic Brakes, Cor Cinza Nardo, Som Bang & Olufsen 3D.",
        specs: { "Motor": "4.0L V8 Twin-Turbo", "PotÃªncia": "600 cv", "0-100 km/h": "3.6s", "TransmissÃ£o": "Tiptronic 8v" }
    },
    {
        id: 6,
        title: "Mercedes-AMG G63",
        category: "suv",
        price: "R$ 1.850.000",
        year: "2023",
        km: "500 km",
        fuel: "Gasolina",
        badge: "Vendido",
        badgeClass: "sold",
        images: [
            "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "O lendÃ¡rio G-Wagon. EdiÃ§Ã£o Magno, Interior Exclusive, Som Burmester High-End.",
        specs: { "Motor": "4.0L V8 Biturbo", "PotÃªncia": "585 cv", "0-100 km/h": "4.5s", "TransmissÃ£o": "AMG Speedshift 9v" }
    }
];


function initCars() {
    renderCars(carInventory);
}

// Wishlist State
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(id, event) {
    if (event) event.stopPropagation();
    const index = wishlist.indexOf(id);
    if (index === -1) {
        wishlist.push(id);
    } else {
        wishlist.splice(index, 1);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderCars(carInventory); // Re-render to update icons
}

function renderCars(cars) {
    const carGrid = document.getElementById('carGrid');
    if (!carGrid) return;

    carGrid.innerHTML = cars.map(car => {
        const isSold = car.badgeClass === 'sold';
        return `
            <div class="car-card spotlight-card reveal ${isSold ? 'is-sold' : ''}" data-category="${car.category}" onmousemove="handleSpotlight(event, this)">
                <div class="car-card-image group relative">
                    <img src="${car.images[0]}" alt="${car.title}" loading="lazy" class="${isSold ? 'grayscale' : 'group-hover:scale-110'} transition-transform duration-700">
                    
                    ${isSold ? 
                        `<div class="car-badge sold">Vendido</div>` : 
                        `<div class="car-badge" style="background-color: #22c55e; color: white; border: none;">Disponível</div>`
                    }
                </div>
                <div class="p-6 flex flex-col flex-1 ${isSold ? 'opacity-50' : ''}">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold tracking-tight">${car.title}</h3>
                    </div>
                    
                    <div class="flex flex-wrap gap-y-2 gap-x-4 mb-6">
                        <div class="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <span class="text-[11px] font-medium uppercase tracking-wider">${car.year}</span>
                        </div>
                        <div class="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span class="text-[11px] font-medium uppercase tracking-wider">${car.km}</span>
                        </div>
                        <div class="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            <span class="text-[11px] font-medium uppercase tracking-wider">${car.fuel}</span>
                        </div>
                    </div>

                    <div class="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
                        <div>
                            <p class="text-[10px] text-zinc-400 uppercase tracking-widest mb-0.5">Preço Exclusive</p>
                            <p class="text-2xl font-bold car-price-text">${car.price}</p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="toggleCompare(${car.id}, event)" 
                                class="p-3 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-90"
                                title="Comparar" aria-label="Comparar ${car.title}">
                                <svg class="w-4 h-4 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                            </button>
                            <button onclick="openModalById(${car.id})" 
                                class="bg-blue-600 text-white px-6 py-3 rounded-full text-[10px] font-extrabold hover:bg-blue-700 transition-all active:scale-95 tracking-widest uppercase"
                                aria-label="Ver mais detalhes sobre ${car.title}">
                                VER MAIS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Re-initialize reveal animations for new elements
    initRevealAnimations();
}

// React Bits Inspired: Spotlight Effect Logic
function handleSpotlight(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    element.style.setProperty('--mouse-x', `${x}px`);
    element.style.setProperty('--mouse-y', `${y}px`);
}

// ===========================
// Theme Toggle (Dark/Light)
// ===========================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const body = document.body;

    // Check for saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            if (isDark) {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            } else {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        });
    }
}

// ===========================
// Scroll Progress Bar
// ===========================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===========================
// Reveal Animations on Scroll
// ===========================
function initRevealAnimations() {
    // 1. Prepare Text Reveal Elements
    document.querySelectorAll('.text-reveal').forEach(el => {
        const text = el.innerText;
        el.innerHTML = text.split(' ').map((word, i) => 
            `<span style="transition-delay: ${i * 0.1}s">${word}&nbsp;</span>`
        ).join('');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .text-reveal').forEach(el => observer.observe(el));
}

// ===========================
// Mobile Menu Toggle
// ===========================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
}

// ===========================
// Car Modal Functions
// ===========================
let currentCarId = null;
let currentImageIndex = 0;

function updateModalImage() {
    const car = carInventory.find(c => c.id === currentCarId);
    if (!car || !car.images) return;
    
    const modalImg = document.getElementById('modalImg');
    const imageCounter = document.getElementById('imageCounter');
    
    // Smooth transition
    modalImg.style.opacity = '0.5';
    modalImg.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
        modalImg.src = car.images[currentImageIndex];
        imageCounter.innerText = `${currentImageIndex + 1} / ${car.images.length}`;
        modalImg.style.opacity = '1';
        modalImg.style.transform = 'scale(1)';
    }, 200);
}

function nextImage() {
    const car = carInventory.find(c => c.id === currentCarId);
    if (!car) return;
    currentImageIndex = (currentImageIndex + 1) % car.images.length;
    updateModalImage();
}

function prevImage() {
    const car = carInventory.find(c => c.id === currentCarId);
    if (!car) return;
    currentImageIndex = (currentImageIndex - 1 + car.images.length) % car.images.length;
    updateModalImage();
}

function openModalById(id) {
    const car = carInventory.find(c => c.id === id);
    if (!car) return;

    currentCarId = id;
    currentImageIndex = 0;

    const modal = document.getElementById('carModal');

    document.getElementById('modalTitle').innerText = car.title;
    document.getElementById('modalPrice').innerText = car.price;
    document.getElementById('modalYear').innerText = car.year;
    document.getElementById('modalKm').innerText = car.km;
    document.getElementById('modalDesc').innerText = car.desc;
    
    // Initialize first image
    document.getElementById('modalImg').src = car.images[0];
    document.getElementById('imageCounter').innerText = `1 / ${car.images.length}`;

    // Render Specs
    const specsContainer = document.getElementById('modalSpecs');
    if (specsContainer) {
        specsContainer.innerHTML = Object.entries(car.specs).map(([key, value]) => `
            <div class="flex justify-between py-2 border-b border-gray-50 dark:border-gray-800">
                <span class="text-gray-400 uppercase font-medium" style="font-size: 10px;">${key}</span>
                <span class="font-bold">${value}</span>
            </div>
        `).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add fade-in animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('carModal');
    modal.style.opacity = '0';

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal on outside click
window.addEventListener('click', function (event) {
    const modal = document.getElementById('carModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ===========================
// Filter & Search System
// ===========================
function initFilterSystem() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('carSearch');
    let currentFilter = 'all';
    let currentSearch = '';

    const applyFilters = () => {
        let filtered = carInventory;

        // Apply Category or Wishlist Filter
        if (currentFilter === 'wishlist') {
            filtered = filtered.filter(car => wishlist.includes(car.id));
        } else if (currentFilter !== 'all') {
            filtered = filtered.filter(car => car.category === currentFilter);
        }

        // Apply Search Term
        if (currentSearch) {
            const term = currentSearch.toLowerCase();
            filtered = filtered.filter(car => 
                car.title.toLowerCase().includes(term) || 
                car.desc.toLowerCase().includes(term)
            );
        }

        const grid = document.getElementById('carGrid');
        grid.style.opacity = '0';
        
        setTimeout(() => {
            renderCars(filtered);
            grid.style.opacity = '1';
            
            if (filtered.length === 0 && (currentSearch || currentFilter === 'wishlist')) {
                showNotification('Nenhum veÃ­culo encontrado com os critÃ©rios selecionados.', 'info');
            }
        }, 200);
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            applyFilters();
        });
    }
}

// ===========================
// Financing Calculator
// ===========================
function initFinancingCalculator() {
    const calcBtn = document.getElementById('calculateFinancing');

    if (calcBtn) {
        calcBtn.addEventListener('click', calculateFinancing);
    }

    // Add input listeners for real-time calculation
    const inputs = ['carPrice', 'downPayment', 'loanTerm'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateFinancing);
        }
    });
}

function calculateFinancing() {
    const rawPrice = document.getElementById('carPrice')?.value || '';
    const rawDown = document.getElementById('downPayment')?.value || '';
    
    // Parse numeric values from masked strings
    const carPrice = parseFloat(rawPrice.replace('R$ ', '').replaceAll('.', '').replace(',', '.')) || 0;
    const downPayment = parseFloat(rawDown.replace('R$ ', '').replaceAll('.', '').replace(',', '.')) || 0;
    
    const loanTerm = parseInt(document.getElementById('loanTerm')?.value) || 12;
    const interestRate = 1.5; // 1.5% ao mÃªs (exemplo)

    if (carPrice <= 0) return;

    const loanAmount = carPrice - downPayment;

    if (loanAmount <= 0) {
        document.getElementById('monthlyPayment').innerText = 'R$ 0,00';
        document.getElementById('totalAmount').innerText = 'R$ ' + formatCurrency(carPrice);
        document.getElementById('totalInterest').innerText = 'R$ 0,00';
        return;
    }

    // CÃ¡lculo usando Price (Sistema FrancÃªs de AmortizaÃ§Ã£o)
    const monthlyRate = interestRate / 100;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1);

    const totalAmount = monthlyPayment * loanTerm + downPayment;
    const totalInterest = totalAmount - carPrice;

    // Update UI
    document.getElementById('monthlyPayment').innerText = 'R$ ' + formatCurrency(monthlyPayment);
    document.getElementById('totalAmount').innerText = 'R$ ' + formatCurrency(totalAmount);
    document.getElementById('totalInterest').innerText = 'R$ ' + formatCurrency(totalInterest);

    // Show results with animation
    const resultsDiv = document.getElementById('financingResults');
    if (resultsDiv) {
        resultsDiv.classList.add('reveal', 'active');
        resultsDiv.style.opacity = '1';
    }
}

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ===========================
// Smooth Scroll
// ===========================
function initSmoothScroll() {
    // Select all links with hashes
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it is just "#" or if it is a modal/external trigger
            if (href === '#' || this.getAttribute('data-not-smooth')) return;

            // Find target element
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                
                // If it is a mobile menu link, close the menu first
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }

                // Smooth scroll with offset for the sticky header
                const headerOffset = 90; // Slightly more for safety
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Focus accessibility
                target.focus({ preventScroll: true });
                if (document.activeElement !== target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                }
            }
        });
    });
}

// ===========================
// WhatsApp Float Button
// ===========================
function initWhatsAppFloat() {
    const whatsappBtn = document.getElementById('whatsappFloat');

    if (whatsappBtn) {
        // Show button after scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                whatsappBtn.style.display = 'flex';
                setTimeout(() => {
                    whatsappBtn.style.opacity = '1';
                    whatsappBtn.style.transform = 'scale(1)';
                }, 10);
            } else {
                whatsappBtn.style.opacity = '0';
                whatsappBtn.style.transform = 'scale(0)';
                setTimeout(() => {
                    whatsappBtn.style.display = 'none';
                }, 300);
            }
        });
    }
}

// ===========================
// Newsletter Form
// ===========================
function submitNewsletter(event) {
    event.preventDefault();
    const input = document.getElementById('newsletterEmail');
    const email = input?.value;
    
    removeError(input);

    if (email && validateEmail(email)) {
        showNotification('Obrigado por se inscrever! VocÃª receberÃ¡ nossas ofertas exclusivas em breve.', 'success');
        input.value = '';
    } else {
        showError(input, 'Insira um e-mail vÃ¡lido');
        showNotification('Por favor, insira um e-mail vÃ¡lido.', 'error');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===========================
// Contact Form
// ===========================
function submitContact(event) {
    event.preventDefault();

    const name = document.getElementById('contactName')?.value;
    const email = document.getElementById('contactEmail')?.value;
    const phone = document.getElementById('contactPhone')?.value;
    const message = document.getElementById('contactMessage')?.value;

    if (name && email && phone && message) {
        // Here you would typically send this to a backend
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

        // Clear form
        document.getElementById('contactForm')?.reset();
    } else {
        showNotification('Por favor, preencha todos os campos.', 'error');
    }
}

// ===========================
// Lazy Loading Images
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Utility Functions
// ===========================

// Format phone number
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    }

    input.value = value;
}

// Format currency input
function formatCurrencyInput(input) {
    let value = input.value.replace(/\D/g, '');
    value = (parseInt(value) / 100).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    input.value = 'R$ ' + value;
}

// Export functions for global use
window.openModalById = openModalById;
window.closeModal = closeModal;
window.nextImage = nextImage;
window.prevImage = prevImage;
window.toggleWishlist = toggleWishlist;
window.submitNewsletter = submitNewsletter;
window.submitContact = submitContact;
window.formatPhone = formatPhone;
window.formatCurrencyInput = formatCurrencyInput;
window.handleSpotlight = handleSpotlight;

// ===========================
// Fast Comparison Tool
// ===========================
let compareList = [];

function toggleCompare(id, event) {
    if (event) event.stopPropagation();
    
    const index = compareList.indexOf(id);
    if (index > -1) {
        compareList.splice(index, 1);
        showNotification('VeÃ­culo removido da comparaÃ§Ã£o.', 'info');
    } else {
        if (compareList.length >= 2) {
            showNotification('VocÃª sÃ³ pode comparar 2 veÃ­culos por vez.', 'error');
            return;
        }
        compareList.push(id);
        showNotification('VeÃ­culo adicionado para comparaÃ§Ã£o.', 'success');
    }
    
    updateCompareBar();
}

function updateCompareBar() {
    const bar = document.getElementById('compareBar');
    if (!bar) return;

    const itemsContainer = document.getElementById('compareItems');
    const btnAction = document.getElementById('btnCompareAction');
    
    if (compareList.length > 0) {
        bar.classList.remove('translate-y-full');
        
        itemsContainer.innerHTML = compareList.map(id => {
            const car = carInventory.find(c => c.id === id);
            return `
                <div class="flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                    <img src="${car.images[0]}" class="w-6 h-6 rounded-full object-cover mr-3 grayscale border border-white/20">
                    <span class="text-[9px] font-bold uppercase truncate max-w-[80px] text-white tracking-widest">${car.title}</span>
                    <button onclick="toggleCompare(${car.id})" class="ml-3 text-gray-500 hover:text-white transition-colors">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            `;
        }).join('');
        
        btnAction.disabled = compareList.length < 2;
        btnAction.className = `px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${compareList.length < 2 ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-lg shadow-white/5'}`;
    } else {
        bar.classList.add('translate-y-full');
    }
}

function clearComparison() {
    compareList = [];
    updateCompareBar();
}

function startComparison() {
    if (compareList.length < 2) return;
    
    const compareModal = document.getElementById('compareModal');
    const compareGrid = document.getElementById('compareGrid');
    const cars = compareList.map(id => carInventory.find(c => c.id === id));
    
    const specs = [
        { label: 'Modelo', key: 'title', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { label: 'PreÃ§o', key: 'price', icon: 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z' },
        { label: 'Ano', key: 'year', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { label: 'Motor', keypath: 'specs.motor', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { label: 'PotÃªncia', keypath: 'specs.potencia', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { label: 'AceleraÃ§Ã£o', keypath: 'specs.aceleracao', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { label: 'TransmissÃ£o', keypath: 'specs.transmissao', icon: 'M11 6a3 3 0 11-6 0 3 3 0 016 0z M14 17a6 6 0 01-12 0 M13 10l-3 3m0 0l-3-3m3 3V10' },
        { label: 'Quilometragem', key: 'km', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2-2 0 012-2h2a2-2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2-2 0 01-2 2h-2a2-2 0 01-2-2z' }
    ];

    compareGrid.innerHTML = `
        <div class="col-span-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            ${cars.map((car, idx) => `
                <div class="compare-card bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black italic select-none">0${idx + 1}</div>
                    
                    <div class="relative z-10">
                        <div class="aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/10 group-hover:border-blue-500/30 transition-colors">
                            <img src="${car.images[0]}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                        </div>
                        
                        <h4 class="text-3xl font-bold tracking-tighter mb-10 text-white uppercase break-words">${car.title}</h4>
                        
                        <div class="grid grid-cols-1 gap-1">
                            ${specs.map(s => {
                                let val = s.keypath ? s.keypath.split('.').reduce((obj, key) => obj[key], car) : car[s.key];
                                return `
                                    <div class="flex items-center justify-between py-4 border-b border-white/5 hover:bg-white/5 px-4 rounded-xl transition-colors">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${s.icon}"></path>
                                                </svg>
                                            </div>
                                            <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-500">${s.label}</span>
                                        </div>
                                        <span class="text-sm font-medium text-white">${val}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        
                        <div class="mt-10">
                            <a href="https://wa.me/55000000000" class="block w-full bg-white text-black text-center py-4 rounded-full font-bold text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300">INTERESSADO</a>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    compareModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeCompareModal() {
    document.getElementById('compareModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// ===========================
// Professional Notification System
// ===========================
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Icon based on type
    let iconHTML = '';
    if (type === 'success') {
        iconHTML = '<svg class="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    } else if (type === 'error') {
        iconHTML = '<svg class="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    } else {
        iconHTML = '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    }

    // Create secure elements to avoid XSS
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'flex items-center';
    contentWrapper.innerHTML = iconHTML; // Safe as iconHTML is internal
    
    const textSpan = document.createElement('span');
    textSpan.textContent = message; // SAFE: Sanitizes input automatically
    contentWrapper.appendChild(textSpan);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ml-4 text-zinc-400 hover:text-white transition-colors';
    closeBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
    closeBtn.onclick = () => notification.remove();

    notification.appendChild(contentWrapper);
    notification.appendChild(closeBtn);
    container.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('notification-fade-out');
            setTimeout(() => notification.remove(), 500);
        }
    }, 4500);
}

window.toggleCompare = toggleCompare;
window.clearComparison = clearComparison;
window.startComparison = startComparison;
window.closeCompareModal = closeCompareModal;

window.openProposalModal = openProposalModal;
window.closeProposalModal = closeProposalModal;
window.submitProposal = submitProposal;

// Custom Select Logic
function initCustomSelects() {
    const customSelects = document.querySelectorAll('.custom-select');
    
    customSelects.forEach(select => {
        const trigger = select.querySelector('.custom-select-trigger');
        const options = select.querySelectorAll('.custom-option');
        const hiddenSelect = select.nextElementSibling;
        
        trigger.addEventListener('click', () => {
            select.classList.toggle('open');
        });
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                if (option.classList.contains('selected')) return;
                
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                trigger.querySelector('span').innerText = option.innerText;
                select.classList.remove('open');
                
                // Update hidden select
                hiddenSelect.value = option.dataset.value;
                
                // Trigger change event for calculator
                hiddenSelect.dispatchEvent(new Event('change'));
                
                // Re-calculate financing if applicable
                if (typeof calculateFinancing === 'function') {
                    calculateFinancing();
                }
            });
        });
    });
    
    // Close on outside click
    window.addEventListener('click', (e) => {
        customSelects.forEach(select => {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        });
    });
}

