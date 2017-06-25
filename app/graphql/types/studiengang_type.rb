module Types
  StudiengangType = GraphQL::ObjectType.define do
    name "Studiengang"
    description "Ein Studiengang bzw. eine Prüfungsordnung für einen Studiengang an der HTW"
    # interfaces [GraphQL::Relay::Node.interface, CharacterInterface]

    global_id_field :id
    field :name, !types.String, "Bezeichnung des Studiengangs"
    field :credit_points, !types.Int, "Maximal erreichbare Leistungspunkte"
    # connection :friends, CharacterInterface.connection_type, "Friends of this person"
    # field :appearsIn, types[EpisodeEnum], "Episodes this person appears in", property: :appears_in
    # field :homePlanet, types.String, "Where this person is from", property: :home_planet
  end
end
