# Recipe Rainbow 
![Project Screenshot](src/images/RecipeRainbow.png)
![Project Screenshot](src/images/RecipeRainbow1.png)

## Table of Contents
- [About](#about)
- [Video](#video)
- [Tech](#tech)
- [Getting Started](#getting-started)
- [Code Examples](#code-examples)
- [Features](#features)
- [Status](#status)
- [Why?](#why)
- [Contact](#contact)
- [License](#license)

## About
**Recipe Rainbow** is a full-stack recipe sharing app where users can explore dishes by category, submit their own, and leave comments. Built for responsiveness, usability, and visual appeal, the project emphasizes clean UI/UX with dynamic animations and Firebase integration for real-time data.

## 🎥 Video
[Watch the demo](https://drive.google.com/file/d/14dXzJiPp_9B2hRA9IOCMb-6wyfjHAqwh/view?usp=drive_link)

## 🛠 Tech Stack

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- React Router
- Framer Motion
- React Toastify
- Google Fonts

**Backend:**
- Firebase Firestore (updated from Django)
- Firebase Auth & Storage
- Django 
- Python

**Hosting & Deployment:**
- Netlify
- Render

*Legacy backend (Django) still present but replaced with Firebase for real-time features.*


## 🚀 Getting Started

### Prerequisites
- Node.js
- Firebase account
- Python/Django (Backend)

### Usage
Try it here: [Live Demo](https://reciperainbow.netlify.app/)

### Cloning the Repository (Optional)
```bash
git clone https://github.com/Adrienner1988/recipe-rainbow.git
cd recipe-rainbow
npm install
npm run dev

## Code Examples
```javascript
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setLoading(true);

  try {
    const imageRef = ref(storage, `recipes/${image.name}-${Date.now()}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, "recipe"), {
      title,
      prep,
      cook,
      serving,
      categoryId: category,
      ingredients: ingredients.split("\n"),
      steps: steps.split("\n"),
      image: imageUrl,
      author: user?.displayName || "Anonymous",
      authorId: user?.uid || "null",
      createdAt: new Date(),
    });

    toast.success("Recipe added!");
    navigate(`/recipes`);
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};


```

## ✨ Features
-Browse and filter by recipe categories
-Submit your recipes with an image
-Responsive layout (mobile-first)
-Detailed recipe view with ingredients and steps
-Commenting system per recipe
-Firebase Auth (email + password)
-Attribution of recipes to signed-in users
-Toast notifications for feedback (login, logout, error, navigation)
-Animated UI transitions (Framer Motion)
-Lazy-loaded routes + loading spinner


## 🔧 Recent Improvements
🔁 Firebase Refactor: Swapped out Django for Firestore (auth, storage, real-time DB)

👥 User Auth: Email/password login via Firebase with user-based recipe attribution

🔐 Custom useAuth Hook: Global auth state management

🍞 Toastify Alerts: Seamless UX feedback (success, error, info)

🎬 Framer Motion Animations: Animated nav, cards, modals, and mobile menu

📱 Responsive Polish: Spacing fixes for category cards on small screens

🧭 Better UX: Category click toast ("Getting recipes for…") + delayed navigation

💡 Lazy Loading: Routes are now lazy-loaded with a smooth fallback spinner

🔢 Sorted Dropdowns: Time and serving options sorted numerically for better form UX


## 📈 Status
Recipe Rainbow is currently in a completed state with all core features functional. 

## Why
This project reflects my ability to manage frontend complexity, UX concerns, and full-stack integration using modern web tools. It grew from a basic CRUD app into a polished, animated experience powered by Firebase and React.


## Contact
- Email: `adriennerdaniels@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/adriennerdaniels/`
- GitHub: `Adrienner1988`

## License
This project is currently not licensed.
