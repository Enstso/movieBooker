import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly baseUrl: string | undefined;
  private readonly apiKey: string | undefined;

  constructor(
    private readonly httpService: HttpService  ) {
    this.baseUrl = process.env.URL_MOVIE;
    this.apiKey = process.env.API_KEY_MOVIE_DB;
  }

  async getMovies(page: number = 1, search?: string, sort?: string) {
    try {
      let url = '';

      if (search) {
        // Search movies by title
        url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(search)}&page=${page}&language=fr-FR`;
      } else {
        // Get a list of popular movies
        url = `${this.baseUrl}/popular?api_key=${this.apiKey}&page=${page}&language=fr-FR`;
      }

      const response = await firstValueFrom(this.httpService.get(url));

      let movies = response.data.results;

      // Sorting (if requested)
      if (sort) {
        movies = this.sortMovies(movies, sort);
      }

      return {
        page: response.data.page,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
        results: movies,
      };
    } catch (error) {
      throw new HttpException('Error fetching movies', HttpStatus.BAD_REQUEST);
    }
  }

  async searchMovie(query: string) {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&language=fr-FR`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException('Erreur lors de la recherche du film', HttpStatus.BAD_REQUEST);
    }
  }

  async getMovieDetails(movieId: string) {
    try {
      const url = `${this.baseUrl}/${movieId}?api_key=${this.apiKey}&language=fr-FR`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
  }

  private sortMovies(movies: any[], sort: string) {
    switch (sort) {
      case 'title_asc':
        return movies.sort((a, b) => a.title.localeCompare(b.title));
      case 'title_desc':
        return movies.sort((a, b) => b.title.localeCompare(a.title));
      case 'date_asc':
        return movies.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
      case 'date_desc':
        return movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
      default:
        return movies; // No sorting applied
    }
  }
}
