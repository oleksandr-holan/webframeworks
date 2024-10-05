import { expect } from "chai";
import sinon from "sinon";
import { Storage } from "../src/storage";

describe("Storage", () => {
  let sut: Storage;
  let localStorageStub: sinon.SinonStub;

  beforeEach(() => {
    localStorageStub = sinon.stub(localStorage, "setItem");
    sut = new Storage();
  });

  afterEach(() => {
    localStorageStub.restore();
  });

  describe("saveItem", () => {
    it("should save an item to localStorage", () => {
      const key = "testKey";
      const value = { id: "1", name: "Test" };

      sut.saveItem(key, value);

      expect(localStorageStub.calledWith(key, JSON.stringify(value))).to.be
        .true;
    });
  });

  describe("getItem", () => {
    it("should retrieve an item from localStorage", () => {
      const key = "testKey";
      const value = { id: "1", name: "Test" };
      sinon.stub(localStorage, "getItem").returns(JSON.stringify(value));

      const result = sut.getItem(key);

      expect(result).to.deep.equal(value);
    });

    it("should return null if item does not exist", () => {
      sinon.stub(localStorage, "getItem").returns(null);

      const result = sut.getItem("nonexistent");

      expect(result).to.be.null;
    });
  });

  describe("removeItem", () => {
    it("should remove an item from localStorage", () => {
      const removeItemStub = sinon.stub(localStorage, "removeItem");
      const key = "testKey";

      sut.removeItem(key);

      expect(removeItemStub.calledWith(key)).to.be.true;
    });
  });

  describe("clear", () => {
    it("should clear all items from localStorage", () => {
      const clearStub = sinon.stub(localStorage, "clear");

      sut.clear();

      expect(clearStub.called).to.be.true;
    });
  });
});
