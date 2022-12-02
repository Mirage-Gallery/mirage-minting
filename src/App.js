import './App.css';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import AbstractArtchitecture from './pages/abstract-artchitecture';
import Reinventions from './pages/reinventions';
import EbbsandFlows from './pages/ebbsandflows';



function App() {
  return (
  <Router>
	<Routes>
		<Route exact path='/' exact element={<Home />} />
		<Route path='/abstract-artchitecture' element={<AbstractArtchitecture/>} />
    <Route path='/reinventions' element={<Reinventions/>} />
    <Route path='/ebbs-and-flows' element={<EbbsandFlows/>} />

	</Routes>
	</Router>
  );
}

export default App;
