import { RecordStore } from "./record-store";

export class RootStore {
    recordStore: RecordStore;

    constructor(){
        this.recordStore = new RecordStore(this);
    }
}