import {Component} from "react";
import {Input} from "@alifd/next";
import React from 'react';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
    }
    console.log("on constructor");
  }

  render() {
    return (
      <div className='home-page'>
         hello world
        <Input/>
      </div>
    )
  }
}
