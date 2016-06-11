class AboutSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :image, :description, :site_description

  has_many :social_accounts

end
