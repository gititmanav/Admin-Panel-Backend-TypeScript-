import { Request, Response, NextFunction } from 'express';
import UserSideServices from './UserSideServices';

class UserSideController {

    async getAllUserController(req: Request, res: Response) {
        try {
            const getUsers = await UserSideServices.getAllUserServices();
            res.json(getUsers);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAdminController(req: Request, res: Response) {
        try {
            const getUsers = await UserSideServices.getAdminServices();
            res.json(getUsers);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async SaveTimeController(req: Request, res: Response) {
        try {
            const email = req.body.email;           
            const elapsedTime = req.body.time;
            console.log('elapsedTime: ', elapsedTime);
            const saveTime = await UserSideServices.saveTimeServices(elapsedTime, email);
            res.json({message: 'User time saved Successfully!', saveTime});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default new UserSideController();