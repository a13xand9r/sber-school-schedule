import { Spinner } from '@sberdevices/plasma-ui'
import React from 'react'
import styled from 'styled-components'


const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #0000006c;
  width: 5rem;
  height: 5rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 47%;
`

export const Fetching = () => {
  return (
    <StyledDiv>
      <Spinner />
    </StyledDiv>
  )
}
