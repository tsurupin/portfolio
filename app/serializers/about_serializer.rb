class AboutSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :image, :description, :site_description

  has_many :social_accounts, root: :social_accounts

  def site_description
    Site.first.description
  end

  def image
    object.try(:image_url)
  end
end
