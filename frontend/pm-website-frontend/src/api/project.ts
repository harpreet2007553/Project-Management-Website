import { setProjects } from "@/store/projectSlice";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux"

type Inputs = {
    title : string
    description : string
    owner : string
}

export const createProject = async (data : Inputs) => {
    const res = await axios.post("http://localhost:8000/api/v1/projects/create-project")
    const dispatch = useDispatch()

    const projectData = {
        name : res.data.title,
        description : res.data.description,
        project_id : res.data._id
    }
    dispatch(setProjects({ project: projectData }))
    return res.data
}