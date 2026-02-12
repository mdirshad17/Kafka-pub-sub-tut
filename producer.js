const { kafka } = require("./client");
const readline = require('readline');


const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
async function produceMessage(topic, messages) {
  const producer = kafka.producer();
  console.log("Connecting Producer...");
  await producer.connect();
  console.log("Producer Connected!");

  console.log(`Producing messages to topic: ${topic}`);
  await producer.send({
    topic: topic,
    messages: messages,
  });
  console.log("Messages produced successfully!");

  await producer.disconnect();
  console.log("Producer Disconnected!");
}


async function enterMessages() {
   rl.setPrompt('> ');
   rl.prompt();
   rl.on('line', async (line) => {
    const [riderName,message]=line.split(" ");
       const messages = [
           { partition: message.toLocaleLowerCase()=="north"?0:1, key: riderName, value: message }
       ];
       await produceMessage("rider-updates", messages);
       rl.prompt();
   }).on('close', () => {
       console.log('Exiting message producer.');
       process.exit(0);
   });
    
}
enterMessages();
