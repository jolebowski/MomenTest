import React, { Component } from 'react';
import { API_KEY } from '../../constants';
import Axios from 'axios';
import MovieListItem from '../MovieListItem'
import './movies.css'
class Movies extends Component {

    state = {
        movies: [],
        page: 1,
        totalPages: null
    }

    async fetchMovie() {
        const { page, movies } = this.state
        try {
            let res = await Axios(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-FR&page=${page}`
            );
            this.setState({
                movies: [...movies, ...res.data.results],
                scrolling: false,
                totalPages: res.data.total_pages,
            })
            console.log(res, 'ressss')

        } catch (e) {
            console.log(e)
        }
    }

    componentDidMount() {
        this.fetchMovie()
        this.scrollListener = window.addEventListener("scroll", e => {
            this.handleScroll(e);
        });
    }

    loadMore = () => {
        setTimeout(() => {
            this.setState(
                prevState => ({
                    page: prevState.page + 1,
                    scrolling: true
                }),
                this.fetchMovie
            );
        }, 1000);

    };
    handleScroll = () => {
        let lastLi = document.querySelector("div.movieCard > div:last-child");
        let lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        console.log(lastLiOffset, 'lastlioffset')
        let pageOffset = window.pageYOffset + window.innerHeight;
        if (pageOffset > lastLiOffset) {
            this.loadMore();
        }
    };

    render() {
        const { movies } = this.state
        return (
            <div className="moviesList">
                {movies.map(movie => {
                    return <MovieListItem key={movie.id} movie={movie} />
                })}
            </div>
        );
    }
}

export default Movies;
