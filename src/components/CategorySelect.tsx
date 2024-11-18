import { Category } from '../types/categories';  // You may need to move types to a separate file

interface CategorySelectProps {
  value: Category;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="w-2/3">
      <label className="block text-gray-700 mb-2 text-xs">Category</label>
      <select
        name="category"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md"
      >
        <option value="Personal Growth">Personal Growth Affirmation</option>
        <option value="Financial">Financial Affirmation</option>
        <option value="Relationship">Relationship Affirmation</option>
        <option value="Goal">Goal Affirmation</option>
      </select>
    </div>
  );
} 