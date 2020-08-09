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

const handleLeagueFetch = async () => {
  let dataToReturn;

  const leagueItem = localStorage.getItem("leagueItem");

  if (!!leagueItem) {
    dataToReturn = JSON.parse(leagueItem);

    return dataToReturn;
  } else {
    console.log("called");
    try {
      dataToReturn = await fetch(
        "https://api-football-v1.p.rapidapi.com/v2/leagues",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": process.env.RAPIDAPIHOST,
            "x-rapidapi-key": process.env.RAPIDAPIKEY
          }
        }
      );
      dataToReturn =
        dataToReturn.status === 200 ? await dataToReturn.json() : [];

      localStorage.setItem("leagueItem", JSON.stringify(dataToReturn));
      return dataToReturn;
    } catch (e) {
      console.log(e);
    }
  }
};

export { handleLogin, handleLogout, handleLeagueFetch };
