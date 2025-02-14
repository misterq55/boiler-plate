const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const port = 5000;
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/hello', (req, res) => {
    res.send("안녕하시오")
})

app.post('/api/users/register', async (req, res) => {
    const user = new User(req.body)
    const result = await user.save().then(() => {
        res.status(200).json({
            success: true
        })
    }).catch((err) => {
        res.json({ success: false, err })
    })
});

app.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "No User Found"
            });
        }

        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.json({ loginSuccess: false, message: "Wrong password" });
        }

        const token = await user.generateToken();
        res.cookie("x_auth", token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        
    } catch (err) {
        return res.status(400).send(err);
    }
});

app.get('/api/users/auth', auth, async (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
        return res.status(200).send({ success: true });
    } catch (err) {
        return res.status(400).send({ success: false, err });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));