import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './views/HomePage.tsx'
import RecipeList from './components/RecipeList.tsx'
import RecipeDetail from './components/RecipeDetail.tsx'
import Nav from './components/Nav.tsx'

function App() {

  return (
    <>
    <Nav/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipes' element={<RecipeList />} />
        <Route path='/recipes/:id' element={<RecipeDetail />} />
      </Routes> 
    </>
  )
}

export default App
