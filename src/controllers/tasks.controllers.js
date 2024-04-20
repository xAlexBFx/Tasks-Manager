import Task from '../models/tasks.model.js'

export const getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({user: req.user.id}).populate('user');
        res.json(tasks)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            'message': 'Internal Server Error',
            'errorStatus': true
        });
    };
}

export const getOneTask = async(req, res) => {
    try {
        const foundTask = await Task.findById(req.params.id).populate('user');
        if(!foundTask) return res.status(404).json({
            'message': 'Task not found!',
            'errorStatus': true
        });
        res.json(foundTask);
    }catch (err) {
        console.log(err)
        res.status(404).json({
            'message': 'Internal Server Error',
            'errorStatus': true
        });
    };
}

export const createTask = async(req, res) => {
    if(req.body.title && req.body.description) {
        try {
            const {title, description, date} = req.body;
            const newTask = new Task({
                    title, 
                    description,
                    date,
                    user: req.user.id
                });
                const savedTask = await newTask.save();
                res.json({
                    'message': 'Task Creates successfully!',
                    'task': savedTask,
                    'errorStatus': false
                });
        }catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(401).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    };
}

export const updateTask = async(req, res) => {
    if(req.body && req.params.id){
        try {
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!updatedTask) return res.status(404).json({
                'message': 'Task not found!',
                'errorStatus': true
            });
            res.json(updatedTask);
        }catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(401).json({
            'message': 'You give data to replace!',
            'errorStatus': true
        });
    };

}

export const deleteTask = async(req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask) return res.status(404).json({
            'message': 'Task not found!',
            'errorStatus': true
        });
        res.status(204).json();
    }catch (err) {
        console.log(err);
        res.status(404).json({
            'message': 'Internal Server Error',
            'errorStatus': true
        });
    };
}