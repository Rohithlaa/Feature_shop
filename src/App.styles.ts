import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const Wrapper = styled.div` 
 margin: 50px;
`;

export const Circularbar = styled.div`
 position:absolute;
 top:50%;
 left:50%
`

export const StyledButton = styled(IconButton)`
 position: absolute;
 z-index:100;
 top: 0%;
 right: 0%
 cursor:pointer;
`;