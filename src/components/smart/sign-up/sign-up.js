import React, { Component } from 'react';
import { LargeTitle, Paragraph, ContrastSpan, Title, HR } from '../../../styling/text'
import { Card, FlexBox, Flex1, Flex2, AppContainer } from '../../../styling/containers';
import { Input, InputSmall, ButtonLarge, ButtonLink } from '../../../styling/forms';
import CONSTS from '../../../constants/general';

class SignUp extends Component {
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
            <ButtonLarge><i className="fas fa-car"></i> Start Riding!</ButtonLarge>
          </FlexBox>
        </Card>
        <Paragraph className="App-intro">
          Already have an account?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ButtonLink to="/login"><i className="fas fa-sign-in-alt"></i> Login</ButtonLink>
        </Paragraph>
      </AppContainer>
    );
  }
}

export default SignUp;
