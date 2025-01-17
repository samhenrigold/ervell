import React from 'react'
import styled from 'styled-components'
import Text from 'v2/components/UI/Text'

const Inner = styled.div`
  padding: ${x => x.theme.space[3]};
`

interface StandardCellProps {
  value?: string | number | null | false
  color?: string
}

export const StandardCell: React.FC<StandardCellProps> = ({
  value,
  color = 'gray.semiBold',
}) => {
  if (!value) return null

  return (
    <Inner>
      <Text
        f={1}
        color={color}
        overflowEllipsis
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </Inner>
  )
}
