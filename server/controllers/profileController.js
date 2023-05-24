const User = require('../models/User');

module.exports.getUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.status(200).json({
            user
        });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};
