import {createBrowserRouter} from 'react-router-dom'


import { HomePage } from '../pages/HomePage/HomePage';
import { Pokedex } from '../pages/Pokedex/Pokedex';
import { NotFound } from '../pages/NotFound';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },

  {
    path: '/pokedex',
    element: <Pokedex />
  },

  {
    path: '/notfound',
    element: <NotFound />
  }
])