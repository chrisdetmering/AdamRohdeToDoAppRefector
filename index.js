//Pick 3 - 5 things to talk about in the code review

//TODO: overall, trying to do too much. Keep it simple and do not 
//1. Worry about styling using css
//2. Not using Jquery. 
//3. Putting unnecessary comments 
//4. Simplifying the logic
//5. Better naming
//6. Too many global variables 



const todos = JSON.parse(localStorage.getItem("todos")) || []

document.addEventListener("keypress", e => {
    if (e.key === 'Enter') { addTodo() }
});

function addTodo() {
    let id = (JSON.parse(localStorage.getItem("todos")) || []).length;
    let todoText = document.getElementById("todoitem-input").value;
    todoText.length <= 1 ?
        alert("Please gives yourself something to do!")
        : makeTodo(todoText, id)
}

function makeDeleteButton(id) { 
    let button_element = document.createElement("i");
    button_element.setAttribute("id", "button_" + id);
    button_element.setAttribute("onClick", "deleteTodo(" + id + ")");
    button_element.setAttribute("class", "fa fa-remove");
    button_element.setAttribute("style", "font-size:48px;color:red");
    document.getElementById("todo-item-button").appendChild(button_element);
    document.getElementById("todoitem-input").value = "";

}

function makeTodo(todoText, id) {
    console.log('id' , id);
    let todo = document.createElement("div");
    let todoList = document.getElementById("todo-list-item"); 
    todo.setAttribute("id", "todo-item-" + id);

    todo.addEventListener("click", () => { 
        toggleTodoState(id)
    })

    

    todo.appendChild(document.createTextNode(todoText));
    todoList.appendChild(todo);
    makeDeleteButton(id)
    addTodoToLocalStorage(todoText, id)

}

function deleteTodo(id) {
    let button = document.getElementById("button_" + id);
    let todo = document.getElementById("todo-item-" + id);
    deleteTodoFromLocalStorage(id);
    todo.remove();
    button.remove();
}

function toggleTodoState(id) {
    let todoText = document.getElementById("todo-item-" + id)
    if (todoText.className) { 
        todoText.className = "";
    } else { 
        todoText.className = "strike-through";
        crossOffItemInLocalStorage(id);
    }
}



//----------------------------------------------------------- Local Storage -----------------------------------------------------------
function addTodoToLocalStorage(text, id) {
    const todo = {
        id,
        text,
        //TODO: make this a boolean and change name to done
        // strike: 0,
    };
    todos.push(todo);
    console.log('todos', todos);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoFromLocalStorage(id) {
    let newTodos = todos.filter(todo => todo.id !== id)
    localStorage.setItem("todos", JSON.stringify(newTodos));
}

function crossOffItemInLocalStorage(item) {
    todos[item].strike = 1;
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodosFromLocalStorage() {

    todos.forEach((item) => {
        console.log('retrieve from local storage', item.text);
        makeTodo(item.text, "getTodosFromLocalStorage");
    });
}

document.getElementById("save-local-storage").addEventListener("click", () => {
    let isSaved = JSON.parse(localStorage.getItem("isSaved"));
    localStorage.setItem("isSaved", !isSaved)
    document.getElementById("save-local-storage").checked = !isSaved
})


window.onload = function () {
    let isSaved = JSON.parse(localStorage.getItem("isSaved"));
    if (isSaved) {
        document.getElementById("save-local-storage").checked = true;
        getTodosFromLocalStorage();
    } else {
        document.getElementById("save-local-storage").checked = false;
        localStorage.clear();
    }
};
