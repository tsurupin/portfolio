# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

names = %w(
  ES6 RoR Node.js React Angular.js Elixir Ruby HTML5 CSS3
  iOS Swift Android UNIX MongoDB Docker Ansible MYSQL EC2
  jQuery Others Travel Tips
)

FactoryGirl.define do
  factory :tag do
    sequence(:name) { |n| names[n] || n }
  end
end
