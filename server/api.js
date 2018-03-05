/**
  DEPENDENCIES
**/

// route files
const testRoutes = require('./routes/test');
const subjectRoutes = require('./routes/subject');
const userRoutes = require('./routes/user');


module.exports = function(app, config){

  // i'd import list of routes from external file.
  // this file might get huge.
  app.use('/api/v2/test', testRoutes);

  app.use('/api/v2/subjects', subjectRoutes);

  app.use('/api/v2/users', userRoutes);

  //app.get('/questions', )


  app.get('/api/v2', (req,res)=>{
    res.send({
      message: 'New and Improved...'
    });
  });
}
