import './App.scss';
import CreateNote from './components/CreateNote';
import ListNotes from './components/ListNotes';

function App() {
  return (
    <div className="App">
      <h1 id="#header">PERN KEEPER!</h1>
      <CreateNote />
      <ListNotes />
    </div>
  );
}

export default App;
