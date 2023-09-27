"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDoc = void 0;
function createUserDoc(firstName, lastName, email, username, hashedPassword) {
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
exports.createUserDoc = createUserDoc;
