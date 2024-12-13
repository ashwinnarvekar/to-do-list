function addTask() {
    let task = document.getElementById("input-box").value.trim();
    if (task === "") {
        alert("You must write something!");
        return;
    }
    let li = document.createElement("li");
    li.textContent = task;
    li.ondblclick = function () {
        editTask(this);
    };
    let span = document.createElement("span");
    span.textContent = "×";
    span.onclick = function () {
        this.parentElement.remove();
        saveData();
    };
    li.appendChild(span);
    document.getElementById("list-container").appendChild(li);
    document.getElementById("input-box").value = "";
    saveData();
}

function editTask(element) {
    let currentText = element.textContent.replace("×", "").trim();
    let newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText.trim() !== "") {
        element.firstChild.textContent = newText + " ";
        saveData();
    }
}

function saveData() {
    localStorage.setItem("tasks", document.getElementById("list-container").innerHTML);
}

function showTasks() {
    document.getElementById("list-container").innerHTML = localStorage.getItem("tasks") || "";
    let listItems = document.querySelectorAll("#list-container li");
    listItems.forEach(li => {
        li.ondblclick = function () {
            editTask(this);
        };
        li.querySelector("span").onclick = function () {
            this.parentElement.remove();
            saveData();
        };
    });
}

showTasks();