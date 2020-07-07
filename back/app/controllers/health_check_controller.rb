class HealthCheckController < ApplicationController
  skip_before_action :authenticate_account!, only: [:index]
  def index
    render json:'ok'
  end
end
