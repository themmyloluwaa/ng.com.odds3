import cookie from "js-cookie";

const token = cookie.getJSON("token");
const createResult = async data => {
  let createdResult;
  try {
    createdResult = await fetch(`${process.env.API_URL}/bulk/result`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    createdResult =
      createdResult.status === 200 ? await createdResult.json() : [];

    return createdResult;
  } catch (e) {
    console.log(e);
  }
};

const updateResult = async data => {
  let updatedResult;
  const { id } = data;
  delete data.id;
  try {
    updatedResult = await fetch(`${process.env.API_URL}/result/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    updatedResult =
      updatedResult.status === 200 ? await updatedResult.json() : {};

    return updatedResult;
  } catch (e) {
    console.log(e);
  }
};

const deleteResult = async id => {
  let deletedResult;
  try {
    deletedResult = await fetch(`${process.env.API_URL}/result/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    deletedResult = await deletedResult.json();

    return deletedResult;
  } catch (e) {
    console.log(e);
  }
};

const deleteAllResult = async () => {
  let deletedResultFeedback;

  try {
    deletedResultFeedback = await fetch(`${process.env.API_URL}/result`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    deletedResultFeedback = await deletedResultFeedback.json();
  } catch (e) {
    console.log(e);
  }
  return deletedResultFeedback;
};

export { createResult, updateResult, deleteResult, deleteAllResult };
