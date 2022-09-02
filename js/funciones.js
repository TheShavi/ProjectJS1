async function getMealdById(mealId){

    let url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    
    if (mealId === undefined) {
        url = 'https://themealdb.com/api/json/v1/1/random.php'
    }
    const data = await fetch(url).then((response) => response.json());

    //Conviriendo los contenidos de Json en un array
    mealArray = Object.values(data.meals[0]);

    var ingredientsList = [];
    var measuresList = [];

    //Obteniendo los ingredientes en un array
    for (let i = 9; i <= 28; i++) {
        if (!mealArray[i]) break;
        ingredientsList.push(mealArray[i]);
    }

    //Obteniendo las medidas en un array
    for (let i = 29; i <= 48; i++) {
        if (mealArray[i] === "" || mealArray[i] === " ") break;
        measuresList.push(mealArray[i]);
    }

    addMealDetailed(data.meals[0])

    clearDetails();

    // Muestra la lista de medidas e ingredientes
    var i = 0;
    ingredientsList.forEach(ingredient => {
        const li = document.createElement('li')
        document.getElementById('ingredients_list').appendChild(li)
        li.textContent = measuresList[i] + " " + ingredient;
        i++
    });
}

async function Search(){
    const input = document.getElementById('input').value;

    if (!input.length) {
        Swal.fire({
            title: 'Error',
            text: 'Ingresa un valor valido para poder continuar',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return false
    }


    let url = `https://themealdb.com/api/json/v1/1/search.php?s=${input.trim()}`;

    const data = await fetch(url).then((response) => response.json());
    
    clearResults();

    const results = document.getElementById('all_results');
    results.style.overflowY = ''
    results.style.height = 'auto'

    helperAddMeal(data.meals);
    
}

function helperAddMeal(meals){
    meals.forEach((meal, index) => addMeal(index, meal));
}

async function listCategories(){

    const list = document.getElementById('list');
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
    const data = await fetch(url).then((response) => response.json());

    if (list.childElementCount>14) {
        clearCategories();
    }
    
    data.meals.forEach(category => {
        const cat = document.createElement('option');
        const option = document.getElementById('option')
        const {strCategory} = category;
        cat.className = 'trash_category'
        cat.textContent = strCategory;
        insertAfter(cat,option)
    });
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

async function selectCategory(cat){
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat.trim()}`
    const data = await fetch(url).then((response) => response.json());
    clearResults();
    helperAddMeal(data.meals)

    const results = document.getElementById('all_results');
    results.style.margin = '20px 15px 15px 20px'
    results.style.minHeight = '100px'
    results.style.overflowY = 'scroll'
    results.style.height = '280px'
}

function clearResults(){
    let container = document.getElementById('all_results')
    container.innerHTML = '';
}

function clearDetails(){
    let container = document.getElementsByClassName('detalles_recetas');
    let container2 = document.getElementById('ingredients_list');
    container.innerHTML = '';
    container2.innerHTML = '';
}

function clearCategories(){
    let container = document.getElementsByClassName('trash_category')
    container.remove();
}

function addMeal(i, meal){
    const {idMeal} = meal;

    const span = document.createElement('span');
    const div = document.createElement('div');
    div.className = "card";
    div.style="width: 150px; display: inline-table ;border: 1px solid orange;  padding: 1em; margin: 1em;";

    const img = document.createElement('img');
    img.id = `result_thumb${i}`;
    img.dataset.id = idMeal;
    img.className = "card-img-top";
    img.src = meal.strMealThumb;

    const art = document.createElement('div');
    art.id = `result${i}`;
    art.className = "card-body";

    const title = document.createElement('h6');
    title.id = `result_title${i}`;
    title.className = 'card-title';
    title.textContent = meal.strMeal;

    document.getElementById('all_results').appendChild(span);
    span.appendChild(div)
    div.appendChild(img);
    art.appendChild(title);
    div.appendChild(art);
    
}

function addMealDetailed(meal){
    const {strMeal, strInstructions, strMealThumb, strYoutube } = meal;
    var url = strYoutube.replace("watch?v=", "embed/");
    
    //Agrega contenido 
    document.getElementById('thumb').src = strMealThumb;
    document.getElementById('title').textContent = strMeal;
    document.getElementById('instructions_title').textContent = "Instructions";
    document.getElementById('instructions').textContent = strInstructions;
    document.getElementById('ingredients').textContent = "Ingredients";
    document.getElementById('video_title').textContent = "Tutorial";
    document.getElementById('video').src = url;

    //Agrega estilo a cada contenedor
    document.getElementById('box1').className = "box1 nombre";
    document.getElementById('box2').className = "box2 imagen";
    document.getElementById('ingredients_article').className = "box3 ingredientes";
    document.getElementById('box4').className = "box4 instrucciones";

}

function toggleResults(){

    var results = document.getElementById("all_results");
    if (results.style.display === "none") {
        results.style.display = "block";
        document.getElementById('toggle_button').textContent="Hide results";

    } else {
        document.getElementById('toggle_button').textContent="Show results";
        results.style.display = "none";

    }
}

$(function(){
    $(document).on('click', '.card img', function() {
        const mealId = $(this).attr('data-id')
        getMealdById(mealId);

    });
});


$(document).ready(function(){
    $("#toggle_button").click(function(){
        $("#toggle_button").toggleClass("btn, btn-secondary");
    });
});