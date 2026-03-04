// Code that isn't being used in the other components but is saved here in case it needs to be moved to another component

// const getAllUsers = () => {
//   fetch(url + "/users") // URL for get/post/etc. request goes here
//     // Initial response to the fetch. If it goes good, it goes to the next .then. NOTE: You can leave this blank for GET requests.
//     .then(
//       // The response goes here
//       (resp) => {
//         // console.log("get all users - response:", resp.json());
//         return resp.json();
//       },
//     )
//     // Final result of the request
//     .then((data) => {
//       console.log("Get all users - data:", resp);
//     });
// };

// let copyOfTasksInAPI = [{ label: "", is_done: false, id: 999 }];

// Create users function in syntax other than async/await:
// const createUser = () => {
//   const options = {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       body: JSON.stringify({
//         name: "sean-hammond",
//         id: 0,
//       }),
//     },
//   };
//   fetch(url + "/users/sean-hammond", options)
//     .then((r) => r.json())
//     .then((d) => console.log("created user data:", d));
// };
