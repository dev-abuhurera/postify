const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');
const upload = require('./config/multerconfig');


app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // to serve static files


app.get('/', (req, res) => {
  res.render('index'); // view engine is setted so render
});

app.get('/profile/upload', (req, res) => {
  res.render('profileupload'); // view engine is setted so render
});

app.post('/upload', upload.single('image'), (req, res) => {

    // view engine is setted so render
});



//Login route is protected route
app.get('/login', (req, res) => {
  // show login form (GET request)
  
  res.render('login');
});

// Create new post
app.post('/post', isLoggedIn, async (req, res) => {
    let { content } = req.body;

    let post = await postModel.create({
        content,
        user: req.user.userid
    });

    let user = await userModel.findOne({ _id: req.user.userid });
    user.posts.push(post._id);
    await user.save();

    res.redirect('/profile');
});

app.get('/like/:id',isLoggedIn, async (req, res) => {

    let post = await postModel.findOne({_id: req.params.id}).populate("user") // user feild in the post is an id and we will populate it to get the user details
    
    if(post.likes.indexOf(req.user.userid) === -1){ // if the person is not in the like array  
        post.likes.push(req.user.userid); // we have to push the id of the user who liked the post
    }
    else{ // if the person liked then again if he clicks on like then it will remove the like
        post.likes.splice(post.likes.indexOf(req.user.userid), 1); // if the user already liked the post then we have to remove the like
    }
    await post.save();

    res.redirect('/profile');

    
});

app.post('/update/:id',isLoggedIn, async (req, res) => {

    let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content: req.body.content}) 
    

    res.redirect('/profile');

    
});

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id.trim() });
    
    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render('edit', { post });  // pass post to template
});

app.get('/profile',isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate('posts') // we have the email on the basis of which we can find the user
     // now user also have the posts that he created
    // show profile form (GET request)
    res.render('profile', {user: user});

});

app.post('/login',async (req, res) => {

  let {email, password} = req.body;
  // Check that the account exists or not for that email the user is there or not
    
  let user = await userModel.findOne({ email: email});
  
  if(!user){
    return res.status(400).send("Something went wrong")
    };

    // now we have the user and we have to check the password is correct or not

    bcrypt.compare(password, user.password, (err, result) => {
        
        if(result){
            const token = jwt.sign({email: email, userid: user._id}, "shhhhh!");
            res.cookie('token', token);
            // password match
            res.status(200).redirect('/profile');
            
        }
        else{
            return res.status(400).send("Something went wrong")
        }
    });

});

app.get('/logout', (req, res) => {
  
  res.clearCookie('token', '');
  res.redirect('/login');
  
});

app.post('/register', async (req, res) => {
  // now at the register route we will get the data from the form and then create the account
  // -------------------------

  let {email, password, name, age, username} = req.body;
  //   Check already the account exists or not 
    
  let user = await userModel.findOne({ email: email});
  if(user){
    return res.status(400).send("User already exists")};
  
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            
            let user =  await userModel.create({
                username: username,
                name: name,
                age: age,
                email: email,
                password: hash
            });
        
        // cookie setup
        const token = jwt.sign({email: email, userid: user._id}, "shhhhh!");
        res.cookie('token', token);
        
        res.send("Registered successfully");

        });
    });
});

// protected route 
// It is a check that whether the user is logged in or not
function isLoggedIn(req, res, next){
    const token = req.cookies.token;

    if(!token) {
        return res.redirect('/login');
    }

    else{
        let data = jwt.verify(req.cookies.token, 'shhhhh!')
        req.user = data;
        next();
    }

}

// Now so far --->

/*
    1. we registered
    2. we logged in
    3. we logged out
    4. we created a middleware for the protected routes
*/

app.listen(3000);

