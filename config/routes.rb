Rails.application.routes.draw do
  get 'media/index'

#CMS
  get 'c1_m2_s3/index'
  get 'c1_m2_s3/edit'
  get 'c1_m2_s3/item_list'
  post 'c1_m2_s3/dataupdate'
  post 'c1_m2_s3/datanew'
  post 'c1_m2_s3/lockcheck'

#HOME
  get 'home/index'
  root 'home#index'
  get 'home/construction'
  
#Media
  get 'media/index'

end
