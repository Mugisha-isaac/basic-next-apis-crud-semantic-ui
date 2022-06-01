
    import Task from "../../../model/Task";
    import { dbConnect,runMiddleware } from "../../../util";
    import  Morgan  from "morgan";

    dbConnect();

    export default async(req,res)=>{
        const {method,body,query:{id}} = req;
        const morgan = Morgan("dev");

        switch(method){
            case 'GET':
                try{
                    const task = await Task.findById(id);
                    if(!task) return res.status(404).json({success:false,message:'Not Found', data:null});
                    runMiddleware(req,res,morgan)
                    return res.status(200).json({success:true, message: 'task successfully fetched', data: task});
                }
                catch(err){
                    return res.status(400).json({message:err.message});
                }

            default:
                return res.status(500).json({message:'Server error'});
        }
    }