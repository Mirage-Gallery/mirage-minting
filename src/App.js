import './App.css';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import AbstractArtchitecture from './pages/abstract-artchitecture';
import CuratedMinting from './pages/curated-minting';
import SentientClaim from './pages/sentient-claim';

function App() {
	return (
	<Router>
	<Routes>
	  <Route exact path='/' element={<Home />} />
	  <Route path='/abstract-artchitecture' element={<AbstractArtchitecture/>} />
	  <Route path='/curated-minting' element={<CuratedMinting/>} />
	  <Route path='/sentient-claim' element={<SentientClaim/>} />
	</Routes>
	</Router>
	);
  }

export default App;
