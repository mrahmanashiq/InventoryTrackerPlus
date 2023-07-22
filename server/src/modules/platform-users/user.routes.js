import { Router } from 'express';

import {
  isLoggedIn,
  login,
  logout,
  registration,
} from '../core/authorization/auth.controller.js';
import { isAuthorized } from '../core/authorization/auth.middlewares.js';
import {
  DeleteUser,
  EditUser,
  getUserList,
  getUserProfile,
  passwordChange,
} from './user.controller.js';

const router = Router();
router.post('/auth/login', login);
router.post(
	'/auth/registration',
	isAuthorized({
		allowedRole: [],
		allowedPermissions: [],
	}),
	registration
);

router.get('/auth/is-logged-in', isLoggedIn);
router.get('/auth/logout', logout);

router.get(
	'/user/profile',
	isAuthorized({
		allowedRole: ['admin', 'manager'],
		allowedPermissions: [],
	}),
	getUserProfile
);
router.get(
	'/users',
	isAuthorized({
		allowedRole: ['manager', 'admin'],
		allowedPermissions: [],
	}),
	getUserList
);
router.put(
	'/user/:id',
	isAuthorized({
		allowedRole: ['manager', 'admin'],
		allowedPermissions: [],
	}),
	EditUser
);
router.delete(
	'/user/:id',
	isAuthorized({
		allowedRole: ['manager', 'admin'],
		allowedPermissions: [],
	}),
	DeleteUser
);
router.put(
	'/user/change-password',
	isAuthorized({
		allowedRole: ['admin', 'manager'],
		allowedPermissions: [],
	}),
	passwordChange
);

export { router as userRouter };

