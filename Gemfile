# frozen_string_literal: true

source "https://gems.ruby-china.com"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "~> 2.6.5"

gem "rails", "~> 6.0.2"
gem "rails-i18n"

gem "auto_strip_attributes"

# Use postgresql as the database for Active Record
# gem "pg", ">= 0.18", "< 2.0"
# Use sqlite as the database for Active Record
gem "mysql2"

gem 'tiny_tds'
# bundle config local.activerecord-sqlserver-adapter /Users/guochunzhong/git/oss/activerecord-sqlserver-adapter/
gem 'activerecord-sqlserver-adapter', git: 'git@github.com:rails-sqlserver/activerecord-sqlserver-adapter.git', branch: '6-0-dev'

gem "sidekiq", "~> 5.2.7"

# Use Puma as the app server
gem "puma", "~> 4.3.0"
# Use development version of Webpacker
gem "webpacker", "~> 5.0"

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem "turbolinks", "~> 5"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder", "~> 2.5"

gem 'http', '~> 4.1'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.4.4", require: false

gem "config"

gem "devise"
gem "omniauth_openid_connect"
gem "devise_invitable"
gem "devise-i18n"
gem "devise-jwt"
gem "warden-jwt_auth", "~> 0.4.2"
gem "pundit"

gem "meta-tags"

gem "browser"
# bundle config local.ajax-datatables-rails /Users/guochunzhong/git/oss/ajax-datatables-rails/
gem "ajax-datatables-rails", git: "https://git.dev.tencent.com/ericguo/ajax-datatables-rails.git", branch: :master
gem "kaminari"

# bundle config local.wechat /Users/guochunzhong/git/oss/wechat/
gem 'wechat', git: 'https://github.com/Eric-Guo/wechat', branch: :master

gem 'jieba-rb'
gem 'similar_text'

gem 'whenever', require: false

gem 'geocoder'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "web-console"
  gem "listen"

  gem "brakeman", require: false
  gem "rubocop", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-performance", require: false

  gem "capistrano"
  gem "capistrano-rails"
  gem "capistrano-rbenv"
  gem "capistrano3-puma"
  gem "capistrano-sidekiq"
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem "capybara", ">= 2.15"
  gem "selenium-webdriver"
  gem "webdrivers"
end

group :circle_ci do
  gem "minitest-ci"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
