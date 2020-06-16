require 'rails_helper'

RSpec.describe "Api::Photos", type: :request do

  describe "GET /upload" do
    it "returns http success" do
      get "/api/photos/upload"
      expect(response).to have_http_status(:success)
    end
  end

end
