import { useRoutes } from 'react-router-dom'
import './App.css'
import ShowCreators from './pages/ShowCreators'

function App() {
  let routeConfig = useRoutes([
    {
      path:"/",
      element: <ShowCreators />
    }
  ])

  return routeConfig;
}

export default App
