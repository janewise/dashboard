
// // export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import { ref, onValue, getDatabase } from 'firebase/database'; // Adjust imports according to your Firebase setup
// import { listenToUserData } from '../firebaseFunctions'; // Import necessary functions
// import './Dashboard.css'; // Adjust the path as needed

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [totalTokens, setTotalTokens] = useState(0); // State to store tokens

//   useEffect(() => {
//     const unsubscribe = listenToUserData((data) => {
//       setUserData(data); // Update state with the received data
//     });

//     // Cleanup function to unsubscribe if the component unmounts
//     return () => {
//       if (typeof unsubscribe === 'function') {
//         unsubscribe();
//       }
//     };
//   }, []);

//   const totalUsers = userData ? Object.keys(userData).length : 0;

//   // Calculate total profit per hour and divide by 18000
//   const totalProfitPerHour = userData
//     ? Math.floor(
//         Object.keys(userData)
//           .filter((userId) => (userData[userId].inviteCount || 0) >= 3)
//           .reduce((total, userId) => {
//             return total + (userData[userId].autoIncrement || 0) * 3600;
//           }, 0) / 18000
//       )
//     : 0;

//   // Function to calculate total value based on upgrade levels
//   const calculateTotalValue = (levels) => {
//     return levels.reduce((acc, level) => acc + (level > 2 ? 1 : 0), 0);
//   };

//   // Sort user data by profit per hour in descending order
//   const sortedUserData = userData
//     ? Object.keys(userData).sort((a, b) => {
//         const profitA = (userData[a].autoIncrement || 0) * 3600;
//         const profitB = (userData[b].autoIncrement || 0) * 3600;
//         return profitB - profitA;
//       })
//     : [];

//   return (
//     <div className="dashboard-layout">
//       <h1>User Data</h1>
//       {userData ? (
//         <>
//           <div className="summary">
//             <p className="total-users">Total Users: {totalUsers}</p>
//             <p className="total-profit">Total Coin: {totalProfitPerHour.toFixed(2)}</p>
//           </div>
//           <div className="table-container">
//             <table>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>UserID</th>
//                   <th>Profit per Hour</th>
//                   <th>Invite Count</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedUserData.map((userId, index) => {
//                   const userUpgrades = userData[userId].upgrades || {};
//                   const upgradeLevels = [
//                     userUpgrades.autoClicker01 || 0,
//                     userUpgrades.autoClicker02 || 0,
//                     userUpgrades.autoClicker03 || 0,
//                     userUpgrades.autoClicker04 || 0,
//                     userUpgrades.autoClicker05 || 0,
//                     userUpgrades.autoClicker06 || 0,
//                     userUpgrades.autoClicker07 || 0,
//                     userUpgrades.refClicker01 || 0,
//                     userUpgrades.refClicker02 || 0,
//                   ];

//                   const totalValue = calculateTotalValue(upgradeLevels);
//                   const isConditionMet = userUpgrades.clickUpgrade > 4 && totalValue > 3;

//                   return (
//                     <React.Fragment key={userId}>
//                       <tr>
//                         <td data-label="#">{index + 1}</td>
//                         <td data-label="UserID">{userId}</td>
//                         <td data-label="Profit per Hour">{Math.floor((userData[userId].autoIncrement || 0) * 3600)}</td>
//                         <td data-label="Invite Count">{userData[userId].inviteCount || 0}</td>
//                       </tr>
//                       <tr>
//                         <td colSpan="3" className="additional-info">
//                         token: {userData[userId]?.exchanges?.tokens || 0}
//                         </td>
//                         <td colSpan="2" className="additional-info">
//                           Condition: {isConditionMet ? 'True' : 'False'}
//                         </td>
//                       </tr>
//                     </React.Fragment>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { ref, get } from 'firebase/database';
// import './Dashboard.css'; // Adjust the path as needed
// import { db } from "../firebase"; // Ensure Firebase is configured

// const Dashboard = () => {
//   const [usersWithImages, setUsersWithImages] = useState([]); // Initialize as an empty array
//   const [claimableTokens, setClaimableTokens] = useState(0);

//   useEffect(() => {
//     fetchUsersWithImages();
//   }, []);

//   // Fetch all users and filter those with the "images" node
//   const fetchUsersWithImages = async () => {
//     const usersRef = ref(db, 'users');
//     try {
//       const snapshot = await get(usersRef);
//       if (snapshot.exists()) {
//         const usersData = snapshot.val();

//         // Filter users who have the 'images' node
//         const filteredUsers = Object.keys(usersData).filter(
//           (userId) => usersData[userId]?.images // Use optional chaining to avoid errors
//         );

//         // Map filtered users to include userId and their data
//         const usersWithImagesData = filteredUsers.map((userId) => ({
//           userId,
//           ...usersData[userId],
//         }));

//         setUsersWithImages(usersWithImagesData); // Set the filtered users
//       } else {
//         console.error("No user data available.");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     if (usersWithImages) {
//       const exchangeRef = ref(db, `users/${usersWithImages}/exchanges/tokens`);
//       const unsubscribe = onValue(exchangeRef, (snapshot) => {
//         const tokens = snapshot.val();
//         setTotalTokens(tokens || 0);

//         const claimable = tokens ? tokens * 0.8 : 0;
//         setClaimableTokens(claimable);
//       });

//       return () => unsubscribe();
//     }
//   }, [usersWithImages]);

//   return (
//     <div className="dashboard-layout">
//       <h1>Users with Images</h1>
//       {usersWithImages.length > 0 ? (
//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>UserID</th>
//                 <th>Images Verified</th>
//                 <th>Pending State</th>
//                 <th>Tokrn</th>
//                 <th>20%reduce</th>
//                 <th>Claim State</th>
//               </tr>
//             </thead>
//             <tbody>
//               {usersWithImages.map((user) => (
//                 <tr key={user.userId}>
//                   <td data-label="UserID">{user.userId}</td>
//                   <td data-label="Images Verified">
//                     {user.images && user.images.imageverified ? 'Yes' : 'No'}
//                   </td>
//                   <td data-label="Pending State">
//                     {user.addresswallet && user.addresswallet.pendingstate !== undefined
//                       ? user.addresswallet.pendingstate ? 'Yes' : 'No'
//                       : 'N/A'}
//                   </td>
// <td>{claimableTokens}</td>
//                   <td>
//                    {user.exchanges  && user.exchanges .tokens || 0}
//                   </td>
//                   <td data-label="Claim State">
//                     {user.addresswallet && user.addresswallet.claimstate !== undefined
//                       ? user.addresswallet.claimstate ? 'Yes' : 'No'
//                       : 'N/A'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>No users with images found.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { ref, get, onValue } from 'firebase/database';
import './Dashboard.css'; // Adjust the path as needed
import { db } from "../firebase"; // Ensure Firebase is configured

const Dashboard = () => {
  const [usersWithImages, setUsersWithImages] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetchUsersWithImages();
  }, []);

  // Fetch all users and filter those with the "images" node
  const fetchUsersWithImages = async () => {
    const usersRef = ref(db, 'users');
    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const usersData = snapshot.val();

        // Filter users who have the 'images' node
        const filteredUsers = Object.keys(usersData).filter(
          (userId) => usersData[userId]?.images // Use optional chaining to avoid errors
        );

        // Map filtered users to include userId and their data
        const usersWithImagesData = filteredUsers.map((userId) => ({
          userId,
          ...usersData[userId],
          claimableTokens: 0, // Add default token fields
          tokens: 0
        }));

        // Set the filtered users
        setUsersWithImages(usersWithImagesData);

        // Fetch tokens for each user
        usersWithImagesData.forEach((user) => {
          const exchangeRef = ref(db, `users/${user.userId}/exchanges/tokens`);
          onValue(exchangeRef, (snapshot) => {
            const tokens = snapshot.val() || 0;
            const claimableTokens = tokens * 0.8;
            setUsersWithImages((prevUsers) =>
              prevUsers.map((u) =>
                u.userId === user.userId
                  ? { ...u, tokens, claimableTokens }
                  : u
              )
            );
          });
        });
      } else {
        console.error("No user data available.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="dashboard-layout">
      <h1>Users with Images</h1>
      {usersWithImages.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>UserID</th>
                <th>Images Verified</th>
                <th>Pending State</th>
                <th>Tokens</th>
                <th>Claimable Tokens (20% reduced)</th>
                <th>Claim State</th>
              </tr>
            </thead>
            <tbody>
              {usersWithImages.map((user) => (
                <tr key={user.userId}>
                  <td data-label="UserID">{user.userId}</td>
                  <td data-label="Images Verified">
                    {user.images && user.images.imageverified ? 'Yes' : 'No'}
                  </td>
                  <td data-label="Pending State">
                    {user.addresswallet && user.addresswallet.pendingstate !== undefined
                      ? user.addresswallet.pendingstate ? 'Yes' : 'No'
                      : 'N/A'}
                  </td>
                  <td data-label="Tokens">{user.tokens}</td>
                  <td data-label="Claimable Tokens">{user.claimableTokens}</td>
                  <td data-label="Claim State">
                    {user.addresswallet && user.addresswallet.claimstate !== undefined
                      ? user.addresswallet.claimstate ? 'Yes' : 'No'
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users with images found.</p>
      )}
    </div>
  );
};

export default Dashboard;
