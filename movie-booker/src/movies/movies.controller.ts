import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/constants';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get a list of movies with pagination, search, and sorting' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination (default: 1)' })
  @ApiQuery({ name: 'search', required: false, description: 'Search movies by title' })
  @ApiQuery({ name: 'sort', required: false, description: 'Sort movies (title_asc, title_desc, date_asc, date_desc)' })
  @ApiResponse({ status: 200, description: 'List of movies' })
  @ApiResponse({ status: 400, description: 'Error fetching movies' })
  async getMovies(
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ) {
    return this.moviesService.getMovies(page || 1, search, sort);
  }

  @Public()
  @Get('now_playing')
  @ApiOperation({ summary: 'Get currently playing movies' })
  @ApiResponse({ status: 200, description: 'List of currently playing movies' })
  @ApiResponse({ status: 400, description: 'Error retrieving movies' })
  async getNowPlaying() {
    return this.moviesService.getNowPlaying();
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: 'Search for a movie by title' })
  @ApiQuery({ name: 'query', required: true, description: 'Movie title to search for' })
  @ApiResponse({ status: 200, description: 'Search results' })
  @ApiResponse({ status: 400, description: 'Error searching for the movie' })
  async searchMovie(@Query('query') query: string) {
    return this.moviesService.searchMovie(query);
  }

  @Public()
  @Get(':movie_id')
  @ApiOperation({ summary: 'Get details of a specific movie' })
  @ApiParam({ name: 'movie_id', required: true, description: 'Movie ID' })
  @ApiResponse({ status: 200, description: 'Movie details' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  async getMovieDetails(@Param('movie_id') movieId: string) {
    return this.moviesService.getMovieDetails(movieId);
  }

  @Public()
  @Get('genres')
  @ApiOperation({ summary: 'Get the list of movie genres' })
  @ApiResponse({ status: 200, description: 'List of movie genres' })
  @ApiResponse({ status: 400, description: 'Error retrieving genres' })
  async getGenres() {
    return this.moviesService.getGenres();
  }
}
