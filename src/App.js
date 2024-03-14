import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Card />
      </header>
    </div>
  );
}

export default App;
