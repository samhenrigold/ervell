import React from 'react'
import styled from 'styled-components'

import GenericButton from 'v2/components/UI/GenericButton'

const Button = styled(GenericButton).attrs({
  bg: 'gray.light',
})`
  border-radius: 0px;
  height: 100%;
  width: 60px;
  border: 0px solid transparent;
  padding-left: 0px;
  padding-right: 0px;

  &:hover {
    border: 0px solid transparent !important;
  }
`
interface TableAddButtonProps {
  onClick: () => void
}

export const TableAddButton: React.FC<TableAddButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} f={1}>
      Add +
    </Button>
  )
}
