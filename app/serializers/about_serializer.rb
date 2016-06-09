class AboutSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :image, :description, :introduction

  has_many :social_accounts, root: :social_accounts

  def image
    object.try(:image_url)
  end
end
