import { useEffect, useState } from "react";

function MealPage({ category }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMeals = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );

        const data = await res.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    getMeals();
  }, [category]);

  return (
    <div className="meal-section">
      <h2>{category} Foods</h2>

      {loading && <p>Loading meals...</p>}

      <div className="meal-list">
        {meals.map((meal) => (
          <div className="meal-card" key={meal.idMeal}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />

            <h3>{meal.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealPage;