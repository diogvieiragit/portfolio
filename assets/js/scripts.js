
const navbarToggler = document.querySelector('.navbar-toggler');
const fullscreenMenu = document.querySelector('#navbarFullScreen');


navbarToggler.addEventListener('click', () => {
    fullscreenMenu.classList.toggle('show');
    document.body.classList.toggle('fullscreen-active');
});


/*-------------------------------------------------------------------*/


const hamburgerIcon = document.getElementById('hamburger-icon');
const navbarCollapse = document.getElementById('navbarSupportedContent');


function changeIcon(icon) {
    hamburgerIcon.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
    hamburgerIcon.style.opacity = 0; 
    hamburgerIcon.style.transform = 'scale(0.8)';  

    setTimeout(function () {
        hamburgerIcon.src = icon; 
        hamburgerIcon.style.opacity = 1; 
        hamburgerIcon.style.transform = 'scale(1)'; 
    }, 200); 
}


navbarCollapse.addEventListener('shown.bs.collapse', function () {
    changeIcon('/Portifolio/assets/images/xbutton.svg');  // Ícone de "X"
});


navbarCollapse.addEventListener('hidden.bs.collapse', function () {
    changeIcon('/Portifolio/assets/images/burguer.svg'); 
});


/*-------------------------------------------------------------------------*/

const icons = {
    "monitor-icon": {
        default: "/Portifolio/assets/images/home/rectangle-duotone.svg",
        hover: "/Portifolio/assets/images/home/rectangle-fill.svg"
    },
    "eye-icon": {
        default: "/Portifolio/assets/images/home/eye-closed-duotone.svg",
        hover: "/Portifolio/assets/images/home/eye-fill.svg"
    },
    "book-icon": {
        default: "/Portifolio/assets/images/home/book-duotone.svg",
        hover: "/Portifolio/assets/images/home/book-open-text-fill.svg"
    }
};



function applyHoverEffect(img, isHovering) {
    const id = img.id;

    if (icons[id]) {
        img.style.opacity = 0;
        setTimeout(() => {
            img.src = isHovering ? icons[id].hover : icons[id].default;
            img.style.opacity = 1;
            if (id === "monitor-icon") {
                if (isHovering) {
                    img.classList.add('glow');
                } else {
                    img.classList.remove('glow');
                }
            }
        }, 200);
    }
}


let activeIcon = null;


function resetActiveIcon() {
    if (activeIcon) {
        applyHoverEffect(activeIcon, false); 
        activeIcon = null; 
    }
}


document.querySelectorAll('.icon').forEach(img => {
    // Eventos para desktop (hover)
    img.addEventListener('mouseover', () => applyHoverEffect(img, true));
    img.addEventListener('mouseout', () => applyHoverEffect(img, false));

    // Eventos para dispositivos móveis (toque)
    ['click', 'touchstart'].forEach(evt => {
        img.addEventListener(evt, (event) => {
            event.preventDefault(); // Evita comportamento indesejado
            event.stopImmediatePropagation(); 
    
            if (activeIcon === img) {
                resetActiveIcon();
            } else {
                resetActiveIcon();
                applyHoverEffect(img, true);
                activeIcon = img;
            }
        });
    });
    
    
});

// Fecha o ícone ativo ao clicar fora dele
document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('icon')) {
        resetActiveIcon(); // Reseta ícones se o clique for fora de um ícone
    }
});

/*--------------------------------------------------------------------*/