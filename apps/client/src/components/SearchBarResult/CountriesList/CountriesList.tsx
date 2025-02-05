import { LinksList, LinksListItem } from '@/components/ui/LinksList'

export interface CountriesListProps {
    countriesLinks: LinksListItem[]
}
export const CountriesList: React.FC<CountriesListProps> = ({
    countriesLinks,
}) => {
    return (
        <>
            <h2>Countries</h2>

            {countriesLinks.length ? (
                <LinksList
                    list={countriesLinks}
                    itemIcon={<i className="fa fa-flag mr-2" />}
                />
            ) : (
                <p>No countries matched</p>
            )}
        </>
    )
}
