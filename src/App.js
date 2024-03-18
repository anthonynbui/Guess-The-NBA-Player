import './App.css';
import Card from './components/Card/Card';
import Header from './components/Header/Header';


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
