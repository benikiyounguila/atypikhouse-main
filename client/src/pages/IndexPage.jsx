import { usePlaces } from '../../hooks';
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';

const IndexPage = () => {
  const allPlaces = usePlaces();
  const { places, loading } = allPlaces;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 justify-items-center px-4 py-32 md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10">
      {places.length > 0 ? (
        places.map((place) => <PlaceCard place={place} key={place._id} />)
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
          <div className="text-center p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold mb-4">Result not found!</h1>
            <p className="text-lg font-semibold mb-6">
              Sorry, we couldn&#39;t find the place you&#39;re looking for.
            </p>
            <button className="rounded-full bg-primary p-2 text-white hover:bg-primary-dark transition duration-300">
              <a href="/" className="flex items-center justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Go back
              </a>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
