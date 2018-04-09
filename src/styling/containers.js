import styled from 'styled-components';
import {colors, spacing, fontSizing} from './styles';

const Card = styled.div`
  background-color: ${colors.cardBackgroundColor};
  padding: 0px ${spacing.medium};
  padding-bottom: ${spacing.medium};
  box-shadow: 0px 0px 25px rgba(0,0,0,0.35);
`;

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Flex50 = styled.div`
  flex: 1;
`;

const Flex1 = styled.div`
  flex:1;
`;


const Flex2 = styled.div`
  flex:2;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export { Card, FlexBox, Flex1, Flex2, Flex50, AppContainer }
