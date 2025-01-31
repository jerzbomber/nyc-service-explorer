interface Props {
  data: {
    name: string;
    address: string;
    phone?: string;
    website?: string;
  }[];
}

const List = ({ data }: Props) => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="border rounded p-4 h-full overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 sticky top-0 z-10">
          Services
        </h2>
        <div className="overflow-y-auto max-h-full">
          {data.length > 0 ? (
            <ul>
              {data.map((record, index) => (
                <li key={index} className="mb-4">
                  <h3 className="font-bold">{`${index + 1}) ${
                    record.name
                  }`}</h3>
                  <p>{record.address}</p>
                  {(record.phone || record.website) && (
                    <p>
                      {record.phone && `${record.phone}`}
                      {record.phone && record.website && " | "}
                      {record.website && (
                        <a
                          href={record.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {record.website}
                        </a>
                      )}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
