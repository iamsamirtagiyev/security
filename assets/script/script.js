const nav = document.querySelector('nav')
const icon = document.querySelector('.icon')
const menu = document.querySelector('.menu')

window.onscroll = ()=>{
    if(window.scrollY > 30){
        nav.style.background = 'rgba(0, 0, 0, .8)'
    }
    else{
        nav.style.background = 'transparent'
    }
}

icon.addEventListener('click', () => {
    if (icon.classList.contains('bx-menu')) {
        menu.classList.add('active')
        icon.classList.replace('bx-menu', 'bx-x')
    }
    else {
        menu.classList.remove('active')
        icon.classList.replace('bx-x', 'bx-menu')
    }
})