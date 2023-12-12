let id = new URLSearchParams(window.location.search).get('id')
const detailsWrapper = document.querySelector('.details-wrapper')

fetch(`http://localhost:3000/security/${id}`).then(response => response.json())
.then(data => {
    detailsWrapper.innerHTML += `
        <div class="image">
            <img src="${data.url}" alt="">
        </div>
        <div class="about">
            <h1>${data.name}</h1>
            <span>${data.description}</span>
            <a href="index.html">Ana Səhifə</a>
        </div>`
})
