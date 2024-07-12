import express from 'express';
import enrollmentsRoutes from './routes/enrollments.routes.js';
import programsRoutes from './routes/programs.routes.js';
import studentsRoutes from './routes/students.routes.js';
import subjectsRoutes from './routes/subjects.routes.js';
import facultiesRoutes from './routes/faculties.routes.js';
import usersRoutes from './routes/users.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', facultiesRoutes);
app.use('/api', programsRoutes);
app.use('/api', studentsRoutes);
app.use('/api', subjectsRoutes);
app.use('/api', enrollmentsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api', enrollmentsRoutes);
app.use('/api', rolesRoutes);

app.listen(3000, () => {
  console.log('Server on port', 3000);
});
