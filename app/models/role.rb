# frozen_string_literal: true

class Role < ApplicationRecord
  has_many :role_users
  has_many :users, through: :role_users
  validates :role_name, presence: true
end
