import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import { LargeTitle, Paragraph, ContrastSpan, Title, HR } from './styling/text'
import { Card, FlexBox, Flex1, Flex2, Flex50 } from './styling/containers';
import { Input, InputSmall, Button, ButtonSmall } from './styling/forms';
import CONSTS from './constants/general';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <header className="App-header">
          <LargeTitle className="App-title">Welcome to <ContrastSpan>{CONSTS.APP_NAME}</ContrastSpan></LargeTitle>
        </header>
        <Paragraph className="App-intro">
          To get started, register in the form below.
        </Paragraph>
        <Card>
          <Title><i class="fas fa-user-circle"></i> Sign Up</Title>
          <HR />
          <FlexBox>
            <Flex1>
              <InputSmall placeholder="First Name"></InputSmall>
              <InputSmall placeholder="Last Name"></InputSmall>
            </Flex1>
            <HR />
            <Flex2>
              <Input placeholder="Password" type="password"></Input>
            </Flex2>
            <HR />
            <Flex2>
              <Input placeholder="Email"></Input>
            </Flex2>
            <Flex2>
              <Input placeholder="Phone"></Input>
            </Flex2>
            <Flex2>
              <Input placeholder="City"></Input>
            </Flex2>
            <HR />
            <Button><i className="fas fa-car"></i> Start Riding!</Button>
          </FlexBox>
        </Card>
        <Paragraph className="App-intro">
          Already have an account?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ButtonSmall><i className="fas fa-sign-in-alt"></i> Login</ButtonSmall>
        </Paragraph>
      </AppContainer>
    );
  }
}

export default App;
