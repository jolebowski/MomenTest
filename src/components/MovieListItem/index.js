import React from 'react';
import { Link } from 'react-router-dom';
import '../MovieListItem/listItem.css';
import moment from 'moment'
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const MovieListItem = (props) => {
    return (
        props.movie.poster_path !== null &&
        <div className="movieCard">
            <Link to={`/movies/${props.movie.id}`}>
                <img className="movieImg" src={`${IMAGE_BASE_URL}${props.movie.poster_path}`} alt="..." />
            </Link>
            <h3 className="title_list_item">{props.movie.title}</h3>
            <div className="movieDate">{moment(props.movie.release_date).format('MMM D, YYYY')}</div>
        </div>
    )
}
export default MovieListItem