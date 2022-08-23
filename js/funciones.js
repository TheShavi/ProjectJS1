// Método para obtener una receta al azar

async function Random(){

    let rand_url = 'https://themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(rand_url);
    const data = await response.json();

    const { meals, idMeal, strMeal, strCategory, strInstructions, strMealThumb, strYoutube } = data.meals[0];

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

    // Agrega la imagen de la receta
    document.getElementById('thumb').src = strMealThumb;

    // Agrega el titulo de la receta
    document.getElementById('title').textContent = strMeal;

    // Agrega titulo ingredientes
    document.getElementById('instructions_title').textContent = "Instructions";

    // Agrega las instrucciones de preparación
    document.getElementById('instructions').textContent = strInstructions;

    // Agrega titulo ingredientes
    document.getElementById('ingredients').textContent = "Ingredients";

    // Agrega la lista de ingredientes 
    const listGenerate = document.getElementById('ingredients_list')

    //Selecciona el articulo que contiene los ingredientes
    const ingrArticle = document.getElementById('ingredients_article')
    

    if(listGenerate.childNodes.length){
        listGenerate.remove();
        newUl = document.createElement('ul');
        newUl.setAttribute('id','ingredients_list');
        ingrArticle.appendChild(newUl);
    }

    // Muestra la lista de medidas e ingredientes
    var i = 0;
    ingredientsList.forEach(ingredient => {
        const li = document.createElement('li')
        document.getElementById('ingredients_list').appendChild(li)
        li.textContent = measuresList[i] + " " + ingredient;
        i++
    });
}

async function getMealdById(mealId){

    let rand_url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const response = await fetch(rand_url);
    const data = await response.json();

    const { meals, idMeal, strMeal, strCategory, strInstructions, strMealThumb, strYoutube } = data.meals[0];

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

    // Agrega la imagen de la receta
    document.getElementById('thumb').src = strMealThumb;

    // Agrega el titulo de la receta
    document.getElementById('title').textContent = strMeal;

    // Agrega titulo ingredientes
    document.getElementById('instructions_title').textContent = "Instructions";

    // Agrega las instrucciones de preparación
    document.getElementById('instructions').textContent = strInstructions;

    // Agrega titulo ingredientes
    document.getElementById('ingredients').textContent = "Ingredients";

    // Agrega la lista de ingredientes 
    const listGenerate = document.getElementById('ingredients_list')

    //Selecciona el articulo que contiene los ingredientes
    const ingrArticle = document.getElementById('ingredients_article')
    

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

    let search_url = `https://themealdb.com/api/json/v1/1/search.php?s=${input.trim()}`;

    const response = await fetch(search_url);
    const data = await response.json();
    
    clearResults();

    if (!data.meals) {
        Swal.fire({
            title: 'Error',
            text: 'No se encontraron registros validos',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return false;
    }
    
    data.meals
        .filter((meal, index) => index < 10)
        .forEach((meal, index) => addMeal(index, meal));
}

function clearResults(){
    var container = document.getElementById('all_results')
    container.innerHTML = '';
}

function clearDetails(){
    var container = document.getElementsByClassName('detalles_recetas');
    var container2 = document.getElementById('ingredients_list');
    container.innerHTML = '';
    container2.innerHTML = '';
}

function addMeal(i, meal){
    const {idMeal} = meal;
    const art = document.createElement('span');
    art.id = `result${i}`;
    art.id = idMeal;
    art.dataset.id = idMeal
    art.className = "resultados";

    const title = document.createElement('h6');
    title.id = `result_title${i}`;
    title.className = 'titulo';
    title.textContent = meal.strMeal;

    const div = document.createElement('div');
    div.id = `thumb_container${i}`
    div.className = "ima"

    const img = document.createElement('img');
    img.id = `result_thumb${i}`;
    img.className = "result_thumb";
    img.src = meal.strMealThumb;

    document.getElementById('all_results').appendChild(art);
    art.appendChild(title);
    art.appendChild(div);
    div.appendChild(img);
}

$(function(){
    $(document).on('click', '.resultados img', function() {
        const mealId = $(this).parents('.resultados').data('id');
        getMealdById(mealId);

    });
});