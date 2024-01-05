const monsterAPI = 'http://localhost:3000/monsters';
const monsterContainer = document.getElementById('monster-container');
const createMonster = document.getElementById('create-monster');
const loadMoreButton = document.getElementById('load-more');
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

let monsterList = [];
let currentPage = 1;

// Initial fetch 
fetch(`${monsterAPI}/?_limit=50&_page=${currentPage}`)
    .then(resp => resp.json())
    .then(json => {
        monsterList = json;
        renderMonsters();
    });

function addMonster(event){
    event.preventDefault()
const form = event.target
const newMonster = {
    name: form.name.value,
    age: form.age.value,
    description: form.description.value
}
fetch(monsterAPI, {
    headers,
    method: "POST",
    body: JSON.stringify(newMonster)
})
.then(resp => resp.json())
.then(json => {
    monsterList.push(json)
})
renderMonsters()
}

function renderMonsters(){
    monsterContainer.innerHTML = " ";
    monsterList.forEach(renderMonster)
}

function renderMonster(monster){
    const listedMonsters = document.createElement('div')
    listedMonsters.classList.add("added-monster")
    listedMonsters.innerHTML = `
    <h2>${monster.name}</h2>  
    <h3>${monster.age}<h3>
    <p>${monster.description}</p>
    `;
    monsterContainer.append(listedMonsters)
}

    const formMonst = document.createElement('form');
    const nameInput = document.createElement('input');
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", 'Monster Name');
    nameInput.setAttribute('id', 'name');

    const ageInput = document.createElement('input');
    ageInput.setAttribute('type', 'text');
    ageInput.setAttribute('placeholder', 'Monster Age');
    ageInput.setAttribute('id', 'age');

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('placeholder', 'Monster Description');
    descriptionInput.setAttribute('id', 'description');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit'); 
    submitButton.textContent = "Create Monster";

    formMonst.append(nameInput, ageInput, descriptionInput, submitButton);
    createMonster.append(formMonst);

    // Add submit event listener to the form
    formMonst.addEventListener("submit", newMonster)


function newMonster(event) {
    event.preventDefault();
    const form = event.target;
    const addNewMonster = {
        name: form.name.value,
        age: form.age.value,
        description: form.description.value,
    };

    fetch(monsterAPI, {
        headers,
        method: "POST",
        body: JSON.stringify(addNewMonster)
    })
    .then(resp => resp.json())
    .then(json => {
        monsterList.push(json);
        renderMonsters();
    });
}

loadMoreButton.addEventListener('click', () => {
    currentPage++;

    // Fetch the next 50 monsters and append them to the existing list
    fetch(`${monsterAPI}/?_limit=50&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(json => {
            monsterList = [...monsterList, ...json];
            renderMonsters();
        });
});
