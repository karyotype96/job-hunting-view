import * as request from "superagent";
import { Record } from "../models/record";

export namespace AgentMethods {
    export var baseUrl = "http://localhost:4001";

    export async function getRecords(): Promise<Array<Record>> {
        let records = new Array<Record>();

        try {
            let data = await request.get(baseUrl + "/api/records");
            console.log(data);
        } catch (error: any) {
            console.error("Error retrieving records: " + error.message);
        }

        return records;
    }
}