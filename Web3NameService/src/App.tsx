import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/pages/layout';
import { Search } from './pages/search';
import Index from './pages';
import Auction from './pages/auction';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Index />} />
                    <Route path='#' element={<Index />} />
                    <Route path='*' element={<Index />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/auction' element={<Auction />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
