export default function SearchBar({ searchQuery, setSearchQuery, sortBy, setSortBy }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="input input-bordered flex-1"
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="select select-bordered"
      >
        <option value="date">Sort by Date</option>
        <option value="priority">Sort by Priority</option>
        <option value="name">Sort by Name</option>
      </select>
    </div>
  )
} 