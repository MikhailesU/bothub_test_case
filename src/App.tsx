import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, defer } from 'react-router-dom';
import './App.sass';
import { Layout} from './layout';

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Layout/>}/>
    </>
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

