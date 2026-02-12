const { Kafka } = require("kafkajs");
exports. kafka=new Kafka({
    clientId: 'admin-client',
    brokers: ['xxxxxxx:9092']
});
