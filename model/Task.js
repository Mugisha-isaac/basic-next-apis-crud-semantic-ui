import {Schema,model,models} from 'mongoose'

const TaskSchema = new Schema({
    title:{
        type:String,
        required:[true,"title is required"],
        unique:true,
        trim:true,
        maxlength:[40,'title can exceed 40 characters']
    },
    description:{
        type:String,
        required:[true,"description is required"],
        trim:true,
        maxlength:[200,'description can exceed 200 characters']
    }
}, {timestamps:true, versionKey:false})

export default models.Task || model("Task",TaskSchema)