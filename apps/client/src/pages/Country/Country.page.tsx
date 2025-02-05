import { NotFoundCard } from '@/components/NotFoundCard'
import { useGetCountryQuery } from '@/hooks/useGetCountryQuery'
import { Link, useParams } from 'react-router'

export const CountryPage: React.FC = () => {
    const { countryId } = useParams()

    const { data: country, isError } = useGetCountryQuery(countryId!)

    if (isError) {
        return <NotFoundCard />
    }

    if (!country) {
        return <p>Loading...</p>
    }

    return (
        <div className="card text-center container w-70 mt-5">
            <div className="card-body">
                <h1 className="card-title">{country.name}</h1>
                <p className="card-text">{country.isoCode}</p>

                <Link to="/" className="btn btn-primary">
                    Go back
                </Link>
            </div>
        </div>
    )
}
