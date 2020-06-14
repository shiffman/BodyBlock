import React, { createContext, useState } from "react";

// create a context for sharing state 
export const MenuContext = createContext(true);

// create a provider with shares the state and state setting functions 
// with the child components
export const MenuProvider = ({ children }) => {
  // set an initial state
  const initialState = {
    withBodyPix: true,
    withFaceApi: true,
  };

  // menu is now our state object
  // setMenu is what allows us to update the menu object
  const [menu, setMenu] = useState(initialState);

  // pass these functions and objects to the children components
  return (
    <MenuContext.Provider
      value={{
        setMenu,
        menu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
