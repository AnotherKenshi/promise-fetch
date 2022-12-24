const URL = 'https://jsonplaceholder.typicode.com/photos'

const dataContainer = document.querySelector('#data-container')

const loaderToggle = () => {
    const loader = document.querySelector('#loader')
    const isHidden = loader.hasAttribute('hidden')
    if (isHidden) {
        loader.removeAttribute('hidden')
    } else {
        loader.setAttribute('hidden', '')
    }
}

function createNewElement(src, text) {
    newListItem = document.createElement('li')
    newListItem.className = 'photo-item'
    newImage = document.createElement('img')
    newImage.className = 'photo-item__image'
    newImage.src = src
    newH3 = document.createElement('h3')
    newH3.className = 'photo-item__title'
    newH3.textContent = text
    newListItem.append(newImage, newH3)
    return newListItem
}

const getFastestLoadedPhoto = (ids) => {
    const requests = ids.map((id) => fetch(`${URL}/${id}`))
    Promise.race(requests)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка запроса')
            }
            return response.json();
        })
        .then((result) => {
            console.log(result);
            const newUser = createNewElement(result.url, result.title)
            dataContainer.append(newUser)
        })
}

getFastestLoadedPhoto([60, 12, 55]);