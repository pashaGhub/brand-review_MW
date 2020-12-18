const baAPI = "http://localhost:5000/";

interface IOrder {
  _id: any;
  order: any;
}

export const getSections = async (token: string) => {
  try {
    const response = await fetch(`${baAPI}api/section/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { status: response.status, message: response.statusText };
    }

    const data = await response.json();
    return data;
  } catch (e) {
    return { message: e };
  }
};

export const deleteSection = async (id: number, token: string) => {
  console.log(typeof id);

  try {
    const response = await fetch(`${baAPI}api/section/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      ok: response.ok,
      status: response.status,
      message: response.statusText,
    };
  } catch (e) {
    return { message: e };
  }
};

export const changeSectionsOrder = async (
  order: Array<IOrder>,
  token: string
) => {
  console.log("ORDER", order);

  try {
    const response = await fetch(`${baAPI}api/section/edit-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    return {
      ok: response.ok,
      status: response.status,
      message: response.statusText,
    };
  } catch (e) {
    return { message: e };
  }
};
