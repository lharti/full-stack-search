import { CityPage } from '@/pages/City'
import { CountryPage } from '@/pages/Country'
import { HotelPage } from '@/pages/Hotel'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './pages/Home'

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/hotels/:hotelId" element={<HotelPage />} />

                <Route path="/cities/:cityId" element={<CityPage />} />

                <Route path="/countries/:countryId" element={<CountryPage />} />
            </Routes>
        </BrowserRouter>
    )
}
