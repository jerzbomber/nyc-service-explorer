interface Props {
  setBorough: (borough: string) => void;
}

const Filter = ({ setBorough }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBorough(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="borough" className="block mb-2 font-medium">
        Filter by Borough:
      </label>
      <select
        id="borough"
        onChange={handleChange}
        className="border p-2 rounded text-background"
      >
        <option value="">All</option>
        <option value="Manhattan">Manhattan</option>
        <option value="Brooklyn">Brooklyn</option>
        <option value="Queens">Queens</option>
        <option value="Bronx">Bronx</option>
        <option value="Staten Island">Staten Island</option>
      </select>
    </div>
  );
};

export default Filter;
