const {kafka} = require("./client");


async function createAdmin() {
    const admin = kafka.admin();
    console.log("Connecting...");
    await admin.connect();
    console.log("Connected!");

    console.log("Creating Topics.. [rider-updates].");
    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updates',
                numPartitions: 2,
                // replicationFactor: 1
            }
        ]
    })
    console.log("Topics created! sucecess");
    await admin.disconnect();
    console.log("Disconnected Admin");  
    // return admin;
}
createAdmin();