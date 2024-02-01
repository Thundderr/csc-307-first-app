// backend.js
import express from "express";

const app = express();
const port = 8000;

const users = {
    users_list: [
    {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
    },
    {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
    },
    {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
    },
    {
        id: "yat9993",
        name: "Dee",
        job: "Aspring actress"
    },
    {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
    }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
    (user) => user["name"] === name
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.use(express.json());

app.get("/", (req, res) => {
res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
    res.status(404).send("Resource not found.");
    } else {
    res.send(result);
    }
});

app.get("/users", (req, res) => {
    let result = users["users_list"];
    const { name, job } = req.query;

    if (name != undefined && job != undefined) {
        result = result.filter(user => user.name === name && user.job === job);
    } else if (name != undefined) {
        result = result.filter(user => user.name === name);
    }
    res.send({ users_list: result });
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const index = users["users_list"].findIndex(user => user.id === id);
    if (index === -1) {
        res.status(404).send("Resource not found.");
    } else {
        users["users_list"].splice(index, 1);
        res.status(204).send();
    }
})

app.listen(port, () => {
console.log(
    `Example app listening at http://localhost:${port}`
);
});