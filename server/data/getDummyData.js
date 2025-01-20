import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()


// run this code to get dummy comments, a new json file will be created in this foldder
// fetch('https://dummyjson.com/comments')
//   .then(response => response.json())
//   .then(data => {
//    const dummyComment= data.comments.map(d=>{
//         return {
//             name:d.user.fullName,
//             text:d.body,
//            rating:Math.floor(Math.random() * 5) + 1,
//            dummy:true
// }
//     })

//     fs.writeFile(path.join(__dirname,'dummyComments.json'),JSON.stringify(dummyComment,null,2),(err)=>{
//         console.log(err);
//      })
//   })
//   .catch(error => console.error('Error:', error))

/*
 */

// run this code to get dummy users, a new json file will be created in this foldder
fetch('https://dummyjson.com/users?limit=5&skip=35')
    .then(response => response.json())
    .then(data => {
        const dummyUsers = data.users.map(d => {
            return {
                name: d.firstName + ' ' + d.lastName,
                email: d.email,
                password: d.password,
                role:"seller"
            }
        })

        fs.writeFile(path.join(__dirname, 'dummyUsers.json'), JSON.stringify(dummyUsers, null, 2), (err) => {
            console.log(err);
        })
    })
    .catch(error => console.error('Error:', error))

