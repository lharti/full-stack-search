import { PropsWithChildren } from 'react'

export const DropdownMenu: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="dropdown">
            <menu className="dropdown-menu show w-100">{children}</menu>
        </div>
    )
}
