Rails.application.routes.draw do

#CMS
  get '_scrap', to: 'c1_m2_s3#index'
  get '_edit_or', to: 'c1_m2_s3#edit'
  get '_items_edit',to: 'c1_m2_s3#item_list'
  
  post 'c1_m2_s3/dataupdate'
  post 'c1_m2_s3/datanew'
  post 'c1_m2_s3/lockcheck'

#HOME
  get 'Home', to:'home#index'
  root 'home#index'
  get 'under-construction',to:'home#construction'
  
#Media
  get 'Media', to: 'media#index'
  get 'Media/Album', to: 'media#album'

#News
  ##get 'news/index' => 'news#index', :as => :news_path
  get 'News', to: 'news#index'
  
##Help Us
  get 'HelpUs', to: 'helpus#index'
  get 'helpus/getdates'
  
end
