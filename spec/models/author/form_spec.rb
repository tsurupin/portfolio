# == Schema Information
#
# Table name: authors
#
#  id                 :integer          not null, primary key
#  email              :string(255)      not null
#  encrypted_password :string(255)      not null
#  name               :string(255)      not null
#  image              :string(255)
#  introduction       :text(65535)
#  description        :text(65535)
#  access_token       :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

require 'rails_helper'

RSpec.describe Author::Form, type: :model do
  describe '#validations' do
    it { is_expected.to accept_nested_attributes_for(:social_accounts) }

    context 'description' do
      context 'when description is nil' do
        it 'raises the error' do
          author = create(:author, description: nil)
          author_form = Author::Form.find(author.id)
          expect { author_form.update!(introduction: 'rich text') }.to raise_error(ActiveRecord::RecordInvalid)
        end
      end

      context 'when description is not nil' do
        it 'does not raise the error' do
          author = create(:author, description: 'rich text')
          author_form = Author::Form.find(author.id)
          expect { author_form.update!(introduction: 'rich text') }.not_to raise_error(ActiveRecord::RecordInvalid)
        end
      end
    end

    context 'introduction' do
      context 'when introduction is nil' do
        it 'raises the error' do
          author = create(:author, introduction: nil)
          author_form = Author::Form.find(author.id)
          expect { author_form.update!(description: 'rich text') }.to raise_error(ActiveRecord::RecordInvalid)
        end
      end

      context 'when introduction is not nil' do
        it 'does not raise the error' do
          author = create(:author, introduction: 'rich text')
          author_form = Author::Form.find(author.id)
          expect { author_form.update!(description: 'rich text') }.not_to raise_error(ActiveRecord::RecordInvalid)
        end
      end
    end
  end

  describe '#save' do
    it 'changes author data and associated records' do
      author = create(:author)
      create(:social_account, author: author, account_type: 'twitter')

      params = {
        'social_accounts_attributes' => [
          {
            'account_type' => 'linked_in',
            'url' => 'http://google.com'
          }
        ],
        'description' => 'new text',
        'introduction' => 'new introduction'
      }

      author_form = Author::Form.find(author.id)
      expect(author_form.save(params)).to be_truthy

      updated_author = Author.find(author.id)
      expect(updated_author.social_accounts.map(&:url)).to eq ['http://google.com']
      expect(SocialAccount.count).to eq 1
      expect(updated_author.description).to eq 'new text'
    end

    it 'returns false because of lack of necessary data' do
      author = create(:author)
      create(:social_account, author: author, account_type: 'twitter')

      params = { 'description' => 'rich text' }
      author_form = Author::Form.find(author.id)
      expect { author_form.save(params) }.to change { SocialAccount.count }.by(0)
      expect(author_form.save(params)).to be_falsey
      expect(Author::Form.find(author.id).description).to eq nil
    end
  end

  describe '#delete_unnecessary_accounts!' do
    context 'when deleting accounts exist' do
      it 'decrements the account record associated with the record' do
        author = create(:author)
        author_form = Author::Form.find(author.id)
        account1 = create(:social_account, author: author, account_type: 'twitter')
        create(:social_account, author: author, account_type: 'linked_in')

        params = [{ 'id' => account1.id }]

        expect { author_form.delete_unnecessary_accounts!(params) }.to change { SocialAccount.count }.by(-1)
        expect(Author.find(author.id).social_accounts.map(&:id)).to eq [account1.id]
      end
    end

    context 'when deleting items do not exist' do
      it 'decrements the item record associated with the record' do
        author = create(:author)
        author_form = Author::Form.find(author.id)
        account1 = create(:social_account, author: author, account_type: 'twitter')
        account2 = create(:social_account, author: author, account_type: 'linked_in')

        params = [{ 'id' => account1.id }, { 'id' => account2.id }]

        expect { author_form.delete_unnecessary_accounts!(params) }.to change { SocialAccount.count }.by(0)
        expect(Author.find(author.id).social_accounts.map(&:id)).to eq [account1.id, account2.id]
      end
    end
  end
end
