const fs = require("node:fs/promises");
const path = require("node:path");
const { loadContracts } = require("../server");

async function syncContracts() {
  const result = await loadContracts();
  if (!result.ok) {
    throw new Error(result.message || "No se pudieron consultar las fuentes oficiales.");
  }

  const snapshot = {
    ...result,
    lastSync: new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeStyle: "short" }).format(new Date()),
    limitPerCategory: 20,
  };
  const outputPath = path.join(__dirname, "..", "contracts.json");
  await fs.writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);

  const counts = Object.fromEntries(
    ["Bienes", "Obras", "Servicios"].map((category) => [
      category,
      result.contracts.filter((contract) => contract.category === category).length,
    ])
  );
  console.log(`Snapshot actualizado en ${outputPath}: ${JSON.stringify(counts)}`);
}

syncContracts().catch((error) => {
  console.error(`Error al sincronizar contratos: ${error.message}`);
  process.exitCode = 1;
});
