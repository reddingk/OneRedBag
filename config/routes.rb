Rails.application.routes.draw do
  get 'c1_m2_s3/index'
  get 'c1_m2_s3/edit'

  get 'home/index'
  root 'home#index'

end
