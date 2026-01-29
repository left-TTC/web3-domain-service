import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/pages/layout';
import { Search } from './pages/search';
import Index from './pages';
import DomainRecommend from './components/auction/domainRecommend';
import RootDomainCreate from './components/auction/rootDomainCreate';
import { useState } from 'react';
import { User } from './pages/usr';
import { DownLaodPage } from './pages/downLoad';



function App() { 
    
    const [showBrowserDomainQuery, setShowBrowserDomainQuery] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout openDomainQueryPage={() => setShowBrowserDomainQuery(true)}/>} >
                    <Route index element={<Index ifShowDomain={showBrowserDomainQuery} setDomainQuery={setShowBrowserDomainQuery}/>} />
                    <Route path='#' element={<Index ifShowDomain={showBrowserDomainQuery} setDomainQuery={setShowBrowserDomainQuery}/>} />
                    <Route path='*' element={<Index ifShowDomain={showBrowserDomainQuery} setDomainQuery={setShowBrowserDomainQuery}/>} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/usr' element={<User openDomainQueryPage={() => setShowBrowserDomainQuery(true)} />} />

                    {/** Auction Page */}
                    <Route path='/auction/recommend' element={<DomainRecommend />} />
                    <Route path='/auction/createRoot' element={<RootDomainCreate />} />

                    <Route path='/download' element={<DownLaodPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
