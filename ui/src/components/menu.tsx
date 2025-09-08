import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, MenuItem } from "semantic-ui-react";

export class AppMenu extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <Menu>
                <MenuItem
                    name="Main Page"
                >
                    <NavLink to="/">Main Page</NavLink>
                </MenuItem>
            </Menu>
        )
    }
}