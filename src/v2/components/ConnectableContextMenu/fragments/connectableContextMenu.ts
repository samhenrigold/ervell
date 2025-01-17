import { gql } from '@apollo/client'

export const connectableContextMenuChannelFragment = gql`
  fragment ConnectableContextMenuChannel on Channel {
    __typename
    id
    can {
      update
    }
  }
`

export const connectableContextMenuConnectableFragment = gql`
  fragment ConnectableContextMenuConnectable on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Block {
      can {
        mute
        remove: manage
        manage
      }
    }

    ... on ConnectableInterface {
      href
      connection {
        can {
          destroy
        }
      }
    }

    ... on Channel {
      can {
        mute
      }
    }
    ... on Text {
      source {
        url
      }
    }
    ... on Image {
      source {
        url
      }
      find_original_url
    }
    ... on Embed {
      source {
        url
      }
    }
    ... on Link {
      source {
        url
      }
    }
    ... on Attachment {
      source {
        url
      }
    }
  }
`
