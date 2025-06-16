import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CategoryData, TimeOption, Servings } from "../types";


const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [prep, setPrep] = useState("");
  const [prepOptions, setPrepOptions] = useState<TimeOption[]>([]);
  const [cook, setCook] = useState("");
  const [cookOptions, setCookOptions] = useState<TimeOption[]>([]);
  const [serving, setServing] = useState("");
  const [servingOptions, setServingOptions] = useState<Servings[]>([]);
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<CategoryData[]>([]);
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        const imageRef = ref(storage, `recipes/${image.name}-${Date.now()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "recipes"), {
        title,
        prep,
        cook,
        serving,
        categoryId: category,
        ingredients: ingredients.split("\n"),
        steps: steps.split("\n"),
        image: imageUrl,
        createdAt: new Date(),
      });

      alert("Thank you for sharing the yum!");
      navigate("/recipes");
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const catSnap = await getDocs(collection(db, "categories"));
        setCategoryOptions(catSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CategoryData)));

        const prepSnap = await getDocs(collection(db, "prep-options"));
        setPrepOptions(prepSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TimeOption)));

        const cookSnap = await getDocs(collection(db, "cook-options"));
        setCookOptions(cookSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TimeOption)));

        const servSnap = await getDocs(collection(db, "serving-options"));
        setServingOptions(servSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Servings)));
      } catch (error) {
        console.error("Error loading options:", error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <>
      <div className="bg-grayLight"></div>
      <div>
        <h2>Add Your Recipe</h2>
      </div>

      <div className="text-center m-4">
        <p className="text-darkPlum font-semibold">
          Thank you for contributing to our community! Your recipe helps make this place more delicious.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-lg sm: p-4">
          <form onSubmit={handleSubmit} className="bg-green p-6 rounded-lg shadow-custom-dark">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />

            <select value={prep} onChange={(e) => setPrep(e.target.value)} required>
              <option value="">Select Prep Time</option>
              {prepOptions.map((p) => (
                <option key={p.id} value={p.id}>{p.time}</option>
              ))}
            </select>

            <select value={cook} onChange={(e) => setCook(e.target.value)} required>
              <option value="">Select Cook Time</option>
              {cookOptions.map((c) => (
                <option key={c.id} value={c.id}>{c.time}</option>
              ))}
            </select>

            <select value={serving} onChange={(e) => setServing(e.target.value)} required>
              <option value="">Select Servings</option>
              {servingOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.serving}</option>
              ))}
            </select>

            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (one per line)" required />
            <textarea value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="Steps (one per line)" required />
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required />

            <button type="submit" className="border-none bg-darkPlum rounded-xl p-2 uppercase text-green hover:text-grayLight">
              Share the YUM!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
