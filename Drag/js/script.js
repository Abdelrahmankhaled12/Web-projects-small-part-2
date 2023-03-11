const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");


const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];


// Storage List Items
let listItems = [];

let dragStartIndex;


createList();

// Insert Items in draggable List in Dom
function createList() {
    richestPeople
    .map(element =>({value:element,sort:Math.random()}))
    .sort((a,b)=> a.sort - b.sort)
    .map(element => element.value)
    .forEach((person, index) => {
        // Create Element li
        let li = document.createElement("li");
        // Set Attribute in li
        li.setAttribute("data-index", index);

        li.innerHTML = `
            <span class="number" > ${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
        `
        // Push li in List items
        listItems.push(li);
        // Add li in draggable List
        draggableList.appendChild(li)
    });
    addEventListeners();
}


function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
    this.classList.add("over");
}

function dragOver(e) {
    e.preventDefault();
}

function dragLeave() {
    this.classList.remove("over");
}


function dragDrop() {
    let dragEndIndex = +this.getAttribute("data-index");
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function swapItems(dragStartIndex, dragEndIndex) {
    const itemOne = listItems[dragStartIndex].querySelector(".draggable");
    const itemTwo = listItems[dragEndIndex].querySelector(".draggable");

    listItems[dragStartIndex].appendChild(itemTwo);
    listItems[dragEndIndex].appendChild(itemOne);
}

function checkOrder() {
    listItems.forEach((listItem,index)=> {
        const personName = listItem.querySelector(".draggable").innerText.trim();
        if(personName !== richestPeople[index]) {
            listItem.classList.add("wrong");
        }else {
            listItem.classList.add("right");
            listItem.classList.remove("wrong");
        }
    })
}


function addEventListeners() {
    const draggables = document.querySelectorAll(".draggable");
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart",dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover',dragOver);
        item.addEventListener('drop',dragDrop);
        item.addEventListener('dragenter',dragEnter);
        item.addEventListener('dragleave',dragLeave);
    })
}


check.addEventListener("click",checkOrder);