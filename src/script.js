const itemArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

console.log(itemArray);

function displayItems() {
    let item = "";
    for (let i = 0; i < itemArray.length; i++) {
        item += `
            <div class="item">
                <div class="input-controller flex mb-4">
                    <textarea disabled class="p-3 w-60 max-w-96 max-h-20 rounded-lg resize-none ">${itemArray[i]}</textarea>
                    <div class="edit-controls ml-4 flex flex-col">
                        <button class="editBtn p-2 rounded-lg bg-slate-400 h-8 mb-1.5 active:bg-green-600 hover:bg-green-400"><i class="fas fa-edit"></i></button>
                        <button class="deleteBtn p-2 rounded-lg bg-slate-400 h-8 active:bg-green-600 hover:bg-green-400"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="update-controller ml-3 flex flex-col hidden">
                        <button class="saveBtn fas fa-save p-2 flex mb-1.5 rounded-lg bg-slate-400 h-8 active:bg-green-600 hover:bg-green-400"></button>
                        <button class="cancelBtn fas fa-close p-2 rounded-lg bg-slate-400 h-8 active:bg-green-600 hover:bg-green-400"></button>
                    </div>
                </div>
            </div>
        `;
    }
    document.querySelector(".to-do-list").innerHTML = item;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

function activateDeleteListeners() {
    let deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((db, i) => {
        db.addEventListener("click", () => { deleteItem(i); });
    });
}

function activateEditListeners() {
    let editButtons = document.querySelectorAll(".editBtn");
    const updateControllers = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    editButtons.forEach((eb, i) => {
        eb.addEventListener("click", () => {
            updateControllers[i].classList.remove("hidden");
            inputs[i].disabled = false;
            inputs[i].focus(); // Automatically focus the textarea when editing
        });
    });
}

function activateSaveListeners() {
    let saveButtons = document.querySelectorAll(".saveBtn");
    const updateControllers = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveButtons.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            updateControllers[i].classList.add("hidden");
            inputs[i].disabled = true;
            itemArray[i] = inputs[i].value;
            localStorage.setItem("items", JSON.stringify(itemArray));
        });
    });
}

function activateCancelListeners() {
    let cancelButtons = document.querySelectorAll(".cancelBtn");
    const updateControllers = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelButtons.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateControllers[i].classList.add("hidden");
            inputs[i].disabled = true;
            inputs[i].value = itemArray[i]; // Reset to original value
        });
    });
}

function deleteItem(i) {
    itemArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemArray));
    displayItems(); // Re-render without reloading
}

const addButton = document.querySelector("#add");
if (addButton) {
    addButton.addEventListener("click", () => {
        const item = document.querySelector("#item").value;
        createItem(item);
        document.querySelector("#item").value = ""; // Clear input field after adding
    });
}

function createItem(item) {
    if (item.trim() !== "") { // Only add non-empty items
        itemArray.push(item);
        localStorage.setItem("items", JSON.stringify(itemArray));
        displayItems(); // Re-render without reloading
    }
}

function displaydata() {
    let date = new Date();
    date = date.toString().split(" ");
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}

window.onload = function() {
    displaydata();
    displayItems();
};
