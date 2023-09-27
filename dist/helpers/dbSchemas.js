"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDoc = void 0;
function CreateUserDoc(firstName, lastName, email, username, hashedPassword) {
    return {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "username": username,
        "password": hashedPassword,
        "workouts": {},
        "exercises": {
            "customExercises": {},
            "usersExercisesRecords": {}
        }
    };
}
exports.CreateUserDoc = CreateUserDoc;
