import cookie from "js-cookie";

const token = cookie.getJSON("token");
const createPridiction = async data => {
  let createdPrediction;
  try {
    createdPrediction = await fetch(`${process.env.DEV_API}/prediction`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    createdPrediction =
      createdPrediction.status === 200 ? await createdPrediction.json() : {};

    return createdPrediction;
  } catch (e) {
    console.log(e);
  }
};

const updatePrediction = async data => {
  let updatedPrediction;
  const { id } = data;
  delete data.id;
  try {
    updatedPrediction = await fetch(`${process.env.DEV_API}/prediction/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    updatedPrediction =
      updatedPrediction.status === 200 ? await updatedPrediction.json() : {};

    return updatedPrediction;
  } catch (e) {
    console.log(e);
  }
};

const deletePrediction = async id => {
  let deletedPrediction;
  try {
    deletedPrediction = await fetch(`${process.env.DEV_API}/prediction/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    deletedPrediction = await deletedPrediction.json();

    return deletedPrediction;
  } catch (e) {
    console.log(e);
  }
};

const deleteAllPrediction = async () => {
  let deletedPredictionFeedback;

  try {
    deletedPredictionFeedback = await fetch(
      `${process.env.DEV_API}/prediction`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    deletedPredictionFeedback =
      deletedPredictionFeedback.status === 200
        ? await deletedPredictionFeedback.json()
        : {};
  } catch (e) {
    console.log(e);
  }
  return deletedPredictionFeedback;
};

export {
  createPridiction,
  updatePrediction,
  deletePrediction,
  deleteAllPrediction
};
