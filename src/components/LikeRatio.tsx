import { CSSProperties, useEffect, useState } from "react"
import { edit } from "../slices/MovieSLice"
import { useAppDispatch } from "../hooks"
import MovieType from "../types/movie"

type LikeRatioProps = {
    likes: number
    dislikes: number
    movie: MovieType
}

function LikeRatio(props: LikeRatioProps) {
    const dispatch = useAppDispatch()
    const [ratio, setRatio] = useState<CSSProperties>()

    function getRatio(): CSSProperties {
        const balance = (props.likes / (props.likes + props.dislikes)) * 100

        const style = {
            height: '4px',
            width: '100%',
            background: `linear-gradient(90deg, #13bd62 0% ${balance}%, #ed3e3e ${balance}% 100%)`
        } as CSSProperties

        return style
    }

    function handleClick(value: string) {
        const tmp = {...props.movie}
        switch (value) {
            case 'likes':
                tmp.likes += 1
                dispatch(edit([props.movie, tmp]))
                break
            case 'dislikes':
                tmp.dislikes += 1
                dispatch(edit([props.movie, tmp]))
                break
            default:
                break
        }
    }

    useEffect(() => {
        setRatio(getRatio())
    },[props.likes, props.dislikes])

    return (
        <div className='d-flex align-items-center'>
            <button className="btn btn-outline-success like-btn"
            onClick={() => handleClick('likes')}>
                <i className='fa-solid fa-thumbs-up'></i>
            </button>
            <div className='ratio mx-2' style={ratio}></div>
            <button className="btn btn-outline-danger dislike-btn"
            onClick={() => handleClick('dislikes')}>
                <i className='fa-solid fa-thumbs-down'></i>
            </button>
        </div>
    )
}

export default LikeRatio