# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :username, length: { maximum: 10 }
  validates :password, length: { minimum: 5, allow_nil: true }

  has_attached_file :avatar, styles: { thumb: "30x30" }, default_url: "oneoftheseguys.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  has_many :owned_servers,
  primary_key: :id,
  foreign_key: :owner_id,
  class_name: :Server

  has_many :server_memberships, dependent: :destroy

  has_many :servers,
  through: :server_memberships

  has_many :messages,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: :Message

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end
end
