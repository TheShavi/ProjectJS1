let rand_url = 'https://themealdb.com/api/json/v1/1/random.php';

    // Método para obtener una menú al azar
    async function Random(){
        const response = await fetch(rand_url);
        const data = await response.json();

        const {meals, idMeal, strMeal, strCategory, strInstructions, strMealThumb, strYoutube, 
            strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, 
            strIngredient12, strIngredient13, strIngredient14, strIngredient15, strIngredient16, strIngredient17, strIngredient18,
            strIngredient19, strIngredient20 } = data.meals[0];
        
        // Agrega la imagen de la receta
        const img = document.getElementById('thumb').src = strMealThumb;

        // Agrega el titulo de la receta
        const title = document.getElementById('title').textContent = strMeal;

        // Agrega las instrucciones de preparación
        const instructions = document.getElementById('instructions').textContent = "Instructions: " + strInstructions;

        // Agrega titulo ingredientes
        const list_ingredients = document.getElementById('list_ingredients').textContent = "Ingredients";

        // Agrega la lista de ingredientes -- Duda como agregar los ingredientes en un ciclo for
        const ingredients = document.getElementById('ingredients')
        ingredients.innerHTML = strIngredient1 +  strIngredient2 + strIngredient3
    
    }