import { SearchBarResult } from '@/components/SearchBarResult'
import { DropdownMenu } from '@/components/ui/DropdownMenu/DropdownMenu'
import { SearchInput } from '@/components/ui/SearchInput'
import { useSearchQuery } from '@/hooks/useSearchQuery'
import { useState } from 'react'

export const SearchBar: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [showClearInputButton, setShowClearInputButton] = useState(false)

    const { data } = useSearchQuery(searchValue)

    const handleSearchInputChange = (newValue: string) => {
        setSearchValue(newValue)
        setShowClearInputButton(newValue.length > 0)
    }

    const handleClearInputButtonClick = () => {
        setSearchValue('')
        setShowClearInputButton(false)
    }

    return (
        <>
            <SearchInput
                value={searchValue}
                placeholder="Search accommodations..."
                onChange={handleSearchInputChange}
                onClearInputButtonClick={handleClearInputButtonClick}
                showClearInputButton={showClearInputButton}
            />

            {data?.hotels && (
                <DropdownMenu>
                    <SearchBarResult searchResult={data} />
                </DropdownMenu>
            )}
        </>
    )
}
