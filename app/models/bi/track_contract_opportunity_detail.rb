module Bi
  class TrackContractOpportunityDetail < ApplicationRecord
    establish_connection :cybros_bi
    self.table_name = "TRACK_CONTRACT_OPPORTUNITY_DETAIL"
  end
end