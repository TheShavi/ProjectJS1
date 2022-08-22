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

async function Search(){

    const mealsArray=[];
    const input = document.getElementById('input').value;
    let search_url = `https://themealdb.com/api/json/v1/1/search.php?s=${input}`;

    const response = await fetch(search_url);
    const data = await response.json();

    var i = 1;
    data.meals.forEach(meal => {
        if(i>5){
            return
        }
        mealsArray.push(meal)
        i++
    });
    
    showResults(mealsArray);
    
}

function showResults(mealsArray){

    const allResults = document.getElementById('all_results');
    const genResults = document.getElementById('genResults');
    var resultTitle = []
    var resultImg = []
    console.log(allResults.childElementCount === 1)
    if (allResults.childElementCount>1) {
        allResults.remove();
        newAll = document.createElement('art');
        newAll.id = "all_results";
        newAll.className = "resultados_recetas"
        genResults.appendChild(newAll);
    }

    for(let i = 1; i< mealsArray.length;i++){
        const art = document.createElement('article')
        art.id= `result${i}`;
        art.className = "resultados"

        const title = document.createElement('h6')
        title.id = `result_title${i}`
        title.className = 'titulo'

        const div = document.createElement('div')
        div.id = `thumb_container${i}`
        div.className = "ima"

        const img = document.createElement('img')
        img.id = `result_thumb${i}`
        img.className = "result_thumb"

        document.getElementById('all_results').appendChild(art)
        art.appendChild(title)
        art.appendChild(div)
        div.appendChild(img)
    }
    console.log(mealsArray)
    let j = 0;
    mealsArray.forEach(meal => {
        resultTitle.push(document.getElementById(`result_title${j}`));
        resultImg.push(document.getElementById(`result_thumb${j}`))
        console.log(meal.strMeal)
        resultTitle[j].textContent = meal.strMeal;
        resultImg[j].src = meal.strMealThumb;
        j++;
    });
   
}



