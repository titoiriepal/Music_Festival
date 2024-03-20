

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
}


function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i<=12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML =`
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" src="build/img/thumb/${i}.jpg" width="100%" height="100%" alt="Imagen Galería foto ${i}">
        `;

        imagen.onclick = function () {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){

    const body = document.querySelector('body');

    const imagen = document.createElement('picture');
        imagen.innerHTML =`
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" src="build/img/grande/${id}.jpg" width="100%" height="100%" alt="Imagen Galería foto ${id}">
        `;

    //Crea el overlay con la imagen
    const overlay = document.createElement( 'div' );
    overlay.appendChild( imagen );
    overlay.classList.add( 'overlay' );
    overlay.onclick = function () {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    //Botón para cerrar el modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar')

    cerrarModal.onclick = function (){
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    overlay.appendChild(cerrarModal);

    //Añadirlo al HTML 
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}