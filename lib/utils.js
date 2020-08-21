import cookie from "js-cookie";
import NextCookie from "next-cookies";

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

const checkAccess = async (ctx, url = "/admin") => {
  const { token } = NextCookie(ctx);
  if (token && url !== "/admin/home") {
    ctx.res.writeHead(302, { Location: "/admin/home" });
    ctx.res.end();
  }
  if (!token && url !== "/admin") {
    ctx.res.writeHead(301, { Location: "/admin" });
    ctx.res.end();
  }
};
export { handleLogin, handleLogout, handleLeagueFetch, checkAccess };
