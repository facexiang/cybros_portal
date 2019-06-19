module Bi
  class SubCompanyRealReceive < ApplicationRecord
    establish_connection :cybros_bi
    self.table_name = 'SUB_COMPANY_REAL_RECEIVE'

    def self.all_month_names
      @all_month_names ||= Bi::SubCompanyRealReceive.order(date: :asc).pluck(:date).collect { |d| d.to_s(:month_and_year) }.uniq
    end
  end
end