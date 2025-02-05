import { HotelPage } from '@/pages/Hotel'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './pages/Home'

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/hotels/:hotelId" element={<HotelPage />} />
            </Routes>
        </BrowserRouter>
    )
}
