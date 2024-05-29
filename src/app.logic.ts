import fs from "fs";
import { yarg } from "./config/plugins/args.plugins";

const { b: base, l: limit, s: showTable } = yarg;

let outputMessage = "";
const headerMessage = `
====================================
            Tabla del ${base}
====================================\n
`;

for (let i = 1; i <= limit; i++) {
  const result = base * i;
  outputMessage += `${base} x ${i} = ${result}\n`;
}

outputMessage = headerMessage + outputMessage;
if (showTable) {
  console.log(outputMessage);
}

const outputPath = "outputs";
// a travez del file sistem "fs" creamos el directorio en la carpeta raiz con el nombre asignado en la variable outputPath
// y luego creamos la tabla en dicho directorio
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`outputs/tabla-${base}.txt`, outputMessage);
console.log("file created!");
