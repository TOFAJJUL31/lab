import { useState } from "react";
import MealPage from "./MealPage";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const loadCategories = async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    const data = await response.json();
    setCategories(data.categories);
  };

  return (
    <div>
      <button onClick={loadCategories}>
        View Meal Categories
      </button>

      <div className="categories">
        {categories.map((category) => (
          <div className="category-card" key={category.idCategory}>
            <h2>{category.strCategory}</h2>

            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
            />

            <br />

            <button
              onClick={() =>
                setSelectedCategory(category.strCategory)
              }
            >
              View Food
            </button>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <MealPage category={selectedCategory} />
      )}
    </div>
  );
}

export default CategoryPage;