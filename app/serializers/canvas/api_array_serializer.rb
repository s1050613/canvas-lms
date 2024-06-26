# frozen_string_literal: true

#
# Copyright (C) 2014 - present Instructure, Inc.
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

module Canvas
  class APIArraySerializer < ActiveModel::ArraySerializer
    include Canvas::APISerialization

    def initialize(object, options = {})
      super
      @options = options
      @controller = options.fetch(:controller)
      @sideloads  = options.fetch(:includes, [])
    end

    def serializer_for(item)
      serializer_class = @each_serializer || ActiveModel::Serializer.serializer_for(item) || ActiveModel::DefaultSerializer
      serializer_class.new(item, @options)
    end

    def serializable_object(...)
      super.map! { |hash| stringify!(hash) }
    end
  end
end
