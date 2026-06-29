# ICTE - Instituto Científico y Tecnológico del Ejército

![Estado del Proyecto](https://img.shields.io/badge/Estado-Listo_para_Producción-success?style=for-the-badge)
![Tecnologías](https://img.shields.io/badge/Tech-HTML5_/_CSS3_/_JS_/_Bootstrap_5-blue?style=for-the-badge)
![Licencia](https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge)

Este repositorio contiene el sitio web oficial rediseñado y optimizado del **Instituto Científico y Tecnológico del Ejército (ICTE)**. Es una plataforma web premium orientada a la difusión académica, científica y tecnológica de las carreras de ingeniería de la institución en el Perú.

El sitio ha sido diseñado con un enfoque moderno de **ciberdefensa y alta tecnología**, utilizando una estética de cristal templado (glassmorphism), fondos con cuadrículas digitales y micro-interacciones fluidas.

---

## 🚀 Características Principales

* **Diseño Premium y Responsivo**: Interfaz completamente adaptada para dispositivos móviles, tablets y computadoras de escritorio usando **Bootstrap 5.3**.
* **Estética Cyber-Military**: Paleta de colores institucional basada en el verde militar profundo (`#143422`) y el dorado champagne (`#c5a880`), complementada con un patrón de cuadrícula tecnológica (`cyber-grid`) y efectos de resplandor.
* **Navegación SPA (Single Page Application)**: Sistema de pestañas dinámico implementado con Vanilla JS que permite transiciones suaves entre secciones sin recargar la página.
* **Dashboards de Carreras Interactivos**: Mallas y planes curriculares detallados organizados de forma interactiva en las páginas de especialidades:
  * [Ingeniería en Ciencias de la Computación](computacion.html)
  * [Ingeniería de Telecomunicaciones](telecomunicaciones.html)
  * [Ingeniería Administrativa](administrativa.html)
* **Formulario de Contacto Premium**: Con validación visual interactiva y efectos de carga al enviar los datos.
* **Galería con Lightbox Integrado**: Visualizador de imágenes a pantalla completa desarrollado de forma nativa sin dependencias externas.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5**: Estructura semántica avanzada para SEO.
* **CSS3 (Vanilla)**: Sistema de variables avanzadas, gradientes y animaciones personalizadas.
* **JavaScript (ES6+)**: Motores de animación de scroll (Intersection Observer), contadores numéricos, filtrado de galería y navegación SPA.
* **Bootstrap 5.3.2**: Framework de diseño responsivo y componentes de interfaz.
* **Font Awesome 6.4.0**: Iconografía vectorial de alta definición.
* **Google Fonts**: Tipografía premium usando *Outfit* para encabezados y *Plus Jakarta Sans* para el cuerpo de texto.

---

## 📂 Estructura del Proyecto

```text
Icte-web/
├── index.html                  # Página de aterrizaje principal (Landing Page)
├── computacion.html            # Detalle de Ingeniería en Ciencias de la Computación
├── telecomunicaciones.html     # Detalle de Ingeniería de Telecomunicaciones
├── administrativa.html         # Detalle de Ingeniería Administrativa
├── nosotros.html               # Página de información institucional rápida
├── style.css                   # Sistema de diseño y hojas de estilo generales
├── script.js                   # Lógica de interacciones, SPA y efectos dinámicos
├── img/                        # Recursos de imágenes y logotipos del sitio
├── LICENSE                     # Licencia MIT de código abierto
├── .gitignore                  # Exclusión de archivos temporales
└── README.md                   # Documentación del proyecto (este archivo)
```

---

## 💻 Instalación y Ejecución Local

Para visualizar y probar el proyecto localmente, sigue estos sencillos pasos:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
   ```
2. **Navega a la carpeta del proyecto**:
   ```bash
   cd nombre-del-repositorio
   ```
3. **Abre el archivo principal**:
   * Simplemente haz doble clic en `index.html` para abrirlo en cualquier navegador web.
   * *Recomendado*: Si utilizas **VS Code**, puedes abrir el proyecto y usar la extensión **Live Server** para tener una experiencia de recarga en tiempo real en la dirección `http://localhost:5500`.

