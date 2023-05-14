import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '../../../config/lib/config.js';
import { cookieOptions } from '../utils/cookie.js';
import { userModel } from '../../platform-users/user.model.js';
import { RegistrationSchema } from './auth.dto.js';

export const registration = async (req, res) => {
  try {
    const isValidData = await RegistrationSchema.safeParseAsync(req.body);

    if (!isValidData.success)
      return res.status(400).json({
        success: false,
        message: isValidData.error.issues[0].message,
      });

    const { email, password, permissions, confirmPassword, name, role } = isValidData.data;

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        message: 'Passwords do not match' 
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists' 
      });
    }

    const hashedPassword = await hash(password, 12);

    const user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
      permissions: permissions?.length ? permissions : [],
    });

    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    return res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      message: 'Something went wrong' 
    });
  }
};