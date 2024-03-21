import { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContextProvider";
import AllProjects from "./components/AllProjects";

function App() {
  const { loggedIn, setLoggedIn, userData, setUserData } =
    useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/getuser", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg !== "invalid token") {
          setLoggedIn(true);
          setUserData(data);
        }
        // console.log(data);
      });
  }, [loggedIn]);

  return (
    <div className="">
      <AllProjects />
    </div>
  );
}

export default App;
