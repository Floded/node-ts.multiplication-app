import { CreateTable } from "./create-table.use-case";
describe("create-table.use-case", () => {
  it("should create table with default values", () => {
    const createNewTable = new CreateTable();
    const table = createNewTable.execute({ base: 2 });
    const rows = table.split("\n").length;

    expect(createNewTable).toBeInstanceOf(CreateTable);
    expect(table).toContain("2 x 1 = 2");
    expect(table).toContain("2 x 10 = 20");
    expect(rows).toBe(10);
  });

  it("should create table with custom values", () => {
    const options = {
      base: 3,
      limit: 20,
    };
    const newTableOptions = new CreateTable();
    const tableOptions = newTableOptions.execute(options);
    // console.log(tableOptions);

    const tableLength = tableOptions.split("\n").length;

    expect(tableOptions).toContain("3 x 11 = 33");
    expect(tableLength).toBe(options.limit);
  });
});
