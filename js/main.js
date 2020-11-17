class Todo {
    constructor(name) {
        this.name = name;
        this.id = nextld++;
        this.complete = false;
    }
}

let todos = [];
let nextld = 0;

window.onload = function() {

    let todo1 = new Todo('Buy Gifts');
    let todo2 = new Todo('Wrap Gifts');
    let todo3 = new Todo('Get Christmas Tree');
    let todo4 = new Todo('Decorate Tree');

    todos.push(todo1); // Same thing as writing = [todo1, todo2, todo3, todo4];
    todos.push(todo2);
    todos.push(todo3);
    todos.push(todo4);

    let desc = false;

    document.getElementById("sort").addEventListener('click', () => {
    let array = sortArrayBy(todos, 'complete', desc);
    generateHTML(array);
    desc = !desc;
    });

    function sortArrayBy (array, sort, desc) {
    array.sort(function (a, b) {
        if (a[sort] < b[sort]) return -1;
        if (a[sort] > b[sort]) return 1;
        return 0;
    });

    if (desc) array.reverse();

    return array;
    }

    document.getElementById("save").addEventListener('click', createTodo);

    generateHTML();
}

function createTodo() {
    let newTodo = document.getElementById("name").value;
    if(newTodo === '') {
        alert("Please write a Todo");
    } else {

    let todo = new Todo(newTodo);

    todos.push(todo);
    addToLocalStorage(todos);

    generateHTML();
    }

    document.getElementById("name").value = '';
}

function generateHTML() {
    let container = document.getElementById("container");
    let ulElement = document.createElement("ul");
    container.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
        
        let liTag = document.createElement('li');
        liTag.innerHTML = todos[i].name;
        ulElement.appendChild(liTag);

        let checkElem = document.createElement('span');
        checkElem.innerHTML = "<i class='fas fa-check-circle'></i>";
        checkElem.classList.add("check-btn");
        if(todos[i].complete == true) {
            liTag.classList.add('crossed');
        }
        liTag.appendChild(checkElem);

        let deleteElem = document.createElement('span');
        deleteElem.innerHTML = "<i class='fas fa-trash-alt'></i>";
        deleteElem.classList.add("delete-btn");
        liTag.appendChild(deleteElem);

        container.appendChild(ulElement); 

        checkElem.addEventListener('click', () => {checkedItem(todos[i]); liTag.classList.toggle('crossed'); });
        deleteElem.addEventListener('click', () => {deleteItem(todos[i]) });
    }
    
}

function checkedItem(todo) {
    for(i = 0; i < todos.length; i++) {
        if(todo.id == todos[i].id) {
            todos[i].complete = !todos[i].complete;
        }
    }
}

function deleteItem(todo) {
    for(i = 0; i < todos.length; i++) {
        if (todo.id == todos[i].id) {
                todos.splice(i, 1);
                generateHTML();
        }
    }
}

    // ** Works Ok **
function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    
}

    // ** Does not work properly **
// function getFromLocalStorage() {
//     let reference = localStorage.getItem('todos');

//     if(reference) {
//         todos = JSON.parse(reference);
        
//     }
// }

// getFromLocalStorage();