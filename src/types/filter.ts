export type FilterType = {
    category: Set<string>
    likes: string
    itemsPerPage: number
}

export const defaulFilterType: FilterType = {
    category: new Set(' '),
    likes: ' ',
    itemsPerPage: 8
}

export default FilterType