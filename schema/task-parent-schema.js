const { model, Schema, connect } = require('mongoose');

const taskParentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    subtitle: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }]

}, { timestamps: true });

const taskSchema = new Schema({
    parent: {
        type: Schema.Types.ObjectId,
        ref: "TaskParent",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


connect(`mongodb+srv://joseph:O2EJZgjhkNmlQAqq@cluster0.lutbihw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
module.exports.taskParent = model("TaskParent", taskParentSchema);
module.exports.taskModel = model("Task", taskSchema);
