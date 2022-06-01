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
                return res.status(400).json({message:err.message})
            }

        default:
            console.log('Invalid method received')    
    }
}
