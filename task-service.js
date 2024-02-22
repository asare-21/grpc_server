var grpc = require('@grpc/grpc-js');
console.log(__dirname)
var PROTO_PATH = '../protos/protos/task.proto'; // gRPC
var protoLoader = require('@grpc/proto-loader'); // gRPC
const { taskParent, task } = require('./schema/task-parent-schema');
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
// The taskDescriptor object has the full package hierarchy
var routeguide = taskDescriptor.routeguide;

function getTaskParentList(call, callback) {
    try {
        taskParent.find({}, (err, data) => {
            if (err) {
                callback(err)
            }
            else {
                callback(null, { task_parents: data })
            }
        })
    } catch (e) {
        callback(e)
    }

}
function getTaskParentTasks() {

}
function streamTaskParents(call,callback){}
function addTask() { }
function deleteTask() { }
function updateTask() { }
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
            const taskM = new task({
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


function main() {
    server.addService(taskDescriptor.TaskService.service, {
        getTaskParentList: getTaskParentList,
        getTaskParentTasks: getTaskParentTasks,
        addTask: addTask,
        deleteTask: deleteTask,
        updateTask: updateTask,
        addTaskParent: addTaskParent,
        streamTaskParents: streamTaskParents
    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();