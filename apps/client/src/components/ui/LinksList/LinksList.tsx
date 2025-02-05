import { Link } from 'react-router'

export type LinksListItem = {
    id: string
    title: string
    path: string
}

export interface LinksListProps {
    list: LinksListItem[]

    itemIcon?: React.ReactNode
}
export const LinksList: React.FC<LinksListProps> = ({
    list,

    itemIcon,
}) => {
    return (
        <>
            {list.map(item => (
                <li key={item.id}>
                    <Link to={item.path} className="dropdown-item">
                        {itemIcon}

                        {item.title}
                    </Link>

                    <hr className="divider" />
                </li>
            ))}
        </>
    )
}
