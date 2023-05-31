import userRoutes from './user-routes.js';
import challengeRoutes from './challenge-routes.js';
import GroupRoutes from './group-routes.js'
import challengeLogRoutes from './challengeLog-routes.js';
import dashboardRoutes from './dashboard-routes.js';

export default (app) => {
    app.use('/user',userRoutes);
    app.use('/challenge',challengeRoutes);
    app.use('/group',GroupRoutes);
    app.use('/challengeLog',challengeLogRoutes);
    app.use('/dashboard',dashboardRoutes);
}