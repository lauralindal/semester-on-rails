module Types
  ModulType = GraphQL::ObjectType.define do
    name "Modul"
    description "Ein Modul, das im Rahmen einer Studienordnung abgeschlossen werden muss"
    # interfaces [GraphQL::Relay::Node.interface, CharacterInterface]

    global_id_field :id
    field :title, !types.String, "Bezeichnung des Moduls"
    field :description, !types.String, "Beschreibung aus der Studienordnung"
    field :credit_points, !types.Int, "Credit Point für dieses Modul"
    field :prerequisite, !types.Boolean, "Muss ein anderes Modul für die Belegung abgeschlossen sein?"
    field :recommended_semester, !types.Int, "Soll in diesem Semester belegt werden"
    field :reference_id, !types.Int, "ID des Moduls"
    # connection :friends, CharacterInterface.connection_type, "Friends of this person"
    # field :appearsIn, types[EpisodeEnum], "Episodes this person appears in", property: :appears_in
    # field :homePlanet, types.String, "Where this person is from", property: :home_planet
  end
end
