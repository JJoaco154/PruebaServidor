const net = require("net");
const readline = require("readline");
const fs = require("fs");

const HOST = "localhost";
const PORT = 3000;

const logFile = "chat_cliente.txt"; // archivo donde guardar el chat

const client = net.createConnection({ host: HOST, port: PORT }, () => {
    console.log("[CLI] Conectado al servidor de chat");
});

// Mostrar mensajes del servidor y guardarlos
client.on("data", (data) => {
    const message = data.toString().trim();
    console.log(message);

  // Guardar en archivo
    fs.appendFileSync(logFile, message + "\n");
});

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

  // también guardo lo que yo escribo
    fs.appendFileSync(logFile, "[Yo] " + line + "\n");
});