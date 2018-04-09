import React, { Component } from 'react';
import { LargeTitle, Paragraph, ContrastSpan, Title, HR } from '../../../styling/text'
import { Card, FlexBox, Flex2, AppContainer } from '../../../styling/containers';
import { Input, ButtonLarge, ButtonLink } from '../../../styling/forms';
import CONSTS from '../../../constants/general';

class Login extends Component {
  render() {
    return (
      <AppContainer>
        <header className="App-header">
          <LargeTitle className="App-title"><ContrastSpan>{CONSTS.APP_NAME}</ContrastSpan></LargeTitle>
        </header>
        <Card>
          <Title><i class="fas fa-user-circle"></i> Login</Title>
          <HR />
          <FlexBox>
            <Flex2>
              <Input placeholder="Email"></Input>
            </Flex2>
            <HR />
            <Flex2>
              <Input placeholder="Password" type="password"></Input>
            </Flex2>
            <HR />
            <ButtonLarge><i className="fas fa-car"></i> Login</ButtonLarge>
          </FlexBox>
        </Card>
        <Paragraph className="App-intro">
          Having trouble logging in?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ButtonLink to="/forgot-password"><i className="fas fa-sign-in-alt"></i> Forgot Password</ButtonLink>
        </Paragraph>
      </AppContainer>
    );
  }
}

export default Login;
