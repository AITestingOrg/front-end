import styled from 'styled-components';
import {colors, spacing, fontSizing} from './styles';

const Input = styled.input`
  background-color: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  color: #333;
  flex-grow: 1;
  max-width: 600px;
  width:100%;
  padding: 10px;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  font-weight: light;
  line-height: 24px !important;
  outline: none;
  text-align: none;
  transition: all 400ms ease;
`;

const InputSmall = styled.input`
  background-color: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  color: #333;
  flex-grow: 1;
  max-width: 225px;
  width:100%;
  padding: 10px;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  font-weight: light;
  line-height: 24px !important;
  outline: none;
  text-align: none;
  transition: all 400ms ease;
`;

const Button = styled.button`
  width:100%;
  border: none;
  border-radius: 0px;
  font-size: ${fontSizing.medium};
  padding: ${spacing.medium};
  font-family: 'Open Sans', sans-serif;
  color: ${colors.titleTextColor};
  background-color: ${colors.buttonBackgroundColor};
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    background-color:${colors.buttonBackgroundColorHover};
  }
`;

const ButtonSmall = styled.button`
  border: none;
  border-radius: 0px;
  font-size: ${fontSizing.normal};
  padding: ${spacing.small} ${spacing.normal};
  font-weight:light;
  font-family: 'Open Sans', sans-serif;
  color: ${colors.titleTextColor};
  background-color: ${colors.buttonBackgroundColor};
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    background-color:${colors.buttonBackgroundColorHover};
  }
`;

export { Input, InputSmall, Button, ButtonSmall };
