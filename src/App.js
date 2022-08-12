import React from "react";
import { Route } from "react-router-dom";
import Login from "./app/components/login";
import Main from "./app/components/main";
import NavBar from "./app/components/navBar";
import UserDescription from "./app/components/userDescription";
import Users from "./app/components/users";

function App() {
    return (
        <div>
            <NavBar />
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route exact path="/users" component={Users} />
            <Route
                path="/users/:userId"
                render={(props) => <UserDescription {...props} />}
            />
        </div>
    );
}

export default App;
