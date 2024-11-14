import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '@/utils/axios';
import Spinner from '@/components/ui/Spinner';
import AddressLink from '@/components/ui/AddressLink';
import BookingWidget from '@/components/ui/BookingWidget';
import PlaceGallery from '@/components/ui/PlaceGallery';
import PerksWidget from '@/components/ui/PerksWidget';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState({});
  const [replyVisible, setReplyVisible] = useState({});

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Récupérer le nom de l'utilisateur depuis le localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userName = storedUser ? storedUser.name : 'Unknown User';

  useEffect(() => {
    if (!id) {
      return '';
    }

    setLoading(true);

    const getPlace = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${API_BASE_URL}/api/places/${id}`,
        );
        setPlace(data.place);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getPlace();
  }, [id, API_BASE_URL]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const { data } = await axiosInstance.post(
        `${API_BASE_URL}/api/places/${id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPlace((prevPlace) => ({
        ...prevPlace,
        reviews: [...prevPlace.reviews, data.data[data.data.length - 1]],
      }));
      setRating(0);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplySubmit = async (reviewId) => {
    const token = localStorage.getItem('token');

    // Récupérer le nom de l'utilisateur depuis le localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userName = storedUser ? storedUser.name : 'Unknown User';

    try {
      const { data } = await axiosInstance.post(
        `${API_BASE_URL}/api/places/${id}/reviews/${reviewId}/reply`,
        {
          comment: reply[reviewId],
          userName: userName, // Envoi du nom de l'utilisateur avec la réponse
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPlace((prevPlace) => ({
        ...prevPlace,
        reviews: prevPlace.reviews.map((review) =>
          review._id === reviewId ? data.data : review,
        ),
      }));
      setReply({ ...reply, [reviewId]: '' });
      setReplyVisible({ ...replyVisible, [reviewId]: false });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReplyForm = (reviewId) => {
    setReplyVisible((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return null;
  }

  return (
    <div className="mt-4 overflow-x-hidden px-8 pt-20 ">
      <h1 className="text-3xl">{place.title}</h1>

      <AddressLink placeAddress={place.address} />
      <PlaceGallery place={place} />

      <div className="mb-8 mt-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div className="">
          <div className="my-4 ">
            <h2 className="text-2xl font-semibold">Description</h2>
            {place.description}
          </div>
          Max number of guests: {place.maxGuests}
          <PerksWidget perks={place?.perks} />
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="-mx-8 border-t bg-white px-8 py-8">
        <div>
          <h2 className="mt-4 text-2xl font-semibold">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">
          {place.extraInfo}
        </div>
      </div>

      {/* Section Avis */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Avis</h2>
        <div className="mt-4">
          {place.reviews?.length > 0 ? (
            place.reviews.map(
              (review) =>
                review && (
                  <div key={review._id} className="mb-4 p-4 border rounded">
                    <div className="flex items-center">
                      <span className="font-semibold">
                        {review.user?.name || userName}
                      </span>
                      <span className="ml-4">Note: {review.rating} / 5</span>
                    </div>
                    <p>{review.comment}</p>

                    {/* Affichage des réponses */}
                    {review.replies?.length > 0 && (
                      <div className="mt-4 ml-4 border-l-2 pl-4">
                        {review.replies?.length > 0 && (
                          <div className="mt-4 ml-4 border-l-2 pl-4">
                            {review.replies.map((reply) => (
                              <div key={reply._id} className="mb-2">
                                <span className="font-semibold">
                                  {reply.user?.name || userName}
                                </span>
                                : {reply.comment}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Formulaire de réponse visible uniquement pour les utilisateurs connectés */}
                    {localStorage.getItem('token') && (
                      <>
                        <button
                          onClick={() => toggleReplyForm(review._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
                        >
                          Répondre
                        </button>
                        {replyVisible[review._id] && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleReplySubmit(review._id);
                            }}
                            className="mt-4"
                          >
                            <textarea
                              value={reply[review._id] || ''}
                              onChange={(e) =>
                                setReply({
                                  ...reply,
                                  [review._id]: e.target.value,
                                })
                              }
                              placeholder="Répondre à cet avis"
                              className="w-full p-2 border rounded"
                              rows="2"
                            />
                            <button
                              type="submit"
                              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
                            >
                              Envoyer
                            </button>
                          </form>
                        )}
                      </>
                    )}
                  </div>
                ),
            )
          ) : (
            <p>Aucun avis pour l'instant.</p>
          )}
        </div>
      </div>

      {/* Formulaire pour laisser un avis */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Laisser un avis</h2>
        {localStorage.getItem('token') ? (
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label htmlFor="rating" className="block font-semibold">
                Note
              </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 block w-full p-2 border rounded"
                required
              >
                <option value="">Sélectionnez une note</option>
                <option value="1">1 étoile</option>
                <option value="2">2 étoiles</option>
                <option value="3">3 étoiles</option>
                <option value="4">4 étoiles</option>
                <option value="5">5 étoiles</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block font-semibold">
                Commentaire
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 block w-full p-2 border rounded"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Envoyer
            </button>
          </form>
        ) : (
          <p>Veuillez vous connecter pour laisser un avis.</p>
        )}
      </div>
    </div>
  );
};

export default PlacePage;
