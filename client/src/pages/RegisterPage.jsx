// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { GoogleLogin } from '@react-oauth/google';
// import { Navigate } from 'react-router-dom';

// import { useAuth } from '../../hooks';

// const RegisterPage = () => {
//   useEffect(() => {
//     if (location.hash === '#register-title') {
//       const element = document.getElementById('register-title');
//       if (element) {
//         const yOffset = -100;
//         const y =
//           element.getBoundingClientRect().top + window.pageYOffset + yOffset;
//         window.scrollTo({ top: y, behavior: 'smooth' });
//       }
//     }
//   }, [location]);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [redirect, setRedirect] = useState(false);
//   const auth = useAuth();

//   const handleFormData = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const response = await auth.register(formData);
//     if (response.success) {
//       toast.success(response.message);
//       setRedirect(true);
//     } else {
//       toast.error(response.message);
//     }
//   };

//   const handleGoogleLogin = async (credential) => {
//     const response = await auth.googleLogin(credential);
//     if (response.success) {
//       toast.success(response.message);
//       setRedirect(true);
//     } else {
//       toast.error(response.message);
//     }
//   };

//   if (redirect) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div className="mt-4 flex grow items-center justify-around p-4 md:p-0  flex-grow mt-40">
//       <div className="mb-40">
//         <h1 id="register-title" className="mb-4 text-center text-4xl">
//           Inscription
//         </h1>
//         <form className="mx-auto max-w-md" onSubmit={handleFormSubmit}>
//           <input
//             name="name"
//             type="text"
//             placeholder="John Doe"
//             value={formData.name}
//             onChange={handleFormData}
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="your@email.com"
//             value={formData.email}
//             onChange={handleFormData}
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="password"
//             value={formData.password}
//             onChange={handleFormData}
//           />
//           <button className="primary my-2">Valider</button>
//         </form>

//         <div className="mb-4 flex w-full items-center gap-4">
//           <div className="h-0 w-1/2 border-[1px]"></div>
//           <p className="small -mt-1">or</p>
//           <div className="h-0 w-1/2 border-[1px]"></div>
//         </div>

//         {/* Google login button */}
//         <div className="flex h-[50px] justify-center">
//           <GoogleLogin
//             onSuccess={(credentialResponse) => {
//               handleGoogleLogin(credentialResponse.credential);
//             }}
//             onError={() => {
//               console.log('Login Failed');
//             }}
//             text="continue_with"
//             width="350"
//           />
//         </div>

//         <div className="py-2 text-center text-gray-500">
//           Already a member?
//           <Link className="text-black underline" to={'/login'}>
//             Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (window.location.hash === '#register-title') {
      const element = document.getElementById('register-title');
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, []);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Tous les champs sont requis.");
      setLoading(false);
      return;
    }

    const response = await auth.register(formData);
    setLoading(false);

    if (response?.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response?.message || "Erreur lors de l'inscription.");
    }
  };

  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response?.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response?.message || "Erreur lors de l'authentification Google.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 flex grow items-center justify-around p-4 md:p-0 flex-grow mt-40">
      <div className="mb-40">
        <h1 id="register-title" className="mb-4 text-center text-4xl">Inscription</h1>
        <form className="mx-auto max-w-md" onSubmit={handleFormSubmit}>
          <input
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleFormData}
            disabled={loading}
          />
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleFormData}
            disabled={loading}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleFormData}
            disabled={loading}
          />
          <button className="primary my-2" disabled={loading}>
            {loading ? 'Chargement...' : 'Valider'}
          </button>
        </form>

        <div className="mb-4 flex w-full items-center gap-4">
          <div className="h-0 w-1/2 border-[1px]"></div>
          <p className="small -mt-1">ou</p>
          <div className="h-0 w-1/2 border-[1px]"></div>
        </div>

        <div className="flex h-[50px] justify-center">
          <GoogleLogin
            onSuccess={({ credential }) => handleGoogleLogin(credential)}
            onError={() => toast.error('Échec de la connexion Google')}
            text="continue_with"
            width="350"
          />
        </div>

        <div className="py-2 text-center text-gray-500">
          Déjà inscrit ?{' '}
          <Link className="text-black underline" to="/login">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
