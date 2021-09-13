//document
const AddForm = document.querySelector('.add');
const todos = document.querySelector('.todos');
const search = document.querySelector('.search');

const updateTodoArray = () => {
    const todoArray = Array.from(todos.children).map(todo => todo.innerText);
    localStorage.setItem('TodoList', todoArray.join());
};

//adding todo
const addTodoUI = (todo) => {
    const html = `<li class="list-group-item d-flex justify-content-between align-items-start mb-1">
                    <span class="fw-bold">${todo}</span>
                    <img class="deleteIcon"  src="/images/trash.svg" alt="Delete Icon">
                </li>`
    todos.innerHTML += html;
};

AddForm.addEventListener('submit', e => {
    e.preventDefault();

    const todo = e.target.newTodo.value.trim();

    if (todo != ""){
        addTodoUI(todo);
        e.target.reset();
        updateTodoArray();
    }
});

//removing and editiong todo
const removeTodoUI = todo => {
    todo.parentElement.remove();
};

const editTodoUI = todo => {
    AddForm.newTodo.value = todo.textContent;
    AddForm.newTodo.focus();
};

todos.addEventListener('click', e =>{
    const todo = e.target;
    const firebaseID = todo.parentElement.getAttribute('data-Id');
    if(todo.className == 'deleteIcon'){
        removeTodoUI(todo);
    }
    if(todo.tagName == "SPAN"){
        editTodoUI(todo);
        removeTodoUI(todo);
    }
    updateTodoArray();
});

//filtering
const filterTodo = searchText => {
    Array.from(todos.children).filter(todo => !todo.textContent.toLowerCase().includes(searchText))
    .forEach(todo => todo.classList.add("filtered"));

    Array.from(todos.children).filter(todo => todo.textContent.toLowerCase().includes(searchText))
    .forEach(todo => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", e =>{
    const searchText =  e.target.value.trim().toLowerCase();
    if(searchText.length > 1 || searchText.length < 1)
        filterTodo(searchText);
});

search.addEventListener('submit', e => e.preventDefault());

const todoArrayFromLS = localStorage.getItem('TodoList') ? localStorage.getItem('TodoList').split(",") : 
                                                        ['Click on delete icon to delete', 'Todo Item-1'];

todoArrayFromLS.forEach(todo => addTodoUI(todo));