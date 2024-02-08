// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    userServices.findUserById(id)
        .then(result => {
            if (!result) {
                res.status(404).send("Resource not found.");
            } else {
                res.send(result);
            }
        })
        .catch(error => res.status(500).send(error.message));
});

app.get("/users", (req, res) => {
    const { name, job } = req.query;
    userServices.getUsers(name, job)
        .then(result => res.send({ users_list: result }))
        .catch(error => res.status(500).send(error.message));
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userServices.addUser(userToAdd)
        .then(addedUser => res.status(201).send(addedUser))
        .catch(error => res.status(500).send(error.message));
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    userServices.deleteUserById(id)
        .then(result => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send("Resource not found.");
            }
        })
        .catch(error => res.status(500).send(error.message));
})

app.listen(port, () => {
console.log(
    `Example app listening at http://localhost:${port}`
);
});