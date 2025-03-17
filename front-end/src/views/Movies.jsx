import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reservationDate, setReservationDate] = useState("");
  const isAuthenticated = !!localStorage.getItem("access_token");

  useEffect(() => {
    fetchMovies();
  }, [search, page]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}movies?search=${search}&page=${page}`
      );
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async () => {
    if (!isAuthenticated) {
      alert("You must be logged in to book a movie.");
      return;
    }

    if (!reservationDate) {
      alert("Please select a date for your reservation.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}reservations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            movie_id: selectedMovie,
            reservationDate: reservationDate,
          }),
        }
      );

      if (response.ok) {
        alert("Reservation confirmed!");
        setSelectedMovie(null);
        setReservationDate("");
      } else {
        alert("Error during reservation.");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Error during reservation.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <Input
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset page on new search
        }}
        className="mb-4"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <Card key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <CardContent>
                  <h2 className="text-lg font-semibold">{movie.title}</h2>
                  <p className="text-sm text-gray-500">{movie.release_date}</p>
                  <p className="mt-2">{movie.overview.substring(0, 100)}...</p>
                  {isAuthenticated && (
                    <Button
                      onClick={() => {
                        setSelectedMovie(movie.id);
                      }}
                      className="mt-2 w-full"
                    >
                      Book
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 gap-2">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              ⬅️ Previous
            </Button>
            <span className="text-lg font-semibold">
              Page {page} / {totalPages}
            </span>
            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next ➡️
            </Button>
          </div>
        </>
      )}

      {/* Modal for reservation */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Reservation for the movie
            </h2>
            <Input
              type="datetime-local"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setSelectedMovie(null)}
                className="bg-gray-500 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReservation}
                className="bg-blue-500 text-white"
              >
                Confirm Reservation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
