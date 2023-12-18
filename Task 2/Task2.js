function createTask() {
    if(list.textContent === "Нет задач") {
        list.textContent = "";
        list.classList.remove('no_tasks');
        btnClear.classList.remove('not_active_btn');
    }
    if(taskTitle.value == '') {
        return;
    }
    let newDiv = document.createElement('div');
    let newItem = document.createElement('li');
    newItem.textContent = taskTitle.value;
    newItem.id = taskTitle.value;
    newDiv.append(newItem);
    let newCheckbox = document.createElement('input');
    newCheckbox.type = "checkbox";
    newCheckbox.id = taskTitle.value;
    newDiv.append(newCheckbox);
    list.append(newDiv);
    window.localStorage.setItem(taskTitle.value, false);
    taskTitle.value = "";
}

function listClear() {
    list.textContent = "Нет задач";
    list.classList.add('no_tasks');
    btnClear.classList.add('not_active_btn');
    window.localStorage.clear();
}

function checkTask(evt) {
    if (evt.target.tagName === 'LI' || evt.target.tagName === 'INPUT') {
        if(window.localStorage.getItem(evt.target.id) == 'true') {
            window.localStorage.setItem(evt.target.id, false);
        } else {
            window.localStorage.setItem(evt.target.id, true);
        }
    }
}


const btnAdd = document.querySelector('.btnAdd');
const taskTitle = document.querySelector('.taskTitle');
const list = document.querySelector('.list');
const btnClear = document.querySelector('.btnClear');

if(window.localStorage.length) {
    if(confirm("Восстановить задачи?")) {
        let i = 0;
        for(let item in localStorage) {
            if(i >= localStorage.length) {
                break;
            }
            let newDiv = document.createElement('div');
            let newItem = document.createElement('li');
            newItem.textContent = item;
            newItem.id = item;
            newDiv.append(newItem);
            let newCheckbox = document.createElement('input');
            newCheckbox.type = "checkbox";
            newCheckbox.id = item;
            newCheckbox.checked = true ? window.localStorage.getItem(item) == 'true' : false;
            newDiv.append(newCheckbox);
            list.append(newDiv);
            i += 1;
        }
    } else {
        listClear();
    }
} else {
    listClear();
}

btnAdd.addEventListener('click', function(evt) {
    createTask();
});

btnClear.addEventListener('click', function(evt) {
    listClear();
});

list.addEventListener('click', function(evt) {
    console.log('yes');
    checkTask(evt);
});

document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        createTask();
    }
});
