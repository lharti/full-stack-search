import { Link } from 'react-router'

export const NotFoundCard: React.FC = () => {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div
                className="card text-center p-4 shadow"
                style={{ maxWidth: '400px' }}
            >
                <div className="card-body">
                    <h1 className="display-4">404</h1>

                    <p className="lead">Page Not Found</p>
                    <Link to="/" className="btn btn-primary">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
