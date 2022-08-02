const iconMenu = document.querySelector('#icono-menu'),
menu = document.querySelector('#menu');
iconMenu.addEventListener('click', (e)=>{
    menu.classList.toggle('active');
    document.body.classList.toggle('opacity');

    const rutaActual  = e.target.getAttribute('src')

    if(rutaActual == 'image'){
        e.target.setAttribute('src', 'image')
    }else{
        e.target.setAttribute('src', 'image')
    }
})