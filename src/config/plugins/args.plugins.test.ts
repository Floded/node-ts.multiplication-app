// import { yarg } from './args.plugins';

const runComand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("./args.plugins");
  return yarg;
};

describe("Test args.plugins", () => {
  const originaArgv = process.argv;
  beforeEach(() => {
    process.argv = originaArgv;
    jest.resetModules();
  });

  it("should return default values", async () => {
    const argv = await runComand(["-b", "5"]);
    // console.log(argv);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "table",
        d: "./outputs",
      })
    );
  });

  it("should return configuration with custom values", async () => {
    const argv = await runComand([
      "-b",
      "5",
      "-l",
      "15",
      "-s",
      "-d",
      "custom-destiny",
      "-n",
      "custom-name",
    ]);
    // console.log(argv);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 15,
        s: true,
        n: "custom-name",
        d: "custom-destiny",
      })
    );
  });
});
