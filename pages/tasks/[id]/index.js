
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Confirm, Grid } from 'semantic-ui-react';


const Task = ({task,error})=>{

    console.log(task)

    const [confirm,setConfirm] = useState(false);
    const [isDeleting,setISDeleting] = useState(false);
    const {push,query} = useRouter();

    const deleteTask = async()=>{
      const {id} = query;

      try{
          await fetch(`http://localhost:3000/api/tasks/${id}`,{
              method:'DELETE',  
          });
      }
      catch(err){
          throw new Error('Error found while deleting a task ', err);
      }
    }


    const open = ()=>setConfirm(true);
    const close = ()=>setConfirm(false);

    const handleDelete = async()=>{
          setISDeleting(true);
          await deleteTask();
         await push("/")
          close()
    }

    if(error && error.statusCode){
         return <Error statusCode = {error.statusCode} title={error.statusText} />
    }

    return(
         <Grid centered verticalAlign='middle' columns={1} style={{height:'80vh'}}>
             <Grid.Row>
                 <Grid.Column textAlign='center'> 
                  <Card centered>
                      <Card.Content>
                       <Card.Header>{task.data.title}</Card.Header>
                       <Card.Description>
                           {task.data.description}
                       </Card.Description>
                       </Card.Content>  
                       <Card.Content extra>
                         <Button color='red' onClick={open} loading={isDeleting}>Delete</Button>
                       </Card.Content>
                  </Card>
                 </Grid.Column>
             </Grid.Row>
             <Confirm 
              content="Are you sure to delete this task ?"
              header="Please confirm"
              open={confirm}
              onConfirm ={handleDelete}
              onCancel = {close}
             />
         </Grid>
    )
}

export async function getServerSideProps({query:{id}}){
    const  res = await fetch(`http://localhost:3000/api/tasks/${id}`);
    if(res.status === 200){
       const task = await res.json();
       return {
           props:{
               task,
           }
       }
    }

    return{
        props:{
            error:{
               statusCode:res.status,
               statusText: 'Invalid ID'
            }
        }
    }
}

export default Task;