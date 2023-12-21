import React, { Suspense, lazy } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home/index';
// import About from './pages/About';
const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./pages/Home"));
const About = lazy(() => import(/* webpackChunkName: 'about' */ "./pages/About"));

function App() {
    return <>
        <h1>App</h1>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
        <Suspense fallback={<div>loading...</div>}>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Suspense>
    </>
}

export default App;