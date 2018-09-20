const User = require('../models/user');

module.exports = api => {
  const isLogged = ({session}, res, next)=>{
     if(!session.user){
         res.json({
           error : "You are not logged in",
           status:  403
       })
     }else
       next();
  }

  const isNotLogged = ({ session }, res, next)=>{
     if(session.user){
         res.json({
           error : "You are logged in",
           status:  403
       })
     }else
       next();
  }

  api.post('/login', isNotLogged, async (req, res)=>{
      try {
        const {session, body} = req;
        const {username, password} = body;
        const user = await User.login(username, password);
        session.user = {
            _id : user._id,
            user: user.username
        }
        session.save(()=>{
            res.json({
                status: 200,
                user : session.user
            })
        });
      } catch (error) {
        res.json({
            status: 403,
            error: error.message
        });
      }
  });


api.post('/logout', isLogged, (req, res) => {
	req.session.destroy();
	res.json({
     status : 200,
     message : 'Bye bye!'
  })
})


api.post('/signup', async (req, res)=>{
  console.log(req.body.username);
    try {
      const {session, body}  = req;
      const {username, password} = body;
      console.log(username);
      console.log(password);
      const user = await User.signup(username, password);
      res.json({
          status : 201,
          username : username,
          masseage : "Created!"
      })
    }catch (error) {
      res.json({
          status: 403,
          error  : error.message
      })
    }
  })
}
