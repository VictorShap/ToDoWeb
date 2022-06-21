let i = 0;

window.onload = function () {

    for (let i = 0; i < localStorage.length; i++) {
        let current = localStorage.key(i);
        if (localStorage.getItem(current)=="done"|| localStorage.getItem(current)=="notDone") {
            let newToDO = document.createElement("label");
            newToDO.innerText = current;
            let check = document.createElement("input");
            check.type = "checkbox";
            if (localStorage.getItem(current) == "done") {
                check.checked = true;
            }
            check.addEventListener('click', done);
            newToDO.prepend(check);
            let remove = document.createElement("a");
            remove.innerText = "remove";
            remove.addEventListener('click', removeToDo);
            newToDO.append(remove);
            newToDO.classList.add('toDos');
            document.getElementById('toDos').append(newToDO);
            document.getElementById('newToDo').value = "";
        }

    }
    toDoOrS();
    amount();
};

function newToDo() {
    let text = document.getElementById('newToDo').value;
    if (text.replace(/\s/g, "") != "") {
        let newToDO = document.createElement("label");
        newToDO.innerText = text;
        let check = document.createElement("input");
        check.type = "checkbox";
        check.addEventListener('click', done);
        newToDO.prepend(check);
        let remove = document.createElement("a");
        remove.innerText = "remove";
        remove.addEventListener('click', removeToDo);
        newToDO.append(remove);
        newToDO.classList.add('toDos');
        document.getElementById('toDos').append(newToDO);
        document.getElementById('newToDo').value = "";
        localStorage.setItem(text, "notDone");
    }
    toDoOrS();
    amount();

}

function amount() {
    let labelsChecked = document.querySelectorAll('input:checked');
    for (let label of labelsChecked) {
        label.parentNode.classList.add('done');
    }
    let labelsDone = document.querySelectorAll('label.done').length;
    let labels = document.querySelectorAll('label.toDos').length;


    i = labels - labelsDone;
    document.getElementById('amount').innerHTML = i;
    toDoOrS();
}

function toDoOrS() {
    if (i > 1) {
        document.getElementById('number').innerText = "todos";
    } else {
        document.getElementById('number').innerText = "todo";
    }
}

function done() {
    if (this.checked) {
        this.parentNode.classList.add('done');
        if (localStorage.getItem(this.parentNode.textContent.replace("remove", ""))) {
            localStorage.setItem(this.parentNode.textContent.replace("remove", ""), "done");
        }
    } else {
        this.parentNode.classList.remove("done");
        if (localStorage.getItem(this.parentNode.textContent.replace("remove", ""))) {
            localStorage.setItem(this.parentNode.textContent.replace("remove", ""), "notDone");
        }
    }
    toDoOrS();
    amount();
}

function removeToDo() {
    if (this.previousElementSibling.checked) {
        localStorage.removeItem(this.parentNode.textContent.replace("remove", ""));
        this.parentNode.remove();
    } else {
        localStorage.removeItem(this.parentNode.textContent.replace("remove", ""));
        this.parentNode.remove();
    }
    done();
    toDoOrS();
    amount();
}

function filter() {
    let target = document.getElementById('filter').value.toLowerCase();
    let hide = document.getElementById('hide').checked;
    let labelsDone = document.querySelectorAll('label.done');
    let labels = document.querySelectorAll('label.toDos');
    if (hide) {
        for (let label of labels) {
            labelText = label.textContent.replace(/remove/, "");
            if (labelText.includes(target)) {
                label.style.display = "flex";
            } else {
                label.style.display = "none";
            }
        }
        for (let labelDone of labelsDone) {
            labelDone.style.display = "none";
        }
    } else {
        for (let label of labels) {
            labelText = label.textContent.replace(/remove/, "");
            if (labelText.includes(target)) {
                label.style.display = "flex";
            } else {
                label.style.display = "none";
            }
        }
    }
}
