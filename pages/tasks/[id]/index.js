
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid } from 'semantic-ui-react';


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

    return(
         <Grid centered verticalAlign='middle' columns={1} style={{height:'80vh'}}>
             <Grid.Row>
                 <Grid.Column textAlign='center'> 
                  <Card centered>
                       <Card.Header>{task.data.title}</Card.Header>
                  </Card>
                 </Grid.Column>
             </Grid.Row>
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