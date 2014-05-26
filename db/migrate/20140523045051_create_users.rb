class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.belongs_to :location
      t.string :email # really, still no constraints?
      t.string :password_digest
    end
  end
end
