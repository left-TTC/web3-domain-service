import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/pages/layout';
import { Index } from '@/pages';
import { Search } from './pages/search';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Index />} />
                    <Route path='#' element={<Index />} />
                    <Route path='*' element={<Index />} />
                    <Route path='/search' element={<Search />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
