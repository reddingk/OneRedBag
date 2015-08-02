Rails.application.routes.draw do
#CMS
  get 'c1_m2_s3/index'
  get 'c1_m2_s3/edit'
  get 'c1_m2_s3/item_list'

#HOME
  get 'home/index'
  root 'home#index'

end
