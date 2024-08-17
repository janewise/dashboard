// import React, { useEffect, useState } from 'react';
// import { listenToUserData } from '../firebaseFunctions'; // Import the function to listen for data
// import './Dashboard.css'; // Adjust the path as needed

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);

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
//           .filter(userId => (userData[userId].inviteCount || 0) >= 3)
//           .reduce((total, userId) => {
//             return total + (userData[userId].autoIncrement || 0) * 3600;
//           }, 0) / 18000
//       )
//     : 0;

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
//                   <th>Click Upgrade Level</th> 
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedUserData.map((userId, index) => (
//                   <tr key={userId}>
//                     <td data-label="#">{index + 1}</td>
//                     <td data-label="UserID">{userId}</td>
//                     <td data-label="Profit per Hour">{Math.floor((userData[userId].autoIncrement || 0) * 3600)}</td>
//                     <td data-label="Invite Count">{userData[userId].inviteCount || 0}</td>
//                     <td data-label="Click Upgrade Level">{userData[userId].upgrades?.clickUpgrade || 0}</td> {/* Added Click Upgrade Level data */}
//                   </tr>
//                 ))}
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
// import { listenToUserData, getUserUpgrades } from '../firebaseFunctions'; // Import necessary functions
// import './Dashboard.css'; // Adjust the path as needed

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);

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
//           .filter(userId => (userData[userId].inviteCount || 0) >= 3)
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
//                   <th>Click Upgrade Level</th>
//                   <th>Total Value</th> {/* Added header for Total Value */}
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

//                   return (
//                     <tr key={userId}>
//                       <td data-label="#">{index + 1}</td>
//                       <td data-label="UserID">{userId}</td>
//                       <td data-label="Profit per Hour">{Math.floor((userData[userId].autoIncrement || 0) * 3600)}</td>
//                       <td data-label="Invite Count">{userData[userId].inviteCount || 0}</td>
//                       <td data-label="Click Upgrade Level">{userUpgrades.clickUpgrade || 0}</td>
//                       <td data-label="Total Value">{totalValue}</td> {/* Added Total Value data */}
//                     </tr>
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

//02
// import React, { useEffect, useState } from 'react';
// import { listenToUserData } from '../firebaseFunctions'; // Import necessary functions
// import './Dashboard.css'; // Adjust the path as needed

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);

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
//           .filter(userId => (userData[userId].inviteCount || 0) >= 3)
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
//                   <th>Click Upgrade Level</th>
//                   <th>Total Value</th>
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

//                   return (
//                     <React.Fragment key={userId}>
//                       <tr>
//                         <td data-label="#">{index + 1}</td>
//                         <td data-label="UserID">{userId}</td>
//                         <td data-label="Profit per Hour">{Math.floor((userData[userId].autoIncrement || 0) * 3600)}</td>
//                         <td data-label="Invite Count">{userData[userId].inviteCount || 0}</td>
//                         <td data-label="Click Upgrade Level">{userUpgrades.clickUpgrade || 0}</td>
//                         <td data-label="Total Value">{totalValue}</td>
//                       </tr>
//                       <tr>
//                         <td colSpan="6" className="additional-info">
//                           <strong>Details:</strong> {/* You can add more details here */}
//                           {/* Display upgrade levels or other information */}
//                           Upgrade Levels: {upgradeLevels.join(', ')}
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

//03
// import React, { useEffect, useState } from 'react';
// import { listenToUserData } from '../firebaseFunctions'; // Import necessary functions
// import './Dashboard.css'; // Adjust the path as needed

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);

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
//           .filter(userId => (userData[userId].inviteCount || 0) >= 3)
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
//                           Total: {totalValue}
//                         </td>
//                         <td colSpan="3" className="additional-info">                      
//                           Booster: {userUpgrades.clickUpgrade || 0}
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
import React, { useEffect, useState } from 'react';
import { ref, onValue, getDatabase } from 'firebase/database'; // Adjust imports according to your Firebase setup
import { listenToUserData } from '../firebaseFunctions'; // Import necessary functions
import './Dashboard.css'; // Adjust the path as needed

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [totalTokens, setTotalTokens] = useState(0); // State to store tokens

  useEffect(() => {
    const unsubscribe = listenToUserData((data) => {
      setUserData(data); // Update state with the received data
    });

    // Cleanup function to unsubscribe if the component unmounts
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const totalUsers = userData ? Object.keys(userData).length : 0;

  // Calculate total profit per hour and divide by 18000
  const totalProfitPerHour = userData
    ? Math.floor(
        Object.keys(userData)
          .filter((userId) => (userData[userId].inviteCount || 0) >= 3)
          .reduce((total, userId) => {
            return total + (userData[userId].autoIncrement || 0) * 3600;
          }, 0) / 18000
      )
    : 0;

  // Function to calculate total value based on upgrade levels
  const calculateTotalValue = (levels) => {
    return levels.reduce((acc, level) => acc + (level > 2 ? 1 : 0), 0);
  };

  // Sort user data by profit per hour in descending order
  const sortedUserData = userData
    ? Object.keys(userData).sort((a, b) => {
        const profitA = (userData[a].autoIncrement || 0) * 3600;
        const profitB = (userData[b].autoIncrement || 0) * 3600;
        return profitB - profitA;
      })
    : [];

  return (
    <div className="dashboard-layout">
      <h1>User Data</h1>
      {userData ? (
        <>
          <div className="summary">
            <p className="total-users">Total Users: {totalUsers}</p>
            <p className="total-profit">Total Coin: {totalProfitPerHour.toFixed(2)}</p>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>UserID</th>
                  <th>Profit per Hour</th>
                  <th>Invite Count</th>
                </tr>
              </thead>
              <tbody>
                {sortedUserData.map((userId, index) => {
                  const userUpgrades = userData[userId].upgrades || {};
                  const upgradeLevels = [
                    userUpgrades.autoClicker01 || 0,
                    userUpgrades.autoClicker02 || 0,
                    userUpgrades.autoClicker03 || 0,
                    userUpgrades.autoClicker04 || 0,
                    userUpgrades.autoClicker05 || 0,
                    userUpgrades.autoClicker06 || 0,
                    userUpgrades.autoClicker07 || 0,
                    userUpgrades.refClicker01 || 0,
                    userUpgrades.refClicker02 || 0,
                  ];

                  const totalValue = calculateTotalValue(upgradeLevels);
                  const isConditionMet = userUpgrades.clickUpgrade > 4 && totalValue > 3;

                  return (
                    <React.Fragment key={userId}>
                      <tr>
                        <td data-label="#">{index + 1}</td>
                        <td data-label="UserID">{userId}</td>
                        <td data-label="Profit per Hour">{Math.floor((userData[userId].autoIncrement || 0) * 3600)}</td>
                        <td data-label="Invite Count">{userData[userId].inviteCount || 0}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="additional-info">
                        token: {userData[userId]?.exchanges?.tokens || 0}
                        </td>
                        <td colSpan="2" className="additional-info">
                          Condition: {isConditionMet ? 'True' : 'False'}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
