import MovieType from "../types/movie"
import LikeRatio from "./LikeRatio"
import { remove } from "../slices/MovieSLice"
import { useAppDispatch } from "../hooks"
import { useEffect, useState } from "react"

type MovieCardProps = {
    movie: MovieType
    callback: (item: MovieType) => void
}

function MovieCard(props: MovieCardProps) {
    const dispatch = useAppDispatch()
    const [colors, setColors] = useState<number[]>([])

    useEffect(() => {
        setColors([
            Math.floor(Math.random() * 175 + 80),
            Math.floor(Math.random() * 175 + 80),
            Math.floor(Math.random() * 175 + 80),
            Math.floor(Math.random() * 175 + 80),
            Math.floor(Math.random() * 175 + 80),
            Math.floor(Math.random() * 175 + 80),
        ])
    },[props.movie])

    return (
        <div className='card shadow-lg bg-dark'>
            <div className='card-body'>
                <h5 className='text-center card-title fw-bold p-5 rounded'
                style={{
                    background: `linear-gradient(45deg, rgb(${colors[0]},${colors[1]},${colors[2]}), rgb(${colors[3]},${colors[4]},${colors[5]})`}}
                >
                    {props.movie.title}
                </h5>
                <p>{props.movie.category}</p>
                <LikeRatio likes={props.movie.likes} dislikes={props.movie.dislikes} movie={props.movie}/>
                <div className="d-flex justify-content-center mt-3">
                    <button className='btn btn-danger'
                    onClick={() => props.callback(props.movie)}>
                        supprimer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieCard