class NameCardBlackTitle < ApplicationRecord
  validates :original_title, :required_title, presence: true
end
