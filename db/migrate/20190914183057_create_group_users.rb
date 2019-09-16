class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.references :group, foreign_key: true
      
      t.timestamps :user, foreign_key: true
    end
  end
end
