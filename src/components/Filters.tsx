import { ReactNode, useEffect, useState } from 'react'
import { FilterType, defaulFilterType } from '../types/filter'
import MovieType from '../types/movie'
import MovieCard from './MovieCard'
import Pagination from './Pagination'
import { movies$ } from '../data/movies'
import { remove } from '../slices/MovieSLice'
// import { movieList } from '../slices/MovieSLice'
// import { useAppSelector } from '../hooks'

function Filters() {
    // const movies = useAppSelector(movieList)
    const [movies, setMovies] = useState<MovieType[]>([])
    const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([...movies])
    const [page, setPage] = useState<number>(1)
    const [filters, setFilters] = useState<FilterType>({...defaulFilterType})
    const [displayedMovies, setDisplayedMovies] = useState<ReactNode[]>([])

    function displayMovies(currentPage: number): ReactNode[] {
        let arr: ReactNode[] = []
        let tmp: MovieType[]

        if (filteredMovies) {
            tmp = [...filteredMovies]

            tmp.forEach((movie: MovieType, index: number) => {
                arr.push(
                    <div className='col-12 col-md-6 my-3' key={`movie-card-${index}`}>
                        <MovieCard movie={movie}  callback={removeItem} key={movie.id} />
                    </div>
                )
            })

            arr = arr.slice((currentPage - 1) * filters.itemsPerPage, currentPage * filters.itemsPerPage)
        }

        return arr
    }

    function createCategoryFilters(): ReactNode[] {
        let arr: ReactNode[] = []
        let tmp = [...movies]
        let categories = [...new Set(tmp.map(item => item.category))]

        categories.forEach((category: string, index: number) => {
            arr.push(
                <li key={`cat-check-${index}`}>
                    <div className='form-check'>
                        <input className='form-check-input' type='checkbox' value={category} id={`filter-${category}`}
                        onChange={(e) => handleChange('category', e.target.value)}/>
                        <label className='form-check-label' htmlFor='flexCheckDefault'>
                            {category}
                        </label>
                    </div>
                </li>
            )
        })

        return arr
    }

    function handleChange(filter: string, value: string) {
        let tmp = {...filters}
        
        if (!value) {
            return
        }

        switch (filter) {
            case 'itemsPerPage':
                tmp.itemsPerPage = parseFloat(value)
                break
            case 'category':
                tmp.category.has(value) ? tmp.category.delete(value) : tmp.category.add(value)
                break
            case 'likes':
                tmp.likes === value ? tmp.likes = 'none' : tmp.likes = value
                break
        
            default:
                break
        }

        setFilters(tmp)
        setDisplayedMovies(displayMovies(1))
    }
 
    function handlePageClick(pageClicked: number) {
        setPage(pageClicked)
        setDisplayedMovies(displayMovies(pageClicked))
    }

    useEffect(() => {
        setDisplayedMovies(displayMovies(1))
    },[filteredMovies])

    useEffect(() => {
        let tmp = [...movies]

        if (filters.likes === 'likes') {
            tmp = tmp.sort((a: MovieType, b: MovieType) => (b.likes/b.dislikes) -(a.likes/a.dislikes))
        } else if (filters.likes === 'dislikes'){
            tmp = tmp.sort((a: MovieType, b: MovieType) => (a.likes/a.dislikes) -(b.likes/b.dislikes))
        }

        let copy: MovieType[] = []
        filters.category.size > 1
        ?   tmp.forEach((item: MovieType) => {
                if (filters.category.has(item.category)) {
                    copy.push(item)
                }
            })
        : copy = [...tmp]
        
        setFilteredMovies(copy)
    },[filters])

    function removeItem(item: MovieType) {
        const index = filteredMovies.indexOf(item)
        const tmp = [...filteredMovies]
        tmp.splice(index, 1)
        setFilteredMovies(tmp)
    }

    useEffect(() => {
        setFilteredMovies([...movies])
    },[movies])

    useEffect(() => {
        movies$.then((res: MovieType[]) => {
            setMovies(res)
        })
            .catch((err) => console.error(err))
    },[])

    return (
        <div className='d-flex flex-column align-items-center w-100 text-white'>

            <div className='d-flex justify-content-between align-items-center col col-md-10 col-xl-6 pt-5'>
                <div className='col-4'>
                    <label htmlFor='rangeItemsCount' className='form-label'>Films par page : {filters.itemsPerPage}</label>
                    <input type='range' className='form-range' min='4' max='12' step='4' value={filters.itemsPerPage} id='rangeItemsCount'
                    onChange={(e) => handleChange('itemsPerPage', e.target.value)}/>
                </div>
                <div className='dropdown mx-3'>
                    <button className='btn btn-primary dropdown-toggle' type='button' id='dropdownCategories' data-bs-toggle='dropdown' aria-expanded='false'>
                        Categories
                    </button>
                    <ul className='dropdown-menu p-1' aria-labelledby='dropdownCategories'>
                        {createCategoryFilters()}
                    </ul>
                </div>
                <div className='dropdown'>
                    <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownLikes' data-bs-toggle='dropdown' aria-expanded='false'>
                        Likes
                    </button>
                    <ul className='dropdown-menu p-1' aria-labelledby='dropdownLikes'>
                        <li>
                            <div className='form-check'>
                                <input className='form-check-input' type='checkbox' value='likes' id='checkAsc'
                                onChange={e => handleChange('likes', e.target.value)}/>
                                <label className='form-check-label' htmlFor='checkAsc'>
                                    Most liked
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className='form-check'>
                                <input className='form-check-input' type='checkbox' value='dislikes' id='checkDesc'
                                onChange={e => handleChange('likes', e.target.value)}/>
                                <label className='form-check-label' htmlFor='checkDesc'>
                                    Most disliked
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='col-12 col-md-10 col-xl-6 py-5'>
                <div className='w-100 row'>
                    {displayedMovies}
                </div>
                <Pagination totalPages={Math.ceil(filteredMovies.length / filters.itemsPerPage)} currentPage={page} pageClicked={handlePageClick} />
            </div>
        
        </div>
    )
}

export default Filters