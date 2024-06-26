# frozen_string_literal: true

#
# Copyright (C) 2024 - present Instructure, Inc.
#
# This file is part of Canvas.
#
# Canvas is free software: you can redistribute it and/or modify it under
# the terms of the GNU Affero General Public License as published by the Free
# Software Foundation, version 3 of the License.
#
# Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
# details.
#
# You should have received a copy of the GNU Affero General Public License along
# with this program. If not, see <http://www.gnu.org/licenses/>.

require_relative "../../common"

# Note that this is old quizzes in Canvas

module QuizzesLandingPage
  #------------------------------ Selectors -----------------------------
  def quiz_assign_to_button_selector
    "button.assign-to-link"
  end

  #------------------------------ Elements ------------------------------
  def quiz_assign_to_button
    f(quiz_assign_to_button_selector)
  end
  #------------------------------ Actions ------------------------------

  def click_quiz_assign_to_button
    quiz_assign_to_button.click
  end
end
