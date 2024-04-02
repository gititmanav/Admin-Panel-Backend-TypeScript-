import time from "../../database/timeModel";
import User from "../../database/userModel";
const moment = require('moment'); 


class UserSideServices {

    async getAllUserServices() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Internal Server Error");
        }
    }

    async getAdminServices() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Internal Server Error");
        }
    }

    async saveTimeServices(elapsedTime: any, email: any) {
        try {
            const user = await User.findOne({ where: { email: email } });
            if (user) {
                const userId = user.userId;
                const todayDate = moment().format('DD-MM-YYYY');
                const updatedTime = await time.update({ elapsedTime: elapsedTime, Date: todayDate }, { where: { userId: userId } });
                return updatedTime;
            } else {
                console.log('User does not exist!');
                throw new Error("User does not exist!");
            }
        } catch (error) {
            console.log("User doesnot exist!", error);
            throw new Error("Internal Server Error");
        }
    }
}

export default new UserSideServices();