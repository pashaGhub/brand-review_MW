export const checkAuth = async (token: string) => {
  try {
    const response = await fetch(`/api/auth`, {
      method: "GET",
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

export const loginUser = async (props: any, token: string) => {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(props),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: response.ok,
        status: response.status,
        message: data.message,
      };
    }
    return data;
  } catch (e) {
    return { message: e };
  }
};
