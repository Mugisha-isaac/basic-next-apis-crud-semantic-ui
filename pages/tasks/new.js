import React, { useState } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const CreateTask = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const { push } = useRouter();

  const { title, description } = newTask;

  const validate = ()=>{
      let errors = {};
      if(!title) errors.title = "Title is required"
      if(!description) error.description = "Description is required"
      return errors;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    let errors = validate()
    if(Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    await createTask();
    await push("/")
  };

  const handleChange = (e) => {
      const {name,value} = e.target;
      setNewTask({...newTask,[name]:value});
  };

  const createTask = async()=>{
      try{
          await fetch("http://localhost:3000/api/tasks",{
              method:"POST",
              headers:{
                  "content-Type":"application/json"
              },
              body:JSON.stringify(newTask)   
          })
      }

      catch(err){
          throw new Error("Error found while creating new task ", err);
      }
  }

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div>
            <h1>Create Task</h1>
            {isSubmit ? (
              <Loader active inline="centered" />
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  label="Title"
                  placeholder="Enter title"
                  name="title"
                  onChange={handleChange}
                  value={title}
                  autofocus
                />
                <Form.TextArea
                  label="description"
                  placeholder="Enter description"
                  name="description"
                  onChange={handleChange}
                  value={description}
                  autofocus
                />

                <Button type="submit" primary> Submit</Button>
              </Form>
            )}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateTask;
