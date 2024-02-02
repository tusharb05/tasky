import React, { useState } from "react";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fname, lname, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.msg == undefined) {
          return localStorage.setItem("auth-token", data.token);
        }
        alert(data.msg);
      });
  };

  return (
    <>
      <div className="bg-[#dcdcdcd7] h-screen flex justify-center font-mono text-xl font-medium">
        <div className="sm:max-w-full md:w-4/5 lg:w-2/5 mt-20">
          <div className="w-full flex justify-center mb-10">
            <h1 className="text-4xl m-auto">Register yourself!</h1>
          </div>
          <form>
            <div className="flex flex-col mt-10">
              <label htmlFor="email">Enter first name</label>
              <input
                type="text"
                placeholder="John"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="mt-2 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col mt-10">
              <label htmlFor="email">Enter last name</label>
              <input
                type="text"
                placeholder="Doe"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="mt-2 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col mt-10">
              <label htmlFor="email">Enter your email</label>
              <input
                type="email"
                placeholder="jeff@banana.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col mt-10">
              <label htmlFor="password">Enter password</label>
              <input
                type="password"
                placeholder="jeff2021"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 rounded-md p-2"
              />

              <button
                type="submit"
                className="bg-[#3ac4e7] text-white w-2/5 m-auto mt-10 py-2 font-2xl hover:bg-[#2bb1d2] rounded-md"
                onClick={(e) => handleSubmit(e)}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
