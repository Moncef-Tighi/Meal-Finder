const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");;
const meals = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading")
const singleMeal = document.getElementById("single-meal");


const fetchMeal= function(){
    if (search.value.trim() && search.value.trim().length>=3) {
        return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`)
            .then(data=> data.json())
    }    

}

const getMealById = function(mealId){
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(data=> data.json())
}


submit.addEventListener("submit",async  (event)=>{
    event.preventDefault();

    singleMeal.innerHTML="";
    const data= await fetchMeal();
    if (data) {
        resultHeading.innerHTML=`<h2>Résultat pour "${search.value}" : <h2>`
        if(data.meals === null) {
            resultHeading.innerHTML= `<p>Aucun résultat ne corresponds à cette querry, veuillez ré-essayer</p>`
        } else {
            meals.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            `).join('');
        }
    }
    console.log(data);
    search.value="";
})

submit.addEventListener("keydown",async (event)=>{
    const data=await fetchMeal();
    if (data?.meals) {
        resultHeading.innerHTML=`<h2>Il y a ${data.meals.length} résultats pour "${search.value}"<h2>`
    } else {
        resultHeading.innerHTML=`<h2 id="empty">Il n'y a aucun résultat pour ${search.value}<h2>`

    }
})

random.addEventListener("click", ()=> {

})

meals.addEventListener('click',async (event)=> {
    if (event.target.classList[0]==="meal-info"){
        const id = event.target.getAttribute("data-mealid");
        let data = await getMealById(id);
        data= data.meals[0]
        const ingredients = [];
        for (let i=1; i<=20; i++) {
            //Oui, c'est extrêmement confus comme logique. Mais c'est parce que l'API est mal foutu. too bad !
            if(data[`strIngredient${i}`]){
                ingredients.push(`${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`);
            } else {
                break
            }
        }
        resultHeading.innerHTML=""
        resultHeading.innerHTML=`
            <div class="single-meal">
                <h1>${data.strMeal}</h1>
                <img src="${data.strMealThumb}" alt="${data.strMeal}" />
                <div class="single-meal-info">
                    ${data.strCategory ? `<p>${data.strCategory}</p>`: ""}
                    ${data.strArea ? `<p>${data.strArea}</p>`: ""}
                </div>

                <div clas"main">
                    <p>${data.strInstructions}</p>
                    <h2>Ingredient</h2>
                    <ul>
                        ${ingredients.map(ingredient=> `<li>${ingredient}</li>`).join("")}
                    </ul>

            </div>
            `
    }

})