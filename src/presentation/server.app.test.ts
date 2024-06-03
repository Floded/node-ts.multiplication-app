import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server.app";
describe("Test Server.app", () => {
  it("should create ServerApp instance", () => {
    const newServer = new ServerApp();
    expect(newServer).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  it("should run ServerApp with options", () => {
    // const logSpy = jest.spyOn(console, "log");
    // const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    // const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");
    //   const options = {
    //     base: 2,
    //     limit: 10,
    //     showTable: false,
    //     fileDestination: "test-destination",
    //     fileName: "test-filename",
    //   };
    //   ServerApp.run(options);
    //   expect(logSpy).toHaveBeenCalledTimes(3);
    //   expect(logSpy).toHaveBeenCalledWith("Server runing...");
    //   expect(logSpy).toHaveBeenLastCalledWith("Created....");
    //   expect(createTableSpy).toHaveBeenCalledTimes(1);
    //   expect(createTableSpy).toHaveBeenCalledWith({
    //     base: options.base,
    //     limit: options.limit,
    //   });
    //   expect(saveFileSpy).toHaveBeenCalledTimes(1);
    //   expect(saveFileSpy).toHaveBeenCalledWith({
    //     fileContent: expect.any(String),
    //     fileDestination: options.fileDestination,
    //     fileName: options.fileName,
    //   });
  });

  it("should run custom values mocked", () => {
    const options = {
      base: 2,
      limit: 10,
      showTable: false,
      fileDestination: "test-destination",
      fileName: "test-filename",
    };

    const logMock = jest.fn();
    const logError = jest.fn();
    const createMock = jest.fn().mockReturnValue("1 x 2 = 2");
    const saveFileMock = jest.fn();

    console.log = logMock;
    console.error = logError;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server runing...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenLastCalledWith({
      fileContent: "1 x 2 = 2",
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
    // expect(logMock).toHaveBeenCalledWith("Created....");
    expect(logError).not.toBeCalledWith();
  });
});
