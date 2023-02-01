import { Routes, Route } from 'react-router-dom';
import { Home } from './pages';



const AppRouter = () => (
    <Routes>
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/" element={<Home />} />
    </Routes>
);

export default AppRouter;