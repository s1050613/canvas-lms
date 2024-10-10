/*
 * Copyright (C) 2024 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import type {AuthProvider} from '../utils/types'
import {Button} from '@instructure/ui-buttons'
// @ts-expect-error
import GoogleIcon from '../assets/images/google.svg'
// @ts-expect-error
import MicrosoftIcon from '../assets/images/microsoft.svg'
// @ts-expect-error
import PlaceholderIcon from '../assets/images/placeholder.svg'
import {Img} from '@instructure/ui-img'
import {Flex} from '@instructure/ui-flex'
import {useScope as useI18nScope} from '@canvas/i18n'

const I18n = useI18nScope('new_login')

interface SSOButtonsProps {
  providers: AuthProvider[]
}

const SSOButtons = ({providers}: SSOButtonsProps) => {
  const getProviderIcon = (authType: string) => {
    switch (authType) {
      case 'google':
        return GoogleIcon
      case 'microsoft':
        return MicrosoftIcon
      default:
        return PlaceholderIcon
    }
  }

  return (
    <Flex direction="column" gap="small">
      {providers.map(provider => {
        const onlyOneOfType = providers.filter(p => p.auth_type === provider.auth_type).length < 2
        const authType = provider.auth_type || 'unknown'
        const displayName = authType.charAt(0).toUpperCase() + authType.slice(1)
        const link = `/login/${authType}${onlyOneOfType ? '' : `/${provider.id}`}`

        return (
          <Flex.Item key={provider.id} overflowY="visible">
            <Button
              href={link}
              display="block"
              renderIcon={() => (
                <Img
                  src={getProviderIcon(provider.auth_type)}
                  alt={displayName}
                  width="18"
                  height="18"
                  display="block"
                />
              )}
            >
              {I18n.t('Sign in with %{displayName}', {displayName})}
            </Button>
          </Flex.Item>
        )
      })}
    </Flex>
  )
}

export default SSOButtons
