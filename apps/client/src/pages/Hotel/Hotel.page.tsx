import { NotFoundCard } from '@/components/NotFoundCard'
import { useGetHotelQuery } from '@/hooks/useGetHotelQuery'
import { Link, useParams } from 'react-router'

export const HotelPage: React.FC = () => {
    const { hotelId } = useParams()

    const { data: hotel, isError } = useGetHotelQuery(hotelId!)

    if (isError) {
        return <NotFoundCard />
    }

    if (!hotel) {
        return <p>Loading...</p>
    }

    return (
        <div className="card text-center container w-70 mt-5">
            <div className="card-body">
                <h1 className="card-title">{hotel.hotelName}</h1>

                <h2>{hotel.chainName}</h2>

                <p className="card-text">City: {hotel.city}</p>
                <p className="card-text">Country: {hotel.country}</p>
                <p className="card-text">Address 1: {hotel.addressLine1}</p>
                <p className="card-text">Address 2: {hotel.addressLine2}</p>
                <p className="card-text">Zip code: {hotel.zipCode}</p>
                <p className="card-text">Star rating: {hotel.starRating}</p>

                <Link to="/" className="btn btn-primary">
                    Go back
                </Link>
            </div>
        </div>
    )
}
