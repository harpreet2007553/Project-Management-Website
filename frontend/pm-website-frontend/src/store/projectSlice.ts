import { createSlice } from "@reduxjs/toolkit";

interface task{
    task_id : string
    text : string
    assignedTo : {user_id : string, username : string}[]
    due_date : Date
    isCompleted : boolean
    topic_id : string
}

interface topic{
    topic_id : string
    topic_name : string
    description : string
    project_id : string
}

interface Project {
    // Define your project properties here, for example:
    project_id: string
    name: string
    // Add other fields as needed
}

interface ProjectState {
    // owner : string
    projects: Project[];
}

interface topicState{
    topics : topic[]
}

const Project_initialState: ProjectState = {
    projects: []
};

export const projectSlice = createSlice({
    name: "project",
    initialState : Project_initialState,
    reducers: {
        setProjects: (state, action: { payload: { project: Project } }) => {
            state.projects.push(action.payload.project);
        },
        removeProject : (state, action : { payload : { id : string }}) => {
            state.projects.forEach((project : Project, index : number) => {
                if (project.project_id === action.payload.id) {
                    state.projects.splice(index, 1);
                }
            })
        },
        updateProject : (state, action : { payload : {project : Project}}) => {
            state.projects.forEach((project : Project, index : number) => {
                if( project.project_id == action.payload.project.project_id){
                    state.projects[index] = action.payload.project;
                }
            })
        }
    }
});

export const topicSlice = createSlice({
    name : "topics",
    initialState : { topics : [] } as topicState,
    reducers : {
        setTopics : (state, action : { payload : { topic : topic }}) => {
            state.topics.push(action.payload.topic);
        },
        removeTopic : (state, action : { payload : { id : string }}) => {
            state.topics.forEach((topic : topic, index : number) => {
                if (topic.topic_id === action.payload.id) {
                    state.topics.splice(index, 1);
                }
            })
        },
        updateTopic : (state, action : { payload : {topic : topic}}) => {
            state.topics.forEach((topic : topic, index : number) => {
                if( topic.topic_id == action.payload.topic.topic_id){
                    state.topics[index] = action.payload.topic;
                }
            })
        }
    }
})

export const taskSlice = createSlice({
    name : "tasks",
    initialState : { tasks : [] } as { tasks : task[] },
    reducers : {
        setTasks : (state, action : { payload : { task : task }}) => {
            state.tasks.push(action.payload.task);
        },
        removeTask : (state, action : { payload : { id : string }}) => {
            state.tasks.forEach((task : task, index : number) => {
                if (task.task_id === action.payload.id) {
                    state.tasks.splice(index, 1);
                }
            })
        },
        updateTask : (state, action : { payload : {task : task}}) => {
            state.tasks.forEach((task : task, index : number) => {
                if( task.task_id == action.payload.task.task_id){
                    state.tasks[index] = action.payload.task;
                }
            })
        },
        addMember : (state, action : { payload : { task_id : string, user : {user_id : string, username : string}}}) => {
            state.tasks.forEach((task : task, index : number) => {
                if (task.task_id == action.payload.task_id){
                    state.tasks[index].assignedTo.push(action.payload.user);
                }
            })
        }
    }
})

export const { setProjects, removeProject, updateProject } = projectSlice.actions;
export const { setTopics, removeTopic, updateTopic } = topicSlice.actions;
export const { setTasks, removeTask, updateTask, addMember } = taskSlice.actions;
