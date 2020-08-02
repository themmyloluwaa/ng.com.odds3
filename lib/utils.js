import cookie from "js-cookie";
const handleLogin = async data => {
  let auth;

  try {
    auth = await fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.API_URL
          : process.env.DEV_API
      }/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    auth = auth.status === 200 ? await auth.json() : [];
  } catch (e) {
    console.log(e);
  }

  return auth;
};

const handleLogout = () => {
  const value = cookie.remove("token");

  return true;
};

export { handleLogin, handleLogout };
