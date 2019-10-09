import { USERS } from "../data/github.users.data";

const logins = USERS.map(u => `${u.login}/${u.id}`);

console.log(logins);