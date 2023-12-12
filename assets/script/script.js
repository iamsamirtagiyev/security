const security = "http://localhost:3000/security"
const favorite = "http://localhost:3000/favorite"

const nav = document.querySelector('nav')
const icon = document.querySelector('.icon')
const menu = document.querySelector('.menu')
const cardWrapper = document.querySelector('.card-wrapper')


window.onscroll = () => {
    if (window.scrollY > 30) {
        nav.style.background = 'rgba(0, 0, 0, .8)'
    }
    else {
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

fetch(security).then(response => response.json()).then(data => {
    data.forEach(item => {
        cardWrapper.innerHTML += `
        <div class="card" onclick="goToDetails(${item.id})">
            <i class="bx bx-heart favorite")></i>
            <div class="image">
                <img src="${item.url}" alt="card">
            </div>
            <div class="about">
                <h2 class="title">${item.name}</h2>
                <p>${item.description}</p>
            </div>
            <div class="buttons">
                <button>Update</button>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </div>
        </div>`
    });
})

const deleteItem = (id) =>{
    axios.delete(`${security}/${id}`).then(res => window.location.reload())
}

const goToDetails = (id) => window.location = `details.html?id=${id}`
