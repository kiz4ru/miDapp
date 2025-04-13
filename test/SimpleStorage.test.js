const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", accounts => {
  let instance;

  beforeEach(async () => {
    instance = await SimpleStorage.new();
  });

  it("debe guardar correctamente un valor", async () => {
    await instance.set(123, { from: accounts[0] });
    const result = await instance.get();
    assert.equal(result.toNumber(), 123, "El valor devuelto no coincide con el esperado");
  });

  it("debe reemplazar el valor correctamente", async () => {
    await instance.set(456, { from: accounts[0] });
    const result = await instance.get();
    assert.equal(result.toNumber(), 456, "El valor no se reemplazó correctamente");
  });

  it("debe retornar 0 si no se ha establecido ningún valor", async () => {
    const result = await instance.get();
    assert.equal(result.toNumber(), 0, "El valor inicial debería ser 0");
  });

  it("debe funcionar con varias cuentas", async () => {
    await instance.set(999, { from: accounts[1] });
    const result = await instance.get();
    assert.equal(result.toNumber(), 999, "El contrato no guardó correctamente desde otra cuenta");
  });
});
