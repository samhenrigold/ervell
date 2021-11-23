import React, { useState } from 'react'
import { HeaderGroup } from 'react-table'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import SortArrows from 'v2/components/UI/SortArrows'

import constants from 'v2/styles/constants'
import { TableAddButton } from './AddButton'
import { ChannelTableContentsSet_channel } from '__generated__/ChannelTableContentsSet'
import { STANDARD_HEADERS } from '../..'

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 ${x => x.theme.space[4]};
  table-layout: fixed;
`

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

  &:nth-last-of-type(1) {
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
  width: 60px;
  padding: 0;
`

interface ChannelTableHeaderProps {
  headerGroups: HeaderGroup<object>[]
  channel: ChannelTableContentsSet_channel
}

export const ChannelTableHeader: React.FC<ChannelTableHeaderProps> = ({
  headerGroups,
  channel,
}) => {
  const [mode, setMode] = useState<'resting' | 'add'>('resting')

  const columnCount = STANDARD_HEADERS.length

  if (mode === 'add') {
    return (
      <Table>
        <thead>
          <TH colSpan={columnCount}>
            <Box>
              <Text>Adding...</Text>
            </Box>
          </TH>
        </thead>
      </Table>
    )
  }

  return (
    <Table>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <HeaderRow key={`header-${i}`} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, j) => {
              if (
                column.Header.toString() === 'SettingsAndAdd' &&
                channel?.can.add_to
              ) {
                return (
                  <SettingsAddTH
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <TableAddButton onClick={() => setMode('add')} />
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
    </Table>
  )
}

export default ChannelTableHeader
