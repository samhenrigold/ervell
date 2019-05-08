import gql from 'graphql-tag'

import { connectableContextMenuChannelFragment } from 'v2/components/ConnectableContextMenu/fragments/connectableContextMenu'
import { channelContentsConnectableFragment } from 'v2/components/ChannelContents/fragments/channelContentsConnectable'

export default gql`
  fragment ChannelContents on Channel {
    __typename
    id
    skeleton {
      id
      type
    }
    can {
      add_to
      reorder_connections: update
    }
    ...ConnectableContextMenuChannel
    initial_contents: blokks(
      page: 1
      per: 10
      sort_by: POSITION
      direction: DESC
    ) {
      __typename
      ...ChannelContentsConnectable
    }
  }
  ${connectableContextMenuChannelFragment}
  ${channelContentsConnectableFragment}
`