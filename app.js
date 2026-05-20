import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const task = []
const status = ["not_done", "done", "in_process"]

const createTask = (id, description) => {
    const newTask = {
        id: id,
        description: description,
        status: status[0],
        createAt: new Date(),
        updateAt: ""
    }
    task.push(newTask)
}


const updateTask = (id, newDescription) => {
    const targetId = Number(id)
    if (!id) {
        return "Task not exist"
    }
    else {
        const update = task.find(item => item.id === targetId);
        if (update) {
            update.description = newDescription
            update.updateAt = new Date()
            console.log("Update Success: ", update)
        }

    }
}

const listTask = (targetStatus) => {
    if (targetStatus === "not_done" || targetStatus === "done" || targetStatus === "in_process") {
        console.log(task.find(item => item.status === targetStatus) ?? "Not Found any List")
    }
    else
        console.log("Wrong Status")
}

const markStatus = (id, mark) => {
    const targetId = Number(id)
    const taskTarget = task.find(item => item.id === targetId)
    if (taskTarget)
        task.status = mark
}


async function main() {
    const rl = readline.createInterface({ input, output });

    //const [, , command, arg1, arg2] = process.argv

    let id = 1

    console.log("=== Start Program ( 'exit' : end program) ===");
    while (true) {
        const userInput = await rl.question('\nInput Command: ');

        if (userInput.trim() === 'exit') {
            console.log("Bye!");
            break;
        }

        const tokens = userInput.trim().split(' ');
        const command = tokens[0];
        const arg1 = tokens[1];
        const arg2 = tokens[2];

        switch (command) {
            case 'add':
                {
                    createTask(id++, arg1)
                    console.log(">>All task", task)
                    break
                }
            case 'update': {
                updateTask(arg1, arg2)
                break
            }
            case "mark": {
                markStatus(arg1, arg2)  // id mark
                break
            }
            case "list": {
                listTask(arg1) //status
                break
            }
            default: {
                console.log("Error Command");
            }
        }
    }
}

main()