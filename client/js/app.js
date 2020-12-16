// ********************************************
// SETUP
const btn = document.querySelector('#msg-btn');
const form = document.querySelector('#new-cat-form');
const catsList = document.querySelector('table');

// Bind event listeners
btn.addEventListener('click', getMessage);
form.addEventListener('submit', submitCat);

// Fetch all cats as soon as app is loaded
getAllCats();

// ********************************************

// Cats FLOW
// index
function getAllCats(){
    fetch('http://localhost:3000/cats')
        .then(r => r.json())
        .then(appendCats)
        .catch(console.warn)
};

// create
function submitCat(e){
    e.preventDefault();

    const catData = {
        name: e.target.name.value,
        age: e.target.age.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(catData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/cats', options)
        .then(r => r.json())
        .then(appendCat)
        .then(() => e.target.reset())
        .catch(console.warn)
};

function updateCat(id, tr){
    const options = { 
        method: 'PATCH',
    };
    fetch(`http://localhost:3000/cats/${id}`, options)
        .then(r => r.json())
        .then(data => {
            const { cat } = data
            tr.querySelectorAll('td')[1].textContent = cat.age
        })
        .catch(console.warn)
}

function deleteCat(id, li){
    console.log('deleting', id)
    const options = { 
        method: 'DELETE',
    };
    fetch(`http://localhost:3000/Cats/${id}`, options)
        .then(li.remove())
        .catch(console.warn)
}

// helpers
function appendCats(data){
    data.cats.forEach(appendCat);
};

function appendCat(catData){
    const newRow = document.createElement('tr');
    const catsList = formatCatTr(catData, newRow)
    catsList.append(newRow);
};


function formatCatTr(cat, tr){
    const nameTd = document.createElement('td');
    const ageTd = document.createElement('td');
    const delTd = document.createElement('td');
    const uptTd = document.createElement('td');

    const delBtn = document.createElement('button');
    const uptBtn = document.createElement('button');
    delBtn.setAttribute('class', 'delete')
    uptBtn.setAttribute('class', 'update')
    delBtn.textContent = 'X';
    uptBtn.textContent = '+';
    delBtn.onclick = () => deleteCat(cat.id, tr);
    uptBtn.onclick = () => updateCat(cat.id, tr);
    delTd.append(delBtn);
    uptTd.append(uptBtn);

    nameTd.textContent = cat.name
    ageTd.textContent = cat.age

    tr.append(nameTd)
    tr.append(ageTd)
    tr.append(delTd)
    tr.append(uptTd)

    return tr
}

// ********************************************

// MESSAGE FLOW
function getMessage(){
    fetch('http://localhost:3000')
        .then(r => r.text())
        .then(renderMessage)
        .catch(console.warn)
};

function renderMessage(msgText){
    document.querySelector('#msg-btn').textContent = msgText;
};



// ********************************************