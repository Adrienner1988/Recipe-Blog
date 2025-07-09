import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CategoriesList from "./CategoriesList";
import type { CategoryData } from "../types";

const CategoryListContainer = () => {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const snapshot = await getDocs(collection(db, "categories"));
                const data: CategoryData[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<CategoryData, "id">),
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

return (
    <CategoriesList categories={categories} />
    )
};


export default CategoryListContainer;
