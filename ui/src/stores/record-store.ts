import { action, observable, runInAction } from "mobx";
import { Record } from "../models/record";
import { getRecords } from "../utils/agent";

export class RecordStore {
    @observable loading: boolean;
    @observable records: Array<Record>;
    @observable recordEditingID: number;

    constructor(){
        this.loading = false;
        this.records = new Array<Record>();
        this.recordEditingID = -1;
    }

    @action async loadRecords(){
        this.loading = true;
        this.records = await getRecords();

        runInAction(() => {
            this.loading = false;
        })
    }
}