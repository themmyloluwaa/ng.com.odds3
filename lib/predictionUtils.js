const createPridiction = async data => {
  let createdPrediction;
  try {
    createdPrediction = await fetch(`${process.env.DEV_API}/prediction`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });

    createdPrediction =
      createdPrediction.status === 200 ? await createdPrediction.json() : {};

    return createPridiction;
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
        Accept: "application/json"
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
        Accept: "application/json"
      }
    });

    deletedPrediction =
      deletedPrediction.status === 204 ? await deletedPrediction.json() : {};

    return deletedPrediction;
  } catch (e) {
    console.log(e);
  }
};

export { createPridiction, updatePrediction, deletePrediction };