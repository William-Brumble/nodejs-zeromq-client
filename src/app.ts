import zmq from "zeromq";

let client = new zmq.Dealer();
client.routingId = "client";
client.connect("tcp://127.0.0.1:3456");

type example = {
    test: number;
}
let test: example = {test: 1};

for (let i=0; i<100; i++){
    test.test = i;
    await client.send(JSON.stringify({message: `number: ${i}`}));
}

const delay = (time: number) => new Promise((resolve, reject) => {
    setTimeout(resolve, time);
    client.close();
});

await delay(250);