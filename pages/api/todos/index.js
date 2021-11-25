// Calling from an external Api These file is not needed anymore
import { tasks } from "../../../db.json"
export default function handler(req, res){
    res.status(200).json(tasks)
}