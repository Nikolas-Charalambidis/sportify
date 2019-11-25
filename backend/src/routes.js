import { Router } from 'express';

import teamRoutes_v1 from './modules/teams/teamRoutes_v1';
import userRoutes_v1 from './modules/users/userRoutes_v1';
import authRoutes_v1 from './modules/auth/authRoutes_v1';
import othersRoutes_v1 from './modules/others/otherRoutes_v1';
import teamMembershipRoutes_v1 from './modules/teamMemberships/teamMembershipRoutes_v1';
import matchRoutes_v1 from './modules/matches/matchRoutes_v1';
import eventRoutes_v1 from './modules/events/eventRoutes_v1';
import matchupRoutes_v1 from './modules/matchups/matchupRoutes_v1';

const router = Router();

router.use('/api/v1/auth', authRoutes_v1);
console.log("[initialized] authRoutes_v1               /api/v1/auth");

router.use('/api/v1/users', userRoutes_v1);
console.log("[initialized] userRoutes_v1               /api/v1/users");

router.use('/api/v1/teams', teamRoutes_v1);
console.log("[initialized] teamsRoutes_v1              /api/v1/teams");

router.use('/api/v1/others', othersRoutes_v1);
console.log("[initialized] othersRoutes_v1             /api/v1/others");

router.use('/api/v1/teamMembership', teamMembershipRoutes_v1);
console.log("[initialized] teamMembershipRoutes_v1     /api/v1/teamMembership");

router.use('/api/v1/matches', matchRoutes_v1);
console.log("[initialized] matchRoutes_v1              /api/v1/matches");

router.use('/api/v1/events', eventRoutes_v1);
console.log("[initialized] eventRoutes_v1              /api/v1/events");

router.use('/api/v1/matchups', matchupRoutes_v1);
console.log("[initialized] matchupRoutes_v1              /api/v1/matchup");

export default router;
