import fs from "fs";
import { SaveFile } from "./save-file.use-case";

describe("save-file.use-case", () => {
  // beforeEach(()=> {
  //   jest.clearAllMocks();
  // })
  afterEach(() => {
    const existSaveTest = fs.existsSync("saveTest");
    const existCustomOutputs = fs.existsSync("custom-outputs");
    if (existSaveTest) fs.rmSync("saveTest", { recursive: true });
    if (existCustomOutputs) fs.rmSync("custom-outputs", { recursive: true });
  });
  it("should saveFile with default values", () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: "test content",
      fileName: "test",
      fileDestination: "saveTest",
    };
    const testPath = "saveTest/test.txt";
    const result = saveFile.execute(options);
    const fileExist = fs.existsSync(testPath);
    const fileContent = fs.readFileSync(testPath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(fileExist).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  it("should save file with custom values", () => {
    const options = {
      fileContent: "custom content",
      fileName: "custom-table-name",
      fileDestination: "custom-outputs",
    };
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;

    const saveNewFile = new SaveFile();
    const result = saveNewFile.execute(options);
    const fileExist = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(fileExist).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  it("should return false if directory could not be created", () => {
    const options = {
      fileContent: "test content",
      fileName: "test",
      fileDestination: "saveTest",
    };
    const saveFile = new SaveFile();

    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });

    const result = saveFile.execute(options);

    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  });

  it("should return false if file could not be created", () => {
    const options = {
      fileContent: "Hola",
      fileName: "Test file",
      fileDestination: "saveTest",
    };
    const saveFile = new SaveFile();
    const writeFile = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });
    const result = saveFile.execute(options);

    expect(result).toBe(false);
    writeFile.mockRestore();
  });
});
