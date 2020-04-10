# kafka-on-k8s-with-Node.Js

- This code is for a simple demo and it expects that a Kafka Broker is accessible at *kafka://35.229.115.108:19092* where a topic *test* handles Strings
- You execute this example in the following manner using two terminal screens:

```
git clone https://github.com/rm511130/kafka-on-k8s-with-Node.Js
cd kafka-on-k8s-with-Node.Js
npm install
node producer.js
```

- and in a separate terminal window:
```
node consumer.js
```


### consumer.js 
```
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
```

### producer.js
```
const Kafka = require('no-kafka');

function startSending(p) {
  // unique messages
  let counter = 1;
  setInterval(() => {
    p.send({
        topic: 'test',
        partition: 0, // which partition to target - only 1 in this demo
        message: {
          value: 'Hello interval ' + counter // my message
        }
      })
      .then((result) => {
        counter++;
        console.log(result); // array of results
      });
  }, 1000);
}

const producer = new Kafka.Producer({
  connectionString: 'kafka://35.229.115.108:19092'
});

producer.init()
  .then(() => {
    console.log('producer init success!');
    startSending(producer);
  });
```


