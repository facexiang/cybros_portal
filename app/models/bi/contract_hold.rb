module Bi
  class ContractHold < ApplicationRecord
    establish_connection :cybros_bi
    self.table_name = 'SH_CONTRACT_HOLD'

    def self.all_month_names
      @_all_month_names ||= order(date: :asc).pluck(:date).collect { |d| d.to_s(:month_and_year) }.uniq
    end
  end
end
