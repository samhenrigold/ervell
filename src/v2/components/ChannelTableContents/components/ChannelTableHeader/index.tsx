import React from 'react'
import { HeaderGroup } from 'react-table'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import SortArrows from 'v2/components/UI/SortArrows'

import constants from 'v2/styles/constants'

export const TD = styled.td`
  color: ${x => x.theme.colors.gray.bold};
  border: 1px solid ${x => x.theme.colors.gray.light};
  border-right: none;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 30px;
  line-height: 0;
  padding: 0;
  width: ${x => x.width};
  max-width: ${x => x.maxWidth || 0};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:nth-last-of-type(2) {
    border-right: 1px solid ${x => x.theme.colors.gray.light};
  }
`

export const TR = styled.tr``

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
  width: 50px;
`

interface ChannelTableHeaderProps {
  headerGroups: HeaderGroup<object>[]
}

export const ChannelTableHeader: React.FC<ChannelTableHeaderProps> = ({
  headerGroups,
}) => {
  return (
    <thead>
      {headerGroups.map((headerGroup, i) => (
        <HeaderRow key={`header-${i}`} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, j) => {
            console.log('column.Header.toString()', column.Header.toString())

            if (column.Header.toString() === 'SettingsAndAdd') {
              console.log('RETURNING SETTINGS')
              return (
                <SettingsAddTH
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Box>
                    <Text f={1} mr={5}>
                      {' '}
                    </Text>
                  </Box>
                </SettingsAddTH>
              )
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
    </thead>
  )
}

export default ChannelTableHeader
