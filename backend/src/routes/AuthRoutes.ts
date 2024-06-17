import { Router } from "express";

import Auth from "../controller/AuthController";

const Login = Router();
 Login.post("/login", Auth.email);
 Login.post("/logout", Auth.logout);
 
 
 
 
    export default Login;



