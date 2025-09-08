import { Applied } from "../utils/enums";
import { observable } from "mobx";
import moment from "moment";

interface IRecord {
    id?: number;
    companyName?: string;
    status?: number;
    timeApplied?: moment.Moment;
}

export class Record {
    @observable id: number;
    @observable companyName: string;
    @observable status: number;
    @observable timeApplied: moment.Moment;

    constructor(data: IRecord){
        this.id = (data.id) ? data.id : -1;
        this.companyName = (data.companyName) ? data.companyName : "";
        this.status = (data.status) ? data.status : Applied;
        this.timeApplied = moment(data.timeApplied);
    }
}