const select = document.querySelector('#recipes');
const recipeName = document.querySelector('#name');
const picture = document.querySelector('img');
const ingredients = document.querySelector('ul');
const directions = document.querySelector('div');


try {
  const file = await fetch('recipes.json');
  const recipeList = await file.json();
    recipeList.forEach((recipe) => {
      const option = document.createElement('option');
      option.value = recipe.id;
      option.textContent = recipe.name;
      select.appendChild(option);
    });
} catch (e) {
console.error('oops recipes', e);
}


select.addEventListener('change', async (e) => {
  //e.target.value
  try {
    const file = await fetch(`recipes/${e.target.value}.json`);
    const recipe = await file.json();
    console.log(recipe);
    recipeName.textContent = recipe.name;
    picture.src = recipe.picture;
    picture.alt = recipe.name;
    ingredients.innerHTML = '';
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredients.appendChild(li);
    });
    directions.textContent = recipe.directions;
  } catch (e) {
    console.error('oops recipe', e);
  }
});