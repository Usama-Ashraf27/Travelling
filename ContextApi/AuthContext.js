// import React, { createContext, useState } from "react";

// // Create the context
// // const AuthContext = createContext();
// const AuthContext = React.createContext({
//   token:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTEwNjkxMzMsImV4cCI6MTcxMTE1NTUzM30.yRDuKHH0jWHaOX-urANmPFZDb6Fo7P3KLIndlKCE0y4", // Initial value for token
//   // Other context values if any
// });

// // Create the provider component
// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState("");

//   const storeToken = (newToken) => {
//     setToken(newToken);
//     console.log(newToken, "new");
//   };

//   return (
//     <AuthContext.Provider value={{ token, storeToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
