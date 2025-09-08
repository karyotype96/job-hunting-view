import _ from "lodash"
import { Status } from "../utils/enums";
import { observable } from "mobx";
import moment, { Moment } from "moment";

export class Record {
    @observable id: number;
    @observable companyName: string;
    @observable status: Status;
    @observable timeApplied: Moment;

    constructor(data: any){
        this.id = data.id
        this.companyName = data.companyName;
        this.status = data.status;
        this.timeApplied = moment(data.timeApplied);
    }
}