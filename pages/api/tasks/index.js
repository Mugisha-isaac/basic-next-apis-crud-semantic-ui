import Task from '../../../model/Task'
import { dbConnect, runMiddleware } from '../../../util'
import Morgan from 'morgan'


dbConnect();

export default async(req,res)=>{
    const {method,body} = req;
    const morgan = Morgan("dev");

    switch(method){
        case 'GET':
            try{
                const tasks = await Task.find();
                await runMiddleware(req,res,morgan);
                return res.status(200).json(tasks)
            }
            catch(err){
                return res.status(400).json({message: err.message})
            }


        case 'POST':
            try{
                const newTask = new Task(body);
                const savedTask = await newTask.save();
                await runMiddleware(req,res,morgan);   
                return res.status(201).json({success:true,message:'task created successfully', data: savedTask}); 
            }    
            catch(err){
                 return res.status(400).json({success:false, message: 'Failed to create new task', data: null})
            }    

        default:
            return res.status(500).json({success:false, message: 'server error'})   
    }
}
