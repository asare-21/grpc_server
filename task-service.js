require('dotenv').config();
var grpc = require('@grpc/grpc-js');
console.log(__dirname)
var PROTO_PATH = './protos/protos/task.proto'; // gRPC
var protoLoader = require('@grpc/proto-loader'); // gRPC
const { taskParent, task, taskModel } = require('./schema/task-parent-schema');
var server = new grpc.Server(); // gRPC


// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var taskDescriptor = grpc.loadPackageDefinition(packageDefinition);
async function getTaskParentList(call, callback) {
    try {
        const parents = await taskParent.find({}).populate('tasks')
        if (parents) {
            console.log(parents[0].tasks)
            callback(null, {
                task_parents:
                    parents

            });
        }
        else {
            callback(null, { task_parents: [] })
        }
    } catch (e) {
        callback(e)
    }

}

async function addTask(call, callback) {
    try {
        console.log(call.request)
        const { title, parent } = call.request
        const taskM = new taskModel({
            parent: parent,
            title: title,
            isDone: false
        })
        // add task to parent task list
        await taskParent.findByIdAndUpdate(parent, { $push: { tasks: taskM._id } })
        await taskM.save()
        callback(null, { id: taskM._id, title: taskM.title, is_done: taskM.isDone, parent: taskM.parent })
    }
    catch (e) {
        console.log(e)
        callback(e)

    }
}
async function deleteTask(call, callback) {
    try {
        console.log("Delete task requested: ", call.request)
        const { id, parent } = call.request
        const res = await taskModel.findByIdAndDelete(id)
        await taskParent.findByIdAndUpdate(parent, { $pull: { tasks: id } })
        callback(null, { ...res })
    } catch (e) {
        console.error(e)
        callback(e)
    }
}


async function addTaskParent(call, callback) {
    try {
        const { tasks } = call.request
        const tp = new taskParent({
            title: call.request.title,
            description: call.request.description,
            subtitle: call.request.subtitle,
            completed: call.request.completed,
            date: call.request.date,
            time: call.request.time
        })
        tasks.forEach(t => {
            const taskM = new taskModel({
                parent: tp._id,
                title: t.title,
                isDone: t.is_done
            })

            tp.tasks.push(taskM._id)
            taskM.save()
        })
        const res = await tp.save()
        // save in redis

        callback(null, call);
    }
    catch (e) {
        console.log(e)
        callback(e)
    }
}

async function taskModelUpdate(call, callback) {
    try {
        // console.log(call.request)
        const { task, parent, user } = call.request

        const res = await taskModel.findByIdAndUpdate(task.id, {
            isDone: task.isDone
        }, {
            new: true
        })

        if (!res) {
            callback('Task not found')
            return
        }
        callback(null, res)
    }
    catch (e) {
        console.log(e)
        callback(e)
    }
}



function main() {
    server.addService(taskDescriptor.TaskService.service, {
        getTaskParentList: getTaskParentList,
        addTask: addTask,
        deleteTask: deleteTask,
        addTaskParent: addTaskParent,
        updateTaskModel: taskModelUpdate
    });

    server.bindAsync(`${process.env.PORT ?? "0.0.0.0:50051"}`, grpc.ServerCredentials.createInsecure(), () => {
        console.log('GRPC server is running');
    });
}

main();