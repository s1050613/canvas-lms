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

import {executeApiRequest} from '@canvas/do-fetch-api-effect/apiRequest'
import type {LoginResponse} from './types'

export const login = async (
  username: string,
  password: string,
  rememberMe: boolean
): Promise<LoginResponse> => {
  const {status, data} = await executeApiRequest<LoginResponse>({
    path: '/login/canvas',
    method: 'POST',
    body: {
      pseudonym_session: {
        unique_id: username,
        password,
        remember_me: rememberMe ? '1' : '0',
      },
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (status === 200) {
    return data
  } else {
    throw new Error('Login failed')
  }
}

export const forgotPassword = async (email: string): Promise<{requested: boolean}> => {
  const {status, data} = await executeApiRequest<{requested: boolean}>({
    path: '/pseudonyms/forgot_password',
    method: 'POST',
    body: {
      pseudonym_session: {
        unique_id_forgot: email,
      },
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (status === 200) {
    return data
  } else {
    throw new Error('Password reset failed')
  }
}
