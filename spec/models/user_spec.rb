require 'spec_helper'

describe User do
  it { should allow_mass_assignment_of(:email)}
  it { should allow_value('joe@fake.com', 'realemail@real.co').for(:email) }
  it { should_not allow_value('bademail@bad.x', 'wrong@hellno.noway').for(:email)}
  it { should validate_presence_of(:location)}
end