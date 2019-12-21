import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {
  const APP_ID = "cfe7d1a5";
  const APP_KEY = "0ff270da80f8200b11f289454e865e8e";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(  () =>{
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();

    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>

      {recipes.map(recipe => (

          <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredientKey={recipe.recipe.ingredient}
          ingredients={recipe.recipe.ingredients}  
          />
      ))};
    </div>
  );
}

export default App;
