import logo from './logo.svg';
import './App.css';
import Home from './Components/Home'
import {WordProvider} from './Context/WordContext'

function App() {
  return (
    <WordProvider>
      <div>
        <Home />
      </div>
    </WordProvider>
  );
}

export default App;
