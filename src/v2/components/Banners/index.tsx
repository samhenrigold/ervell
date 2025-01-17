import React, { useState } from 'react'
import styled from 'styled-components'
import { graphql } from '@apollo/client/react/hoc'

import WithLoginStatus from 'v2/hocs/WithLoginStatus'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Banner from 'v2/components/UI/Banner'
import Truncate from 'v2/components/UI/Truncate'
import {
  GenericButton,
  GenericButtonLink,
} from 'v2/components/UI/GenericButton'
import Modal from 'v2/components/UI/Modal'
import NewChannelForm from 'v2/components/NewChannelForm'

import resendConfirmationEmailMutation from 'v2/components/Banners/mutations/resendConfirmationEmail'
import { useQuery } from '@apollo/client'
import GET_FIRST_CHANNEL from './queries/getFirstChannel'
import { GetFirstChannel } from '__generated__/GetFirstChannel'

const isClientSide = typeof window !== 'undefined'

const Button = styled(GenericButton).attrs({
  f: [1, 2, 3],
  ml: 6,
  mt: [6, 6, 0],
})``

const ButtonLink = styled(GenericButtonLink).attrs({
  f: [1, 2, 3],
  ml: 6,
  mt: [6, 6, 0],
})`
  background: transparent;
`

const DeepBlueBanner = styled(Banner).attrs({
  bg: 'brand.deepBlue',
  color: 'white',
})``

const DeepBlueButton = styled(Button).attrs({
  color: 'utility.semiTranslucent',
  bg: 'brand.deepBlue',
  borderColor: 'gray.hint',
  hoverColor: 'white',
  activeColor: 'white',
  activeBorderColor: 'white',
  hoverBorderColor: 'white',
})``

const DeepBlueButtonLink = styled(ButtonLink).attrs({
  color: 'utility.semiTranslucent',
  bg: 'brand.deepBlue',
  borderColor: 'gray.hint',
  hoverColor: 'white',
  activeColor: 'white',
  activeBorderColor: 'white',
  hoverBorderColor: 'white',
})``

const Buttons = styled(Box).attrs({
  flexDirection: ['column', 'column', 'row'],
})``

interface ConfirmBlockProps {
  resendConfirmationEmail: any
}

const __Confirm__: React.FC<ConfirmBlockProps> = ({
  resendConfirmationEmail,
  ...rest
}) => {
  const [mode, setMode] = useState('resting')

  return (
    <Banner
      bg="gray.light"
      color="gray.base"
      iconName="Info"
      isCloseable={false}
      {...rest}
    >
      <Box>
        Please check your email to confirm your account. Haven’t received an
        email yet?
      </Box>

      <Button
        disabled={mode === 'sent'}
        onClick={() => {
          setMode('sending')
          resendConfirmationEmail()
            .then(() => setMode('sent'))
            .catch(() => setMode('error'))
        }}
      >
        {
          {
            resting: 'Resend email',
            sending: 'Sending...',
            sent: 'Sent',
            error: 'Error',
          }[mode]
        }
      </Button>
    </Banner>
  )
}

export const Confirm = graphql<ConfirmBlockProps>(
  resendConfirmationEmailMutation,
  {
    name: 'resendConfirmationEmail',
  }
)(__Confirm__)

export const Bookmarklet = props => (
  <Banner bg="gray.light" color="gray.base" iconName="Clipboard" {...props}>
    <Box>Save content from any website with the Are.na browser extension.</Box>

    <ButtonLink href="/tools/bookmarklet">Install</ButtonLink>
  </Banner>
)

export const CreateChannel = props => {
  if (!isClientSide) return null

  const modal = new Modal(NewChannelForm, {})

  return (
    <DeepBlueBanner steps={'1/3'} isCloseable={false} {...props}>
      <Box>Create your first channel to start adding content</Box>

      <DeepBlueButton onClick={() => modal.open()}>
        Create new channel
      </DeepBlueButton>
    </DeepBlueBanner>
  )
}

export const CreateConnections = props => {
  const { data } = useQuery<GetFirstChannel>(GET_FIRST_CHANNEL)

  return (
    <DeepBlueBanner steps={'2/3'} isCloseable={false} {...props}>
      <Box>
        Get started by adding text, images, links or files to your first channel
      </Box>

      <DeepBlueButtonLink href={data?.me?.channels[0]?.href}>
        Go to your channel
      </DeepBlueButtonLink>
    </DeepBlueBanner>
  )
}

export const FollowAnything = props => {
  return (
    <DeepBlueBanner steps={'3/3'} isCloseable {...props}>
      <Box>Find friends to follow, or follow a Featured Channel</Box>

      <DeepBlueButtonLink href="/tools/find-friends">
        Connect your Twitter
      </DeepBlueButtonLink>
      <DeepBlueButtonLink href="/are-na-team/featured-channels">
        Go to Featured Channels
      </DeepBlueButtonLink>
    </DeepBlueBanner>
  )
}

export const Invite = props => (
  <Banner bg="gray.light" color="gray.base" iconName="Info" {...props}>
    <Box>Invite friends to collaborate on Are.na.</Box>

    <ButtonLink href="/tools/send-invitation">Send invite</ButtonLink>
  </Banner>
)

export const ProposePremium = props => (
  <Banner bg="state.premium" color="white" iconName="Exclaim" {...props}>
    <Box>
      Get 20% off Are.na Premium with the coupon code{' '}
      <Text display="inline" font="mono" color="white">
        GATHER
      </Text>
    </Box>

    <ButtonLink color="white" href="/settings/billing">
      Learn more
    </ButtonLink>
  </Banner>
)

export const PremiumSupporter = props => (
  <Banner bg="state.supporter" color="white" iconName="Exclaim" {...props}>
    <Box>Upgrade to Premium Supporter and get a free Are.na Annual.</Box>
    <ButtonLink
      color="state.supporter"
      href="/settings/billing"
      target="_blank"
    >
      Learn more
    </ButtonLink>
  </Banner>
)

export const StronglyProposePremium = props => (
  <Banner bg="state.premium" color="white" iconName="Exclaim" {...props}>
    You’ve run out of free blocks.
    <ButtonLink color="white" href="/settings/billing">
      Upgrade
    </ButtonLink>
    <ButtonLink color="white" href="/blog/building-together" target="_blank">
      Learn more
    </ButtonLink>
  </Banner>
)

export const AnnualSubmissionReminder = props => (
  <Banner bg="state.supporter" color="white" iconName="Exclaim" {...props}>
    <Box>Submit your pitch for the 2022 Are.na Annual</Box>
    <ButtonLink
      color="state.supporter"
      href="https://www.are.na/blog/open-call-for-pitches-for-the-2022-are-na-annual"
      target="_blank"
    >
      Learn more
    </ButtonLink>
  </Banner>
)

interface LoggedOutExploreBlockProps {
  isLoggedIn: boolean
}

const __LoggedOutExplore__: React.FC<LoggedOutExploreBlockProps> = ({
  isLoggedIn,
  ...rest
}) =>
  !isLoggedIn ? (
    <Banner
      bg="white"
      borderTop="3px solid"
      borderColor="gray.light"
      isCloseable={false}
      {...rest}
    >
      <Text f={[4, 4, 5]} fontWeight="normal">
        Make channels, add content, connect ideas.
      </Text>

      <ButtonLink href="/sign_up">Sign up</ButtonLink>
    </Banner>
  ) : null

export const LoggedOutExplore = WithLoginStatus(__LoggedOutExplore__)

const __LoggedOutProfile__: React.FC<LoggedOutProfileProps> = ({
  isLoggedIn,
  name,
  ...rest
}) =>
  !isLoggedIn ? (
    <Banner
      bg="white"
      borderTop="3px
      solid"
      borderColor="gray.light"
      isCloseable={false}
      {...rest}
    >
      <Text f={[4, 4, 5]} fontWeight="normal">
        Join Are.na to follow <Truncate length={40}>{name}</Truncate>
      </Text>
      <Buttons>
        <ButtonLink href="/sign_up">Sign up</ButtonLink>
        <ButtonLink href="/explore">Explore</ButtonLink>
      </Buttons>
    </Banner>
  ) : null

interface LoggedOutProfileProps {
  isLoggedIn: boolean
  name: string
}

export const LoggedOutProfile = WithLoginStatus(__LoggedOutProfile__)

export const LoggedOutChannel = LoggedOutProfile

export default {
  STRONGLY_PROPOSE_PREMIUM: StronglyProposePremium,
  PROPOSE_PREMIUM: ProposePremium,
  PREMIUM_PLUS: PremiumSupporter,
  CREATE_CHANNEL: CreateChannel,
  CREATE_CONNECTIONS: CreateConnections,
  FOLLOW_ANYTHING: FollowAnything,
  CONFIRM: Confirm,
  BOOKMARKLET: Bookmarklet,
  INVITE: Invite,
  LOGGED_OUT_EXPLORE: LoggedOutExplore,
  LOGGED_OUT_PROFILE: LoggedOutProfile,
  LOGGED_OUT_CHANNEL: LoggedOutChannel,
  ANNUAL_SUBMISSION: AnnualSubmissionReminder,
}
