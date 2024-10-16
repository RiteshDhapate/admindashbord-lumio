import { clerkClient } from "../services/clerkClient";

export async function deleteUser(req, res, next) {
    try {
        const {id}=req.body;
        if(!id){
            res.json({error:"please provide a unique id"});
            return;
        }
        const response = await clerkClient.users.deleteUser(id);
        console.log("user deleted successfully", response);
        res.json(response);
    } catch (error) {
        console.log("error deleting user", error);
        res.status(500).json(error);
    }
}