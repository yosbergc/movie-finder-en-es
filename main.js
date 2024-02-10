let currentLang = document.querySelector('#currentLang');
let dropdown = document.querySelector('.other-langs');
currentLang.addEventListener('click', showLanguages);
function showLanguages() {
    dropdown.style.display = 'block';
    dropdown.style.opacity = 1;
    setTimeout(() => {
        dropdown.style.opacity = 0;
        dropdown.style.display = 'none';
    }, 3000)
}
