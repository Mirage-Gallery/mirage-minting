import './App.css';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import AbstractArtchitecture from './pages/abstract-artchitecture';
import Reinventions from './pages/reinventions';
import EbbsandFlows from './pages/ebbsandflows';
import CuratedMinting from './pages/curated-minting';
import SentientClaim from './pages/sentient-claim';
import SyntheticHeartbeats from './pages/synthetic-heartbeats';

function App() {
  return (
  <Router>
	<Routes>
		<Route exact path='/' element={<Home />} />
		<Route path='/abstract-artchitecture' element={<AbstractArtchitecture/>} />
    	<Route path='/reinventions' element={<Reinventions/>} />
    	<Route path='/ebbs-and-flows' element={<EbbsandFlows/>} />
		<Route path='/curated-minting' element={<CuratedMinting/>} />
		<Route path='/sentient-claim' element={<SentientClaim/>} />
		<Route path='/synthetic-heartbeats' element={<SyntheticHeartbeats/>} />
	</Routes>
	</Router>
  );
}

export default App;
