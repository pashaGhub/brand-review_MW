export const uploadImgs = async (files: any, token: string) => {
  try {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file, file.name);
    }

    const response = await fetch(`/api/uploads/img`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

export const getUploadImgs = async (token: string) => {
  try {
    const response = await fetch(`/api/uploads/img`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        ok: response.ok,
        status: response.status,
        message: response.statusText,
      };
    }

    const data = await response.json();
    return data;
  } catch (e) {
    return { message: e };
  }
};

export const uploadSingleVideo = async (file: any, token: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file[0]);

    const response = await fetch(`/api/uploads/video`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

export const getUploadVideos = async (token: string) => {
  try {
    const response = await fetch(`/api/uploads/videos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        ok: response.ok,
        status: response.status,
        message: response.statusText,
      };
    }

    const data = await response.json();
    return data;
  } catch (e) {
    return { message: e };
  }
};

export const deleteFile = async (id: string, token: string) => {
  try {
    const response = await fetch(`/api/uploads/${id}`, {
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
