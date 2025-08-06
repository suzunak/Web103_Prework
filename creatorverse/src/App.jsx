import { useRoutes } from 'react-router-dom'
import './App.css'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'

function App() {
  let routeConfig = useRoutes([
    {
      path:"/",
      element: <ShowCreators />
    },
    {
      path:"/view-creator/:id",
      element: <ViewCreator />
    },
    {
      path:"/edit-creator/:id",
      element: <EditCreator />
    },
    {
      path:"/add-creator",
      element: <AddCreator />
    }
  ])

  return routeConfig;
}

export default App
