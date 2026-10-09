import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Product from './pages/product'
import EnhancedTable from './pages/product'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <EnhancedTable/>
    </>
  )
}

export default App
