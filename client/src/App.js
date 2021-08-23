import './App.css';
import CreateNote from './components/CreateNote';
import ListNotes from './components/ListNotes';

function App() {
  return (
    <div className="App">
      <CreateNote />
      <ListNotes />
    </div>
  );
}

export default App;
