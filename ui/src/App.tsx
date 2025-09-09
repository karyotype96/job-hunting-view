import React from 'react'
import type { RootStore } from './stores/root-store';
import { Header, Menu, MenuItem, type MenuItemProps } from 'semantic-ui-react';
import _ from 'lodash';
import "./App.css"
import { Homepage } from './components/homepage';

interface IMainViewProps {
  rootStore?: RootStore;
}

interface IMainViewState {
  option: string;
}

const menuOptions = [
  "Main View",
  "Statistics"
]
const menuItemPrefix = "option"

export default class App extends React.Component<IMainViewProps, IMainViewState> {

  constructor(props: IMainViewProps){
    super(props);

    this.state = {
      option: menuItemPrefix + "0",
    }
  }

  handleMenuItemClick = (_e: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => {
    if (data.name){
      console.log(data.name);

      this.setState({
        option: data.name
      });
    }
  }

  render(): React.ReactNode {
      return (
        <div style={{"margin": "10px auto", "width": "50%"}}>
          <Header as="h1" dividing>Job Hunt Helper</Header>
          <Menu tabular>
            { _.map(menuOptions, (value, index) => {
              return <MenuItem
                key={index}
                name={menuItemPrefix+index}
                active={this.state.option == menuItemPrefix+index}
                onClick={this.handleMenuItemClick}
              >
                { value }
              </MenuItem>
            })}
          </Menu>
          { this.state.option == menuItemPrefix + 0 && 
            <Homepage recordStore={this.props.rootStore?.recordStore}/>
          }
        </div>
      )
  }
}
