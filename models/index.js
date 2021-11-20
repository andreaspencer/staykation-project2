// Collect and export models data
const User = require('./User'); // Import User model
const Post = require('./Post'); // Import Post model

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = { User, Post };