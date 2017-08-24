/**
  DEPENDENCIES
**/

// route files
const testRoutes = require('./routes/test');
const subjectRoutes = require('./routes/subject');


module.exports = function(app, config){

  // i'd import list of routes from external file.
  // this file might get huge.
  app.use('/api/test', testRoutes);

  app.use('/api/subjects', subjectRoutes);

  //app.get('/questions', )


  app.get('/api/', (req,res)=>{
    res.send('Working.');
  });
}
