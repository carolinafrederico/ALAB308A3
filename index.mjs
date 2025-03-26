// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";

// function getUserData(id) {
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3
//   };
// }
//PART 1 

// Importing database functions. DO NOT MODIFY THIS LINE.
// import { central, db1, db2, db3, vault } from "./databases.mjs";

async function getUserData(id) {
  const dbs = { db1, db2, db3 };

  try {
    // Validate input
    if (typeof id !== "number" || id < 1 || id > 10) {
      throw new Error("Invalid Input -- ID must be a number between 1 and 10");
    }

    // Determine the correct database
    const dbName = await central(id);

    // Fetch user details in parallel
    const [basicInfo, personalInfo] = await Promise.all([
      dbs[dbName](id), // Fetch username, website, and company
      vault(id)        // Fetch name, email, address, and phone
    ]);

    // Construct the final user object
    return {
      id,
      name: personalInfo.name,
      username: basicInfo.username,
      email: personalInfo.email,
      address: personalInfo.address,
      phone: personalInfo.phone,
      website: basicInfo.website,
      company: basicInfo.company
    };

  } catch (error) {
    return Promise.reject(`Error fetching user data: ${error.message}`);
  }
}

// Test usage
getUserData(1)
  .then((data) => console.log("User Data:", data))
  .catch((error) => console.error(error));

export { getUserData };

