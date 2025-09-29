// client-chat.js
const net = require("net");
const readline = require("readline");

const HOST = "localhost";
const PORT = 3000;

const client = net.createConnection({ host: HOST, port: PORT }, () => {
    console.log("[CLI] Conectado al servidor de chat");

    client.write("Mensaje 1:\n");
    client.write("Mensaje 2:\n");
    client.write("Mensaje 3:\n");
});

// Mostrar mensajes del servidor
client.on("data", (data) => {
    console.log(data.toString().trim());
});

// Manejar desconexión
client.on("end", () => {
    console.log("[CLI] Desconectado del servidor");
});

// Leer del teclado y enviar al servidor
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", (line) => {
    client.write(line);
});