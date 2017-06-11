class CreateStudiengangs < ActiveRecord::Migration[5.1]
  def change
    create_table :studiengangs do |t|
      t.integer :credit_points
      t.string :name

      t.timestamps
    end
  end
end
