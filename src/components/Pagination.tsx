import { ReactNode, useEffect, useState } from "react"

type PaginationProps = {
    currentPage: number
    totalPages: number
    pageClicked: (pageClicked: number) => void
}

function Pagination(props: PaginationProps) {
    const [page, setPage] = useState<number>(props.currentPage)

    function displayPages(): ReactNode[] {
        const arr: ReactNode[] = []

        for (let i = 1; i <= props.totalPages; i++) {
           arr.push(
            <li className={`page-item ${page === i ? 'active' : ''}`} key={`page-btn-${i}`}>
                <button className='page-link' aria-label='Previous' onClick={
                    props.currentPage === i
                    ? () => {}
                    : () => props.pageClicked(i)
                    }>
                    {i}
                </button>
            </li>
           )
        }

        return arr
    }

    useEffect(() => {
        setPage(props.currentPage)
    },[props])

    return (
        <nav aria-label='Page navigation example' className='d-flex justify-content-center my-5'>
            <ul className='pagination'>
                <li className='page-item'>
                    <button className='page-link' aria-label='Previous' onClick={
                        props.currentPage === 1
                        ? () => {}
                        : () => props.pageClicked(props.currentPage - 1)
                        }>
                        <span aria-hidden='true'>&laquo;</span>
                    </button>
                </li>
                {displayPages()}
                <li className='page-item'>
                    <button className='page-link' aria-label='Next' onClick={
                        props.currentPage === props.totalPages
                        ? () => {}
                        : () => props.pageClicked(props.currentPage + 1)
                    }>
                        <span aria-hidden='true'>&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination