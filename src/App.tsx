import React, { useEffect, useState } from 'react'
import './App.css'
import { MovieType } from './types/movie'
import Filters from './components/Filters'
import { movies$ } from './data/movies'
import { useAppSelector, useAppDispatch } from './hooks'
import { set, movieList } from './slices/MovieSLice'

function App() {
    const movies = useAppSelector(movieList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        movies$.then((res: MovieType[]) => {
            dispatch(set(res))
        })
            .catch((err) => console.error(err))
    },[])

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            {movies.length != 0
            ?
            <Filters/>
            :
            <div>
                <div className='spinner-border text-primary' role='status'>
                    <span className='visually-hidden'>Chargement...</span>
                </div>
            </div>
            }
        </div>
    )
}

export default App
