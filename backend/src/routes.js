import { Router } from 'express';

import teamRoutes_v1 from './modules/teams/teamRoutes_v1';
import userRoutes_v1 from './modules/users/userRoutes_v1';
import sportRoutes_v1 from './modules/sports/sportRoutes_v1';

import swagger from "./swagger/swagger";

const router = Router();

console.log("");

router.use('/api/v1/teams', teamRoutes_v1);
console.log("[initialized] teamsRoutes_v1     /api/v1/teams");

router.use('/api/v1/users', userRoutes_v1);
console.log("[initialized] userRoutes_v1      /api/v1/users");

router.use('/api/v1/sports', sportRoutes_v1);
console.log("[initialized] sportRoutes_v1     /api/v1/sports");

swagger(router, "v1");

export default router;
