let currentLang = document.querySelector('#currentLang');
let dropdown = document.querySelector('.other-langs');
let searchQuery = document.querySelector('.search-query');
let searchButton = document.querySelector('.searchButton');
let typeSearch = document.querySelector('.typeSearch');
let startContainer = document.querySelector('.index-container');
let resultsContainer = document.querySelector('.results')
searchButton.addEventListener('click', checkSearch);
currentLang.addEventListener('click', showLanguages);
function showLanguages() {
    dropdown.style.display = 'block';
    dropdown.style.opacity = 1;
    setTimeout(() => {
        dropdown.style.opacity = 0;
        dropdown.style.display = 'none';
    }, 3000)
}
function checkSearch() {
    let value = searchQuery.value;
    let typeValue = typeSearch.value;
    if (value.length > 0) {
        showResults(value, typeValue);
    } else {
        alert('Insert the title')
    }
}
async function showResults(value, typeValue) {
    try {
        let conexion = await makeSearch(value, typeValue);
        let datos = conexion.result;
        console.log(datos)
        let items = datos.map(element => {
            if (element.year === undefined) {
                element.year = '';
            }
            return `<article class="single-item">
            <h2>${element.originalTitle}</h2>
            <div class="item-info">
            ${element.year} - ${element.type.toUpperCase()}
            </div>
            </article>`
        });
        startContainer.style.display = 'none';
        resultsContainer.innerHTML = items.join('');
    } catch (error) {
        console.log(error)
    }
}
function makeSearch(value, type) {
    let API = 'https://streaming-availability.p.rapidapi.com/search/title';
    let actualType = 'all';
    let options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/search/title',
        headers: {
            'X-RapidAPI-Key': 'b886c49a5bmsh3ccb4f7d96ef647p1e0386jsnf4cb19d2acbd',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    }
    if (type !== 'both') {
        actualType = type;
    }
    return fetch(`${API}?title=${value}&country=us&show_type=${actualType}`, options)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error));
}