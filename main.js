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
    const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
    const petsData = await petsPromise.json()
    petsData.forEach(pet => {
        const clone = template.content.cloneNode(true)
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
