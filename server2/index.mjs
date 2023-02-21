// A sample subscriber showing how the subscribe method and pSubscribe method work.
// https://redis.io/commands/subscribe/
// https://redis.io/commands/pSubscribe/
// This consumes messages published by pubsub-publisher.js

import { createClient} from 'redis';

// Create and connect client before executing any Redis commands.
const client = createClient();
await client.connect();

// Each subscriber needs to connect individually therefore we duplicate the client.
const channel1Sub = client.duplicate();

await channel1Sub.connect();

// This subscriber only will receive messages from channel 1 as they are using the subscribe method and subscribed to chan1nel.
await channel1Sub.subscribe('chan1nel', (message) => {
  console.log(`Channel1 subscriber collected message: ${message}`);
},true);

