import { SearchBar } from '@/components/SearchBar'

export const HomePage: React.FC = () => {
    return (
        <div className="container">
            <div className="row height d-flex justify-content-center pt-5">
                <div className="col-md-6">
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}
