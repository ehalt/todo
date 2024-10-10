// // catch the text area 
// const textArea = document.querySelector('#input-txt');
// // catch the button 
// const addBtn = document.querySelector('#add-btn');
// let inputedText;
// let keyName = 'data';

// // add enter event 
// textArea.addEventListener('keyup', (e) => {
//     if (e.key === 'Enter') {
//         display();
//         textArea.value = '';
//     }
// });

// // add button event 
// addBtn.addEventListener('click', () => {
//     display();
//     textArea.value = '';

// });



// function display() {
//     // catch the container 
//     const container = document.querySelector('#add-element-here');
//     // inputed text 
//     inputedText = textArea.value;
//     console.log(inputedText);

//     // create a new element 
//     const toDoItem = document.createElement('div');
//     toDoItem.classList = `flex bg-${randomBg()} p-2 rounded-lg items-center `
//     toDoItem.innerHTML = `
//         <p class="px-5 text-white"> ${displayStoredData()} </p>
//         <button class="btn">del</button>
//     `;

//     // now append the child 
//     container.appendChild(toDoItem);

//     // save items to local 

//     saveToLocal(keyName, inputedText);


// }

// // random color generator 

// function randomBg() {
//     const colors = ['neutral-content', 'info', 'success', 'warning', 'error'];
//     const index =  Math.round(Math.random() * colors.length);
//     const singleColor = colors[index];
//     return singleColor;
// }


// // ======== local storage part =========

// // get data
// const getStoredData = () => {
//     let data = {};
//     const storedData = localStorage.getItem('data');
//     if (storedData) {
//         data = JSON.parse(storedData);
//     }
//     return data;
// }

// function saveToLocal(keyName, inputedText) {
//     const data = getStoredData();
//     if(!data[keyName]) {
//         data[keyName] = [];
//     }
//     data[keyName].push(inputedText);
//     const dataStringified = JSON.stringify(data);
//     localStorage.setItem('data', dataStringified)
// }

// const displayStoredData = () => {
//     const savedData = getStoredData();
//     console.log(savedData);
//     for (let data in savedData) {
//         // const val = savedData[inputedText];
//         console.log(data);
//     }
// }

// displayStoredData();















// catch the text area 
const textArea = document.querySelector('#input-txt');
// catch the button 
const addBtn = document.querySelector('#add-btn');
let inputedText;
let keyName = 'data';

// add enter event 
textArea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        display();
        textArea.value = '';
    }
});

// add button event 
addBtn.addEventListener('click', () => {
    display();
    textArea.value = '';
});

function display() {
    // catch the container 
    const container = document.querySelector('#add-element-here');
    // inputed text 
    inputedText = textArea.value;
    
    // create a new element 
    const toDoItem = document.createElement('div');
    toDoItem.classList = `flex bg-${randomBg()} p-2 rounded-lg items-center`;
    toDoItem.innerHTML = `
        <p class="px-5 text-white">${inputedText}</p>
        <button class="btn del-btn">del</button>
    `;

    // now append the child 
    container.appendChild(toDoItem);

    // save items to local 
    saveToLocal(keyName, inputedText);

    // Add delete functionality
    const delBtn = toDoItem.querySelector('.del-btn');
    delBtn.addEventListener('click', () => {
        container.removeChild(toDoItem);
        removeFromLocal(keyName, inputedText);
    });
}

// random color generator 
function randomBg() {
    const colors = ['neutral-content', 'info', 'success', 'warning', 'error'];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

// ======== local storage part =========

// get data
const getStoredData = () => {
    let data = {};
    const storedData = localStorage.getItem('data');
    if (storedData) {
        data = JSON.parse(storedData);
    }
    return data;
}

function saveToLocal(keyName, inputedText) {
    const data = getStoredData();
    if (!data[keyName]) {
        data[keyName] = [];
    }
    data[keyName].push(inputedText);
    const dataStringified = JSON.stringify(data);
    localStorage.setItem('data', dataStringified);
}

function removeFromLocal(keyName, inputedText) {
    const data = getStoredData();
    if (data[keyName]) {
        data[keyName] = data[keyName].filter(item => item !== inputedText);
        const dataStringified = JSON.stringify(data);
        localStorage.setItem('data', dataStringified);
    }
}

// Load and display all stored data on page load
const loadStoredData = () => {
    const savedData = getStoredData();
    if (savedData[keyName]) {
        savedData[keyName].forEach(text => {
            const container = document.querySelector('#add-element-here');
            const toDoItem = document.createElement('div');
            toDoItem.classList = `flex bg-${randomBg()} p-2 rounded-lg items-center`;
            toDoItem.innerHTML = `
                <p class="px-5 text-white">${text}</p>
                <button class="btn del-btn">del</button>
            `;
            container.appendChild(toDoItem);

            // Add delete functionality
            const delBtn = toDoItem.querySelector('.del-btn');
            delBtn.addEventListener('click', () => {
                container.removeChild(toDoItem);
                removeFromLocal(keyName, text);
            });
        });
    }
}

// Call loadStoredData on page load
loadStoredData();
