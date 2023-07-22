import { hash } from 'bcrypt';
import { config } from '../../config/lib/config.js';
import { userModel } from '../platform-users/user.model.js';

export const seedAdmin = async () => {
  const adminData = {
    name: 'Admin',
    email: config.adminEmail,
    password: config.adminPassword,
    role: 'manager',
  };

  try {
    // check if admin already exists
    const admin = await userModel.findOne({ email: adminData.email });

    if (admin) return console.log('Admin already exists');

    const hashedPassword = await hash(adminData.password, 12);

    // create admin
    await userModel.create({
      ...adminData,
      password: hashedPassword,
    });

    return console.log('Admin created successfully');
  } catch (error) {
    return console.log(error);
  }
};
