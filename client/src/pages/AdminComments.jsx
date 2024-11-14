import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axios';
import Spinner from '@/components/ui/Spinner';

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `${API_BASE_URL}/api/admin/places/reviews`,
        );
        setComments(data.data);
        setLoading(false);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des commentaires:',
          error,
        );
        setLoading(false);
      }
    };

    fetchComments();
  }, [API_BASE_URL]);

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cet avis ?',
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      await axiosInstance.delete(
        `${API_BASE_URL}/api/admin/reviews/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
    }
  };

  const handleDeleteReply = async (reviewId, replyId) => {
    const confirmDelete = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cette réponse ?',
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      await axiosInstance.delete(
        `${API_BASE_URL}/api/admin/reviews/${reviewId}/replies/${replyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment._id === reviewId) {
            return {
              ...comment,
              replies: comment.replies.filter((reply) => reply._id !== replyId),
            };
          }
          return comment;
        }),
      );
    } catch (error) {
      console.error('Erreur lors de la suppression de la réponse:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="mt-4 px-8 pt-20">
      <h1 className="text-3xl font-semibold">Modération des Commentaires</h1>
      <div className="mt-8">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="mb-4 p-4 border rounded">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold">
                    {comment.user?.name || 'Utilisateur inconnu'}
                  </span>
                  <span className="ml-4">Note: {comment.rating} / 5</span>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
              <p className="mt-2">{comment.comment}</p>
              {comment.replies?.length > 0 && (
                <div className="mt-4 ml-4 border-l-2 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="mb-2 flex justify-between">
                      <div>
                        <span className="font-semibold">
                          {reply.user?.name || 'Utilisateur inconnu'}
                        </span>
                        : {reply.comment}
                      </div>
                      <button
                        onClick={() =>
                          handleDeleteReply(comment._id, reply._id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour l'instant.</p>
        )}
      </div>
    </div>
  );
};

export default AdminComments;
