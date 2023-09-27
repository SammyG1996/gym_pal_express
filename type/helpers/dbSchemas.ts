export function CreateUserDoc(firstName:string, lastName:string, email:string, username:string, hashedPassword:string){
    return {
        "firstName" : firstName, 
        "lastName" : lastName, 
        "email" : email, 
        "username" : username, 
        "password" : hashedPassword, 
        "workouts" : {}, 
        "exercises" : {
            "customExercises" : {},
            "usersExercisesRecords" : {}
        }
    }
}