import {app}  from './api/app.js';

const port = 9000;

app.listen(9000, '0.0.0.0', () =>  console.log(`Server listening at ${port}`));