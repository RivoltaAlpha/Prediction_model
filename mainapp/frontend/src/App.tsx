import './App.css';
import PredictionForm from './PredictionForm';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Credit Score Prediction</h1>
      </header>
      <main>
        <PredictionForm />
      </main>
    </div>
  );
};

export default App;