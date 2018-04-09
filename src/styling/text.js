import styled from 'styled-components';
import {colors, spacing, fontSizing} from './styles';

const Title = styled.h1`
  font-size: ${fontSizing.medium};
  text-align: center;
  color: ${colors.cardTitleTextColor};
  margin:0;
  margin-top: ${spacing.medium}
`;

const LargeTitle = styled.h1`
  font-size: ${fontSizing.large};
  text-align: center;
  color: ${colors.titleTextColor};
  margin:0;
`;

const Paragraph = styled.p`
  text-align:center;
  color: ${colors.primaryTextColor};
`;

const ContrastSpan = styled.span`
  color: ${colors.contrastTextColor};
`;

const HR = styled.hr`
  border-top: 1px solid ${colors.cardBackgroundContrast};
  margin: ${spacing.normal} 0;
`;

export { Title, LargeTitle, Paragraph, ContrastSpan, HR }
