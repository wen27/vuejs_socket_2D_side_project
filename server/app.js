import http from "http"
import fs from "fs"
import io from "socket.io"
import url from "url"

let port = 3000;

const server = http.createServer(function(request, response){
    const path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write('I don\'t need to reload~');
            response.end(); 
            break;
        case '/socket.html':
            fs.readFile(__dirname + path, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                } else {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(data, "utf8");
                }
                response.end();
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
})


server.listen(port,()=>{
    console.log(`Listening at :${port}....`);
});
const serv_io = io.listen(server);

export {
    serv_io
}
