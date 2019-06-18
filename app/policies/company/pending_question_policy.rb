module Company
  class PendingQuestionPolicy < ApplicationPolicy
    def index?
      create?
    end

    def create?
      user.admin? || user.knowledge_maintainer?
    end

    def destroy?
      user.admin? || user.knowledge_maintainer?
    end
  end
end