/*
 * Copyright (C) 2021 - present Instructure, Inc.
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

import {render} from '@testing-library/react'
import React from 'react'
import {Highlight} from '../Highlight'

const setup = props => {
  return render(<Highlight {...props} />)
}

describe('Highlight', () => {
  it('displays the highlight', () => {
    const {queryByTestId, container} = setup({isHighlighted: true})
    expect(queryByTestId('isHighlighted')).toBeTruthy()
    expect(container.querySelector('.highlight-fadeout')).toBeInTheDocument()
  })

  it('displays the highlight with persist', () => {
    delete window.location
    window.location = {search: '?persist=1'}
    const {container} = setup({isHighlighted: true})

    expect(container.querySelector('.highlight-discussion')).toBeInTheDocument()
  })

  it('does not display the highlight', () => {
    const {queryByTestId} = setup({isHighlighted: false})
    expect(queryByTestId('isHighlighted')).toBeFalsy()
  })
})
