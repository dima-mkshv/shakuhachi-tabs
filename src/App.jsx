import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Chart from './pages/Chart';
import Scales from './pages/Scales';
import Techniques from './pages/Techniques';
import Glossary from './pages/Glossary';
import './App.css';

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="notes" element={<Notes />} />
            <Route path="chart" element={<Chart />} />
            <Route path="scales" element={<Scales />} />
            <Route path="techniques" element={<Techniques />} />
            <Route path="glossary" element={<Glossary />} />
          </Route>
        </Routes>
      </AppProvider>
    </HashRouter>
  );
}
