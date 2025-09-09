import * as request from "superagent";
import { Record } from "../models/record";
import _ from "lodash";

export const baseUrl = "http://localhost:4001";

export async function getRecords(): Promise<Array<Record>> {
    const records = new Array<Record>();

    request
    .get(baseUrl+"/api/records")
    .then((res) => {
        const data = res.body["data"]
        _.forEach(data, (rec) => {
            records.push(new Record(rec));
        })
    }).catch(err => {
        console.log(err.message);
    })
    return records;
}