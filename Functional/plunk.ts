import { pluck } from "ramda";
import { USERS } from "../data/github.users.data";

const logins = pluck('login')(USERS);

console.log(logins);