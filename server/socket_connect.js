import { serv_io } from '../server/app';


var position = {
    x:200,
    y:200,
};
serv_io.sockets.on("connection",socket =>{
    console.log("socket");
    socket.emit("position",position);
    console.log(position);
    socket.on("move",data=>{
        switch(data){
            case "left":
                position.x -=5;
                Socketio.emit("position",position);
                break;
            case "right":
                position.x +=5;
                Socketio.emit("position",position);
                break;
            case "up":
                position.y -=5;
                Socketio.emit("position",position);
                break;
            case "down":
                position.y +=5;
                Socketio.emit("position",position);
                break;
        }
    })


});