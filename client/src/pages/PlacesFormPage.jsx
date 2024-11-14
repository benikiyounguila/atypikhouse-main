import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '@/utils/axios';

import AccountNav from '@/components/ui/AccountNav';
import Perks from '@/components/ui/Perks';
import PhotosUploader from '@/components/ui/PhotosUploader';
import Spinner from '@/components/ui/Spinner';

const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 10,
    price: 500,
    type: '',
  });

  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    type,
  } = formData;

  const isValidPlaceData = () => {
    if (title.trim() === '') {
      toast.error("Title can't be empty!");
      return false;
    } else if (address.trim() === '') {
      toast.error("Address can't be empty!");
      return false;
    } else if (addedPhotos.length < 5) {
      toast.error('Upload at least 5 photos!');
      return false;
    } else if (description.trim() === '') {
      toast.error("Description can't be empty!");
      return false;
    } else if (maxGuests < 1) {
      toast.error('At least one guests is required!');
      return false;
    } else if (maxGuests > 10) {
      toast.error("Max. guests can't be greater than 10");
      return false;
    }

    return true;
  };

  const handleFormData = (e) => {
    const { name, value, type } = e.target;
    // If the input is not a checkbox, update 'formData' directly
    if (type !== 'checkbox') {
      setFormData({ ...formData, [name]: value });
      return;
    }

    // If type is checkbox (perks)
    if (type === 'checkbox') {
      const currentPerks = [...perks];
      let updatedPerks = [];

      // Check if the perk is already in perks array
      if (currentPerks.includes(name)) {
        updatedPerks = currentPerks.filter((perk) => perk !== name);
      } else {
        updatedPerks = [...currentPerks, name];
      }
      setFormData({ ...formData, perks: updatedPerks });
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      // update the state of formData
      for (let key in formData) {
        if (place.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: place[key],
          }));
        }
      }

      // update photos state separately
      setAddedPhotos([...place.photos]);

      setLoading(false);
    });
  }, [id]);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className="mt-4 text-2xl">{header}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </>
    );
  };

  // const savePlace = async (e) => {
  //   e.preventDefault();

  //   const formDataIsValid = isValidPlaceData();
  //   // console.log(isValidPlaceData());
  //   const placeData = { ...formData, addedPhotos };

  //   // Make API call only if formData is valid
  //   if (formDataIsValid) {
  //     if (id) {
  //       // update existing place
  //       const { data } = await axiosInstance.put('/places/update-place', {
  //         id,
  //         ...placeData,
  //       });
  //     } else {
  //       // new place
  //       const { data } = await axiosInstance.post(
  //         '/places/add-places',
  //         placeData,
  //       );
  //     }
  //     setRedirect(true);
  //   }
  // };

  const savePlace = async (e) => {
    e.preventDefault();

    const formDataIsValid = isValidPlaceData();
    const placeData = { ...formData, addedPhotos };
    console.log('Données envoyées au serveur:', placeData);

    // Vérifiez spécifiquement le champ 'type'
    if (!placeData.type) {
      console.error("Le champ 'type' est requis");
      // Affichez un message d'erreur à l'utilisateur
      return;
    }

    if (formDataIsValid) {
      try {
        if (id) {
          const { data } = await axiosInstance.put('/places/update-place', {
            id,
            ...placeData,
          });
        } else {
          const { data } = await axiosInstance.post(
            '/places/add-places',
            placeData,
          );
        }
        setRedirect(true);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde :', error);
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un code d'état
          // qui ne fait pas partie de la plage 2xx
          console.error("Données de l'erreur :", error.response.data);
          console.error("Statut de l'erreur :", error.response.status);
          console.error("Headers de l'erreur :", error.response.headers);
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.error('Erreur de requête :', error.request);
        } else {
          // Quelque chose s'est passé lors de la configuration de la requête qui a déclenché une erreur
          console.error('Erreur :', error.message);
        }
        // Gérez l'erreur ici (par exemple, affichez un message à l'utilisateur)
      }
    }
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          'Title',
          'title for your place. Should be short and catchy as in advertisement',
        )}
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleFormData}
          placeholder="title, for example: My lovely apt"
        />
        {preInput('Address', 'address to this place')}
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleFormData}
          placeholder="address"
        />
        {preInput('Photos', 'more = better')}
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
        {preInput('Description', 'discription of the place')}
        <textarea
          value={description}
          name="description"
          onChange={handleFormData}
        />
        {preInput('Perks', ' select all the perks of your place')}
        <Perks selected={perks} handleFormData={handleFormData} />
        {preInput('Extra info', 'house rules, etc ')}
        <textarea
          value={extraInfo}
          name="extraInfo"
          onChange={handleFormData}
        />
        {preInput('type', 'Select the type of your place')}
        <select name="type" value={type} onChange={handleFormData} required>
          <option value="">Select a type</option>
          <option value="Treehouse">Treehouse</option>
          <option value="Yurt">Yurt</option>
          <option value="Boat">Boat</option>
          <option value="Cave">Cave</option>
          <option value="Igloo">Igloo</option>
          <option value="Other">Other</option>
        </select>{' '}
        {preInput(
          'Number of guests & Price',
          // 'add check in and out times, remember to have some time window forcleaning the room between guests. '
          'Specify the maximum number of guests so that the client stays within the limit.',
        )}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="-mb-1 mt-2">Max no. of guests</h3>
            <input
              type="text"
              name="maxGuests"
              value={maxGuests}
              onChange={handleFormData}
              placeholder="1"
            />
          </div>
          <div>
            <h3 className="-mb-1 mt-2">Price per night</h3>
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleFormData}
              placeholder="1"
            />
          </div>
        </div>
        <button className="mx-auto my-4 flex rounded-full bg-primary px-20 py-3 text-xl font-semibold text-white">
          Save
        </button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
