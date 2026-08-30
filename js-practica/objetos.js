const objetoBase = { propiedad1: 1, propiedad2: 2 };


delete objetoBase.propiedad1;


objetoBase.propiedad1 = 3;

const ordenado = { propiedad1: 3, ...objetoBase };

const objetoTipo = { tipo: "IoT" };

const composicion = { ordenado, objetoTipo };


let salida = "";
salida += "--- for...in (solo las keys) ---\n";
for (let key in composicion) {
  salida += `key: ${key}\n`;
}


salida += "\n--- Object.entries (key y value) ---\n";
Object.entries(composicion).forEach(([key, value]) => {
  salida += `key: ${key}, value: ${JSON.stringify(value)}\n`;
});


salida += "\n--- Object.values (solo los valores) ---\n";
Object.values(composicion).forEach((value) => {
  salida += `value: ${JSON.stringify(value)}\n`;
});

salida += "\n--- Recorrido anidado (objeto dentro de objeto) ---\n";
Object.entries(composicion).forEach(([key, value]) => {
  Object.entries(value).forEach(([subKey, subValue]) => {
    salida += `key: ${subKey}, value: ${subValue}\n`;
  });
});


console.log(salida);
