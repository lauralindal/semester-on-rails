SemesterOnRailsSchema = GraphQL::Schema.define do
  query(Types::QueryType)

  resolve_type ->(obj, ctx) do
    case obj
    when Studiengang
      Types::StudiengangType
    when Modul
      Types::ModulType
    else
      raise("Ich kann nur Studiengang oder Modul, keinen #{obj.class.name}.")
    end
  end

  # from https://github.com/rmosolgo/graphql-ruby-demo/blob/master/app/graph/star_wars_schema.rb

  object_from_id ->(id, ctx) do
    type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)

    # This `find` gives the user unrestricted access to *all* the records in your app. In
    # a real world application you probably want to check if the user is allowed to access
    # the requested resource.
    type_name.constantize.find(item_id)
  end

  id_from_object -> (object, type_definition, ctx) do
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  end

end
