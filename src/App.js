import React from 'react';
import './App.css';
import {initialStateAuth, reducerAuth, AuthContext} from "./context/authContext.";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [state, dispatch] = React.useReducer(reducerAuth, initialStateAuth);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    const token = JSON.parse(localStorage.getItem('token') || null)

    if(user && token){
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])

  return (
      <AuthContext.Provider
          value={{
            state,
            dispatch
          }}
      >
        <Header />
        <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div>
      </AuthContext.Provider>
  );
}

export default App;
