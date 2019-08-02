# frozen_string_literal: true

module Bi
  class TrackContract < ApplicationRecord
    establish_connection :cybros_bi
    self.table_name = "TRACK_CONTRACT"

    def self.last_available_date
      order(date: :desc).first.date
    end
  end
end
