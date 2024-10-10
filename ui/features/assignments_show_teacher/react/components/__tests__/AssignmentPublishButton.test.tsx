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
import {MockedProvider} from '@apollo/react-testing'
import {render, screen} from '@testing-library/react'
import {mockAssignment, mockSetWorkflowSuccess, mockSetWorkflowFailure} from '../../test-utils'
import AssignmentHeader from '../AssignmentHeader'
import AssignmentPublishButton from '../AssignmentPublishButton'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

describe('Publish/Unpublish Button', () => {
  it('renders publish/unpublish button', () => {
    const assignment = mockAssignment()
    const getByTestId = render(
      <QueryClientProvider client={new QueryClient()}>
        <AssignmentHeader assignment={assignment} breakpoints={{}} />
      </QueryClientProvider>
    ).getByTestId
    const isPublished = assignment.state === 'published'
    const workFlowState = isPublished ? 'Published' : 'Unpublished'
    expect(getByTestId('assignment-publish-menu')).toBeInTheDocument()
    expect(getByTestId('assignment-publish-menu')).toHaveTextContent(workFlowState)
  })

  it('renders success flash alert', async () => {
    const assignment = mockAssignment()
    const getByTestId = render(
      <MockedProvider mocks={[mockSetWorkflowSuccess]} addTypename={false}>
        <AssignmentPublishButton
          isPublished={true}
          assignmentLid={assignment.lid}
          breakpoints={{}}
        />
      </MockedProvider>
    ).getByTestId

    getByTestId('assignment-publish-menu').click()
    getByTestId('unpublish-option').click()
    const alertMessages = await screen.findAllByText('This assignment has been unpublished.')
    expect(alertMessages.length).toBeGreaterThan(0)
  })

  it('renders failure flash alert', async () => {
    const assignment = mockAssignment()
    const getByTestId = render(
      <MockedProvider mocks={[mockSetWorkflowFailure]} addTypename={false}>
        <AssignmentPublishButton
          isPublished={true}
          assignmentLid={assignment.lid}
          breakpoints={{}}
        />
      </MockedProvider>
    ).getByTestId

    getByTestId('assignment-publish-menu').click()
    getByTestId('unpublish-option').click()
    const alertMessages = await screen.findAllByText('This assignment has failed to unpublish.')
    expect(alertMessages.length).toBeGreaterThan(0)
  })
})
