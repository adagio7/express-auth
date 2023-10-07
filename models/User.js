const UserFactory = (username, email, password) => {
  return {
    username,
    email,
    password,
  };
}

export default UserFactory;