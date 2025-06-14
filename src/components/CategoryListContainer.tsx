import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CategoriesList, { Category } from "./CategoriesList"; 

const CategoryListContainer = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const snapshot = await getDocs(collection(db, "categories"));
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Category, "id">),
                }));
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p className="text-center text-plum">Loading categories...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return <CategoriesList categories={categories} />;
};

export default CategoryListContainer;

// This component fetches categories from Firestore and passes them to CategoriesList for rendering.
// It handles loading and error states, displaying appropriate messages while data is being fetched or if an error occurs.  