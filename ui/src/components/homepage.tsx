import React from "react";
import { Dimmer, Loader, Segment, Table } from "semantic-ui-react";
import _ from "lodash";
import type { Record } from "../models/record";
import { Accepted, Rejected } from "../utils/enums";
import moment from "moment";
import { inject, observer } from "mobx-react";

interface IHomepageProps {
    records?: Record[];
}

type IHomepageState = object

const headerStyle = {"backgroundColor": "lightgreen", "color": "black", "border": "1px solid grey"}

@inject("recordStore") @observer
export class Homepage extends React.Component<IHomepageProps, IHomepageState> {
    constructor(props: IHomepageProps){
        super(props)
    }

    writeStatusCell = (record: Record) => {
        if (record.status == Rejected){
            return <Table.Cell>Rejected</Table.Cell>
        } else if (record.status == Accepted){
            return <Table.Cell>Accepted!</Table.Cell>
        }

        if (record.timeApplied.diff(moment.now(), "months", true) < 1){
            return <Table.Cell>Applied</Table.Cell>
        }

        return <Table.Cell>Ghosted</Table.Cell>
    }

    render(): React.ReactNode {
        if (!this.props.records){
            return <Dimmer active={true} as={Segment}>
                <Loader>Loading...</Loader>
            </Dimmer>
        }

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="6" style={headerStyle}>Company Name</Table.HeaderCell>
                        <Table.HeaderCell width="4" style={headerStyle}>Application Date</Table.HeaderCell>
                        <Table.HeaderCell width="4" style={headerStyle}>Status</Table.HeaderCell>
                        <Table.HeaderCell width="2" style={headerStyle}>Edit / Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { _.map(this.props.records, (record: Record) => {
                        return <Table.Row>
                            <Table.Cell>
                                { record.companyName }
                            </Table.Cell>
                            <Table.Cell>
                                { record.timeApplied.format("MM/DD/YYYY") }
                            </Table.Cell>
                            { this.writeStatusCell(record) }
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        )
    }
}