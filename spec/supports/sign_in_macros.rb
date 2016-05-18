module SignInMacros
  def sign_in(author)
    visit '/cms/sign-in'
    fill_in 'email', with: author.email
    fill_in 'password', with: author.password
    click_on 'SignIn'
  end

end