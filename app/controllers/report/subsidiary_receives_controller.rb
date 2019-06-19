class Report::SubsidiaryReceivesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_page_layout_data, if: -> { request.format.html? }
  before_action :set_breadcrumbs, only: %i[show], if: -> { request.format.html? }
  after_action :verify_authorized

  def show
    authorize Bi::SubCompanyRealReceive
    @all_month_names = Bi::SubCompanyRealReceive.all_month_names
    @month_name = params[:month_name]&.strip || @all_month_names.last
    @end_of_month = Date.parse(@month_name).end_of_month

    current_user_companies = current_user.user_company_names
    @real_data = if current_user_companies.include?('上海天华建筑设计有限公司')
      Bi::SubCompanyRealReceive.all
    else
      Bi::SubCompanyRealReceive.where(businessltdname: current_user_companies)
    end.where('date <= ?', @end_of_month)
      .where.not(businessltdname: '上海天华建筑设计有限公司')
      .select('businessltdname, SUM(real_receive) real_receive')
      .group(:businessltdname)
    @real_company_names = @real_data.collect(&:businessltdname)
    @real_company_short_names = @real_company_names.collect { |c| Bi::StaffCount.company_short_names.fetch(c, c) }
    @real_receives = @real_data.collect { |d| (d.real_receive/10000.0).round(0) }

    @need_data = if current_user_companies.include?('上海天华建筑设计有限公司')
      Bi::SubCompanyNeedReceive.all
    else
      Bi::SubCompanyNeedReceive.where(businessltdname: current_user_companies)
    end.where.not(businessltdname: '上海天华建筑设计有限公司') # .where('date <= ?', @end_of_month)
      .select('businessltdname, SUM(unsign_receive) unsign_receive, SUM(sign_receive) sign_receive, SUM(long_account_receive) long_account_receive, SUM(short_account_receive) short_account_receive')
      .group(:businessltdname)
    @need_company_names = @need_data.collect(&:businessltdname)
    @need_company_short_names = @need_company_names.collect { |c| Bi::StaffCount.company_short_names.fetch(c, c) }
    @need_long_account_receives = @need_data.collect { |d| (d.long_account_receive/10000.0).round(0) }
    @need_short_account_receives = @need_data.collect { |d| (d.short_account_receive/10000.0).round(0) }
    @need_should_receives = @need_data.collect { |d| ((d.unsign_receive.to_f+d.sign_receive.to_f)/10000.0).round(0) }

    @staff_per_company = Bi::StaffCount.staff_per_company
    @real_receives_per_staff = @real_data.collect do |d|
      short_name = Bi::StaffCount.company_short_names.fetch(d.businessltdname, d.businessltdname)
      staff_number = @staff_per_company.fetch(short_name, 1000)
      (d.real_receive / (staff_number*10000).to_f).round(0)
    end
    @need_should_receives_per_staff = @need_data.collect do |d|
      short_name = Bi::StaffCount.company_short_names.fetch(d.businessltdname, d.businessltdname)
      staff_number = @staff_per_company.fetch(short_name, 1000)
      ((d.unsign_receive.to_f+d.sign_receive.to_f)/(staff_number*10000.0).to_f).round(0)
    end
  end

  private

  def set_breadcrumbs
    @_breadcrumbs = [
    { text: t("layouts.sidebar.application.header"),
      link: root_path },
    { text: t("layouts.sidebar.report.header"),
      link: report_root_path },
    { text: t("report.subsidiary_receives.show.title"),
      link: report_subsidiary_receive_path }]
  end


  def set_page_layout_data
    @_sidebar_name = "report"
  end
end