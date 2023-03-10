// Get Elements 
let selectElement = document.getElementById("movie"),
    countEl = document.getElementById("count"),
    total = document.getElementById("total"),
    seats = document.querySelectorAll(".row .seat:not(.occupied)");

// Store Seats data
let data = getDataLocalStorage();

// Get Data From Local Storage
function getDataLocalStorage() {
    const data = JSON.parse(localStorage.getItem("items"));
    return data === null ? [] : data;
}

// Set Data for Local Storage
function setDataLocalStorage(data) {
    localStorage.setItem("items", JSON.stringify(data));
}

// Add Seats Selected
function addSeats() {
    seats.forEach((element1, index) => {
        data.forEach(element => {
            if (element === index) {
                element1.classList.add("selected");
            }
        })
    })
    // Call Function Count Seats
    countSeats();
}

// Select a Movie
function selectedMovie() {
    total.innerHTML = selectElement.value * data.length;
}

// Event Listener
// Change Movie
selectElement.addEventListener("click",selectedMovie);

// The number of seats selected
function countSeats() {
    countEl.innerHTML = data.length;
    selectedMovie();
}

// Call Function Add Seats Selected
addSeats();

// Choose Seat
seats.forEach((event, index) => {
    event.addEventListener("click", () => {
        event.classList.add("selected");
        data.push(index);
        countSeats();
        setDataLocalStorage(data);
    })
})


