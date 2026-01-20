// Cyberpunk Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initMobileMenu();
    initTypewriter();
    initParticles();
    initScrollAnimations();
    initSkillsChart();
    initProjectCards();
    initSkillBars();
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
    
    // Typewriter Effect for Hero Section
    function initTypewriter() {
        const typedElement = document.getElementById('typed-text');
        if (typedElement) {
            const typed = new Typed('#typed-text', {
                strings: [
                    'Building Specialist',
                    'Lazy Dev',
                    'Humanoid Root Part',
                    'this is not a game',
                    'def not sleeping',
                    'less was here'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '_'
            });
        }
    }
    
    // Particle System using p5.js
    function initParticles() {
        const particleContainer = document.getElementById('particles');
        if (particleContainer) {
            new p5(function(p) {
                let particles = [];
                const numParticles = 50;
                
                p.setup = function() {
                    const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                    canvas.parent('particles');
                    
                    // Create particles
                    for (let i = 0; i < numParticles; i++) {
                        particles.push(new Particle(p));
                    }
                };
                
                p.draw = function() {
                    p.clear();
                    
                    // Update and display particles
                    for (let particle of particles) {
                        particle.update();
                        particle.display();
                    }
                };
                
                p.windowResized = function() {
                    p.resizeCanvas(window.innerWidth, window.innerHeight);
                };
                
                // Particle class
                function Particle(p) {
                    this.pos = p.createVector(p.random(p.width), p.random(p.height));
                    this.vel = p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5));
                    this.size = p.random(1, 3);
                    this.opacity = p.random(0.3, 0.8);
                    this.color = p.random(['#F8E602', '#00F0FF', '#772289']);
                    
                    this.update = function() {
                        this.pos.add(this.vel);
                        
                        // Wrap around edges
                        if (this.pos.x < 0) this.pos.x = p.width;
                        if (this.pos.x > p.width) this.pos.x = 0;
                        if (this.pos.y < 0) this.pos.y = p.height;
                        if (this.pos.y > p.height) this.pos.y = 0;
                        
                        // Pulse opacity
                        this.opacity += p.sin(p.frameCount * 0.02) * 0.01;
                    };
                    
                    this.display = function() {
                        p.push();
                        p.noStroke();
                        p.fill(this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0'));
                        p.ellipse(this.pos.x, this.pos.y, this.size);
                        p.pop();
                    };
                }
            });
        }
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);
        
        // Observe all project cards and skill items
        document.querySelectorAll('.project-card, .skill-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Skills Radar Chart
    function initSkillsChart() {
        const chartElement = document.getElementById('skills-chart');
        if (chartElement && typeof echarts !== 'undefined') {
            const chart = echarts.init(chartElement);
            
            const option = {
                backgroundColor: 'transparent',
                radar: {
                    indicator: [
                        { name: 'Unity', max: 105 },
                        { name: 'Blender', max: 110 },
                        { name: 'Studio', max: 100 },
                        { name: 'C#', max: 200 },
                        { name: 'Luau', max: 260 },
                        { name: 'Animation', max: 140},
                        { name: 'Godot', max: 190 }
                    ],
                    shape: 'polygon',
                    splitNumber: 4,
                    axisName: {
                        color: '#F8E602',
                        fontSize: 12,
                        fontFamily: 'Orbitron'
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)'
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.5)'
                        }
                    }
                },
                series: [{
                    name: 'Skills',
                    type: 'radar',
                    data: [{
                        value: [95, 88, 92, 85, 78, 82, 75, 80],
                        name: 'Technical Skills',
                        areaStyle: {
                            color: 'rgba(248, 230, 2, 0.2)'
                        },
                        lineStyle: {
                            color: '#F8E602',
                            width: 2
                        },
                        itemStyle: {
                            color: '#F8E602',
                            borderColor: '#00F0FF',
                            borderWidth: 2
                        }
                    }],
                    animationDuration: 2000,
                    animationEasing: 'cubicOut'
                }]
            };
            
            chart.setOption(option);
            
            // Resize chart on window resize
            window.addEventListener('resize', function() {
                chart.resize();
            });
        }
    }
    
    // Project Cards Interactions
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add glitch effect on hover
                const title = this.querySelector('h3');
                if (title) {
                    title.classList.add('animate-glitch');
                    setTimeout(() => {
                        title.classList.remove('animate-glitch');
                    }, 300);
                }
                
                // Add neon glow
                this.style.boxShadow = '0 0 30px rgba(248, 230, 2, 0.4)';
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 0 20px rgba(248, 230, 2, 0.2)';
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add click interaction
            card.addEventListener('click', function() {
                const projectName = this.dataset.project;
                showProjectModal(projectName);
            });
        });
    }
    
    // Skill Bars Animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-out';
                        bar.style.width = width;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
    
    // Project Modal
    function showProjectModal(projectName) {
        const modal = createProjectModal(projectName);
        document.body.appendChild(modal);
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.add('opacity-100');
            modal.querySelector('.modal-content').classList.add('scale-100');
        }, 10);
        
        // Close modal on click outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }
    
    function createProjectModal(projectName) {
        const projects = {
            'neon-racer': {
                title: 'Veil Of Vows',
                description: 'story based game and rpg being worked on wiht many passionate devs including me.',
                technologies: ['Unity', 'main scripter', 'C#'],
                features: [
                    'setting up menus',
                    'setting up general grid of the game',
                    'comprehensible code for assistants',
                    
                ],
                image: 'https://cdn.discordapp.com/attachments/1415503480101273722/1423906152831389696/image.png?ex=696a76b1&is=69692531&hm=00d39b1d4b52ee97b97d8bd0e23cfe79cbe199616c6c956cdd2d2bf5a1016277&'
            },
            'cyber-glitch': {
                title: 'Miracle X',
                description: 'An immersive hacking simulation game where players navigate through digital networks using realistic cybersecurity concepts.',
                technologies: ['Builder', 'modeler', 'luau'],
                features: [
                    
                    'game ready assets',
                    'lighting',
                    'modeling and building paris',
                    'behemoth map building'
                ],
                image: 'https://encycolorpedia.com/f41840.png'
            },
            'neural-nexus': {
                title: 'Sonic Speed Simulator 2',
                description: 'deleted due to supposed multiple violations of copyright and sega content.',
                technologies: ['Builder', 'admin', 'game manager', 'co owner'],
                features: [
                    'game management',
                    'game moderation',
                    'map building',
                    
                ],
                image: 'https://media.discordapp.net/attachments/1018549168177942669/1463170505937915964/180DAY-2a5fb6516cb2af0716dd4232c8928f8c.png?ex=6970db39&is=696f89b9&hm=2ae0aa7918825219bac63f2a5848deafebb857a4099586a2087fdda403eb9c6d&animated=true' 
            }
        };
        
        const project = projects[projectName];
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-cyber-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';
        
        modal.innerHTML = `
            <div class="modal-content bg-cyber-gray border border-cyber-yellow/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-95 transition-transform duration-300">
                <div class="relative">
                    <button class="absolute top-4 right-4 z-10 text-cyber-white hover:text-cyber-yellow transition-colors" onclick="closeModal(this.closest('.fixed'))">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    
                    <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-t-xl">
                    
                    <div class="p-8">
                        <h2 class="font-orbitron font-bold text-3xl mb-4 neon-text text-cyber-yellow">${project.title}</h2>
                        <p class="text-lg text-gray-300 mb-6">${project.description}</p>
                        
                        <div class="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="font-orbitron font-bold text-xl mb-4 text-cyber-cyan">Technologies</h3>
                                <div class="flex flex-wrap gap-2">
                                    ${project.technologies.map(tech => 
                                        `<span class="bg-cyber-cyan/20 text-cyber-cyan px-3 py-1 rounded-full text-sm font-medium">${tech}</span>`
                                    ).join('')}
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="font-orbitron font-bold text-xl mb-4 text-cyber-green">Key Features</h3>
                                <ul class="space-y-2">
                                    ${project.features.map(feature => 
                                        `<li class="flex items-center space-x-2">
                                            <svg class="w-4 h-4 text-cyber-green" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span class="text-gray-300">${feature}</span>
                                        </li>`
                                    ).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="flex space-x-4 mt-8">
                            <button class="cyber-btn px-6 py-3 rounded-lg font-orbitron font-bold">
                                restricted
                            </button>
                            <button class="border-2 border-cyber-cyan px-6 py-3 rounded-lg font-orbitron font-bold text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-black transition-all duration-300">
                                restricted
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    // Close modal function
    window.closeModal = function(modal) {
        modal.classList.remove('opacity-100');
        modal.querySelector('.modal-content').classList.remove('scale-100');
        
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    // Glitch Effect on Text
    function addGlitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let iterations = 0;
        const maxIterations = 10;
        
        const interval = setInterval(() => {
            element.textContent = originalText.split('').map((char, index) => {
                if (index < iterations) return originalText[index];
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }).join('');
            
            iterations += 1;
            if (iterations > maxIterations) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, 50);
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-glitch {
            animation: glitch 0.3s ease-in-out;
        }
        
        .project-card {
            cursor: pointer;
        }
        
        .modal-content {
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .modal-content::-webkit-scrollbar {
            width: 8px;
        }
        
        .modal-content::-webkit-scrollbar-track {
            background: rgba(44, 44, 46, 0.5);
        }
        
        .modal-content::-webkit-scrollbar-thumb {
            background: #F8E602;
            border-radius: 4px;
        }
        
        .modal-content::-webkit-scrollbar-thumb:hover {
            background: #00F0FF;
        }
    `;
    document.head.appendChild(style);
    
    // Console easter egg
    console.log(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                  Wiss Dev                                    ║
    ║                          Welcome to Night City, 2077                         ║
    ║                                                                              ║
    ║                    ██████╗ ██╗   ██╗██████╗ ███████╗                         ║
    ║                   ██╔════╝ ██║   ██║██╔══██╗██╔════╝                         ║
    ║                   ██║      ██║   ██║██████╔╝█████╗                           ║
    ║                   ██║      ██║   ██║██╔══██╗██╔══╝                           ║
    ║                   ╚██████╔ ╚██████╔╝██║  ██║███████╗                         ║
    ║                    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝                         ║
    ║                                                                              ║
    ║               Game Dev | Unity Intermediate |  Studio Expert                 ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
    `);
    
    console.log('%cWelcome to the CyberDev Portfolio!', 'color: #F8E602; font-size: 16px; font-weight: bold;');
    console.log('%cFeel free to explore the code and see how this cyberpunk experience was crafted.', 'color: #00F0FF; font-size: 14px;');
    console.log('%cInterested in collaboration? Check out the contact section!', 'color: #772289; font-size: 14px;');
});

// Smooth scrolling for anchor links
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

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}