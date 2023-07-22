import { userModel } from './user.model.js';

export const getUserList = async (req, res) => {
	try {
		const { page, limit } = req.query;

		const options = {
			page: parseInt(page, 10) || 1,
			limit: parseInt(limit, 10) || 30,
			sort: { createdAt: -1 },
		};

		const result = await userModel.aggregate([
			{
				$facet: {
					users: [
						{
							$skip: options.limit * (options.page - 1),
						},
						{
							$limit: options.limit,
						},
						{
							$sort: options.sort,
						},
					],
					totalCount: [
						{
							$count: 'count',
						},
					],
				},
			},
		]);

		const users = result[0].users;
		const totalCount = result[0].totalCount[0]?.count || 0;

		return res.status(200).json({
			message: 'Users fetched successfully',
			data: {
				users,
				totalCount,
			},
		});
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

export const EditUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, email, role } = req.body;

		const user = await userModel.findByIdAndUpdate(
			id,
			{
				name,
				email,
				role,
			},
			{ new: true }
		);

		return res.status(200).json({
			message: 'User updated successfully',
			data: user,
		});
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

export const DeleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		await userModel.findByIdAndDelete(id);

		return res.status(200).json({
			message: 'User deleted successfully',
		});
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

export const getUserProfile = async (req, res) => {
	try {
		const user = await userModel.findById(req.userData.userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

export const passwordChange = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;

		const user = await userModel.findById(req.userData.userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isPasswordMatch = await user.comparePassword(oldPassword);

		if (!isPasswordMatch) {
			return res
				.status(400)
				.json({ message: 'Old password is incorrect' });
		}

		user.password = newPassword;
		await user.save();

		return res
			.status(200)
			.json({ message: 'Password changed successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' });
	}
};
