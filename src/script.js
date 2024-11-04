const itemArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []

console.log(itemArray)

function displayItems(){
    let item = ""
    for(let i = 0; i < itemArray.length; i++){
        item += `  <div class="item">
                            <div class="input-controller">
                                <textarea disabled>${itemArray[i]}</textarea>
                                <div class="edit-controls">
                                    <button class="edit"><i class="fas fa-edit"></i></button>
                                    <button class="delete"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                            <div class="update-controller">
                                <button class="fas fa-save"></button>
                                <button class="fas fa-close"></button>
                            </div>
                        </div>  `
    }
    document.querySelector(".to-do-list").innerHTML = item
}

const addButton = document.querySelector("#add");
if (addButton) {
    addButton.addEventListener("click", () => {
        const item = document.querySelector("#item").value;
        createItem(item);
    });
}
function createItem(item){
    itemArray.push(item)
    localStorage.setItem("items", JSON.stringify(itemArray))
    location.reload()
}

function displaydata(){
    let date = new Date();
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML =  date[1] + " " + date[2] + " " + date[3]
}

window.onload = function(){
    displaydata();
    displayItems();
}