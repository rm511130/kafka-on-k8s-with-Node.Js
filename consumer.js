const Kafka = require('no-kafka');

const consumer = new Kafka.SimpleConsumer({
  connectionString: 'kafka://35.229.115.108:19092'
});

// data handler function can return a Promise
const dataHandler = (messageSet, topic, partition) => {
  messageSet.forEach((m) => {
    console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
  });
};

return consumer.init()
  .then(() => {
    // Subscribe to partiton 0 in the given topic:
    return consumer.subscribe('test', [0], dataHandler);
  });
