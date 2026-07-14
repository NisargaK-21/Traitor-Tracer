import User from "../models/User.js";

class AuthService {
  async findUser(firebaseUid) {
    return User.findOne({ firebaseUid });
  }

  async createUser(userData) {
    return User.create(userData);
  }

  async updateLogin(userId, ipAddress, device) {
    return User.findByIdAndUpdate(
      userId,
      {
        lastLogin: new Date(),
        $inc: {
          "metadata.loginCount": 1,
        },
        $set: {
          "metadata.lastIPAddress": ipAddress,
          "metadata.lastDevice": device,
        },
      },
      {
        new: true,
      }
    );
  }
}

export default new AuthService();