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
    <div className="h-screen w-full bg-slate-700">
      <AllProjects />
    </div>
  );
}

export default App;
