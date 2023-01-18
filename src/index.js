const dogURL = 'http://localhost:3000/pups'
let filterSetting = false

document.addEventListener('DOMContentLoaded', event => {
    fetch(dogURL)
        .then(resp => resp.json())
        .then(data => renderDogs(data))

    const filter = document.getElementById('good-dog-filter')
    filter.addEventListener('click', () => {
        filterSetting = !filterSetting
        filterGoodDogs()
        filter.textContent = filterSetting ? 'Filter good dogs: ON' : 'Filter good dogs: OFF'
    })
})

function renderDogs(dogs) {
    const dogBar = document.getElementById('dog-bar')
    dogs.forEach(element => {
        const span = document.createElement('span')
        span.textContent = element.name
        span.addEventListener('click', () => {
            const dogInfo = document.getElementById('dog-info')
            dogInfo.innerHTML = ''
            renderDog(element)
        })
        dogBar.appendChild(span)
    })
}

function renderGoodDogs(dogs) {
    const dogBar = document.getElementById('dog-bar')
    dogs.forEach(element => {
        if (element.isGoodDog && filterSetting) {
            const span = document.createElement('span')
            span.textContent = element.name
            span.addEventListener('click', () => {
                const dogInfo = document.getElementById('dog-info')
                dogInfo.innerHTML = ''
                renderDog(element)
            })
            dogBar.appendChild(span)
        }
    })
}

function renderDog(dog) {
    const dogInfo = document.getElementById('dog-info')
    const dogImg = document.createElement('img')
    const dogName = document.createElement('h2')
    const button = document.createElement('button')
    const isGoodDog = dog.isGoodDog
    const dogId = dog.id

    dogImg.src = dog.image
    dogName.textContent = dog.name
    button.textContent = isGoodDog ? 'Good Dog' : 'Bad Dog'
    button.id = 'goodness'

    button.addEventListener('click', () => {
        toggleGoodness(dogId)
    })

    dogInfo.appendChild(dogImg)
    dogInfo.appendChild(dogName)
    dogInfo.appendChild(button)
}

function toggleGoodness(dogId) {
    let goodDog = true
    let dogButton = document.getElementById('goodness')
    if (dogButton.textContent === 'Bad Dog') {
        goodDog = false
    }
    const dogObj = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: !goodDog
        })
    }
    dogButton.textContent = (goodDog ? 'Bad Dog' : 'Good Dog')

    fetch(`${dogURL}/${dogId}`, dogObj)

}

function filterGoodDogs() {
    const dogBar = document.getElementById('dog-bar')
    dogBar.innerHTML = ''
    if (filterSetting) {
        // ON
        fetch(dogURL)
            .then(resp => resp.json())
            .then(data => renderGoodDogs(data))
    } else {
        // OFF
        fetch(dogURL)
            .then(resp => resp.json())
            .then(data => renderDogs(data))
    }
}