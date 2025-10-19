const { Kafka } = require("kafkajs");
exports. kafka=new Kafka({
    clientId: 'admin-client',
    brokers: ['192.168.29.145:9092']
});