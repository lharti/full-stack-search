import { LinksList, LinksListItem } from '@/components/ui/LinksList'

export interface HotelsListProps {
    hotelsLinks: LinksListItem[]
}
export const HotelsList: React.FC<HotelsListProps> = ({ hotelsLinks }) => {
    return (
        <>
            <h2>Hotels</h2>

            {hotelsLinks.length ? (
                <LinksList
                    list={hotelsLinks}
                    itemIcon={<i className="fa fa-building mr-2" />}
                />
            ) : (
                <p>No hotels matched</p>
            )}
        </>
    )
}
