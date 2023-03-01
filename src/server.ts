import adosavokController from "./adosavok/adosavok.controller";
import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import UserController from "./user/user.controller";
import utcakController from "./utcak/utcak.controller";

new App([new AuthenticationController(), new UserController(), new utcakController(), new adosavokController()]);
