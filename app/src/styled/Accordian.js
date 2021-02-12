import styled from "styled-components";

export const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
`;
export const Container = styled.div`
  box-shadow: rgba(153, 153, 153, 0.3);
`;
export const Wrap = styled.div`
  color: #fff
  text-align: center;
  cursor: pointer;

  h1 {
    color: #fff;
    opacity: 0.6;
    position: relative;
    -webkit-transition: opacity 0.2s ease-in-out 0s;
    -moz-transition: opacity 0.2s ease-in-out 0s;
    transition: opacity 0.2s ease-in-out 0s;
  }

  h1:hover{
      opacity: 0.9;
  }
`;

export const Dropdown = styled.div`
  background: rgb(0, 0, 0, 0.6);
  width: 100%;
`;
