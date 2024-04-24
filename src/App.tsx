import { Provider  } from "react-redux";

import { store }  from '../src/store/store.redux.ts';
import  ListPokemon  from "./pages/PokemonList.tsx";
import Header from "./pages/Header.tsx";


export function App() {
  return (
    <Provider store={store}>
      <Header />
   <ListPokemon />
    </Provider>
  );
}


