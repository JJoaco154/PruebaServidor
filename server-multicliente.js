// server-chat.js
const net = require("net");
const clients = []; // lista de clientes conectados

const PORT = 3000;

const server = net.createServer((socket) => {
    const peer = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`[SRV] Cliente conectado: ${peer}`);
    clients.push(socket);

    socket.write("Bienvenido al chat!\n");

  // Cuando el cliente envía un mensaje
    socket.on("data", (data) => {
    const msg = data.toString().trim();
    console.log(`[${peer}] ${msg}`);


    // Reenviar el mensaje a todos los demás clientes
    clients.forEach((c) => {
        if (c !== socket) {
        c.write(`[${peer}] ${msg}\n`);
        }
    });
    });

  // Cuando un cliente se desconecta
    socket.on("end", () => {
    console.log(`[SRV] Cliente desconectado: ${peer}`);
    const index = clients.indexOf(socket);
    if (index !== -1) clients.splice(index, 1);
    });

    socket.on("error", (err) => {
    console.error(`[SRV] Error con ${peer}:`, err.message);
    });
});

server.listen(PORT, () => {
    console.log(`[SRV] Servidor de chat multicliente en puerto ${PORT}`);
});