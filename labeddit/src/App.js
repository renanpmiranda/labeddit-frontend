import React, { useEffect, useState } from "react";
import { GlobalContext } from "./contexts/GlobalContext";
import Router from "./routes/Router";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {

  const [ isAuth, setIsAuth ] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem("labeddit-token")

    if(token) {
      setIsAuth(true)
    }
  }, [])

  const context = {
    isAuth,
    setIsAuth
  }

  return (
    <GlobalContext.Provider value={context}>
      <ChakraProvider>       
          <Router/>        
      </ChakraProvider>
    </GlobalContext.Provider>
  );
}

export default App;
