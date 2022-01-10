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