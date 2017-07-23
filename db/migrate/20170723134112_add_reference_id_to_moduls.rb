class AddReferenceIdToModuls < ActiveRecord::Migration[5.1]
  def change
    add_column "moduls", "reference_id", :integer
  end
end
