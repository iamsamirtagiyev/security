
const security = "http://localhost:3000/security"
const favorite = "http://localhost:3000/favorites"

const nav = document.querySelector('nav')
const icon = document.querySelector('.icon')
const menu = document.querySelector('.menu')
const cardWrapper = document.querySelector('.card-wrapper')
const update = document.querySelector('.update')
const updateWrapper = document.querySelector('.update-wrapper')
const updFile = document.querySelector('#upd-img')
const updImg = document.querySelector('.upd-img img')
const updName = document.querySelector('.upd-name')
const updDesc = document.querySelector('.upd-desc')
const updBtn = document.querySelector('.update-wrapper button')
const add = document.querySelector('.add')
const addWrapper = document.querySelector('.add-wrapper')
const addFile = document.querySelector('#add-img')
const addImg = document.querySelector('.add-img img')
const addName = document.querySelector('.add-name')
const addDesc = document.querySelector('.add-desc')
const saveBtn = document.querySelector('.add-wrapper button')
const addButton = document.querySelector('.add-button')
const search = document.querySelector('.search-box input')
const loadMore = document.querySelector('.load-more')

let count = 1
let fav = []
let searchArray = []


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

const showData = (page) => {
    fetch(`${security}?_page=${page}&_limit=3`).then(response => response.json()).then(data => {
        searchArray.push(data)
        data.forEach(item => {
            cardWrapper.innerHTML += `
            <div class="card">
                <i class="bx bx-heart fav-icon" id="${item.id}" onclick="addFav(${item.id})"></i>
                <div class="image" onclick="goToDetails(${item.id})">
                    <img src="${item.url}" alt="card">
                </div>
                <div class="about" onclick="goToDetails(${item.id})">
                    <h2 class="title">${item.name}</h2>
                    <p>${item.description}</p>
                </div>
                <div class="buttons">
                    <button onclick="updateFunc(${item.id})">Update</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </div>
            </div>`


        });

        return searchArray.flat()

        JSON.parse(localStorage.getItem('favourites')).forEach(localId => {
            document.querySelectorAll('.fav-icon').forEach(icon => {
                if(icon.id == localId){
                    icon.classList.replace('bx-heart', 'bxs-heart')
                    icon.classList.add('favourite')
                }
            })
        })

        
    }) .then(data => {
        search.addEventListener('input', (e) => {
            let search = e.target.value;
            console.log(search);
            if (search) {
                data.filter(card => {
                    cardWrapper.innerHTML = ''
                    return card.name.toLowerCase().includes(search.toLowerCase())
                }).forEach(item => {
                    cardWrapper.innerHTML += `
            <div class="card">
                <i class="bx bx-heart fav-icon" id="${item.id}" onclick="addFav(${item.id})"></i>
                <div class="image" onclick="goToDetails(${item.id})">
                    <img src="${item.url}" alt="card">
                </div>
                <div class="about" onclick="goToDetails(${item.id})">
                    <h2 class="title">${item.name}</h2>
                    <p>${item.description}</p>
                </div>
                <div class="buttons">
                    <button onclick="updateFunc(${item.id})">Update</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </div>
            </div>`
                })
            }
            else {
                cardWrapper.innerHTML = ''
                data.forEach(item => {
                    cardWrapper.innerHTML += `
            <div class="card">
                <i class="bx bx-heart fav-icon" id="${item.id}" onclick="addFav(${item.id})"></i>
                <div class="image" onclick="goToDetails(${item.id})">
                    <img src="${item.url}" alt="card">
                </div>
                <div class="about" onclick="goToDetails(${item.id})">
                    <h2 class="title">${item.name}</h2>
                    <p>${item.description}</p>
                </div>
                <div class="buttons">
                    <button onclick="updateFunc(${item.id})">Update</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </div>
            </div>`
                })
            }
        })

    })
}

showData(count)

loadMore.onclick = () => {
    count++
    showData(count)
}

const addFav = (id) => {
    if (event.target.classList.contains('favourite')) {
        event.target.classList.remove('favourite')
        event.target.classList.replace('bxs-heart', 'bx-heart')
        check()
        fav.pop(id)
        localStorage.setItem('favourites', JSON.stringify(fav))

        axios.delete(`${favorite}/${id}`)
        
    }
    else {
        event.target.classList.add('favourite')
        event.target.classList.replace('bx-heart', 'bxs-heart')
        check()
        fav.push(id)
        localStorage.setItem('favourites', JSON.stringify(fav))

        axios.get(`${security}/${id}`).then(response => {
            axios.post(favorite, response.data)
        })
    }
}

const check = () => {
    if (localStorage.getItem('favourites') == null) {
        fav = []
    }
    else {
        fav = JSON.parse(localStorage.getItem("favourites"));
    }
}


const deleteItem = (id) => {
    axios.delete(`${security}/${id}`).then(res => window.location.reload())
}

const goToDetails = (id) => window.location = `details.html?id=${id}`

const updateFunc = (id) => {
    update.classList.add('active')
    updateWrapper.classList.add('active')

    fetch(`${security}/${id}`).then(response => response.json()).then(data => {
        updImg.src = data.url
        updName.value = data.name
        updDesc.value = data.description
    })

    updBtn.onclick = () => {
        if (updName.value != '' && updDesc.value != '') {
            let reader = new FileReader()
            reader.readAsDataURL(updFile.files[0])
            reader.onload = (e) => {
                axios.patch(`${security}/${id}`, {
                    url: e.target.result,
                    name: updName.value,
                    description: updDesc.value
                })
            }
        }
        else {
            alert('Xanaları doldurmağınız şərtdir!!!')
        }
    }
}

update.onclick = (e) => {
    if (e.target.classList.contains('container')) {
        update.classList.remove('active')
        updateWrapper.classList.remove('active')
    }
}
add.onclick = (e) => {
    if (e.target.classList.contains('container')) {
        add.classList.remove('active')
        addWrapper.classList.remove('active')
    }
}

updFile.onchange = () => {
    updImg.src = URL.createObjectURL(updFile.files[0])
}
addFile.onchange = () => {
    addImg.src = URL.createObjectURL(addFile.files[0])
}

addButton.onclick = () => {
    add.classList.add('active')
    addWrapper.classList.add('active')
}

saveBtn.onclick = () => {
    if (addName.value != '' && addDesc.value != '') {
        let reader = new FileReader()
        reader.readAsDataURL(addFile.files[0])
        reader.onload = (e) => {
            axios.post(security, {
                url: e.target.result,
                name: addName.value,
                description: addDesc.value
            }).then(response => window.location.reload())
        }
    }
    else {
        alert('Xanaları doldurmağınız şərtdir!!!')
    }
}

