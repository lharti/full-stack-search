import { LinksList, LinksListItem } from '@/components/ui/LinksList'

export interface CitiesListProps {
    citiesLinks: LinksListItem[]
}
export const CitiesList: React.FC<CitiesListProps> = ({ citiesLinks }) => {
    return (
        <>
            <h2>Cities</h2>

            {citiesLinks.length ? (
                <LinksList
                    list={citiesLinks}
                    itemIcon={<i className="fa fa-map-marker mr-2" />}
                />
            ) : (
                <p>No cities matched</p>
            )}
        </>
    )
}
