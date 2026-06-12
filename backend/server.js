const http=require('http')
const server=http.createServer((request,response)=>{
    response.end("Response from server")
});
server.listen(3001,"127.0.0.1",()=>{
    console.log("Server running")
})