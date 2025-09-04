const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=Big Mac";

const searchBtn = document.getElementById("searchBtn");
const inputName = document.getElementById("inputMeal");
const apiContainer = document.getElementById("apiContainer");
const bodyElement = document.getElementById("bodyElement");

searchBtn.addEventListener("click",() =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputName.value}`;
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data);

            const meal = data.meals[0];
            apiContainer.innerHTML = "";
            const dishLeftAndRight = document.createElement("div");
            dishLeftAndRight.classList.add("dish-left-and-right");

            const dishLeft = document.createElement("div");
            dishLeft.classList.add("dish-left");

            const dishPhoto = document.createElement('img');
            dishPhoto.classList.add("dish-photo");
            dishPhoto.src = meal.strMealThumb;

            dishLeft.appendChild(dishPhoto);
            
            const dishRight = document.createElement('div');
            dishRight.classList.add('dish-right');

            const dishName = document.createElement('div');
            dishName.classList.add("dish-name");
            dishName.textContent = meal.strMeal;
            
            const dishCountry = document.createElement('div');
            dishCountry.classList.add('dish-country');
            dishCountry.textContent = meal.strArea;

            dishRight.appendChild(dishName);
            dishRight.appendChild(dishCountry);

            dishLeftAndRight.appendChild(dishLeft);
            dishLeftAndRight.appendChild(dishRight);

            apiContainer.appendChild(dishLeftAndRight);

            const listAll = document.createElement('div');
            listAll.classList.add('listAll');

            const ul = document.createElement('ul');
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient && ingredient.trim() !== "") {
                    const li = document.createElement("li"); 
                    li.textContent = `${ingredient} – ${measure}`;
                    ul.appendChild(li);                        
                }
            }
            
            listAll.appendChild(ul);
            apiContainer.appendChild(listAll);

            const viewRecipeBox = document.createElement('div');
            viewRecipeBox.classList.add('view-recipe-box');

            const viewRecipeBtn = document.createElement('button');
            viewRecipeBtn.id = "viewRecipeBtn";
            viewRecipeBtn.textContent = "View Recipe"

            viewRecipeBox.appendChild(viewRecipeBtn);
            apiContainer.appendChild(viewRecipeBox);

            viewRecipeBtn.addEventListener("click",()=>{
                const modalOverlay = document.createElement('div');
                modalOverlay.classList.add('modal-overlay');

                const modalContainer = document.createElement('div');
                modalContainer.classList.add('modal-container');

                const modalCloseBox = document.createElement('div');
                modalCloseBox.classList.add('modal-close-box');

                const modalCloseBtn = document.createElement('button');
                modalCloseBtn.id = "modalCloseBtn";
                modalCloseBtn.textContent = "x";

                modalCloseBox.appendChild(modalCloseBtn);

                const modalText = document.createElement('div');
                modalText.classList.add('modal-text');
                modalText.textContent= meal.strInstructions;

                modalContainer.appendChild(modalCloseBox);
                modalContainer.appendChild(modalText);

                modalOverlay.appendChild(modalContainer);

                bodyElement.appendChild(modalOverlay);

                modalCloseBtn.addEventListener('click',()=>{
                    modalOverlay.remove();
                })
                
            })
        })

        
})