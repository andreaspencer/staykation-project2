const router = require('express').Router();
const sequelize = require('../config/connection')
const {
    User,
    Post,
    Comment
} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_url', 'created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username'],
        }]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({
            plain: true
        }));
        res.render('homepage.handlebars', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'post_url', 'created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({
                message: 'No post with that id'
            });
            return;
        }
        
        const post = dbPostData.get({
            plain: true
        });

        res.render('single-post.handlebars', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.err(err);
        res.status(500).json(err);
    })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login.handlebars');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup.handlebars');
})

router.get('*', (req, res) => {
    res.status(404).send("Not a valid route");
})

module.exports = router;