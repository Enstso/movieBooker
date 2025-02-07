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
      const response = await fetch(`http://localhost:5000/movies?search=${search}&page=${page}`);
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
      alert("Vous devez être connecté pour réserver un film.");
      return;
    }

    if (!reservationDate) {
      alert("Veuillez choisir une date pour votre réservation.");
      return;
    }

    try {
    console.log(localStorage.getItem('access_token'));
      const response = await fetch("http://localhost:5000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          movie_id: selectedMovie,
          reservationDate: reservationDate,
        }),
      });

      if (response.ok) {
        alert("Réservation confirmée !");
        setSelectedMovie(null);
        setReservationDate("");
      } else {
        alert("Erreur lors de la réservation.");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Erreur lors de la réservation.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Films</h1>
      <Input 
        placeholder="Rechercher un film..." 
        value={search} 
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset page on new search
        }} 
        className="mb-4"
      />

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <Card key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover" />
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
                      Réserver
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
              ⬅️ Précédent
            </Button>
            <span className="text-lg font-semibold">
              Page {page} / {totalPages}
            </span>
            <Button 
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} 
              disabled={page === totalPages}
            >
              Suivant ➡️
            </Button>
          </div>
        </>
      )}

      {/* Modal for reservation */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Réservation pour le film</h2>
            <Input
              type="datetime-local"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setSelectedMovie(null)} className="bg-gray-500 text-white">
                Annuler
              </Button>
              <Button onClick={handleReservation} className="bg-blue-500 text-white">
                Confirmer la Réservation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
