import React from 'react'
import { HeaderGroup } from 'react-table'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import SortArrows from 'v2/components/UI/SortArrows'

import { TD, TR } from '../..'

import constants from 'v2/styles/constants'

const THead = styled.thead``

const HeaderRow = styled(TR)`
  cursor: text;
`

const TH = styled(TD)`
  font-weight: bold;
  padding: ${x => x.theme.space[2]} ${x => x.theme.space[4]};
  vertical-align: middle;
  position: sticky;
  top: ${constants.headerHeight};
  background: ${x => x.theme.colors.background};
  z-index: 1;
`

const SettingsAddTH = styled(TH)`
  border-color: transparent;
`

interface ChannelTableHeaderProps {
  headerGroups: HeaderGroup<object>[]
}

const ChannelTableHeader: React.FC<ChannelTableHeaderProps> = ({
  headerGroups,
}) => {
  return (
    <THead>
      {headerGroups.map((headerGroup, i) => (
        <HeaderRow key={`header-${i}`} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, j) => {
            console.log({ header: column.Header })

            if (column.Header.toString() === 'SettingsAndAdd') {
              return <SettingsAddTH />
            }

            const sortState = column.isSorted
              ? column.isSortedDesc
                ? 'down'
                : 'up'
              : 'off'
            return (
              <TH
                key={`key-${j}`}
                width={column.width}
                {...column.getHeaderProps()}
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Text f={1} mr={5}>
                    {column.render('Header')}
                  </Text>
                  {column.canSort && (
                    <SortArrows
                      state={sortState}
                      onDown={() =>
                        column.isSortedDesc
                          ? column.clearSortBy()
                          : column.toggleSortBy(true)
                      }
                      onUp={() =>
                        column.isSorted
                          ? column.clearSortBy()
                          : column.toggleSortBy()
                      }
                    />
                  )}
                </Box>
              </TH>
            )
          })}
        </HeaderRow>
      ))}
    </THead>
  )
}

export default ChannelTableHeader
