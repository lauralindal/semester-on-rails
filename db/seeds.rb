# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

studiengang = Studiengang.create(name: "fiw", credit_points: 180)

file = File.read(Rails.root.join("db", "moduleplan.json"))

data = JSON.parse(file)

studiengang.moduls = data["degree_course"]["modules"].map do |modul|
  Modul.new(modul)
end

studiengang.save()
