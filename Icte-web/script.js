/* ==========================================
   ICTE INTERACTIVE ENGINE (2026 EDITION)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== 1. COMPORTAMIENTO DEL NAVBAR AL SCROLL =====
  const header = document.querySelector('header');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  
  const handleScroll = () => {
    const isHomePage = document.getElementById('inicio');
    const activeHash = window.location.hash.substring(1);
    const forceScrolled = isHomePage && activeHash && activeHash !== 'inicio';

    if (window.scrollY > 50 || forceScrolled) {
      header.classList.add('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.add('active');
    } else {
      header.classList.remove('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.remove('active');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Ejecución inicial por si la página carga con scroll

  // ===== 2. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER) =====
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Dejamos de observar una vez animado para mejor rendimiento
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(el => animationObserver.observe(el));

  // ===== 3. CONTADORES NUMÉRICOS ANIMADOS =====
  const statsSection = document.getElementById('inicio') || document.querySelector('.hero-stats-wrapper');
  let statsAnimated = false;
  
  const animateCounters = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 segundos de animación
      const startTime = performance.now();
      
      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing de salida (Quad Out) para mayor fluidez
        const easeProgress = progress * (2 - progress);
        const currentVal = Math.floor(easeProgress * target);
        
        stat.textContent = currentVal + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target + suffix;
        }
      };
      
      requestAnimationFrame(updateCount);
    });
  };
  
  // Observamos el contenedor de estadísticas para activar la animación justo a tiempo
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateCounters();
        statsAnimated = true;
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  const statsWrapper = document.querySelector('.hero-stats-wrapper');
  if (statsWrapper) {
    statsObserver.observe(statsWrapper);
  }

  // ===== 4. FILTRADO DE LA GALERÍA =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Activar botón seleccionado
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        // Transición de salida antes de filtrar
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          if (filterValue === 'all' || filterValue === category) {
            item.style.display = 'block';
            // Forzar un reflow para que la animación de entrada funcione
            item.offsetHeight; 
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          } else {
            item.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  // ===== 5. LIGHTBOX NATIVO PARA LA GALERÍA =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  
  if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-item-title');
        
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          if (lightboxCaption) {
            lightboxCaption.textContent = title ? title.textContent : '';
          }
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Bloquear scroll de la página
        }
      });
    });
    
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restaurar scroll
    };
    
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('container') || e.target.closest('.row')) {
        closeLightbox();
      }
    });
    
    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ===== 6. CERRAR MENÚ OFFCANVAS AL HACER CLIC EN UN ENLACE =====
  const offcanvasElement = document.getElementById('menuOffcanvas');
  const offcanvasLinks = offcanvasElement ? offcanvasElement.querySelectorAll('.nav-link') : [];
  
  if (offcanvasElement && typeof bootstrap !== 'undefined') {
    offcanvasLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Encontrar la instancia de Bootstrap Offcanvas y cerrarla
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        }
      });
    });
  }

  // ===== 7. ENVÍO DEL FORMULARIO DE CONTACTO CON EFECTO PREMIUM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Simular carga de envío
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin me-2"></i>Enviando...';
      
      setTimeout(() => {
        // Simular éxito
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>¡Mensaje Enviado!';
        submitBtn.classList.remove('btn-premium-gold');
        submitBtn.style.backgroundColor = '#28a745';
        submitBtn.style.color = '#ffffff';
        
        // Resetear formulario
        contactForm.reset();
        
        // Limpiar inputs flotantes
        const inputs = contactForm.querySelectorAll('.form-control-premium');
        inputs.forEach(input => {
          input.dispatchEvent(new Event('input')); // Actualiza etiquetas flotantes
        });
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
          submitBtn.classList.add('btn-premium-gold');
        }, 3000);
        
      }, 1500);
    });
  }

  // ===== 8. SECCIÓN PÁGINAS DE CARRERAS (DASHBOARD TABS INTERACTIVOS - SOPORTE MULTI-CARRERA SPA) =====
  const initCareerDashboards = () => {
    const dashboards = document.querySelectorAll('.career-dashboard');
    dashboards.forEach(dashboard => {
      const tabs = dashboard.querySelectorAll('.dashboard-tab-btn');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetTab = tab.getAttribute('data-tab');
          const currentActivePanel = dashboard.querySelector('.dashboard-panel.active');
          const targetPanel = dashboard.querySelector(`#tab-panel-${targetTab}`);

          if (currentActivePanel && targetPanel && currentActivePanel !== targetPanel) {
            // Desactivar pestañas de este dashboard
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Efecto de transición de salida del panel activo actual
            currentActivePanel.style.opacity = '0';
            currentActivePanel.style.transform = 'translateY(15px)';

            setTimeout(() => {
              currentActivePanel.classList.remove('active');
              currentActivePanel.style.display = 'none';
              
              // Preparar y mostrar el nuevo panel
              targetPanel.style.display = 'block';
              targetPanel.offsetHeight; // Forzar reflow
              targetPanel.classList.add('active');
              targetPanel.style.opacity = '1';
              targetPanel.style.transform = 'translateY(0)';
            }, 300);
          }
        });
      });
    });
  };
  initCareerDashboards();

  // ===== 9. SISTEMA DE PESTAÑAS (SPA) PARA LA PÁGINA PRINCIPAL =====
  const initMainTabs = () => {
    const isHomePage = document.getElementById('inicio');
    if (!isHomePage) return;

    const tabMappings = {
      'inicio': ['#inicio', '.hero-stats-wrapper', '#convenios'],
      'sobre-icte': ['#sobre-icte', '#testimonios'],
      'facultades': ['#facultades'],
      'telecomunicaciones': ['#carrera-telecomunicaciones'],
      'computacion': ['#carrera-computacion'],
      'administrativa': ['#carrera-administrativa'],
      'investigacion': ['#investigacion'],
      'campus-virtual': ['#campus-virtual'],
      'noticias': ['#noticias', '#galeria'],
      'contacto': ['#contacto']
    };

    try {
      // Registrar todas las secciones de pestañas de forma segura (sin usar .flat() de ES2019)
      Object.keys(tabMappings).forEach(key => {
        tabMappings[key].forEach(selector => {
          const el = document.querySelector(selector);
          if (el) el.classList.add('main-tab-section');
        });
      });

      const activateTab = (tabId) => {
        const activeTabId = tabMappings[tabId] ? tabId : 'inicio';

        // 1. Ocultar todas las pestañas
        Object.keys(tabMappings).forEach(key => {
          tabMappings[key].forEach(selector => {
            const el = document.querySelector(selector);
            if (el) {
              el.classList.remove('active', 'active-show');
            }
          });
        });

        // 2. Mostrar la pestaña activa con transición
        tabMappings[activeTabId].forEach(selector => {
          const el = document.querySelector(selector);
          if (el) {
            el.classList.add('active');
            // Forzar reflow
            el.offsetHeight;
            el.classList.add('active-show');
          }
        });

        // 3. Sincronizar estado de enlaces activos en los menús
        const allLinks = document.querySelectorAll('.navbar-nav .nav-link, .offcanvas-premium .nav-link');
        allLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href) {
            const cleanHash = href.split('#')[1];
            if (cleanHash === activeTabId) {
              link.classList.add('active-tab');
            } else {
              link.classList.remove('active-tab');
            }
          }
        });

        // 4. Controlar el color de fondo del header
        if (header) {
          if (activeTabId === 'inicio') {
            handleScroll();
          } else {
            header.classList.add('scrolled');
          }
        }

        // 5. Desplazar al inicio de la página suavemente
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        // 6. Activar animaciones de entrada en la pestaña activa
        tabMappings[activeTabId].forEach(selector => {
          const container = document.querySelector(selector);
          if (container) {
            if (container.classList.contains('animate-on-scroll')) {
              container.classList.add('animated');
            }
            const elements = container.querySelectorAll('.animate-on-scroll');
            if (elements && elements.forEach) {
              elements.forEach((el, idx) => {
                setTimeout(() => {
                  el.classList.add('animated');
                }, idx * 60);
              });
            }
          }
        });

        // 7. Lanzar animación de contadores en la pestaña Inicio
        if (activeTabId === 'inicio') {
          setTimeout(() => {
            if (typeof animateCounters === 'function') {
              animateCounters();
            }
          }, 400);
        }
      };

      // Escuchar el evento hashchange
      window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        activateTab(hash);
      });

      // Carga inicial
      const initialHash = window.location.hash.substring(1);
      activateTab(initialHash || 'inicio');

    } catch (error) {
      console.error("Error en el sistema de pestañas SPA, restaurando vista convencional:", error);
      // Plan de contingencia ante fallos: remover clases para evitar pantallas negras
      Object.keys(tabMappings).forEach(key => {
        tabMappings[key].forEach(selector => {
          const el = document.querySelector(selector);
          if (el) {
            el.classList.remove('main-tab-section', 'active', 'active-show');
          }
        });
      });
    }
  };

  // Inicializar pestañas
  initMainTabs();
});
