import { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContextProvider";
import OwnerProjects from "./components/OwnerProjects";

function App() {
  const { loggedIn, setLoggedIn, userData, setUserData } =
    useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/getuser", {
      method: "GET",
      headers: {
        token: localStorage.getItem("auth-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg !== "invalid token") {
          setLoggedIn(true);
          setUserData(data);
          // console.log(data);
        }
      });
  }, []);

  return (
    <>
      <h1 className="text-slate-900">{loggedIn && "logged in"}</h1>
      <OwnerProjects />
    </>
  );
}

export default App;
