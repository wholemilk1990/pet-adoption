const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()

async function start() {
    const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
    const weatherData = await weatherPromise.json()

    const miamiTemp = weatherData.properties.periods[0].temperature

    document.querySelector("#temp-output").textContent = miamiTemp
}

start()

async function petsArea() {
    const petsPromise = await fetch("https://glistening-croquembouche-22cf9e.netlify.app/.netlify/functions/pets")
    const petsData = await petsPromise.json()
    petsData.forEach(pet => {
        const clone = template.content.cloneNode(true)
        clone.querySelector(".pet-card").dataset.species = pet.species
        clone.querySelector("h3").textContent = pet.name
        clone.querySelector(".pet-description").textContent = pet.description
        clone.querySelector(".pet-age").textContent = CreateAgeText(pet.birthYear)

        if (!pet.photo) pet.photo = "images/fallback.jpg"

        clone.querySelector(".pet-card-photo img").src = pet.photo
        clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`

        wrapper.appendChild(clone)
    })
    document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()


function CreateAgeText(birthYear) {
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear

    if (age == 1) return "1 year old"
    if (age == 0) return "less than a year old"
    return `${age} years old`
}


// pet filter button code

const allButtons = document.querySelectorAll(".pet-filter button")

allButtons.forEach(el => {
    el.addEventListener("click", buttonClick)
})

function buttonClick(e) {
    //remove active class from all buttons
    allButtons.forEach(el => el.classList.remove("selected"))

    // add active class to the clicked button

    e.target.classList.add("selected")

    // filter pets in list
    const currentFilter = e.target.dataset.filter
    document.querySelectorAll(".pet-card").forEach(el => {

        if (currentFilter == el.dataset.species || currentFilter == "all") {
            el.style.display = "grid"
        } else {
            el.style.display = "none"
        }
    })
}



