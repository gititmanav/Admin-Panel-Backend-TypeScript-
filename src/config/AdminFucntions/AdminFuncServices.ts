import User from '../../database/userModel';
import Time from '../../database/timeModel';


class AdminFunctionServices {

    async createNewUser(
        profiledata: any,
        profileName: string
    ) {
        try {
            const newUser = await User.create({
                firstName: profiledata.firstName,
                lastName: profiledata.lastName,
                email: profiledata.email,
                password: profiledata.password,
                phoneNumber: profiledata.phoneNumber,
                roleId: profiledata.roleId,
                profileName: profileName,
            });
            const newTime = await Time.create({
                userId: newUser.userId,
                createdAt: newUser.createdAt,
            })
            return newUser;

        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Internal Server Error');
        }
    }

    async getEditUserDetails(userId: any) {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (error) {
            console.log('Error Getting user details: ', error);
            throw new Error('Internal Server Error');
        }
    }

    async updateUserDetails(userId: any, updatedProfile: any, updatedUserData: any,) {
        try {
            console.log('userId: ', userId);
            console.log('updatedProfile:::::::::::::::: ', updatedProfile);
            const updateUser = await User.update(
                { ...updatedUserData, profileName: updatedProfile },
                { where: { userId: userId }, returning: true });
            return updateUser;

        } catch (error) {
            console.log('Error Getting user details: ', error);
            throw new Error('Internal Server Error');
        }

    }

    async deleteUserFunc(userId: any) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User does not exist in the Database');
            }
            const associatedTimes = await Time.findAll({ where: { userId: userId } });
            if (associatedTimes.length > 0) {
                await Time.destroy({ where: { userId: userId } });
            }
            // Now, delete the user
            await user.destroy();

            console.log(`User with ID ${userId} has been deleted successfully.`);
        } catch (error) {
            console.log('Error deleting User: ', error);
            throw new Error('Internal Server Error');
        }
    }

    async workReportServices(userId: any) {
        try {
            const userData = await User.findByPk(userId);
            const timeData = await Time.findAll({ where: { userId: userId } });
            const timeValues = timeData.map((time) => {
                return time.dataValues.elapsedTime;
            });            
            return { userData, timeValues };
        } catch (error) {
            console.log('User Not Found: ', error);
            throw new Error('Internal Server Error');
        }
    }
}

export default new AdminFunctionServices();