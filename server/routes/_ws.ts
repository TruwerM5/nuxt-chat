export default defineWebSocketHandler({
    open(peer) {
      peer.send({ user: "server", greeting: `Welcome ${peer}!` });
      peer.publish("chat", { user: "server", greeting: `${peer} joined!` });
      peer.subscribe("chat");
    },
    message(peer, message: any) {
      if (message.text().includes("ping")) {
        peer.send({ user: "server", message: "pong" });
      } else {
        // const msg = {
        //   user: peer.toString(),
        //   message: message.toString(),
        // };
        setTimeout(() => {
          peer.send({user: "server", message: {
            id: 31,
            from_user_nickname: '@thenotorious',
            to_user_nickname: '@zabit',
            message: 'Hi Bitch',
            date: new Date().toISOString(),
          }});
        }, 1000);
         // echo
        // peer.publish("chat", msg);
        
      }

    },
    close(peer) {
      peer.publish("chat", { user: "server", message: `${peer} left!` });
    },
  });
  
  