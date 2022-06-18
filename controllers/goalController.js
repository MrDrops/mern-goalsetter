// Controllers for routes

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = (req, res) => {
    res.status(200).json({message: 'get goals'});
}

// @desc Post goals
// @route POST /api/goals
// @access Private
const setGoal = (req, res) => {
    console.log(req.body);
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field');
    } else {
        console.log('body is being sent');
        res.status(200).json({message: 'goal set'});
    }
}

// @desc Put goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = (req, res) => {
    res.status(200).json({message: `update goal ${req.params.id}`});
}

// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = (req, res) => {
    res.status(200).json({message: `delete goal ${req.params.id}`});
}

module.exports= {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}