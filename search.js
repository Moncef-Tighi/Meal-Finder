const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");;
const meals = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading")
const singleMeal = document.getElementById("single-meal");


const fetchMeal= function(){
    if (search.value.trim()) {
        return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`)
            .then(data=> data.json())
            .then(data=> console.log(data));
    }    

}
 
submit.addEventListener("submit", (event)=>{
    event.preventDefault();

    singleMeal.innerHTML="";
    const data= fetchMeal();
    console.log(data);
    search.value="";
})

submit.addEventListener("keydown", (event)=>{
    const data= fetchMeal();
    console.log(data);  
})

random.addEventListener("click", ()=> {

})