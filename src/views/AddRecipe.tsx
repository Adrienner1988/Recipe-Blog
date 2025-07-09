import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CategoryData, TimeOption, Servings } from "../types";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        const imageRef = ref(storage, `recipes/${image.name}-${Date.now()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const newRecipeRef = await addDoc(collection(db, "recipe"), {
        title,
        prep,
        cook,
        serving,
        categoryId: category,
        ingredients: ingredients.split("\n"),
        steps: steps.split("\n"),
        image: imageUrl,
        createdAt: new Date(),
        author: user?.displayName || "Anonymous",
        authorId: user?.uid || "null",
      });

      toast.success("🎉 Thank you for sharing the yum!");
      navigate(`/recipes/${newRecipeRef.id}`);
    } catch (error) {
      console.error("Error submitting recipe:", error);
      toast.error("🚫 Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const catSnap = await getDocs(collection(db, "categories"));
        setCategoryOptions(
          catSnap.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as CategoryData)
          )
        );

        const prepSnap = await getDocs(collection(db, "timeOption"));
        setPrepOptions(
          prepSnap.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as TimeOption)
          )
        );

        const cookSnap = await getDocs(collection(db, "timeOption"));
        setCookOptions(
          cookSnap.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as TimeOption)
          )
        );

        const servSnap = await getDocs(collection(db, "servings"));
        setServingOptions(
          servSnap.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Servings)
          )
        );
      } catch (error) {
        console.error("Error loading options:", error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(image);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  return (
    <>
      <div className="bg-background font-sans text-foreground min-h-screen">
        <main className="container py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold font-serif text-primary mb-4">
              Add Your Recipe
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thank you for contributing to our community! Your recipe helps
              make this place more delicious.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-lg px-4 sm:px-6 mx-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-card p-8 rounded-lg shadow-lg border"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Recipe Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter your recipe title"
                      required
                      className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Prep Time
                      </label>
                      <select
                        value={prep}
                        onChange={(e) => setPrep(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Prep Time</option>
                        {prepOptions.map((p) => (
                          <option key={p.id} value={p.time}>
                            {p.time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Cook Time
                      </label>
                      <select
                        value={cook}
                        onChange={(e) => setCook(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Cook Time</option>
                        {cookOptions.map((c) => (
                          <option key={c.id} value={c.time}>
                            {c.time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Servings
                      </label>
                      <select
                        value={serving}
                        onChange={(e) => setServing(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Servings</option>
                        {servingOptions.map((s) => (
                          <option key={s.id} value={s.serving}>
                            {s.serving}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Category</option>
                      {categoryOptions.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ingredients
                    </label>
                    <textarea
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                      placeholder="List your ingredients (one per line)"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Instructions
                    </label>
                    <textarea
                      value={steps}
                      onChange={(e) => setSteps(e.target.value)}
                      placeholder="Write your cooking steps (one per line)"
                      required
                      rows={8}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Recipe Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImage(e.target.files[0]);
                        } else {
                          setImage(null);
                        }
                      }}
                      required
                      className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {previewUrl && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Image Preview
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4">
                        <img
                          src={previewUrl}
                          alt="Recipe preview"
                          className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 px-6 rounded-md font-semibold text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Share the YUM!"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default AddRecipe;
