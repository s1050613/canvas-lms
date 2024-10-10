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

import * as z from 'zod'
import {ZLtiPrivacyLevel} from '../LtiPrivacyLevel'
import {ZLtiScope} from '@canvas/lti/model/LtiScope'
import {ZInternalPlacementConfiguration} from './placement_configuration/InternalPlacementConfiguration'
import {ZPublicJwk} from './PublicJwk'
import {ZInternalBaseLaunchSettings} from './InternalBaseLaunchSettings'

export const ZInternalLtiConfiguration = z.object({
  title: z.string(),
  description: z.string().optional(),
  custom_fields: z.record(z.string()).optional(),
  target_link_uri: z.string(),
  domain: z.string().optional(),
  tool_id: z.string().optional(),
  privacy_level: ZLtiPrivacyLevel.optional(),
  oidc_initiation_url: z.string(),
  oidc_initiation_urls: z.record(z.string(), z.string()).optional(),
  public_jwk: ZPublicJwk.optional(),
  public_jwk_url: z.string().optional(),
  scopes: z.array(ZLtiScope),
  redirect_uris: z.array(z.string()).optional(),
  launch_settings: ZInternalBaseLaunchSettings.optional(),
  placements: z.array(ZInternalPlacementConfiguration),
})

export interface InternalLtiConfiguration extends z.infer<typeof ZInternalLtiConfiguration> {}
