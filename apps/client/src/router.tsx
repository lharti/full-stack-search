import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './pages/Home'

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}
