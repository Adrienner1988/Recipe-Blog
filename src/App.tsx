import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './views/HomePage.tsx'
import RecipePage from './views/RecipePage.tsx'
import AddRecipePage from './views/AddRecipePage.tsx'
import  Nav from './components/Nav.tsx'

function App() {

  return (
    <>
    <Nav/>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/recipe' element={<RecipePage />} />
        <Route path='/add' element={<AddRecipePage />} />
      </Routes> 
    </>
  )
}

export default App
