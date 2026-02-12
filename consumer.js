const {kafka}=require("./client");
const group=process.argv[2]; // Get consumer name from command line arguments
async function consumeMessages(topic) {
    const consumer = kafka.consumer({ groupId: group || 'default-group' });
    console.log("Connecting Consumer...");
    await consumer.connect();
    console.log("Consumer Connected!");

    console.log(`Subscribing to topic: ${topic}`);
    await consumer.subscribe({ topic: topic, fromBeginning: true });

    console.log("Starting message consumption...");
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                key: message.key.toString(),
                value: message.value.toString(),
            });
        },
    });

}

consumeMessages("rider-updates");