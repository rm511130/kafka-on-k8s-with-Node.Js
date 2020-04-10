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
