class CreateModuls < ActiveRecord::Migration[5.1]
  def change
    create_table :moduls do |t|
      t.string :title
      t.text :description
      t.integer :credit_points
      t.boolean :prerequisite
      t.integer :recommended_semester
      t.references :studiengang, foreign_key: true

      t.timestamps
    end
  end
end
