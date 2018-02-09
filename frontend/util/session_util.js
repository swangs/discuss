export const register = (user) => {
  return $.ajax({
    url: "api/users",
    method: "POST",
    data: { user }
  });
};

export const updateUser = (formData) => {
  return $.ajax({
    url: "api/users/edit",
    method: "PATCH",
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  });
};

export const login = (user) => {
  return $.ajax({
    url: "api/session",
    method: "POST",
    data: { user }
  });
};


export const logout = () => {
  return $.ajax({
    url: "api/session",
    method: "DELETE"
  });
};
