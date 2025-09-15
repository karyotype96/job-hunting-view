import { loadRecords, recordStore } from "$lib/components/global/globalState.svelte.js";
import type IRecord from "$lib/utils/record.js";
import { Applied } from "$lib/utils/record.js";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import _ from "lodash";

export async function load({ params }){
    const recordID = params.id;
    let record: IRecord = {
        id: -1,
        companyName: "",
        status: Applied,
        timeApplied: new Date()
    };

    if (recordID == "new"){
        recordStore.currentRecordID = -1;
    } else {
        await loadRecords();

        recordStore.currentRecordID = parseInt(recordID);
        let results = _.filter(recordStore.records, (rec) => {
            return rec.id == recordStore.currentRecordID
        });

        if (results.length > 0){
            record = {...results[0]}
        } else {
            error(404);
        }
    }

    return {...record};
}

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const companyName = data.get("companyName");
        const status = data.get("status");
        const timeApplied = data.get("timeApplied");

        if (!companyName){
            return fail(400, { companyName: 'Invalid company name', missing: true });
        }
        if (!status){
            return fail(400, { status: 'Invalid status', missing: true });
        }
        if (!timeApplied){
            return fail(400, { timeApplied: 'Invalid application date', missing: true });
        }

        const body = {
            id: -1,
            companyName: companyName.toString(),
            status: parseInt(status.toString()),
            timeApplied: new Date(timeApplied.toString())
        }

        console.log("body: " + JSON.stringify(body));

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        await fetch("http://localhost:4001/api/records", requestOptions)
            .then((res) => {
                const resultStatus = res.status;
                if (resultStatus != 201){
                    return fail(resultStatus, { message: 'Record could not be added...'})
                }

                throw redirect(303, "/");
            })
    },
    update: async ({ request }) => {

    }
} satisfies Actions;