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
import ReactDOM from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import TeacherEditQuery from './components/TeacherEditQuery'
import TeacherCreateQuery from './components/TeacherCreateQuery'
import {createClient} from '@canvas/apollo'
import {ApolloClient} from 'apollo-client'
import type {InMemoryCache} from 'apollo-cache-inmemory'

export default function renderEditAssignmentsApp(elt: HTMLElement | null) {
  const client: ApolloClient<InMemoryCache> = createClient()
  ReactDOM.render(
    <ApolloProvider client={client}>
      {ENV.ASSIGNMENT_ID ? <TeacherEditQuery /> : <TeacherCreateQuery />}
    </ApolloProvider>,
    elt
  )
}
