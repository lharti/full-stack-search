import './SearchInput.style.css'

interface SearchInputProps {
    value: string
    onChange: (newValue: string) => void

    showClearInputButton?: boolean
    onClearInputButtonClick?: () => void

    placeholder?: string
}

export const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,

    showClearInputButton = true,
    onClearInputButtonClick,

    placeholder,
}) => {
    return (
        <div className="form position-relative">
            <i className="fa fa-search"></i>

            <input
                role="search"
                aria-label={placeholder}
                type="text"
                className="form-control form-input"
                value={value}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
            />

            {showClearInputButton && (
                <span
                    className="clear-search-button"
                    role="button"
                    aria-label="Clear search field"
                    onClick={() => onClearInputButtonClick?.()}
                >
                    <i className="fa fa-close clear-search-button-icon"></i>
                </span>
            )}
        </div>
    )
}
