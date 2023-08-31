import DragAndDrop from "./components/DragAndDrop";
import Pokemons from "./components/Pokemons";

function App() {
  return (
    <div className="app">
      <header>
        <h1>POKEMON!</h1>
      </header>

      <div className="content">
        <Pokemons />
        <DragAndDrop />
      </div>
    </div>
  );
}

export default App;
