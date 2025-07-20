import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/pages/layout';
import { Search } from './pages/search';
import Index from './pages';
import Auction from './pages/auction';
import AuctionDomain from './components/auction/auctionDomianSale';
import DomainRecommend from './components/auction/domainRecommend';
import RootDomainCreate from './components/auction/rootDomainCreate';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Index />} />
                    <Route path='#' element={<Index />} />
                    <Route path='*' element={<Index />} />
                    <Route path='/search' element={<Search />} />

                    {/** Auction Page */}
                    <Route path='/auction' element={<Auction />} />
                    <Route path='/auction/recommend' element={<DomainRecommend />} />
                    <Route path='/auction/resale' element={<AuctionDomain />} />
                    <Route path='/auction/createRoot' element={<RootDomainCreate />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
