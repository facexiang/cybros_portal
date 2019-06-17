class Report::ContractSigningsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_page_layout_data, if: -> { request.format.html? }
  before_action :set_breadcrumbs, only: %i[show], if: -> { request.format.html? }
  after_action :verify_authorized

  def show
    authorize Bi::ContractSign
    @all_month_names = Bi::ContractSign.all_month_names
    @month_name = params[:month_name]&.strip || @all_month_names.last
    @end_of_month = Date.parse(@month_name).end_of_month
    @period_mean_ref = params[:period_mean_ref] || 100

    current_user_companies = current_user.departments.collect(&:company_name)
    @data = if current_user_companies.include?('上海天华建筑设计有限公司')
      Bi::ContractSign.all
    else
      Bi::ContractSign.where(businessltdname: current_user_companies)
    end.where('date <= ?', @end_of_month)
      .where.not(businessltdname: '上海天华建筑设计有限公司')
      .select('businessltdname, ROUND(SUM(contract_amount)/10000, 2) sum_contract_amount, SUM(contract_period) sum_contract_period, SUM(contract_count) sum_contract_count')
      .group(:businessltdname)
    @all_company_names = @data.collect(&:businessltdname)
    @all_company_short_names = @all_company_names.collect { |c| Bi::StaffCount.company_short_names.fetch(c, c) }
    @contract_amounts = @data.collect { |d| d.sum_contract_amount.round(0)}
    contract_period = @data.collect(&:sum_contract_period)
    contract_count = @data.collect(&:sum_contract_count)
    @avg_period_mean = @data.collect { |d| (d.sum_contract_period / d.sum_contract_count.to_f).round(0) }
    @avg_period_mean_max = (@avg_period_mean.max + 10).round(0)
    @sum_contract_amounts = (@contract_amounts.sum / 10000.to_f).round(0)
    @sum_avg_period_mean = (contract_period.sum / contract_count.sum).round(0)
    @staff_per_company = Bi::StaffCount.staff_per_company
  end

  private

  def set_breadcrumbs
    @_breadcrumbs = [
    { text: t("layouts.sidebar.application.header"),
      link: root_path },
    { text: t("layouts.sidebar.report.header"),
      link: report_root_path },
    { text: t("report.contract_signings.show.title"),
      link: report_contract_signing_path }]
  end


  def set_page_layout_data
    @_sidebar_name = "report"
  end
end
