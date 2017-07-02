module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :studiengang, StudiengangType, field: Fields::FetchField.build(type: StudiengangType, model: Studiengang)
  end
end
