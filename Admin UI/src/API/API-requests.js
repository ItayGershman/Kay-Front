import instance from './API-config';

class API {
  createUser(firstName, lastName, userPassword, userEmail) {
    return instance.post(`routes/createUser`, {
      firstName,
      lastName,
      userPassword,
      userEmail,
    });
  }
  login(userPassword, userEmail) {
    return instance.post(`routes/createUser`, {
      userPassword,
      userEmail,
    });
  }
}
export default API;
