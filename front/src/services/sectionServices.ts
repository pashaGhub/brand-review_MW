interface IOrder {
  _id: any;
  order: any;
}

export const getSections = async () => {
  try {
    const response = await fetch(`/api/section/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const createSection = async (props: any, token: string) => {
  try {
    const response = await fetch(`/api/section/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(props),
    });

    const data = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      message: data.message,
    };
  } catch (e) {
    return { message: e };
  }
};

export const editSection = async (props: any, token: string) => {
  try {
    const response = await fetch(`/api/section/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(props),
    });

    const data = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      message: data.message,
    };
  } catch (e) {
    return { message: e };
  }
};

export const deleteSection = async (id: number, token: string) => {
  try {
    const response = await fetch(`/api/section/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      message: data.message,
    };
  } catch (e) {
    return { message: e };
  }
};

export const changeSectionsOrder = async (
  order: Array<IOrder>,
  token: string
) => {
  try {
    const response = await fetch(`/api/section/edit-order`, {
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
      message: "Order successfully changed",
    };
  } catch (e) {
    return { message: e };
  }
};
