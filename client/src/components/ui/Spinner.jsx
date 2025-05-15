// /client/src/components/ui/Spinner.jsx
import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;












// import React from 'react';
// import { TailSpin } from 'react-loader-spinner';

// const Spinner = () => {
//   return (
//     <div className="absolute inset-1/2 flex flex-col items-center justify-center">
//       <TailSpin
//         height={100}
//         width={200}
//         color="#f5385d"
//         radius="1"
//         visible={true}
//       />
//     </div>
//   );
// };

// export default Spinner;
