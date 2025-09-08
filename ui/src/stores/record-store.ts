import { action, observable, runInAction } from "mobx";
import { Record } from "../models/record";
import { RootStore } from "./root-store";
import { AgentMethods } from "../utils/agent";

export class RecordStore {
    rootStore: RootStore;

    @observable loading: boolean;
    @observable records: Array<Record>;
    @observable recordEditingID: number;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        this.loading = false;
        this.records = new Array<Record>();
        this.recordEditingID = -1;
    }

    @action async loadRecords(){
        this.loading = true;
        this.records = await AgentMethods.getRecords();

        runInAction(() => {
            this.loading = false;
        })
    }
}