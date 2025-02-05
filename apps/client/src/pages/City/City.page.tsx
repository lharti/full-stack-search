import { NotFoundCard } from '@/components/NotFoundCard'
import { useGetCityQuery } from '@/hooks/useGetCityQuery'
import { Link, useParams } from 'react-router'

export const CityPage: React.FC = () => {
    const { cityId } = useParams()

    const { data: city, isError } = useGetCityQuery(cityId!)

    if (isError) {
        return <NotFoundCard />
    }

    if (!city) {
        return <p>Loading...</p>
    }

    return (
        <div className="card text-center container w-70 mt-5">
            <div className="card-body">
                <h1 className="card-title">{city.name}</h1>

                <Link to="/" className="btn btn-primary">
                    Go back
                </Link>
            </div>
        </div>
    )
}
