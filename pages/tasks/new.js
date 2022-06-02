import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const CreateTask = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const { push, query } = useRouter();

  const { title, description } = newTask;

  const getTask = async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
    const data = await response.json();
    setNewTask({ title: data.data.title, description: data.data.description })
  }

  const validate = () => {
    let errors = {};
    if (!title) errors.title = "Title is required"
    if (!description) errors.description = "Description is required"
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate()
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if (query.id) {
      await updateTask()
    }
    else {
      await createTask();
    }

    await push("/")
  };

  const updateTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: "PUT",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      })
    }

    catch (err) {
      throw new Error("Error found while creating new task ", err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const createTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      })
    }

    catch (err) {
      throw new Error("Error found while creating new task ", err);
    }
  }


  useEffect(() => {
    if (query.id) getTask();
  }, [query.id])

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
            <h1>{query.id ? "Update Task" : "Create Task"}</h1>
            {isSubmit ? (
              <Loader active inline="centered" />
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  error={errors.title ? { content: "please enter a title" } : null}
                  label="Title"
                  placeholder="Enter title"
                  name="title"
                  onChange={handleChange}
                  value={title}
                  autofocus
                />
                <Form.TextArea
                  error={errors.description ? { content: "please enter a description" } : null}
                  label="description"
                  placeholder="Enter description"
                  name="description"
                  onChange={handleChange}
                  value={description}
                  autofocus
                />

                <Button type="submit" primary>
                  {query.id ? "Update" : "Submit"}
                </Button>
              </Form>
            )}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateTask;
