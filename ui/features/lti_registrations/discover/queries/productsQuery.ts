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

import getCookie from '@instructure/get-cookie'
import type {Product, TagGroup} from '../model/Product'
import {stringify} from 'qs'
import type {DiscoverParams} from '../components/useDiscoverQueryParams'
import type {LtiFilters} from '../model/Filter'

const accountId = window.location.pathname.split('/')[2]

// TODO: add actual type
type Meta = {
  count: number
  total_count: number
  current_page: number
  num_pages: number
  per_page: number
}
type ProductResponse = {
  tools: Array<Product>
  meta: Meta
}
type ToolsByDisplayGroupResponse = Array<{
  meta: Meta
  tag_group: TagGroup
  tools: Array<Product>
}>

export const fetchProducts = async (params: DiscoverParams): Promise<ProductResponse> => {
  const apiParams = {
    page: params.page,
    per_page: 21,
    q: {
      ...(params.search && {search_terms_cont: params.search}),
      ...(params.filters.tags && {display_group_id_eq: params.filters.tags[0]?.id}),
      ...(params.filters.companies && {
        company_id_in: params.filters.companies.map(company => company.id),
      }),
      ...(params.filters.audience && {
        audience_id_in: params.filters.audience.map(audience => audience.id),
      }),
      ...(params.filters.versions && {
        version_id_in: params.filters.versions.map(version => version.id),
      }),
    },
  }

  const url = `/api/v1/accounts/${accountId}/learn_platform/products?${stringify(apiParams, {
    arrayFormat: 'brackets',
  })}`

  const response = await fetch(url, {
    method: 'get',
    headers: {
      'X-CSRF-Token': getCookie('_csrf_token'),
      'content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch products`)
  }
  const products = await response.json()

  return products || {}
}

export const fetchProductDetails = async (global_product_id: String): Promise<Product | null> => {
  if (!global_product_id) return null
  const url = `/api/v1/accounts/${accountId}/learn_platform/products/${global_product_id}`

  const response = fetch(url, {
    method: 'get',
    headers: {
      'X-CSRF-Token': getCookie('_csrf_token'),
      'content-Type': 'application/json',
    },
  })
    .then(resp => resp.json())
    .then(product => {
      return product
    })

  const getProduct = async () => {
    const product = await response
    return product
  }

  if (!response) {
    throw new Error(`Failed to fetch product with id ${global_product_id}`)
  }

  return getProduct()
}

export const fetchToolsByDisplayGroups = async (): Promise<ToolsByDisplayGroupResponse> => {
  const url = `/api/v1/accounts/${accountId}/learn_platform/products_categories`

  const response = await fetch(url, {
    method: 'get',
    headers: {
      'X-CSRF-Token': getCookie('_csrf_token'),
      'content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch products categories`)
  }
  const displayGroups = await response.json()

  return displayGroups.tools_by_display_group || []
}

export const fetchLtiFilters = async (): Promise<LtiFilters> => {
  const url = `/api/v1/accounts/${accountId}/learn_platform/filters`

  const response = await fetch(url, {
    method: 'get',
    headers: {
      'X-CSRF-Token': getCookie('_csrf_token'),
      'content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch lti filters`)
  }
  const filters = await response.json()

  return filters || {}
}
