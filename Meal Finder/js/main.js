// Get ELements 
let search = document.getElementById("search"),
    submit = document.getElementById("submit"),
    random = document.getElementById("random"),
    meals = document.getElementById("meals"),
    resultHeading = document.getElementById("result-heading"),
    singleMeal = document.getElementById("single-meal");




// Function Search Meal and fetch from API
function searchMeal(event) {
    event.preventDefault();

    // Clear single meal
    singleMeal.innerHTML = '';
    // Get Search Term
    let term = search.value;

    // Check for empty
    if (term.trim()) {

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then(
            (result) => result.json()
        ).then(
            (data) => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for  ${term}:</h2>`;
                if (data.meals == null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
                } else {
                    meals.innerHTML = data.meals.map(meal =>
                        `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                                <div class="meal-info" data-mealID="${meal.idMeal}">
                                    <h3>${meal.strMeal}</h3>
                                </div>
                        </div>
                        `).join("")
                }
            }
        )
    // Clear search text
    search.value = '';
    } else {
        alert("Please Enter a Search Term");
    }

}


function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(
        (result) => result.json()
    ).then(
        (data) => {
            let dataMeal = data.meals[0];
            addMealToDom(dataMeal);
        }
    )
}

// Fetch random meal from API
function getRandomMeal() {
    // Clear meals and heading
    meals.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDom(meal);
        });
}

function addMealToDom(meal) {
    console.log(meal)
    let ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]} `)
        } else {
            break;
        }
    }

    singleMeal.innerHTML = `
    <div class="single-meal">
        <h1> ${meal.strMeal} </h1>
        <img src = "${meal.strMealThumb}" alt="${meal.strMeal}"/> 
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join(" ")}
                </ul>
            </div>
    </div>
    `
}


//Event Listener
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

meals.addEventListener('click', e => {
    const mealInfo = e.composedPath().find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    })
    if (mealInfo) {
        let mealId = mealInfo.getAttribute("data-mealID");
        getMealByID(mealId);
    }
})






