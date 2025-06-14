import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// 🔹 Step 1: Seed Categories
export const seedCategories = async () => {
  const categories = [
    {
      name: "Breakfast",
      image: "https://via.placeholder.com/300x300?text=Breakfast",
    },
    { name: "Lunch", image: "https://via.placeholder.com/300x300?text=Lunch" },
    {
      name: "Dinner",
      image: "https://via.placeholder.com/300x300?text=Dinner",
    },
    {
      name: "Desserts",
      image: "https://via.placeholder.com/300x300?text=Desserts",
    },
    {
      name: "Drinks",
      image: "https://via.placeholder.com/300x300?text=Drinks",
    },
  ];

  for (const cat of categories) {
    console.log("📦 Seeding category:", cat);
    await addDoc(collection(db, "categories"), cat);
  }

  alert("✅ Categories seeded!");
};

// 🔹 Step 2: Seed Recipes
export const seedRecipes = async () => {
  const catSnapshot = await getDocs(collection(db, "categories"));
  const categories = catSnapshot.docs.map((doc) => {
    const data = doc.data() as { name: string; image: string };
    return {
      id: doc.id,
      name: data.name,
      image: data.image,
    };
  });

  const sampleRecipes = [
    {
      title: "Lemon Garlic Pasta",
      image: "https://via.placeholder.com/600x400?text=Pasta",
      ingredients: ["Pasta", "Garlic", "Lemon", "Olive Oil"],
      instructions: "Boil pasta. Sauté garlic. Combine and serve with lemon.",
      categoryName: "Dinner",
    },
    {
      title: "Berry Yogurt Parfait",
      image: "https://via.placeholder.com/600x400?text=Parfait",
      ingredients: ["Yogurt", "Berries", "Granola", "Honey"],
      instructions: "Layer ingredients in a glass. Drizzle with honey.",
      categoryName: "Breakfast",
    },
  ];

  for (const recipe of sampleRecipes) {
    const category = categories.find((c) => c.name === recipe.categoryName);

    if (!category?.id) {
      console.warn(
        `⚠️ Skipping recipe "${recipe.title}" — no matching category found for "${recipe.categoryName}"`
      );
      continue;
    }

    const recipeData = {
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      categoryId: category.id,
      createdAt: serverTimestamp(),
    };

    console.log("📦 Seeding recipe:", recipeData);
    await addDoc(collection(db, "recipes"), recipeData);
  }

  alert("✅ Recipes seeded!");
};
