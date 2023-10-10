import React from "react";
import { fakeAuthProvider } from "./auth";

export const AuthContext = React.createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = React.useState('Ricardo');

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;