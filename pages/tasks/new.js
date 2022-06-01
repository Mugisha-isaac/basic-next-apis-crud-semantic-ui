import React, { useState } from 'react';
import { Button, Form, Grid, Loader } from 'semantic-ui-react'
import { useRouter } from 'next/router';

const CreateTask = () => {
    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setErrors] = useState({});

    const { push } = useRouter();

    const {title,description} = newTask;

    const handleSubmit = (e)=>{
       e.preventDefault();
    }

    const handleChange = (e)=>{

    }

    return (
        <Grid centered verticalAlign='middle' columns={3} style={{ height: "80vh" }}>
            <Grid.Row>
                <Grid.Column textAlign='center'>
                   <div>
                       <h1>Create Task</h1>
                       {isSubmit ? (<Loader active inline="centered" />):(
                           <Form onSubmit={handleSubmit}>
                                 <Form.Input label="Title" placeholder="Enter title" name="title"  onChange={handleChange} value={title} autofocus />
                                 <Form.TextArea label="description" placeholder="Enter description" name="description" onChange={handleChange} value={description} autofocus>

                                 </Form.TextArea>
                           </Form>
                       )}
                   </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default CreateTask;