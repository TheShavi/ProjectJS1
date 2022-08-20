// Método para obtener una receta al azar
async function Random() {

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

    // Agrega las instrucciones de preparación
    document.getElementById('instructions').textContent = "Instructions: " + strInstructions;

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