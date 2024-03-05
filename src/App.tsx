import AppBarHeader from './components/app-bar-header';
import Product from './src/product/product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <AppBarHeader />
      <Router>
        <div>
          <Routes>
            <Route path="/product" element={<Product />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
